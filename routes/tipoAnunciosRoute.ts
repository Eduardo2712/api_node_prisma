const expressTipoAnuncios = require("express");
const tipoAnuncioController = require("../controllers/TipoAnuncioController");

const routerTipoAnuncios = expressTipoAnuncios.Router();

routerTipoAnuncios
    .get("/tipo_anuncios/:id", tipoAnuncioController.pegarUmTipoAnuncio)
    .get("/tipo_anuncios", tipoAnuncioController.pegarTodosTipoAnuncios);

module.exports = routerTipoAnuncios;
