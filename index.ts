import { PrismaClient } from "@prisma/client";
import express from "express";

require("dotenv").config();

const prisma = new PrismaClient();
const app = express();
const routes = require("./routes");
const porta = process.env.PORTA;
const cors = require("cors");

app.use(cors());
app.use(express.json());

routes(app);

app.listen(porta, () => console.log(`Rodando em http://localhost:${porta}`));

module.exports = app;
