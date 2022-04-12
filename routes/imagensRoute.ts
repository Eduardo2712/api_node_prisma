const expressImagens = require("express");
const imagemController = require("../controllers/ImagemController");
const subirImagens = require("../funcoes/imagens/subirImagens");

const routerImagens = expressImagens.Router();

routerImagens.post(
    "/subir_imagens",
    subirImagens.array("imagens", 10),
    imagemController.subirImagens
);

module.exports = routerImagens;
