# Arranca o site em modo rapido para desenvolvimento (sem migrate/build)
# Uso:
#   .\deploy\start-dev.ps1          -> apenas local
#   .\deploy\start-dev.ps1 -Tunnel  -> local + cloudflared

param(
  [switch]$Tunnel
)

$Root = Split-Path -Parent $PSScriptRoot
Set-Location $Root

function Load-DotEnv($path) {
  if (-not (Test-Path $path)) { return }
  Get-Content $path | ForEach-Object {
    $line = $_.Trim()
    if (-not $line -or $line.StartsWith('#')) { return }
    $i = $line.IndexOf('=')
    if ($i -lt 1) { return }
    $key = $line.Substring(0, $i).Trim()
    $val = $line.Substring($i + 1).Trim()
    [Environment]::SetEnvironmentVariable($key, $val, 'Process')
  }
}

function Stop-ExistingDevProcesses([bool]$stopTunnel) {
  Get-CimInstance Win32_Process -Filter "Name = 'node.exe'" -ErrorAction SilentlyContinue |
    Where-Object { $_.CommandLine -like '*server/index.js*' -or $_.CommandLine -like '*server\\index.js*' } |
    ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }

  if ($stopTunnel) {
    Get-CimInstance Win32_Process -Filter "Name = 'cloudflared.exe'" -ErrorAction SilentlyContinue |
      Where-Object { $_.CommandLine -like '*tunnel run budganja*' } |
      ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }
  }
}

Load-DotEnv (Join-Path $Root '.env')
if (-not $env:SITE_URL) { $env:SITE_URL = 'https://inspetorbudganja.com.br' }
if (-not $env:PORT) { $env:PORT = '8080' }

Write-Host 'A parar processos antigos (se existirem)...' -ForegroundColor Gray
Stop-ExistingDevProcesses -stopTunnel $Tunnel

$nodeJob = Start-Process -FilePath 'node' -ArgumentList 'server/index.js' -WorkingDirectory $Root -WindowStyle Minimized -PassThru

Write-Host ''
Write-Host 'Site local: http://localhost:' $env:PORT -ForegroundColor Green
Write-Host 'Processo: node PID' $nodeJob.Id -ForegroundColor Green
Write-Host 'Para parar: Stop-Process -Id' $nodeJob.Id

$tunnelJob = $null
if ($Tunnel) {
  $tunnelJob = Start-Process -FilePath 'cloudflared' -ArgumentList 'tunnel','run','budganja' -WindowStyle Minimized -PassThru
  Write-Host 'Publico:    ' $env:SITE_URL -ForegroundColor Green
  Write-Host 'Processo: cloudflared PID' $tunnelJob.Id -ForegroundColor Green
  Write-Host 'Para parar: Stop-Process -Id' $nodeJob.Id ',' $tunnelJob.Id
}

try {
  $local = Invoke-WebRequest -Uri ('http://localhost:' + $env:PORT + '/') -UseBasicParsing -TimeoutSec 10
  Write-Host ('Local: HTTP ' + $local.StatusCode) -ForegroundColor Green
} catch {
  Write-Host ('Local: ERRO - ' + $_.Exception.Message) -ForegroundColor Red
}

if ($Tunnel) {
  try {
    $public = Invoke-WebRequest -Uri ($env:SITE_URL + '/') -UseBasicParsing -TimeoutSec 20
    Write-Host ('Publico: HTTP ' + $public.StatusCode) -ForegroundColor Green
  } catch {
    Write-Host ('Publico: ERRO - ' + $_.Exception.Message) -ForegroundColor Yellow
    Write-Host 'Se der 503, execute:  .\deploy\fix-dns.ps1' -ForegroundColor Yellow
  }
}
