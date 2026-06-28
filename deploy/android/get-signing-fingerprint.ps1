#Requires -Version 5.1
<#
  Mostra o SHA-256 do certificado para assetlinks.json (Digital Asset Links).
    .\deploy\android\get-signing-fingerprint.ps1

  Usa o keystore em deploy/android/android.keystore (criado pelo Bubblewrap init/build).
#>
$ErrorActionPreference = 'Stop'
$Here = Split-Path -Parent $MyInvocation.MyCommand.Path
$Keystore = Join-Path $Here 'android.keystore'
$Alias = 'budganja'

if (-not (Get-Command keytool -ErrorAction SilentlyContinue)) {
  throw 'keytool não encontrado. Instale JDK 17 e adicione ao PATH.'
}

if (-not (Test-Path $Keystore)) {
  Write-Host 'Keystore ainda não existe.' -ForegroundColor Yellow
  Write-Host 'Execute primeiro: .\deploy\android\init-twa.ps1' -ForegroundColor Yellow
  Write-Host 'O Bubblewrap pede para criar android.keystore durante o init ou build.' -ForegroundColor Gray
  exit 1
}

Write-Host '=== SHA-256 do certificado de assinatura ===' -ForegroundColor Cyan
Write-Host "Keystore: $Keystore" -ForegroundColor DarkGray
Write-Host ''
Write-Host 'Introduza a password do keystore quando pedido.' -ForegroundColor Gray
Write-Host ''

$out = & keytool -list -v -keystore $Keystore -alias $Alias 2>&1 | Out-String

if ($LASTEXITCODE -ne 0) {
  Write-Host $out
  throw 'keytool falhou. Verifique alias (budganja) e password.'
}

$match = [regex]::Match($out, 'SHA256:\s*([0-9A-F:]+)', 'IgnoreCase')
if (-not $match.Success) {
  Write-Host $out
  throw 'SHA256 não encontrado na saída do keytool.'
}

$sha = $match.Groups[1].Value.ToUpper()
Write-Host 'Copie este valor para deploy\android\assetlinks.config.json:' -ForegroundColor Green
Write-Host ''
Write-Host "  `"sha256CertFingerprints`": [" -ForegroundColor White
Write-Host "    `"$sha`"" -ForegroundColor Yellow
Write-Host '  ]' -ForegroundColor White
Write-Host ''
Write-Host 'Depois: npm run build  e reinicie o site (deploy\start-now.ps1)' -ForegroundColor Cyan
Write-Host 'Verifique: https://inspetorbudganja.com.br/.well-known/assetlinks.json' -ForegroundColor Cyan
