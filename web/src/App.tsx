import { useEffect, useState } from "react";
import type { Ferramenta } from "./tipos";
import "./App.css";

const URL_API = "http://localhost:3000";

export default function App() {
  const [ferramentas, setFerramentas] = useState<Ferramenta[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const [modal, setModal] = useState(false)

  const [nomecadastro, setNomecadastro] = useState("");
  const [quantidadecadastro, setQuantidadecadastro] = useState("");

  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [id, setId] = useState(0)

  const [salvando, setSalvando] = useState(false);
  const [mensagem, setMensagem] = useState<string | null>(null);

  useEffect(() => {
    async function carregar() {
      try {
        const resposta = await fetch(`${URL_API}/ferramentas`);
        if (!resposta.ok) {
          throw new Error("Falha ao carregar");
        }
        const dados: Ferramenta[] = await resposta.json();
        setFerramentas(dados);
      } catch {
        setErro("Nao foi possivel carregar as ferramentas. A API esta rodando?");
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, []);

  async function cadastrar(evento: React.FormEvent) {
    evento.preventDefault();
    setSalvando(true);
    setMensagem(null);

    try {
      const resposta = await fetch(`${URL_API}/ferramentas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, quantidade: Number(quantidade) }),
      });

      const corpo = await resposta.json();

      if (!resposta.ok) {
        setMensagem(corpo.erro ?? "Erro ao cadastrar");
        return;
      }

      setFerramentas((atual) => [...atual, corpo as Ferramenta]);
      setMensagem("Ferramenta cadastrada.");
      setNomecadastro("");
      setQuantidadecadastro("");
    } catch {
      setMensagem("Nao foi possivel salvar. Tente novamente.");
    } finally {
      setSalvando(false);
    }
  }

  function abrirEdicao(item: Ferramenta) {
    setId(item.id);
    setNome(item.nome);
    setQuantidade(String(item.quantidade));
    setModal(true);
  }

  async function salvarEdicao(evento: React.FormEvent) {
    evento.preventDefault();
    if (!id) return;

    setSalvando(true);
    setMensagem(null);

    try {
      const resposta = await fetch(`${URL_API}/ferramentas/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, quantidade: Number(quantidade) }),
      });

      const corpo = await resposta.json();

      if (!resposta.ok) {
        setMensagem(corpo.erro ?? "Erro ao editar");
        return;
      }

      setFerramentas((atual) =>
        atual.map((f) => (f.id === id ? (corpo as Ferramenta) : f))
      );

      setMensagem("Ferramenta editada com sucesso.");
      setModal(false);
      setNome("");
      setQuantidade("");
    } catch {
      setMensagem("Nao foi possivel salvar. Tente novamente.");
    } finally {
      setSalvando(false);
    }
  }

  async function remover(id: number) {
    const confirmou = window.confirm("Remover esta ferramenta?");
    if (!confirmou) return;

    const resposta = await fetch(`${URL_API}/ferramentas/${id}`, {
      method: "DELETE",
    });

    if (resposta.ok) {
      setFerramentas((atual) => atual.filter((f) => f.id !== id));
    }
  }

  if (carregando) return <p>Carregando ferramentas...</p>;
  if (erro) return <p>{erro}</p>;

  return (
    <main>
      <h1>Almoxarifado — Ferramentas</h1>

      <form onSubmit={cadastrar} style={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: "10px", alignItems: "center" }}>
        <input
          placeholder="Nome da ferramenta"
          value={nomecadastro}
          onChange={(e) => setNomecadastro(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantidade"
          value={quantidadecadastro}
          onChange={(e) => setQuantidadecadastro(e.target.value)}
        />
        <button type="submit" disabled={salvando}>
          {salvando ? "Salvando..." : "Cadastrar"}
        </button>
      </form>
      {mensagem && <p>{mensagem}</p>}

      <h2>Nome da ferramenta | Quantidade | Status</h2>

      <ul style={{ marginTop: "5px" }}>
        {ferramentas.map((f) => (
          <li key={f.id}>
            {f.nome} | {f.quantidade} un. | {f.status}


            <button onClick={() => abrirEdicao(f)} style={{ marginLeft: "10px" }}>
              Editar
            </button>

            <button onClick={() => remover(f.id)} style={{ marginLeft: "20px" }}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      {modal && (
        <div className="fundo-modal">
          <h1>Editar Produto</h1>

          <form className="modal-content" onSubmit={salvarEdicao} style={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: "10px", alignItems: "center" }}>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <input
              type="number"
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
            />
            <button type="submit" disabled={salvando}>
              {salvando ? "Salvando..." : "Confirmar Edição"}
            </button>
            <button
              type="button"
              onClick={() => {
                setModal(false);
                setNome("");
                setQuantidade("");
              }}
            >
              Cancelar
            </button>
          </form>
        </div>
      )}
    </main>
  );
}