import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

class TipoAnuncioController {
    static pegarUmTipoAnuncio = async (req: Request, res: Response) => {
        const { id } = req.params;
        if (isNaN(Number(id))) {
            return res.status(400).json({
                mensagem: "Parâmetro passado não é um número",
            });
        }
        try {
            const tipoAnuncio = await prisma.tipo_anuncios.findUnique({
                where: {
                    id: Number(id),
                },
            });
            if (tipoAnuncio === null || typeof tipoAnuncio === "undefined") {
                return res.status(200).json({
                    mensagem: "Tipo do anúncio não existe",
                });
            }
            return res.status(200).json(tipoAnuncio);
        } catch (error: unknown) {
            if (typeof error === "string") {
                return res.status(500).json(error);
            } else if (error instanceof Error) {
                return res.status(500).json(error.message);
            }
        }
    };

    static pegarTodosTipoAnuncios = async (req: Request, res: Response) => {
        try {
            const tipoAnuncios = await prisma.tipo_anuncios.findMany();
            if (tipoAnuncios === null || typeof tipoAnuncios === "undefined") {
                return res.status(200).json({
                    mensagem: "Tipo do anúncio não existe",
                });
            }
            return res.status(200).json(tipoAnuncios);
        } catch (error: unknown) {
            if (typeof error === "string") {
                return res.status(500).json(error);
            } else if (error instanceof Error) {
                return res.status(500).json(error.message);
            }
        }
    };
}

module.exports = TipoAnuncioController;
