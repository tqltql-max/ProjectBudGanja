# Publica o site na Cloudflare Pages (sempre ligado, sem o PC).
# Primeira vez: npx wrangler login
#
# Execute:  .\deploy\cloudflare-pages.ps1

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

Write-Host "Build..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host "`nDeploy Cloudflare Pages..." -ForegroundColor Cyan
$dist = Join-Path $Root '_pages-dist'
Write-Host "A copiar ficheiros publicaveis (sem JDK local)..." -ForegroundColor Gray
New-Item -ItemType Directory -Path $dist -Force | Out-Null
$robocopyArgs = @(
  $Root, $dist, '/MIR', '/NFL', '/NDL', '/NJH', '/NJS', '/nc', '/ns', '/np',
  '/XD', 'tools', 'node_modules', '.git', '.wrangler', '.cursor', 'data', 'uploads',
  '.netlify', '_pages-dist', 'deploy', 'netlify', 'docs', 'scripts', 'lib', 'server',
  'functions', 'peraguacu',
  '/XF', '*.mp3', '*.m4a', '*.wip-bak'
)
& robocopy @robocopyArgs | Out-Null
if ($LASTEXITCODE -ge 8) {
  Write-Host "Falha ao preparar pasta de envio (robocopy $LASTEXITCODE)." -ForegroundColor Red
  exit $LASTEXITCODE
}

npx wrangler pages deploy $dist --commit-dirty=true --project-name inspetor-budganja --branch main
if ($LASTEXITCODE -ne 0) {
  Write-Host "`nSe pediu login:  npx wrangler login" -ForegroundColor Yellow
  Write-Host "Depois volte a correr este script." -ForegroundColor Yellow
  exit $LASTEXITCODE
}

Write-Host "`nPronto. Defina os segredos no dashboard (Pages → Settings → Variables):" -ForegroundColor Green
Write-Host "  TURSO_DATABASE_URL  TURSO_AUTH_TOKEN  RESEARCH_PASS"
Write-Host "  GOOGLE_CLIENT_ID    GOOGLE_CLIENT_SECRET  ADMIN_EMAILS  GEMINI_API_KEY"
Write-Host "`nDominio: Cloudflare Pages → Custom domains → inspetorbudganja.com.br"
Write-Host "Ou: npx wrangler pages secret put NOME --project-name inspetor-budganja`n"
