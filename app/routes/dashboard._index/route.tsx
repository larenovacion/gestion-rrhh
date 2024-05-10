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
    const loaderData = useLoaderData<typeof loader>();
    const userName = loaderData.user.name;

    return (
        <div className="h-[calc(100%_-_3.5rem)] flex flex-col items-center px-4">
            <h2 className="text-3xl text-zinc-900 w-full font-bold pb-4 drop-shadow-sm">
                Dashboard
            </h2>
            <p className="text-zinc-500 w-full">
                ¡Hola, {userName}! Bienvenidx al Sistema de Gestión de Recursos
                Humanos .
            </p>
            <div className="w-7/12 md:w-96 flex flex-col gap-4 items-center justify-center h-full">
                <LogoBlack className="opacity-15 w-1/2 h-1/2" />
            </div>
        </div>
    );
}
