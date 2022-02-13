import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();
require("dotenv").config();
const app = express();
const routes = require("./routes");
const porta = process.env.PORTA;

routes(app);

app.use(express.json());

app.listen(porta, () => console.log(`Rodando em http://localhost:${porta}`));

module.exports = app;
