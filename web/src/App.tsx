import { useState } from "react";
import type { Ferramenta, StatusDaFerramenta } from "./tipos";
import { useFerramentas } from "./useFerramentas";
import { removerFerramenta } from "./api";
import ListaFerramentas from "./ListaFerramentas";
import FormularioFerramenta from "./FormularioFerramenta";
import "./App.css";

export default function App() {
  const [filtro, setFiltro] = useState<StatusDaFerramenta | "">("");
  const [emEdicao, setEmEdicao] = useState<Ferramenta | null>(null);

  const { ferramentas, carregando, erro, recarregar } = useFerramentas(filtro);

  async function aoRemover(id: number) {
    const confirmou = window.confirm("Remover esta ferramenta?");
    if (!confirmou) return;

    await removerFerramenta(id);
    if (emEdicao?.id === id) {
      setEmEdicao(null);
    }
    recarregar();
  }

  return (
    <main>
      <h1>Almoxarifado — Ferramentas</h1>

      <FormularioFerramenta
        emEdicao={emEdicao}
        aoConcluir={() => {
          setEmEdicao(null);
          recarregar();
        }}
        aoCancelar={() => setEmEdicao(null)}
      />

      <label>
        Filtrar por status:
        <select
          value={filtro}
          onChange={(e) => setFiltro(e.target.value as StatusDaFerramenta | "")}
        >
          <option value="">Todas</option>
          <option value="disponivel">Disponivel</option>
          <option value="em_uso">Em uso</option>
          <option value="manutencao">Manutencao</option>
        </select>
      </label>

      {carregando && <p>Carregando ferramentas...</p>}
      {erro && <p role="alert">{erro}</p>}

      {!carregando && !erro && (
        <ListaFerramentas
          ferramentas={ferramentas}
          aoEditar={setEmEdicao}
          aoRemover={aoRemover}
        />
      )}
    </main>
  );
}
