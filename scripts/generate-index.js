#!/usr/bin/env node

/**
 * 生成内容索引文件
 * 扫描 public/content 目录下的所有 markdown 文件，生成一个 JSON 索引
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONTENT_DIR = path.join(__dirname, '../public/content');
const HERO_DIR = path.join(__dirname, '../public/files/hero');
const OUTPUT_FILE = path.join(__dirname, '../public/content-index.json');

/**
 * 递归扫描目录获取所有 .md 文件
 */
function scanDirectory(dir, baseDir = dir) {
  const files = [];

  try {
    const items = fs.readdirSync(dir);

    for (const item of items) {
      // 跳过隐藏文件和 .DS_Store
      if (item.startsWith('.')) continue;

      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        // 递归扫描子目录
        files.push(...scanDirectory(fullPath, baseDir));
      } else if (item.endsWith('.md')) {
        // 获取相对于 content 目录的路径
        const relativePath = path.relative(baseDir, fullPath);
        files.push(relativePath);
      }
    }
  } catch (error) {
    console.error(`Error scanning directory ${dir}:`, error.message);
  }

  return files;
}

/**
 * 按类型分组文件
 */
function groupFilesByType(files) {
  const grouped = {
    news: [],
    projects: [],
    publications: [],
    people: [],
    gallery: [],
    pages: []
  };

  for (const file of files) {
    const parts = file.split(path.sep);
    const type = parts[0]; // 第一级目录名

    if (grouped[type]) {
      grouped[type].push(file.replace(/\\/g, '/')); // 统一使用 / 分隔符
    }
  }

  return grouped;
}

/**
 * 扫描 hero 图片目录
 */
function scanHeroImages() {
  try {
    if (!fs.existsSync(HERO_DIR)) {
      console.warn('⚠️  Hero images directory not found');
      return [];
    }

    const files = fs.readdirSync(HERO_DIR);
    const images = files.filter(file =>
      file.match(/\.(jpg|jpeg|png|webp|gif)$/i) && !file.startsWith('.')
    );

    return images;
  } catch (error) {
    console.error('Error scanning hero images:', error.message);
    return [];
  }
}

/**
 * 主函数
 */
function main() {
  console.log('🔍 Scanning content directory...');

  if (!fs.existsSync(CONTENT_DIR)) {
    console.error(`❌ Content directory not found: ${CONTENT_DIR}`);
    process.exit(1);
  }

  const allFiles = scanDirectory(CONTENT_DIR);
  console.log(`📄 Found ${allFiles.length} markdown files`);

  const grouped = groupFilesByType(allFiles);

  console.log(`   - News: ${grouped.news.length}`);
  console.log(`   - Projects: ${grouped.projects.length}`);
  console.log(`   - Publications: ${grouped.publications.length}`);
  console.log(`   - People: ${grouped.people.length}`);
  console.log(`   - Gallery: ${grouped.gallery.length}`);
  console.log(`   - Pages: ${grouped.pages.length}`);

  // 扫描 hero 图片
  const heroImages = scanHeroImages();
  console.log(`🖼️  Found ${heroImages.length} hero images`);

  // 生成索引文件
  const index = {
    generated: new Date().toISOString(),
    files: grouped,
    heroImages: heroImages
  };

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(index, null, 2), 'utf8');
  console.log(`✅ Index generated: ${OUTPUT_FILE}`);
}

main();
