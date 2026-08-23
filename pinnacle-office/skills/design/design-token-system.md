# design token system

What the design specialists in this seat have learned working on Pinnacle AI.
- landing.css maps almost every --pa-* colour onto src/index.css's --color-* tokens except six: --pa-gold-quiet, --pa-white, --pa-ash, --pa-grey-2/3/4 (lines 27-37) are raw hex with no token backing it — worth checking before anyone assumes the whole file is token-clean
- src/pages/LandingClassic.tsx still exists alongside the current Landing.tsx; whether it's dead code or a live second entry point wasn't something I could determine from Design's file scope alone
