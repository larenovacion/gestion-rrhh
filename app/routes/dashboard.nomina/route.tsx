import { ActionFunctionArgs, json } from "@remix-run/node";
import { getNominaItems } from "./queries";
import { MetaFunction, NavLink, useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
    return [{ title: "Dashboard" }];
};

// eslint-disable-next-line  @typescript-eslint/no-unused-vars
export async function loader({ request }: ActionFunctionArgs) {
    const nomina = await getNominaItems();

    return json({ nomina });
}

function formateDate(dateString: Date) {
    const date = new Date(dateString);
    return date.toLocaleDateString();
}

type EmpleadoData = {
    id: string;
    name: string;
    DNI: string;
    birth: Date;
    kids: number;
    address: string;
    tel: string;
    obvs: string;
    workData: {
        ant: string;
        cond: string;
        studies: string;
        area: string;
        disp: string;
    };
};

export default function NominaPage() {
    const data = useLoaderData<typeof loader>();
    const nomina = data.nomina;
    console.log("Data: ", data);

    return (
        <div className="w-full">
            <h2 className="text-3xl text-slate-900 font-bold pb-5">
                Nomina de empleados
            </h2>
            <div className="text-gray-700 w-fit">
                <table className="text-sm">
                    <thead>
                        <tr>
                            <th className="border-solid border-2 border-slate-800 bg-slate-900 text-white px-3 py-1">
                                Nombre
                            </th>
                            <th className="border-solid border-2 border-slate-800 bg-slate-900 text-white px-3 py-1">
                                DNI
                            </th>
                            <th className="border-solid border-2 border-slate-800 bg-slate-900 text-white px-3 py-1">
                                Fecha de nac.
                            </th>
                            <th className="border-solid border-2 border-slate-800 bg-slate-900 text-white px-3 py-1">
                                Hijos
                            </th>
                            <th className="border-solid border-2 border-slate-800 bg-slate-900 text-white px-3 py-1">
                                Telefono
                            </th>
                            <th className="border-solid border-2 border-slate-800 bg-slate-900 text-white px-3 py-1">
                                Domicilio
                            </th>
                            <th className="border-solid border-2 border-slate-800 bg-slate-900 text-white px-3 py-1">
                                Observaciones
                            </th>
                            <th className="border-solid border-2 border-slate-800 bg-slate-900 text-white px-3 py-1">
                                Antiguedad
                            </th>
                            <th className="border-solid border-2 border-slate-800 bg-slate-900 text-white px-3 py-1">
                                Estudios
                            </th>
                            <th className="border-solid border-2 border-slate-800 bg-slate-900 text-white px-3 py-1">
                                Condicion
                            </th>
                            <th className="border-solid border-2 border-slate-800 bg-slate-900 text-white px-3 py-1">
                                Area
                            </th>
                            <th className="border-solid border-2 border-slate-800 bg-slate-900 text-white px-3 py-1">
                                Disp. horaria
                            </th>
                            <th className="border-solid border-2 border-slate-800 bg-slate-900 text-white px-3 py-1"></th>
                        </tr>
                    </thead>
                    <tbody className="border-solid border-2">
                        {nomina.map((empleado: EmpleadoData) => (
                            <tr key={empleado.id}>
                                <td className="border-solid border-2 text- px-3 py-1">
                                    {empleado.name}
                                </td>
                                <td className="border-solid border-2 text- px-3 py-1">
                                    {empleado.DNI}
                                </td>
                                <td className="border-solid border-2 text- px-3 py-1">
                                    {formateDate(empleado.birth)}
                                </td>
                                <td className="border-solid border-2 text- px-3 py-1">
                                    {empleado.kids}
                                </td>
                                <td className="border-solid border-2 text- px-3 py-1">
                                    {empleado.tel}
                                </td>
                                <td className="border-solid border-2 text- px-3 py-1">
                                    {empleado.address}
                                </td>
                                <td className="border-solid border-2 text- px-3 py-1">
                                    {empleado.obvs}
                                </td>
                                <td className="border-solid border-2 text- px-3 py-1">
                                    {empleado.workData.ant}
                                </td>
                                <td className="border-solid border-2 text- px-3 py-1">
                                    {empleado.workData.studies}
                                </td>
                                <td className="border-solid border-2 text- px-3 py-1">
                                    {empleado.workData.cond}
                                </td>
                                <td className="border-solid border-2 text- px-3 py-1">
                                    {empleado.workData.area}
                                </td>
                                <td className="border-solid border-2 text- px-3 py-1">
                                    {empleado.workData.disp}
                                </td>
                                <td className="border-solid border-2 px-3 py-1">
                                    <NavLink
                                        to={`/dashboard/${empleado.id}`}
                                        className={
                                            "bg-slate-200 p-2 rounded-lg mt-4"
                                        }
                                    >
                                        Editar
                                    </NavLink>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-row gap-4">
                <NavLink
                    to={"/dashboard/new"}
                    className={"bg-slate-600 p-2 rounded-lg mt-4"}
                >
                    Añadir empleado
                </NavLink>
            </div>
        </div>
    );
}
