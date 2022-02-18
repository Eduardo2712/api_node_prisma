const expressAnuncios = require("express");
// const cors = require("cors");
const anuncioController = require("../controllers/AnuncioController");

const routerAnuncios = expressAnuncios.Router();

// router.use(cors());

routerAnuncios
    .get("/anuncios/:id", anuncioController.pegarUmAnuncio)
    .get(
        "/anuncios_pagina/:quantidade/:pagina",
        anuncioController.pegarAnunciosPorPagina
    );

module.exports = routerAnuncios;
