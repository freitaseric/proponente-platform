# Proponente Digital Desktop

Aplicativo desktop Tauri com Vite, React e TypeScript.

## Variaveis Publicas

Crie um `.env.local` em `apps/desktop/` para desenvolvimento:

```env
VITE_API_BASE_URL=http://localhost:3000
VITE_WEB_BASE_URL=http://localhost:5173
```

Essas variaveis sao lidas pelo Vite no build. Depois que o instalador e gerado,
o app nao consulta variaveis do ambiente do usuario final para trocar URLs.

Em producao, `VITE_API_BASE_URL` e `VITE_WEB_BASE_URL` sao obrigatorias. O build
falha cedo se alguma delas estiver ausente ou nao for uma URL absoluta valida.

## Updates

O updater consulta o `latest.json` publicado no GitHub Release mais recente:

```txt
https://github.com/freitaseric/proponente-platform/releases/latest/download/latest.json
```

O JSON e os instaladores sao gerados pelo workflow
`.github/workflows/release-desktop.yml`. A API nao serve binarios nem decide
versoes de update.

## Fluxo de Autenticacao

1. O desktop gera um `state` local e abre `VITE_WEB_BASE_URL/entrar`.
2. O web autentica o usuario no navegador e redireciona para a API.
3. A API gera um one-time token e devolve o usuario para o web.
4. O web chama o deep link `proponente://auth/callback`.
5. O desktop valida o `state` recebido antes de trocar o token por sessao.
