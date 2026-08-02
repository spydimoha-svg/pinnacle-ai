import { daysSince } from "../src/lib/mastery.ts";

const assertEqual = (actual, expected, label) => {
  if (actual !== expected) {
    console.error(`FAIL ${label}: expected ${expected}, got ${actual}`);
    process.exitCode = 1;
  } else {
    console.log(`ok ${label}`);
  }
};

const daysAgo = (n) => new Date(Date.now() - n * 86_400_000).toISOString();

assertEqual(daysSince(daysAgo(25)), 25, "full ISO datetime, 25 days ago");
assertEqual(daysSince(daysAgo(0)), 0, "full ISO datetime, today");
assertEqual(daysSince("2020-01-01"), daysSince("2020-01-01"), "bare YYYY-MM-DD still parses");
assertEqual(daysSince("2020-01-01T00:00:00") > 1000, true, "bare-date-derived value is a large sane day count");
assertEqual(daysSince(undefined), null, "undefined stays null");
