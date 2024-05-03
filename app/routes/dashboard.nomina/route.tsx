import {
    ActionFunctionArgs,
    LoaderFunctionArgs,
    json,
    redirect,
} from "@remix-run/node";
import { deleteItem, getNominaItems } from "./queries";
import {
    Form,
    MetaFunction,
    NavLink,
    useActionData,
    useLoaderData,
} from "@remix-run/react";
import { Button } from "~/components/ui/buttons";

export const meta: MetaFunction = () => {
    return [{ title: "Dashboard | Nómina" }];
};

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const id = String(formData.get("id"));

    await deleteItem(id);

    return redirect("/dashboard/nomina");
}

// eslint-disable-next-line  @typescript-eslint/no-unused-vars
export async function loader({ request }: LoaderFunctionArgs) {
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
    const action = useActionData<typeof action>();
    const nomina = data.nomina;
    // console.log("Data: ", data);

    return (
        <div className="w-full px-4">
            <h2 className="text-3xl text-slate-900 font-bold pb-5">
                Nómina de empleados
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
                            <th className="border-solid border-2 border-slate-800 bg-slate-900 text-white px-3 py-1"></th>
                        </tr>
                    </thead>
                    <tbody className="border-solid border-2">
                        {nomina.map((empleado: EmpleadoData) => (
                            <tr key={empleado.id}>
                                <td className="border-solid border-2 px-3 py-1">
                                    {empleado.name}
                                </td>
                                <td className="border-solid border-2 px-3 py-1">
                                    {empleado.DNI}
                                </td>
                                <td className="border-solid border-2 px-3 py-1">
                                    {formateDate(empleado.birth)}
                                </td>
                                <td className="border-solid border-2 px-3 py-1">
                                    {empleado.kids}
                                </td>
                                <td className="border-solid border-2 px-3 py-1">
                                    {empleado.tel}
                                </td>
                                <td className="border-solid border-2 px-3 py-1">
                                    {empleado.address}
                                </td>
                                <td className="border-solid border-2 px-3 py-1">
                                    {empleado.obvs}
                                </td>
                                <td className="border-solid border-2 px-3 py-1">
                                    {empleado.workData.ant}
                                </td>
                                <td className="border-solid border-2 px-3 py-1">
                                    {empleado.workData.studies}
                                </td>
                                <td className="border-solid border-2 px-3 py-1">
                                    {empleado.workData.cond}
                                </td>
                                <td className="border-solid border-2 px-3 py-1">
                                    {empleado.workData.area}
                                </td>
                                <td className="border-solid border-2 px-3 py-1">
                                    {empleado.workData.disp}
                                </td>
                                <td className="border-solid border-2 px-3 py-1">
                                    <Button variant="light">
                                        <NavLink
                                            to={`/dashboard/${empleado.id}`}
                                        >
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
                                                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                                />
                                            </svg>
                                        </NavLink>
                                    </Button>
                                </td>
                                <td className="border-solid border-2 px-3 py-1">
                                    <Form method="post">
                                        <input
                                            type="text"
                                            value={empleado.id}
                                            id="id"
                                            name="id"
                                            hidden
                                            readOnly
                                        />
                                        <Button variant="delete">
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
                                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                                />
                                            </svg>
                                        </Button>
                                    </Form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-row gap-4 mt-4">
                <Button>
                    <NavLink to={"/dashboard/new"}>Añadir empleado</NavLink>
                </Button>
            </div>
        </div>
    );
}
