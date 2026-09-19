# Wprinter Assistente Técnico Web

Aplicação web em **Node.js + TypeScript + Express + EJS + SQLite**, organizada em MVC.

## Estrutura
- `src/models`: acesso ao banco e entidades
- `src/controllers`: regras HTTP
- `src/routes`: rotas
- `src/services`: importação/exportação Excel
- `src/views`: interface EJS
- `src/public`: CSS
- `data/wprinter_tecnico.db`: banco SQLite criado automaticamente

## Instalação
1. Instale Node.js 20+.
2. Abra o terminal nesta pasta.
3. Execute `npm install`.
4. Execute `npm run dev`.
5. Acesse `http://localhost:3000`.

## Excel
No menu **Cadastro técnico**, importe um `.xlsx` com:

Aba de erros: `Marca | Modelo | Código de erro | Descrição | Causa provável | Procedimento de diagnóstico | Observações`

Aba de peças: `Marca | Modelo | Part Number | Peça | Categoria | Código de erro relacionado | Observações`

A importação faz upsert dos erros por **Marca + Modelo + Código**.

## Produção
Execute `npm run build` e depois `npm start`.
