import { imagens, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const formidable = require("formidable");
const fs = require("fs");

const prisma = new PrismaClient();

class ImagemController {
    static criarImagem = async (req: any, res: Response) => {
        const imagens = req.files;
        const dados = JSON.parse(JSON.stringify(req.body, null, 2));
        try {
            const dadosInserir: Array<any> = [];
            Array.from(imagens).forEach(async (imagem: any, index) => {
                const novaImagem = {
                    nome: imagem.filename,
                    caminho: imagem.path.replaceAll("\\", "/"),
                    principal:
                        index === Number(dados.idImagemPrincipal)
                            ? true
                            : false,
                    id_anuncio: Number(dados.idAnuncio),
                };
                dadosInserir.push(novaImagem);
            });
            const novasImagens = await prisma.imagens.createMany({
                data: [...dadosInserir],
            });
            return res.status(200).json(novasImagens);
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

module.exports = ImagemController;
