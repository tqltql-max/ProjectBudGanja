#Requires -Version 5.1
<#
  Prepara o projecto Android (TWA) com Bubblewrap.
  Execute na raiz do repo ou a partir de deploy/android:
    .\deploy\android\init-twa.ps1

  Pré-requisitos (instale antes):
    - Node.js 18+
    - JDK 17 (https://adoptium.net/)
    - Android Studio + Android SDK (API 34+)
    - Variável ANDROID_HOME ou ANDROID_SDK_ROOT apontando para o SDK
#>
$ErrorActionPreference = 'Stop'
$Here = Split-Path -Parent $MyInvocation.MyCommand.Path
$Root = Resolve-Path (Join-Path $Here '..\..')
$AndroidDir = $Here
$ProjectDir = Join-Path $AndroidDir 'bubblewrap-project'
$Manifest = Join-Path $AndroidDir 'twa-manifest.json'

Write-Host '=== Inspetor BudGanja — init TWA (Bubblewrap) ===' -ForegroundColor Cyan

function Test-Command($name) {
  return [bool](Get-Command $name -ErrorAction SilentlyContinue)
}

if (-not (Test-Command node)) { throw 'Node.js não encontrado. Instale em https://nodejs.org/' }
if (-not (Test-Command java)) { throw 'Java (JDK 17) não encontrado. Instale Temurin 17: https://adoptium.net/' }

$sdk = $env:ANDROID_HOME
if (-not $sdk) { $sdk = $env:ANDROID_SDK_ROOT }
if (-not $sdk -or -not (Test-Path $sdk)) {
  Write-Host ''
  Write-Host 'ANDROID_HOME / ANDROID_SDK_ROOT não definido.' -ForegroundColor Yellow
  Write-Host 'Instale Android Studio e defina, por exemplo:' -ForegroundColor Yellow
  Write-Host '  $env:ANDROID_HOME = "$env:LOCALAPPDATA\Android\Sdk"' -ForegroundColor Gray
  Write-Host '  [Environment]::SetEnvironmentVariable("ANDROID_HOME", $env:ANDROID_HOME, "User")' -ForegroundColor Gray
  throw 'Android SDK em falta.'
}

Write-Host 'A instalar @bubblewrap/cli globalmente (se necessário)...' -ForegroundColor DarkGray
npm install -g @bubblewrap/cli 2>$null | Out-Null

if (-not (Test-Path $Manifest)) { throw "Manifesto TWA não encontrado: $Manifest" }

if (Test-Path $ProjectDir) {
  Write-Host "Pasta já existe: $ProjectDir" -ForegroundColor Yellow
  $ans = Read-Host 'Recriar projecto Android? (s/N)'
  if ($ans -notmatch '^[sS]') {
    Write-Host 'Mantido. Para compilar: .\deploy\android\build-twa.ps1' -ForegroundColor Green
    exit 0
  }
  Remove-Item -Recurse -Force $ProjectDir
}

Write-Host 'A inicializar Bubblewrap...' -ForegroundColor Cyan
Push-Location $AndroidDir
try {
  bubblewrap init --manifest $Manifest --directory bubblewrap-project
} finally {
  Pop-Location
}

Write-Host ''
Write-Host 'Próximos passos:' -ForegroundColor Green
Write-Host '  1. .\deploy\android\get-signing-fingerprint.ps1  (copiar SHA-256)'
Write-Host '  2. Colar em deploy\android\assetlinks.config.json'
Write-Host '  3. npm run build  (publica .well-known/assetlinks.json)'
Write-Host '  4. .\deploy\android\build-twa.ps1  (gerar AAB para Play Store)'
Write-Host '  5. Guia completo: deploy\android\PLAY-STORE.md'
