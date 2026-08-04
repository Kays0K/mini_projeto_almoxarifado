import type { Ferramenta } from "./tipos.js";

export const ferramentas: Ferramenta[] = [
  { id: 1, nome: "Torquimetro", quantidade: 4, status: "disponivel" },
  { id: 2, nome: "Paquimetro", quantidade: 7, status: "em_uso" },
];

export let proximoId = 3;

export function gerarId(): number {
  return proximoId++;
}