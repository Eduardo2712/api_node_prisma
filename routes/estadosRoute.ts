const expressEstados = require("express");
const estadosController = require("../controllers/EstadosController");

const routerEstados = expressEstados.Router();

routerEstados.get("/estados", estadosController.pegarTodosOsEstados);

module.exports = routerEstados;
