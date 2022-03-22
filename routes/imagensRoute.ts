const expressImagens = require("express");
const imagemController = require("../controllers/ImagemController");
const subirImagens = require("../funcoes/subirImagens");

const routerImagens = expressImagens.Router();

routerImagens.post(
    "/subir_imagens",
    subirImagens.array("image"),
    imagemController.subirImagens
);

module.exports = routerImagens;
