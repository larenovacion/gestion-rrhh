import {
    ActionFunctionArgs,
    LoaderFunctionArgs,
    json,
    redirect,
} from "@remix-run/node";
import { deleteItem, getNominaItems } from "./queries";
import {
    Await,
    Form,
    MetaFunction,
    NavLink,
    useLoaderData,
} from "@remix-run/react";
import { Button } from "~/components/ui/buttons";
import { Edit, NewPerson, Trash, Search } from "~/components/ui/svgs";
import { Td, Th } from "~/components/ui/table";
import { Suspense } from "react";
import { NominaSkeleton } from "~/components/ui/skeletons";
import { Input } from "~/components/ui/inputs";
import { Label } from "~/components/ui/label";

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
        studies_grade: string;
        area: string;
        disp: string;
    };
};

export default function NominaPage() {
    const { nomina } = useLoaderData<typeof loader>();

    return (
        <Suspense fallback={<NominaSkeleton />}>
            <Await resolve={nomina}>
                <div className="flex flex-col w-full px-4 h-[calc(100%_-_3.5rem)]">
                    <h2 className="text-3xl text-zinc-900 w-full font-bold pb-4 drop-shadow-sm">
                        Nómina de empleados
                    </h2>
                    <div className="flex flex-row justify-between pb-6">
                        <Button variant="dark_nopad">
                            <NavLink
                                to={"/dashboard/new"}
                                className="px-4 py-2"
                            >
                                <span className="flex gap-2">
                                    <NewPerson />
                                    Añadir empleado
                                </span>
                            </NavLink>
                        </Button>
                        <Form method="post" className="flex gap-3">
                            <Input className="text-zinc-900 border-zinc-900" type="text" variant="filled" name="search" id="search" placeholder="Buscar" />
                            <Button>
                                <span>
                                    <Search/>
                                </span>
                            </Button>
                        </Form>
                    </div>
                    {nomina.length > 0 ? (
                        <>
                            <div className="text-gray-700 pb-4 w-[100%] max-h-[77vh] overflow-auto scrollbar-thin">
                                <table className="text-sm text-nowrap">
                                    <thead>
                                        <tr>
                                            <Th>Nombre</Th>
                                            <Th>DNI</Th>
                                            <Th>Fecha de nac.</Th>
                                            <Th>Hijos</Th>
                                            <Th>Telefono</Th>
                                            <Th>Domicilio</Th>
                                            <Th>Observaciones</Th>
                                            <Th>Antiguedad</Th>
                                            <Th>Estudios</Th>
                                            <Th>Título</Th>
                                            <Th>Condicion</Th>
                                            <Th>Area</Th>
                                            <Th>Disp. horaria</Th>
                                            <Th></Th>
                                            <Th></Th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {nomina.map(
                                            (empleado: EmpleadoData) => (
                                                <tr key={empleado.id}>
                                                    <Td>{empleado.name}</Td>
                                                    <Td>{empleado.DNI}</Td>
                                                    <Td>
                                                        {formateDate(
                                                            empleado.birth
                                                        )}
                                                    </Td>
                                                    <Td>{empleado.kids}</Td>
                                                    <Td>{empleado.tel}</Td>
                                                    <Td>{empleado.address}</Td>
                                                    <Td>{empleado.obvs}</Td>
                                                    <Td>
                                                        {empleado.workData.ant}
                                                    </Td>
                                                    <Td>
                                                        {
                                                            empleado.workData
                                                                .studies
                                                        }
                                                    </Td>
                                                    <Td>
                                                        {
                                                            empleado.workData
                                                                .studies_grade
                                                        }
                                                    </Td>
                                                    <Td>
                                                        {empleado.workData.cond}
                                                    </Td>
                                                    <Td>
                                                        {empleado.workData.area}
                                                    </Td>
                                                    <Td>
                                                        {empleado.workData.disp}
                                                    </Td>
                                                    <Td>
                                                        <Button variant="light">
                                                            <NavLink
                                                                to={`/dashboard/${empleado.id}`}
                                                            >
                                                                <Edit />
                                                            </NavLink>
                                                        </Button>
                                                    </Td>
                                                    <Td>
                                                        <Form method="post">
                                                            <input
                                                                type="text"
                                                                value={
                                                                    empleado.id
                                                                }
                                                                id="id"
                                                                name="id"
                                                                hidden
                                                                readOnly
                                                            />
                                                            <Button variant="delete">
                                                                <Trash />
                                                            </Button>
                                                        </Form>
                                                    </Td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    ) : (
                        <>
                            <h3 className="text-2xl text-zinc-900 font-semibold">
                                No hay datos para mostrar 😕
                            </h3>
                            <p className="text-zinc-600">
                                Añade empleados a la nómina o busca otro nombre.
                            </p>
                        </>
                    )}
                </div>
            </Await>
        </Suspense>
    );
}
