export type StatusDaFerramenta = "disponivel" | "em_uso" | "manutencao";

export interface Ferramenta {
    id: number;
    nome: string;
    quantidade: number;
    status: StatusDaFerramenta;
}
