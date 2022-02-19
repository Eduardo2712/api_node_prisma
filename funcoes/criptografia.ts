const crypto = require("crypto");
const algoritmoCriptografia = "sha256";

class Criptografia {
    static criptografaPalavra = async (palavra: string) => {
        const palavraCriptografada = crypto
            .createHmac(algoritmoCriptografia, process.env.CHAVE_CRIPTOGRAFIA)
            .update(palavra)
            .digest("hex");
        return palavraCriptografada;
    };
}

module.exports = Criptografia;
