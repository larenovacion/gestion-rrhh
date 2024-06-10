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
import { Edit, NewPerson, Trash, Search, Filter } from "~/components/ui/svgs";
import { Td, Th } from "~/components/ui/table";
import { Suspense, useState } from "react";
import { NominaSkeleton } from "~/components/ui/skeletons";
import { Input } from "~/components/ui/inputs";
import { Filters } from "~/components/filters";
import { Modal } from "~/components/ui/modal";

export const meta: MetaFunction = () => {
    return [{ title: "Dashboard | Nómina" }];
};

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const action = formData.get("action");
    const id = String(formData.get("id"));

    if (action === "delete") {
        await deleteItem(id);

        return redirect("/dashboard/nomina");
    }
}

// eslint-disable-next-line  @typescript-eslint/no-unused-vars
export async function loader({ request }: LoaderFunctionArgs) {
    let nomina = await getNominaItems();
    const url = new URL(request.url);
    const query = url.searchParams.get("search")?.toLowerCase() || "";
    const studies = url.searchParams.get("studies") || "";
    const cond = url.searchParams.get("cond") || "";
    const area = url.searchParams.get("area") || "";

    if (query) {
        nomina = nomina.filter(
            (item) =>
                item.name.toLowerCase().includes(query) ||
                item.DNI.toString().includes(query) ||
                item.address.toLowerCase().includes(query) ||
                item.tel.toString().includes(query) ||
                item.workData?.studies_grade.toLowerCase().includes(query) ||
                item.workData?.disp.toLowerCase().includes(query) ||
                item.workData?.area.toLowerCase().includes(query) ||
                item.workData?.studies.toLowerCase().includes(query) ||
                item.workData?.cond.toLowerCase().includes(query)
        );
    }

    if (studies) {
        nomina = nomina.filter((item) => item.workData?.studies === studies);
    }

    if (cond) {
        nomina = nomina.filter((item) => item.workData?.cond === cond);
    }

    if (area) {
        nomina = nomina.filter((item) => item.workData?.area === area);
    }

    return json({ nomina });
}

function formateDate(dateString: Date) {
    const date = new Date(dateString);
    return date.toLocaleDateString();
}

function calculateAnt(dateString: Date) {
    const ant = new Date(dateString);
    const current = new Date();

    function toYearsAndMonths(diff: number): { years: number; months: number } {
        const msToDay = 1000 * 60 * 60 * 24;
        const msToYear = msToDay * 365.25;
        const msToMonth = msToDay * 30.44;

        const years = Math.floor(diff / msToYear);

        diff %= msToYear;

        const months = Math.floor(diff / msToMonth);

        return { years, months };
    }

    const diffMs = Number(current) - Number(ant);
    const { years, months } = toYearsAndMonths(diffMs);

    if (years > 0 && months == 0) {
        return years == 1 ? `${years} año` : `${years} años`;
    }

    if (years == 0 && months > 0) {
        return months == 1 ? `${months} mes` : `${months} meses`;
    }

    if (years > 0 && months > 0) {
        if (years == 1 && months == 1) {
            return `${years} año y ${months} mes`;
        } else if (years == 1 && months > 1) {
            return `${years} año y ${months} meses`;
        }
        return `${years} años y ${months} meses`;
    }
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
        ant: Date;
        cond: string;
        studies: string;
        studies_grade: string;
        area: string;
        disp: string;
    };
};

export default function NominaPage() {
    const { nomina } = useLoaderData<typeof loader>();
    const [visible, setVisible] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [targetId, setTargetId] = useState<string>("");

    function toggleFilters() {
        setVisible(!visible);
    }

    function toggleModal() {
        setShowModal(!showModal);
    }

    return (
        <Suspense fallback={<NominaSkeleton />}>
            <Await resolve={nomina}>
                {(nomina) => (
                    <div className="flex flex-col w-full px-2 md:px-4 h-[calc(100%_-_3.5rem)] relative">
                        <h2 className="text-3xl text-zinc-900 w-full font-bold pb-4 drop-shadow-sm">
                            Nómina de empleados
                        </h2>
                        <div className="flex flex-col gap-4 items-start h-[85vh]">
                            <div className="w-full flex gap-2 items-start justify-between flex-col md:flex-row">
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
                                <div className="flex gap-2 ">
                                    <Form method="get" className="flex gap-2">
                                        <div className="w-full">
                                            <Input
                                                className="text-zinc-900 border-zinc-900"
                                                type="text"
                                                variant="filled"
                                                name="search"
                                                id="search"
                                                placeholder="Buscar"
                                            />
                                        </div>
                                        <input
                                            type="hidden"
                                            name="action"
                                            value="search"
                                        />
                                        <Button>
                                            <Search />
                                        </Button>
                                    </Form>
                                    <Button onClick={toggleFilters}>
                                        <Filter />
                                    </Button>
                                </div>
                            </div>
                            {visible && <Filters className="md:self-end" />}
                            {nomina.length > 0 ? (
                                <div className="text-gray-700 pb-2 w-[100%] max-h-full overflow-auto scrollbar-thin">
                                    <table className="text-sm text-nowrap">
                                        <thead>
                                            <tr>
                                                <Th>Nombre</Th>
                                                <Th>DNI</Th>
                                                <Th>Fecha de nac.</Th>
                                                <Th>Hijos</Th>
                                                <Th>Telefono</Th>
                                                <Th>Domicilio</Th>
                                                <Th>Antiguedad</Th>
                                                <Th>Estudios</Th>
                                                <Th>Perfil</Th>
                                                <Th>Condicion</Th>
                                                <Th>Area</Th>
                                                <Th>Disp. horaria</Th>
                                                <Th>Observaciones</Th>
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
                                                        <Td>
                                                            {empleado.kids > 0
                                                                ? empleado.kids
                                                                : "No tiene"}
                                                        </Td>
                                                        <Td>{empleado.tel}</Td>
                                                        <Td>
                                                            {empleado.address}
                                                        </Td>
                                                        <Td>
                                                            {calculateAnt(
                                                                empleado
                                                                    .workData
                                                                    .ant
                                                            )}
                                                        </Td>
                                                        <Td>
                                                            {
                                                                empleado
                                                                    .workData
                                                                    .studies
                                                            }
                                                        </Td>
                                                        <Td>
                                                            {
                                                                empleado
                                                                    .workData
                                                                    .studies_grade
                                                            }
                                                        </Td>
                                                        <Td>
                                                            {
                                                                empleado
                                                                    .workData
                                                                    .cond
                                                            }
                                                        </Td>
                                                        <Td>
                                                            {
                                                                empleado
                                                                    .workData
                                                                    .area
                                                            }
                                                        </Td>
                                                        <Td>
                                                            {
                                                                empleado
                                                                    .workData
                                                                    .disp
                                                            }
                                                        </Td>
                                                        <Td>{empleado.obvs ? empleado.obvs : "---"}</Td>
                                                        <Td>
                                                            <Button variant="light_nopad">
                                                                <NavLink
                                                                    to={`/dashboard/${empleado.id}`}
                                                                    className="px-4 py-2"
                                                                >
                                                                    <Edit />
                                                                </NavLink>
                                                            </Button>
                                                        </Td>
                                                        <Td>
                                                            <Button
                                                                variant="delete"
                                                                onClick={() => {
                                                                    setTargetId(
                                                                        empleado.id
                                                                    );

                                                                    toggleModal();
                                                                }}
                                                            >
                                                                <Trash />
                                                            </Button>
                                                        </Td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                    <Modal
                                        showModal={showModal}
                                        targetId={targetId}
                                        toggleModal={toggleModal}
                                        name="id"
                                    />
                                </div>
                            ) : (
                                <>
                                    <h3 className="text-2xl text-zinc-900 font-semibold">
                                        No hay datos para mostrar 😕
                                    </h3>
                                    <p className="text-zinc-600">
                                        Añade empleados a la nómina o busca otro
                                        nombre.
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </Await>
        </Suspense>
    );
}
