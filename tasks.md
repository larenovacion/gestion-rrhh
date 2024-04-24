-   [x] Definir modelos en schema.prisma
-   [x] Actualizar seed.ts para que coincida con models
-   [x] Seedear db (db push)
-   [ ] Definir routing de app
-   [ ] Crear formularios de registro (CREAR/EDITAR)
-   [ ] Crear ruta para eliminar datos
-   [ ] Diseñar UI
-   [ ] Deploy a Cloudflare Pages

### WORKFLOW DE PRISMA:

1. Definir modelos en schema.prisma.
2. Migrar modelos a db con: npx prisma migrate dev --name init o npx prisma db push.
3. Seedear con: npx tsx ./prisma/seed.ts.
4. Dumpear la db si el seeding funciona.
