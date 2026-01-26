#!/usr/bin/env node

/*
  Validates publication markdown entries against local assets.

  Checks:
  - `pdfUrl` and `imageUrl` basenames exist under `public/files/publications/`
  - frontmatter parses as YAML

  This script intentionally does NOT try to infer or validate "tags from Keywords".
*/

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONTENT_DIR = path.join(__dirname, '../public/content/publications');
const ASSETS_DIR = path.join(__dirname, '../public/files/publications');

const FRONTMATTER_REGEX = /^---\r?\n([\s\S]*?)\r?\n---/;

function listMarkdownFiles(dir) {
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md') && !f.startsWith('.'))
    .map((f) => path.join(dir, f));
}

function parseFrontmatter(text, filePath) {
  const match = text.match(FRONTMATTER_REGEX);
  if (!match) {
    throw new Error(`Missing YAML frontmatter: ${filePath}`);
  }
  const parsed = yaml.load(match[1]);
  if (!parsed || typeof parsed !== 'object') {
    throw new Error(`Invalid YAML frontmatter: ${filePath}`);
  }
  return parsed;
}

function isLocalFilename(v) {
  if (typeof v !== 'string') return false;
  const s = v.trim();
  if (!s || s === '#' || s.startsWith('javascript')) return false;
  if (s.startsWith('http://') || s.startsWith('https://')) return false;
  return true;
}

function validateAsset(fieldName, value, mdFile) {
  if (!isLocalFilename(value)) return [];

  const clean = value.trim().replace(/^(\.\/|\/)/, '');
  const assetPath = path.join(ASSETS_DIR, clean);
  if (!fs.existsSync(assetPath)) {
    return [`${path.basename(mdFile)}: ${fieldName} references missing file: ${clean}`];
  }
  return [];
}

function main() {
  if (!fs.existsSync(CONTENT_DIR)) {
    console.error(`Content directory not found: ${CONTENT_DIR}`);
    process.exit(1);
  }
  if (!fs.existsSync(ASSETS_DIR)) {
    console.error(`Assets directory not found: ${ASSETS_DIR}`);
    process.exit(1);
  }

  const mdFiles = listMarkdownFiles(CONTENT_DIR);
  const errors = [];

  for (const mdFile of mdFiles) {
    const text = fs.readFileSync(mdFile, 'utf8');
    let meta;
    try {
      meta = parseFrontmatter(text, mdFile);
    } catch (e) {
      errors.push(e.message || String(e));
      continue;
    }

    errors.push(...validateAsset('pdfUrl', meta.pdfUrl, mdFile));
    errors.push(...validateAsset('imageUrl', meta.imageUrl, mdFile));
    errors.push(...validateAsset('slidesUrl', meta.slidesUrl, mdFile));
    errors.push(...validateAsset('posterUrl', meta.posterUrl, mdFile));
  }

  if (errors.length > 0) {
    console.error('Publication validation failed:');
    for (const err of errors) console.error(`- ${err}`);
    process.exit(1);
  }

  console.log(`OK: validated ${mdFiles.length} publication markdown file(s).`);
}

main();
