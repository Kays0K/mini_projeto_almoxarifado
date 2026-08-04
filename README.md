# Almoxarifado — Controle de Ferramentas

Sistema full stack para controle de ferramentas de um almoxarifado
industrial: cadastro, listagem, atualizacao e baixa de itens.

## Tecnologias

- **Backend:** Node.js, Express, TypeScript
- **Frontend:** React, TypeScript, Vite
- **Controle de versao:** Git e GitHub

## Como rodar

Pre-requisito: Node.js 20 ou superior.

Backend:
```
cd api
npm install
npm run dev
```
A API sobe em http://localhost:3000

Frontend (em outro terminal):
```
cd web
npm install
npm run dev
```
A tela abre em http://localhost:5173

## Endpoints da API

| Metodo | Rota             | Descricao                        |
|--------|------------------|----------------------------------|
| GET    | /ferramentas     | Lista todas (filtro ?status=)    |
| GET    | /ferramentas/:id | Busca uma ferramenta             |
| POST   | /ferramentas     | Cadastra uma ferramenta          |
| PUT    | /ferramentas/:id | Atualiza uma ferramenta          |
| DELETE | /ferramentas/:id | Remove uma ferramenta            |

## Sobre o projeto

Desenvolvido durante o Curso Tecnico em Desenvolvimento de Sistemas
do SENAI, na Unidade Curricular de Desenvolvimento de Sistemas.
