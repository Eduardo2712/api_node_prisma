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
                    cidades: {
                        select: {
                            nome: true,
                        },
                    },
                    estados: {
                        select: {
                            nome: true,
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
                return res.status(500).json({ erro: error });
            } else if (error instanceof Error) {
                return res.status(500).json({
                    erro: error.message,
                });
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
                return res.status(500).json({ erro: error });
            } else if (error instanceof Error) {
                return res.status(500).json({
                    erro: error.message,
                });
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
                return res.status(500).json({ erro: error });
            } else if (error instanceof Error) {
                return res.status(500).json({
                    erro: error.message,
                });
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
                return res.status(500).json({ erro: error });
            } else if (error instanceof Error) {
                return res.status(500).json({
                    erro: error.message,
                });
            }
        }
    };

    static criarAnuncio = async (req: Request, res: Response) => {
        const novoAnuncio = req.body;
        try {
            if (novoAnuncio.estado) {
                const estado = await prisma.estados.findFirst({
                    select: {
                        id: true,
                    },
                    where: {
                        uf: novoAnuncio.estado.toString().toUpperCase(),
                    },
                });
                novoAnuncio.id_estado = estado?.id;
            }
            if (novoAnuncio.cidade) {
                const cidade = await prisma.cidades.findFirst({
                    select: {
                        id: true,
                    },
                    where: {
                        nome: novoAnuncio.cidade.toString().toUpperCase(),
                    },
                });
                novoAnuncio.id_cidade = cidade?.id;
            }
            const novoAnuncioCriado = await prisma.anuncios.create({
                data: {
                    ...novoAnuncio,
                },
            });
            return res.status(201).json(novoAnuncioCriado);
        } catch (error: unknown) {
            if (typeof error === "string") {
                return res.status(500).json({ erro: error });
            } else if (error instanceof Error) {
                return res.status(500).json({
                    erro: error.message,
                });
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
                Number(pagina) < 1
            ) {
                return res.status(400).json({
                    mensagem:
                        "Quantidade e/ou página não é/são número(s) válidos",
                });
            }
            const quantidadeAnuncios = await prisma.anuncios.count({
                where: {
                    AND: [
                        busca
                            ? {
                                  titulo: {
                                      contains: busca
                                          .toString()
                                          .toLocaleUpperCase(),
                                  },
                              }
                            : {},
                        cidade
                            ? {
                                  id_cidade: {
                                      equals: Number(cidade),
                                  },
                              }
                            : {},
                        {
                            ativo: 1,
                        },
                        estado
                            ? {
                                  id_estado: {
                                      equals: Number(estado),
                                  },
                              }
                            : {},
                        Number(tipo) !== 0
                            ? {
                                  id_tipo_anuncio: {
                                      equals: Number(tipo),
                                  },
                              }
                            : {},
                    ],
                },
            });
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
                    cidades: {
                        select: {
                            nome: true,
                        },
                    },
                    estados: {
                        select: {
                            uf: true,
                        },
                    },
                },
                where: {
                    AND: [
                        busca
                            ? {
                                  titulo: {
                                      contains: busca
                                          .toString()
                                          .toLocaleUpperCase(),
                                  },
                              }
                            : {},
                        cidade
                            ? {
                                  id_cidade: {
                                      equals: Number(cidade),
                                  },
                              }
                            : {},
                        {
                            ativo: 1,
                        },
                        estado
                            ? {
                                  id_estado: {
                                      equals: Number(estado),
                                  },
                              }
                            : {},
                        Number(tipo) !== 0
                            ? {
                                  id_tipo_anuncio: {
                                      equals: Number(tipo),
                                  },
                              }
                            : {},
                    ],
                },
                skip: Number(quantidade) * (Number(pagina) - 1),
                take: Number(quantidade),
            });
            const anuncios_por_estado = await prisma.anuncios.groupBy({
                by: ["id_estado"],
                _count: {
                    id_estado: true,
                },
            });
            const resposta = {
                anuncios,
                anuncios_por_estado,
                quantidade: Math.ceil(quantidadeAnuncios / Number(quantidade)),
                totalAnuncios: quantidadeAnuncios,
            };
            return res.status(200).json(resposta);
        } catch (error: unknown) {
            if (typeof error === "string") {
                return res.status(500).json({
                    erro: error,
                });
            } else if (error instanceof Error) {
                return res.status(500).json({
                    erro: error.message,
                });
            }
        }
    };
}

module.exports = AnuncioController;
