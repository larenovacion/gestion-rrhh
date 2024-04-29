import { PersonalData, WorkData } from "@prisma/client";
import { prisma } from "~/db.server";

export async function getNominaItems() {
    return prisma.personalData.findMany({
        select: {
            name: true,
            DNI: true,
            birth: true,
            kids: true,
            address: true,
            tel: true,
            obvs: true,
            workData: {
                select: {
                    ant: true,
                    cond: true,
                    studies: true,
                    area: true,
                    a_cargo: true,
                    disp: true,
                },
            },
        },
    });
}

export function createEmpleado({
    name,
    DNI,
    birth,
    kids,
    address,
    tel,
    obvs,
    ant,
    cond,
    studies,
    area,
    a_cargo,
    disp,
}: Pick<
    PersonalData & WorkData,
    | "name"
    | "DNI"
    | "birth"
    | "kids"
    | "address"
    | "tel"
    | "obvs"
    | "ant"
    | "cond"
    | "studies"
    | "area"
    | "a_cargo"
    | "disp"
>) {
    return prisma.personalData.create({
        data: {
            name,
            DNI,
            birth,
            kids,
            address,
            tel,
            obvs,
            workData: {
                create: {
                    ant,
                    cond,
                    studies,
                    area,
                    a_cargo,
                    disp,
                },
            },
        },
    });
}
