# Corrige DNS na Cloudflare (aponta dominio para o tunel)
# Execute UMA vez se o site der 503 online:
#   cd deploy
#   .\fix-dns.ps1

$env:Path = [System.Environment]::GetEnvironmentVariable('Path','Machine') + ';' + [System.Environment]::GetEnvironmentVariable('Path','User')

Write-Host "A actualizar DNS para o tunel budganja..." -ForegroundColor Cyan
cloudflared tunnel route dns --overwrite-dns budganja inspetorbudganja.com.br
cloudflared tunnel route dns --overwrite-dns budganja www.inspetorbudganja.com.br
Write-Host "Feito. Aguarde 1-2 min e teste https://inspetorbudganja.com.br" -ForegroundColor Green
