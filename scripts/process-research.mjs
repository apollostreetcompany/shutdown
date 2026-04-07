#!/usr/bin/env node

/**
 * Process research agent outputs into structured state JSON files.
 * This script takes raw markdown research and extracts structured data.
 *
 * Usage: node scripts/process-research.mjs <research-file-or-directory>
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'fs';
import { join, basename } from 'path';

const DATA_DIR = join(process.cwd(), 'data/states');

if (!existsSync(DATA_DIR)) {
  mkdirSync(DATA_DIR, { recursive: true });
}

const STATE_META = {
  AL: { name: 'Alabama', slug: 'alabama' },
  AK: { name: 'Alaska', slug: 'alaska' },
  AZ: { name: 'Arizona', slug: 'arizona' },
  AR: { name: 'Arkansas', slug: 'arkansas' },
  CA: { name: 'California', slug: 'california' },
  CO: { name: 'Colorado', slug: 'colorado' },
  CT: { name: 'Connecticut', slug: 'connecticut' },
  DE: { name: 'Delaware', slug: 'delaware' },
  FL: { name: 'Florida', slug: 'florida' },
  GA: { name: 'Georgia', slug: 'georgia' },
  HI: { name: 'Hawaii', slug: 'hawaii' },
  ID: { name: 'Idaho', slug: 'idaho' },
  IL: { name: 'Illinois', slug: 'illinois' },
  IN: { name: 'Indiana', slug: 'indiana' },
  IA: { name: 'Iowa', slug: 'iowa' },
  KS: { name: 'Kansas', slug: 'kansas' },
  KY: { name: 'Kentucky', slug: 'kentucky' },
  LA: { name: 'Louisiana', slug: 'louisiana' },
  ME: { name: 'Maine', slug: 'maine' },
  MD: { name: 'Maryland', slug: 'maryland' },
  MA: { name: 'Massachusetts', slug: 'massachusetts' },
  MI: { name: 'Michigan', slug: 'michigan' },
  MN: { name: 'Minnesota', slug: 'minnesota' },
  MS: { name: 'Mississippi', slug: 'mississippi' },
  MO: { name: 'Missouri', slug: 'missouri' },
  MT: { name: 'Montana', slug: 'montana' },
  NE: { name: 'Nebraska', slug: 'nebraska' },
  NV: { name: 'Nevada', slug: 'nevada' },
  NH: { name: 'New Hampshire', slug: 'new-hampshire' },
  NJ: { name: 'New Jersey', slug: 'new-jersey' },
  NM: { name: 'New Mexico', slug: 'new-mexico' },
  NY: { name: 'New York', slug: 'new-york' },
  NC: { name: 'North Carolina', slug: 'north-carolina' },
  ND: { name: 'North Dakota', slug: 'north-dakota' },
  OH: { name: 'Ohio', slug: 'ohio' },
  OK: { name: 'Oklahoma', slug: 'oklahoma' },
  OR: { name: 'Oregon', slug: 'oregon' },
  PA: { name: 'Pennsylvania', slug: 'pennsylvania' },
  RI: { name: 'Rhode Island', slug: 'rhode-island' },
  SC: { name: 'South Carolina', slug: 'south-carolina' },
  SD: { name: 'South Dakota', slug: 'south-dakota' },
  TN: { name: 'Tennessee', slug: 'tennessee' },
  TX: { name: 'Texas', slug: 'texas' },
  UT: { name: 'Utah', slug: 'utah' },
  VT: { name: 'Vermont', slug: 'vermont' },
  VA: { name: 'Virginia', slug: 'virginia' },
  WA: { name: 'Washington', slug: 'washington' },
  WV: { name: 'West Virginia', slug: 'west-virginia' },
  WI: { name: 'Wisconsin', slug: 'wisconsin' },
  WY: { name: 'Wyoming', slug: 'wyoming' },
};

/**
 * Write a single state JSON file
 */
function writeStateFile(code, data) {
  const filePath = join(DATA_DIR, `${code}.json`);
  writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`  ✓ Wrote ${filePath}`);
}

/**
 * Rebuild the index from individual state files
 */
function rebuildIndex() {
  const files = readdirSync(DATA_DIR).filter(f => f.endsWith('.json') && f !== 'index.json');
  const index = {};

  for (const file of files) {
    try {
      const data = JSON.parse(readFileSync(join(DATA_DIR, file), 'utf-8'));
      if (data.code) index[data.code] = data;
    } catch (e) {
      console.error(`Error reading ${file}: ${e.message}`);
    }
  }

  writeFileSync(join(DATA_DIR, 'index.json'), JSON.stringify(index, null, 2));
  console.log(`\nIndex rebuilt with ${Object.keys(index).length} states`);
}

// If called directly, rebuild index
rebuildIndex();

export { writeStateFile, rebuildIndex, STATE_META, DATA_DIR };
