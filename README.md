# Pinnacle AI

**Your CBSE board buddy — a 24/7 AI teacher for classes 9–12.**

**Live: https://pinnacle-ai-two.vercel.app** — see [LAUNCH.md](LAUNCH.md) for
deploy notes, known gaps, and the open-endpoint warning to read before sharing
the link widely.

Pinnacle teaches the way boards mark: NCERT-rooted explanations, marking-scheme
answers with examiner keywords, PYQ practice, generated worksheets, curated
videos, an entrance-exam "Learn Better" mode (JEE / NEET / CUET / SAT), and a
daily journal ("the Blob") that feeds the tutor's memory of each student.

## Stack

- React 19 + TypeScript + Vite, Tailwind CSS v4
- zustand (persisted to localStorage) for instant local state
- **Free LLM providers** power the tutor via a serverless function — Groq,
  Google Gemini, Cerebras, OpenRouter, or a local Ollama. No Anthropic, no paid
  key. Whichever free keys you set are tried in order with automatic fallback.
- **Supabase (Postgres, free tier)** — optional cloud database so student
  progress, chats and journals survive a cache clear and follow them across
  devices. Falls back to localStorage when not configured.
- Deployable to **Vercel** (`api/chat.ts`) or **Netlify** (`netlify/functions/chat.mts`) — same `/api/chat` contract

## The tutor brain (free, no Anthropic)

All providers below have a no-credit-card free tier and speak the same
OpenAI-compatible protocol, so one function ([api/_llm.ts](api/_llm.ts)) drives
all of them. Set **any one** to go live; set several for automatic failover.

| Provider | Get a free key | Default model | Notes |
| --- | --- | --- | --- |
| **Groq** | https://console.groq.com/keys | `llama-3.3-70b-versatile` | Fastest, best free quality. Recommended primary. |
| **Google Gemini** | https://aistudio.google.com/app/apikey | `gemini-2.0-flash` | Strong at math. Great fallback. |
| **Cerebras** | https://cloud.cerebras.ai | `llama-3.3-70b` | Very fast. |
| **OpenRouter** | https://openrouter.ai/keys | `meta-llama/llama-3.3-70b-instruct:free` | One key, many free models. |
| **Ollama (local)** | `scripts/setup-ollama.ps1` | `qwen2.5:3b-instruct` | 100% offline, no key, runs on your PC. |

Order and models are configurable — see [.env.example](.env.example)
(`AI_PROVIDER_ORDER`, `GROQ_MODEL`, etc.). If no provider is set, the tutor
drops to the built-in offline mode.

### Run a fully-local tutor (offline, free)

```powershell
powershell -ExecutionPolicy Bypass -File scripts\setup-ollama.ps1
```

Installs Ollama, pulls a model sized for this laptop (4 GB VRAM), then tells you
the two `.env` lines to add. Put `ollama` last in `AI_PROVIDER_ORDER` so free
cloud handles heavy teaching and Ollama is your offline safety net.

## Run locally

```sh
npm install
cp .env.example .env    # then paste at least one free LLM key
npm run dev
```

The tutor needs the serverless function, which doesn't run under plain
`vite dev`. Use `npx vercel dev` (or `npx netlify dev`) with a key set to get the
full tutor locally; without it the app still works and the tutor falls back to
offline mode.

## The database (optional, free)

Without Supabase, everything lives in `localStorage` (per browser). To make
student data durable and cross-device:

1. Create a free project at https://supabase.com.
2. Open **SQL Editor**, paste [supabase/schema.sql](supabase/schema.sql), Run.
3. Copy **Project Settings → API**: the URL and the `anon`/public key into
   `.env` as `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (and into your
   host's env vars).

That's it — student memory, chats, journal and worksheets now sync to Postgres,
with localStorage still the instant-load cache. See
[LAUNCH.md](LAUNCH.md#locking-down-the-database) before real launch.

## Deploy

**Vercel:** `npx vercel --prod`, then set env vars in the project:
at least one LLM key (e.g. `GROQ_API_KEY`) and, optionally, `VITE_SUPABASE_URL`
+ `VITE_SUPABASE_ANON_KEY`.

**Netlify:** connect the repo or `npx netlify deploy --prod`. `netlify.toml` is
already configured (build → `dist`, functions → `netlify/functions`, `/api/chat`
redirect). Set the same env vars in Site settings → Environment variables.

## Logins

| Who | Where | Credentials |
| --- | --- | --- |
| Student (Class 10) | `/login` | `aarav@student.demo` / `demo` |
| Student (Class 12) | `/login` | `diya@student.demo` / `demo` |
| School admin | `/login` | `admin@school.demo` / `admin` |
| **Pinnacle Master** (hidden) | `/summit` | passcode `PEAK-2026` |

The Master console (schools, pricing control, CBSE watch) is deliberately
unlinked from all navigation — only the team knows `/summit`.
Change the passcode in `src/data/schools.ts` before going live.

## Structure

```
api/_llm.ts               Free multi-provider LLM layer (Groq/Gemini/Cerebras/OpenRouter/Ollama)
api/chat.ts               Vercel function — streams tutor replies via api/_llm.ts
netlify/functions/chat.mts Netlify twin of the same function
supabase/schema.sql       Postgres schema for the optional cloud database
src/lib/supabase.ts       Supabase client (guarded; null when not configured)
src/lib/cloud.ts          Cloud read/write helpers (no-ops when Supabase is off)
src/components/CloudSync.tsx  Syncs the signed-in student's state to the cloud
src/lib/types.ts          All domain types
src/lib/store.ts          zustand store (auth, memory, blobs, worksheets, schools)
src/lib/persona.ts        The tutor's system prompt (teacher persona + student memory)
src/lib/ai.ts             Streaming client + offline fallback
src/data/                 Curriculum, question bank, resources, videos, entrance tracks
src/pages/                Landing, login, student app, admin console, master console
```

## Multi-tenancy

Students see the preset Pinnacle library **plus** only their own school's
materials (uploaded by their school admin). Cross-school access is a planned
paid add-on. Pricing per school is set from the Master console.
