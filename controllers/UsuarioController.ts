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
                return res.status(500).json({ erro: error });
            } else if (error instanceof Error) {
                return res.status(500).json({
                    erro: error.message,
                });
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
                return res.status(500).json({ erro: error });
            } else if (error instanceof Error) {
                return res.status(500).json({
                    erro: error.message,
                });
            }
        }
    };

    static criarUmUsuario = async (req: Request, res: Response) => {
        const novoUsuario = req.body;
        try {
            novoUsuario["ativo"] = 1;
            novoUsuario["id_senha"] = Math.floor(Math.random() * 1000) + 1;
            novoUsuario["senha"] = await Criptografia.criptografaPalavra(
                `${novoUsuario["id_senha"]}${novoUsuario["senha"]}`
            );
            const novoUsuarioCriado = await prisma.usuarios.create({
                data: novoUsuario,
            });
            return res.status(201).json(novoUsuarioCriado);
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

    static login = async (req: Request, res: Response) => {
        const dados = req.body;
        const chaveToken = process.env.CHAVE_TOKEN;
        if (
            typeof dados["senha"] === "undefined" &&
            typeof dados["login"] === "undefined"
        ) {
            return res.status(400).json({
                mensagem: "Senha e/ou usuário estão vazios",
                autorizacao: false,
            });
        }
        try {
            const usuario = await prisma.usuarios.findFirst({
                where: {
                    login: dados["login"],
                },
            });
            if (usuario !== null && typeof usuario !== "undefined") {
                const senha_digitada = await Criptografia.criptografaPalavra(
                    `${usuario["id_senha"]}${dados["senha"]}`
                );
                if (senha_digitada === usuario["senha"]) {
                    const token = jwt.sign(
                        { id_usuario: usuario.id, email: usuario.email },
                        chaveToken,
                        {
                            expiresIn: 604800,
                        }
                    );
                    return res.status(200).json({
                        autorizacao: true,
                        token,
                        usuario: {
                            nome: usuario["nome"],
                            id: usuario["id"],
                            email: usuario["email"],
                            rua: usuario["rua"],
                            numero: usuario["numero"],
                            bairro: usuario["bairro"],
                            cidade: usuario["cidade"],
                            estado: usuario["estado"],
                            cep: usuario["cep"],
                            telefone: usuario["telefone"],
                        },
                    });
                } else {
                    return res.status(200).json({
                        autorizacao: false,
                        mensagem: "Senha e/ou usuário errado(s)",
                    });
                }
            } else {
                return res.status(200).json({
                    autorizacao: false,
                    mensagem: "Usuário não autorizado",
                });
            }
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

    static verificaToken = async (req: Request, res: Response) => {
        const token = req.headers["authorization"]?.split(" ")[1];
        if (token === "" || token === undefined) {
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
                } else {
                    return res.status(200).json({
                        autenticado: true,
                        mensagem: "Usuário autorizado",
                    });
                }
            }
        );
    };
}

module.exports = UsuarioController;
