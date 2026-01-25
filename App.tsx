
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
import LoadingScreen from './components/LoadingScreen'; // Import
import { Lang } from './types';
import { useDynamicData } from './hooks/useDynamicData'; // Import Hook

// Wrapper for standard pages to give them top padding since Navbar is fixed
const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Scroll to top when page changes
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className="pt-24 min-h-screen bg-white dark:bg-black transition-colors duration-300">
            {children}
        </div>
    );
};

// Route-based Theme Manager
// Currently disabled: All pages use dark theme by default
// Uncomment the logic below to enable route-based theme switching
const RouteThemeManager: React.FC<{ setIsDark: (v: boolean) => void }> = ({ setIsDark }) => {
    // const location = useLocation();
    // useEffect(() => {
    //     if (location.pathname === '/') {
    //         setIsDark(true);
    //     } else {
    //         setIsDark(false);
    //     }
    // }, [location.pathname, setIsDark]);

    return null;
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Lang>('en');
  const [isDark, setIsDark] = useState(true);

  // === Dynamic Data Integration ===
  const { data: dynamicData, loading } = useDynamicData();

  // Toggle Theme Class on Body
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

  const toggleTheme = () => setIsDark(!isDark);
  const currentData = dynamicData[lang];

  return (
    <Router>
        <RouteThemeManager setIsDark={setIsDark} />
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
                {/* Home Page: Keeps the Immersive Hero */}
                <Route path="/" element={
                    <Hero 
                        info={currentData.labInfo} 
                        news={currentData.news} 
                        labels={currentData.ui}
                    />
                } />

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

                {/* People Page */}
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
            isDark={true}
        /> 
        </div>
    </Router>
  );
};

export default App;
