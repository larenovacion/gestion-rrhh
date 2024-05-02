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
    console.log(userId);

    return (
        <main className="bg-[url(https://utfs.io/f/074880db-ab54-4edb-9753-526fead70e70-buyd5w.svg)] bg-cover">
            <div className="bg-[url(https://utfs.io/f/c41fa459-4212-4785-a063-ecf31910bf8d-buyd51.svg)] bg-cover w-full h-full">
                <div className="flex flex-col h-screen items-center justify-center gap-4">
                    <h1 className="text-5xl text-zinc-800 font-bold drop-shadow-lg">
                        La Renovación
                    </h1>
                    <p className="text-zinc-500 drop-shadow-lg text-lg">
                        Sistema de gestión de Recursos Humanos.
                    </p>
                    <div className="flex flex-row gap-4 mt-4">
                        {userId === null && (
                            <Link
                                to={"/login"}
                                className={
                                    "bg-zinc-800 transition duration-0 hover:bg-violet-600 hover:duration-200 active:bg-violet-400 active:duration-0 py-2 px-4 rounded-lg text-white drop-shadow-lg"
                                }
                            >
                                <span className="flex flex-row gap-2">
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
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
