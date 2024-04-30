import { prisma } from "~/db.server";

export async function getNominaItems() {
    return prisma.personalData.findMany({
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
