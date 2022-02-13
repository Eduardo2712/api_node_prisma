const crypto = require("crypto");
const algoritmo_criptografia = "sha256";

class Criptografia {
    static criptografaPalavra = async (palavra: string) => {
        const palavra_criptografada = crypto
            .createHmac(algoritmo_criptografia, process.env.CHAVE_CRIPTOGRAFIA)
            .update(palavra)
            .digest("hex");
        return palavra_criptografada;
    };
}

module.exports = Criptografia;
