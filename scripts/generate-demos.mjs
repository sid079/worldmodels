#!/usr/bin/env node

/**
 * Generate demo videos for the Odyssey Airbnb showcase.
 *
 * Submits 4 simulation jobs sequentially (to avoid rate limits),
 * polls each until completion, then downloads the video and thumbnail
 * to public/demos/odyssey-airbnb/.
 *
 * Usage:
 *   node scripts/generate-demos.mjs
 */

import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { Odyssey } from '@odysseyml/odyssey';

// ─── Load .env ───────────────────────────────────────────────────────────────

try {
  const envPath = resolve(process.cwd(), '.env');
  const envContent = readFileSync(envPath, 'utf-8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIndex = trimmed.indexOf('=');
    if (eqIndex === -1) continue;
    const key = trimmed.slice(0, eqIndex).trim();
    const value = trimmed.slice(eqIndex + 1).trim();
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
} catch {
  // .env not found — rely on environment variables
}

const API_KEY = process.env.ODYSSEY_API_KEY;

if (!API_KEY) {
  console.error(
    '✖ ODYSSEY_API_KEY is not set.\n' +
      '  Add it to .env or export it before running this script.'
  );
  process.exit(1);
}

// ─── Demo definitions ────────────────────────────────────────────────────────

const DEMOS = [
  {
    name: 'santorini',
    prompt:
      'A luxurious Airbnb villa in Santorini, Greece. White-washed walls, blue domed roof, infinity pool overlooking the Aegean Sea at golden hour',
  },
  {
    name: 'tokyo',
    prompt:
      'A cozy modern Tokyo apartment. Minimalist Japanese interior, floor-to-ceiling windows with neon city skyline view at night',
  },
  {
    name: 'whistler',
    prompt:
      'A rustic mountain cabin in Whistler, Canada. Stone fireplace, wooden beams, snow-covered peaks visible through large windows',
  },
  {
    name: 'brooklyn',
    prompt:
      'A stylish Brooklyn loft apartment. Exposed brick walls, industrial fixtures, open plan kitchen, large art on walls, afternoon sunlight',
  },
];

const OUTPUT_DIR = resolve(process.cwd(), 'public/demos/odyssey-airbnb');
const POLL_INTERVAL_MS = 5_000;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function log(message) {
  const ts = new Date().toLocaleTimeString();
  console.log(`[${ts}] ${message}`);
}

function createClient() {
  return new Odyssey({ apiKey: API_KEY });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function downloadFile(url, destPath) {
  log(`  Downloading ${url}`);
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to download ${url}: ${res.status} ${res.statusText}`);
  }
  const buffer = Buffer.from(await res.arrayBuffer());
  writeFileSync(destPath, buffer);
  log(`  Saved → ${destPath} (${(buffer.length / 1024).toFixed(1)} KB)`);
}

// ─── Submit a simulation job ─────────────────────────────────────────────────

async function submitSimulation(client, prompt) {
  const result = await client.simulate({
    script: [
      { timestamp_ms: 0, start: { prompt } },
      { timestamp_ms: 5000, interact: { prompt: 'Slowly look around the space' } },
      { timestamp_ms: 10000, end: {} },
    ],
    portrait: false,
  });

  return result.job_id;
}

// ─── Poll until a job completes ──────────────────────────────────────────────

async function waitForCompletion(client, jobId) {
  let attempt = 0;

  while (true) {
    attempt++;
    const status = await client.getSimulateStatus(jobId);

    log(`  Poll #${attempt} — status: ${status.status}`);

    if (status.status === 'completed') {
      return status;
    }

    if (status.status === 'failed' || status.status === 'cancelled') {
      throw new Error(`Job ${jobId} ended with status: ${status.status}`);
    }

    await sleep(POLL_INTERVAL_MS);
  }
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log('━'.repeat(60));
  console.log('  Odyssey Demo Video Generator');
  console.log('━'.repeat(60));
  console.log();

  // Ensure output directory exists
  mkdirSync(OUTPUT_DIR, { recursive: true });
  log(`Output directory: ${OUTPUT_DIR}`);
  console.log();

  const client = createClient();

  for (const demo of DEMOS) {
    console.log('─'.repeat(60));
    log(`▸ Starting "${demo.name}"`);
    log(`  Prompt: "${demo.prompt}"`);
    console.log();

    // 1. Submit simulation
    log('  Submitting simulation job …');
    let jobId;
    try {
      jobId = await submitSimulation(client, demo.prompt);
    } catch (err) {
      console.error(`  ✖ Failed to submit "${demo.name}": ${err.message}`);
      continue;
    }
    log(`  Job submitted — ID: ${jobId}`);
    console.log();

    // 2. Poll until completed
    log('  Waiting for completion …');
    let completedStatus;
    try {
      completedStatus = await waitForCompletion(client, jobId);
    } catch (err) {
      console.error(`  ✖ "${demo.name}" failed: ${err.message}`);
      continue;
    }
    log('  ✔ Simulation completed!');
    console.log();

    // 3. Download video and thumbnail
    const stream = completedStatus.streams?.[0];
    if (!stream) {
      console.error(`  ✖ No streams found for "${demo.name}"`);
      continue;
    }

    const videoUrl = stream.video_url;
    const thumbnailUrl = stream.thumbnail_url;

    if (videoUrl) {
      const videoPath = join(OUTPUT_DIR, `${demo.name}.mp4`);
      try {
        await downloadFile(videoUrl, videoPath);
      } catch (err) {
        console.error(`  ✖ Failed to download video: ${err.message}`);
      }
    } else {
      console.warn(`  ⚠ No video_url for "${demo.name}"`);
    }

    if (thumbnailUrl) {
      const thumbPath = join(OUTPUT_DIR, `${demo.name}-thumb.jpg`);
      try {
        await downloadFile(thumbnailUrl, thumbPath);
      } catch (err) {
        console.error(`  ✖ Failed to download thumbnail: ${err.message}`);
      }
    } else {
      console.warn(`  ⚠ No thumbnail_url for "${demo.name}"`);
    }

    log(`  ✔ "${demo.name}" done`);
    console.log();
  }

  console.log('━'.repeat(60));
  log('All demos processed!');
  console.log('━'.repeat(60));
}

main().catch((err) => {
  console.error(`\n✖ Fatal error: ${err.message}`);
  process.exit(1);
});
