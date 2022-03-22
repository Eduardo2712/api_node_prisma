import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();
const multer = require("multer");
const multerDestino = multer({ dest: "./public/imagens" }).array("imagens");

class ImagemController {
    static subirImagens = async (req: Request, res: Response) => {
        try {
            // multer({
            //     storage: multer.diskStorage({
            //         destination: (req: any, file: any, cb: any) => {
            //             cb(null, "./public/imagens");
            //         },
            //         filename: (req: any, file: any, cb: any) => {
            //             cb(
            //                 null,
            //                 `${Date.now().toString()}_${file.originalname}`
            //             );
            //         },
            //     }),
            //     fileFilter: (req: any, file: any, cb: any) => {
            //         const extensaoImagens = [
            //             "image/png",
            //             "image/jpg",
            //             "image/jpeg",
            //         ].find((formatoAceito) => formatoAceito === file.mimetype);
            //         if (extensaoImagens) {
            //             return cb(null, true);
            //         }
            //         return cb(null, false);
            //     },
            // });
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
