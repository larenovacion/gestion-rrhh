-   [x] Definir modelos en schema.prisma
-   [x] Actualizar seed.ts para que coincida con models
-   [x] Seedear db (db push)
-   [x] Definir routing de app
-   [x] Deploy a Cloudflare Pages (Vercel por el momento)
-   [x] Cambiar db a Neon Postgres (Vercel no admite SQLite)
-   [x] Modificar variables de entorno y redeployear
-   [x] Crear formularios de registro de empleados (CREAR/EDITAR)
-   [x] Crear formularios de login y registro de usuarios
-   [x] Añadir acciones para manejar datos de formularios
-   [x] Añadir loaders para conectar db a UI
-   [x] Implementar autenticación
-   [x] Crear ruta para eliminar datos

---

-   [x] MVP finalizado

---

#### Mejoras:

-   [ ] Crear buscador en nómona
-   [ ] Mejorar seguridad de las rutas con remix auth
-   [ ] Migrar a cuentas de produccion (GitHub, Vercel, etc)
-   [ ] Implementar zod y react-hook-form en verificación de formularios
-   [x] Diseñar y escribir UI
-   [x] Crear directorio de componentes de UI para agilizar migración y mantenimiento
-   [ ] Implementar React Supsense y UI skeletons para mejorar UX
-   [ ] Documentación de uso y mantenimiento
-   [x] Modificar db schema para añadir título y sysadmin
-   [x] Crear sysadmin endpoint y credenciales
-   [x] Añadir proceso de verificación de permisos de usuarios
-   [x] Añadir sistema de notificaiones por mail para el manejo de permisos de usuario
-   [x] Diseñar mail html
-   [x] Solucionar bug de autenticación para usuario sin permisos

### WORKFLOW DE [PRISMA](https://www.prisma.io/):

1. Definir modelos en schema.prisma
2. Migrar modelos a db con: npx prisma migrate dev --name init o npx prisma db push
3. Seedear con: npx tsx ./prisma/seed.ts
4. Dumpear la db si el seeding funciona
