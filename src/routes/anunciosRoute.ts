const { Router } = require("express");
const cors = require("cors");
const anuncioController = require("../controllers/AnuncioController");

const router = Router();

router.use(cors());

router.get("/anuncios/:id", anuncioController.pegarUmAnuncio);

module.exports = router;
