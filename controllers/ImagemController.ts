import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const formidable = require("formidable");
const fs = require("fs");

const prisma = new PrismaClient();

class ImagemController {
    static subirImagem = (req: Request, res: Response) => {
        try {
            const form = new formidable.IncomingForm();
            form.parse(req, (err: Error, fields: any, files: any) => {
                if (err) {
                    return res.status(500).json(err);
                } else {
                    const imagem = JSON.parse(JSON.stringify(files.imagem));
                    const caminhoAntigo = imagem.filepath;
                    const nome = `${Date.now().toString()}_${
                        imagem.originalFilename
                    }`;
                    const caminhoNovo = `./public/imagens/${nome}`;
                    fs.rename(caminhoAntigo, caminhoNovo, (error: Error) => {
                        if (error) {
                            return res.status(500).json(error);
                        } else {
                            return res.status(200).json({
                                url: caminhoNovo,
                                nome: nome,
                            });
                        }
                    });
                }
            });
        } catch (error: unknown) {
            if (typeof error === "string") {
                return res.status(500).json(error);
            } else if (error instanceof Error) {
                return res.status(500).json(error.message);
            }
        }
    };

    static criarImagem = async (req: Request, res: Response) => {
        const { imagens } = req.body;
        try {
            const novasImagens = await prisma.imagens.createMany({
                data: imagens,
            });
            return res.status(200).json(novasImagens);
        } catch (error: unknown) {
            if (typeof error === "string") {
                return res.status(500).json(error);
            } else if (error instanceof Error) {
                return res.status(500).json(error.message);
            }
        }
    };
}

module.exports = ImagemController;
