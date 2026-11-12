# OnTour: administrador, catálogo y CRM

Estado: implementado en el repositorio. No desplegado y todavía sin proyecto de Supabase.
La web sigue mostrando el catálogo inicial mientras NEXT_PUBLIC_SUPABASE_ENABLED no sea true.
La publicación actual mantiene el administrador desactivado, incluso si existen claves configuradas.
Las fechas de salida no se inventan: si no están publicadas, se ofrece solicitar una fecha.
Los importes iniciales son contenido heredado y deben ser revisados antes de publicarlos como tarifas.

## Activación
1. Crear un proyecto de Supabase para OnTour. Elegir región y plan según almacenamiento, tráfico y política de copias.
2. Ejecutar una vez `supabase/schema.sql` y, a continuación, todos los archivos de `supabase/migrations/` en orden de nombre:
   - `20261110_operations.sql`
   - `20261111_catalog.sql`
   - `20261111_intake_limits.sql`
   No volver a ejecutar el esquema antiguo después de las migraciones: restablecería permisos antiguos. No exponer la aplicación hasta completar las migraciones.
3. En Authentication, desactivar el registro público y crear/invitar al administrador.
4. Copiar el UUID de ese usuario y ejecutar en el SQL Editor:
   ```sql
   insert into public.staff(user_id,role,active,require_mfa)
   values ('UUID_REAL_DEL_USUARIO','admin',true,true);
   ```
   Sustituir el marcador por el UUID real. Nunca guardar roles en user_metadata.
5. Configurar las variables de `.env.example` en el servidor. La clave de servicio solo debe existir en el servidor; nunca en código de cliente ni con prefijo NEXT_PUBLIC.
6. Para validar en staging, configurar `NEXT_PUBLIC_SUPABASE_ENABLED=true` y recompilar/desplegar ese entorno (Next.js incorpora esta variable pública durante la compilación). Mantenerla en false en producción hasta completar la validación. Abrir `/admin`, iniciar sesión y configurar el autenticador TOTP. La base de datos exige aal2 para los miembros con MFA obligatorio.
7. Importar el catálogo inicial. Se crea como borradores, incluidos circuitos y pasadías, sin inventar precios numéricos a partir de textos. Revisar galerías, duración, traducciones, tarifas y fechas; después marcar Publicado.
8. Validar en staging una solicitud real controlada y su aparición en CRM, las subidas de archivos y el inicio de sesión con MFA antes de desplegar.

## Roles
- admin: catálogo, CRM, tarifas e historial.
- editor: catálogo, imágenes, tarifas y salidas; sin acceso a datos comerciales del CRM.
- sales: agencias, oportunidades y cotizaciones; sin edición del catálogo.
- Usuario autenticado sin membresía activa: sin acceso al panel ni escritura en tablas.
Gestionar altas, bajas y roles desde Supabase con acceso administrativo. No se incluye una pantalla para conceder permisos.

## Catálogo y precios
Editar un producto permite modificar portada, galería, vídeos, textos en cuatro idiomas, duración, itinerario e inclusiones.
Los archivos admitidos son JPG, PNG, WebP, AVIF, MP4 y WebM, hasta 12 MB por archivo.
El bucket es público: usar solo material comercial autorizado, nunca documentos privados.

Las tarifas tienen importe por persona, moneda, vigencia de viaje, tamaño de grupo, ocupación y días de operación:
- Público: visible en web.
- Agencia: tarifa neta para el equipo comercial.
- Interno: costo de uso interno.
El resumen Desde utiliza tarifas aplicables a hoy, dos viajeros y ocupación doble; no convierte monedas.
El formulario de fechas filtra por fecha y grupo. La cotización final debe confirmar ocupación, suplementos, condiciones y disponibilidad.
No se permiten períodos superpuestos para la misma categoría, público, moneda, ocupación, grupo y día de operación.
Guardar tarifas es una transacción: un error conserva las anteriores.
Retirar de la web conserva los datos; volver a marcar Publicado permite recuperarlo.

En Salidas, establecer fecha, capacidad, cupos disponibles y estado.
Una consulta no descuenta cupos ni confirma una reserva. El equipo mantiene la disponibilidad.
No se incluyen pagos, emisión de reservas ni asignación automática de habitaciones.

## CRM
`/admin/crm` reúne solicitudes, responsables, estado comercial, siguiente tarea y seguimiento.
`/admin/crm/agencies` mantiene datos comerciales y acuerdos de agencias.
Cada oportunidad permite crear versiones de cotización con partidas, moneda, vigencia y condiciones.
Las versiones guardadas conservan importes y partidas; no se modifican desde el cliente.
Abrir la versión y usar Imprimir → Guardar como PDF. No se envían automáticamente a la agencia.
No se incluyen expedientes clínicos ni datos médicos. El formulario de coordinación solo recoge contacto y fecha.
El panel muestra las 100 solicitudes más recientes por filtro; no es aún un sistema de reservas ni una solución contable.

## Seguridad y operación
- RLS por rol y MFA en la base, además de controles del servidor.
- CSP por solicitud con nonce; scripts inline no autorizados quedan bloqueados. Esto requiere renderizado dinámico del HTML.
- JSON-LD escapa caracteres que podrían cerrar el script.
- Subidas con comprobación de cabeceras binarias, límites de lectura y origen.
- Cuerpos de formularios limitados a 12 KB y límites compartidos en Supabase. Sin Supabase, el límite es local al proceso.
- El hosting debe sobrescribir las cabeceras de IP del proxy; no aceptar cabeceras falsificables directamente desde Internet. Añadir protección de borde si se necesita mitigar ataques volumétricos.
- GA4 desactivado si no se configura. Con ID configurado, requiere aceptación y permite revocación.
- Cambios relevantes guardados en audit_log; restringido a admin.
- Configurar copias de seguridad de base de datos y Storage, conservación de datos y prueba de restauración. Una copia de la base no sustituye una copia de los archivos.
- Revocar una membresía con active=false corta los permisos de datos, aunque la sesión de autenticación siga vigente.

## Validación
Se ejecutaron migraciones en PostgreSQL 18 aislado, con esquemas auth/storage de prueba.
`supabase/tests/access.sql` comprueba exposición pública, roles, exigencia MFA, guardado de catálogo, rollback de tarifas superpuestas, inmutabilidad de propuestas e historial. Usa rollback.
`supabase/tests/local-bootstrap.sql` es SOLO para una base local vacía: nunca ejecutarlo en Supabase.
Estas pruebas no sustituyen la verificación de Supabase Auth, correo, Storage y recuperación de cuenta en staging.

Comandos del proyecto: npm test, npm run typecheck, npm run lint, npm run build.
La auditoría de dependencias distingue producción de herramientas de desarrollo. No se aplican downgrades de Next ni actualizaciones mayores forzadas para ocultar avisos.

## Cambios del cotizador público
Las tarifas de `src/data/circuitPricing.ts` están autorizadas para exposición pública.
Se conserva el nuevo selector por categoría hotelera y tamaño del grupo, sin modificar importes.
Colombia Diversamente Cultural corresponde a Bogotá, Medellín y Cartagena (14 días / 13 noches).
Se retiraron el antiguo Dorado de 10 días y Región Cafetera. Las tarifas del circuito de 14 días se contrastaron con las tablas del programa DOCX existente.

Pendiente antes de activar la gestión de precios en producción: el nuevo `RequestQuoteModal`
lee ese archivo estático y todavía no consume las tarifas del CMS. Las fichas y el formulario de fechas
sí usan el catálogo de Supabase cuando está configurado. Hay que unificar el cotizador con esa fuente
para evitar que editar un precio en el administrador deje otro importe en el modal.

La instalación define permisos explícitos sobre las tablas y funciones de OnTour.
El limitador solo permite ejecución con `service_role`, incluso si el proyecto concede
EXECUTE automáticamente a `anon` y `authenticated`.
Referencia: https://supabase.com/docs/guides/api/securing-your-api
La prueba local también cubre ausencia de grants automáticos sobre tablas y grants amplios sobre funciones.
