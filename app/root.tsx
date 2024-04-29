import {
    Link,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    redirect,
    useLoaderData,
} from "@remix-run/react";

import "./tailwind.css";
import { getAuthFromRequest } from "./auth";
import { LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ request }: LoaderFunctionArgs) {
    const auth = await getAuthFromRequest(request);
    if (auth && new URL(request.url).pathname === "/") {
        throw redirect("/");
    }
    return auth;
}

export function Layout({ children }: { children: React.ReactNode }) {
    const userId = useLoaderData<typeof loader>();

    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <Meta />
                <Links />
            </head>
            <body className="bg-slate-300 font-bold text-xl text-white">
                <header className="w-full bg-purple-700 h-16 flex items-center justify-between">
                    <div className="text-2xl pl-8">
                        <Link to="/">
                            {"[ "}Inicio{" ]"}
                        </Link>
                    </div>

                    <div className="text-md pr-8">
                        {userId ? (
                            <form action="/logout" method="post">
                                <button>
                                    <span className="font-medium bg-purple-400 px-3 py-1 rounded-lg">
                                        Cerrar Sesion
                                    </span>
                                </button>
                            </form>
                        ) : (
                            <Link to="/login">
                                <span className="font-medium bg-purple-400 px-3 py-1 rounded-lg">
                                    Iniciar Sesion
                                </span>
                            </Link>
                        )}
                    </div>
                </header>
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}

export default function App() {
    return <Outlet />;
}
