#!/usr/bin/env node

/**
 * Check the status of an Odyssey simulation job.
 *
 * Usage:
 *   node scripts/check-status.mjs <job_id>
 *
 * Example:
 *   node scripts/check-status.mjs 40e02cf3-dfed-4901-8ed1-a635384c5535
 */

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { Odyssey } from '@odysseyml/odyssey';

// Load .env from project root
try {
  const envContent = readFileSync(resolve(process.cwd(), '.env'), 'utf-8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  }
} catch {
  // .env not found — rely on environment
}

const jobId = process.argv[2];

if (!jobId) {
  console.error('Usage: node scripts/check-status.mjs <job_id>');
  process.exit(1);
}

if (!process.env.ODYSSEY_API_KEY) {
  console.error('ODYSSEY_API_KEY is not set. Add it to .env or export it.');
  process.exit(1);
}

const client = new Odyssey({ apiKey: process.env.ODYSSEY_API_KEY });

try {
  const status = await client.getSimulateStatus(jobId);
  console.log(JSON.stringify(status, null, 2));
} catch (err) {
  console.error(`Failed to get status: ${err.message}`);
  process.exit(1);
}
