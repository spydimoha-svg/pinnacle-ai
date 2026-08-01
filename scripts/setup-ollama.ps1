# Pinnacle AI — local offline tutor via Ollama (Windows).
# Runs the chatbot 100% on this laptop: free, private, no internet, no key.
#
# This PC: Intel Core Ultra 7 165H, 16 GB RAM, NVIDIA RTX 500 (4 GB VRAM).
# 4 GB VRAM is the limiter, so we default to a fast 3B model that fits fully on
# the GPU, and offer a smarter 7B (partial CPU offload, slower but sharper).
#
# Usage:   powershell -ExecutionPolicy Bypass -File scripts\setup-ollama.ps1
#          powershell -ExecutionPolicy Bypass -File scripts\setup-ollama.ps1 -Model qwen2.5:7b-instruct

param(
  [string]$Model = "qwen2.5:3b-instruct"
)

Write-Host "== Pinnacle AI local tutor setup ==" -ForegroundColor Cyan

# 1) Install Ollama if missing (via winget).
if (-not (Get-Command ollama -ErrorAction SilentlyContinue)) {
  Write-Host "Ollama not found. Installing via winget..." -ForegroundColor Yellow
  winget install --id Ollama.Ollama -e --accept-source-agreements --accept-package-agreements
  Write-Host "If 'ollama' still isn't found, close and reopen this terminal, then re-run." -ForegroundColor Yellow
} else {
  Write-Host "Ollama already installed: $((Get-Command ollama).Source)" -ForegroundColor Green
}

# 2) Pull the model (downloads once, ~2 GB for the 3B, ~4.7 GB for the 7B).
Write-Host "Pulling model: $Model ..." -ForegroundColor Cyan
ollama pull $Model

# 3) Quick smoke test.
Write-Host "Testing the model..." -ForegroundColor Cyan
ollama run $Model "In one sentence, what is Newton's second law?"

Write-Host ""
Write-Host "Done. To point Pinnacle at this local model, add to your .env:" -ForegroundColor Green
Write-Host "  OLLAMA_BASE_URL=http://localhost:11434/v1" -ForegroundColor Green
Write-Host "  OLLAMA_MODEL=$Model" -ForegroundColor Green
Write-Host ""
Write-Host "Ollama serves the OpenAI-compatible API at http://localhost:11434 whenever it's running." -ForegroundColor Gray
Write-Host "Tip: put ollama last in AI_PROVIDER_ORDER so free cloud handles heavy jobs and Ollama is your offline fallback." -ForegroundColor Gray
