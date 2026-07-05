# Checklist — antes de dar por encerrada uma alteração

Use isto depois de pedir mudanças no site (você ou o assistente). **~5 minutos.** Não precisa ler código.

## 1. Build (obrigatório)

Se mexeu em HTML, CSS, JS do site, `lib/`, `server/`, JSON de conteúdo ou catálogo da loja:

```powershell
cd c:\Users\tiago\Desktop\ProjectBudGanja
npm run build
```

- [ ] Comando terminou **sem erro** (última linha: `Build concluído`)
- [ ] Se falhou: **não considerar pronto** — copiar a mensagem de erro e pedir correção

## 2. Servidor (se o site já estava no ar)

Alterações em `server/`, `.env`, `lib/` (API/auth) ou após `deploy/start-now.ps1`:

```powershell
.\deploy\start-now.ps1
```

Ou reiniciar o processo que serve o site (PM2 / terminal com `npm start`).

- [ ] Servidor reiniciado quando a alteração exigir (ver nota no chat ou em `docs/ARQUITETURA.md`)

## 3. Teste no browser (smoke test)

Abra `http://localhost:8080` (ou o domínio em produção).

| O que mudou | O que abrir e conferir |
|-------------|-------------------------|
| Menu / navegação | Home → Biblioteca e Ferramentas (desktop e, se possível, mobile) |
| Página nova (ex.: loja) | URL da página + link no menu |
| Guia / equipamentos | Página do guia + link “voltar” e link para loja (se houver) |
| Admin / login | `/login.html` — entra e abre Admin |
| Sorteios / contato | Formulário ou página alterada |
| Só conteúdo de post | Listagem da biblioteca + post individual |
| Inspeções / guia | `/biblioteca/inspecoes/` → filtro de série → post com vídeo e loja |
| Diário / cultivo | `/cultivo/` (login) → separador Diário |
| Calculadoras → diário | Abrir VPD ou Luxímetro → «Guardar no diário» visível se autenticado |

URLs rápidas (smoke test local `http://localhost:8080`):

- `/` — home, menu Biblioteca e Ferramentas
- `/biblioteca/inspecoes/` — filtro Guia / Jardim HG
- `/posts/post-inspecao-cultivo-inicio.html` — embed YouTube + materiais loja
- `/calculadoras/luximetro.html` — luxímetro + bridge diário
- `/cultivo/` — diário (requer login)
- `/admin.html` — painel (requer login admin)

- [ ] Página alterada **abre** (sem 404)
- [ ] **Menu e rodapé** aparecem normais
- [ ] **Links principais** da tarefa funcionam (clique 2–3)
- [ ] Se era link externo (Magalu, YouTube): abre em **nova aba** o destino certo

## 4. Consistência rápida

- [ ] Textos em **português** e sem “Lorem ipsum” / placeholders esquecidos
- [ ] Imagens carregam (não ficam ícone quebrado)
- [ ] Tema claro/escuro: um olhar rápido se mudou CSS global

## 5. Produção (só quando for publicar de verdade)

- [ ] Deploy online executado:

```powershell
cd c:\Users\tiago\Desktop\ProjectBudGanja
npm run deploy:online
```

- [ ] Site em produção abre no domínio (`https://inspetorbudganja.com.br`)
- [ ] Validar versão publicada:

```text
https://inspetorbudganja.com.br/version.json
```

- [ ] Teste rápido no celular (sempre igual):
1. Fechar e reabrir o app/site no celular.
2. Abrir a home e navegar para a página alterada.
3. Se aparecer aviso "Nova versão disponível", tocar em "Atualizar agora".
4. Confirmar a alteração no ecrã.

- [ ] Só se necessário: refresh forçado ou limpar cache do navegador/PWA

### Fluxo padrão (copiar e usar após cada alteração)

```powershell
cd c:\Users\tiago\Desktop\ProjectBudGanja
npm run deploy:online
```

Depois:
1. Abrir `https://inspetorbudganja.com.br/version.json`.
2. Testar a mudança no celular.
3. Se houver banner de atualização, tocar em "Atualizar agora".

---

## Quando pular passos

| Situação | Build | Reiniciar servidor | Browser |
|----------|-------|--------------------|---------|
| Só documentação (`docs/`, README) | Não | Não | Não |
| Só imagem nova em `imagens/` | Sim | Não* | Sim (página que usa a imagem) |
| Mudança em `lib/` ou `server/` | Sim | **Sim** | Sim |
| Novo post só pelo Admin online | Automático se hook Netlify | N/A | Sim no site publicado |

\*Reiniciar só se o servidor estiver a correr e a alteração for em ficheiros que ele lê em memória.

---

## Se algo falhar

1. Anotar **o que fez** + **URL** + **mensagem de erro** (print ou texto).
2. Pedir ao assistente: “build falhou com …” ou “página X em branco”.
3. Não apagar `data/budganja.db` nem `.env` sem combinar antes.

---

## Referências

- [ARQUITETURA.md](ARQUITETURA.md) — onde fica cada tipo de ficheiro  
- [estrutura-dados.md](estrutura-dados.md) — base de dados  
- [README.md](../README.md) — comandos e deploy  

**Versão curta para colar no chat após cada tarefa:**

> Build OK? Servidor reiniciado se precisou? Testou a URL X no browser? Links do menu OK?
