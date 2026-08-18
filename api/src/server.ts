import express from "express";
import cors from "cors";
import type { StatusDaFerramenta } from "./tipos.js";
import prisma from "./lib/prisma.js";

const app = express();

app.use(cors());
app.use(express.json());

// LISTAR
app.get("/ferramentas", async (req, res) => {
    const status = req.query.status as StatusDaFerramenta | undefined;

    const ferramentas = await prisma.ferramenta.findMany({
        where: status ? { status } : undefined,
        orderBy: { id: "asc" },
    });

    return res.status(200).json(ferramentas);
});

// BUSCAR POR ID
app.get("/ferramentas/:id", async (req, res) => {
    const id = Number(req.params.id);

    const ferramenta = await prisma.ferramenta.findUnique({ where: { id } });

    if (!ferramenta) {
        return res.status(404).json({ erro: "Ferramenta nao encontrada" });
    }

    return res.status(200).json(ferramenta);
});

// CRIAR
app.post("/ferramentas", async (req, res) => {
    const { nome, quantidade, status } = req.body;

    if (typeof nome !== "string" || nome.trim() === "") {
        return res.status(400).json({ erro: "O campo nome e obrigatorio" });
    }

    if (typeof quantidade !== "number" || quantidade < 0) {
        return res.status(400).json({ erro: "quantidade deve ser um numero maior ou igual a zero" });
    }

    const nova = await prisma.ferramenta.create({
        data: {
            nome: nome.trim(),
            quantidade,
            status: status ?? "disponivel",
        },
    });

    return res.status(201).json(nova);
});

// ATUALIZAR
app.put("/ferramentas/:id", async (req, res) => {
    const id = Number(req.params.id);

    const existente = await prisma.ferramenta.findUnique({ where: { id } });

    if (!existente) {
        return res.status(404).json({ erro: "Ferramenta nao encontrada" });
    }

    const { nome, quantidade, status } = req.body;

    if (typeof nome !== "string" || nome.trim() === "") {
        return res.status(400).json({ erro: "O campo nome e obrigatorio" });
    }

    if (typeof quantidade !== "number" || quantidade < 0) {
        return res.status(400).json({ erro: "quantidade deve ser um numero maior ou igual a zero" });
    }

    const atualizada = await prisma.ferramenta.update({
        where: { id },
        data: {
            nome: nome.trim(),
            quantidade,
            status: status ?? existente.status,
        },
    });

    return res.status(200).json(atualizada);
});

// REMOVER
app.delete("/ferramentas/:id", async (req, res) => {
    const id = Number(req.params.id);

    const existente = await prisma.ferramenta.findUnique({ where: { id } });

    if (!existente) {
        return res.status(404).json({ erro: "Ferramenta nao encontrada" });
    }

    await prisma.ferramenta.delete({ where: { id } });

    return res.status(204).send();
});

app.listen(3000, () => {
    console.log("API no ar em http://localhost:3000");
});
