// Tell a Whole Story in 32 Characters — Wi-Fi network name entry.
//
// Entry: "Won lottery. Lost the ticket." (29 characters)
//   Setup: someone won the lottery. Twist: they lost the ticket.
//   A whole story in two beats — fortune, then the loss of it —
//   with a character (the winner) and an event the reader fills in.
//   Premis baru: 0 tabrakan "lottery"/"ticket" di 1.363 judul board
//   (board penuh ex/divorce/dog/router — semua dihindari).
// Gate (RULES.txt): /output/entry.txt, UTF-8, 1-32 chars, not whitespace-only.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY = "Won lottery. Lost the ticket.";

// Gate check, enforced locally before writing.
const chars = [...ENTRY].length;
if (chars < 1 || chars > 32) {
  throw new Error(`entry is ${chars} characters, must be 1-32`);
}
if (!ENTRY.trim()) {
  throw new Error("entry must not be whitespace-only");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");
// Round-trip check: what the grader reads must be exactly the entry.
if (readFileSync(outPath, "utf8") !== ENTRY) {
  throw new Error("round-trip mismatch in entry.txt");
}
console.log(`wrote ${chars}-character entry to ${outPath}`);
