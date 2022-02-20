const expressUsuarios = require("express");
const usuarioController = require("../controllers/UsuarioController");
const verificaToken = require("../funcoes/VerificaToken");

const routerUsuarios = expressUsuarios.Router();

routerUsuarios
    .get(
        "/usuarios",
        verificaToken.verificaToken,
        usuarioController.pegarTodosOsUsuarios
    )
    .get(
        "/usuarios/:id",
        verificaToken.verificaToken,
        usuarioController.pegarUmUsuario
    )
    .post("/usuarios/criar", usuarioController.criarUmUsuario)
    .post("/usuarios/login", usuarioController.login);

module.exports = routerUsuarios;
