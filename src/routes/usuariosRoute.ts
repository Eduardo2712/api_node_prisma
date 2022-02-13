const { Router } = require("express");
const cors = require("cors");
const usuarioController = require("../controllers/UsuarioController");

const router = Router();

router.use(cors());

router
    .get("/usuarios", usuarioController.pegarTodosOsUsuarios)
    .get("/usuarios/:id", usuarioController.pegarUmUsuario);

module.exports = router;
