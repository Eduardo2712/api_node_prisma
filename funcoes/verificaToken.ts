import { Request, Response } from "express";

const jwt = require("jsonwebtoken");

class VerificaToken {
    static verificaToken = async (req: Request, res: Response, prox: any) => {
        const token = req.headers["x-access-token"];
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept"
        );
        if (!token) {
            return res.status(401).json({
                autenticado: false,
                mensagem: "Token não encontrado",
            });
        }
        jwt.verify(token, process.env.CHAVE_TOKEN, (err: any, decoder: any) => {
            if (err) {
                return res.status(401).json({
                    autenticado: false,
                    mensagem: "Usuário não autorizado",
                });
            }
            // req.userId = decoder.userId;
            prox();
        });
    };
}

module.exports = VerificaToken;
