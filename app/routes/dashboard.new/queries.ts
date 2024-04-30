import { PersonalData, WorkData } from "@prisma/client";
import { prisma } from "~/db.server";

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
                    disp,
                },
            },
        },
    });
}
