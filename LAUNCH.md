# Pinnacle AI — launch notes

**Live:** https://pinnacle-ai-two.vercel.app
**Master console:** https://pinnacle-ai-two.vercel.app/summit — passcode `PEAK-2026`

---

## Read this first: the open tutor endpoint

`/api/chat` is **public and unauthenticated**. The login page is a client-side
gate only — it does not protect the API. Anyone who has the URL can POST to
`/api/chat`.

The good news: the tutor now runs on **free** LLM providers (Groq, Gemini,
Cerebras, OpenRouter, or local Ollama), so there is **no Anthropic bill to burn**
anymore. The remaining risk is abuse of your free-tier rate limits — a flood of
requests could exhaust your daily free quota and make the tutor temporarily
unavailable for real students.

**Before you share the link widely (a class group, social media, a school
WhatsApp), do one of these:**

1. **Set several free keys** (Groq + Gemini + Cerebras). If one hits its daily
   limit, the function automatically falls through to the next.
2. **Better:** put a real auth check in `api/chat.ts` — verify a signed session
   cookie or a shared secret issued at login, and reject anything else.
3. **Also worth it:** add rate limiting per IP/user, and turn on Vercel Firewall
   / BotID in the project settings.

Also: `MASTER_PASSCODE` lives in `src/data/schools.ts`, which ships to the
**browser bundle**. It hides `/summit` from casual discovery; it does not
secure it. Anyone who reads the JS can find it. Move the master console behind
a real server-side check before it guards anything that matters.

---

## What's deployed

| Area | State |
| --- | --- |
| Tutor (free providers, streaming) | Live via `api/_llm.ts` — Groq/Gemini/Cerebras/OpenRouter/Ollama with auto-fallback |
| Database (Supabase, optional) | Wired for student state; localStorage fallback when unset |
| Curriculum | 18 subjects, 274 chapters, classes 9–12 (rationalised NCERT) |
| Question bank | 201 questions (classes 9–12) with marking-scheme answers + examiner keywords |
| Library | 42 official NCERT/CBSE resources |
| Video Studio | Generates a **narrated, animated lesson that plays in the browser** (Web Speech, keyless) + 39 curated explainers |
| Progress tracking | Per-chapter mastery state (`ChapterProgress`: status + confidence + last-studied) feeds the tutor's focus areas. A dedicated diagnostic + planner page is designed, not yet built. |
| Entrance ("Learn Better") | JEE, NEET, CUET, SAT — verified 2025-26 patterns |
| Blob | Daily journal, feeds focus areas into the tutor's memory |
| Admin console | School-scoped materials + student roster |
| Master console | Schools, pricing levers, CBSE watch |

## Logins

| Who | Where | Credentials |
| --- | --- | --- |
| Student (Class 10) | `/login` | `aarav@student.demo` / `demo` |
| Student (Class 12) | `/login` | `diya@student.demo` / `demo` |
| School admin | `/login` | `admin@school.demo` / `admin` |
| Pinnacle Master | `/summit` | `PEAK-2026` |

## Deploying changes

```sh
npx vercel deploy --prod --yes --scope zainul358
```

Env vars to set in Vercel (all free — see `.env.example`):

- **At least one LLM key**, e.g. `GROQ_API_KEY`. Add `GEMINI_API_KEY`,
  `CEREBRAS_API_KEY`, `OPENROUTER_API_KEY` for failover.
- Optional: `AI_PROVIDER_ORDER`, `GROQ_MODEL`, `AI_MAX_TOKENS`, `AI_TEMPERATURE`.
- Optional database: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`.

If no LLM key is set, the tutor runs in offline mode (the app still works).

### The keyless brain in production

The deployed site can't reach `localhost`, so there are two ways to run the
"no-key" brain in production:

1. **Free cloud provider (simplest, always-on).** Set `GROQ_API_KEY` (free tier)
   in Vercel. The key is a server secret students never see, so from their side
   it is keyless. This is the recommended default.
2. **Your own GPU via a tunnel (true local brain).** Expose your local Ollama
   with a free Cloudflare quick tunnel, then point production at it:

   ```sh
   powershell -ExecutionPolicy Bypass -File scripts\tunnel-ollama.ps1
   ```

   Copy the printed `https://<...>.trycloudflare.com` URL and set in Vercel:

   - `OLLAMA_BASE_URL = https://<...>.trycloudflare.com/v1`
   - `OLLAMA_MODEL = qwen2.5:3b-instruct`
   - `AI_PROVIDER_ORDER = ollama,groq,gemini,cerebras,openrouter,github`

   Now `/api/chat` streams from your RTX 500. Caveats: the PC must stay on with
   the tunnel window open, and a quick-tunnel URL changes each run (use a named
   Cloudflare tunnel for a stable URL). If Ollama returns 403 through the tunnel,
   set `OLLAMA_ORIGINS=*` and restart Ollama.

   Put a cloud key in the order too (as above) so the tutor still answers when
   your PC is off.

### Netlify

`netlify.toml` and `netlify/functions/chat.mts` are written and ready, but
**nothing is deployed to Netlify** — that needs an account, which you have to
create yourself. Once you have one:

```sh
npx netlify deploy --prod
```

Then set the same env vars in Site settings → Environment variables, or the
tutor will run in offline mode.

Note the two functions differ on purpose: Vercel needs a **named method export**
(`export async function POST(req: Request)`), Netlify v2 uses a **default
export**. A default export on Vercel is silently ignored and the request hangs
until it times out — this cost a 300-second timeout per request before it was
caught, so don't "unify" them. Both import the same free-provider logic from
`api/_llm.ts`.

---

## Locking down the database

The Supabase integration ships with **permissive dev policies** (see
`supabase/schema.sql`) because the `anon` key is public in the browser bundle.
That is fine for a demo but means anyone with the site URL could read/write the
tables. Before real student data goes in:

1. Turn on **Supabase Auth** and issue real per-student logins (this also fixes
   the plaintext-password gap below — Supabase hashes passwords and manages
   sessions).
2. Key each row to `auth.uid()` and replace the `dev_all` policies with the
   owner-scoped policy example at the bottom of `schema.sql`.
3. Move the schools/resources sync (helpers already exist in `src/lib/cloud.ts`)
   behind the authenticated admin/master roles.

Until then, treat the cloud DB the same way you treat the open `/api/chat`
endpoint: fine for demos, lock it down before a wide share.

---

## Known gaps / next steps

- **Auth is still local + plaintext.** Seed accounts and admin-added students
  live in `localStorage` with plaintext passwords (`src/data/schools.ts`).
  Real Supabase Auth is the recommended next step (see above).
- **Student data now syncs to the cloud** when Supabase is configured (tutor
  memory, chats, journal, worksheets). Schools and school materials are still
  local-only, with cloud helpers ready to wire once auth is server-side.
- **Video Studio now plays a real narrated, animated lesson** in the browser
  (canvas-free DOM stage + Web Speech + KaTeX, keyless). A downloadable video
  file (canvas capture) is the remaining stretch.
- **CBSE Watch is a curated feed**, not a live scraper. The daily-automation
  card describes the intended design; the nightly job isn't built.
- Class 11 has no board weightage (correct — it isn't a board year).
- Question bank covers Class 10 and 12 deeply; classes 9 (25) and 11 (22) now
  have a solid starter set, still lighter than 10/12.
