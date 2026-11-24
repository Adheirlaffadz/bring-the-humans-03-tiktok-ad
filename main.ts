// Entry point for the bring-the-humans-03 TikTok ad entry.
//
// This program has one job: hand the house the address of the video.
// VIDEO.json at the repository root names the TikTok video; this program
// leaves a copy of it in the output directory, where the grader reads it.
// The video itself is the entry: a 24-second vertical ad for make.fun,
// made in the recorded entry session and posted publicly on TikTok.
// Nothing written here is scored — the house reads the video's views
// straight from TikTok, and the deadline reading decides the places.
// The video ends on make.fun's own referral card, so the referral code
// in VIDEO.json's companion file is the one the video shows on screen.
//
// Run it the way the grader does:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const sourceDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const entry = JSON.parse(readFileSync(join(sourceDir, 'VIDEO.json'), 'utf8'));
if (typeof entry.url !== 'string' || !entry.url.startsWith('https://www.tiktok.com/')) {
  throw new Error('VIDEO.json does not name a TikTok video URL');
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, 'VIDEO.json'), JSON.stringify(entry));
