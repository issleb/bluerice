#!/usr/bin/env node
// Blue Rice scraper — zero deps, Node 22
// Scrapes all 314 strips from bluericecomic.com

import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';

const BASE = 'http://bluericecomic.com';
const STRIP_DIR = 'public/strips';
const LEGACY_DIR = 'public/images/legacy';
const DATA_DIR = 'src/data';
const DELAY = 500;

const sleep = ms => new Promise(r => setTimeout(r, ms));

// All strip IDs in order
const STRIP_IDS = [
  ...Array.from({ length: 294 }, (_, i) => String(i + 1)),
  ...Array.from({ length: 20 }, (_, i) => `N${i + 1}`),
];

function parseHTML(html, id) {
  const strip = { number: id, isNew: id.startsWith('N') };

  // Tags
  const tagRe = /<a class="tag"[^>]*>([^<]+)<\/a>/g;
  strip.tags = [];
  let m;
  while ((m = tagRe.exec(html)) !== null) {
    strip.tags.push(m[1].trim());
  }

  // Publish date
  const dateMatch = html.match(/<div id="publishdate">\s*([^<]*\S)\s*<\/div>/s);
  strip.publishDate = dateMatch ? dateMatch[1].trim() : null;

  // Description/commentary HTML
  const descMatch = html.match(/<div id="description">\s*([\s\S]*?)\s*(?:<br\s*\/?>\s*)*<\/div>/);
  if (descMatch) {
    let desc = descMatch[1]
      .replace(/<br\s*\/?>\s*$/g, '')
      .replace(/\s+$/, '')
      .trim();
    strip.description = desc || null;
  } else {
    strip.description = null;
  }

  return strip;
}

async function downloadFile(url, dest) {
  if (existsSync(dest)) return; // skip if already downloaded
  const res = await fetch(url);
  if (!res.ok) {
    console.warn(`  WARN: ${url} → ${res.status}`);
    return;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(dest, buf);
}

async function main() {
  await mkdir(STRIP_DIR, { recursive: true });
  await mkdir(LEGACY_DIR, { recursive: true });
  await mkdir(DATA_DIR, { recursive: true });

  const strips = [];
  let errors = 0;

  console.log(`Scraping ${STRIP_IDS.length} strips...`);

  for (const id of STRIP_IDS) {
    const url = `${BASE}/Strip/Details/${id}`;
    process.stdout.write(`  ${id}...`);

    try {
      const res = await fetch(url);
      if (!res.ok) {
        console.log(` SKIP (${res.status})`);
        errors++;
        await sleep(DELAY);
        continue;
      }

      const html = await res.text();
      const strip = parseHTML(html, id);
      strips.push(strip);

      // Download full image + thumbnail
      await downloadFile(
        `${BASE}/Content/Strips/${id}.gif`,
        join(STRIP_DIR, `${id}.gif`)
      );
      await downloadFile(
        `${BASE}/Content/Strips/${id}_sm.gif`,
        join(STRIP_DIR, `${id}_sm.gif`)
      );

      console.log(` OK (${strip.tags.length} tags${strip.description ? ', has commentary' : ''})`);
    } catch (err) {
      console.log(` ERROR: ${err.message}`);
      errors++;
    }

    await sleep(DELAY);
  }

  // Build tags index
  const tagIndex = {};
  for (const strip of strips) {
    for (const tag of strip.tags) {
      if (!tagIndex[tag]) tagIndex[tag] = [];
      tagIndex[tag].push(strip.number);
    }
  }

  // Write data files
  await writeFile(
    join(DATA_DIR, 'strips.json'),
    JSON.stringify(strips, null, 2)
  );
  await writeFile(
    join(DATA_DIR, 'tags.json'),
    JSON.stringify(tagIndex, null, 2)
  );

  console.log(`\nDone: ${strips.length} strips, ${Object.keys(tagIndex).length} tags, ${errors} errors`);

  // Download legacy layout art
  console.log('\nDownloading legacy images...');
  const legacyImages = [
    'top.gif', 'top_left.gif', 'top_right.gif',
    'nav_old_strips.gif', 'nav_new_strips.gif',
    'left.gif', 'right.gif',
    'middle_left.gif', 'middle_right.gif',
    'arrow_left.png', 'arrow_right.png',
  ];

  for (const img of legacyImages) {
    process.stdout.write(`  ${img}...`);
    await downloadFile(
      `${BASE}/Content/Images/${img}`,
      join(LEGACY_DIR, img)
    );
    console.log(' OK');
    await sleep(200);
  }

  console.log('Legacy images done.');
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
