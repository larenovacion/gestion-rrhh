import type {
    LinksFunction,
    LoaderFunctionArgs,
    MetaFunction,
} from "@remix-run/node";
import { NavLink, useLoaderData } from "@remix-run/react";
import { authCookie } from "~/auth";
import { Button } from "~/components/ui/buttons";
import { ArrowLeft, ArrowRight, LogoBlack } from "~/components/ui/svgs";

export const meta: MetaFunction = () => {
    return [
        { title: "Gestión RRHH | La Renovación" },
        { name: "description", content: "Welcome to Remix!" },
    ];
};

export const links: LinksFunction = () => {
    return [
        {
            rel: "icon",
            href: "/favicon.png",
            type: "image/png",
        },
    ];
};

export async function loader({ request }: LoaderFunctionArgs) {
    const cookieString = request.headers.get("Cookie");
    const userId = await authCookie.parse(cookieString);
    return { userId };
}

export default function Index() {
    const { userId } = useLoaderData<typeof loader>();
    console.log(userId);

    return (
        <main className="bg-[url(https://utfs.io/f/82943412-5579-4174-86b4-2440dc88cf07-oz9zf.svg)] bg-auto">
            <div className="flex flex-col h-screen items-center justify-center gap-8">
                {/* <h1 className="text-5xl text-zinc-800 font-bold drop-shadow-lg">
                    La Renovación
                </h1> */}
                <LogoBlack className="w-48 h-48 md:w-72 md:h-72" />
                <p className="text-zinc-500 drop-shadow-lg text-md md:text-lg">
                    Sistema de gestión de Recursos Humanos.
                </p>
                <div className="flex gap-4 mt-4">
                    {userId === null ? (
                        <Button>
                            <NavLink to={"/login"}>
                                <span className="flex gap-2">
                                    Acceder
                                    <ArrowRight />
                                </span>
                            </NavLink>
                        </Button>
                    ) : (
                        <Button>
                            <NavLink to={"/dashboard"}>
                                <span className="flex gap-2">
                                    <ArrowLeft />
                                    Volver a Dashboard
                                </span>
                            </NavLink>
                        </Button>
                    )}
                </div>
            </div>
        </main>
    );
}
