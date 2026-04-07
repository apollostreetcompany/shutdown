#!/usr/bin/env node

/**
 * Generate the state data registry from research agent outputs.
 * Reads raw research markdown files and produces structured JSON.
 *
 * Usage: node scripts/generate-registry.mjs
 */

import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'fs';
import { join, basename } from 'path';

const DATA_DIR = join(process.cwd(), 'data/states');
const REGISTRY_OUTPUT = join(DATA_DIR, 'index.json');

// Ensure data directory exists
if (!existsSync(DATA_DIR)) {
  mkdirSync(DATA_DIR, { recursive: true });
}

// Read all individual state JSON files
const stateFiles = readdirSync(DATA_DIR)
  .filter(f => f.endsWith('.json') && f !== 'index.json')
  .sort();

console.log(`Found ${stateFiles.length} state data files`);

const registry = {};

for (const file of stateFiles) {
  try {
    const data = JSON.parse(readFileSync(join(DATA_DIR, file), 'utf-8'));
    if (data.code) {
      registry[data.code] = data;
      console.log(`  ✓ ${data.code} - ${data.name}`);
    }
  } catch (err) {
    console.error(`  ✗ Error reading ${file}: ${err.message}`);
  }
}

// Write combined registry
writeFileSync(REGISTRY_OUTPUT, JSON.stringify(registry, null, 2));
console.log(`\nWrote ${Object.keys(registry).length} states to ${REGISTRY_OUTPUT}`);

// Validation summary
const missing = [];
const ALL_CODES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA',
  'HI','ID','IL','IN','IA','KS','KY','LA','ME','MD',
  'MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC',
  'SD','TN','TX','UT','VT','VA','WA','WV','WI','WY',
];

for (const code of ALL_CODES) {
  if (!registry[code]) missing.push(code);
}

if (missing.length > 0) {
  console.log(`\n⚠ Missing states (${missing.length}): ${missing.join(', ')}`);
} else {
  console.log('\n✓ All 50 states present');
}

// Check data completeness
let incomplete = 0;
for (const [code, data] of Object.entries(registry)) {
  const issues = [];
  if (!data.entities?.llc?.fee && data.entities?.llc?.fee !== 0) issues.push('LLC fee');
  if (!data.entities?.corporation?.fee && data.entities?.corporation?.fee !== 0) issues.push('Corp fee');
  if (!data.entities?.llc?.formName) issues.push('LLC form');
  if (!data.entities?.corporation?.formName) issues.push('Corp form');
  if (!data.website) issues.push('website');
  if (!data.phone) issues.push('phone');
  if (data.tax?.clearanceRequired === undefined) issues.push('tax clearance');

  if (issues.length > 0) {
    console.log(`  ⚠ ${code}: missing ${issues.join(', ')}`);
    incomplete++;
  }
}

if (incomplete === 0) {
  console.log('✓ All states have complete core data');
} else {
  console.log(`\n⚠ ${incomplete} states have incomplete data`);
}
