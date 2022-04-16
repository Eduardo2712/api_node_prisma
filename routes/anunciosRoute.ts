const expressAnuncios = require("express");
const anuncioController = require("../controllers/AnuncioController");

const routerAnuncios = expressAnuncios.Router();

routerAnuncios
    .get("/anuncios/:id", anuncioController.pegarUmAnuncio)
    .get(
        "/anuncios_recentes/:quantidade",
        anuncioController.pegarAnunciosRecentes
    )
    .get(
        "/anuncios_patrocinados/:quantidade",
        anuncioController.pegarAnunciosPatrocinados
    )
    .post("/criar_anuncio", anuncioController.criarAnuncio)
    .get("/pesquisar_anuncios", anuncioController.pesquisarAnuncios);

module.exports = routerAnuncios;
