import {
    ActionFunctionArgs,
    LoaderFunctionArgs,
    MetaFunction,
    json,
    redirect,
} from "@remix-run/node";
import {
    Form,
    NavLink,
    useActionData,
    useLoaderData,
    useNavigation,
} from "@remix-run/react";
import { validate } from "./validate";
import { getEmpleado, updateEmpleado } from "./queries";
import { Button } from "~/components/ui/buttons";
import { Input } from "~/components/ui/inputs";
import { Label } from "~/components/ui/label";
import { LoaderDots } from "~/components/ui/svgs";

export const meta: MetaFunction = () => {
    return [{ title: "Editar Empleado" }];
};

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();

    const name = String(formData.get("name"));
    const DNI = String(formData.get("DNI"));
    const birth = new Date(String(formData.get("birth")));
    const kids = Number(formData.get("kids"));
    const tel = String(formData.get("tel"));
    const address = String(formData.get("address"));
    const obvs = String(formData.get("obvs"));
    const ant = String(formData.get("ant"));
    const studies = String(formData.get("studies"));
    const studies_grade = String(formData.get("studies_grade"));
    const cond = String(formData.get("cond"));
    const area = String(formData.get("area"));
    const disp = String(formData.get("disp"));
    const url = new URL(request.url);
    const id = String(url.pathname.split("/").pop());

    const errors = await validate(
        name,
        DNI,
        birth,
        kids,
        tel,
        address,
        obvs,
        ant,
        studies,
        studies_grade,
        cond,
        area,
        disp
    );

    if (errors) {
        return json({ ok: false, errors });
    }

    const empleado = await updateEmpleado({
        id,
        name,
        DNI,
        birth,
        kids,
        tel,
        address,
        obvs,
        ant,
        studies,
        studies_grade,
        cond,
        area,
        disp,
    });

    if (!empleado) {
        return json({
            ok: false,
            errors: { studies_grade: "Datos inválidos" },
        });
    }

    return redirect("/dashboard/nomina");
}

interface ActionData {
    errors: {
        name?: string;
        DNI?: string;
        birth?: string;
        kids?: string;
        address?: string;
        tel?: string;
        ant?: string;
        cond?: string;
        studies?: string;
        area?: string;
        disp?: string;
    } | null;
}

interface LoaderData {
    empleado: {
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
}

export async function loader({ request }: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();
    const empleado = await getEmpleado(String(id));

    return { empleado };
}

function formateDate(dateString: Date) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

export default function EditEmpleadoPage() {
    const actionData: ActionData = useActionData<typeof action>();
    const { empleado }: LoaderData = useLoaderData<typeof loader>();
    const navigation = useNavigation();

    const nameError = actionData?.errors?.name;
    const DNIError = actionData?.errors?.DNI;
    const birthError = actionData?.errors?.birth;
    const kidsError = actionData?.errors?.kids;
    const telError = actionData?.errors?.tel;
    const addressError = actionData?.errors?.address;
    const antError = actionData?.errors?.ant;
    const studiesError = actionData?.errors?.studies;
    const condError = actionData?.errors?.cond;
    const areaError = actionData?.errors?.area;
    const dispError = actionData?.errors?.disp;

    return (
        <div className="flex flex-col w-full px-4 h-[calc(100%_-_3.5rem)]">
            <h2 className="text-3xl text-zinc-900 w-full font-bold pb-4 drop-shadow-sm">
                Registro de empleados
            </h2>

            <Form
                method="post"
                className="text-zinc-900 flex flex-col items-center justify-around"
            >
                <div className="flex flex-col w-full sm:w-auto sm:grid grid-cols-2 gap-4 sm:gap-10 pb-8 sm:pb-0">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="name" error={nameError}>
                                Nombre completo
                            </Label>
                            <Input
                                variant="filled"
                                type="text"
                                name="name"
                                id="name"
                                defaultValue={empleado.name}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="DNI" error={DNIError}>
                                DNI
                            </Label>
                            <Input
                                variant="filled"
                                type="text"
                                name="DNI"
                                id="DNI"
                                defaultValue={empleado.DNI}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="birth" error={birthError}>
                                Fecha de nacimiento
                            </Label>
                            <Input
                                variant="filled"
                                type="date"
                                name="birth"
                                id="birth"
                                defaultValue={formateDate(empleado.birth)}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="kids" error={kidsError}>
                                Cantidad de hijos
                            </Label>
                            <Input
                                variant="filled"
                                type="number"
                                name="kids"
                                id="kids"
                                defaultValue={empleado.kids}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="tel" error={telError}>
                                Teléfono
                            </Label>
                            <Input
                                variant="filled"
                                type="tel"
                                name="tel"
                                id="tel"
                                defaultValue={empleado.tel}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="address" error={addressError}>
                                Domicilio
                            </Label>
                            <Input
                                variant="filled"
                                type="text"
                                name="address"
                                id="address"
                                defaultValue={empleado.address}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="obvs">Observaciones</Label>
                            <textarea
                                name="obvs"
                                id="obvs"
                                cols={30}
                                rows={5}
                                defaultValue={empleado.obvs}
                                className="resize-none bg-white rounded-md p-2 focus:outline-none focus:border-blue-500"
                            ></textarea>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="ant" error={antError}>
                                Antigüedad
                            </Label>
                            <Input
                                variant="filled"
                                type="text"
                                name="ant"
                                id="ant"
                                defaultValue={empleado.workData.ant}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="studies" error={studiesError}>
                                Estudios
                            </Label>
                            <select
                                name="studies"
                                id="studies"
                                defaultValue={empleado.workData.studies}
                                className="bg-white p-2 rounded-md hover:opacity-70"
                            >
                                <option value="" disabled>
                                    Selecciona una opción
                                </option>
                                <option value="Primario Completo">
                                    Primario Completo
                                </option>
                                <option value="Secundario Incompleto">
                                    Secundario Incompleto
                                </option>
                                <option value="Secundario Completo">
                                    Secundario Completo
                                </option>
                                <option value="Terciario Incompleto">
                                    Terciario Incompleto
                                </option>
                                <option value="Terciario Completo">
                                    Terciario Completo
                                </option>
                                <option value="Universitario Incompleto">
                                    Universitario Incompleto
                                </option>
                                <option value="Universitario Completo">
                                    Universitario Completo
                                </option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="studies_grade">Título</Label>
                            <Input
                                type="text"
                                variant="filled"
                                id="studies_grade"
                                name="studies_tgrade"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="cond" error={condError}>
                                Condición
                            </Label>
                            <select
                                name="cond"
                                id="cond"
                                className="bg-white p-2 rounded-md hover:opacity-70"
                                defaultValue={empleado.workData.cond}
                            >
                                <option value="" disabled>
                                    Selecciona una opción
                                </option>
                                <option value="Contrato">Contrato</option>
                                <option value="Planta Provincial">
                                    Planta Provincial
                                </option>
                                <option value="Planta Municipal">
                                    Planta Municipal
                                </option>
                                <option value="Pago Directo">
                                    Pago Directo
                                </option>
                                <option value="Beca">Beca</option>
                                <option value="Afectado">Afectado</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="area" error={areaError}>
                                Área
                            </Label>
                            <select
                                name="area"
                                id="area"
                                defaultValue={empleado.workData.area}
                                className="bg-white p-2 rounded-md hover:opacity-70"
                            >
                                <option value="" disabled>
                                    Selecciona una opción
                                </option>
                                <option value="RR.HH">RR.HH</option>
                                <option value="Administración">
                                    Administración
                                </option>
                                <option value="Formadores Deportivos">
                                    Formadores Deportivos
                                </option>
                                <option value="Comunicación">
                                    Comunicación
                                </option>
                                <option value="Juventud">Juventud</option>
                                <option value="Tareas Operativas">
                                    Tareas Operativas
                                </option>
                                <option value="Gestión Ciudadana">
                                    Gestión Ciudadana
                                </option>
                                <option value="Promoción Institucional">
                                    Promoción Institucional
                                </option>
                                <option value="Tareas Generales">
                                    Tareas Generales
                                </option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="disp" error={dispError}>
                                Disponibilidad horaria
                            </Label>
                            <Input
                                variant="filled"
                                type="text"
                                name="disp"
                                id="disp"
                                defaultValue={empleado.workData.disp}
                            />
                        </div>

                        <div className="flex justify-center sm:justify-start gap-4">
                            <Button
                                disabled={navigation.state === "submitting"}
                            >
                                {navigation.state === "submitting" ? (
                                    <LoaderDots />
                                ) : (
                                    ""
                                )}
                                Actualizar
                            </Button>
                            <Button variant="delete">
                                <NavLink to={"/dashboard/nomina"}>
                                    Cancelar
                                </NavLink>
                            </Button>
                        </div>
                    </div>
                </div>
            </Form>
        </div>
    );
}
