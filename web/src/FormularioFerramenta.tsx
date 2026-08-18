import { useEffect, useState } from "react";
import type { Ferramenta } from "./tipos";
import { atualizarFerramenta, criarFerramenta } from "./api";

interface Props {
    emEdicao: Ferramenta | null;
    aoConcluir: () => void;
    aoCancelar: () => void;
}

export default function FormularioFerramenta({
    emEdicao,
    aoConcluir,
    aoCancelar,
}: Props) {
    const [nome, setNome] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [salvando, setSalvando] = useState(false);
    const [mensagem, setMensagem] = useState<string | null>(null);

    useEffect(() => {
        if (emEdicao) {
            setNome(emEdicao.nome);
            setQuantidade(String(emEdicao.quantidade));
        } else {
            setNome("");
            setQuantidade("");
        }
        setMensagem(null);
    }, [emEdicao]);

    async function aoSubmeter(evento: React.FormEvent) {
        evento.preventDefault();
        setSalvando(true);
        setMensagem(null);

        try {
            const dados = { nome, quantidade: Number(quantidade) };

            if (emEdicao) {
                await atualizarFerramenta(emEdicao.id, dados);
                setMensagem("Ferramenta atualizada.");
            } else {
                await criarFerramenta(dados);
                setMensagem("Ferramenta cadastrada.");
                setNome("");
                setQuantidade("");
            }

            aoConcluir();
        } catch (e) {
            const texto = e instanceof Error ? e.message : "Erro inesperado";
            setMensagem(texto);
        } finally {
            setSalvando(false);
        }
    }

    return (
        <form onSubmit={aoSubmeter}>
            <h2>{emEdicao ? `Editando: ${emEdicao.nome}` : "Nova ferramenta"}</h2>

            <input
                placeholder="Nome da ferramenta"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
            />
            <input
                type="number"
                placeholder="Quantidade"
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
            />

            <button type="submit" disabled={salvando}>
                {salvando ? "Salvando..." : emEdicao ? "Salvar alteracoes" : "Cadastrar"}
            </button>

            {emEdicao && (
                <button type="button" onClick={aoCancelar} disabled={salvando}>
                    Cancelar
                </button>
            )}

            {mensagem && <p role="alert">{mensagem}</p>}
        </form>
    );
}
