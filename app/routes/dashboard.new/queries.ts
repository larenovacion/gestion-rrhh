import { PersonalData, WorkData } from "@prisma/client";
import { prisma } from "~/db.server";

export async function createEmpleado({
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
    studies_grade,
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
    | "studies_grade"
    | "area"
    | "disp"
>) {
    return await prisma.personalData.create({
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
                    studies_grade,
                    area,
                    disp,
                },
            },
        },
    });
}
