# Aliases .com → inspetorbudganja.com.br

Domínio canónico: **https://inspetorbudganja.com.br**

Aliases (devem redireccionar para o canónico):

- `inspetorbudganja.com` / `www.inspetorbudganja.com`
- `inspectorbudganja.com` / `www.inspectorbudganja.com`

> Nota: na mesma conta Cloudflare, zonas diferentes podem ter nameservers diferentes
> (ex.: `gracie`/`kurt` nos `.com` e `desi`/`dom` no `.com.br`). Isso é normal.

O código do site e o ingress do túnel **já estão prontos**. O que falta é DNS correcto
em cada zona `.com` (hoje os `.com` não têm A/CNAME — por isso não abrem).

---

## Método recomendado — DNS manual no painel (2 minutos)

Tunnel ID: `deccb19c-bdf3-477d-a251-279dc4b5b584`  
Target CNAME: `deccb19c-bdf3-477d-a251-279dc4b5b584.cfargotunnel.com`

### A) Limpar registos errados no `.com.br`

1. Cloudflare → zona **inspetorbudganja.com.br** → **DNS** → **Records**
2. Apagar se existirem registos com estes **nomes** (são subdomínios errados):
   - `inspetorbudganja.com`
   - `www.inspetorbudganja.com`
   - `inspectorbudganja.com`
   - `www.inspectorbudganja.com`  
   (aparecem como FQDN tipo `inspetorbudganja.com.inspetorbudganja.com.br`)

### B) Zona **inspetorbudganja.com** → DNS → Add record

| Type  | Name | Target                                                         | Proxy   |
|-------|------|----------------------------------------------------------------|---------|
| CNAME | `@`  | `deccb19c-bdf3-477d-a251-279dc4b5b584.cfargotunnel.com`       | Proxied |
| CNAME | `www`| `deccb19c-bdf3-477d-a251-279dc4b5b584.cfargotunnel.com`       | Proxied |

### C) Zona **inspectorbudganja.com** → DNS → Add record

| Type  | Name | Target                                                         | Proxy   |
|-------|------|----------------------------------------------------------------|---------|
| CNAME | `@`  | `deccb19c-bdf3-477d-a251-279dc4b5b584.cfargotunnel.com`       | Proxied |
| CNAME | `www`| `deccb19c-bdf3-477d-a251-279dc4b5b584.cfargotunnel.com`       | Proxied |

> Se a Cloudflare não deixar CNAME no apex (`@`), usa o botão **CNAME** mesmo assim
> (plano Free com proxy laranja aceita CNAME flattening). Alternativa: em
> **Zero Trust → Networks → Tunnels → budganja → Public Hostname** adiciona cada
> hostname — a Cloudflare cria o DNS sozinha.

### D) Redirect 301 na edge (recomendado)

Em **cada** zona `.com` → **Rules → Redirect Rules** → Create rule:

- If: Hostname equals `inspetorbudganja.com` OR `www.inspetorbudganja.com`
- Then: Dynamic → `concat("https://inspetorbudganja.com.br", http.request.uri)` · **301**

Repetir para `inspectorbudganja.com` / `www.inspectorbudganja.com`.

(O Node em `server/index.js` também redirecciona se o pedido chegar ao túnel.)

### E) Confirmar no PC

```powershell
cd deploy
Copy-Item .\cloudflared.config.yml $env:USERPROFILE\.cloudflared\config.yml -Force
# Reinicia o cloudflared (fecha o processo e volta a correr, ou o teu start-site)
```

Teste após 1–2 min:

```text
https://inspetorbudganja.com  → https://inspetorbudganja.com.br/
https://inspectorbudganja.com → https://inspetorbudganja.com.br/
```

---

## Porque o `.\fix-dns.ps1` falhou

O comando `cloudflared tunnel route dns budganja inspetorbudganja.com` está a criar
CNAMEs **dentro** da zona `.com.br` (`inspetorbudganja.com.inspetorbudganja.com.br`)
em vez da zona `inspetorbudganja.com`. Por isso o DNS manual (secção B/C) é o caminho fiável.

Não uses só o script até isto estar corrigido no painel.
