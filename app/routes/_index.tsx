import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { NavLink, useLoaderData } from "@remix-run/react";
import { authCookie } from "~/auth";
import { Button } from "~/components/ui/buttons";

export const meta: MetaFunction = () => {
    return [
        { title: "Gestión RRHH | La Renovación" },
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
    console.log(userId);

    return (
        <main className="bg-[url(https://utfs.io/f/82943412-5579-4174-86b4-2440dc88cf07-oz9zf.svg)] bg-auto">
            <div className="flex flex-col h-screen items-center justify-center gap-4">
                <h1 className="text-5xl text-zinc-800 font-bold drop-shadow-lg">
                    La Renovación
                </h1>
                <p className="text-zinc-500 drop-shadow-lg text-lg">
                    Sistema de gestión de Recursos Humanos.
                </p>
                <div className="flex gap-4 mt-4">
                    {userId === null && (
                        <Button>
                            <NavLink to={"/login"}>
                                <span className="flex gap-2">
                                    Acceder
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
                                            d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                                        />
                                    </svg>
                                </span>
                            </NavLink>
                        </Button>
                    )}
                </div>
            </div>
        </main>
    );
}
