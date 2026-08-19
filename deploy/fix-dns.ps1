# Corrige DNS na Cloudflare (aponta o canónico para o túnel).
# Execute:
#   cd deploy
#   .\fix-dns.ps1
#
# O cert.pem do cloudflared está limitado à zona inspetorbudganja.com.br.
# NÃO uses `tunnel route dns` nos aliases .com — o CLI cria
#   www.inspetorbudganja.com.inspetorbudganja.com.br
# em vez da zona .com. Esses aliases vão no painel (add-alias-domains.md).

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

Write-Host "A actualizar DNS do canónico (.com.br) para o tunel budganja..." -ForegroundColor Cyan
Write-Host ""

foreach ($h in $canonical) {
  Write-Host "  → $h" -ForegroundColor Gray
  cloudflared tunnel route dns --overwrite-dns budganja $h 2>&1 | ForEach-Object { Write-Host "    $_" }
}

Write-Host ""
Write-Host "A testar hostnames (sem criar CNAME .com via cloudflared)..." -ForegroundColor Cyan
$aliasFail = @()
foreach ($h in ($canonical + $aliases)) {
  $url = "https://$h/"
  try {
    $resp = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 20 -MaximumRedirection 0 -ErrorAction Stop
    Write-Host ("  OK  {0}  HTTP {1}" -f $h, [int]$resp.StatusCode) -ForegroundColor Green
  } catch {
    $status = $null
    $location = $null
    $resp = $_.Exception.Response
    if ($resp) {
      $status = [int]$resp.StatusCode
      $location = $resp.Headers['Location']
    }
    if ($status -ge 300 -and $status -lt 400) {
      Write-Host ("  OK  {0}  HTTP {1} → {2}" -f $h, $status, $location) -ForegroundColor Green
    } else {
      $aliasFail += $h
      $detail = if ($status) { "HTTP $status" } else { $_.Exception.Message }
      Write-Host ("  FALTA {0}  {1}" -f $h, $detail) -ForegroundColor Red
    }
  }
}

Write-Host ""
if ($aliasFail.Count -gt 0) {
  Write-Host "Aliases a corrigir no painel Cloudflare (zona .com, NAO .com.br):" -ForegroundColor Yellow
  Write-Host "  Ver: deploy\add-alias-domains.md" -ForegroundColor Yellow
  Write-Host ""
  foreach ($h in $aliasFail) {
    Write-Host ("  {0}" -f $h) -ForegroundColor White
  }
  Write-Host ""
  Write-Host "Em cada zona .com → DNS → Records:" -ForegroundColor Yellow
  Write-Host "  Type: CNAME | Name: @   | Target: $tunnelTarget | Proxied" -ForegroundColor White
  Write-Host "  Type: CNAME | Name: www | Target: $tunnelTarget | Proxied" -ForegroundColor White
  Write-Host ""
  Write-Host "Se www.inspetorbudganja.com ainda apontar para a Netlify, apaga esse CNAME/A" -ForegroundColor Yellow
  Write-Host "e cria o CNAME www → $tunnelTarget." -ForegroundColor Yellow
} else {
  Write-Host "DNS dos hostnames principais responde. Teste:" -ForegroundColor Green
  Write-Host "  https://inspetorbudganja.com.br" -ForegroundColor Green
}

Write-Host ""
Write-Host "Limpeza opcional na zona .com.br → DNS: apaga subdominios lixo do tipo" -ForegroundColor DarkGray
Write-Host "  inspetorbudganja.com / www.inspetorbudganja.com / inspectorbudganja.com" -ForegroundColor DarkGray
Write-Host "  (FQDN: *.inspetorbudganja.com.inspetorbudganja.com.br)" -ForegroundColor DarkGray
