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
                include: {
                    imagens: true,
                    tipo_anuncios: true,
                    usuarios: true,
                    valores: true,
                },
            });
            if (anuncio === null || typeof anuncio === "undefined") {
                return res.status(200).json({
                    mensagem: "Anúncio não existe",
                });
            }
            return res.status(200).json(anuncio);
        } catch (error: unknown) {
            if (typeof error === "string") {
                return res.status(500).json(error);
            } else if (error instanceof Error) {
                return res.status(500).json(error.message);
            }
        }
    };

    static pegarAnunciosPorPagina = async (req: Request, res: Response) => {
        const { quantidade, pagina } = req.params;
        try {
            const anuncios = await prisma.anuncios.findMany({
                where: {
                    ativo: 1,
                },
                include: {
                    imagens: true,
                    tipo_anuncios: true,
                    usuarios: true,
                    valores: true,
                },
                skip: Number(quantidade) * Number(pagina),
                take: Number(quantidade),
            });
            if (anuncios === null || typeof anuncios === "undefined") {
                return res.status(200).json({
                    mensagem: "Nenhum anúncio existente",
                });
            }
            return res.status(200).json(anuncios);
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
