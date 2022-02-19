import { Request, Response } from "express";

const jwt = require("jsonwebtoken");

class VerificaToken {
    static verificaToken = async (req: Request, res: Response, prox: any) => {
        const token = req.headers["x-access-token"];
        jwt.verify(token, process.env.CHAVE_TOKEN, (err: any, decoder: any) => {
            if (err) {
                return res
                    .status(401)
                    .json({ mensagem: "Usuário não autorizado" });
            }
            // req.userId = decoder.userId;
            prox();
        });
    };
}

module.exports = VerificaToken;
