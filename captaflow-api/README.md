# CaptaFlow API

API backend do CaptaFlow.

Esta API usa Fastify, TypeScript, Better Auth, Drizzle ORM e PostgreSQL. O
servidor atual expoe um health check e as rotas iniciais de autenticacao.

## Requisitos

- Node.js
- pnpm
- Docker e Docker Compose, para rodar o PostgreSQL local

O `package.json` declara pnpm `^11.3.0` como package manager esperado.

## Instalacao

```sh
pnpm install
```

## Variaveis de Ambiente

Crie um arquivo `.env` na raiz de `captaflow-api/`:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/captaflow
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

Variaveis usadas pela aplicacao:

| Variavel | Obrigatoria | Descricao |
| --- | --- | --- |
| `DATABASE_URL` | Sim | URL de conexao com o PostgreSQL. |
| `CORS_ALLOWED_ORIGINS` | Nao | Lista de origins permitidas, separadas por virgula. |

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
| Banco | `captaflow` |
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
captaflow-api/
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

Apache 2.0. Veja [../LICENSE](../LICENSE).
