# Sobe o site + túnel (PM2). Execute:  .\deploy\start-site.ps1

$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $PSScriptRoot
Set-Location $Root

function Load-DotEnv($path) {
  if (-not (Test-Path $path)) { return }
  Get-Content $path | ForEach-Object {
    $line = $_.Trim()
    if (-not $line -or $line.StartsWith("#")) { return }
    $i = $line.IndexOf("=")
    if ($i -lt 1) { return }
    $key = $line.Substring(0, $i).Trim()
    $val = $line.Substring($i + 1).Trim()
    [Environment]::SetEnvironmentVariable($key, $val, "Process")
  }
}

Load-DotEnv (Join-Path $Root ".env")

if (-not $env:SITE_URL) {
  $env:SITE_URL = "https://inspetorbudganja.com.br"
}

Write-Host "Build..." -ForegroundColor Cyan
npm run build

if (-not (Get-Command pm2 -ErrorAction SilentlyContinue)) {
  Write-Host "PM2 nao encontrado. A usar modo sem PM2 (server + tunnel em background)." -ForegroundColor Yellow
  & (Join-Path $PSScriptRoot "start-now.ps1")
  exit
}

$existing = pm2 jlist 2>$null | ConvertFrom-Json
$names = @($existing | ForEach-Object { $_.name })

if ($names -contains "budganja") {
  pm2 restart budganja
} else {
  pm2 start server/index.js --name budganja
}

if ($names -contains "tunnel") {
  pm2 restart tunnel
} else {
  pm2 start cloudflared --name tunnel -- tunnel run budganja
}

pm2 save
Write-Host "`nSite: $($env:SITE_URL)" -ForegroundColor Green
Write-Host "Admin: $($env:SITE_URL)/login.html"
Write-Host "PM2: pm2 status | pm2 logs budganja`n"
