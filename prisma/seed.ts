import { Pool, neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import ws from "ws";

dotenv.config();
neonConfig.webSocketConstructor = ws;
const connectionString = `${process.env.POSTGRES_URL}`;

const pool = new Pool({ connectionString });
const adapter = new PrismaNeon(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    const hashedPassword = await bcrypt.hash("LaRenovacion", 8);

    const user = await prisma.user.create({
        data: {
            name: "Recursos Humanos",
            email: "it.larenovacion@gmail.com",
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
            obvs: "---",
            workData: {
                create: {
                    ant: new Date("2022-05-05"),
                    cond: "Beca",
                    studies: "Secundario Completo",
                    studies_grade: "Multimedia",
                    area: "Planificacion",
                    disp: "Mañana",
                },
            },
        },
    });

    console.log(`Database has been seeded.`);
    console.dir(user, { depth: null });
    console.dir(personalData, { depth: null });
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
