import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

class AnuncioController {
    static pegarUmAnuncio = async (req: Request, res: Response) => {
        const { id } = req.params;
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
                    tipo_anuncios: {
                        select: {
                            nome: true,
                        },
                    },
                    usuarios: {
                        select: {
                            nome: true,
                            email: true,
                            telefone: true,
                        },
                    },
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
                    tipo_anuncios: {
                        select: {
                            nome: true,
                        },
                    },
                    usuarios: {
                        select: {
                            nome: true,
                            email: true,
                            telefone: true,
                        },
                    },
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
                    imagens: {
                        where: {
                            principal: true,
                        },
                    },
                    tipo_anuncios: {
                        select: {
                            nome: true,
                        },
                    },
                    usuarios: {
                        select: {
                            nome: true,
                            email: true,
                            telefone: true,
                        },
                    },
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
                    imagens: {
                        where: {
                            principal: true,
                        },
                    },
                    tipo_anuncios: {
                        select: {
                            nome: true,
                        },
                    },
                    usuarios: {
                        select: {
                            nome: true,
                            email: true,
                            telefone: true,
                        },
                    },
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

    static criarAnuncio = async (req: Request, res: Response) => {
        const novoAnuncio = req.body;
        try {
            const novoAnuncioCriado = await prisma.anuncios.create({
                data: {
                    ...novoAnuncio,
                },
            });
            return res.status(201).json(novoAnuncioCriado);
        } catch (error: unknown) {
            if (typeof error === "string") {
                return res.status(500).json(error);
            } else if (error instanceof Error) {
                return res.status(500).json(error.message);
            }
        }
    };

    static pesquisarAnuncios = async (req: Request, res: Response) => {
        try {
            const { busca, estado, cidade, tipo, quantidade, pagina } =
                req.query;
            if (
                isNaN(Number(quantidade)) ||
                isNaN(Number(pagina)) ||
                Number(quantidade) < 1 ||
                Number(pagina) < 0
            ) {
                return res.status(400).json({
                    mensagem:
                        "Quantidade e/ou página não é/são número(s) válidos",
                });
            }
            const anuncios = await prisma.anuncios.findMany({
                include: {
                    imagens: {
                        where: {
                            principal: true,
                        },
                    },
                    tipo_anuncios: {
                        select: {
                            nome: true,
                        },
                    },
                    usuarios: {
                        select: {
                            nome: true,
                            email: true,
                            telefone: true,
                        },
                    },
                },
                where: {
                    OR: [
                        {
                            titulo: {
                                contains: busca as string,
                            },
                        },
                    ],
                    AND: [
                        {
                            cidade: {
                                contains: cidade as string,
                            },
                        },
                        {
                            estado: {
                                contains: estado as string,
                            },
                        },
                        Number(tipo) !== 0 && !isNaN(Number(tipo))
                            ? {
                                  id_tipo_anuncio: {
                                      equals: Number(tipo),
                                  },
                              }
                            : {},
                    ],
                },
                skip: Number(quantidade) * Number(pagina),
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
