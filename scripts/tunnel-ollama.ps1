# Expose your local Ollama (the keyless brain) to the internet so the DEPLOYED
# Pinnacle site can reach it. Uses a free Cloudflare "quick tunnel" — no account,
# no card. Your PC becomes the tutor's brain while this window stays open.
#
#   powershell -ExecutionPolicy Bypass -File scripts\tunnel-ollama.ps1
#
# It prints a public https URL like https://random-words.trycloudflare.com.
# Set these in your Vercel project (Settings -> Environment Variables), then
# redeploy:
#
#   OLLAMA_BASE_URL   = https://<that-url>/v1
#   OLLAMA_MODEL      = qwen2.5:3b-instruct
#   AI_PROVIDER_ORDER = ollama,groq,gemini,cerebras,openrouter,github
#
# Now the live site's /api/chat streams from YOUR GPU. Trade-offs, be honest:
#  - The PC must stay on and this window open. Close it and the tutor falls
#    through to whatever cloud keys you set (or offline mode).
#  - A quick-tunnel URL is EPHEMERAL — it changes every run. For a stable URL,
#    set up a named Cloudflare tunnel (cloudflared tunnel create) later.

$ErrorActionPreference = "Stop"

# 1) Make sure Ollama is up and the model is warm.
Write-Host "Checking Ollama..." -ForegroundColor Cyan
try {
  $tags = Invoke-RestMethod -Uri "http://localhost:11434/api/tags" -TimeoutSec 5
  Write-Host ("Ollama is running. Models: " + (($tags.models | ForEach-Object { $_.name }) -join ", ")) -ForegroundColor Green
} catch {
  Write-Host "Ollama is not responding on :11434. Start it (run the Ollama app) or:" -ForegroundColor Yellow
  Write-Host "  powershell -ExecutionPolicy Bypass -File scripts\setup-ollama.ps1" -ForegroundColor Yellow
  exit 1
}

# 2) Find cloudflared, or tell the user how to get it (free, one command).
$cf = (Get-Command cloudflared -ErrorAction SilentlyContinue).Source
if (-not $cf) {
  $local = "$env:LOCALAPPDATA\Microsoft\WinGet\Links\cloudflared.exe"
  if (Test-Path $local) { $cf = $local }
}
if (-not $cf) {
  Write-Host "cloudflared is not installed. Install it (free, no account):" -ForegroundColor Yellow
  Write-Host "  winget install --id Cloudflare.cloudflared" -ForegroundColor White
  Write-Host "Or download from https://github.com/cloudflare/cloudflared/releases and put it on PATH." -ForegroundColor White
  exit 1
}

# 3) Remind about remote access (Ollama only needs to answer localhost here,
#    since cloudflared runs on this machine — but if you see 403s, uncomment:)
# [Environment]::SetEnvironmentVariable("OLLAMA_ORIGINS", "*", "User")
# [Environment]::SetEnvironmentVariable("OLLAMA_HOST", "0.0.0.0", "User")
# ...then restart Ollama.

Write-Host ""
Write-Host "Starting Cloudflare quick tunnel to http://localhost:11434 ..." -ForegroundColor Cyan
Write-Host "Watch for the https://<something>.trycloudflare.com line below." -ForegroundColor Cyan
Write-Host "Set OLLAMA_BASE_URL = that URL + /v1  in Vercel, then redeploy." -ForegroundColor Green
Write-Host "Press Ctrl+C to stop (the tutor will fall back to cloud/offline)." -ForegroundColor DarkGray
Write-Host ""

& $cf tunnel --url http://localhost:11434
