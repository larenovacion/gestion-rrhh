import {
    ActionFunctionArgs,
    MetaFunction,
    json,
    redirect,
} from "@remix-run/node";
import { Form, NavLink, useActionData, useNavigation } from "@remix-run/react";
import { validate } from "./validate";
import { createEmpleado } from "./queries";
import { Button } from "~/components/ui/buttons";
import { Input } from "~/components/ui/inputs";
import { Label } from "~/components/ui/label";
import { LoaderDots, Asterisk } from "~/components/ui/svgs";

export const meta: MetaFunction = () => {
    return [{ title: "Añadir Empleado" }];
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
    const ant = new Date(String(formData.get("ant")));
    const studies = String(formData.get("studies"));
    const studies_grade = String(formData.get("studies_grade"));
    const cond = String(formData.get("cond"));
    const area = String(formData.get("area"));
    const disp = String(formData.get("disp"));

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

    const empleado = await createEmpleado({
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
        return json({ ok: false, errors: { a_cargo: "Datos inválidos" } });
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
        studies_grade?: string;
        area?: string;
        disp?: string;
    } | null;
}

export default function NuevoEmpleadoPage() {
    const actionData: ActionData = useActionData<typeof action>();
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
    const gradeError = actionData?.errors?.studies_grade;
    const areaError = actionData?.errors?.area;
    const dispError = actionData?.errors?.disp;

    return (
        <div className="flex flex-col w-full px-4 h-[calc(100%_-_3.5rem)] overflow-auto">
            <h2 className="text-3xl text-zinc-900 w-full font-bold pb-4 drop-shadow-sm mb-1">
                Registro de empleados
            </h2>

            <Form
                method="post"
                className="text-zinc-900 flex flex-col items-center justify-around"
            >
                <div className="flex flex-col w-full sm:w-auto sm:grid grid-cols-2 gap-4 sm:gap-10 pb-8 sm:pb-0">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <div className="flex gap-2 align-middle">
                                <Label htmlFor="name" error={nameError}>
                                    Nombre completo
                                </Label>
                                <Asterisk />
                            </div>
                            <Input
                                variant="filled"
                                type="text"
                                name="name"
                                id="name"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="flex gap-2 align-middle">
                                <Label htmlFor="name" error={DNIError}>
                                    DNI, sin puntos
                                </Label>
                                <Asterisk />
                            </div>
                            <Input
                                variant="filled"
                                type="text"
                                name="DNI"
                                id="DNI"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="flex gap-2 align-middle">
                                <Label htmlFor="name" error={birthError}>
                                    Fecha de Nacimiento
                                </Label>
                                <Asterisk />
                            </div>
                            <Input
                                variant="filled"
                                type="date"
                                name="birth"
                                id="birth"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="flex gap-2 align-middle">
                                <Label htmlFor="name" error={kidsError}>
                                    Cantidad de Hijos
                                </Label>
                                <Asterisk />
                            </div>
                            <Input
                                variant="filled"
                                type="number"
                                name="kids"
                                id="kids"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="flex gap-2 align-middle">
                                <Label htmlFor="name" error={telError}>
                                    Teléfono
                                </Label>
                                <Asterisk />
                            </div>
                            <Input
                                variant="filled"
                                type="tel"
                                name="tel"
                                id="tel"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="flex gap-2 align-middle">
                                <Label htmlFor="name" error={addressError}>
                                    Domicilio
                                </Label>
                                <Asterisk />
                            </div>
                            <Input
                                variant="filled"
                                type="text"
                                name="address"
                                id="address"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="obvs">Observaciones</Label>
                            <textarea
                                name="obvs"
                                id="obvs"
                                cols={30}
                                rows={4}
                                className="resize-none bg-white rounded-md p-2 focus:outline-none focus:border-blue-500"
                            ></textarea>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <div className="flex gap-2 align-middle">
                                <Label htmlFor="name" error={antError}>
                                    Antiguedad
                                </Label>
                                <Asterisk />
                            </div>
                            <Input
                                variant="filled"
                                type="date"
                                name="ant"
                                id="ant"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="flex gap-2 align-middle">
                                <Label htmlFor="name" error={studiesError}>
                                    Nivel de Estudios
                                </Label>
                                <Asterisk />
                            </div>
                            <select
                                defaultValue={""}
                                name="studies"
                                id="studies"
                                className="bg-white p-2 rounded-md hover:opacity-70"
                            >
                                <option value="" disabled>
                                    Selecciona una opción
                                </option>
                                <option value="Primario Incompleto">
                                    Primario Incompleto
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
                            <div className="flex gap-2 align-middle">
                                <Label htmlFor="name" error={gradeError}>
                                    Perfil
                                </Label>
                                <Asterisk />
                            </div>
                            <Input
                                variant="filled"
                                type="text"
                                name="studies_grade"
                                id="studies_grade"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="flex gap-2 align-middle">
                                <Label htmlFor="name" error={condError}>
                                    Condición
                                </Label>
                                <Asterisk />
                            </div>
                            <select
                                defaultValue={""}
                                name="cond"
                                id="cond"
                                className="bg-white p-2 rounded-md hover:opacity-70"
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
                                <option value="Programa">Programa</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="flex gap-2 align-middle">
                                <Label htmlFor="name" error={areaError}>
                                    Área
                                </Label>
                                <Asterisk />
                            </div>
                            <select
                                defaultValue={""}
                                name="area"
                                id="area"
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
                                <option value="Galpon">Galpón</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-2">
                        <div className="flex gap-2 align-middle">
                                <Label htmlFor="name" error={dispError}>
                                    Disponibilidad Horaria
                                </Label>
                                <Asterisk />
                            </div>
                            <Input
                                variant="filled"
                                type="text"
                                name="disp"
                                id="disp"
                            />
                        </div>

                        <div className="flex justify-center sm:justify-start gap-4">
                            <Button
                                disabled={navigation.state === "submitting"}
                            >
                                {navigation.state === "submitting" ? (
                                    <>
                                        <LoaderDots /> Creando
                                    </>
                                ) : (
                                    "Crear"
                                )}
                            </Button>
                            <Button variant="delete_nopad">
                                <NavLink
                                    to={"/dashboard/nomina"}
                                    className="py-2 px-4"
                                >
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
