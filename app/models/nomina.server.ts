import { prisma } from "~/db.server";

export function getNomina() {
    return prisma.personalData.findFirst();
}
