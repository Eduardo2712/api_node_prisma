const expressUsuarios = require("express");
const usuarioController = require("../controllers/UsuarioController");

const routerUsuarios = expressUsuarios.Router();

routerUsuarios
    .get("/usuarios", usuarioController.pegarTodosOsUsuarios)
    .get("/usuarios/verifica_token", usuarioController.verificaToken)
    .post("/usuarios/criar", usuarioController.criarUmUsuario)
    .post("/usuarios/login", usuarioController.login);

module.exports = routerUsuarios;
