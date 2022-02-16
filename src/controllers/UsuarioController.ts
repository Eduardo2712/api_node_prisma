import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const Criptografia = require("../funcoes/Criptografia");

const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

class UsuarioController {
    static pegarTodosOsUsuarios = async (req: Request, res: Response) => {
        try {
            const usuarios = await prisma.usuarios.findMany();
            return res.status(200).json(usuarios);
        } catch (error: unknown) {
            if (typeof error === "string") {
                return res.status(500).json(error);
            } else if (error instanceof Error) {
                return res.status(500).json(error.message);
            }
        }
    };

    static pegarUmUsuario = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const usuario = await prisma.usuarios.findUnique({
                where: {
                    id: Number(id),
                },
            });
            return res.status(200).json(usuario);
        } catch (error: unknown) {
            if (typeof error === "string") {
                return res.status(500).json(error);
            } else if (error instanceof Error) {
                return res.status(500).json(error.message);
            }
        }
    };

    static criarUmUsuario = async (req: Request, res: Response) => {
        const novoUsuario = req.body;
        try {
            novoUsuario["ativo"] = 1;
            novoUsuario["id_senha"] = Math.floor(Math.random() * 1000) + 1;
            // novoUsuario["senha"] = await Criptografia.criptografaPalavra(
            //     `${novoUsuario["id_senha"]}${novoUsuario["senha"]}`
            // );
            // novoUsuario["login"] = await Criptografia.criptografaPalavra(
            //     `${novoUsuario["id_senha"]}${novoUsuario["login"]}`
            // );
            novoUsuario["senha"] = await Criptografia.criptografaPalavra(
                novoUsuario["senha"]
            );
            novoUsuario["login"] = await Criptografia.criptografaPalavra(
                novoUsuario["login"]
            );
            const novoUsuarioCriado = await prisma.usuarios.create({
                data: novoUsuario,
            });
            return res.status(201).json(novoUsuarioCriado);
        } catch (error: unknown) {
            if (typeof error === "string") {
                return res.status(500).json(error);
            } else if (error instanceof Error) {
                return res.status(500).json(error.message);
            }
        }
    };

    static login = async (req: Request, res: Response) => {
        const dados = req.body;
        const chave_token = process.env.CHAVE_TOKEN;
        try {
            const usuario = await prisma.usuarios.findFirst({
                where: {
                    login: await Criptografia.criptografaPalavra(
                        dados["login"]
                    ),
                    senha: await Criptografia.criptografaPalavra(
                        dados["senha"]
                    ),
                },
            });
            if (usuario !== null && usuario !== undefined) {
                const token = jwt.sign({ userId: usuario.id }, chave_token, {
                    expiresIn: 300,
                });
                return res.status(200).json({ autorizacao: true, token });
            } else {
                return res.status(200).json({
                    autorizacao: false,
                    mensagem: "Usuário não autorizado",
                });
            }
        } catch (error: unknown) {
            if (typeof error === "string") {
                return res.status(500).json(error);
            } else if (error instanceof Error) {
                return res.status(500).json(error.message);
            }
        }
    };
}

module.exports = UsuarioController;
