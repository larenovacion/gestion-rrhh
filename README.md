# Sistema de Gestión de Recursos Humanos

![Home page del sistema de gestión](https://utfs.io/f/1ec11cee-9164-4af7-8d9d-9e2b7c0871e7-1wrmn.png)

## Documentación:

-   [Documentación de usuario](#documentacion-de-usuario)
-   [Documentación de mantenimiento](#documentacion-de-mantenimiento)

---

## Documentacion de Usuario

---

Bienvenidx al Sistema de Gestión de Recursos Humanos de La Renovación.

Te guiaremos por la aplicación para que conozcas su funcionamiento.

En la portada viste la pantalla de bienvenida de la aplicación. Al hacer click en `Acceder` verás la siguiente pantalla:

![Login page del sistema de gestión](https://utfs.io/f/e61e750d-60c0-4fad-8f8e-c4a77a951e68-1e.png)

Vas a iniciar sesión con las `credenciales` que se te otorguen.

> Si no tienes credenciales ponte en contacto con los [administradores](#administradores)

Una vez inicies sesión, vas a ver la pantalla principal del `Dashboard`:

![Dashboard](https://utfs.io/f/6f4799ed-012b-427c-8bf4-f699fc0e3ede-1f.png)

A tu izquerda está la `barra de navegación`, si haces click en `Nómina` vas a navegar a la sección de manipulación de la base de datos.

![Nómina](https://utfs.io/f/feec1438-d8f7-421d-bd26-7c9b5810e27b-5h0gqz.png)

Como podés ver, desde esta sección podrás: ver los datos de los empleados en una tabla, buscar datos concretos y filtrar la tabla usando filtros (verás más sobre esto más adelante) y añadir empleados a la nómina.

Si hacemos click en `Añadir empleado` navegaremos al siguiente formulario:

![Formulario](https://utfs.io/f/473a733a-444a-4b3a-b261-a1fc68cca6ce-1h.png)

> Todos los campos son obligatorios, excepto el de observaciones.

**Algunas recomendaciones:**

-   Cantidad de hijos siempre debe ser un número, si introducís 0, verás _No tiene_ en la nómina.
-   Antiguedad es la fecha de ingreso a La Renovación.
-   Usá un formato adecuado y consistente para la disponibilidad horaria. Ejemplo: Mañana: 9 a 13, Tarde: 18 a 20. Esto es importante para el correcto funcionamiento del `buscador`.
-   Todos los campos que tienen opciones predefinidas, son los valores que vas a usar para filtrar la nómina.

> Una vez completes el formulario y hagas click en el botón Crear, volverás a la `Nómina`.

En la tabla de la Nómina, si deslizaas a la derecha, verás unos botones al final:

![Acciones de tabla](https://utfs.io/f/47948795-6ad6-4793-ad2f-1af9edbbd929-1l.png)

Estas son las acciones de `Editar` y `Borrar`.

Si haces click en editar, verás el formulario anterior con los datos del empleado precargados:

![Editar empleado](https://utfs.io/f/05816fac-2cac-47ae-8723-11184c063edf-1i.png)

Si haces click en borrar, aparecerá el siguiente cuadro de diálogo para que confirmes la acción:

![Borrar modal](https://utfs.io/f/31af8903-6350-4fe5-b798-0f4d20660af6-1k.png)

_Este cuadro previene que borres registros por accidente._

Finalmente, veremos el buscador y los filtros.

![Buscador y filtros](https://utfs.io/f/71691579-0bc2-4a18-b854-e5d5fcc86872-1j.png)

El botón resaltado en morado es el que muestra/oculta los `filtros`. Al hacer click se te mostrarán las siguientes opciones. Son los mismos campos del formulario. Puedes seleccionar los tres al mismo tiempo de ser necesario.

Al seleccionar una opción también aparecerá un botón para limpiar los filtros:

![Limpiar filtros](https://utfs.io/f/47480cd9-b1b6-45aa-94f6-fd0faa9c483e-17j.png)

Al hacer click en el botón, la tabla volverá a la normalidad.

Finalmente, si la nómina está vacía, ya sea porque no hay datos, hay un error con la conección con la base de datos o la busqueda no dió resultados verás la siguiente página:

![No data](https://utfs.io/f/3e7238aa-31b3-4893-8ab9-b50048ceeda0-17k.png)

Hemos llegado al final de la documentación. Si tienes dudas o encuentras algún error en el funcionamiento de la aplicación, contacta con los [administradores](#administradores).

---

## Documentacion de mantenimiento

### Stack de tecnologías:

-   Framework: [Remix](https://remix.run/)
-   Development DB: [Neon](https://neon.tech/)
-   Production DB: [Vercel Postgres](https://vercel.com/storage/postgres)
-   DB ORM: [Prisma](https://www.prisma.io/)
-   PaaS: [Vercel](https://vercel.com/)
-   Email Notification System: [Nodemailer](https://www.npmjs.com/package/nodemailer) + [Google App Password](https://support.google.com/accounts/answer/185833?hl=en)

### Folder structure

![Folder structure](https://utfs.io/f/beb85d7a-8112-4df2-a056-cbf9c1dbafb9-rwao8c.png)

Usamos la estructura de [conventional route folders](https://remix.run/docs/en/main/discussion/routes#conventional-route-folders) de Remix donde el routing está determinado por cada carpeta que contenga un archivo `route.tsx` . Las carpetas también contienen archivos que conciernen a esa ruta como `validate.ts` o `queries.ts` .

### ORM

En el directorio raíz tenemos la carpeta prisma que contiene todo lo concerniente al manejo de la ORM.

En el archivo `schema.prisma` vamos a definir nuestros schemas correspondientes a las tablas que vamos a usar.

Siempre que modifiquemos los schemas necesitamos ejecutar el script `npx prisma generate` para generar los tipos de nuestra base de datos. Es recomendable reiniciar el server de desarrollo y el server de typescript de VSCode.

En el directorio `app` tenemos dos archivos importantes que debemos definir.

```ts
//singleton.server.ts

export const singleton = <Value>(
    name: string,
    valueFactory: () => Value
): Value => {
    const g = global as unknown as { __singletons: Record<string, unknown> };
    g.__singletons ??= {};
    g.__singletons[name] ??= valueFactory();
    return g.__singletons[name] as Value;
};
```

```ts
//db.server.ts

import { PrismaClient } from "@prisma/client";
import { singleton } from "./singleton.server";

const prisma = singleton("prisma", () => new PrismaClient());
try {
    prisma.$connect;
} catch (error) {
    throw new Error("No se pudo cestablecer conección con base de datos.");
}

export { prisma };
```

_Estos middlewares se encargan de administrar la conexión de nuestra base de datos_.

Una vez generados los tipos de la base de datos, pusheamos los schemas con el script `npx prisma db push` .

Para seedear la base de datos ejecutamos una función en un archivo mediante [tsx](https://www.npmjs.com/package/tsx) con el script `npx tsx {file.ts}` . Vamos a usar este script para seedear nuestro Admin a la base de datos desde un archivo que debemos añadir en nuestro `.gitignore` .

Finalmente ejecutando `npx prisma studio` ejecutamos un cliente que conecta con nuestra base de datos para administrar las tablas y sus valores.

### Deployment

Desde Vercel integramos la cuenta de github de La Renovación y seguimos las instrucciones. Vercel normalmente completa la build del proyecto incluso si faltan variables de entorno, sin embargo es recomendable definirlas antes de hacer deploy.

Una vez deployeado, debemos vincular el proyecto a la base de datos de Vercel y cambiar la variable de entorno correspondiente a nuestra base de datos. Esta será nuestra base de datos de producción.

Finalmente, debemos agregar un [cron job](https://vercel.com/docs/cron-jobs)

```ts
//app/api/cron.ts

import { VercelRequest, VercelResponse } from "@vercel/node";

export default async function loader(
    request: VercelRequest,
    response: VercelResponse
) {
    const authHeader = request.headers["authorization"];

    if (authHeader && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return response.status(401).end("Unauthorized");
    }
    return response.status(200).send("Hello Cron!");
}
```

_Debemos generar el valor de CRON_SECRET nosotros mismos._

Y un archivo en nuestro directorio raíz.

```json
//vercel.json

{
    "crons": [
        {
            "path": "/api/cron",
            "schedule": "0 8 * * *"
        }
    ]
}
```

### Notificaciones email

El sistema envía emails mediante Nodemailer usando una contraseña de aplicaciones de google para enviar mails automáticamente desde el email de IT de La Renovación. La contraseña la obtenemos y la guardamos en nuestras variables de entorno.

El cron job se encarga de "calentar" las funciones serverless para que no se vean afectadas por un "cold start" del servidor para prevenir el delay en el sistema de notificaciones.

### Administradores

| Nombre           | Email                       | Número de teléfono |
| ---------------- | --------------------------- | ------------------ |
| Ignacio Pantoja  | pantojaignacio642@gmail.com | 3804800454         |
| Luciano Montilla | lumontilla95@gmail.com      | 3804113325         |
