# Proponente Digital Platform

Monorepo da plataforma Proponente Digital.

## Estrutura

```txt
.
|-- apps/
|   |-- api/
|   |-- desktop/
|   `-- web/
|-- packages/
|   |-- config/
|   `-- contracts/
|-- package.json
|-- pnpm-workspace.yaml
`-- turbo.json
```

## Projetos

| Caminho | Descricao |
| --- | --- |
| `apps/api/` | API HTTP em Fastify com TypeScript, Better Auth, Drizzle ORM e PostgreSQL. |
| `apps/web/` | App web publico usado para login, cadastro e retorno do fluxo desktop. |
| `apps/desktop/` | App desktop Tauri com Vite, React e TypeScript. |
| `packages/config/` | Base para configuracoes compartilhadas do workspace. |
| `packages/contracts/` | Pacote para contratos compartilhados entre apps. |

## Requisitos

- Node.js >= 22
- pnpm 11.9.0
- Docker e Docker Compose, para o PostgreSQL local da API
- Rust/Tauri toolchain, para os comandos Tauri do app desktop

## Instalacao

Instale as dependencias na raiz do monorepo:

```sh
pnpm install
```

## Desenvolvimento

```sh
pnpm dev
```

O comando acima e orquestrado pelo Turborepo e executa os scripts `dev` dos
apps do workspace.

Para rodar apenas um app:

```sh
pnpm --filter proponente-api dev
pnpm --filter proponente-desktop dev
```

## Comandos

| Comando | Descricao |
| --- | --- |
| `pnpm dev` | Executa os apps em desenvolvimento via Turbo. |
| `pnpm build` | Executa os builds dos pacotes/apps. |
| `pnpm check` | Executa typecheck e lint dos pacotes/apps. |
| `pnpm typecheck` | Executa apenas os typechecks. |
| `pnpm lint` | Executa os lints do Biome. |
| `pnpm format` | Executa os formatadores definidos nos pacotes/apps. |

## API

Crie o arquivo `.env` em `apps/api/`:

```env
NODE_ENV=development
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/proponente
WEB_PUBLIC_URL=http://localhost:5173
API_PUBLIC_URL=http://localhost:3000
CORS_ALLOWED_ORIGINS=http://localhost:5173
GOOGLE_CLIENT_ID=local-google-client-id
GOOGLE_CLIENT_SECRET=local-google-client-secret
```

Variaveis publicas de build:

| App | Arquivo local sugerido | Variaveis |
| --- | --- | --- |
| `apps/web` | `.env.local` | `VITE_API_BASE_URL=http://localhost:3000` |
| `apps/desktop` | `.env.local` | `VITE_API_BASE_URL=http://localhost:3000`, `VITE_WEB_BASE_URL=http://localhost:5173` |

As variaveis `VITE_*` sao embutidas pelo Vite no momento do build. No bundle
do Tauri elas nao sao lidas do ambiente do usuario final. Em build de producao,
web e desktop falham se as URLs publicas obrigatorias nao estiverem definidas.

## Releases Desktop

O auto-update do Tauri e publicado pelo GitHub Actions, nao pela API. O workflow
`.github/workflows/release-desktop.yml` compila o app, assina os artefatos,
publica um GitHub Release em draft e envia o `latest.json` consumido pelo
updater.

Configure estes secrets/variables no GitHub antes de publicar:

| Nome | Tipo | Descricao |
| --- | --- | --- |
| `TAURI_SIGNING_PRIVATE_KEY` | Secret | Chave privada do updater Tauri. |
| `TAURI_SIGNING_PRIVATE_KEY_PASSWORD` | Secret | Senha da chave, se existir. |
| `VITE_API_BASE_URL` | Variable | URL publica da API usada no bundle desktop, como `https://api.proponentedigital.com.br`. |
| `VITE_WEB_BASE_URL` | Variable | URL publica do app web usado no login desktop, como `https://proponentedigital.com.br`. |

Para publicar, crie uma tag `desktop-vX.Y.Z` alinhada a versao em
`apps/desktop/src-tauri/tauri.conf.json`. O app desktop consulta:

```txt
https://github.com/freitaseric/proponente-platform/releases/latest/download/latest.json
```

Suba o PostgreSQL local a partir de `apps/api/`:

```sh
docker compose up -d
```

Mais detalhes em [apps/api/README.md](apps/api/README.md).

## Licenca

Este projeto usa a licenca Apache 2.0. Veja [LICENSE](LICENSE).
