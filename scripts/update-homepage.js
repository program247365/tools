#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TOOLS_DIR = path.join(__dirname, '../content/tools');
const INDEX_FILE = path.join(__dirname, '../content/index.mdx');

// Category mapping based on tags
const CATEGORY_MAP = {
  productivity: 'Productivity',
  planning: 'Productivity',
  'time-management': 'Productivity',
  scheduling: 'Productivity',

  video: 'Media & Video',
  audio: 'Media & Video',
  conversion: 'Media & Video',
  compression: 'Media & Video',
  editing: 'Media & Video',
  ffmpeg: 'Media & Video',

  image: 'Image Processing',
  photo: 'Image Processing',

  text: 'Text Tools',
  markdown: 'Text Tools',

  data: 'Data Tools',
  json: 'Data Tools',
  csv: 'Data Tools',
};

function getCategoryFromTags(tags) {
  if (!tags) return 'Other Tools';

  const tagList = tags.split(',').map(t => t.trim().toLowerCase());

  for (const tag of tagList) {
    if (CATEGORY_MAP[tag]) {
      return CATEGORY_MAP[tag];
    }
  }

  return 'Other Tools';
}

function scanTools() {
  const tools = [];

  const files = fs.readdirSync(TOOLS_DIR)
    .filter(file => file.endsWith('.mdx'));

  for (const file of files) {
    const filePath = path.join(TOOLS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(content);

    if (data.title) {
      const slug = file.replace('.mdx', '');
      tools.push({
        title: data.title,
        description: data.description || '',
        tags: data.tags || '',
        date: data.date || '',
        slug,
        category: getCategoryFromTags(data.tags),
      });
    }
  }

  // Sort by date (newest first), then by title
  tools.sort((a, b) => {
    if (a.date && b.date) {
      return new Date(b.date) - new Date(a.date);
    }
    return a.title.localeCompare(b.title);
  });

  return tools;
}

function generateToolsList(tools) {
  // Group tools by category
  const categories = {};

  for (const tool of tools) {
    if (!categories[tool.category]) {
      categories[tool.category] = [];
    }
    categories[tool.category].push(tool);
  }

  // Generate markdown
  let markdown = '## Available Tools\n\n';

  // Sort categories alphabetically
  const sortedCategories = Object.keys(categories).sort();

  for (const category of sortedCategories) {
    markdown += `### ${category}\n\n`;

    for (const tool of categories[category]) {
      markdown += `* <p><a href="tools/${tool.slug}">${tool.title}</a> - ${tool.description}</p>\n`;
    }

    markdown += '\n';
  }

  return markdown.trim();
}

function updateIndexFile(toolsList) {
  let content = fs.readFileSync(INDEX_FILE, 'utf8');

  // Find the section between "## Available Tools" and the next "---" or "##"
  const startMarker = '## Available Tools';
  const endMarker = /\n---\n|\n## /;

  const startIndex = content.indexOf(startMarker);
  if (startIndex === -1) {
    console.error('Error: Could not find "## Available Tools" section in index.mdx');
    process.exit(1);
  }

  // Find the end of the tools section
  const contentAfterStart = content.slice(startIndex + startMarker.length);
  const endMatch = contentAfterStart.match(endMarker);

  if (!endMatch) {
    console.error('Error: Could not find end of tools section in index.mdx');
    process.exit(1);
  }

  const endIndex = startIndex + startMarker.length + endMatch.index;

  // Replace the tools section
  const before = content.slice(0, startIndex);
  const after = content.slice(endIndex);

  const newContent = before + toolsList + '\n' + after;

  fs.writeFileSync(INDEX_FILE, newContent, 'utf8');

  console.log('✓ Updated index.mdx with tool list');
}

function main() {
  console.log('Scanning tools...');
  const tools = scanTools();
  console.log(`Found ${tools.length} tool(s)`);

  console.log('Generating tools list...');
  const toolsList = generateToolsList(tools);

  console.log('Updating index.mdx...');
  updateIndexFile(toolsList);

  console.log('Done!');
}

main();
