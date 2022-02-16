import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

class AnuncioController {
    static pegarUmAnuncio = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const anuncio = await prisma.anuncios.findUnique({
                where: {
                    id: Number(id),
                },
            });
            return res.status(200).json(anuncio);
        } catch (error: unknown) {
            if (typeof error === "string") {
                return res.status(500).json(error);
            } else if (error instanceof Error) {
                return res.status(500).json(error.message);
            }
        }
    };
}

module.exports = AnuncioController;
