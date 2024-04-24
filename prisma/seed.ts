import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    const hashedPassword = await bcrypt.hash("LaRenovacion", 8);

    const user = await prisma.user.create({
        data: {
            name: "Recursos Humanos",
            email: "unonueve95@gmail.com",
            password: {
                create: {
                    hash: hashedPassword,
                },
            },
        },
    });
    console.log(user);
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
