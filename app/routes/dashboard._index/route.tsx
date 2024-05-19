import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getAuthFromRequest } from "~/auth";
import { getUser } from "../adminpanel/queries";
import { LogoBlack } from "~/components/ui/svgs";

export async function loader({ request }: LoaderFunctionArgs) {
    const userId = await getAuthFromRequest(request);
    const user = await getUser(String(userId));

    return json({ user });
}

export default function DashboardIndexPage() {
    const { user } = useLoaderData<typeof loader>();
    const userName = user.name;

    return (
        <div className="h-[calc(100%_-_3.5rem)] flex flex-col items-center px-4">
            <h2 className="text-3xl text-zinc-900 w-full font-bold pb-4 drop-shadow-sm">
                Dashboard
            </h2>
            <p className="text-zinc-600 w-full text-lg font-medium drop-shadow-sm">
                ¡Hola, <span className="text-violet-500">{userName}</span>!
            </p>
            <div className="w-7/12 md:w-96 flex flex-col items-center justify-center h-full">
                <LogoBlack className="opacity-15 w-1/2 h-1/2" />
                <ol className="text-zinc-400 list-decimal">
                    <li>
                        Haz click en{" "}
                        <code className="bg-violet-300 px-1 rounded text-white">
                            Nómina
                        </code>{" "}
                        para operar la base de datos.
                    </li>
                    <li>
                        Si tienes dudas, haz click en{" "}
                        <code className="bg-violet-300 px-1 rounded text-white">
                            Documentación.
                        </code>
                    </li>
                </ol>
            </div>
        </div>
    );
}
