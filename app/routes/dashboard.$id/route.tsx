import {
    ActionFunctionArgs,
    LoaderFunctionArgs,
    json,
    redirect,
} from "@remix-run/node";
import { Form, NavLink, useActionData, useLoaderData } from "@remix-run/react";
import { validate } from "./validate";
import { getEmpleado, updateEmpleado } from "./queries";

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
    const cond = String(formData.get("cond"));
    const area = String(formData.get("area"));
    const disp = String(formData.get("disp"));
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();

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
    const loaderData: LoaderData = useLoaderData<typeof loader>();
    const empleado = loaderData.empleado;

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
        <div className="h-full flex flex-col items-center justify-around">
            <h2 className="text-2xl text-center text-slate-600 mb-5">
                Registro de empleados
            </h2>
            <Form
                method="post"
                className="text-slate-600 flex flex-col items-start justify-around gap-32"
            >
                <div className="grid grid-cols-2 gap-8">
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <label htmlFor="name" /*autoFocus={true}*/>
                            Nombre Completo{" "}
                            {nameError && (
                                <span className="text-red-600">
                                    {nameError}
                                </span>
                            )}
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            defaultValue={empleado.name}
                        />

                        <label htmlFor="DNI">
                            DNI{" "}
                            {DNIError && (
                                <span className="text-red-600">{DNIError}</span>
                            )}
                        </label>
                        <input
                            type="text"
                            name="DNI"
                            id="DNI"
                            defaultValue={empleado.DNI}
                        />

                        <label htmlFor="birth">
                            Fecha de Nacimiento{" "}
                            {birthError && (
                                <span className="text-red-600">
                                    {birthError}
                                </span>
                            )}
                        </label>
                        <input
                            type="date"
                            name="birth"
                            id="birth"
                            defaultValue={formateDate(empleado.birth)}
                        />

                        <label htmlFor="kids">
                            Cantidad de Hijos{" "}
                            {kidsError && (
                                <span className="text-red-600">
                                    {kidsError}
                                </span>
                            )}
                        </label>
                        <input
                            type="number"
                            name="kids"
                            id="kids"
                            defaultValue={empleado.kids}
                        />

                        <label htmlFor="tel">
                            Teléfono{" "}
                            {telError && (
                                <span className="text-red-600">{telError}</span>
                            )}
                        </label>
                        <input
                            type="tel"
                            name="tel"
                            id="tel"
                            defaultValue={empleado.tel}
                        />

                        <label htmlFor="address">
                            Domicilio{" "}
                            {addressError && (
                                <span className="text-red-600">
                                    {addressError}
                                </span>
                            )}
                        </label>
                        <input
                            type="text"
                            name="address"
                            id="address"
                            defaultValue={empleado.address}
                        />

                        <label htmlFor="obvs">Obvservaciones </label>
                        <textarea
                            name="obvs"
                            id="obvs"
                            cols={30}
                            rows={5}
                            style={{ resize: "none" }}
                            defaultValue={empleado.obvs}
                        ></textarea>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <label htmlFor="ant">
                            Antigüedad{" "}
                            {antError && (
                                <span className="text-red-600">{antError}</span>
                            )}
                        </label>
                        <input
                            type="text"
                            name="ant"
                            id="ant"
                            defaultValue={empleado.workData.ant}
                        />

                        <label htmlFor="studies">
                            Estudios{" "}
                            {studiesError && (
                                <span className="text-red-600">
                                    {studiesError}
                                </span>
                            )}
                        </label>
                        <select
                            name="studies"
                            id="studies"
                            defaultValue={empleado.workData.studies}
                        >
                            <option value="Primario Completo">
                                Primario Completo
                            </option>
                            <option value="Secundario Incompleto">
                                Secundario Incompleto
                            </option>
                            <option value="Secundario Incompleto">
                                Secundario Incompleto
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

                        <label htmlFor="cond">
                            Condición{" "}
                            {condError && (
                                <span className="text-red-600">
                                    {condError}
                                </span>
                            )}
                        </label>
                        <select
                            name="cond"
                            id="cond"
                            defaultValue={empleado.workData.cond}
                        >
                            <option value="Contrato">Contrato</option>
                            <option value="Planta Provincial">
                                Planta Provincial
                            </option>
                            <option value="Planta Municipal">
                                Planta Municipal
                            </option>
                            <option value="Pago Directo">Pago Directo</option>
                            <option value="Beca">Beca</option>
                            <option value="Afectado">Afectado</option>
                        </select>

                        <label htmlFor="area">
                            Área{" "}
                            {areaError && (
                                <span className="text-red-600">
                                    {areaError}
                                </span>
                            )}
                        </label>
                        <select
                            name="area"
                            id="area"
                            defaultValue={empleado.workData.area}
                        >
                            <option value="RR.HH">RR.HH</option>
                            <option value="Administración">
                                Administración
                            </option>
                            <option value="Formadores Deportivos">
                                Formadores Deportivos
                            </option>
                            <option value="Comunicación">Comunicación</option>
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

                        <label htmlFor="disp">
                            Disponibilidad horaria{" "}
                            {dispError && (
                                <span className="text-red-600">
                                    {dispError}
                                </span>
                            )}
                        </label>
                        <input
                            type="text"
                            name="disp"
                            id="disp"
                            defaultValue={empleado.workData.disp}
                        />
                    </div>
                </div>
                <div className="flex gap-8">
                    <button
                        type="submit"
                        className="bg-slate-600 p-2 rounded-lg text-white"
                    >
                        Actualizar
                    </button>
                    <NavLink
                        to={"/dashboard/nomina"}
                        className="bg-zinc-200 p-2 rounded-lg"
                    >
                        Cancelar
                    </NavLink>
                </div>
            </Form>
        </div>
    );
}
