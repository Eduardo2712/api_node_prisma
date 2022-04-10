import { Request } from "express";

const multer = require("multer");

module.exports = multer({
    storage: multer.diskStorage({
        destination: (req: Request, file: any, cb: any) => {
            cb(null, "./public/imagens");
        },
        filename: (req: Request, file: any, cb: any) => {
            cb(null, `${Date.now().toString()}_${file.originalname}`);
        },
    }),
    fileFilter: (req: Request, file: any, cb: any) => {
        const tiposPermitidos = ["image/png", "image/jpeg", "image/jpg"];
        if (tiposPermitidos.indexOf(file.mimetype) === -1) {
            return cb(new Error("Tipo de arquivo inválido"), false);
        } else {
            return cb(null, true);
        }
    },
});
