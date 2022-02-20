const expressAnuncios = require("express");
const anuncioController = require("../controllers/AnuncioController");

const routerAnuncios = expressAnuncios.Router();

routerAnuncios
    .get("/anuncios/:id", anuncioController.pegarUmAnuncio)
    .get(
        "/anuncios_pagina/:quantidade/:pagina",
        anuncioController.pegarAnunciosPorPagina
    )
    .get(
        "/anuncios_recentes/:quantidade",
        anuncioController.pegarAnunciosRecentes
    )
    .get(
        "/anuncios_patrocinados/:quantidade",
        anuncioController.pegarAnunciosPatrocinados
    );

module.exports = routerAnuncios;
