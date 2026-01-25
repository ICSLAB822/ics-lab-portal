import React, { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun, Languages, Terminal, Search } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { AppData, Lang } from '../types';
import SearchModal from './SearchModal';

interface NavbarProps {
  lang: Lang;
  setLang: (l: Lang) => void;
  isDark: boolean;
  toggleTheme: () => void;
  labels: AppData['ui']['nav'];
  data: AppData;
}

const Navbar: React.FC<NavbarProps> = ({ lang, setLang, isDark, toggleTheme, labels, data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close Search on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsSearchOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Get Logo URL from data (configured in lab-info.md)
  const logoUrl = data.labInfo.logoUrl;

  const navLinks = [
    { name: labels.home, path: '/' },
    { name: labels.news, path: '/news' },
    { name: labels.projects, path: '/projects' },
    { name: labels.pubs, path: '/publications' },
    { name: labels.people, path: '/people' },
    { name: labels.gallery, path: '/gallery' },
    { name: labels.joinUs, path: '/join-us' },
    { name: labels.contact, path: '/contact' },
  ];

  const getLinkClass = (path: string) => {
    const isActive = location.pathname === path;
    const base = "font-mono text-sm px-2 py-1 transition-colors relative group";
    if (isActive) return `${base} text-blue-600 dark:text-blue-400 font-bold`;
    return `${base} text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400`;
  };

  return (
    <>
    <nav className={`fixed w-full z-50 transition-all duration-300 border-b ${
      scrolled 
        ? 'bg-white/95 dark:bg-black/95 border-slate-200 dark:border-slate-800 backdrop-blur-sm' 
        : 'bg-white dark:bg-black border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-3 group">
             {logoUrl && !logoError ? (
                 <img
                    src={logoUrl}
                    alt="ICS LAB Logo"
                    className="h-10 w-10 rounded-full object-cover bg-white"
                    onError={() => setLogoError(true)}
                 />
             ) : (
                 <div className="text-blue-600 dark:text-blue-500">
                    <Terminal size={20} strokeWidth={2.5} />
                 </div>
             )}
             <span className="font-mono font-bold text-lg tracking-tight text-slate-900 dark:text-white">
                ICS_LAB<span className="animate-pulse">_</span>
             </span>
          </Link>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
             {navLinks.map((link) => (
                <Link key={link.name} to={link.path} className={getLinkClass(link.path)}>
                   <span className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-300 dark:text-slate-600 mr-1">[</span>
                   {link.name}
                   <span className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-300 dark:text-slate-600 ml-1">]</span>
                </Link>
             ))}

             <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 mx-4"></div>

             <div className="flex items-center gap-1">
                {/* Search Button */}
                <button 
                    onClick={() => setIsSearchOpen(true)}
                    className="p-2 text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
                    title="Search"
                >
                    <Search size={18} />
                </button>

                <button 
                    onClick={toggleTheme}
                    className="p-2 text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
                    title="Toggle Theme"
                >
                    {isDark ? <Sun size={18} /> : <Moon size={18} />}
                </button>
                <button 
                    onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
                    className="p-2 text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 font-mono text-xs font-bold"
                    title="Switch Language"
                >
                    {lang === 'en' ? 'CN' : 'EN'}
                </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-3">
            <button 
                onClick={() => setIsSearchOpen(true)}
                className="text-slate-500 dark:text-slate-400 p-1"
            >
                <Search size={20} />
            </button>
            <button onClick={toggleTheme} className="text-slate-500 dark:text-slate-400 p-1">
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-900 dark:text-white p-1"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white dark:bg-black border-b border-slate-200 dark:border-slate-800">
            <div className="flex flex-col p-4 space-y-2">
                {navLinks.map((link) => (
                    <Link
                        key={link.name}
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className="font-mono text-lg py-2 px-4 border-l-2 border-transparent hover:border-blue-500 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300"
                    >
                        {link.name}
                    </Link>
                ))}
                <div className="border-t border-slate-100 dark:border-slate-800 mt-4 pt-4">
                    <button 
                        onClick={() => { setLang(lang === 'en' ? 'zh' : 'en'); setIsOpen(false); }}
                        className="font-mono text-sm px-4 py-2 text-slate-500"
                    >
                        Switch Language: {lang === 'en' ? 'CN' : 'EN'}
                    </button>
                </div>
            </div>
        </div>
      )}
    </nav>
    
    <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        data={data}
    />
    </>
  );
};

export default Navbar;