import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { authCookie } from "~/auth";

export const meta: MetaFunction = () => {
    return [
        { title: "New Remix App" },
        { name: "description", content: "Welcome to Remix!" },
    ];
};

export async function loader({ request }: LoaderFunctionArgs) {
    const cookieString = request.headers.get("Cookie");
    const userId = await authCookie.parse(cookieString);
    return { userId };
}

export default function Index() {
    const { userId } = useLoaderData<typeof loader>();

    return (
        <div className="flex flex-col h-screen items-center justify-center">
            <h1 className="text-4xl text-white">Prueba de navegación</h1>
            <div className="flex flex-row gap-4 mt-4">
                <Link
                    to={"/dashboard"}
                    className={"bg-slate-600 p-2 rounded-lg"}
                >
                    Dashboard
                </Link>
                {userId === 1 ? (
                    <Link
                        to={"/login"}
                        className={"bg-slate-600 p-2 rounded-lg"}
                    >
                        Login
                    </Link>
                ) : (
                    <Link
                        to={"/signup"}
                        className={"bg-slate-600 p-2 rounded-lg"}
                    >
                        Crear Usuario
                    </Link>
                )}
            </div>
        </div>
    );
}
