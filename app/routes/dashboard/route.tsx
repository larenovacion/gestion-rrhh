import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import {
    Form,
    Link,
    MetaFunction,
    Outlet,
    useLoaderData,
} from "@remix-run/react";
import { useState } from "react";
import { getAuthFromRequest, getUserPermits } from "~/auth";
import { NavLinksDesktop, NavLinksMobile } from "~/components/Navlinks";
import { Button } from "~/components/ui/buttons";
import { Close, Hamburger, LogoBlack, Reload } from "~/components/ui/svgs";

export const meta: MetaFunction = () => {
    return [{ title: "Dashboard" }];
};

export async function loader({ request }: LoaderFunctionArgs) {
    const auth = await getAuthFromRequest(request);
    const hasPermits = await getUserPermits(String(auth));

    if (!auth) {
        throw redirect("/login");
    }

    return { auth, hasPermits };
}

export default function DashboardPage() {
    const [showMenu, setShowMenu] = useState(false);
    const { auth, hasPermits } = useLoaderData<typeof loader>();
    const userId = auth;
    const userPermits = hasPermits?.permits;

    function toggleMenu() {
        setShowMenu(!showMenu);
    }

    return (
        <main className="flex lg:grid grid-cols-[15rem_minmax(0,_1fr)] h-screen text-white overflow-hidden">
            {userPermits ? (
                <>
                    <aside className="hidden lg:flex flex-col items-left justify-start bg-zinc-800">
                        <NavLinksDesktop />
                    </aside>
                    <section className="w-full">
                        <NavLinksMobile
                            className={`absolute z-20 bottom-0 ${
                                showMenu ? "left-0" : "-left-full"
                            } bg-zinc-800 ease-in-out duration-300 flex flex-col h-[calc(100%_-_3.5rem)] w-3/5 max-w-60 lg:hidden`}
                        />
                        <header className="w-full h-14 flex items-center justify-between lg:justify-end px-2">
                            <div className="lg:hidden">
                                <Button variant="icon" onClick={toggleMenu}>
                                    {showMenu ? (
                                        <Close className="w-9" />
                                    ) : (
                                        <Hamburger className="w-9" />
                                    )}
                                </Button>
                            </div>

                            <div className="text-md">
                                {userId ? (
                                    <form action="/logout" method="post">
                                        <Button variant="light">
                                            Cerrar sesión
                                        </Button>
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
                </>
            ) : (
                <div className="flex flex-col w-screen items-center justify-center gap-4">
                    <LogoBlack className="w-56 h-56" />
                    <h2 className="text-3xl text-zinc-800 font-semibold">
                        Estamos dando de alta su usuario
                    </h2>
                    <p className="text-xl text-zinc-500">
                        Por favor, espere unos minutos
                    </p>
                    <div className="flex gap-6">
                        <Form reloadDocument>
                            <Button>
                                <Reload />
                                Recargar
                            </Button>
                        </Form>
                        <form action="/logout" method="post">
                            <Button variant="light">Cerrar sesión</Button>
                        </form>
                    </div>
                </div>
            )}
        </main>
    );
}
