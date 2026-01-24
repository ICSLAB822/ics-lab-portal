
import { AppData, Lang, Person, Project, GalleryAlbum, JoinUsData } from './types';

// ==========================================
// 🖼️ HERO BACKGROUND IMAGES / 首页背景图片配置
// ==========================================
const heroImages = [
  "public/gallery/20251215143924_4068_32.jpg",
];

const commonPubs = [
  {
    id: 'p-juice',
    title: 'Juice: Lightweight Foreground Prediction For On-Camera Surveillance Video Compression',
    authors: ['Jiajun Yan', 'Hongzi Zhu', 'Shan Chang', 'Li Li', 'Minyi Guo'],
    venue: 'IEEE INFOCOM 2026',
    year: 2026,
    location: 'Tokyo, Japan',
    pdfUrl: '#',
    slidesUrl: '#',
    posterUrl: '#',
    codeUrl: '#',
    tags: ['Video Compression', 'Edge Computing', 'Surveillance'],
    imageUrl: 'https://picsum.photos/id/250/600/400', // Placeholder for the diagram
    citationCount: 0,
    track: 'Conference',
    topic: 'Mobile Sensing',
    abstract: "Video surveillance plays a crucial role in modern society, fostering safer, smarter, and more efficient environments. However, it is of great challenge to transmit, store and analyze city-scale surveillance videos due to the massive amounts of data. In this work, we propose Juice, a lightweight surveillance video compression scheme that can be implemented on H.265-compliant cameras. The core idea of Juice is to effectively utilize the CU (Coding Unit) division information generated during the encoding process to predict tiles with foreground objects in each frame. Furthermore, redundant background tiles between frames are removed to minimize the compressed video size without compromising the downstream surveillance detection accuracy. We collect a real-world transportation traffic surveillance video datasets, consisting of 541 video clips recorded at 42 distinct locations. The results demonstrate that Juice is lightweight and can process at least 32 FPS at a resolution of 1920x1080 on a single-core common CPU."
  },
  {
    id: 'p1',
    title: 'Achieving Privacy-Preserving and Sybil-Resistant Truth Discovery in Mobile Crowdsensing',
    authors: ['Shan Chang', 'Yong Qi', 'Hongzi Zhu', 'Jizhong Zhao', 'Xuemin Shen'],
    venue: 'IEEE Transactions on Information Forensics and Security (TIFS)',
    year: 2019,
    pdfUrl: '#',
    slidesUrl: '#',
    posterUrl: '#',
    codeUrl: 'https://github.com/example/repo',
    demoUrl: 'https://demo.example.com/truth-discovery',
    tags: ['Privacy', 'Mobile Crowdsensing', 'Truth Discovery'],
    imageUrl: 'https://picsum.photos/id/1/300/200',
    citationCount: 156,
    googleScholarUrl: 'https://scholar.google.com/citations?user=ExampleID&hl=en',
    track: 'Journal',
    topic: 'Mobile Sensing',
    abstract: "Mobile crowdsensing has emerged as a promising paradigm for collecting sensing data. However, the reliability of data and the privacy of participants are two critical issues. In this paper, we propose a privacy-preserving and Sybil-resistant truth discovery framework. We design a novel cryptographic protocol to protect participants' sensory data and reliability scores while allowing the aggregation server to discover truths. Security analysis demonstrates that our scheme is secure against various attacks."
  },
  {
    id: 'p2',
    title: 'Sybil-Resistant Geo-Privacy Protection in Mobile Social Networks',
    authors: ['Shan Chang', 'Yong Qi', 'Hongzi Zhu', 'Jizhong Zhao', 'Xuemin Shen'],
    venue: 'IEEE Transactions on Mobile Computing (TMC)',
    year: 2020,
    pdfUrl: '#',
    slidesUrl: '#',
    tags: ['Geo-Privacy', 'Mobile Social Networks', 'Security'],
    imageUrl: 'https://picsum.photos/id/60/300/200',
    citationCount: 89,
    track: 'Journal',
    topic: 'Privacy Computing',
    abstract: "Location-based social networks (LBSNs) enable users to share their locations and find friends nearby. However, sharing location information raises serious privacy concerns. In this paper, we investigate the Sybil attacks in LBSNs where an adversary can create multiple fake identities to compromise user privacy. We propose a Sybil-resistant geo-privacy protection scheme that utilizes social trust and mobility patterns to detect and mitigate Sybil nodes effectively."
  },
  {
    id: 'p3',
    title: 'Privacy-Preserving Task Assignment in Spatial Crowdsourcing with Untrusted Server',
    authors: ['Shan Chang', 'Xingwen Li', 'Hongzi Zhu', 'Ting Lu', 'Yong Qi'],
    venue: 'IEEE Transactions on Parallel and Distributed Systems (TPDS)',
    year: 2018,
    pdfUrl: '#',
    codeUrl: '#',
    tags: ['Spatial Crowdsourcing', 'Privacy', 'Task Assignment'],
    imageUrl: 'https://picsum.photos/id/96/300/200',
    citationCount: 75,
    googleScholarUrl: 'https://scholar.google.com',
    track: 'Journal',
    topic: 'Mobile Sensing',
    abstract: "Spatial crowdsourcing platforms assign location-based tasks to workers. However, the location privacy of both workers and tasks is a major concern when the platform server is untrusted. We present a privacy-preserving task assignment scheme that matches tasks to workers based on their locations without revealing exact coordinates. Our approach leverages geo-indistinguishability and secure multi-party computation to ensure strong privacy guarantees."
  },
  {
    id: 'p4',
    title: 'Social-Aware Privacy-Preserving LBS for Mobile Social Networks',
    authors: ['Shan Chang', 'Hongzi Zhu', 'Mianxiong Dong', 'Kaoru Ota', 'Yong Qi'],
    venue: 'IEEE Transactions on Vehicular Technology (TVT)',
    year: 2019,
    pdfUrl: '#',
    tags: ['LBS', 'Privacy', 'Social Networks'],
    imageUrl: 'https://picsum.photos/id/160/300/200',
    citationCount: 68,
    googleScholarUrl: 'https://scholar.google.com',
    track: 'Journal',
    topic: 'Privacy Computing',
    abstract: "This paper addresses the privacy issues in social-aware location-based services. We propose a framework that considers the social relationships among users to adjust privacy protection levels dynamically. By incorporating social entropy, we achieve a balance between privacy preservation and quality of service."
  },
  {
    id: 'p5',
    title: 'Privacy-Preserving Verifiable Data Aggregation for Mobile Crowdsensing in Industrial IoT',
    authors: ['Shan Chang', 'Yong Qi', 'Hongzi Zhu', 'Ke Li'],
    venue: 'IEEE Internet of Things Journal',
    year: 2021,
    pdfUrl: '#',
    tags: ['IIoT', 'Data Aggregation', 'Privacy'],
    imageUrl: 'https://picsum.photos/id/180/300/200',
    citationCount: 52,
    googleScholarUrl: 'https://scholar.google.com',
    track: 'Journal',
    topic: 'IoT Security',
    abstract: "In Industrial IoT (IIoT), mobile crowdsensing can be used to monitor environmental conditions. We propose a privacy-preserving verifiable data aggregation scheme for IIoT. The scheme allows the industrial server to aggregate sensing data without accessing individual readings, while also enabling verification of data integrity to prevent injection attacks."
  },
  {
    id: 'p6',
    title: 'Federated Learning with Differential Privacy: Algorithms and Performance Analysis',
    authors: ['Wei Wei', 'Liu Liu', 'Shan Chang'],
    venue: 'IEEE Symposium on Security and Privacy (S&P)',
    year: 2023,
    pdfUrl: '#',
    demoUrl: 'https://demo.example.com/fl-dp',
    tags: ['Federated Learning', 'Differential Privacy', 'Algorithm'],
    imageUrl: 'https://picsum.photos/id/20/300/200',
    citationCount: 12,
    track: 'Conference',
    topic: 'Federated Learning',
    abstract: "Federated Learning (FL) allows collaborative model training without sharing raw data. However, model updates can still leak information. We introduce a differentially private FL algorithm that optimizes the trade-off between privacy budget and model accuracy. Extensive experiments show that our algorithm achieves superior performance compared to state-of-the-art methods."
  }
];

const projectsEn: Project[] = [
  {
    id: 'pr1',
    title: 'Privacy Preserving Mechanisms for Mobile Crowdsensing',
    agency: 'NSFC (National Natural Science Foundation of China)',
    duration: '2022 - 2025',
    status: 'Ongoing',
    type: 'Government',
    summary: 'Research on robust privacy preservation techniques balancing data utility and user privacy in large-scale mobile sensing environments.',
    role: 'Principal Investigator',
    tags: ['Crowdsensing', 'Privacy', 'Cryptography'],
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop',
    content: `This project addresses the critical conflict between data utility and privacy preservation in Mobile Crowdsensing (MCS). As MCS applications proliferate in smart city scenarios, participants are reluctant to share sensory data due to privacy concerns.
    
    Our research focuses on:
    1. **Local Differential Privacy (LDP) Mechanisms**: Designing optimized perturbation algorithms that provide rigorous privacy guarantees on the user side before data leaves the device.
    2. **Verifiable Truth Discovery**: Developing protocols that allow the server to aggregate data and estimate ground truth without accessing individual raw data, while ensuring workers cannot cheat.
    3. **Incentive Mechanisms**: Creating privacy-aware incentive schemes that compensate users fairly for their privacy loss.

    The project is expected to produce open-source libraries for privacy-preserving data collection and at least 5 high-impact journal publications.`
  },
  {
    id: 'pr2',
    title: 'Secure Edge Intelligence and Computing',
    agency: 'Shanghai Municipal Science and Technology Commission',
    duration: '2023 - 2026',
    status: 'Ongoing',
    type: 'Government',
    summary: 'Developing trustworthy AI frameworks for edge devices, focusing on verifiable computation and defense against adversarial attacks.',
    role: 'Principal Investigator',
    tags: ['Edge AI', 'Security', 'Adversarial Learning'],
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop',
    content: `Edge Intelligence (Edge AI) pushes model inference and training to the network edge, reducing latency and bandwidth usage. However, edge devices are often physically accessible and resource-constrained, making them vulnerable to attacks.

    This project aims to build a comprehensive security framework for Edge AI, covering:
    - **Model Security**: Protecting models from extraction and inversion attacks using watermarking and trusted execution environments (TEEs).
    - **Adversarial Robustness**: Developing lightweight defense mechanisms against adversarial examples suitable for embedded devices.
    - **Verifiable Computation**: Ensuring that the computation results returned by edge nodes are correct and haven't been tampered with.

    We collaborate with local industry partners to pilot these technologies in smart manufacturing scenarios.`
  },
  {
    id: 'pr3',
    title: 'Trustworthy Data Sharing in Industrial IoT',
    agency: 'Enterprise Cooperation',
    duration: '2021 - 2023',
    status: 'Completed',
    type: 'Industry',
    summary: 'Designed a blockchain-based data sharing protocol for industrial IoT applications to ensure data integrity and auditability.',
    role: 'Co-Investigator',
    tags: ['IIoT', 'Blockchain', 'Data Sharing'],
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop',
    content: `In the Industrial Internet of Things (IIoT), data sharing across different stakeholders (e.g., manufacturers, suppliers, maintenance providers) is essential but hindered by a lack of trust.

    We proposed and implemented a blockchain-based data sharing platform that ensures:
    1. **Data Integrity**: All sensory data records are immutably logged on a consortium blockchain.
    2. **Access Control**: Fine-grained, attribute-based encryption (ABE) schemes control who can decrypt and view specific data streams.
    3. **Auditability**: All data access and sharing activities are recorded, providing a clear audit trail for compliance.

    The system was successfully deployed in a pilot factory environment, demonstrating a 30% reduction in data reconciliation costs.`
  }
];

const projectsZh: Project[] = [
  {
    id: 'pr1',
    title: '面向移动群智感知的隐私保护机制研究',
    agency: 'NSFC (国家自然科学基金)',
    duration: '2022 - 2025',
    status: 'Ongoing',
    type: 'Government',
    summary: '研究在大规模移动感知环境下，平衡数据可用性与用户隐私的强健隐私保护技术。',
    role: '项目负责人',
    tags: ['群智感知', '隐私保护', '密码学'],
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop',
    content: `本项目旨在解决移动群智感知（MCS）中数据可用性与隐私保护之间的关键冲突。随着MCS应用在智慧城市场景中的普及，由于隐私顾虑，参与者往往不愿共享感知数据。
    
    我们的研究重点包括：
    1. **本地差分隐私（LDP）机制**：设计优化的扰动算法，在数据离开设备前为用户提供严格的隐私保证。
    2. **可验证真值发现**：开发允许服务器聚合数据并估计真值的协议，无需访问原始个人数据，同时确保工人无法作弊。
    3. **激励机制**：创建隐私感知的激励方案，公平补偿用户的隐私损失。

    该项目预计将产出用于隐私保护数据收集的开源库，并发表至少5篇高影响力的期刊论文。`
  },
  {
    id: 'pr2',
    title: '安全边缘智能与计算',
    agency: '上海市科委',
    duration: '2023 - 2026',
    status: 'Ongoing',
    type: 'Government',
    summary: '开发面向边缘设备的可信AI框架，重点关注可验证计算及对抗攻击防御。',
    role: '项目负责人',
    tags: ['边缘智能', '安全', '对抗学习'],
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop',
    content: `边缘智能（Edge AI）将模型推理和训练推向网络边缘，减少了延迟和带宽使用。然而，边缘设备通常在物理上易于接触且资源受限，这使其容易受到攻击。

    本项目旨在构建边缘AI的综合安全框架，涵盖：
    - **模型安全**：利用水印和可信执行环境（TEE）保护模型免受提取和反演攻击。
    - **对抗鲁棒性**：开发适用于嵌入式设备的轻量级对抗样本防御机制。
    - **可验证计算**：确保边缘节点返回的计算结果正确且未被篡改。

    我们与本地行业合作伙伴合作，在智能制造场景中试点这些技术。`
  },
  {
    id: 'pr3',
    title: '工业物联网可信数据共享',
    agency: '企业合作项目',
    duration: '2021 - 2023',
    status: 'Completed',
    type: 'Industry',
    summary: '设计了基于区块链的工业物联网数据共享协议，确保数据的完整性和可审计性。',
    role: '课题骨干',
    tags: ['工业物联网', '区块链', '数据共享'],
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop',
    content: `在工业物联网（IIoT）中，不同利益相关者（如制造商、供应商、维护提供商）之间的数据共享至关重要，但受限于缺乏信任。

    我们提出并实施了一个基于区块链的数据共享平台，确保：
    1. **数据完整性**：所有感知数据记录不可变地记录在联盟链上。
    2. **访问控制**：细粒度的基于属性的加密（ABE）方案控制谁可以解密和查看特定数据流。
    3. **可审计性**：所有数据访问和共享活动都被记录，为合规性提供清晰的审计跟踪。

    该系统已在试点工厂环境中成功部署，数据核对成本降低了30%。`
  }
];

const peopleEn: Person[] = [
  {
    id: '1',
    name: 'Dr. Shan Chang',
    role: 'Professor / Director',
    roleKey: 'Professor',
    imageUrl: 'https://picsum.photos/id/1011/400/400',
    email: 'schang@dhu.edu.cn',
    researchInterests: ['Privacy Computing', 'Mobile Crowdsensing', 'Network Security'],
    bio: "Dr. Shan Chang is a Professor at the School of Computer Science and Technology, Donghua University. Her research interests primarily include privacy protection, mobile crowdsensing, and Internet of Things security. She has published numerous papers in top-tier journals and conferences such as IEEE TMC, IEEE TIFS, IEEE TPDS, and INFOCOM. She serves as a reviewer for multiple authoritative international journals.",
    period: '2010 - Present'
  },
  {
    id: '2',
    name: 'Dr. Bob Smith',
    role: 'Associate Researcher',
    roleKey: 'Researcher',
    imageUrl: 'https://picsum.photos/id/1005/400/400',
    email: 'bsmith@dhu.edu.cn',
    researchInterests: ['AI Security', 'Federated Learning'],
    period: '2019 - Present'
  },
  {
    id: '3',
    name: 'Alice Chen',
    role: 'PhD Student',
    roleKey: 'PhD Student',
    imageUrl: 'https://picsum.photos/id/1027/400/400',
    researchInterests: ['LLM Safety', 'Privacy Preserving ML'],
    period: '2022 - Present'
  },
  {
    id: '4',
    name: 'David Lee',
    role: 'PhD Student',
    roleKey: 'PhD Student',
    imageUrl: 'https://picsum.photos/id/1012/400/400',
    researchInterests: ['Cloud Security', 'Trusted Computing'],
    period: '2021 - Present'
  },
  {
    id: '5',
    name: 'Frank Wright',
    role: 'Master Student',
    roleKey: 'Master Student',
    imageUrl: 'https://picsum.photos/id/338/400/400',
    researchInterests: ['IoT Security'],
    period: '2023 - Present'
  },
  {
    id: '6',
    name: 'Eve Green',
    role: 'Alumni',
    roleKey: 'Alumni',
    imageUrl: 'https://picsum.photos/id/64/400/400',
    researchInterests: ['Intrusion Detection'],
    website: 'https://linkedin.com',
    period: '2019 - 2023'
  }
];

const peopleZh: Person[] = [
  {
    id: '1',
    name: '常姗 博士',
    role: '教授 / 实验室主任',
    roleKey: 'Professor',
    imageUrl: 'https://picsum.photos/id/1011/400/400',
    email: 'schang@dhu.edu.cn',
    researchInterests: ['隐私计算', '移动群智感知', '网络安全'],
    bio: "常姗，东华大学计算机科学与技术学院教授，博士生导师。主要研究方向包括隐私保护、移动群智感知、物联网安全等。在 IEEE TMC, IEEE TIFS, IEEE TPDS, INFOCOM 等顶级期刊和会议上发表多篇高水平论文。担任多个国际权威期刊审稿人。",
    period: '2010 - 至今'
  },
  {
    id: '2',
    name: '鲍勃·史密斯',
    role: '副研究员',
    roleKey: 'Researcher',
    imageUrl: 'https://picsum.photos/id/1005/400/400',
    email: 'bsmith@dhu.edu.cn',
    researchInterests: ['AI 安全', '联邦学习'],
    period: '2019 - 至今'
  },
  {
    id: '3',
    name: '陈爱丽',
    role: '博士生',
    roleKey: 'PhD Student',
    imageUrl: 'https://picsum.photos/id/1027/400/400',
    researchInterests: ['大模型安全', '隐私计算'],
    period: '2022 - 至今'
  },
  {
    id: '4',
    name: '李大卫',
    role: '博士生',
    roleKey: 'PhD Student',
    imageUrl: 'https://picsum.photos/id/1012/400/400',
    researchInterests: ['云安全', '可信计算'],
    period: '2021 - 至今'
  },
  {
    id: '5',
    name: '弗兰克·赖特',
    role: '硕士生',
    roleKey: 'Master Student',
    imageUrl: 'https://picsum.photos/id/338/400/400',
    researchInterests: ['物联网安全'],
    period: '2023 - 至今'
  },
  {
    id: '6',
    name: '伊芙·格林',
    role: '校友',
    roleKey: 'Alumni',
    imageUrl: 'https://picsum.photos/id/64/400/400',
    researchInterests: ['入侵检测'],
    website: 'https://linkedin.com',
    period: '2019 - 2023'
  }
];

// Reorganized Gallery Data into Albums
const galleryDataEn: GalleryAlbum[] = [
    {
        id: 'album-1',
        title: 'Academic Conferences',
        date: '2023',
        coverUrl: 'https://picsum.photos/id/60/800/600',
        description: 'Members of ICS Lab presenting their latest research at top-tier security conferences including USENIX Security, IEEE S&P, and INFOCOM.',
        items: [
            { id: 'g3', imageUrl: 'https://picsum.photos/id/60/800/600', caption: 'Oral presentation at USENIX Security 2023' },
            { id: 'g6', imageUrl: 'https://picsum.photos/id/1/800/600', caption: 'Poster session discussion' },
            { id: 'g7', imageUrl: 'https://picsum.photos/id/45/800/600', caption: 'Networking with international peers' },
        ]
    },
    {
        id: 'album-2',
        title: 'Team Building & Events',
        date: '2023',
        coverUrl: 'https://picsum.photos/id/2/800/600',
        description: 'Annual team building activities, graduation ceremonies, and holiday celebrations to foster strong bonds within the lab.',
        items: [
            { id: 'g2', imageUrl: 'https://picsum.photos/id/2/800/600', caption: 'Hiking trip during the annual team building retreat' },
            { id: 'g8', imageUrl: 'https://picsum.photos/id/88/800/600', caption: 'Lab dinner gathering' },
            { id: 'g9', imageUrl: 'https://picsum.photos/id/102/800/600', caption: 'Badminton tournament' },
        ]
    },
    {
        id: 'album-3',
        title: 'Daily Lab Life',
        date: 'Ongoing',
        coverUrl: 'https://picsum.photos/id/20/800/600',
        description: 'A glimpse into the daily research routine, seminars, and collaborative environment at the Innovation of Cyber Security Lab.',
        items: [
             { id: 'g1', imageUrl: 'https://picsum.photos/id/20/800/600', caption: 'Cyber Range Drill in progress' },
             { id: 'g4', imageUrl: 'https://picsum.photos/id/180/800/600', caption: 'Weekly Security Seminar discussion' },
             { id: 'g5', imageUrl: 'https://picsum.photos/id/119/800/600', caption: 'Collaboration with industry partners' },
             { id: 'g10', imageUrl: 'https://picsum.photos/id/48/800/600', caption: 'Deep focus coding session' },
        ]
    }
];

const galleryDataZh: GalleryAlbum[] = [
    {
        id: 'album-1',
        title: '学术会议交流',
        date: '2023',
        coverUrl: 'https://picsum.photos/id/60/800/600',
        description: 'ICS 实验室成员在 USENIX Security, IEEE S&P, INFOCOM 等顶级安全会议上展示最新研究成果。',
        items: [
            { id: 'g3', imageUrl: 'https://picsum.photos/id/60/800/600', caption: 'USENIX Security 2023 口头报告' },
            { id: 'g6', imageUrl: 'https://picsum.photos/id/1/800/600', caption: 'Poster 环节学术讨论' },
            { id: 'g7', imageUrl: 'https://picsum.photos/id/45/800/600', caption: '与国际同行交流' },
        ]
    },
    {
        id: 'album-2',
        title: '团队建设与活动',
        date: '2023',
        coverUrl: 'https://picsum.photos/id/2/800/600',
        description: '年度团建活动、毕业典礼和节日庆祝，增强实验室团队凝聚力。',
        items: [
            { id: 'g2', imageUrl: 'https://picsum.photos/id/2/800/600', caption: '年度团建徒步旅行' },
            { id: 'g8', imageUrl: 'https://picsum.photos/id/88/800/600', caption: '实验室聚餐' },
            { id: 'g9', imageUrl: 'https://picsum.photos/id/102/800/600', caption: '羽毛球比赛' },
        ]
    },
    {
        id: 'album-3',
        title: '实验室日常',
        date: 'Ongoing',
        coverUrl: 'https://picsum.photos/id/20/800/600',
        description: '记录 ICS 实验室的日常研究、研讨会和协作环境。',
        items: [
             { id: 'g1', imageUrl: 'https://picsum.photos/id/20/800/600', caption: '网络靶场攻防演练' },
             { id: 'g4', imageUrl: 'https://picsum.photos/id/180/800/600', caption: '每周安全研讨会' },
             { id: 'g5', imageUrl: 'https://picsum.photos/id/119/800/600', caption: '产学研合作交流' },
             { id: 'g10', imageUrl: 'https://picsum.photos/id/48/800/600', caption: '专注的科研时刻' },
        ]
    }
];

// JOIN US DATA (ENGLISH)
const joinUsEn: JoinUsData = {
    intro: "We are always looking for self-motivated students and researchers to join us. At ICS Lab, you will have the opportunity to work on cutting-edge research in cyber security and privacy, collaborating with top-tier partners from both academia and industry.",
    positions: [
        {
            title: "PhD Students",
            type: "PhD",
            description: "We are looking for students with strong mathematical background and coding skills. You will work on top-tier research projects and aim for publications in CCF-A conferences/journals.",
            requirements: ["Strong background in CS/Math", "Good programming skills (C++/Python)", "Fluent in English reading and writing", "Passion for security research"]
        },
        {
            title: "Master Students",
            type: "Master",
            description: "We encourage Master students to participate in both research and engineering projects. You will gain hands-on experience in building secure systems.",
            requirements: ["Solid CS fundamentals", "Experience with system programming", "Self-motivated and responsible"]
        },
        {
            title: "Undergraduate Interns",
            type: "Intern",
            description: "Open to undergraduates from Donghua University and other universities. We provide mentorship for students interested in getting a head start in research.",
            requirements: ["GPA top 20%", "Strong learning ability", "Can commit at least 6 months"]
        }
    ],
    placements: [
        {
            category: "Academia",
            items: ["University of Waterloo (Postdoc)", "Shanghai Jiao Tong University (PhD)", "Fudan University (PhD)", "Zhejiang University (PhD)", "Donghua University (Faculty)"]
        },
        {
            category: "Industry",
            items: ["Huawei (2012 Lab)", "Tencent (Keen Lab)", "Alibaba Group", "Bytedance", "Microsoft", "Google", "Palo Alto Networks"]
        }
    ],
    faq: [
        {
            question: "Do I need to have prior research experience?",
            answer: "Not necessarily. While prior experience is a plus, we value your potential, mathematical foundation, and coding skills more. We will provide training for new members."
        },
        {
            question: "What is the funding support like?",
            answer: "We provide competitive monthly allowances for all PhD and Master students. Additional performance-based bonuses are awarded for top-tier publications."
        },
        {
            question: "Can I apply for an internship if I am not from Donghua University?",
            answer: "Yes, we welcome visiting students from other universities. However, you need to ensure you can commit enough time (usually at least 3 days a week) to the lab."
        }
    ],
    applicationGuide: {
        title: "How to Apply",
        email: "schang@dhu.edu.cn",
        subjectFormat: "[Apply] {Degree} - {Your Name} - {University}",
        materials: ["CV / Resume", "Transcripts", "Personal Statement", "Representative Publications (if any)"]
    }
};

// JOIN US DATA (CHINESE)
const joinUsZh: JoinUsData = {
    intro: "我们一直在寻找积极进取、自我驱动的学生和研究人员加入我们。在 ICS 实验室，你将有机会参与网络安全和隐私计算领域的前沿研究，并与学术界和工业界的顶尖合作伙伴共事。",
    positions: [
        {
            title: "博士研究生",
            type: "PhD",
            description: "我们招收具有扎实数学基础和编程能力的博士生。你将参与国家级科研项目，并以在 CCF-A 类会议/期刊发表高水平论文为目标。",
            requirements: ["计算机/数学相关专业背景", "优秀的编程能力 (C++/Python)", "流利的英语读写能力", "对安全研究充满热情"]
        },
        {
            title: "硕士研究生",
            type: "Master",
            description: "我们鼓励硕士生参与科研探索与工程实践。你将获得构建安全系统的第一手经验，提升解决实际问题的能力。",
            requirements: ["扎实的计算机基础", "熟悉系统编程", "自我驱动，责任心强"]
        },
        {
            title: "本科实习生",
            type: "Intern",
            description: "面向东华大学及外校优秀本科生开放。我们为有志于提前接触科研的同学提供一对一指导。",
            requirements: ["GPA 前 20%", "极强的学习能力", "至少能实习 6 个月"]
        }
    ],
    placements: [
        {
            category: "Academia",
            items: ["滑铁卢大学 (博士后)", "上海交通大学 (博士)", "复旦大学 (博士)", "浙江大学 (博士)", "东华大学 (教职)"]
        },
        {
            category: "Industry",
            items: ["华为 (2012实验室)", "腾讯 (科恩实验室)", "阿里巴巴", "字节跳动", "微软", "谷歌", "Palo Alto Networks"]
        }
    ],
    faq: [
        {
            question: "申请需要有科研经历吗？",
            answer: "不一定。虽然有科研经历是加分项，但我们更看重你的潜力、数学基础和代码能力。实验室会为新成员提供系统的科研训练。"
        },
        {
            question: "实验室的补助待遇如何？",
            answer: "我们为所有博士和硕士生提供具有竞争力的月度津贴。对于发表高水平论文的同学，实验室不仅全额资助参会，还会提供丰厚的科研奖励。"
        },
        {
            question: "外校学生可以申请实习吗？",
            answer: "可以，我们欢迎外校的访问学生。但你需要确保有足够的时间（通常每周至少3天）投入到实验室的工作中。"
        }
    ],
    applicationGuide: {
        title: "申请流程",
        email: "schang@dhu.edu.cn",
        subjectFormat: "[申请] {学位} - {姓名} - {学校}",
        materials: ["个人简历 (CV)", "成绩单", "个人陈述", "代表性论文 (如有)"]
    }
};


export const data: Record<Lang, AppData> = {
  en: {
    labInfo: {
      name: "ICS LAB",
      fullName: "Innovation of Cyber Security Laboratory",
      description: "ICS LAB focuses on the critical intersection of cyber security, privacy computing, and mobile crowd sensing. Our mission is to build secure, trustworthy, and resilient infrastructures for the digital era.",
      researchAreas: [
        "Network Security",
        "Privacy Computing",
        "Mobile Sensing",
        "IoT Security"
      ],
      bannerText: "Accepting PhD Applications for Fall 2024",
      heroImages: heroImages
    },
    news: [
      {
        id: '1',
        date: '2023-10-15',
        title: 'Paper Accepted at IEEE TMC',
        summary: 'Our work on privacy-preserving location based services has been accepted for publication in IEEE Transactions on Mobile Computing. This paper proposes a novel framework for obfuscating location data without compromising service utility.',
        content: `We are pleased to announce that our latest research paper, titled "Differentially Private Location Privacy in Mobile Social Networks," has been accepted for publication in the prestigious IEEE Transactions on Mobile Computing (TMC).
        
        This work addresses the critical challenge of balancing location privacy with service utility in the era of ubiquitous mobile social networks. Traditional location obfuscation techniques often render location-based services (LBS) inaccurate. Our proposed framework introduces a novel geo-indistinguishability mechanism that adapts to the local density of users, ensuring rigorous privacy guarantees while maintaining high service quality.
        
        Key contributions of this work include:
        1. A formal definition of social-aware geo-indistinguishability.
        2. An efficient algorithm for generating optimal noise distributions.
        3. Extensive evaluation on real-world datasets demonstrating superior performance over state-of-the-art methods.
        
        We believe this research paves the way for more trustworthy and privacy-respecting mobile applications. The full paper will be available in the upcoming issue of IEEE TMC.`,
        tag: 'Journal',
        imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop'
      },
      {
        id: '2',
        date: '2023-09-01',
        title: 'Welcome New PhD Students',
        summary: 'We are thrilled to welcome three new PhD students joining ICS LAB this Fall semester. They bring diverse backgrounds in cryptography, machine learning, and systems security.',
        content: `ICS LAB is growing! We are excited to welcome three talented new PhD students to our research family this Fall semester.
        
        **Alice Chen** joins us from Tsinghua University. Her research will focus on the intersection of Large Language Models (LLMs) and security, specifically investigating adversarial attacks on generative AI models.
        
        **David Lee** received his Master's degree from SJTU. He will be working on Trusted Execution Environments (TEEs) and cloud security, aiming to build verifiable computing platforms for sensitive data processing.
        
        **Michael Brown** comes with 2 years of industry experience in penetration testing. His research will explore IoT security and firmware analysis.
        
        Please join us in giving them a warm welcome! We look forward to the innovative ideas and energy they will bring to the lab.`,
        tag: 'Team',
        imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop'
      },
      {
        id: '3',
        date: '2023-08-20',
        title: 'Grant Awarded by NSFC',
        summary: 'ICS LAB has received a new grant to study privacy-preserving computation in edge networks. This 4-year project aims to develop lightweight protocols for resource-constrained IoT devices.',
        content: `We are proud to announce that ICS LAB has been awarded a competitive General Program grant from the National Natural Science Foundation of China (NSFC).
        
        The project, titled "Lightweight Privacy-Preserving Computation for Edge Intelligence," addresses the security bottlenecks in deploying AI on edge devices. As IoT devices become more powerful, shifting computation from the cloud to the edge offers latency and bandwidth benefits. However, it also exposes sensitive user data to new attack vectors.
        
        Over the next four years, our team will:
        - Develop hardware-friendly cryptographic primitives for edge devices.
        - Design privacy-preserving federated learning protocols optimized for unstable network connections.
        - Build a prototype smart home system demonstrating our secure edge intelligence framework.
        
        This grant will support two PhD students and facilitate collaboration with international partners.`,
        tag: 'Funding',
        imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2070&auto=format&fit=crop'
      }
    ],
    gallery: galleryDataEn,
    publications: commonPubs,
    people: peopleEn,
    projects: projectsEn,
    joinUs: joinUsEn,
    ui: {
      nav: { home: 'Home', news: 'News', projects: 'Projects', gallery: 'Activities', pubs: 'Publications', people: 'People', contact: 'Contact', joinUs: 'Join Us' },
      hero: { viewPubs: 'View Publications', meetTeam: 'Meet the Team' },
      gallery: { 
          title: 'Lab Life', 
          subtitle: 'Capturing moments from our research journey, conferences, and team events.',
          backToAlbums: 'Back to Albums',
          photosCount: 'Photos'
      },
      news: { title: 'Hot News', subtitle: 'Latest updates from the lab, including accepted papers, new members, and grants.', readMore: 'Read more', latest: 'Hot News', viewAll: 'View All' },
      pubs: { title: 'Publications', subtitle: 'Selected research papers appearing in top-tier security conferences and journals.', allYears: 'All Years', latestPaper: 'Latest Paper' },
      people: { title: 'Our Team', subtitle: 'Meet the researchers and students protecting our digital future.' },
      projects: { title: 'Research Projects', subtitle: 'Our funded research initiatives advancing the state of the art in security and AI.', ongoing: 'Ongoing', completed: 'Completed' },
      joinUs: {
        title: 'Join Us',
        subtitle: 'Start your research journey with ICS Lab.',
        alumniTitle: 'Alumni Placement',
        openPositionsTitle: 'Open Positions',
        faqTitle: 'Frequently Asked Questions',
        applyTitle: 'Apply Now'
      },
      contactPage: {
        title: 'Get in Touch',
        subtitle: 'We welcome collaboration and academic exchange. Here is how you can find us.',
        infoTitle: 'Contact Info',
        environmentTitle: 'Lab Environment',
        buildingLabel: 'Information Science & Tech Center',
        entranceLabel: 'Lab Entrance',
        vrTitle: 'VR Lab Tour',
        vrDesc: 'Experience our research facilities remotely through our interactive 3D tour.',
        pathTitle: 'Path from North Gate',
        pathSteps: [
          { title: 'North Gate Entrance', desc: 'Enter Donghua University through the North Gate on Renmin North Road.' },
          { title: 'Go Straight', desc: 'Walk straight along the main avenue for about 400 meters.' },
          { title: 'Information Center', desc: 'Locate the Information Science & Technology Center (Building No. 2) on your left.' },
          { title: 'To the Lab', desc: 'Take the elevator to the 4th floor, turn right to find ICS Lab.' }
        ]
      },
      footer: { 
        resources: 'Resources', 
        contact: 'Contact Us', 
        designed: 'Designed for Science.',
        address: [
          'School of Computer Science & Technology',
          'Donghua University',
          '2999 North Renmin Road, Shanghai'
        ]
      }
    }
  },
  zh: {
    labInfo: {
      name: "ICS LAB",
      fullName: "网络空间安全创新实验室",
      description: "ICS LAB 专注于网络安全、隐私计算以及移动群智感知的交叉前沿领域。我们的使命是为数字时代构建安全、可信且具有韧性的基础设施。",
      researchAreas: [
        "网络安全",
        "隐私计算",
        "移动感知",
        "物联网安全"
      ],
      bannerText: "2024 秋季博士生招生中",
      heroImages: heroImages
    },
    news: [
      {
        id: '1',
        date: '2023-10-15',
        title: '论文被 IEEE TMC 接收',
        summary: '我们在隐私保护位置服务方面的工作已被 IEEE Transactions on Mobile Computing 接收。该论文提出了一种新的框架，用于在不损害服务可用性的前提下混淆位置数据。',
        content: `很高兴地宣布，我们最新的研究论文《Differentially Private Location Privacy in Mobile Social Networks》已被顶级期刊 IEEE Transactions on Mobile Computing (TMC) 接收发表。
        
        这项工作解决了移动社交网络普及时代中，平衡位置隐私与服务效用的关键挑战。传统的位置混淆技术往往导致基于位置的服务（LBS）变得不准确。我们提出的框架引入了一种新颖的地理不可区分性机制，该机制能够适应用户的局部密度，在确保严格的隐私保证的同时，保持高质量的服务体验。
        
        本研究的主要贡献包括：
        1. 提出了社会感知地理不可区分性的形式化定义。
        2. 设计了一种生成最优噪声分布的高效算法。
        3. 在真实数据集上进行了广泛的评估，证明了其性能优于当前最先进的方法。
        
        我们相信这项研究将为构建更可信、更尊重隐私的移动应用铺平道路。全文将发表在即将出版的 IEEE TMC 期刊上。`,
        tag: '期刊',
        imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop'
      },
      {
        id: '2',
        date: '2023-09-01',
        title: '欢迎新博士生加入',
        summary: '我们非常高兴地欢迎三位新博士生在这个秋季学期加入 ICS LAB。他们带来了密码学、机器学习和系统安全方面的多元化背景。',
        content: `ICS LAB 正在不断壮大！我们非常兴奋地在这个秋季学期欢迎三位才华横溢的新博士生加入我们的研究大家庭。
        
        **陈爱丽** 毕业于清华大学。她的研究将聚焦于大语言模型（LLM）与安全的交叉领域，特别是研究生成式 AI 模型的对抗攻击与防御。
        
        **李大卫** 在上海交通大学获得硕士学位。他将致力于可信执行环境（TEE）和云安全的研究，旨在构建用于敏感数据处理的可验证计算平台。
        
        **Michael Brown** 拥有两年的渗透测试行业经验。他的研究将探索物联网安全和固件分析。
        
        请和我们一起热烈欢迎他们的加入！我们期待他们为实验室带来创新的想法和活力。`,
        tag: '团队',
        imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop'
      },
      {
        id: '3',
        date: '2023-08-20',
        title: '获得国家自然科学基金资助',
        summary: 'ICS LAB 获得了一项新的 NSFC 资助，用于研究边缘网络中的隐私保护计算。这一为期4年的项目旨在为资源受限的物联网设备开发轻量级协议。',
        content: `我们很荣幸地宣布，ICS LAB 获得了国家自然科学基金（NSFC）面上项目的资助。
        
        该项目题为“面向边缘智能的轻量级隐私保护计算研究”，旨在解决在边缘设备上部署人工智能时的安全瓶颈。随着物联网设备变得越来越强大，将计算从云端转移到边缘带来了低延迟和带宽优势。然而，这也将敏感的用户数据暴露在了新的攻击向量之下。
        
        在接下来的四年里，我们的团队将：
        - 为边缘设备开发硬件友好的密码学原语。
        - 设计针对不稳定网络连接优化的隐私保护联邦学习协议。
        - 构建一个智能家居系统原型，展示我们的安全边缘智能框架。
        
        这笔资助将支持两名博士生的研究工作，并促进与国际合作伙伴的交流。`,
        tag: '基金',
        imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2070&auto=format&fit=crop'
      }
    ],
    gallery: galleryDataZh,
    publications: commonPubs,
    people: peopleZh,
    projects: projectsZh,
    joinUs: joinUsZh,
    ui: {
      nav: { home: '首页', news: '新闻', projects: '科研项目', gallery: '实验室动态', pubs: '论文发表', people: '成员', contact: '联系我们', joinUs: '加入我们' },
      hero: { viewPubs: '查看论文', meetTeam: '认识团队' },
      gallery: { 
          title: '实验室生活', 
          subtitle: '记录我们的研究旅程、会议风采和团队活动瞬间。',
          backToAlbums: '返回相册列表',
          photosCount: '张照片'
      },
      news: { title: '热门新闻', subtitle: '实验室的最新动态，包括论文接收、新成员加入和科研项目。', readMore: '阅读更多', latest: '热门新闻', viewAll: '查看全部' },
      pubs: { title: '发表论文', subtitle: '在顶级安全会议和期刊上发表的精选研究论文。', allYears: '所有年份', latestPaper: '最新论文' },
      people: { title: '团队成员', subtitle: '认识推动我们创新的研究人员和学生。' },
      projects: { title: '科研项目', subtitle: '我们正在进行的国家级课题与企业合作研究项目。', ongoing: '进行中', completed: '已结题' },
      joinUs: {
        title: '加入我们',
        subtitle: '开启你在 ICS 实验室的科研之旅。',
        alumniTitle: '毕业生去向',
        openPositionsTitle: '开放职位',
        faqTitle: '常见问题',
        applyTitle: '立即申请'
      },
      contactPage: {
        title: '联系我们',
        subtitle: '欢迎学术交流与合作，以下是指引您找到我们的详细信息。',
        infoTitle: '基本信息',
        environmentTitle: '环境概览',
        buildingLabel: '图文信息中心大楼',
        entranceLabel: '实验室门头',
        vrTitle: 'VR 实景导航',
        vrDesc: '通过交互式全景漫游，远程参观我们的实验环境。',
        pathTitle: '北门入校指引',
        pathSteps: [
          { title: '北门进入', desc: '从人民北路东华大学松江校区北门进入校园。' },
          { title: '直行', desc: '沿主干道直行约400米，经过镜月湖旁。' },
          { title: '图文信息中心', desc: '左侧即为图文信息中心大楼（2号学院楼）。' },
          { title: '到达实验室', desc: '乘坐电梯至4楼，出电梯右转即可到达 ICS Lab。' }
        ]
      },
      footer: { 
        resources: '相关资源', 
        contact: '联系方式', 
        designed: 'Designed for Science.',
        address: [
          '计算机科学与技术学院',
          '东华大学',
          '上海市松江区人民北路2999号'
        ]
      }
    }
  }
};
