# Almoxarifado — Controle de Ferramentas

Sistema full stack para controle de ferramentas de um almoxarifado
industrial: cadastro, listagem, atualizacao e baixa de itens.

## Tecnologias

- **Backend:** Node.js, Express, TypeScript, Prisma ORM
- **Banco de dados:** PostgreSQL
- **Frontend:** React, TypeScript, Vite
- **Controle de versao:** Git e GitHub

## Como rodar

Pre-requisitos: Node.js 20+ e PostgreSQL instalado.

1. Crie um banco chamado `almoxarifado` no PostgreSQL.
2. Em `api/`, copie o arquivo `.env.example` para `.env` e ajuste a senha.
3. Backend:
```
cd api
npm install
npx prisma migrate dev
npm run dev
```
A API sobe em http://localhost:3000

4. Frontend (em outro terminal):
```
cd web
npm install
npm run dev
```
Pre-requisito: Node.js 20 ou superior.

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
