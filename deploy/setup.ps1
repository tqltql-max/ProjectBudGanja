# Setup inicial — Inspetor BudGanja + inspetorbudganja.com.br
# Execute no PowerShell:  cd deploy; .\setup.ps1

$ErrorActionPreference = "Stop"
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
  npm install
}

$envFile = Join-Path $Root ".env"
if (-not (Test-Path $envFile)) {
  Copy-Item (Join-Path $PSScriptRoot "env.production.example") $envFile
  Write-Host "Criado .env — edite ADMIN_USER e RESEARCH_PASS antes de publicar." -ForegroundColor Yellow
} else {
  Write-Host ".env ja existe — mantido." -ForegroundColor Gray
}

Write-Host "`n--- Registro.br ---" -ForegroundColor Cyan
Write-Host "1. cloudflare.com → Add site → $Domain"
Write-Host "2. registro.br → Alterar servidores DNS → use os 2 NS da Cloudflare"
Write-Host "   (aguarde propagacao, 15 min a algumas horas)`n"

Write-Host "--- Túnel Cloudflare (uma vez) ---" -ForegroundColor Cyan
Write-Host "cloudflared tunnel login"
Write-Host "cloudflared tunnel create budganja"
Write-Host "# Copie deploy\cloudflared.config.example.yml para %USERPROFILE%\.cloudflared\config.yml"
Write-Host "# Troque SEU-TUNNEL-ID e SEU_USUARIO"
Write-Host "cloudflared tunnel route dns budganja $Domain"
Write-Host "cloudflared tunnel route dns budganja www.$Domain`n"

Write-Host "Depois execute:  .\deploy\start-site.ps1`n" -ForegroundColor Green
