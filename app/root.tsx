import {
    // Link,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    redirect,
    // useLoaderData,
} from "@remix-run/react";

import "./tailwind.css";
import { getAuthFromRequest } from "./auth";
import { LoaderFunctionArgs } from "@remix-run/node";
import { SpeedInsights } from "@vercel/speed-insights/remix";

export async function loader({ request }: LoaderFunctionArgs) {
    const auth = await getAuthFromRequest(request);
    if (auth && new URL(request.url).pathname === "/") {
        throw redirect("/dashboard");
    }
    return auth;
}

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="es">
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <Meta />
                <Links />
            </head>
            <body className="bg-zinc-100 font-inter">
                {children}
                <SpeedInsights />
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}

export default function App() {
    return <Outlet />;
}
