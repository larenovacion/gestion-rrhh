import { LoaderFunctionArgs, json } from "@vercel/remix";
import { NavLink, useLoaderData } from "@remix-run/react";
import { getNomina } from "~/models/nomina.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const nomina = await getNomina();
    return json({ nomina });
};

export default function DashboardIndexPage() {
    const data = useLoaderData<typeof loader>();
    console.log(data);

    return (
        <div className="h-full flex flex-col items-center justify-center">
            <h2 className="text-2xl text-slate-600">Nomina de empleados</h2>
            <p className="text-zinc-500">En construcción...</p>
            <div>
                <p>Nombre: {data.nomina.name}</p>
                <p>Dirección: {data.nomina.address}</p>
                <p>Teléfono: {data.nomina.tel}</p>
            </div>

            <div className="flex flex-row gap-4">
                <NavLink
                    to={"/dashboard/new"}
                    className={"bg-slate-600 p-2 rounded-lg mt-4"}
                >
                    Añadir empleado
                </NavLink>
                <NavLink
                    to={"/dashboard/edit"}
                    className={"bg-slate-600 p-2 rounded-lg mt-4"}
                >
                    Editar empleado
                </NavLink>
            </div>
        </div>
    );
}
