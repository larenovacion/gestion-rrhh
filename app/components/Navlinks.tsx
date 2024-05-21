import { Link, NavLink } from "@remix-run/react";
import { Files, Folder, LogoHorizontalWhite, Table } from "./ui/svgs";
import { HTMLAttributes } from "react";

type NavLinksProps = HTMLAttributes<HTMLDivElement>;

export function NavLinksDesktop(props: NavLinksProps) {
    return (
        <div className="flex flex-col gap-1 p-2" {...props}>
            <Link
                to="/"
                className="p-3 hover:bg-violet-900 hover:drop-shadow-md rounded-md transition duration-0 hover:duration-150"
            >
                <LogoHorizontalWhite className="w-full h-min" />
            </Link>
            {/* <NavLink
                        to={"/dashboard"}
                        className={
                            "p-3 hover:bg-violet-900 hover:drop-shadow-md rounded-md transition duration-0 hover:duration-150"
                        }
                    >
                        <span className="flex gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                />
                            </svg>
                            Dashboard
                        </span>
                    </NavLink> */}
            <NavLink
                to={"/dashboard/nomina"}
                className={({ isActive }) => {
                    return isActive
                        ? "text-violet-400 p-3 hover:bg-violet-900 hover:drop-shadow-md rounded-md transition duration-0 hover:duration-150"
                        : "p-3 hover:bg-violet-900 rounded-md transition duration-0 hover:duration-150";
                }}
            >
                <span className="flex gap-2">
                    <Table />
                    Nómina
                </span>
            </NavLink>
            <Link
                to={
                    "https://github.com/uno-nueve/gestion-rrhh?tab=readme-ov-file#documentaci%C3%B3n"
                }
                target="_blanck"
                className={
                    "p-3 hover:bg-violet-900 hover:drop-shadow-md rounded-md transition duration-0 hover:duration-150"
                }
            >
                <span className="flex gap-2">
                    <Folder />
                    Documentación
                </span>
            </Link>
            <NavLink to={""} className={"p-3 text-gray-600"}>
                <span className="flex gap-2">
                    <Files />
                    Operativos
                </span>
            </NavLink>
        </div>
    );
}

export function NavLinksMobile(props: NavLinksProps) {
    return (
        <div {...props}>
            <Link
                to="/"
                className={
                    "p-3 hover:bg-violet-900 hover:drop-shadow-md rounded-md transition duration-0 hover:duration-150"
                }
            >
                <LogoHorizontalWhite className="w-full h-min" />
            </Link>
            {/* <NavLink
                        to={"/dashboard"}
                        className={
                            "p-3 hover:bg-violet-900 hover:drop-shadow-md rounded-md transition duration-0 hover:duration-150"
                        }
                    >
                        <span className="flex gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                />
                            </svg>
                            Dashboard
                        </span>
                    </NavLink> */}
            <NavLink
                to={"/dashboard/nomina"}
                className={({ isActive }) => {
                    return isActive
                        ? "text-violet-400 p-3 hover:bg-violet-900 hover:drop-shadow-md rounded-md transition duration-0 hover:duration-150"
                        : "p-3 hover:bg-violet-900 rounded-md transition duration-0 hover:duration-150";
                }}
            >
                <span className="flex gap-2">
                    <Table />
                    Nómina
                </span>
            </NavLink>
            <Link
                to={
                    "https://github.com/uno-nueve/gestion-rrhh?tab=readme-ov-file#documentaci%C3%B3n"
                }
                target="_blanck"
                className={
                    "p-3 hover:bg-violet-900 hover:drop-shadow-md rounded-md transition duration-0 hover:duration-150"
                }
            >
                <span className="flex gap-2">
                    <Folder />
                    Documentación
                </span>
            </Link>
            <NavLink to={""} className={"p-3 text-gray-600"}>
                <span className="flex gap-2">
                    <Files />
                    Operativos
                </span>
            </NavLink>
        </div>
    );
}
