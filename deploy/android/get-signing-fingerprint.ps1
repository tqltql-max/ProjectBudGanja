#Requires -Version 5.1
<#
  Mostra o SHA-256 do certificado para assetlinks.json (Digital Asset Links).
    .\deploy\android\get-signing-fingerprint.ps1

  Usa o keystore em deploy/android/android.keystore (alias budganja).
  Se existir deploy/android/.keystore-password, usa-o sem prompt.
#>
$ErrorActionPreference = 'Stop'
$Here = Split-Path -Parent $MyInvocation.MyCommand.Path
$Root = Resolve-Path (Join-Path $Here '..\..')
$Keystore = Join-Path $Here 'android.keystore'
$Alias = 'budganja'
$PassFile = Join-Path $Here '.keystore-password'

function Find-Keytool {
  $portable = Join-Path $Root 'tools\jdk-17\bin\keytool.exe'
  if (Test-Path $portable) { return $portable }
  $cmd = Get-Command keytool -ErrorAction SilentlyContinue
  if ($cmd) { return $cmd.Source }
  return $null
}

$Keytool = Find-Keytool
if (-not $Keytool) {
  throw 'keytool não encontrado. Instale JDK 17 ou use o JDK portátil em tools/jdk-17 (ver README).'
}

if (-not (Test-Path $Keystore)) {
  Write-Host 'Keystore ainda não existe.' -ForegroundColor Yellow
  Write-Host 'Gere com o JDK (exemplo):' -ForegroundColor Yellow
  Write-Host '  keytool -genkeypair -v -keystore deploy\android\android.keystore -alias budganja -keyalg RSA -keysize 2048 -validity 10000' -ForegroundColor Gray
  Write-Host 'Ou execute: .\deploy\android\init-twa.ps1 (Bubblewrap cria o keystore).' -ForegroundColor Gray
  exit 1
}

$argsList = @('-list', '-v', '-keystore', $Keystore, '-alias', $Alias)
if (Test-Path $PassFile) {
  $pass = (Get-Content $PassFile -Raw).Trim()
  $argsList += @('-storepass', $pass)
} else {
  Write-Host 'Introduza a password do keystore quando pedido.' -ForegroundColor Gray
}

Write-Host '=== SHA-256 do certificado de assinatura ===' -ForegroundColor Cyan
Write-Host "Keystore: $Keystore" -ForegroundColor DarkGray
Write-Host ''

$out = & $Keytool @argsList 2>&1 | Out-String

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
