import { prisma } from "~/db.server";

export async function getNominaItems() {
    return await prisma.personalData.findMany({
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
                    studies_grade: true,
                    area: true,
                    disp: true,
                },
            },
        },
    });
}

export async function deleteItem(id: string) {
    return Promise.all([
        await prisma.workData.deleteMany({
            where: {
                personalId: id,
            },
        }),
        await prisma.personalData.delete({
            where: { id },
        }),
    ]);
}
