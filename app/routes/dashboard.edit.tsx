import { Form, NavLink } from "@remix-run/react";

export default function EditarEmpleadoPage() {
    return (
        <div className="h-full flex flex-col items-center justify-around">
            <h2 className="text-2xl text-center text-slate-600 mb-5">Actualizar datos de empleado</h2>
            <Form method="post" className="text-slate-600 flex items-start justify-around gap-32" >
                <div style={{ display: "flex", flexDirection: 'column' }}>
                    <label htmlFor="name" autoFocus={true}>Nombre Completo</label>
                    <input type="text" name="name" id="name" />

                    <label htmlFor="dni">DNI</label>
                    <input type="text" name="dni" id="dni" />

                    <label htmlFor="birth">Fecha de Nacimiento</label>
                    <input type="date" name="birth" id="birth" />

                    <label htmlFor="kids">Cantidad de Hijos</label>
                    <input type="number" name="kids" id="kids" />

                    <label htmlFor="tel">Teléfono</label>
                    <input type="tel" name="tel" id="tel" />

                    <label htmlFor="address">Domicilio</label>
                    <input type="text" name="address" id="address" />

                    <label htmlFor="pbvs">Obvservaciones</label>
                    <textarea name="obvs" id="obvs" cols={30} rows={5} style={{resize: 'none'}}></textarea>


                </div>
                <div style={{ display: "flex", flexDirection: 'column' }}>
                    <label htmlFor="ant">Antigüedad</label>
                    <input type="text" name="ant" id="ant" />

                    <label htmlFor="est">Estudios</label>
                    <input type="text" name="est" id="est" />

                    <label htmlFor="cond">Condición</label>
                    <select name="cond" id="cond">
                        <option value="Control">Contrato</option>
                        <option value="Planta Provincial">Planta Provincial</option>
                        <option value="Planta Municipal">Planta Municipal</option>
                        <option value="Pago Directo">Pago Directo</option>
                        <option value="Beca">Beca</option>
                        <option value="Afectado">Afectado</option>
                    </select>

                    <label htmlFor="area">Área</label>
                    <input type="text" name="area" id="area" />

                    <label htmlFor="a_cargo">Persona a cargo</label>
                    <input type="text" name="a_cargo" id="a_cargo" />
                    
                    <label htmlFor="disp">Disponibilidad horaria</label>
                    <input type="text" name="disp" id="disp" />
                </div>
            </Form>

            <NavLink
                to={"/dashboard"}
                className={"bg-slate-600 p-2 rounded-lg mt-4"}
            >
                Actualizar
            </NavLink>
        </div>
    );
}
