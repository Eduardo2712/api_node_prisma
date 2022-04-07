const expressImagens = require("express");
const imagemController = require("../controllers/ImagemController");

const routerImagens = expressImagens.Router();

routerImagens
    .post("/subir_imagens", imagemController.subirImagem)
    .post("/criar_imagens", imagemController.criarImagem);

module.exports = routerImagens;
