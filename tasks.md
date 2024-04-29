-   [x] Definir modelos en schema.prisma
-   [x] Actualizar seed.ts para que coincida con models
-   [x] Seedear db (db push)
-   [x] Definir routing de app
-   [x] Deploy a Cloudflare Pages (Vercel por el momento)
-   [x] Cambiar db a Neon Postgres (Vercel no admite SQLite)
-   [x] Modificar variables de entorno y redeployear
-   [X] Crear formularios de registro de empleados (CREAR/EDITAR)
-   [ ] Crear formularios de login y registro de usuarios
-   [ ] Añadir acciones para manejar datos de formularios
-   [ ] Añadir loaders para conectar db a UI
-   [ ] Implementar autenticación
-   [ ] Crear ruta para eliminar datos
-   [ ] Diseñar UI

### WORKFLOW DE PRISMA:

1. Definir modelos en schema.prisma.
2. Migrar modelos a db con: npx prisma migrate dev --name init o npx prisma db push.
3. Seedear con: npx tsx ./prisma/seed.ts.
4. Dumpear la db si el seeding funciona.
