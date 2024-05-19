import { Form, useSubmit } from "@remix-run/react";
import { HTMLAttributes, useState } from "react";
import { Label } from "./ui/label";
import { Button } from "./ui/buttons";

type FiltersProps = HTMLAttributes<HTMLDivElement>;

export function Filters(props: FiltersProps) {
    const [values, setValues] = useState({
        studies: "",
        cond: "",
        area: "",
    });
    const submit = useSubmit();

    function handleSelect(e: React.ChangeEvent<HTMLSelectElement>) {
        const { name, value } = e.target;
        setValues((prev) => ({
            ...prev,
            [name]: value,
        }));
        const form = e.target.closest("form");
        submit(form);
    }

    function handleClear() {
        setValues({ studies: "", cond: "", area: "" });
        submit("");
    }

    return (
        <div {...props}>
            <Form
                method="get"
                className="text-zinc-400 flex flex-col md:flex-row gap-2 text-sm"
            >
                <div className="flex flex-col gap-2">
                    <Label htmlFor="studies" hidden>
                        Estudios
                    </Label>
                    <select
                        value={values.studies}
                        onChange={handleSelect}
                        name="studies"
                        id="studies"
                        className="bg-white p-2 rounded-md hover:opacity-70"
                    >
                        <option value="" disabled>
                            Estudios
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
                    <Label htmlFor="cond" hidden>
                        Condición
                    </Label>
                    <select
                        value={values.cond}
                        onChange={handleSelect}
                        name="cond"
                        id="cond"
                        className="bg-white p-2 rounded-md hover:opacity-70"
                    >
                        <option value="" disabled>
                            Condición
                        </option>
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
                        <option value="Programa">Programa</option>
                    </select>
                </div>

                <div className="flex flex-col gap-2">
                    <Label htmlFor="area" hidden>
                        Área
                    </Label>
                    <select
                        value={values.area}
                        onChange={handleSelect}
                        name="area"
                        id="area"
                        className="bg-white p-2 rounded-md hover:opacity-70"
                    >
                        <option value="" disabled>
                            Área
                        </option>
                        <option value="RR.HH">RR.HH</option>
                        <option value="Administración">Administración</option>
                        <option value="Desarrollo Estratégico de Políticas Públicas">
                            D.E.P.P.
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
                        <option value="Galpon">Galpón</option>
                    </select>
                </div>
                {(values.area !== "" ||
                    values.cond !== "" ||
                    values.studies !== "") && (
                    <Button variant="delete" onClick={handleClear}>
                        Limpiar Filtros
                    </Button>
                )}
            </Form>
        </div>
    );
}
