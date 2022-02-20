const dataAtual = new Date(Date.now());
dataAtual.setHours(dataAtual.getHours() - 3);

export const tipoAnunciosSemente = [
    {
        nome: "Venda",
        data_criado: dataAtual,
        data_atualizado: dataAtual,
    },
    {
        nome: "Locação",
        data_criado: dataAtual,
        data_atualizado: dataAtual,
    },
];
