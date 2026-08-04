import express from "express";
import cors from "cors";
import type { Ferramenta, StatusDaFerramenta } from "./tipos.js";
import { ferramentas, gerarId } from "./dados.js";

const servidor = express();

servidor.use(cors());
servidor.use(express.json());

// LISTAR AS FERRAMENTAS

servidor.get("/ferramentas", (req, res) => {
    const status = req.query.status as StatusDaFerramenta | undefined;

    if (status) {
        const filtradas = ferramentas.filter((f) => f.status === status);
        return res.status(200).json(filtradas);
    }

    return res.status(200).json(ferramentas);
});

// BUSCAR FERRAMENTA POR ID

servidor.get("/ferramentas/:id", (req, res) => {
    const id = Number(req.params.id);
    const ferramenta = ferramentas.find((f) => f.id === id);

    if (!ferramenta) {
        return res.status(404).json({ erro: "Ferramenta nao encontrada" });
    }

    return res.status(200).json(ferramenta);
});

// CADASTRAR NOVA FERRAMENTA

servidor.post("/ferramentas", (req, res) => {
    const { nome, quantidade, status } = req.body;

    if (typeof nome !== "string" || nome.trim() === "") {
        return res.status(400).json({ erro: "O campo nome e obrigatorio" });
    }

    if (typeof quantidade !== "number" || quantidade < 0) {
        return res.status(400).json({ erro: "quantidade deve ser um numero maior ou igual a zero" });
    }

    const nova: Ferramenta = {
        id: gerarId(),
        nome: nome.trim(),
        quantidade,
        status: status ?? "disponivel",
    };

    ferramentas.push(nova);
    return res.status(201).json(nova);
});

// EDITAR FERRAMENTA EXISTENTE

servidor.put("/ferramentas/:id", (req, res) => {
    const id = Number(req.params.id);
    const indice = ferramentas.findIndex((f) => f.id === id);

    if (indice === -1) {
        return res.status(404).json({ erro: "Ferramenta nao encontrada" });
    }

    const { nome, quantidade, status } = req.body;
    const atual = ferramentas[indice]!;

    const atualizada: Ferramenta = {
        id: atual.id,
        nome: typeof nome === "string" && nome.trim() !== "" ? nome.trim() : atual.nome,
        quantidade: typeof quantidade === "number" ? quantidade : atual.quantidade,
        status: status ?? atual.status,
    };

    ferramentas[indice] = atualizada;
    return res.status(200).json(atualizada);
});

// DELETAR FERRAMENTA

servidor.delete("/ferramentas/:id", (req, res) => {
    const id = Number(req.params.id);
    const indice = ferramentas.findIndex((f) => f.id === id);

    if (indice === -1) {
        return res.status(404).json({ erro: "Ferramenta nao encontrada" });
    }

    ferramentas.splice(indice, 1);
    return res.status(204).send();
});

servidor.listen(3000, () => {
    console.log("API no ar em http://localhost:3000");
});
