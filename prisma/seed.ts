import { PrismaClient } from "@prisma/client";
import { usuariosSemente } from "../data/usuarios";
import { anunciosSemente } from "../data/anuncios";
import { estadosSemente } from "../data/estados";
import { tipoAnunciosSemente } from "../data/tipo_anuncios";
import { imagensSemente } from "../data/imagens";
import { cidadesSemente } from "../data/cidades";

const prisma = new PrismaClient();

const main = async () => {
    await prisma.estados.createMany({
        data: estadosSemente,
    });
    await prisma.cidades.createMany({
        data: cidadesSemente,
    });
    await prisma.usuarios.createMany({
        data: usuariosSemente,
    });
    await prisma.tipo_anuncios.createMany({
        data: tipoAnunciosSemente,
    });
    await prisma.anuncios.createMany({
        data: anunciosSemente,
    });
    await prisma.imagens.createMany({
        data: imagensSemente,
    });
};

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => {
        prisma.$disconnect();
    });
