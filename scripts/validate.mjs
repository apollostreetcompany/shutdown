#!/usr/bin/env node

/**
 * Validate the state data registry for completeness and consistency.
 * Run before any build or promotion.
 *
 * Usage: node scripts/validate.mjs
 */

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const REGISTRY_PATH = join(process.cwd(), 'data/states/index.json');

if (!existsSync(REGISTRY_PATH)) {
  console.error('✗ Registry file not found. Run generate-registry.mjs first.');
  process.exit(1);
}

const registry = JSON.parse(readFileSync(REGISTRY_PATH, 'utf-8'));
const states = Object.values(registry);

let errors = 0;
let warnings = 0;

function error(msg) {
  console.error(`  ✗ ERROR: ${msg}`);
  errors++;
}

function warn(msg) {
  console.warn(`  ⚠ WARN: ${msg}`);
  warnings++;
}

console.log('Validating state data registry...\n');

// Check count
if (states.length < 50) {
  error(`Only ${states.length}/50 states present`);
}

for (const s of states) {
  console.log(`${s.code} ${s.name}:`);

  // Required fields
  if (!s.code) error(`${s.name}: missing code`);
  if (!s.name) error(`${s.code}: missing name`);
  if (!s.slug) error(`${s.code}: missing slug`);
  if (!s.agency) error(`${s.code}: missing agency`);
  if (!s.website) error(`${s.code}: missing website`);

  // Entity dissolution data
  if (!s.entities?.llc) {
    error(`${s.code}: missing LLC dissolution data`);
  } else {
    if (!s.entities.llc.formName) warn(`${s.code}: missing LLC form name`);
    if (s.entities.llc.fee === undefined || s.entities.llc.fee === null) warn(`${s.code}: missing LLC fee`);
    if (!s.entities.llc.steps || s.entities.llc.steps.length === 0) warn(`${s.code}: missing LLC dissolution steps`);
  }

  if (!s.entities?.corporation) {
    error(`${s.code}: missing corporation dissolution data`);
  } else {
    if (!s.entities.corporation.formName) warn(`${s.code}: missing corp form name`);
    if (s.entities.corporation.fee === undefined || s.entities.corporation.fee === null) warn(`${s.code}: missing corp fee`);
    if (!s.entities.corporation.steps || s.entities.corporation.steps.length === 0) warn(`${s.code}: missing corp dissolution steps`);
  }

  // Tax data
  if (!s.tax) {
    error(`${s.code}: missing tax data`);
  } else {
    if (s.tax.clearanceRequired === undefined) warn(`${s.code}: tax clearance requirement not specified`);
    if (!s.tax.taxAgency) warn(`${s.code}: missing tax agency name`);
  }

  // Timeline
  if (!s.timeline) {
    warn(`${s.code}: missing timeline data`);
  } else {
    if (!s.timeline.standardProcessingDays) warn(`${s.code}: missing processing time`);
  }

  // Requirements
  if (!s.requirements) {
    warn(`${s.code}: missing additional requirements`);
  }

  // Contact
  if (!s.phone) warn(`${s.code}: missing phone number`);

  // Slug format
  if (s.slug && !/^[a-z-]+$/.test(s.slug)) {
    error(`${s.code}: invalid slug format: "${s.slug}"`);
  }

  // Fee sanity checks
  if (s.entities?.llc?.fee > 500) warn(`${s.code}: LLC fee seems high: $${s.entities.llc.fee}`);
  if (s.entities?.corporation?.fee > 500) warn(`${s.code}: Corp fee seems high: $${s.entities.corporation.fee}`);

  // URL format checks
  if (s.website && !s.website.startsWith('http')) warn(`${s.code}: website URL missing protocol: ${s.website}`);
}

console.log(`\n${'='.repeat(50)}`);
console.log(`Results: ${errors} errors, ${warnings} warnings`);
console.log(`States: ${states.length}/50`);

if (errors > 0) {
  console.log('\n✗ Validation FAILED');
  process.exit(1);
} else {
  console.log('\n✓ Validation PASSED');
}
