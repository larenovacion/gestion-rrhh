import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
    return [
        { title: "New Remix App" },
        { name: "description", content: "Welcome to Remix!" },
    ];
};

export default function Index() {
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
                <Link to={"/login"} className={"bg-slate-600 p-2 rounded-lg"}>
                    Login
                </Link>
                <Link to={"/signup"} className={"bg-slate-600 p-2 rounded-lg"}>
                    Crear Usuario
                </Link>
            </div>
        </div>
    );
}
