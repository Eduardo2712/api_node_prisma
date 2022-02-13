const bodyParser = require("body-parser");
const usuarios = require("./usuariosRoute");

module.exports = (app: any) => {
    app.use(
        bodyParser.json(),
        bodyParser.urlencoded({ extended: false }),
        usuarios
    );
};
