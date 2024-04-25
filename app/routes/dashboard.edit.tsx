import { NavLink } from "@remix-run/react";

export default function EditarEmpleadoPage() {
    return (
        <div className="h-full flex flex-col items-center justify-center">
            <h2 className="text-2xl text-slate-600">Editar datos</h2>
            <p className="text-zinc-500">En construcción...</p>

            <NavLink
                to={"/dashboard"}
                className={"bg-slate-600 p-2 rounded-lg mt-4"}
            >
                Actualizar
            </NavLink>
        </div>
    );
}
