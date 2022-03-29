import { Request, Response } from "express";
const formidable = require("formidable");
const fs = require("fs");
const form = new formidable.IncomingForm();

class ImagemController {
    static subirImagem = async (req: Request, res: Response) => {
        try {
            form.parse(req, (err: any, fields: any, files: any) => {
                console.log(fields);
                const imagem: any = JSON.parse(
                    JSON.stringify(files.imagem, null, 2)
                );
                const caminhoAntigo = imagem.filepath;
                const nome = `${Date.now().toString()}_${
                    imagem.originalFilename
                }`;
                const caminhoNovo = `./public/imagens/${nome}`;
                fs.rename(caminhoAntigo, caminhoNovo, (error: any) => {
                    if (error) {
                        return res.status(500).json(error);
                    }
                    return res.status(200).json({
                        url: caminhoNovo,
                        nome: nome,
                    });
                });
            });
        } catch (error: unknown) {
            if (typeof error === "string") {
                return res.status(500).json(error);
            } else if (error instanceof Error) {
                return res.status(500).json(error.message);
            }
        }
    };

    static criarImagem = async (req: Request, res: Response, next: any) => {
        const { imagem } = req.body;
        try {
            return res.status(200).json();
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
