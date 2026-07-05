# Proponente Digital API

API backend do Proponente Digital.

Esta API usa Fastify, TypeScript, Better Auth, Drizzle ORM e PostgreSQL. O
servidor atual expoe um health check e as rotas iniciais de autenticacao.

## Requisitos

- Node.js
- pnpm
- Docker e Docker Compose, para rodar o PostgreSQL local

O workspace raiz declara pnpm `11.9.0` como package manager esperado.

## Instalacao

Na raiz do monorepo:

```sh
pnpm install
```

## Variaveis de Ambiente

Crie um arquivo `.env` na raiz de `apps/api/`:

```env
NODE_ENV=development
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/proponente
WEB_PUBLIC_URL=http://localhost:5173
API_PUBLIC_URL=http://localhost:3000
CORS_ALLOWED_ORIGINS=http://localhost:5173
GOOGLE_CLIENT_ID=local-google-client-id
GOOGLE_CLIENT_SECRET=local-google-client-secret
```

Variaveis usadas pela aplicacao:

| Variavel | Obrigatoria | Descricao |
| --- | --- | --- |
| `NODE_ENV` | Nao | Ambiente da API. Use `production` no deploy. |
| `DATABASE_URL` | Sim | URL de conexao com o PostgreSQL. |
| `WEB_PUBLIC_URL` | Sim em producao | URL publica do app web. Em desenvolvimento usa `http://localhost:5173` se ausente. |
| `API_PUBLIC_URL` | Sim em producao | URL publica da API. Em desenvolvimento usa `http://localhost:3000` se ausente. |
| `CORS_ALLOWED_ORIGINS` | Nao | Origins extras permitidas, separadas por virgula. `WEB_PUBLIC_URL` e `API_PUBLIC_URL` ja entram automaticamente. |
| `GOOGLE_CLIENT_ID` | Sim | Client ID do provedor Google usado pelo Better Auth. |
| `GOOGLE_CLIENT_SECRET` | Sim | Client secret do provedor Google usado pelo Better Auth. |

Em producao, `WEB_PUBLIC_URL` e `API_PUBLIC_URL` nao podem ficar ausentes. A
API falha na inicializacao em vez de assumir `localhost`.

## Banco de Dados

O projeto inclui um `docker-compose.yml` com PostgreSQL local:

```sh
docker compose up -d
```

Configuracao do container:

| Campo | Valor |
| --- | --- |
| Usuario | `postgres` |
| Senha | `postgres` |
| Banco | `proponente` |
| Porta | `5432` |

As migrations do Drizzle ficam em `drizzle/`, e o schema fica em
`src/db/schema/`.

Comandos uteis do Drizzle:

```sh
pnpm exec drizzle-kit generate
pnpm exec drizzle-kit migrate
```

## Desenvolvimento

```sh
pnpm dev
```

O servidor sobe em:

```txt
http://localhost:3000
```

## Scripts

| Comando | Descricao |
| --- | --- |
| `pnpm dev` | Inicia a API em modo watch com `tsx`. |
| `pnpm build` | Compila TypeScript para `dist/`. |
| `pnpm lint` | Executa o lint do Biome. |
| `pnpm format` | Executa o formatador do Biome. |

## Rotas Atuais

| Metodo | Rota | Descricao |
| --- | --- | --- |
| `GET` | `/health` | Health check da API. |
| `GET` | `/auth/@me` | Retorna a sessao autenticada ou `401`. |
| `GET`, `POST` | `/auth/*` | Encaminha requests para o handler do Better Auth. |

## Estrutura

```txt
apps/api/
|-- src/
|   |-- app.ts
|   |-- db/
|   |   |-- client.ts
|   |   `-- schema/
|   |-- modules/
|   |   `-- auth/
|   `-- shared/
|       |-- auth.ts
|       `-- env.ts
|-- drizzle/
|-- postman/
|-- docker-compose.yml
|-- drizzle.config.ts
|-- package.json
`-- tsconfig*.json
```

## Postman

O diretorio `postman/` contem requests para testar:

- health check;
- sign up;
- sign in;
- sign out;
- consulta da sessao.

## Build

```sh
pnpm build
```

O resultado da compilacao e gerado em `dist/`.

## Licenca

Apache 2.0. Veja [../../LICENSE](../../LICENSE).
