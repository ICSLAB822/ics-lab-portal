import { AppData, NewsItem, Publication, Project, Person, GalleryAlbum, GalleryItem, JoinUsData, Lang } from '../types';
import { parseMarkdown, extractFirstImage } from './markdown';

// =================================================================
// ⚙️ 本地内容管理配置
// =================================================================

// 基础路径配置（相对于网站根目录）
const BASE_PATH = (import.meta as any).env?.BASE_URL || '/';

// 内容文件路径
const CONTENT_BASE = `${BASE_PATH}content`;

// 资源文件路径
export const ASSETS_BASE = `${BASE_PATH}files`;

// 内容索引文件路径
const CONTENT_INDEX_PATH = `${BASE_PATH}content-index.json`;

interface ContentIndex {
  generated: string;
  files: {
    news: string[];
    projects: string[];
    publications: string[];
    people: string[];
    gallery: string[];
    pages: string[];
  };
  heroImages: string[];
}

// 获取内容索引
const fetchContentIndex = async (): Promise<ContentIndex | null> => {
  try {
    const res = await fetch(CONTENT_INDEX_PATH);
    if (!res.ok) {
      console.warn(`Failed to fetch content index: ${res.status}`);
      return null;
    }
    return await res.json();
  } catch (e) {
    console.warn('Failed to load content index:', e);
    return null;
  }
};

// 获取文件内容
const fetchFileContent = async (relativePath: string): Promise<string> => {
  try {
    const url = `${CONTENT_BASE}/${relativePath}`;
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`Failed to fetch file: ${url}`);
      return '';
    }
    return await res.text();
  } catch (e) {
    console.warn(`Failed to fetch file content: ${relativePath}`, e);
    return '';
  }
};

// 从索引中获取 hero 图片列表
const getHeroImagesFromIndex = (index: ContentIndex): string[] => {
  if (!index.heroImages || index.heroImages.length === 0) {
    return [];
  }

  // 构建完整的 URL
  return index.heroImages.map(filename => `${ASSETS_BASE}/hero/${filename}`);
};

// 解析资源 URL
const resolveAssetUrl = (url: string | undefined, folder: string): string | undefined => {
  if (!url || url === '#' || url === '') return undefined;

  const trimmed = url.trim();

  // 1. 如果是完整链接 (http/https)，直接返回
  if (trimmed.startsWith('http') || trimmed.startsWith('https')) return trimmed;

  // 2. 清理文件名 (移除 ./ 或 /)
  const cleanFilename = trimmed.replace(/^(\.\/|\/)/, '');

  // 3. 构建最终 URL：指向本地 files 文件夹
  const finalUrl = `${ASSETS_BASE}/${folder}/${cleanFilename}`;

  return finalUrl;
};

// 主数据获取函数
export const fetchDynamicData = async (): Promise<Record<Lang, AppData>> => {
  console.log('📦 Loading content from local files...');

  // 创建默认数据结构
  const defaultData: Record<Lang, AppData> = {
    en: {
      labInfo: {
        name: 'ICS LAB',
        fullName: 'Innovation of Cyber Security Laboratory',
        description: 'A research laboratory focused on cybersecurity, privacy, and mobile computing.',
        researchAreas: [],
        bannerText: 'Welcome to ICS LAB',
        heroImages: [],
      },
      news: [],
      publications: [],
      projects: [],
      people: [],
      gallery: [],
      joinUs: {
        intro: '',
        positions: [],
        placements: [],
        faq: [],
        applicationGuide: {
          title: '',
          email: '',
          subjectFormat: '',
          materials: [],
        },
      },
      ui: {
        nav: { home: 'Home', news: 'News', projects: 'Projects', pubs: 'Publications', people: 'People', gallery: 'Gallery', contact: 'Contact', joinUs: 'Join Us' },
        hero: { welcome: 'Welcome', explore: 'Explore' },
        gallery: { title: 'Gallery', subtitle: 'Lab activities and moments', backToAlbums: 'Back to Albums', photosCount: 'photos' },
        news: { title: 'News', subtitle: 'Latest updates from our lab', readMore: 'Read More', latest: 'Latest', viewAll: 'View All' },
        pubs: { title: 'Publications', subtitle: 'Our research papers', allYears: 'All Years', latestPaper: 'Latest Paper' },
        people: { title: 'People', subtitle: 'Meet our team' },
        projects: { title: 'Projects', subtitle: 'Our research projects', ongoing: 'Ongoing', completed: 'Completed' },
        joinUs: { title: 'Join Us', subtitle: 'Opportunities at our lab', alumniTitle: 'Alumni Placements', openPositionsTitle: 'Open Positions', faqTitle: 'FAQ', applyTitle: 'How to Apply' },
        contactPage: {
          title: 'Contact Us',
          subtitle: 'Get in touch with our lab',
          infoTitle: 'Contact Information',
          environmentTitle: 'Lab Environment',
          buildingLabel: 'Building',
          entranceLabel: 'Entrance',
          vrTitle: 'Virtual Tour',
          vrDesc: 'Take a virtual tour of our lab',
          pathTitle: 'How to Find Us',
          pathSteps: [],
        },
        footer: { resources: 'Resources', contact: 'Contact', designed: 'Designed by ICS Lab', address: ['East China Normal University', 'Shanghai, China'] },
      },
    },
    zh: {
      labInfo: {
        name: 'ICS 实验室',
        fullName: '网络安全创新实验室',
        description: '专注于网络安全、隐私保护和移动计算的研究实验室。',
        researchAreas: [],
        bannerText: '欢迎来到 ICS 实验室',
        heroImages: [],
      },
      news: [],
      publications: [],
      projects: [],
      people: [],
      gallery: [],
      joinUs: {
        intro: '',
        positions: [],
        placements: [],
        faq: [],
        applicationGuide: {
          title: '',
          email: '',
          subjectFormat: '',
          materials: [],
        },
      },
      ui: {
        nav: { home: '首页', news: '新闻', projects: '项目', pubs: '论文', people: '成员', gallery: '相册', contact: '联系', joinUs: '加入我们' },
        hero: { welcome: '欢迎', explore: '探索' },
        gallery: { title: '相册', subtitle: '实验室活动与瞬间', backToAlbums: '返回相册', photosCount: '张照片' },
        news: { title: '新闻', subtitle: '实验室最新动态', readMore: '阅读更多', latest: '最新', viewAll: '查看全部' },
        pubs: { title: '论文', subtitle: '我们的研究成果', allYears: '全部年份', latestPaper: '最新论文' },
        people: { title: '成员', subtitle: '认识我们的团队' },
        projects: { title: '项目', subtitle: '我们的研究项目', ongoing: '进行中', completed: '已完成' },
        joinUs: { title: '加入我们', subtitle: '实验室招聘信息', alumniTitle: '毕业去向', openPositionsTitle: '招聘岗位', faqTitle: '常见问题', applyTitle: '如何申请' },
        contactPage: {
          title: '联系我们',
          subtitle: '与实验室取得联系',
          infoTitle: '联系信息',
          environmentTitle: '实验室环境',
          buildingLabel: '大楼',
          entranceLabel: '入口',
          vrTitle: '虚拟参观',
          vrDesc: '虚拟参观我们的实验室',
          pathTitle: '如何找到我们',
          pathSteps: [],
        },
        footer: { resources: '资源', contact: '联系方式', designed: 'ICS 实验室设计', address: ['华东师范大学', '中国上海'] },
      },
    },
  };

  try {
    // 1. 加载内容索引
    const index = await fetchContentIndex();
    if (!index) {
      console.error('Failed to load content index');
      return defaultData;
    }

    console.log(`📑 Content index loaded (${index.files.news?.length || 0} news, ${index.files.projects?.length || 0} projects, ${index.files.publications?.length || 0} publications, ${index.files.people?.length || 0} people, ${index.files.gallery?.length || 0} albums)`);

    const langs: Lang[] = ['en', 'zh'];

    // 2. 加载 Hero 图片（从索引中）
    const heroImages = getHeroImagesFromIndex(index);
    if (heroImages.length > 0) {
      langs.forEach(l => defaultData[l].labInfo.heroImages = heroImages);
      console.log(`🖼️  Loaded ${heroImages.length} hero images`);
    }

    // 3. 加载新闻
    if (index.files.news.length > 0) {
      const newsItems = await Promise.all(
        index.files.news.map(async (filePath) => {
          const text = await fetchFileContent(filePath);
          if (!text) return null;

          const { metadata, content } = parseMarkdown(text);
          const rawImg = metadata.imageUrl || extractFirstImage(content);

          return {
            id: filePath.replace('news/', '').replace('.md', ''),
            date: metadata.date || new Date().toISOString(),
            title: metadata.title || 'Untitled',
            summary: metadata.summary || content.slice(0, 150) + '...',
            content: content,
            tag: metadata.tag || 'News',
            imageUrl: resolveAssetUrl(rawImg, 'news'),
          } as NewsItem;
        })
      );

      const validNews = newsItems.filter((item): item is NewsItem => item !== null);
      validNews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      langs.forEach(l => defaultData[l].news = validNews);
    }

    // 4. 加载项目
    if (index.files.projects.length > 0) {
      const projectItems = await Promise.all(
        index.files.projects.map(async (filePath) => {
          const text = await fetchFileContent(filePath);
          if (!text) return null;

          const { metadata, content } = parseMarkdown(text);
          const rawImg = metadata.imageUrl || extractFirstImage(content);

          return {
            id: filePath.replace('projects/', '').replace('.md', ''),
            title: metadata.title || 'Untitled Project',
            agency: metadata.agency || 'External',
            duration: metadata.duration || 'Ongoing',
            status: (metadata.status === 'Completed' ? 'Completed' : 'Ongoing') as 'Ongoing' | 'Completed',
            type: metadata.type || 'Government',
            summary: metadata.summary || content.slice(0, 200),
            content: content,
            role: metadata.role,
            tags: metadata.tags || [],
            imageUrl: resolveAssetUrl(rawImg, 'projects'),
          } as Project;
        })
      );

      const validProjects = projectItems.filter((item): item is Project => item !== null);
      langs.forEach(l => defaultData[l].projects = validProjects);
    }

    // 5. 加载论文
    if (index.files.publications.length > 0) {
      const pubItems = await Promise.all(
        index.files.publications.map(async (filePath) => {
          const text = await fetchFileContent(filePath);
          if (!text) return null;

          const { metadata, content } = parseMarkdown(text);
          const rawImg = metadata.imageUrl || extractFirstImage(content);

          return {
            id: filePath.replace('publications/', '').replace('.md', ''),
            title: metadata.title || 'Untitled Paper',
            authors: metadata.authors || ['ICS Lab'],
            venue: metadata.venue || 'Preprint',
            year: parseInt(metadata.year) || new Date().getFullYear(),
            pdfUrl: resolveAssetUrl(metadata.pdfUrl, 'publications'),
            slidesUrl: resolveAssetUrl(metadata.slidesUrl, 'publications'),
            posterUrl: resolveAssetUrl(metadata.posterUrl, 'publications'),
            imageUrl: resolveAssetUrl(rawImg, 'publications'),
            imageCaption: metadata.imageCaption || 'System Architecture',
            codeUrl: metadata.codeUrl,
            demoUrl: metadata.demoUrl,
            abstract: content,
            tags: metadata.tags || [],
            citationCount: metadata.citationCount ? parseInt(metadata.citationCount) : 0,
            track: metadata.track,
            topic: metadata.topic,
            location: metadata.location,
          } as Publication;
        })
      );

      const validPubs = pubItems.filter((item): item is Publication => item !== null);
      validPubs.sort((a, b) => b.year - a.year);
      langs.forEach(l => defaultData[l].publications = validPubs);
    }

    // 6. 加载团队成员
    if (index.files.people && index.files.people.length > 0) {
      const peopleItemsEn: Person[] = [];
      const peopleItemsZh: Person[] = [];

      await Promise.all(
        index.files.people.map(async (filePath) => {
          const text = await fetchFileContent(filePath);
          if (!text) return;

          const { metadata, content } = parseMarkdown(text);
          const rawImg = metadata.imageUrl;

          // 分离中英文 bio（如果有）
          const [bioEn, bioZh] = content.split('---').map(s => s.trim());

          // 根据 role 判断分类（用于筛选）
          // 返回 { roleKey, categoryOrder } 以支持自定义分组顺序
          const getRoleKeyWithOrder = (role: string): { roleKey: Person['roleKey']; categoryOrder: number } => {
            const r = role.toLowerCase();
            if (r.includes('professor') || r.includes('教授')) return { roleKey: 'Professor', categoryOrder: 0 };
            if (r.includes('researcher') || r.includes('研究员')) return { roleKey: 'Researcher', categoryOrder: 1 };
            if (r.includes('lecturer') || r.includes('讲师')) return { roleKey: 'Researcher', categoryOrder: 2 }; // 讲师作为 Researcher 的变体，但排序在前
            if (r.includes('phd') || r.includes('博士')) return { roleKey: 'PhD Student', categoryOrder: 3 };
            if (r.includes('alumni') || r.includes('毕业')) return { roleKey: 'Alumni', categoryOrder: 5 };
            return { roleKey: 'Master Student', categoryOrder: 4 };
          };

          const roleEn = metadata.role_en || metadata.role || '';
          const { roleKey: resolvedRoleKey, categoryOrder } = getRoleKeyWithOrder(roleEn);

          const basePerson = {
            id: metadata.id || filePath.replace('people/', '').replace('.md', ''),
            imageUrl: resolveAssetUrl(rawImg, 'people') || '',
            email: metadata.email || '',
            website: metadata.website || '',
            period: '',
            roleKey: resolvedRoleKey,
            order: metadata.order ? parseInt(metadata.order) : 999,
            categoryOrder: categoryOrder,
          };

          peopleItemsEn.push({
            ...basePerson,
            name: metadata.name_en || metadata.name || 'Unknown',
            role: roleEn,
            researchInterests: metadata.researchInterests_en || metadata.researchInterests || [],
            bio: bioEn || '',
            period: metadata.period_en || metadata.period || '',
            institution: metadata.institution || '',
            department: metadata.department || '',
            title: metadata.roleKey || '',
          } as Person);

          peopleItemsZh.push({
            ...basePerson,
            name: metadata.name_zh || metadata.name || 'Unknown',
            role: metadata.role_zh || metadata.role || '',
            researchInterests: metadata.researchInterests_zh || metadata.researchInterests || [],
            bio: bioZh || bioEn || '',
            period: metadata.period_zh || metadata.period || '',
            institution: metadata.institution_zh || metadata.institution || '',
            department: metadata.department_zh || metadata.department || '',
            title: metadata.roleKey_zh || metadata.roleKey || '',
          } as Person);
        })
      );

      // 按 order 排序
      const sortByOrder = (a: Person, b: Person) => {
        const orderA = parseInt((a as any).order) || 999;
        const orderB = parseInt((b as any).order) || 999;
        return orderA - orderB;
      };
      peopleItemsEn.sort(sortByOrder);
      peopleItemsZh.sort(sortByOrder);

      defaultData.en.people = peopleItemsEn;
      defaultData.zh.people = peopleItemsZh;
      console.log(`👥 Loaded ${peopleItemsEn.length} people`);
    }

    // 7. 加载相册
    if (index.files.gallery && index.files.gallery.length > 0) {
      const galleryItemsEn: GalleryAlbum[] = [];
      const galleryItemsZh: GalleryAlbum[] = [];

      await Promise.all(
        index.files.gallery.map(async (filePath) => {
          const text = await fetchFileContent(filePath);
          if (!text) return;

          const { metadata } = parseMarkdown(text);

          const baseAlbum = {
            id: metadata.id || filePath.replace('gallery/', '').replace('.md', ''),
            date: metadata.date || '',
            coverUrl: resolveAssetUrl(metadata.coverUrl, 'gallery') || '',
          };

          // 解析相册项目
          const itemsEn: GalleryItem[] = (metadata.items || []).map((item: any) => ({
            id: item.id,
            imageUrl: resolveAssetUrl(item.imageUrl, 'gallery') || '',
            caption: item.caption_en || item.caption || '',
          }));

          const itemsZh: GalleryItem[] = (metadata.items || []).map((item: any) => ({
            id: item.id,
            imageUrl: resolveAssetUrl(item.imageUrl, 'gallery') || '',
            caption: item.caption_zh || item.caption || '',
          }));

          galleryItemsEn.push({
            ...baseAlbum,
            title: metadata.title_en || metadata.title || '',
            description: metadata.description_en || metadata.description || '',
            items: itemsEn,
          } as GalleryAlbum);

          galleryItemsZh.push({
            ...baseAlbum,
            title: metadata.title_zh || metadata.title || '',
            description: metadata.description_zh || metadata.description || '',
            items: itemsZh,
          } as GalleryAlbum);
        })
      );

      // 按 order 排序
      const sortByOrder = (a: GalleryAlbum, b: GalleryAlbum) => {
        const orderA = parseInt((a as any).order) || 999;
        const orderB = parseInt((b as any).order) || 999;
        return orderA - orderB;
      };
      galleryItemsEn.sort(sortByOrder);
      galleryItemsZh.sort(sortByOrder);

      defaultData.en.gallery = galleryItemsEn;
      defaultData.zh.gallery = galleryItemsZh;
      console.log(`🖼️  Loaded ${galleryItemsEn.length} gallery albums`);
    }

    // 8. 加载页面配置（lab-info 和 join-us）
    if (index.files.pages && index.files.pages.length > 0) {
      for (const filePath of index.files.pages) {
        const text = await fetchFileContent(filePath);
        if (!text) continue;

        const { metadata } = parseMarkdown(text);

        if (filePath.includes('lab-info')) {
          // 加载实验室信息
          const logoUrl = resolveAssetUrl(metadata.logoUrl, 'logo');

          defaultData.en.labInfo = {
            ...defaultData.en.labInfo,
            name: metadata.name_en || defaultData.en.labInfo.name,
            fullName: metadata.fullName_en || defaultData.en.labInfo.fullName,
            description: metadata.description_en || defaultData.en.labInfo.description,
            researchAreas: metadata.researchAreas_en || defaultData.en.labInfo.researchAreas,
            bannerText: metadata.bannerText_en || defaultData.en.labInfo.bannerText,
            logoUrl: logoUrl,
          };
          defaultData.zh.labInfo = {
            ...defaultData.zh.labInfo,
            name: metadata.name_zh || defaultData.zh.labInfo.name,
            fullName: metadata.fullName_zh || defaultData.zh.labInfo.fullName,
            description: metadata.description_zh || defaultData.zh.labInfo.description,
            researchAreas: metadata.researchAreas_zh || defaultData.zh.labInfo.researchAreas,
            bannerText: metadata.bannerText_zh || defaultData.zh.labInfo.bannerText,
            logoUrl: logoUrl,
          };

          // 加载联系页面配置
          if (metadata.contact) {
            defaultData.en.ui.footer.address = metadata.contact.address_en || defaultData.en.ui.footer.address;
            defaultData.zh.ui.footer.address = metadata.contact.address_zh || defaultData.zh.ui.footer.address;
          }
          if (metadata.contactPage) {
            defaultData.en.ui.contactPage = {
              ...defaultData.en.ui.contactPage,
              buildingLabel: metadata.contactPage.buildingLabel_en || defaultData.en.ui.contactPage.buildingLabel,
              entranceLabel: metadata.contactPage.entranceLabel_en || defaultData.en.ui.contactPage.entranceLabel,
              vrTitle: metadata.contactPage.vrTitle_en || defaultData.en.ui.contactPage.vrTitle,
              vrDesc: metadata.contactPage.vrDesc_en || defaultData.en.ui.contactPage.vrDesc,
              pathTitle: metadata.contactPage.pathTitle_en || defaultData.en.ui.contactPage.pathTitle,
              pathSteps: metadata.contactPage.pathSteps_en || defaultData.en.ui.contactPage.pathSteps,
            };
            defaultData.zh.ui.contactPage = {
              ...defaultData.zh.ui.contactPage,
              buildingLabel: metadata.contactPage.buildingLabel_zh || defaultData.zh.ui.contactPage.buildingLabel,
              entranceLabel: metadata.contactPage.entranceLabel_zh || defaultData.zh.ui.contactPage.entranceLabel,
              vrTitle: metadata.contactPage.vrTitle_zh || defaultData.zh.ui.contactPage.vrTitle,
              vrDesc: metadata.contactPage.vrDesc_zh || defaultData.zh.ui.contactPage.vrDesc,
              pathTitle: metadata.contactPage.pathTitle_zh || defaultData.zh.ui.contactPage.pathTitle,
              pathSteps: metadata.contactPage.pathSteps_zh || defaultData.zh.ui.contactPage.pathSteps,
            };
          }
          console.log('🏠 Loaded lab info');
        }

        if (filePath.includes('join-us')) {
          // 加载加入我们页面
          const parseJoinUs = (lang: 'en' | 'zh'): JoinUsData => ({
            intro: metadata[`intro_${lang}`] || '',
            positions: (metadata.positions || []).map((p: any) => ({
              title: p[`title_${lang}`] || p.title || '',
              type: p.type,
              description: p[`description_${lang}`] || p.description || '',
              requirements: p[`requirements_${lang}`] || p.requirements || [],
            })),
            placements: (metadata.placements || []).map((p: any) => ({
              category: p.category,
              items: p[`items_${lang}`] || p.items || [],
            })),
            faq: (metadata.faq || []).map((f: any) => ({
              question: f[`question_${lang}`] || f.question || '',
              answer: f[`answer_${lang}`] || f.answer || '',
            })),
            applicationGuide: {
              title: metadata.applicationGuide?.[`title_${lang}`] || '',
              email: metadata.applicationGuide?.email || '',
              subjectFormat: metadata.applicationGuide?.[`subjectFormat_${lang}`] || '',
              materials: metadata.applicationGuide?.[`materials_${lang}`] || [],
            },
          });

          defaultData.en.joinUs = parseJoinUs('en');
          defaultData.zh.joinUs = parseJoinUs('zh');
          console.log('📋 Loaded join us data');
        }
      }
    }

    console.log('✅ Content loaded successfully');
    return defaultData;

  } catch (error) {
    console.error('❌ Critical error loading content:', error);
    return defaultData;
  }
};
