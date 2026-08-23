# The rules

Every agent in this building reads this file before it does anything, and
Pinnacle reads it again before it lets any work through. It is read fresh every
single time, so an edit here binds a thousand agents on their next breath with
no restart.

Ayaan owns this file. No agent may ever write to it.

The first two rules are absolute. There is no task, no deadline and no clever
reason that outranks them. An agent that breaks one has failed the task no
matter how good the work was.

## Rule 1. Never use Ayaan's Anthropic API key

That key bills him per token. This office runs on his Claude Code subscription
and nothing else.

- Never read, print, copy, log or pass on `ANTHROPIC_API_KEY`,
  `ANTHROPIC_AUTH_TOKEN` or `ANTHROPIC_BASE_URL`.
- Never write code that calls `api.anthropic.com` directly.
- Never set `CLAUDE_CODE_USE_BEDROCK` or `CLAUDE_CODE_USE_VERTEX`. Those route
  through paid cloud accounts.
- Never suggest the key as a fix for anything, including a rate limit. The
  correct response to a rate limit is to wait.

The office already strips all five of those from your environment before you
start, so if you find yourself holding one, something is wrong and you should
stop and say so rather than use it.

## Rule 2. Nothing that costs Ayaan money

If it has a bill attached, it does not go in. Not in the product, not in this
office, not in a suggestion, not "just for now".

- No paid API, no paid tier, no metered service, no credit card, no trial that
  converts, no "free tier" that starts charging past a quota.
- No new npm dependency. You are almost certainly solving the problem wrong.
- If the only way you can see to do the task costs money, you do not do it and
  you do not improvise a cheap imitation. You put it in `needs` and Supply finds
  the free way.

### Use these instead

The free thing is usually already on this machine. Reach for it before you ask
for anything.

| Instead of | Use |
| --- | --- |
| A paid LLM API | Ollama on localhost, `qwen2.5:3b-instruct`, already installed and running |
| A paid text to speech | The browser's own neural voices, free and offline |
| A paid search API | `WebSearch` and `WebFetch`, which you already have |
| A paid GitHub API tier | The `gh` CLI, already installed and signed in |
| A paid browser or screenshot service | Chrome on this machine, driven locally |
| A hosted database | Supabase's free tier, which this project already uses |
| A paid monitoring service | Ask Supply. Do not sign up for anything |

## Rule 3. Stay inside the project

Nothing you write touches anything outside this repository. No shelling out to
the system, no spawning processes, no registry, no scheduled tasks, no writing
outside the project folder.

## Rule 4. Do not harm the site

It serves school students during exam season. A change that could take a route
down, corrupt saved progress, or expose a student's data is worse than no change
at all. Never weaken a guard, a type, a sanitiser or a test to make something
pass.

## Rule 5. Never leak a secret

No key, token, password or connection string in code, in a comment, in a log
line, in an error message, or in anything sent to the browser. As far as you are
concerned `.env` does not exist.

## Rule 6. Be honest

If you say you verified something, you must have actually run it. A summary that
overstates what you changed is a failed task even when the code is fine.

## Rule 7. Be small

The shortest change that achieves the task is the correct change. A large diff
for a small task means something came along that nobody asked for, and that is
grounds for refusal on its own.
