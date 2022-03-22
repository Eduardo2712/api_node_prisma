const multer = require("multer");
const multerDestino = multer({ dest: "./public/imagens" }).array("imagens");

module.exports = multer({
    storage: multer.diskStorage({
        destination: (req: any, file: any, cb: any) => {
            cb(null, "./public/imagens");
        },
        filename: (req: any, file: any, cb: any) => {
            cb(null, `${Date.now().toString()}_${file.originalname}`);
        },
    }),
    fileFilter: (req: any, file: any, cb: any) => {
        const extensaoImagens = ["image/png", "image/jpg", "image/jpeg"].find(
            (formatoAceito) => formatoAceito === file.mimetype
        );
        if (extensaoImagens) {
            return cb(null, true);
        }
        return cb(null, false);
    },
});
