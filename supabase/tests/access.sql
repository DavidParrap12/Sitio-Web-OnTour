-- Run after schema.sql and migrations in an isolated database; every test rolls back.
begin;
insert into auth.users(id) values('00000000-0000-0000-0000-000000000001'),('00000000-0000-0000-0000-000000000002'),('00000000-0000-0000-0000-000000000003'),('00000000-0000-0000-0000-000000000004');
insert into public.staff(user_id,role) values('00000000-0000-0000-0000-000000000001','admin'),('00000000-0000-0000-0000-000000000002','editor'),('00000000-0000-0000-0000-000000000003','sales');
insert into public.circuits(id,published,image) values('qa-published',true,'/image/test.jpg'),('qa-draft',false,'/image/test.jpg');
insert into public.circuit_prices(circuit_id,label,amount,audience) values('qa-published','public',100,'public'),('qa-published','net',80,'agency'),('qa-published','cost',50,'internal');
insert into public.opportunities(id,contact_name,email) values('10000000-0000-0000-0000-000000000001','QA contact','qa@example.invalid');
set local role anon;
do $$begin
 if (select count(*) from public.circuits where id like 'qa-%')<>1 then raise exception 'Anonymous draft exposure'; end if;
 if (select count(*) from public.circuit_prices where circuit_id='qa-published')<>1 then raise exception 'Private rate exposure'; end if;
 begin perform 1 from public.opportunities; raise exception 'CRM accessible'; exception when insufficient_privilege then null; end;
end$$;
reset role;
set local role authenticated;
select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-000000000004',true);
select set_config('request.jwt.claims','{"aal":"aal2"}',true);
do $$begin
 if public.has_staff_role(array['admin','editor','sales']) then raise exception 'Non-staff access'; end if;
 begin insert into public.circuits(id) values('qa-forbidden');raise exception 'Non-staff insert succeeded';exception when insufficient_privilege then null;end;
end$$;
select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-000000000001',true);
select set_config('request.jwt.claims','{"aal":"aal1"}',true);
do $$begin if public.has_staff_role(array['admin']) then raise exception 'MFA bypass';end if;end$$;
select set_config('request.jwt.claims','{"aal":"aal2"}',true);
select public.save_catalog('qa-atomic','{"kind":"day_trip","days":1,"nights":0,"image":"/image/test.jpg","color_theme":"cultura","region":"andes","map_embed_url":"","brochure_url":"","brochure_pdf_url":"","published":false,"sort_order":0}',
'[{"locale":"es","name":"QA","description":"","highlights":[],"itinerary":[]},{"locale":"en","name":"QA","description":"","highlights":[],"itinerary":[]},{"locale":"de","name":"QA","description":"","highlights":[],"itinerary":[]},{"locale":"fr","name":"QA","description":"","highlights":[],"itinerary":[]}]',true);
do $$begin if (select count(*) from public.circuit_translations where circuit_id='qa-atomic')<>4 then raise exception 'Translations missing';end if;end$$;
select public.replace_circuit_prices('qa-atomic','[{"label":"Standard","amount":100,"currency":"USD","notes":"","sort_order":0,"audience":"public","valid_from":"2030-01-01","valid_until":"2030-12-31","min_guests":1,"max_guests":20,"occupancy":"double","weekdays":[0,1,2,3,4,5,6]}]');
do $$begin
 begin
 perform public.replace_circuit_prices('qa-atomic','[{"label":"Standard","amount":200,"currency":"USD","notes":"","sort_order":0,"audience":"public","valid_from":"2030-01-01","valid_until":"2030-12-31","min_guests":1,"max_guests":20,"occupancy":"double","weekdays":[0]},{"label":"Standard","amount":300,"currency":"USD","notes":"","sort_order":1,"audience":"public","valid_from":"2030-01-01","valid_until":"2030-12-31","min_guests":1,"max_guests":20,"occupancy":"double","weekdays":[0]}]');
 raise exception 'Expected overlap rejection';
 exception when raise_exception then if SQLERRM='Expected overlap rejection' then raise;end if;end;
 if (select amount from public.circuit_prices where circuit_id='qa-atomic')<>100 then raise exception 'Tariff rollback failed';end if;
end$$;
select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-000000000002',true);
do $$begin if exists(select 1 from public.opportunities) then raise exception 'Editor CRM exposure';end if;end$$;
select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-000000000003',true);
select public.create_quote('10000000-0000-0000-0000-000000000001','USD',current_date+30,'Test','[{"description":"Tour","quantity":2,"unit_price":150}]');
do $$declare affected integer;begin
 if (select total from public.quote_versions where opportunity_id='10000000-0000-0000-0000-000000000001')<>300 then raise exception 'Quote total';end if;
 begin update public.quote_versions set total=1; raise exception 'Quote is mutable'; exception when insufficient_privilege then null; end;
 update public.circuits set published=true where id='qa-atomic';get diagnostics affected=row_count;
 if affected<>0 then raise exception 'Sales catalog edit';end if;
end$$;
reset role;
do $$begin if not exists(select 1 from public.audit_log where table_name='quote_versions')then raise exception 'Audit missing';end if;end$$;
-- Check both effective ACLs and actual limiter execution, including platform defaults.
do $$begin
 if has_function_privilege('anon','public.consume_intake_limit(text,integer,integer)','EXECUTE')
 or has_function_privilege('authenticated','public.consume_intake_limit(text,integer,integer)','EXECUTE') then
 raise exception 'Limiter is publicly callable'; end if;
 if has_table_privilege('anon','public.circuits','TRUNCATE')
 or has_table_privilege('authenticated','public.staff','INSERT') then raise exception 'Excess table privilege'; end if;
end$$;
set local role service_role;
do $$begin if not public.consume_intake_limit(repeat('b',64),1,60) then raise exception 'Limiter rejected first request'; end if; end$$;
do $$begin
 if public.consume_intake_limit(repeat('b',64),1,60) then raise exception 'Limiter did not reject second request'; end if;
 insert into public.opportunities(contact_name,email) values('Intake QA','qa@example.invalid');
end$$;
reset role;
rollback;
select 'PASS: anonymous, roles, MFA, atomic tariff rollback, catalog, quotes and audit' as result;
