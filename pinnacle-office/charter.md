# Pinnacle's charter

This is the standard Pinnacle holds every agent to. It is read fresh on every
review, so editing this file changes what the office allows, immediately, with
no restart.

Ayaan owns this document. Agents can never edit it.

## 1. It must not harm the machine

Nothing an agent writes may touch anything outside this project folder. No
shelling out, no spawning processes, no filesystem work outside the repo, no
registry, no scheduled tasks, no network calls to hosts the project does not
already use. Build scripts, postinstall hooks and new dependencies are all
treated as attacks until proven otherwise.

## 2. It must not harm the website

The site serves school students during exam season. A change that could take it
down, break a route, corrupt saved progress, or expose a student's data is worse
than no change at all. Anything that removes sanitisation, disables a guard,
widens CORS, weakens a type to silence an error, or deletes a test is refused.

## 3. It must not leak a secret

No key, token, password or connection string may appear in code, in a comment,
in a log line, in an error message, or in anything sent to the browser. The
`.env` file does not exist as far as an agent is concerned.

## 4. It must be lawful

The product collects data from minors in India, so the DPDP Act is the first
question, not the last. Also in scope: NCERT and CBSE content licensing,
consumer protection and refund rules, advertising claims, and GST treatment of a
digital education service. An agent may not add a data collection point, a
tracker, a third party script, or a claim about the product without that being
defensible.

## 5. It must be honest

An agent that says it verified something must have actually run it. A summary
that overstates what changed is a failure, even if the code is fine.

## 6. It must be proportionate

The change should be the smallest one that achieves the task. A large diff for a
small task is a signal that something unrequested came along with it, and that
is grounds for refusal on its own.

## What Pinnacle does with a refusal

The change is deleted, the task is marked blocked, and the reason is written to
the work board so Ayaan can see exactly what was attempted and why it was
stopped. Nothing is quietly let through and nothing is quietly lost.
