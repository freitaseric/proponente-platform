# CaptaFlow Platform

Repositorio da plataforma CaptaFlow.

No estado atual, este repositorio contem a API backend em `captaflow-api/`. A
estrutura de checkout, app desktop e pacotes compartilhados ainda nao existe
neste checkout.

## Projeto Disponivel

| Caminho | Descricao |
| --- | --- |
| `captaflow-api/` | API HTTP em Fastify com TypeScript, Better Auth, Drizzle ORM e PostgreSQL. |

## Stack Atual

| Area | Tecnologia |
| --- | --- |
| Runtime | Node.js |
| Linguagem | TypeScript |
| Package manager | pnpm |
| API | Fastify |
| Autenticacao | Better Auth |
| ORM | Drizzle ORM |
| Banco de dados | PostgreSQL |
| Validacao/config | Zod e dotenv |
| Formatacao/lint | Biome |
| Ambiente local | Docker Compose para PostgreSQL |

## Como Rodar

Entre no diretorio da API:

```sh
cd captaflow-api
```

Instale as dependencias:

```sh
pnpm install
```

Crie o arquivo `.env` com as variaveis esperadas pela API:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/captaflow
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

Suba o PostgreSQL local:

```sh
docker compose up -d
```

Rode a API em desenvolvimento:

```sh
pnpm dev
```

A API sobe em `http://localhost:3000`.

## Comandos da API

Os comandos disponiveis hoje estao definidos em `captaflow-api/package.json`:

```sh
pnpm dev
pnpm build
pnpm lint
pnpm format
```

Veja mais detalhes em [captaflow-api/README.md](captaflow-api/README.md).

## Estrutura Atual

```txt
.
|-- README.md
`-- captaflow-api/
    |-- src/
    |   |-- app.ts
    |   |-- db/
    |   |-- modules/
    |   `-- shared/
    |-- drizzle/
    |-- postman/
    |-- docker-compose.yml
    |-- drizzle.config.ts
    |-- package.json
    `-- pnpm-workspace.yaml
```

## Status

Fundacao da API em andamento. Ja existem:

- servidor Fastify;
- health check em `GET /health`;
- CORS configurado por `CORS_ALLOWED_ORIGINS`;
- autenticacao por Better Auth;
- schema inicial de autenticacao com Drizzle;
- configuracao local de PostgreSQL via Docker Compose;
- colecoes Postman para testar os fluxos iniciais de autenticacao.

## Licenca

Este projeto usa a licenca Apache 2.0. Veja [LICENSE](LICENSE).
