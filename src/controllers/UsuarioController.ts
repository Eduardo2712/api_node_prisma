import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

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
            return res.status(500).json(usuario);
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
