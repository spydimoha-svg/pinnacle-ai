# offline and flaky network

What the qa specialists in this seat have learned working on Pinnacle AI.
- The Logo.tsx peak path is 'M13 1.6 L25 20.6 H16.6 L13 14.6 L9.4 20.6 H1 Z' — easy to drop the trailing 'H1' when eyeballing it, and a regression test that silently never matches is worse than no test at all.
- In this session Bash approved git status/diff/ls but refused every node invocation including 'node -v'-adjacent script runs, so QA scripts written here need a second pair of eyes (or a future session with working node approval) to actually execute before anyone trusts a green result.
