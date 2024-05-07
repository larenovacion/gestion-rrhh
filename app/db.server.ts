import { PrismaClient } from "@prisma/client";
import { singleton } from "./singleton.server";

const prisma = singleton("prisma", () => new PrismaClient());
try {
    prisma.$connect;
} catch (error) {
    throw new Error("No se pudo cestablecer conección con base de datos.");
}

export { prisma };
