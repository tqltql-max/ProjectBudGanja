#Requires -Version 5.1
<#
  Compila o Android App Bundle (.aab) para enviar à Google Play.
    .\deploy\android\build-twa.ps1
#>
$ErrorActionPreference = 'Stop'
$Here = Split-Path -Parent $MyInvocation.MyCommand.Path
$ProjectDir = Join-Path $Here 'bubblewrap-project'

if (-not (Test-Path $ProjectDir)) {
  throw "Projecto Android não encontrado. Execute primeiro: .\deploy\android\init-twa.ps1"
}

Write-Host '=== Build TWA (AAB) ===' -ForegroundColor Cyan
Push-Location $ProjectDir
try {
  bubblewrap build
} finally {
  Pop-Location
}

$bundle = Get-ChildItem -Path $ProjectDir -Recurse -Filter '*.aab' -ErrorAction SilentlyContinue |
  Sort-Object LastWriteTime -Descending |
  Select-Object -First 1

if ($bundle) {
  Write-Host ''
  Write-Host 'AAB gerado:' -ForegroundColor Green
  Write-Host "  $($bundle.FullName)" -ForegroundColor White
  Write-Host ''
  Write-Host 'Envie este ficheiro na Play Console → Produção → Criar nova versão.' -ForegroundColor Cyan
} else {
  Write-Host 'Build concluído. Procure o .aab em deploy\android\bubblewrap-project\app\build\outputs\' -ForegroundColor Yellow
}
