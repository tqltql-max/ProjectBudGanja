# Verifica se site local, tunel e DNS estao OK
$Root = Split-Path -Parent $PSScriptRoot
$SiteUrl = 'https://inspetorbudganja.com.br'
$Port = 8080

Write-Host "`n=== Verificacao Inspetor BudGanja ===`n" -ForegroundColor Cyan

$node = Get-CimInstance Win32_Process -Filter "Name = 'node.exe'" -ErrorAction SilentlyContinue |
  Where-Object { $_.CommandLine -like '*server/index.js*' -or $_.CommandLine -like '*server\\index.js*' } | Select-Object -First 1
$tunnel = Get-CimInstance Win32_Process -Filter "Name = 'cloudflared.exe'" -ErrorAction SilentlyContinue |
  Where-Object { $_.CommandLine -like '*tunnel run budganja*' }

if ($node) { Write-Host 'OK  node server/index.js (PID' $node.ProcessId ')' -ForegroundColor Green }
else { Write-Host 'FALTA node server/index.js' -ForegroundColor Red }

$tunnelCount = @($tunnel).Count
if ($tunnelCount -eq 1) { Write-Host 'OK  cloudflared tunel budganja (PID' $tunnel.ProcessId ')' -ForegroundColor Green }
elseif ($tunnelCount -gt 1) { Write-Host "AVISO  $tunnelCount instancias cloudflared - execute start-now.ps1" -ForegroundColor Yellow }
else { Write-Host 'FALTA cloudflared' -ForegroundColor Red }

try {
  $local = Invoke-WebRequest -Uri "http://localhost:$Port/" -UseBasicParsing -TimeoutSec 8
  Write-Host 'OK  Local HTTP' $local.StatusCode -ForegroundColor Green
} catch {
  Write-Host 'FALTA Local:' $_.Exception.Message -ForegroundColor Red
}

try {
  $pub = Invoke-WebRequest -Uri "$SiteUrl/" -UseBasicParsing -TimeoutSec 20
  Write-Host 'OK  Publico HTTP' $pub.StatusCode -ForegroundColor Green
} catch {
  Write-Host 'FALTA Publico:' $_.Exception.Message -ForegroundColor Red
  Write-Host '  Corrija DNS: .\fix-dns.ps1' -ForegroundColor Yellow
  Write-Host '  Reinicie:    .\start-now.ps1' -ForegroundColor Yellow
}

Write-Host ""
