import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import {
    Link,
    MetaFunction,
    NavLink,
    Outlet,
    useLoaderData,
} from "@remix-run/react";
import { getAuthFromRequest } from "~/auth";

export const meta: MetaFunction = () => {
    return [{ title: "Dashboard" }];
};

export async function loader({ request }: LoaderFunctionArgs) {
    const auth = await getAuthFromRequest(request);

    if (!auth) {
        throw redirect("/login");
    }

    return auth;
}

export default function DashboardPage() {
    const userId = useLoaderData<typeof loader>();

    return (
        <div>
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
            <div className="grid grid-cols-[15rem_1fr] h-screen text-white">
                <div className="w-60 flex flex-col items-left justify-between bg-slate-900">
                    <div>
                        <NavLink
                            to={"/dashboard/"}
                            className={"bg-slate-800 p-3 m-2 rounded-lg block"}
                        >
                            Dashboard
                        </NavLink>
                        <NavLink
                            to={"/dashboard/nomina"}
                            className={"bg-slate-800 p-3 m-2 rounded-lg block"}
                        >
                            Nomina de empleados
                        </NavLink>
                        <NavLink
                            to={""}
                            className={
                                "bg-slate-800 p-3 m-2 rounded-lg block text-gray-600"
                            }
                        >
                            Operativos
                        </NavLink>
                    </div>
                    <div></div>
                </div>
                <div className="mt-16 p-3">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
