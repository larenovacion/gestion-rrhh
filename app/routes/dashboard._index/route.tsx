import { LoaderFunctionArgs, json } from "@remix-run/node";
import { NavLink, useLoaderData } from "@remix-run/react";
import { getNominaItems } from "./queries";

// type EmpleadoData = {
//     id: string;
//     name: string;
//     DNI: string;
//     birth: Date;
//     kids: number;
//     address: string;
//     tel: string;
//     obvs: string;
//     workData: WorkData;
// };

// type WorkData = {
//     ant: string;
//     cond: string;
//     studies: string;
//     area: string;
//     a_cargo: string;
//     disp: string;
// };

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const nomina = await getNominaItems();
    console.log("Nomina", nomina);

    return json({ nomina });
};

export default function DashboardIndexPage() {
    const data = useLoaderData<typeof loader>();
    console.log(data);
    const parseDate = new Date(data.nomina[0].birth);
    console.log(parseDate.toLocaleDateString());

    return (
        <div className="h-full flex flex-col items-center justify-center">
            <h2 className="text-2xl text-slate-600">Nomina de empleados</h2>
            <div>Data here:</div>

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
