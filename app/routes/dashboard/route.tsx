import { MetaFunction, NavLink, Outlet } from "@remix-run/react";

export const meta: MetaFunction = () => {
    return [{ title: "Dashboard" }];
};

export default function DashboardPage() {
    return (
        <div className="grid grid-cols-[15rem_1fr] h-screen text-white">
            <div className="w-60 flex flex-col items-left justify-between bg-slate-900 mt-16">
                <div>
                    <NavLink
                        to={"/dashboard/"}
                        className={"bg-slate-800 p-3 m-2 rounded-lg block"}
                    >
                        Dashboard
                    </NavLink>
                    <NavLink
                        to={"/dashboard/nomina"}
                        className={"bg-slate-800 p-3 m-2 rounded-lg block"}
                    >
                        Nomina de empleados
                    </NavLink>
                    <NavLink
                        to={""}
                        className={
                            "bg-slate-800 p-3 m-2 rounded-lg block text-gray-600"
                        }
                    >
                        Operativos
                    </NavLink>
                </div>
                <div></div>
            </div>
            <div className="mt-16 p-3">
                <Outlet />
            </div>
        </div>
    );
}
