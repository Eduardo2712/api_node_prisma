import { PrismaClient } from "@prisma/client";
import { usuariosSemente } from "../data/usuarios";
import { anunciosSemente } from "../data/anuncios";

const prisma = new PrismaClient();

const main = async () => {
    await prisma.usuarios.createMany({
        data: usuariosSemente,
    });
    // await prisma.anuncios.createMany({
    //     data: anunciosSemente,
    // });
};

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => {
        prisma.$disconnect();
    });
