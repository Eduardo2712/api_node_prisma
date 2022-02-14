const { Router } = require("express");
const cors = require("cors");
const usuarioController = require("../controllers/UsuarioController");

const router = Router();

router.use(cors());

router
    .get("/usuarios", usuarioController.pegarTodosOsUsuarios)
    .get("/usuarios/:id", usuarioController.pegarUmUsuario)
    .post("/usuarios/criar", usuarioController.criarUmUsuario)
    .post("/usuarios/login", usuarioController.login);

module.exports = router;
