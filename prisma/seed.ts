import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    const hashedPassword = await bcrypt.hash("LaRenovacion", 8);

    const user = await prisma.user.create({
        data: {
            name: "Recursos Humanos",
            email: "larenovacion@mail.com",
            password: {
                create: {
                    hash: hashedPassword,
                },
            },
        },
    });

    const personalData = await prisma.personalData.create({
        data: {
            name: "Ignacio Pantoja",
            DNI: "44008496",
            birth: new Date("2002-05-03"),
            kids: 0,
            address: "Barrio Facundo Quiroga",
            tel: "3804123456",
            obvs: "un capo",
        },
    });

    const workData = await prisma.workData.create({
        data: {
            ant: "Marzo de 2024",
            cond: "Beca",
            studies: "Secundario Completo",
            area: "Planificacion",
            a_cargo: "Maximiliano Guia",
            disp: "Lunes, Miercoles y Viernes de 8 a 12",
        },
    });

    console.log(`Database has been seeded.`);
    console.dir(user, { depth: null });
    console.dir(personalData, { depth: null });
    console.dir(workData, { depth: null });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });