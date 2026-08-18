import type { Ferramenta, StatusDaFerramenta } from "./tipos";

const URL_API = "http://localhost:3000";

export async function listarFerramentas(
    status?: StatusDaFerramenta | ""
): Promise<Ferramenta[]> {
    const url = status
        ? `${URL_API}/ferramentas?status=${status}`
        : `${URL_API}/ferramentas`;

    const resposta = await fetch(url);
    if (!resposta.ok) {
        throw new Error("Falha ao listar ferramentas");
    }
    return resposta.json();
}

export async function criarFerramenta(dados: {
    nome: string;
    quantidade: number;
}): Promise<Ferramenta> {
    const resposta = await fetch(`${URL_API}/ferramentas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
    });

    const corpo = await resposta.json();
    if (!resposta.ok) {
        throw new Error(corpo.erro ?? "Falha ao cadastrar");
    }
    return corpo;
}

export async function atualizarFerramenta(
    id: number,
    dados: { nome: string; quantidade: number }
): Promise<Ferramenta> {
    const resposta = await fetch(`${URL_API}/ferramentas/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
    });

    const corpo = await resposta.json();
    if (!resposta.ok) {
        throw new Error(corpo.erro ?? "Falha ao atualizar");
    }
    return corpo;
}

export async function removerFerramenta(id: number): Promise<void> {
    const resposta = await fetch(`${URL_API}/ferramentas/${id}`, {
        method: "DELETE",
    });
    if (!resposta.ok) {
        throw new Error("Falha ao remover");
    }
}
