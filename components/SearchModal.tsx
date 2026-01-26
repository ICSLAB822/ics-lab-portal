
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, FileText, User, Folder, Newspaper, ArrowRight, ChevronRight } from 'lucide-react';
import { AppData, Publication, NewsItem, Project, Person } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: AppData;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, data }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{
    pubs: Publication[];
    news: NewsItem[];
    projects: Project[];
    people: Person[];
  }>({ pubs: [], news: [], projects: [], people: [] });
  
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setQuery(''); // Reset query on close
    }
  }, [isOpen]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  // Search Logic
  useEffect(() => {
    if (!query.trim()) {
      setResults({ pubs: [], news: [], projects: [], people: [] });
      return;
    }

    const q = query.toLowerCase();

    const pubs = data.publications.filter(p => 
      p.title.toLowerCase().includes(q) || 
      p.venue.toLowerCase().includes(q) ||
      p.authors.some(a => a.toLowerCase().includes(q))
    ).slice(0, 5); // Limit to 5

    const news = data.news.filter(n => 
      n.title.toLowerCase().includes(q) || 
      n.summary.toLowerCase().includes(q)
    ).slice(0, 3);

    const projects = data.projects.filter(p => 
      p.title.toLowerCase().includes(q) || 
      p.summary.toLowerCase().includes(q)
    ).slice(0, 3);

    const people = data.people.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.researchInterests.some(r => r.toLowerCase().includes(q))
    ).slice(0, 4);

    setResults({ pubs, news, projects, people });
  }, [query, data]);

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  if (!isOpen) return null;

  const hasResults = Object.values(results).some(arr => arr.length > 0);

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-white/90 dark:bg-black/90 backdrop-blur-md" 
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-black border border-slate-200 dark:border-slate-800 shadow-2xl rounded-lg overflow-hidden flex flex-col max-h-[80vh]">
        
        {/* Header / Input */}
        <div className="flex items-center px-4 py-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
            <Search className="text-slate-400 mr-3" size={24} />
            <input 
                ref={inputRef}
                type="text" 
                placeholder="Search research, news, projects, people..." 
                className="flex-1 bg-transparent border-none outline-none text-xl text-slate-900 dark:text-white placeholder-slate-400 font-sans"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button 
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
                <X size={20} />
            </button>
        </div>

        {/* Results Area */}
        <div className="overflow-y-auto p-2 scroll-smooth">
            {!query && (
                <div className="p-8 text-center text-slate-400 font-mono text-sm">
                    Type to start searching...
                </div>
            )}

            {query && !hasResults && (
                <div className="p-8 text-center text-slate-500 dark:text-slate-400 font-mono text-sm">
                    No results found for "{query}".
                </div>
            )}

            {/* Results Groups */}
            <div className="space-y-6 p-2">
                
                {/* News */}
                {results.news.length > 0 && (
                    <div>
                        <h3 className="text-xs font-bold font-mono text-slate-500 uppercase tracking-wider mb-2 px-2">News</h3>
                        <div className="space-y-1">
                            {results.news.map(item => (
                                <button 
                                    key={item.id}
                                    onClick={() => handleNavigate(`/news/${item.id}`)}
                                    className="w-full flex items-start gap-3 p-3 rounded-md hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors text-left group"
                                >
                                    <Newspaper className="mt-0.5 text-slate-400 group-hover:text-blue-500" size={16} />
                                    <div>
                                        <div className="font-bold text-slate-900 dark:text-white text-sm">{item.title}</div>
                                        <div className="text-xs text-slate-500 truncate max-w-md">{item.summary}</div>
                                    </div>
                                    <ChevronRight className="ml-auto opacity-0 group-hover:opacity-100 text-slate-400" size={14}/>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Publications */}
                {results.pubs.length > 0 && (
                    <div>
                        <h3 className="text-xs font-bold font-mono text-slate-500 uppercase tracking-wider mb-2 px-2">Publications</h3>
                        <div className="space-y-1">
                            {results.pubs.map(item => (
                                <button 
                                    key={item.id}
                                    onClick={() => handleNavigate(`/publications/${item.id}`)}
                                    className="w-full flex items-start gap-3 p-3 rounded-md hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors text-left group"
                                >
                                    <FileText className="mt-0.5 text-slate-400 group-hover:text-blue-500" size={16} />
                                    <div>
                                        <div className="font-bold text-slate-900 dark:text-white text-sm">{item.title}</div>
                                        <div className="text-xs text-slate-500 font-mono">{item.venue} • {item.year}</div>
                                    </div>
                                    <ChevronRight className="ml-auto opacity-0 group-hover:opacity-100 text-slate-400" size={14}/>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Projects */}
                {results.projects.length > 0 && (
                    <div>
                        <h3 className="text-xs font-bold font-mono text-slate-500 uppercase tracking-wider mb-2 px-2">Projects</h3>
                        <div className="space-y-1">
                            {results.projects.map(item => (
                                <button 
                                    key={item.id}
                                    onClick={() => handleNavigate(`/projects/${item.id}`)}
                                    className="w-full flex items-start gap-3 p-3 rounded-md hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors text-left group"
                                >
                                    <Folder className="mt-0.5 text-slate-400 group-hover:text-blue-500" size={16} />
                                    <div>
                                        <div className="font-bold text-slate-900 dark:text-white text-sm">{item.title}</div>
                                        <div className="text-xs text-slate-500">{item.agency}</div>
                                    </div>
                                    <ChevronRight className="ml-auto opacity-0 group-hover:opacity-100 text-slate-400" size={14}/>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* People */}
                {results.people.length > 0 && (
                    <div>
                        <h3 className="text-xs font-bold font-mono text-slate-500 uppercase tracking-wider mb-2 px-2">Members</h3>
                        <div className="space-y-1">
                            {results.people.map(item => (
                                <button 
                                    key={item.id}
                                    onClick={() => handleNavigate(`/members`)}
                                    className="w-full flex items-center gap-3 p-3 rounded-md hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors text-left group"
                                >
                                    <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                                        <img src={item.imageUrl} alt="" className="w-full h-full object-cover"/>
                                    </div>
                                    <div>
                                        <div className="font-bold text-slate-900 dark:text-white text-sm">{item.name}</div>
                                        <div className="text-xs text-slate-500">{item.role}</div>
                                    </div>
                                    <ChevronRight className="ml-auto opacity-0 group-hover:opacity-100 text-slate-400" size={14}/>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
        
        {/* Footer Hint */}
        {hasResults && (
            <div className="bg-slate-50 dark:bg-slate-900/50 p-3 text-center border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs text-slate-400 font-mono">Press ESC to close</span>
            </div>
        )}
      </div>
    </div>
  );
};

export default SearchModal;
