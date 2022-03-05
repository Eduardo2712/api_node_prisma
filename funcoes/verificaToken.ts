import { Request, Response } from "express";

const jwt = require("jsonwebtoken");

class VerificaToken {
    static verificaToken = async (
        req: Request,
        res: Response,
        prox: () => {}
    ) => {
        const token = req.headers["x-access-token"];
        if (!token) {
            return res.status(401).json({
                autenticado: false,
                mensagem: "Token não encontrado",
            });
        }
        jwt.verify(
            token,
            process.env.CHAVE_TOKEN,
            (err: Error, decoder: any) => {
                if (err) {
                    return res.status(401).json({
                        autenticado: false,
                        mensagem: "Usuário não autorizado",
                    });
                }
                // req.userId = decoder.userId;
                prox();
            }
        );
    };
}

module.exports = VerificaToken;
