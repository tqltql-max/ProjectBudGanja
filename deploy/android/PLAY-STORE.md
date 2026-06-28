# Publicar na Google Play Store — Inspetor BudGanja

Este guia usa **TWA (Trusted Web Activity)**: o app Android abre o site `https://inspetorbudganja.com.br` em ecrã cheio. **Não precisas reescrever o site** — actualizações de conteúdo vão só para o servidor.

## O que já está preparado no projecto

| Item | Local |
|------|--------|
| PWA (`manifest.json`, ícones, service worker) | raiz do repo |
| Config TWA (Bubblewrap) | `deploy/android/twa-manifest.json` |
| Digital Asset Links | `deploy/android/assetlinks.config.json` → gera `.well-known/assetlinks.json` |
| Scripts Windows | `deploy/android/*.ps1` |

## Checklist — o que **tu** precisas fazer

### 1. Conta Google Play Developer (~25 USD, taxa única)

- https://play.google.com/console/signup
- Conta pessoal ou organização (CNPJ se empresa)

### 2. Pré-requisitos no PC (Windows)

1. **JDK 17** — https://adoptium.net/
2. **Android Studio** — https://developer.android.com/studio  
   - Instalar **Android SDK** (API 34+)  
   - Definir variável de ambiente:
   ```powershell
   [Environment]::SetEnvironmentVariable("ANDROID_HOME", "$env:LOCALAPPDATA\Android\Sdk", "User")
   ```
3. Reiniciar o terminal após instalar

### 3. Gerar o projecto Android

```powershell
cd C:\Users\tiago\Desktop\ProjectBudGanja
.\deploy\android\init-twa.ps1
```

O Bubblewrap vai pedir:
- Password do **keystore** (guarda num sítio seguro — **nunca percas**)
- Confirmação de host, ícones, etc.

### 4. Ligar o app ao domínio (obrigatório para TWA)

```powershell
.\deploy\android\get-signing-fingerprint.ps1
```

Copia o **SHA-256** para `deploy/android/assetlinks.config.json`:

```json
{
  "packageName": "com.inspetorbudganja.app",
  "sha256CertFingerprints": [
    "AA:BB:CC:..."
  ]
}
```

Depois:

```powershell
npm run build
.\deploy\start-now.ps1
```

Confirma no browser:  
https://inspetorbudganja.com.br/.well-known/assetlinks.json

Ferramenta Google: https://developers.google.com/digital-asset-links/tools/generator

### 5. Compilar o AAB (ficheiro para a loja)

```powershell
.\deploy\android\build-twa.ps1
```

O `.aab` fica em `deploy/android/bubblewrap-project/.../outputs/`.

### 6. Play Console — primeira submissão

1. **Criar app** → nome: Inspetor BudGanja  
2. **Política de privacidade:** `https://inspetorbudganja.com.br/info/privacidade.html`  
3. **Classificação de conteúdo** — questionário (conteúdo educacional)  
4. **Público-alvo** — 18+ (cadastro exige idade ≥ 18)  
5. **Data safety** — declarar login Google, dados de perfil  
6. **Store listing:**
   - Ícone 512×512 (`imagens/icon-512.png`)
   - Screenshots telemóvel (mín. 2)
   - Descrição curta + longa em português
7. **Produção → Criar versão** → enviar o `.aab`

### 7. Hosting 24/7 (importante)

O app **carrega o site ao vivo**. Se o PC/túnel estiver offline, o app na Play Store não funciona.

Para produção na loja, considera VPS ou hosting sempre ligado (não só Cloudflare Tunnel no PC).

---

## Actualizar o app na loja

| Tipo de mudança | O que fazer |
|-----------------|-------------|
| Conteúdo, CSS, JS, posts | Só `npm run build` + site online — utilizadores recebem automaticamente |
| Versão Android (permissions, package) | Incrementar `appVersionCode` no TWA, `bubblewrap build`, novo AAB na Play Console |

---

## Package name

`com.inspetorbudganja.app` — definido em `twa-manifest.json` e `assetlinks.config.json`.  
**Não alteres** depois de publicar sem criar app novo na Play Console.

---

## Precisas de ajuda?

Quando chegares a estes passos, avisa:

1. **Conta Play Console criada?** (sim/não)  
2. **JDK + Android Studio instalados?**  
3. **Output do `init-twa.ps1`** se der erro  
4. **SHA-256** colado no `assetlinks.config.json`  
5. **Screenshot** da Play Console se rejeitarem a submissão
