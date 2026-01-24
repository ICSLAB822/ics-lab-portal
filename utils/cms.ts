import { AppData, NewsItem, Publication, Project, Lang } from '../types';
import { data as staticData } from '../data';
import { parseMarkdown, extractFirstImage } from './markdown';

// =================================================================
// ⚙️ CMS CONFIGURATION / 网站内容配置
// =================================================================

export const GITHUB_USERNAME: string = "ICSLAB822"; 
export const GITHUB_REPO: string = "ics-lab-content";     
export const GITHUB_BRANCH: string = "main"; 

// =================================================================

// 修复：只要用户名和仓库名不为空字符串，就视为配置成功
export const isCMSConfigured = GITHUB_USERNAME !== "" && GITHUB_REPO !== "";

// API Base: 用于获取文件列表 (始终查看 content 文件夹下的 md)
const API_BASE = `https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/contents/content`;

// Repo Base: 仓库根目录的 Raw 地址
const REPO_RAW_BASE = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${GITHUB_REPO}/${GITHUB_BRANCH}`;

// Assets Base: 资源文件 (PDF, Images) 现在位于 "files" 文件夹中
export const ASSETS_BASE = `${REPO_RAW_BASE}/files`;

interface GitHubFile {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: string;
}

// Helper to fetch list of files in a directory
const fetchFileList = async (directory: string): Promise<GitHubFile[]> => {
    if (!isCMSConfigured) return [];
    
    // 我们只扫描 content 目录下的 markdown 文件
    const url = `${API_BASE}/${directory}?ref=${GITHUB_BRANCH}`;
    console.log(`CMS: Requesting ${directory}...`, url);

    try {
        const res = await fetch(url);
        
        // Error Handling
        if (!res.ok) {
            if (res.status === 404) {
                console.warn(`CMS: Folder not found: content/${directory}. Please create this folder in your repo.`);
            } else if (res.status === 403) {
                console.warn(`CMS: Rate limit exceeded or access denied. (Status: ${res.status})`);
            } else {
                console.warn(`CMS: GitHub API Error: ${res.status} ${res.statusText}`);
            }
            return [];
        }

        const data = await res.json();
        
        if (!Array.isArray(data)) {
            console.warn(`CMS: Expected array for ${directory}, got object. Is this a file instead of a folder?`);
            return [];
        }

        const mdFiles = data.filter((f: any) => f.name.endsWith('.md'));
        console.log(`CMS: Found ${mdFiles.length} markdown files in ${directory}`);
        return mdFiles;

    } catch (e) {
        console.warn(`CMS: Network error fetching ${directory}`, e);
        return [];
    }
};

// Helper to fetch hero images from files/hero
const fetchHeroImages = async (): Promise<string[]> => {
    if (!isCMSConfigured) return [];
    
    // API URL to list files in files/hero
    const url = `https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/contents/files/hero?ref=${GITHUB_BRANCH}`;
    console.log(`CMS: Requesting hero images...`, url);

    try {
        const res = await fetch(url);
        if (!res.ok) return [];
        const data = await res.json();
        
        if (!Array.isArray(data)) return [];

        // Filter for images and construct raw URLs
        const images = data
            .filter((f: any) => f.name.match(/\.(jpg|jpeg|png|webp|gif)$/i))
            .map((f: any) => `${ASSETS_BASE}/hero/${f.name}`);
            
        console.log(`CMS: Found ${images.length} hero images.`);
        return images;
    } catch (e) {
        console.warn("CMS: Failed to fetch hero images", e);
        return [];
    }
};

// Helper to fetch raw content of a file
const fetchFileContent = async (url: string): Promise<string> => {
    try {
        const res = await fetch(url);
        if (!res.ok) return "";
        return await res.text();
    } catch (e) {
        console.warn(`CMS: Failed to fetch file content from ${url}`, e);
        return "";
    }
};

// 解析资源 URL
// 逻辑更新：现在假设资源文件位于 files/{folder}/filename
const resolveAssetUrl = (url: string | undefined, folder: string): string | undefined => {
    if (!url || url === '#' || url === '') return undefined;
    
    const trimmed = url.trim();
    
    // 1. 如果是完整链接 (http/https)，直接返回
    if (trimmed.startsWith('http') || trimmed.startsWith('https')) return trimmed;
    
    // 2. 清理文件名 (移除 ./ 或 /)
    const cleanFilename = trimmed.replace(/^(\.\/|\/)/, ''); 
    
    // 3. 构建最终 URL：指向 files 文件夹
    // 结构: .../files/publications/MyPaper.pdf
    const finalUrl = `${ASSETS_BASE}/${folder}/${cleanFilename}`;
    
    return finalUrl;
};

export const fetchDynamicData = async (): Promise<Record<Lang, AppData>> => {
    // Fallback immediately if not configured
    if (!isCMSConfigured) {
        console.log("CMS: No GitHub repo configured. Using static data.");
        return staticData;
    }

    const newData = JSON.parse(JSON.stringify(staticData));
    const langs: Lang[] = ['en', 'zh'];

    try {
        // 0. Fetch Hero Images (NEW)
        const heroImages = await fetchHeroImages();
        if (heroImages.length > 0) {
            langs.forEach(l => newData[l].labInfo.heroImages = heroImages);
        }

        // 1. Fetch News
        const newsFiles = await fetchFileList('news');
        if (newsFiles.length > 0) {
            const newsItems = await Promise.all(newsFiles.map(async (file) => {
                const text = await fetchFileContent(file.download_url);
                const { metadata, content } = parseMarkdown(text);
                const rawImg = metadata.imageUrl || extractFirstImage(content);

                return {
                    id: file.name.replace('.md', ''),
                    date: metadata.date || new Date().toISOString(),
                    title: metadata.title || 'Untitled',
                    summary: metadata.summary || content.slice(0, 150) + '...',
                    content: content,
                    tag: metadata.tag || 'News',
                    // 将会在 files/news/ 下查找图片
                    imageUrl: resolveAssetUrl(rawImg, 'news') 
                } as NewsItem;
            }));
            newsItems.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            langs.forEach(l => newData[l].news = newsItems);
        }

        // 2. Fetch Projects
        const projectFiles = await fetchFileList('projects');
        if (projectFiles.length > 0) {
            const projectItems = await Promise.all(projectFiles.map(async (file) => {
                const text = await fetchFileContent(file.download_url);
                const { metadata, content } = parseMarkdown(text);
                const rawImg = metadata.imageUrl || extractFirstImage(content);

                return {
                    id: file.name.replace('.md', ''),
                    title: metadata.title || 'Untitled Project',
                    agency: metadata.agency || 'External',
                    duration: metadata.duration || 'Ongoing',
                    status: (metadata.status === 'Completed' ? 'Completed' : 'Ongoing'),
                    type: metadata.type || 'Government',
                    summary: metadata.summary || content.slice(0, 200),
                    content: content,
                    role: metadata.role,
                    tags: metadata.tags || [],
                    // 将会在 files/projects/ 下查找图片
                    imageUrl: resolveAssetUrl(rawImg, 'projects')
                } as Project;
            }));
            langs.forEach(l => newData[l].projects = projectItems);
        }

        // 3. Fetch Publications
        const pubFiles = await fetchFileList('publications');
        if (pubFiles.length > 0) {
            const pubItems = await Promise.all(pubFiles.map(async (file) => {
                const text = await fetchFileContent(file.download_url);
                const { metadata, content } = parseMarkdown(text);
                const rawImg = metadata.imageUrl || extractFirstImage(content);

                return {
                    id: file.name.replace('.md', ''),
                    title: metadata.title || 'Untitled Paper',
                    authors: metadata.authors || ['ICS Lab'],
                    venue: metadata.venue || 'Preprint',
                    year: parseInt(metadata.year) || new Date().getFullYear(),
                    // 这里将会自动生成 .../files/publications/filename.pdf
                    pdfUrl: resolveAssetUrl(metadata.pdfUrl, 'publications'),
                    slidesUrl: resolveAssetUrl(metadata.slidesUrl, 'publications'),
                    posterUrl: resolveAssetUrl(metadata.posterUrl, 'publications'),
                    imageUrl: resolveAssetUrl(rawImg, 'publications'),
                    codeUrl: metadata.codeUrl,
                    demoUrl: metadata.demoUrl,
                    abstract: content, 
                    tags: metadata.tags || [],
                    citationCount: metadata.citationCount ? parseInt(metadata.citationCount) : 0,
                    track: metadata.track,
                    topic: metadata.topic,
                    location: metadata.location
                } as Publication;
            }));
            pubItems.sort((a, b) => b.year - a.year);
            langs.forEach(l => newData[l].publications = pubItems);
        }

        return newData;

    } catch (error) {
        console.error("CMS: Critical error fetching dynamic data", error);
        return staticData;
    }
};