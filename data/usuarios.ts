const crypto = require("crypto");
const algoritmoCriptografia = "sha256";

const dataAtual = new Date(Date.now());
dataAtual.setHours(dataAtual.getHours() - 3);

const criptografaPalavra = (palavra: string) => {
    const palavraCriptografada = crypto
        .createHmac(algoritmoCriptografia, process.env.CHAVE_CRIPTOGRAFIA)
        .update(palavra)
        .digest("hex");
    return palavraCriptografada;
};

export const usuariosSemente = [
    {
        nome: "Elvis Presley",
        id_senha: 1,
        email: "elvis@elvis.com",
        telefone: "(23) 98474-5623",
        data_nasc: new Date("1981-02-03"),
        cpf: "901.259.300-02",
        login: criptografaPalavra("Elvis1234"),
        senha: criptografaPalavra("Elvis1234"),
        data_criado: dataAtual,
        data_atualizado: dataAtual,
    },
    {
        nome: "Lionel Messi",
        id_senha: 2,
        email: "messi@messi.com",
        telefone: "(87) 78456-6966",
        data_nasc: new Date("1989-12-05"),
        cpf: "056.236.910-62",
        login: criptografaPalavra("Messi1234"),
        senha: criptografaPalavra("Messi1234"),
        data_criado: dataAtual,
        data_atualizado: dataAtual,
    },
    {
        nome: "John Lennon",
        id_senha: 3,
        email: "lennon@lennon.com",
        telefone: "(57) 84516-1663",
        data_nasc: new Date("1969-10-15"),
        cpf: "454.789.123-02",
        login: criptografaPalavra("Lennon1234"),
        senha: criptografaPalavra("Lennon1234"),
        data_criado: dataAtual,
        data_atualizado: dataAtual,
    },
    {
        nome: "Nico Robin",
        id_senha: 4,
        email: "nico@nico.com",
        telefone: "(07) 13256-4646",
        data_nasc: new Date("1966-01-10"),
        cpf: "746.798.543-10",
        login: criptografaPalavra("Nico1234"),
        senha: criptografaPalavra("Nico1234"),
        data_criado: dataAtual,
        data_atualizado: dataAtual,
    },
];
