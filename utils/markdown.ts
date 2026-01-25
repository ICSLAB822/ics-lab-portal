
/**
 * Parser for Markdown with YAML Frontmatter
 * Uses js-yaml for robust YAML parsing
 */

import yaml from 'js-yaml';

export interface ParsedMarkdown {
  metadata: Record<string, any>;
  content: string;
}

export const parseMarkdown = (text: string): ParsedMarkdown => {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---/;
  const match = text.match(frontmatterRegex);

  let metadata: Record<string, any> = {};
  let content = text;

  if (match) {
    // Remove the frontmatter block from content
    content = text.replace(match[0], '').trim();

    // Parse the YAML block using js-yaml
    try {
      const parsed = yaml.load(match[1]);
      if (parsed && typeof parsed === 'object') {
        metadata = parsed as Record<string, any>;
      }
    } catch (e) {
      console.warn('Failed to parse YAML frontmatter:', e);
    }
  }

  return { metadata, content };
};

// Extract the first image from markdown body if not present in metadata
export const extractFirstImage = (markdown: string): string | undefined => {
  const imgRegex = /!\[.*?\]\((.*?)\)/;
  const match = markdown.match(imgRegex);
  return match ? match[1] : undefined;
};
