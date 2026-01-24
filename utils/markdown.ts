
/**
 * Simple parser for Markdown with Frontmatter (YAML-like syntax)
 * We avoid heavy libraries like 'gray-matter' to keep the bundle size small.
 */

export interface ParsedMarkdown {
  metadata: Record<string, any>;
  content: string;
}

export const parseMarkdown = (text: string): ParsedMarkdown => {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---/;
  const match = text.match(frontmatterRegex);
  
  const metadata: Record<string, any> = {};
  let content = text;

  if (match) {
    // Remove the frontmatter block from content
    content = text.replace(match[0], '').trim();
    
    // Parse the YAML block
    const frontmatterBlock = match[1];
    const lines = frontmatterBlock.split('\n');
    
    lines.forEach(line => {
      const colonIndex = line.indexOf(':');
      if (colonIndex !== -1) {
        const key = line.slice(0, colonIndex).trim();
        let value = line.slice(colonIndex + 1).trim();
        
        // Handle basic arrays: [A, B, C]
        if (value.startsWith('[') && value.endsWith(']')) {
             const arrayContent = value.slice(1, -1);
             // Split by comma, but handle potential quotes
             metadata[key] = arrayContent.split(',').map(s => {
                 s = s.trim();
                 // Remove quotes if present
                 if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
                     return s.slice(1, -1);
                 }
                 return s;
             }).filter(Boolean);
        } else {
             // Handle raw strings (remove quotes if wrapping the whole value)
             if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
                value = value.slice(1, -1);
             }
             metadata[key] = value;
        }
      }
    });
  }

  return { metadata, content };
};

// Extract the first image from markdown body if not present in metadata
export const extractFirstImage = (markdown: string): string | undefined => {
  const imgRegex = /!\[.*?\]\((.*?)\)/;
  const match = markdown.match(imgRegex);
  return match ? match[1] : undefined;
};
