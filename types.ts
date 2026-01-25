
export type Lang = 'en' | 'zh';

export interface NewsItem {
  id: string;
  date: string;
  title: string;
  summary: string;
  content?: string; // New field for full article content
  tag: string;
  imageUrl?: string; // New field for news thumbnail
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  caption: string;
}

export interface GalleryAlbum {
  id: string;
  title: string;
  date: string;
  coverUrl: string;
  description?: string;
  items: GalleryItem[];
}

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  pdfUrl?: string;
  slidesUrl?: string;
  posterUrl?: string; // New: Link to conference poster
  codeUrl?: string;
  demoUrl?: string; // New: Link to online demo/system
  abstract?: string;
  tags?: string[];
  imageUrl?: string; // New field for publication thumbnail
  imageCaption?: string; // New: Caption for the main image
  citationCount?: number; // New: Number of citations
  googleScholarUrl?: string; // New: Link to Google Scholar entry
  track?: string; // New: Track/Category (e.g. 'Journal', 'Conference')
  topic?: string; // New: Research Topic (e.g. 'Federated Learning', 'Mobile Sensing')
  location?: string; // New: Conference location (e.g. 'Tokyo, Japan')
}

export interface Person {
  id: string;
  name: string;
  role: string;
  roleKey: 'Professor' | 'Researcher' | 'PhD Student' | 'Master Student' | 'Alumni'; // Used for filtering regardless of display name
  imageUrl: string;
  email?: string;
  website?: string;
  researchInterests: string[];
  bio?: string;
  period?: string; // Time period at the lab (e.g. "2022 - Present" or "2018 - 2022")
  institution?: string; // Institution name (e.g. "Donghua University")
  department?: string; // Department name
  title?: string; // Display title (e.g. "ICS LAB Director")
  order?: number; // Sorting order (defined in markdown frontmatter)
  categoryOrder?: number; // Display order of category group (for custom category ordering)
}

export interface Project {
  id: string;
  title: string;
  agency: string; // Funding agency
  duration: string;
  status: 'Ongoing' | 'Completed';
  summary: string;
  type: 'Government' | 'Industry';
  content?: string; // New: Full description
  role?: string; // New: Role in project (e.g. PI, Co-PI)
  tags?: string[]; // New: Technical tags
  imageUrl?: string; // New: Cover image
}

export interface LabInfo {
  name: string;
  fullName: string;
  description: string;
  researchAreas: string[];
  bannerText: string;
  heroImages: string[]; // Background images for the hero section
  logoUrl?: string; // Logo image URL
}

// === NEW TYPES FOR JOIN US PAGE ===
export interface OpenPosition {
    title: string;
    type: 'PhD' | 'Master' | 'Intern' | 'Postdoc';
    description: string;
    requirements: string[];
}

export interface AlumniPlacement {
    category: 'Academia' | 'Industry';
    items: string[]; // List of universities or companies
}

export interface FAQItem {
    question: string;
    answer: string;
}

export interface JoinUsData {
    intro: string;
    positions: OpenPosition[];
    placements: AlumniPlacement[];
    faq: FAQItem[];
    applicationGuide: {
        title: string;
        email: string;
        subjectFormat: string;
        materials: string[];
    };
}

export interface AppData {
  labInfo: LabInfo;
  news: NewsItem[];
  gallery: GalleryAlbum[]; 
  publications: Publication[];
  people: Person[];
  projects: Project[];
  joinUs: JoinUsData; // New field
  ui: {
    nav: { [key: string]: string };
    hero: { [key: string]: string };
    gallery: { title: string; subtitle: string; backToAlbums: string; photosCount: string };
    news: { title: string; subtitle: string; readMore: string; latest: string; viewAll: string };
    pubs: { title: string; subtitle: string; allYears: string; latestPaper: string };
    people: { title: string; subtitle: string };
    projects: { title: string; subtitle: string; ongoing: string; completed: string }; 
    joinUs: { title: string; subtitle: string; alumniTitle: string; openPositionsTitle: string; faqTitle: string; applyTitle: string }; // New labels
    contactPage: {
        title: string;
        subtitle: string;
        infoTitle: string;
        environmentTitle: string;
        buildingLabel: string;
        entranceLabel: string;
        vrTitle: string;
        vrDesc: string;
        pathTitle: string;
        pathSteps: { title: string; desc: string }[];
    };
    footer: { resources: string; contact: string; designed: string; address: string[] };
  }
}
