import { PersonalData, WorkData } from "@prisma/client";
import { prisma } from "~/db.server";

export async function getNomina() {
    try {
        return Promise.all([
            prisma.personalData.findFirst(),
            prisma.personalData.findFirst().workData(),
        ]);
    } catch (error) {
        throw Error("Error obteniendo nomina: ", error);
    }
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
    const personalData = {
        name,
        DNI,
        birth,
        kids,
        address,
        tel,
        obvs,
    };

    const workData = {
        ant,
        cond,
        studies,
        area,
        a_cargo,
        disp,
    };

    return Promise.all([
        prisma.personalData.create({ data: personalData }),
        prisma.workData.create({ data: workData }),
    ]);
}
