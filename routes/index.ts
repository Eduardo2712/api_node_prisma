const bodyParser = require("body-parser");
const usuarios = require("./usuariosRoute");
const anuncios = require("./anunciosRoute");
const tipoAnuncios = require("./tipoAnunciosRoute");
const imagens = require("./imagensRoute");
const cors = require("cors");

module.exports = (app: any) => {
    app.use(
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        usuarios,
        anuncios,
        imagens,
        tipoAnuncios,
        cors()
    );
};
