begin;
create or replace function public.save_catalog(product_id text, fields jsonb, translations jsonb, create_new boolean)
returns void language plpgsql security invoker set search_path='' as $$
begin
 if not public.has_staff_role(array['admin','editor']) then raise exception 'Forbidden'; end if;
 if length(product_id) not between 1 and 180 or jsonb_array_length(translations)<>4 then raise exception 'Invalid product'; end if;
 if create_new then
 insert into public.circuits(id) values(product_id);
 else
 perform 1 from public.circuits where id=product_id for update;
 if not found then raise exception 'Product not found'; end if;
 end if;
 update public.circuits set kind=fields->>'kind',days=(fields->>'days')::integer,nights=(fields->>'nights')::integer,
 image=fields->>'image',color_theme=fields->>'color_theme',region=fields->>'region',
 map_embed_url=fields->>'map_embed_url',brochure_url=fields->>'brochure_url',brochure_pdf_url=fields->>'brochure_pdf_url',
 published=(fields->>'published')::boolean,sort_order=(fields->>'sort_order')::integer where id=product_id;
 insert into public.circuit_translations(circuit_id,locale,name,description,price,highlights,itinerary,duration,included,excluded,activities)
 select product_id,x.locale,x.name,x.description,'',x.highlights,x.itinerary,coalesce(x.duration,''),coalesce(x.included,''),coalesce(x.excluded,''),coalesce(x.activities,'[]'::jsonb)
 from jsonb_to_recordset(translations) as x(locale text,name text,description text,highlights jsonb,itinerary jsonb,duration text,included text,excluded text,activities jsonb)
 on conflict(circuit_id,locale) do update set name=excluded.name,description=excluded.description,price='',highlights=excluded.highlights,itinerary=excluded.itinerary,duration=excluded.duration,included=excluded.included,excluded=excluded.excluded;
end $$;
revoke all on function public.save_catalog(text,jsonb,jsonb,boolean) from public, anon, authenticated;
grant execute on function public.save_catalog(text,jsonb,jsonb,boolean) to authenticated;
commit;
