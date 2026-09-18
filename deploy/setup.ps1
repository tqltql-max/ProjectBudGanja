# Setup inicial — Inspetor BudGanja + inspetorbudganja.com.br
# Execute na raiz:  powershell -NoProfile -ExecutionPolicy Bypass -File .\deploy\setup.ps1

$ErrorActionPreference = "Stop"
if (Get-Variable -Name PSNativeCommandUseErrorActionPreference -ErrorAction SilentlyContinue) {
  $PSNativeCommandUseErrorActionPreference = $false
}
$Root = Split-Path -Parent $PSScriptRoot
$Domain = "inspetorbudganja.com.br"

Write-Host "`n=== Setup Inspetor BudGanja ($Domain) ===`n" -ForegroundColor Green

function Test-Cmd($name) {
  if (-not (Get-Command $name -ErrorAction SilentlyContinue)) {
    Write-Host "Falta: $name" -ForegroundColor Red
    Write-Host "  winget install OpenJS.NodeJS.LTS"
    Write-Host "  winget install Cloudflare.cloudflared"
    Write-Host "  npm install -g pm2"
    exit 1
  }
}

Test-Cmd node
Test-Cmd npm
Test-Cmd cloudflared

Set-Location $Root
if (-not (Test-Path "node_modules")) {
  Write-Host "Instalando dependencias..." -ForegroundColor Cyan
  $ErrorActionPreference = "Continue"
  npm install
  $ErrorActionPreference = "Stop"
  if ($LASTEXITCODE -ne 0) {
    Write-Host "npm install falhou (codigo $LASTEXITCODE)." -ForegroundColor Red
    exit 1
  }
}

$envFile = Join-Path $Root ".env"
if (-not (Test-Path $envFile)) {
  Copy-Item (Join-Path $PSScriptRoot "env.production.example") $envFile
  Write-Host "Criado .env — edite ADMIN_USER e RESEARCH_PASS antes de publicar." -ForegroundColor Yellow
} else {
  Write-Host ".env ja existe — mantido." -ForegroundColor Gray
}

$cfConfig = Join-Path $env:USERPROFILE ".cloudflared\config.yml"
if (-not (Test-Path $cfConfig)) {
  Write-Host "`nTunel Cloudflare ainda nao configurado." -ForegroundColor Yellow
  Write-Host "1. cloudflared tunnel login"
  Write-Host "2. cloudflared tunnel create budganja"
  Write-Host "3. Copie deploy\cloudflared.config.example.yml para $cfConfig"
  Write-Host "4. Ajuste o Tunnel ID e o caminho das credenciais"
  Write-Host "5. cloudflared tunnel route dns budganja $Domain"
  Write-Host "   cloudflared tunnel route dns budganja www.$Domain"
  Write-Host "`nO site local sobe na mesma. O dominio publico so funciona apos o tunel.`n"
}

Write-Host "A subir o site (servidor local + tunel)..." -ForegroundColor Cyan
& (Join-Path $PSScriptRoot "start-now.ps1")
