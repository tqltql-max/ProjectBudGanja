# Corrige DNS na Cloudflare (aponta dominios para o tunel)
# Execute:
#   cd deploy
#   .\fix-dns.ps1
#
# NOTA: para os aliases .com, o cloudflared por vezes cria CNAME na zona .com.br
# (incorrecto). Se isso acontecer, segue deploy\add-alias-domains.md (DNS manual).

$env:Path = [System.Environment]::GetEnvironmentVariable('Path','Machine') + ';' + [System.Environment]::GetEnvironmentVariable('Path','User')

$canonical = @(
  'inspetorbudganja.com.br',
  'www.inspetorbudganja.com.br'
)

$aliases = @(
  'inspetorbudganja.com',
  'www.inspetorbudganja.com',
  'inspectorbudganja.com',
  'www.inspectorbudganja.com'
)

$tunnelTarget = 'deccb19c-bdf3-477d-a251-279dc4b5b584.cfargotunnel.com'

Write-Host "A actualizar DNS para o tunel budganja..." -ForegroundColor Cyan
Write-Host ""

foreach ($h in $canonical) {
  Write-Host "  → $h" -ForegroundColor Gray
  cloudflared tunnel route dns --overwrite-dns budganja $h 2>&1 | ForEach-Object { Write-Host "    $_" }
}

Write-Host ""
Write-Host "Aliases .com (verificar se o CNAME fica na zona certa)..." -ForegroundColor Cyan
$aliasOk = $true
foreach ($h in $aliases) {
  Write-Host "  → $h" -ForegroundColor Gray
  $out = cloudflared tunnel route dns --overwrite-dns budganja $h 2>&1 | Out-String
  Write-Host $out
  if ($out -match '\.inspetorbudganja\.com\.br') {
    $aliasOk = $false
    Write-Host "    FALHOU: CNAME foi criado sob .com.br (errado)." -ForegroundColor Red
  }
}

Write-Host ""
if (-not $aliasOk) {
  Write-Host "Os aliases .com NAO ficaram correctos via cloudflared." -ForegroundColor Yellow
  Write-Host "Faz DNS MANUAL em cada zona .com (ver add-alias-domains.md):" -ForegroundColor Yellow
  Write-Host ""
  Write-Host "  Type: CNAME | Name: @   | Target: $tunnelTarget | Proxied" -ForegroundColor White
  Write-Host "  Type: CNAME | Name: www | Target: $tunnelTarget | Proxied" -ForegroundColor White
  Write-Host ""
  Write-Host "Repete em inspetorbudganja.com e inspectorbudganja.com." -ForegroundColor Yellow
  Write-Host "Apaga no .com.br os registos errados com esses nomes." -ForegroundColor Yellow
} else {
  Write-Host "DNS OK. Aguarde 1-2 min e teste:" -ForegroundColor Green
  Write-Host "  https://inspetorbudganja.com.br" -ForegroundColor Green
  Write-Host "  https://inspetorbudganja.com" -ForegroundColor Green
  Write-Host "  https://inspectorbudganja.com" -ForegroundColor Green
}
