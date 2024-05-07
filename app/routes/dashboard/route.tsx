import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import {
    Link,
    MetaFunction,
    NavLink,
    Outlet,
    useLoaderData,
} from "@remix-run/react";
import { getAuthFromRequest } from "~/auth";
import { Button } from "~/components/ui/buttons";
import {
    Files,
    Folder,
    LogoHorizontalWhite,
    Table,
} from "~/components/ui/svgs";

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
        <main className="grid grid-cols-[15rem_minmax(0,_1fr)] h-screen text-white">
            <aside className="flex flex-col items-left justify-start bg-zinc-800">
                <div className="flex flex-col gap-1 p-2">
                    <Link
                        to="/"
                        className={
                            "p-3 hover:bg-violet-900 hover:drop-shadow-md rounded-md transition duration-0 hover:duration-150"
                        }
                    >
                        <LogoHorizontalWhite className="w-full h-min" />
                    </Link>
                    {/* <NavLink
                        to={"/dashboard"}
                        className={
                            "p-3 hover:bg-violet-900 hover:drop-shadow-md rounded-md transition duration-0 hover:duration-150"
                        }
                    >
                        <span className="flex gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                />
                            </svg>
                            Dashboard
                        </span>
                    </NavLink> */}
                    <NavLink
                        to={"/dashboard/nomina"}
                        className={({ isActive }) => {
                            return isActive
                                ? "text-violet-400 p-3 hover:bg-violet-900 hover:drop-shadow-md rounded-md transition duration-0 hover:duration-150"
                                : "p-3 hover:bg-violet-900 rounded-md transition duration-0 hover:duration-150";
                        }}
                    >
                        <span className="flex gap-2">
                            <Table />
                            Nómina
                        </span>
                    </NavLink>
                    <Link
                        to={
                            "https://github.com/uno-nueve/gestion-rrhh?tab=readme-ov-file#documentaci%C3%B3n"
                        }
                        className={
                            "p-3 hover:bg-violet-900 hover:drop-shadow-md rounded-md transition duration-0 hover:duration-150"
                        }
                    >
                        <span className="flex gap-2">
                            <Folder />
                            Documentación
                        </span>
                    </Link>
                    <NavLink to={""} className={"p-3 text-gray-600"}>
                        <span className="flex gap-2">
                            <Files />
                            Operativos
                        </span>
                    </NavLink>
                </div>
            </aside>
            <section>
                <header className="w-full h-14 flex items-center justify-end">
                    <div className="text-md pr-2">
                        {userId ? (
                            <form action="/logout" method="post">
                                <Button variant="light">Cerrar sesión</Button>
                            </form>
                        ) : (
                            <Button>
                                <Link to="/login" />
                            </Button>
                        )}
                    </div>
                </header>
                <Outlet />
            </section>
        </main>
    );
}
