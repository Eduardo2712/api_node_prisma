import { PrismaClient } from "@prisma/client";
import { Response } from "express";

const prisma = new PrismaClient();

class ImagemController {
    static subirImagens = async (req: any, res: Response) => {
        const imagens = req.files;
        const dados = JSON.parse(JSON.stringify(req.body, null, 2));
        try {
            const dadosInserir: Array<any> = [];
            const dataAtual = new Date(Date.now());
            dataAtual.setHours(dataAtual.getHours() - 3);
            Array.from(imagens).forEach(async (imagem: any, index) => {
                const novaImagem = {
                    nome: imagem.filename,
                    caminho: imagem.path.replaceAll("\\", "/"),
                    principal:
                        index === Number(dados.idImagemPrincipal)
                            ? true
                            : false,
                    id_anuncio: Number(dados.idAnuncio),
                    data_criado: dataAtual,
                    data_atualizado: dataAtual,
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
