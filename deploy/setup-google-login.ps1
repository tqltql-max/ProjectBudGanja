# Configura login Google (/entrar.html) — execute:  .\deploy\setup-google-login.ps1
$ErrorActionPreference = 'Stop'
$Root = Split-Path -Parent $PSScriptRoot
$EnvFile = Join-Path $Root '.env'
$Example = Join-Path $PSScriptRoot 'env.production.example'

function Set-EnvKey($path, $key, $value) {
  $lines = @()
  if (Test-Path $path) {
    $lines = Get-Content $path -Encoding UTF8
  }
  $prefix = $key + '='
  $found = $false
  $out = foreach ($line in $lines) {
    if ($line -match ('^\s*' + [regex]::Escape($key) + '\s*=')) {
      $found = $true
      $prefix + $value
    } else {
      $line
    }
  }
  if (-not $found) {
    if ($out.Count -gt 0 -and $out[-1] -ne '') { $out += '' }
    $out += ($prefix + $value)
  }
  Set-Content -Path $path -Value $out -Encoding UTF8
}

Write-Host ''
Write-Host '=== Login Google — Inspetor BudGanja ===' -ForegroundColor Green
Write-Host ''

if (-not (Test-Path $EnvFile)) {
  if (Test-Path $Example) {
    Copy-Item $Example $EnvFile
    Write-Host 'Criado .env a partir de deploy\env.production.example' -ForegroundColor Yellow
  } else {
    Copy-Item (Join-Path $Root '.env.example') $EnvFile
    Write-Host 'Criado .env a partir de .env.example' -ForegroundColor Yellow
  }
}

Write-Host 'Este script NAO cria credenciais na Google por si — precisa do seu login no Google Cloud.' -ForegroundColor Gray
Write-Host ''
Write-Host 'Passos no browser (vou abrir a consola):' -ForegroundColor Cyan
Write-Host '  1. OAuth consent screen (se ainda nao tiver) — External, email de suporte'
Write-Host '  2. Credentials → Create credentials → OAuth client ID → Web application'
Write-Host '  3. Authorized JavaScript origins:'
Write-Host '       https://inspetorbudganja.com.br'
Write-Host '       http://localhost:8080'
Write-Host '  4. Copie o Client ID (....apps.googleusercontent.com)'
Write-Host ''

$open = Read-Host 'Abrir Google Cloud Console agora? [S/n]'
if ($open -ne 'n' -and $open -ne 'N') {
  Start-Process 'https://console.cloud.google.com/apis/credentials'
  Start-Sleep -Seconds 1
  Start-Process 'https://console.cloud.google.com/apis/credentials/consent'
}

Write-Host ''
$clientId = Read-Host 'Cole aqui o GOOGLE_CLIENT_ID (ou Enter para saltar)'
if ($clientId -and $clientId.Trim()) {
  $clientId = $clientId.Trim()
  if ($clientId -notmatch '\.apps\.googleusercontent\.com$') {
    Write-Host 'Aviso: o Client ID costuma terminar em .apps.googleusercontent.com' -ForegroundColor Yellow
  }
  Set-EnvKey $EnvFile 'GOOGLE_CLIENT_ID' $clientId
  Write-Host 'GOOGLE_CLIENT_ID guardado no .env' -ForegroundColor Green
} else {
  Write-Host 'GOOGLE_CLIENT_ID nao alterado.' -ForegroundColor Yellow
}

if (-not (Get-Content $EnvFile -Encoding UTF8 | Where-Object { $_ -match '^\s*SITE_URL\s*=' })) {
  Set-EnvKey $EnvFile 'SITE_URL' 'https://inspetorbudganja.com.br'
}

Write-Host ''
$restart = Read-Host 'Reiniciar site agora (start-now.ps1)? [S/n]'
if ($restart -ne 'n' -and $restart -ne 'N') {
  & (Join-Path $PSScriptRoot 'start-now.ps1')
} else {
  Write-Host 'Depois execute:  .\deploy\start-now.ps1' -ForegroundColor Cyan
  Write-Host 'Teste:           https://inspetorbudganja.com.br/entrar.html' -ForegroundColor Cyan
}
