# Probe HTTPS sem HEAD e sem UA de curl -- o Bot Fight da zona .com.br
# devolve 403 a `curl -sI` mesmo com o tunel e o DNS correctos.
# Guardar em ASCII: o Windows PowerShell 5.1 nao le UTF-8 sem BOM.

function Get-PublicHttpProbe([string]$Url) {
  $ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
  $id = [guid]::NewGuid().ToString('n')
  $hdrFile = Join-Path $env:TEMP ('bg-probe-' + $id + '.hdr')
  $bodyFile = Join-Path $env:TEMP ('bg-probe-' + $id + '.body')
  try {
    $code = & curl.exe -sS -o $bodyFile -D $hdrFile -A $ua --max-time 20 $Url -w '%{http_code}' 2>$null
    $hdr = ''
    if (Test-Path $hdrFile) {
      $hdr = Get-Content $hdrFile -Raw -ErrorAction SilentlyContinue
    }
    $status = 0
    if ("$code" -match '^\d+$') { $status = [int]$code }
    elseif ($hdr -match 'HTTP/\S+\s+(\d+)') { $status = [int]$Matches[1] }
    $location = $null
    if ($hdr -match '(?im)^Location:\s*(\S+)') { $location = $Matches[1].Trim() }
    $cloudflare = [bool]($hdr -match '(?im)^(?:cf-ray:|cf-mitigated:|server:\s*cloudflare)')
    return [pscustomobject]@{
      Status     = $status
      Location   = $location
      Cloudflare = $cloudflare
    }
  } finally {
    Remove-Item $hdrFile, $bodyFile -Force -ErrorAction SilentlyContinue
  }
}

function Write-PublicHostResult([string]$Hostname, $probe) {
  $status = [int]$probe.Status
  if ($status -ge 200 -and $status -lt 400) {
    if ($probe.Location) {
      Write-Host ("  OK  {0}  HTTP {1} -> {2}" -f $Hostname, $status, $probe.Location) -ForegroundColor Green
    } else {
      Write-Host ("  OK  {0}  HTTP {1}" -f $Hostname, $status) -ForegroundColor Green
    }
    return 'ok'
  }
  if ($status -eq 403 -and $probe.Cloudflare) {
    Write-Host ("  AVISO {0}  HTTP 403 (Cloudflare Bot Fight bloqueou o probe; DNS/tunel provavelmente OK - abre no browser)" -f $Hostname) -ForegroundColor Yellow
    return 'botfight'
  }
  if ($status -eq 530) {
    Write-Host ("  FALTA {0}  HTTP 530 (tunel desligado)" -f $Hostname) -ForegroundColor Red
    return 'fail'
  }
  $detail = if ($status) { "HTTP $status" } else { 'sem resposta' }
  Write-Host ("  FALTA {0}  {1}" -f $Hostname, $detail) -ForegroundColor Red
  return 'fail'
}
