import { PersonalData, WorkData } from "@prisma/client";
import { prisma } from "~/db.server";

export async function getEmpleado(id: string) {
    return await prisma.personalData.findUnique({
        where: { id },
        select: {
            id: true,
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
                    disp: true,
                },
            },
        },
    });
}

export async function updateEmpleado({
    id,
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
    disp,
}: Pick<
    PersonalData & WorkData,
    | "id"
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
    | "disp"
>) {
    return await prisma.personalData.update({
        where: { id },
        data: {
            name: name,
            DNI: DNI,
            birth: birth,
            kids: kids,
            address: address,
            tel: tel,
            obvs: obvs,
            workData: {
                update: {
                    data: {
                        ant: ant,
                        cond: cond,
                        studies: studies,
                        area: area,
                        disp: disp,
                    },
                },
            },
        },
    });
}
