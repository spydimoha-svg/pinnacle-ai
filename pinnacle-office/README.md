# Pinnacle Office

Your personal assistant, Pinnacle, and the thousand agents that work for it.

Pinnacle runs on your Claude Code subscription. Every agent is spawned with your
Anthropic API key stripped out of its environment, so it physically cannot bill
that key. If the Claude Code binary is missing, the office refuses to start
rather than falling back to anything paid.

## Run it

```
npm run office            open the office and start work
npm run office:open       dashboard only, nobody working
npm run office:once qa    one supervised round: a head plans, one specialist works
npm run office:brief      make Pinnacle write you a briefing right now
npm run office:roster     print the org chart
```

The dashboard is at http://localhost:4270 and opens by itself.

## How the building is laid out

1000 staff across 20 departments. Each department has one head, a manager for
every twelve people, and specialists under them. Each specialist owns one narrow
skill, like `ray optics diagrams` or `row level security policy`.

| Builds code | Advises |
| --- | --- |
| Front End, Back End, Tutor Engine, CBSE Content, Video Generation, Diagram Studio, Test Lab, Defect Squad, Security, Data Platform, Identity, Performance, Design Studio, Accessibility, Platform Ops | UX Research, Finance, Accounts and Tax, Legal, Growth |

Code departments edit files. Advisory departments never touch the codebase, they
file written memos into `pinnacle-office/reports/`.

## The loop

A head reads its department's actual files, then files five concrete tasks.
Each task goes to the least busy specialist whose skill matches. The specialist
does the work and reports back. Every few finished tasks, Pinnacle writes you a
briefing in plain English: what moved, what broke, what needs your decision.

It does not stop. Close the office from the dashboard or with ctrl c.

## Why 1000 agents does not mean 1000 at once

1000 is the roster, not the concurrency. One limit is real and cannot be wished
away: every agent is a full Claude Code process, so three or four at once is
comfortable on this machine and six is the ceiling.

There used to be a second limit: only one agent could hold the codebase at a
time, because two agents editing the same working tree makes the build gate
meaningless — neither change can be attributed or reverted cleanly. That was
true, and it cost more than it looked like. Fifteen of the twenty departments
write code, so almost the whole building queued behind one writer. Measured over
555 tasks: 45.5 agent-hours spread across 87.9 wall-hours, an average of half an
agent working at any moment.

The constraint was one tree, not one writer. Every writer now gets **its own
checkout** of the project, via `git worktree`, so several can edit, typecheck,
build and be reviewed at the same time, each on a diff that is provably theirs
alone. Only landing the finished commit on master is serialised, and that takes
milliseconds against a task that takes minutes.

If two agents change the same lines while both are working, the second one to
land is refused, its work is thrown away and the job goes back on the board to
be redone against the code that did land. Same treatment as failing the build,
for the same reason: the office only keeps changes it can account for.

So the roster gives you a thousand specialists with a thousand different skills
and memories, and the scheduler decides who is awake. Raise it in the dashboard
with `speed`, and raise how many of them may write code with `writers`.

## Driving it by command

The bar at the bottom runs the whole office. Press `/` from anywhere to focus
it. Nothing is buried in a menu.

You never name a team. Say what you want in your own words and Pinnacle works
out which of the twenty departments owns it, names a real seat against it, and
files it. Measured on fourteen things you might actually say, none naming a
team: reading it gets twelve right, matching keywords got two.

Say `never mind` straight after and she takes it back off the board.

| Command | What it does |
| --- | --- |
| `open the office` / `close the office` | start and stop the loop |
| `the lesson player keeps crashing` | just say it. It goes to whoever owns it |
| `tell tutor rewrite the hint ladder` | name a team yourself if you want to pick one |
| `plan security` | make a head file a fresh round of tasks now |
| `only content` | send every other department home |
| `everyone back` | reopen all 20 |
| `close video` / `reopen video` | one department at a time |
| `focus frontend` | filter the feed and board to one department |
| `speed 4` | how many agents are awake at once |
| `writers 3` | how many of those may write code at once, each in its own copy |
| `apply mode` / `propose mode` | let agents edit code, or keep them read only |
| `brief me` | Pinnacle writes a briefing now |
| `who works in legal` | open the roster |
| `show the charter` | the rules Pinnacle enforces |
| `what did Pinnacle refuse` | everything the authority stopped, and why |
| `retry the last rejection` | requeue it |

Clicking a department focuses it. Shift click closes or reopens it. Alt click
opens its roster.

## Just talking to her

There is one place you talk to her, at http://localhost:4270/talk, and she works
out whether you are chatting or handing out work. You do not pick a mode.

Measured on this machine: she answers in about two seconds, or instantly when
the answer is already on disk. Before this she took a median of 8.9 seconds
across 23 real conversations and was never once under five.

If what you said is a job, she says so and names the team and the person. If it
was just talk, she just talks. Twenty six phrasings were checked both ways,
including every garbled fragment your microphone has actually produced.

## The authority

Pinnacle is not a dispatcher, it is the last word. Nothing an agent produces
reaches the project until Pinnacle has looked at it against
[charter.md](charter.md), which you own and can edit. It is read fresh on every
review, so a change to that file takes effect on the next task with no restart.

Every completed task goes through, in this order:

1. **Pattern screen**, free and instant. Spawning processes, deleting files,
   reaching outside the project folder, `eval`, hardcoded keys and install hooks
   are refused on sight without spending a single token. Raw HTML, new
   dependencies, removed auth guards, silenced types, trackers and anything that
   collects personal data from a minor are flagged for judgement.
2. **The build gate**, so Pinnacle only ever rules on code that compiles.
3. **Pinnacle's own review.** It reads the actual diff, not the agent's
   description of it, and rules approve or refuse with a risk level and a
   reason. Scope creep alone is grounds for refusal: if the diff does something
   the task did not ask for, it goes.
4. Only then is the change committed.

Advisory memos are reviewed too. Bad legal or tax advice is its own kind of
harm, and you might act on it. A flagged memo is kept with the warning stapled
to the top rather than deleted.

Refusals are never silent. They land on the work board with the reason and show
up under `what did Pinnacle refuse`.

Tested: given a change that compiled cleanly and looked like a performance fix,
but quietly removed the auth guard and beaconed student emails to an outside
host, Pinnacle refused at high risk and named all three problems including the
DPDP exposure.

## What stops an agent wrecking the project

Below the authority sits the mechanical gate in `core/guard.mjs`:

1. The agent starts in its own clean checkout, so the diff is provably theirs
   even with two other writers going at once. Your own uncommitted edits are
   parked in a commit first, never reverted — and never while an agent could be
   the one making them.
2. Files the agent had no business touching are reverted.
3. `npm run build` runs, which typechecks first.
4. Pass and clear the charter, and the change is committed with the agent id in
   the message. Fail either, and the entire change is deleted.

Opening the office needs an explicit confirm. It cannot be started by a stray
click, a stale browser tab, or an unconfirmed API call.

Secrets are blocked one level lower, at the permission layer, because `.env` is
gitignored and would never show up in a rollback. Agents are denied read and
write on `.env`, on `.git`, on this office's own source, and on `git commit`,
`git push`, `curl`, `rm` and `vercel`.

`propose` mode in the dashboard makes every department advisory. Nobody edits
anything, everybody writes reports. Use it when you want opinions, not diffs.

## Files

```
pinnacle.mjs      the command line entry
config.mjs        every tunable in one place
rules.md          rule one is your API key, rule two is money. yours to edit
charter.md        the rules Pinnacle enforces. yours to edit
core/org.mjs      the 20 departments and the 1000 agents
core/briefs.mjs   what every agent is told before it starts
core/claude.mjs   spawns one headless Claude Code process per agent
core/warden.mjs   the authority: pattern screen plus Pinnacle's own review
core/guard.mjs    the build gate and the rollback
core/trees.mjs    one checkout per writer, so several can build at once
core/chief.mjs    Pinnacle: plan, dispatch, screen, gate, review, brief, repeat
core/converse.mjs talking to her. one held-open process, chat or a job
core/plan.mjs     who owns what you said, and which seat is doing it
core/store.mjs    state on disk and the live event bus
server.mjs        the dashboard server
ui/office.html    the dashboard, including the WebGL floor
ui/talk.html      just talking to her. works with the office shut
state/            runtime state, safe to delete when the office is closed
state/trees/      one working copy per writer. a cache, rebuilt on demand
reports/          briefings and department memos
```

The dashboard's hero is real WebGL, written directly against the API with no
library. One point per agent, twenty clusters, one per department. A point
brightens and pulses when that agent is awake, so the top of the screen is a
live plan of the actual office rather than decoration.

## Tuning

Set these before `npm run office`.

| Variable | Default | What it does |
| --- | --- | --- |
| `PINNACLE_CONCURRENCY` | 4 | agents awake at once |
| `PINNACLE_WRITERS` | 3 | how many of those may write code at once |
| `PINNACLE_MODE` | apply | `apply` or `propose` |
| `PINNACLE_MODEL_WORKER` | sonnet | model for specialists |
| `PINNACLE_MODEL_HEAD` | sonnet | model for department heads |
| `PINNACLE_TASKS_PER_PLAN` | 5 | tasks a head files per round |
| `PINNACLE_BRIEFING_EVERY` | 8 | finished tasks between briefings |
| `PINNACLE_COOLDOWN_MS` | 600000 | how long the office sleeps after a rate limit |
| `PINNACLE_PORT` | 4270 | dashboard port |
| `PINNACLE_WARDEN` | true | Pinnacle's review. The pattern screen always runs |
| `PINNACLE_MODEL_WARDEN` | sonnet | model for the authority |
