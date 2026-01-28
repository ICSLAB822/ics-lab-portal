
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import GallerySection from './components/GallerySection';
import PublicationsSection from './components/PublicationsSection';
import PeopleSection from './components/PeopleSection';
import ProjectsSection from './components/ProjectsSection';
import Footer from './components/Footer';
import NewsSection from './components/NewsSection';
import NewsDetail from './components/NewsDetail'; 
import ProjectDetail from './components/ProjectDetail'; 
import ContactPage from './components/ContactPage';
import PublicationDetail from './components/PublicationDetail';
import JoinUsPage from './components/JoinUsPage'; 
import LoadingScreen from './components/LoadingScreen';
import AnnouncementBanner from './components/AnnouncementBanner';
import { Lang, AppData } from './types';
import { useDynamicData } from './hooks/useDynamicData';
import { Bell } from 'lucide-react';

type ThemePreference = 'system' | 'dark' | 'light';

const getInitialThemePreference = (): ThemePreference => {
  try {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light' || stored === 'system') return stored;
  } catch (e) {
    // ignore
  }
  return 'system';
};

// Wrapper for standard pages to give them top padding since Navbar is fixed
const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Scroll to top when page changes
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className="pt-16 min-h-screen bg-white dark:bg-black">
            {children}
        </div>
    );
};

const HomePage: React.FC<{ data: AppData }> = ({ data }) => {
    // Keep internal state for announcement visibility
    const [showAnnouncement, setShowAnnouncement] = useState(!!data.announcement);
    // Flag to keep AnnouncementBanner mounted during exit animation
    const [shouldRenderBanner, setShouldRenderBanner] = useState(!!data.announcement);

    useEffect(() => {
        if (data.announcement) {
            setShowAnnouncement(true);
            setShouldRenderBanner(true);
        } else {
            setShouldRenderBanner(false);
        }
    }, [data.announcement]);

    const handleDismiss = () => {
        // 1. Trigger slide-up animation
        setShowAnnouncement(false);
        // 2. Wait for animation to finish before unmounting (700ms matches CSS duration)
        setTimeout(() => {
            setShouldRenderBanner(false);
            // Unlock scroll just in case
            document.body.style.overflow = '';
        }, 700);
    };

    // Lock body scroll when banner is visible
    useEffect(() => {
        if (shouldRenderBanner && showAnnouncement) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [shouldRenderBanner, showAnnouncement]);

    return (
        <>
            {/* Hero is always rendered underneath */}
            <div className="relative">
                <Hero 
                    info={data.labInfo} 
                    news={data.news} 
                    labels={data.ui}
                />
                
                {/* Recall Badge - visible when announcement exists but is dismissed */}
                {data.announcement && !showAnnouncement && (
                    <button
                        onClick={() => {
                            setShouldRenderBanner(true);
                            // Small delay to allow render before animation
                            requestAnimationFrame(() => {
                                setShowAnnouncement(true);
                            });
                        }}
                        className="fixed top-20 right-4 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur border border-slate-200 dark:border-slate-700 shadow-lg px-3 py-1.5 rounded-full flex items-center gap-2 text-xs font-mono font-bold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-105 transition-all animate-in fade-in slide-in-from-top-4 duration-500"
                    >
                        <Bell size={14} className="text-yellow-500 animate-pulse" />
                        <span className="uppercase tracking-wider">Notice</span>
                    </button>
                )}
            </div>

            {/* Announcement Banner Overlay */}
            {shouldRenderBanner && data.announcement && (
                <div 
                    className={`fixed inset-0 z-[100] transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] ${
                        showAnnouncement ? 'translate-y-0' : '-translate-y-full'
                    }`}
                >
                    <AnnouncementBanner 
                        announcement={data.announcement} 
                        onDismiss={handleDismiss} 
                    />
                </div>
            )}
        </>
    );
};

const RouteThemeManager: React.FC = () => null;

const App: React.FC = () => {
  const [lang, setLang] = useState<Lang>('en');
  const [themePreference, setThemePreference] = useState<ThemePreference>(getInitialThemePreference);
  const [systemPrefersDark, setSystemPrefersDark] = useState(() => {
    try {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch (e) {
      return false;
    }
  });

  // === Dynamic Data Integration ===
  const { data: dynamicData, loading } = useDynamicData();

  const isDark = themePreference === 'dark' || (themePreference === 'system' && systemPrefersDark);

  // Track system theme changes
  useEffect(() => {
    let mql: MediaQueryList | null = null;
    try {
      mql = window.matchMedia('(prefers-color-scheme: dark)');
    } catch (e) {
      return;
    }
    setSystemPrefersDark(mql.matches);

    const handler = (e: MediaQueryListEvent) => setSystemPrefersDark(e.matches);
    if (typeof mql.addEventListener === 'function') {
      mql.addEventListener('change', handler);
      return () => mql.removeEventListener('change', handler);
    }

    // Safari < 14
    // eslint-disable-next-line deprecation/deprecation
    mql.addListener(handler);
    // eslint-disable-next-line deprecation/deprecation
    return () => mql.removeListener(handler);
  }, []);

  // Persist user preference
  useEffect(() => {
    try {
      localStorage.setItem('theme', themePreference);
    } catch (e) {
      // ignore
    }
  }, [themePreference]);

  // Toggle Theme Class on <html>
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Show loading screen while fetching CMS data
  if (loading || !dynamicData) {
    return <LoadingScreen />;
  }

  const toggleTheme = () => {
    const nextIsDark = !isDark;
    setThemePreference(nextIsDark ? 'dark' : 'light');
  };
  const currentData = dynamicData[lang];

  return (
    <Router>
        <RouteThemeManager />
        <div className="min-h-screen bg-white dark:bg-black flex flex-col font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300">
        <Navbar 
            lang={lang} 
            setLang={setLang} 
            isDark={isDark} 
            toggleTheme={toggleTheme}
            labels={currentData.ui.nav}
            data={currentData}
        />
        <main className="flex-grow">
            <Routes>
                {/* Home Page: Announcement replaces Hero when active, otherwise show Hero */}
                <Route path="/" element={<HomePage data={currentData} />} />

                {/* News Page */}
                <Route path="/news" element={
                    <PageWrapper>
                        <NewsSection news={currentData.news} labels={currentData.ui.news} />
                    </PageWrapper>
                } />

                {/* News Detail Page */}
                <Route path="/news/:id" element={
                    <PageWrapper>
                        <NewsDetail news={currentData.news} />
                    </PageWrapper>
                } />

                {/* Projects Page */}
                <Route path="/projects" element={
                    <PageWrapper>
                        <ProjectsSection projects={currentData.projects} labels={currentData.ui.projects} />
                    </PageWrapper>
                } />

                {/* Project Detail Page - NEW */}
                <Route path="/projects/:id" element={
                    <PageWrapper>
                        <ProjectDetail projects={currentData.projects} />
                    </PageWrapper>
                } />

                {/* Publications Page */}
                <Route path="/publications" element={
                    <PageWrapper>
                        <PublicationsSection publications={currentData.publications} labels={currentData.ui.pubs} />
                    </PageWrapper>
                } />

                {/* Single Publication Detail Page */}
                <Route path="/publications/:id" element={
                    <PageWrapper>
                        <PublicationDetail publications={currentData.publications} />
                    </PageWrapper>
                } />

                {/* People/Members Page */}
                <Route path="/members" element={
                    <PageWrapper>
                        <PeopleSection people={currentData.people} labels={currentData.ui.people} />
                    </PageWrapper>
                } />
                {/* Legacy route for backward compatibility */}
                <Route path="/people" element={
                    <PageWrapper>
                        <PeopleSection people={currentData.people} labels={currentData.ui.people} />
                    </PageWrapper>
                } />

                {/* Gallery/Activities Page */}
                <Route path="/gallery" element={
                    <PageWrapper>
                        <GallerySection albums={currentData.gallery} labels={currentData.ui.gallery} />
                    </PageWrapper>
                } />

                {/* Join Us Page - NEW */}
                <Route path="/join-us" element={
                    <PageWrapper>
                        <JoinUsPage data={currentData.joinUs} labels={currentData.ui.joinUs} />
                    </PageWrapper>
                } />
                
                {/* Contact Page */}
                <Route path="/contact" element={
                    <PageWrapper>
                        <ContactPage 
                            info={currentData.labInfo} 
                            labels={currentData.ui.contactPage}
                            address={currentData.ui.footer.address}
                        />
                    </PageWrapper>
                } />
            </Routes>
        </main>
        <Footer 
            info={currentData.labInfo} 
            labels={currentData.ui.footer}
        /> 
        </div>
    </Router>
  );
};

export default App;
