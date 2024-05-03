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
import { Edit, NewPerson, Trash } from "~/components/ui/svgs";

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
        <div className="flex flex-col w-full px-4 h-[calc(100%_-_3.5rem)]">
            <h2 className="text-3xl text-zinc-900 w-full font-bold pb-4 drop-shadow-sm">
                Nómina de empleados
            </h2>
            <div className="flex flex-row gap-4 pb-6">
                <Button>
                    <NavLink to={"/dashboard/new"}>
                        <span className="flex gap-2">
                            <NewPerson />
                            Añadir empleado
                        </span>
                    </NavLink>
                </Button>
            </div>

            <div className="text-gray-700 pb-4 w-[100%] overflow-auto scrollbar-thin">
                <table className="text-sm text-nowrap">
                    <thead>
                        <tr>
                            <th className="border-solid border-2 border-zinc-800 bg-zinc-900 text-white p-3">
                                Nombre
                            </th>
                            <th className="border-solid border-2 border-zinc-800 bg-zinc-900 text-white p-3">
                                DNI
                            </th>
                            <th className="border-solid border-2 border-zinc-800 bg-zinc-900 text-white p-3">
                                Fecha de nac.
                            </th>
                            <th className="border-solid border-2 border-zinc-800 bg-zinc-900 text-white p-3">
                                Hijos
                            </th>
                            <th className="border-solid border-2 border-zinc-800 bg-zinc-900 text-white p-3">
                                Telefono
                            </th>
                            <th className="border-solid border-2 border-zinc-800 bg-zinc-900 text-white p-3">
                                Domicilio
                            </th>
                            <th className="border-solid border-2 border-zinc-800 bg-zinc-900 text-white p-3">
                                Observaciones
                            </th>
                            <th className="border-solid border-2 border-zinc-800 bg-zinc-900 text-white p-3">
                                Antiguedad
                            </th>
                            <th className="border-solid border-2 border-zinc-800 bg-zinc-900 text-white p-3">
                                Estudios
                            </th>
                            <th className="border-solid border-2 border-zinc-800 bg-zinc-900 text-white p-3">
                                Condicion
                            </th>
                            <th className="border-solid border-2 border-zinc-800 bg-zinc-900 text-white p-3">
                                Area
                            </th>
                            <th className="border-solid border-2 border-zinc-800 bg-zinc-900 text-white p-3">
                                Disp. horaria
                            </th>
                            <th className="border-solid border-2 border-zinc-800 bg-zinc-900 text-white p-3"></th>
                            <th className="border-solid border-2 border-zinc-800 bg-zinc-900 text-white p-3"></th>
                        </tr>
                    </thead>
                    <tbody className="border-solid border-2">
                        {nomina.map((empleado: EmpleadoData) => (
                            <tr key={empleado.id}>
                                <td className="border-solid border-2 p-3">
                                    {empleado.name}
                                </td>
                                <td className="border-solid border-2 p-3">
                                    {empleado.DNI}
                                </td>
                                <td className="border-solid border-2 p-3">
                                    {formateDate(empleado.birth)}
                                </td>
                                <td className="border-solid border-2 p-3">
                                    {empleado.kids}
                                </td>
                                <td className="border-solid border-2 p-3">
                                    {empleado.tel}
                                </td>
                                <td className="border-solid border-2 p-3">
                                    {empleado.address}
                                </td>
                                <td className="border-solid border-2 p-3">
                                    {empleado.obvs}
                                </td>
                                <td className="border-solid border-2 p-3">
                                    {empleado.workData.ant}
                                </td>
                                <td className="border-solid border-2 p-3">
                                    {empleado.workData.studies}
                                </td>
                                <td className="border-solid border-2 p-3">
                                    {empleado.workData.cond}
                                </td>
                                <td className="border-solid border-2 p-3">
                                    {empleado.workData.area}
                                </td>
                                <td className="border-solid border-2 p-3">
                                    {empleado.workData.disp}
                                </td>
                                <td className="border-solid border-2 p-3">
                                    <Button variant="light">
                                        <NavLink
                                            to={`/dashboard/${empleado.id}`}
                                        >
                                            <Edit />
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
                                            <Trash />
                                        </Button>
                                    </Form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
