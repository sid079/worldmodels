#!/usr/bin/env node

/**
 * Standalone Node.js script to test the Odyssey API.
 *
 * Usage:
 *   node scripts/test-odyssey.mjs [command]
 *
 * The script loads ODYSSEY_API_KEY from .env automatically.
 *
 * Commands:
 *   connect        – Test authentication and connection flow
 *   simulate       – Submit a text-to-video simulation job
 *   status <id>    – Check the status of a simulation job
 *   list           – List recent simulation jobs
 *   cancel <id>    – Cancel a pending simulation job
 *   recordings     – List stream recordings
 *   recording <id> – Get a specific stream recording
 *   all            – Run the full test suite (default)
 */

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { Odyssey } from '@odysseyml/odyssey';

// Load .env file from project root
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
  // .env file not found — rely on environment variables
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const API_KEY = process.env.ODYSSEY_API_KEY;

function log(label, data) {
  console.log(`\n✦ ${label}`);
  if (data !== undefined) {
    console.log(JSON.stringify(data, null, 2));
  }
}

function fail(message) {
  console.error(`\n✖ ${message}`);
  process.exit(1);
}

function assertKey() {
  if (!API_KEY) {
    fail(
      'ODYSSEY_API_KEY is not set.\n' +
        '  Export it first:  export ODYSSEY_API_KEY=ody_your_key_here\n' +
        '  Then re-run:     node scripts/test-odyssey.mjs'
    );
  }
}

function createClient() {
  return new Odyssey({ apiKey: API_KEY });
}

// ─── Test: Connect ────────────────────────────────────────────────────────────

async function testConnect() {
  log('Testing connect (auth + session request) …');
  const client = createClient();

  try {
    const stream = await client.connect({
      onStatusChange: (status, message) => {
        console.log(`  status → ${status}${message ? ` (${message})` : ''}`);
      },
      onConnected: () => {
        console.log('  ✔ onConnected fired');
      },
      onError: (err, fatal) => {
        console.log(`  ✖ onError: ${err.message} (fatal=${fatal})`);
      },
    });

    log('Connected – media stream tracks:', stream?.getTracks?.().length ?? 'N/A');
    log('Session ID:', client.currentSessionId);
    log('Connection status:', client.currentStatus);

    client.disconnect();
    log('Disconnected');
  } catch (err) {
    console.log(`  Connection failed (expected in Node without WebRTC): ${err.message}`);
  }
}

// ─── Test: Simulate ───────────────────────────────────────────────────────────

async function testSimulate() {
  log('Testing simulate (text-to-video) …');
  const client = createClient();

  try {
    const result = await client.simulate({
      script: [
        { timestamp_ms: 0, start: { prompt: 'A serene mountain lake at sunrise' } },
        { timestamp_ms: 5000, interact: { prompt: 'A bird flies across the sky' } },
        { timestamp_ms: 10000, end: {} },
      ],
      portrait: false,
    });

    log('Simulation submitted:', result);
    return result.job_id;
  } catch (err) {
    console.log(`  simulate failed: ${err.message}`);
    return null;
  }
}

// ─── Test: Get Simulate Status ────────────────────────────────────────────────

async function testStatus(jobId) {
  if (!jobId) {
    fail('Job ID is required. Usage: node scripts/test-odyssey.mjs status <job_id>');
  }

  log(`Checking status for job ${jobId} …`);
  const client = createClient();

  try {
    const status = await client.getSimulateStatus(jobId);
    log('Job status:', status);

    if (status.status === 'completed' && status.streams?.length > 0) {
      console.log('\n  Completed streams:');
      for (const s of status.streams) {
        console.log(`    stream ${s.stream_id}: ${s.duration_seconds}s – ${s.video_url ?? 'no video yet'}`);
      }
    }

    return status;
  } catch (err) {
    console.log(`  getSimulateStatus failed: ${err.message}`);
    return null;
  }
}

// ─── Test: List Simulations ───────────────────────────────────────────────────

async function testListSimulations() {
  log('Listing recent simulations …');
  const client = createClient();

  try {
    const list = await client.listSimulations({ limit: 10 });
    log(`Found ${list.total} simulation(s) (showing ${list.jobs.length}):`, list);
    return list;
  } catch (err) {
    console.log(`  listSimulations failed: ${err.message}`);
    return null;
  }
}

// ─── Test: Cancel Simulation ──────────────────────────────────────────────────

async function testCancel(jobId) {
  if (!jobId) {
    fail('Job ID is required. Usage: node scripts/test-odyssey.mjs cancel <job_id>');
  }

  log(`Cancelling job ${jobId} …`);
  const client = createClient();

  try {
    const result = await client.cancelSimulation(jobId);
    log('Cancel result:', result);
    return result;
  } catch (err) {
    console.log(`  cancelSimulation failed: ${err.message}`);
    return null;
  }
}

// ─── Test: List Stream Recordings ─────────────────────────────────────────────

async function testListRecordings() {
  log('Listing stream recordings …');
  const client = createClient();

  try {
    const result = await client.listStreamRecordings({ limit: 10 });
    log(`Found ${result.total} recording(s) (showing ${result.recordings.length}):`, result);
    return result;
  } catch (err) {
    console.log(`  listStreamRecordings failed: ${err.message}`);
    return null;
  }
}

// ─── Test: Get Recording ──────────────────────────────────────────────────────

async function testGetRecording(streamId) {
  if (!streamId) {
    fail('Stream ID is required. Usage: node scripts/test-odyssey.mjs recording <stream_id>');
  }

  log(`Getting recording for stream ${streamId} …`);
  const client = createClient();

  try {
    const recording = await client.getRecording(streamId);
    log('Recording:', recording);
    return recording;
  } catch (err) {
    console.log(`  getRecording failed: ${err.message}`);
    return null;
  }
}

// ─── Test: Full Suite ─────────────────────────────────────────────────────────

async function testAll() {
  console.log('━'.repeat(60));
  console.log('  Odyssey API — Full Test Suite');
  console.log('━'.repeat(60));

  await testConnect();
  const jobId = await testSimulate();
  if (jobId) {
    await testStatus(jobId);
  }
  await testListSimulations();
  await testListRecordings();

  console.log('\n' + '━'.repeat(60));
  console.log('  All tests complete');
  console.log('━'.repeat(60));
}

// ─── CLI Router ───────────────────────────────────────────────────────────────

const [command, ...args] = process.argv.slice(2);

assertKey();

switch (command) {
  case 'connect':
    await testConnect();
    break;
  case 'simulate':
    await testSimulate();
    break;
  case 'status':
    await testStatus(args[0]);
    break;
  case 'list':
    await testListSimulations();
    break;
  case 'cancel':
    await testCancel(args[0]);
    break;
  case 'recordings':
    await testListRecordings();
    break;
  case 'recording':
    await testGetRecording(args[0]);
    break;
  case 'all':
  default:
    await testAll();
    break;
}
