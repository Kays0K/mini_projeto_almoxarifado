import type { Ferramenta } from "./tipos";

interface Props {
    ferramentas: Ferramenta[];
    aoEditar: (ferramenta: Ferramenta) => void;
    aoRemover: (id: number) => void;
}

export default function ListaFerramentas({
    ferramentas,
    aoEditar,
    aoRemover,
}: Props) {
    if (ferramentas.length === 0) {
        return <p>Nenhuma ferramenta encontrada.</p>;
    }

    return (
        <ul>
            {ferramentas.map((f) => (
                <li key={f.id}>
                    {f.nome} — {f.quantidade} un. — {f.status}
                    <button onClick={() => aoEditar(f)}>Editar</button>
                    <button onClick={() => aoRemover(f.id)}>Remover</button>
                </li>
            ))}
        </ul>
    );
}
