import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

class AnuncioController {
    static pegarUmAnuncio = async (req: Request, res: Response) => {
        const { id } = req.params;
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept"
        );
        if (isNaN(Number(id))) {
            return res.status(400).json({
                mensagem: "Parâmetro passado não é um número",
            });
        }
        try {
            const anuncio = await prisma.anuncios.findUnique({
                where: {
                    id: Number(id),
                },
                include: {
                    imagens: true,
                    tipo_anuncios: true,
                    usuarios: true,
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
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept"
        );
        if (isNaN(Number(quantidade)) || isNaN(Number(pagina))) {
            return res.status(400).json({
                mensagem: "Parâmetro passado não é um número",
            });
        }
        try {
            const anuncios = await prisma.anuncios.findMany({
                where: {
                    ativo: 1,
                },
                include: {
                    imagens: true,
                    tipo_anuncios: true,
                    usuarios: true,
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

    static pegarAnunciosRecentes = async (req: Request, res: Response) => {
        const { quantidade } = req.params;
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept"
        );
        if (isNaN(Number(quantidade))) {
            return res.status(400).json({
                mensagem: "Parâmetro passado não é um número",
            });
        }
        try {
            const anuncios = await prisma.anuncios.findMany({
                where: {
                    ativo: 1,
                },
                orderBy: {
                    data_criado: "desc",
                },
                include: {
                    imagens: true,
                    tipo_anuncios: true,
                    usuarios: true,
                },
                skip: 0,
                take: Number(quantidade),
            });
            return res.status(200).json(anuncios);
        } catch (error: unknown) {
            if (typeof error === "string") {
                return res.status(500).json(error);
            } else if (error instanceof Error) {
                return res.status(500).json(error.message);
            }
        }
    };

    static pegarAnunciosPatrocinados = async (req: Request, res: Response) => {
        const { quantidade } = req.params;
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept"
        );
        if (isNaN(Number(quantidade))) {
            return res.status(400).json({
                mensagem: "Parâmetro passado não é um número",
            });
        }
        try {
            const anuncios = await prisma.anuncios.findMany({
                where: {
                    ativo: 1,
                    patrocinado: 1,
                },
                orderBy: {
                    data_criado: "desc",
                },
                include: {
                    imagens: true,
                    tipo_anuncios: true,
                    usuarios: true,
                },
                skip: 0,
                take: Number(quantidade),
            });
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
