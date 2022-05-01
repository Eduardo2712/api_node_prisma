import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

class EstadosController {
    static pegarTodosOsEstados = async (req: Request, res: Response) => {
        try {
            const estados = await prisma.estados.findMany({
                where: {
                    id: {
                        not: 99,
                    },
                },
            });
            return res.status(200).json(estados);
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
}

module.exports = EstadosController;
