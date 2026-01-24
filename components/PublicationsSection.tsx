import React, { useState } from 'react';
import { AppData, Publication } from '../types';
import SectionTitle from './SectionTitle';
import { jsPDF } from 'jspdf';
import { Link } from 'react-router-dom';
import CitationModal from './CitationModal';

interface PublicationsSectionProps {
  publications: Publication[];
  labels: AppData['ui']['pubs'];
}

const PublicationsSection: React.FC<PublicationsSectionProps> = ({ publications, labels }) => {
  const [trackFilter, setTrackFilter] = useState<string>('All');
  const [topicFilter, setTopicFilter] = useState<string>('All');
  const [citationPub, setCitationPub] = useState<Publication | null>(null);
  
  // Get unique topics for the filter list
  const topics = ['All', ...Array.from(new Set(publications.map(p => p.topic).filter(Boolean) as string[]))].sort();

  // 1. Filter publications
  const filteredPublications = publications
    .filter(p => {
      const trackMatch = trackFilter === 'All' || p.track === trackFilter;
      const topicMatch = topicFilter === 'All' || p.topic === topicFilter;
      return trackMatch && topicMatch;
    })
    .sort((a, b) => b.year - a.year); // Ensure they are sorted by date before grouping

  // 2. Group by Year
  const publicationsByYear = filteredPublications.reduce((groups, pub) => {
    const year = pub.year;
    if (!groups[year]) {
      groups[year] = [];
    }
    groups[year].push(pub);
    return groups;
  }, {} as Record<number, Publication[]>);

  // Get sorted years descending
  const sortedYears = Object.keys(publicationsByYear)
    .map(Number)
    .sort((a, b) => b - a);

  // Handle Download Logic
  const handleDownload = (e: React.MouseEvent, pub: Publication, type: 'pdf' | 'slides' | 'poster') => {
    const url = type === 'pdf' ? pub.pdfUrl : type === 'slides' ? pub.slidesUrl : pub.posterUrl;
    // If URL exists and is not a placeholder, return to let the default anchor tag behavior work
    if (url && url !== '#' && !url.startsWith('javascript')) return;
    
    e.preventDefault();
    const doc = new jsPDF();
    const label = type === 'pdf' ? 'Research Paper' : type === 'slides' ? 'Slides' : 'Poster';
    
    doc.setFontSize(18);
    doc.text(pub.title, 10, 20);
    doc.setFontSize(12);
    doc.text(`[${label} Placeholder]`, 10, 35);
    doc.save(`${pub.title.substring(0, 15).replace(/\s+/g, '_')}_${type}.pdf`);
  };

  return (
    <section id="publications" className="py-24 bg-white dark:bg-black transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title={labels.title} subtitle={labels.subtitle} />
        
        {/* === Minimal Text Filter === */}
        <div className="mb-12 border-b-2 border-slate-100 dark:border-slate-800 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                
                {/* Track Filter */}
                <div className="flex items-center gap-4 text-sm font-mono">
                    <span className="text-slate-400 select-none">// Filter:</span>
                    {['All', 'Journal', 'Conference'].map(track => (
                        <button
                            key={track}
                            onClick={() => setTrackFilter(track)}
                            className={`hover:text-blue-600 transition-colors ${
                                trackFilter === track 
                                ? 'font-bold text-blue-600 underline decoration-2 underline-offset-4' 
                                : 'text-slate-600 dark:text-slate-400'
                            }`}
                        >
                            {track}
                        </button>
                    ))}
                </div>

                {/* Topic Select (Simple text based) */}
                <div className="flex items-center gap-2 text-sm">
                    <span className="text-slate-400 font-mono">// Topic:</span>
                    <select 
                        value={topicFilter}
                        onChange={(e) => setTopicFilter(e.target.value)}
                        className="bg-transparent text-slate-700 dark:text-slate-300 font-medium hover:text-blue-600 cursor-pointer outline-none border-none focus:ring-0 py-0 pl-0 pr-6"
                        style={{ WebkitAppearance: 'none', MozAppearance: 'none' }} 
                    >
                        {topics.map(t => <option key={t} value={t} className="bg-white dark:bg-black">{t}</option>)}
                    </select>
                </div>
            </div>
        </div>

        {/* === Markdown/CV Style List === */}
        <div className="space-y-16">
            {sortedYears.length === 0 && (
                <div className="text-center py-10 text-slate-400 font-mono">
                    No publications found matching these filters.
                </div>
            )}

            {sortedYears.map(year => (
                <div key={year} className="relative">
                    {/* Year Heading - Like a Markdown H2 (## 2024) */}
                    <div className="flex items-baseline gap-3 mb-8 sticky top-20 bg-white/90 dark:bg-black/90 backdrop-blur-sm z-10 py-2">
                        <h3 className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
                            <span className="text-slate-300 dark:text-slate-700 mr-2">##</span>
                            {year}
                        </h3>
                        <div className="h-px bg-slate-100 dark:bg-slate-800 flex-grow"></div>
                    </div>

                    {/* Paper List */}
                    <ul className="space-y-10 pl-2 sm:pl-4">
                        {publicationsByYear[year].map((pub) => (
                            <li key={pub.id} className="relative group">
                                <div className="flex flex-col md:flex-row gap-6 items-start">
                                    
                                    {/* Bullet point (Desktop) - Adjusted position for left image */}
                                    <div className="absolute -left-6 top-2 text-slate-300 dark:text-slate-700 font-mono hidden sm:block select-none group-hover:text-blue-500 transition-colors">*</div>

                                    {/* Thumbnail Column (Left Side) */}
                                    {pub.imageUrl && (
                                        // Changed md:w-48 to md:w-64 to make the thumbnail larger
                                        <div className="shrink-0 w-full md:w-64 mt-1.5">
                                            {/* Changed object-contain to object-fill to force fill without padding */}
                                            <div className="aspect-video rounded-none overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:border-slate-300 dark:group-hover:border-slate-600">
                                                <img 
                                                    src={pub.imageUrl} 
                                                    alt="Paper visual" 
                                                    className="w-full h-full object-fill"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* Content Column (Right Side) */}
                                    <div className="flex-1 min-w-0 flex flex-col gap-2">
                                        {/* Title */}
                                        <Link 
                                            to={`/publications/${pub.id}`}
                                            className="text-lg font-bold text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors leading-snug block"
                                        >
                                            {pub.title}
                                        </Link>

                                        {/* Authors */}
                                        <div className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                                            {pub.authors.map((author, i) => (
                                                <span key={i}>
                                                    {author}{i < pub.authors.length - 1 ? ', ' : ''}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Venue & Location */}
                                        <div className="text-sm">
                                            <span className="italic font-medium text-slate-800 dark:text-slate-300">{pub.venue}</span>
                                            {pub.location && <span className="text-slate-400 ml-1"> ({pub.location})</span>}
                                        </div>

                                        {/* Action Links (Markdown style) */}
                                        <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 text-xs font-mono select-none">
                                            {pub.pdfUrl && (
                                                <a 
                                                    href={pub.pdfUrl} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    onClick={(e) => handleDownload(e, pub, 'pdf')}
                                                    className="text-blue-600 dark:text-blue-400 hover:underline decoration-blue-600/30 underline-offset-2"
                                                >
                                                    [PDF]
                                                </a>
                                            )}
                                            
                                            {/* BibTeX Cite Button */}
                                            <button 
                                                onClick={() => setCitationPub(pub)}
                                                className="text-purple-600 dark:text-purple-400 hover:underline decoration-purple-600/30 underline-offset-2 flex items-center gap-1"
                                            >
                                                [Cite]
                                            </button>

                                            {pub.slidesUrl && (
                                                <a 
                                                    href={pub.slidesUrl}
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    onClick={(e) => handleDownload(e, pub, 'slides')}
                                                    className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 hover:underline decoration-slate-500/30 underline-offset-2"
                                                >
                                                    [Slides]
                                                </a>
                                            )}
                                            {pub.codeUrl && (
                                                <a 
                                                    href={pub.codeUrl}
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 hover:underline decoration-slate-500/30 underline-offset-2"
                                                >
                                                    [Code]
                                                </a>
                                            )}
                                            {pub.posterUrl && (
                                                <a 
                                                    href={pub.posterUrl}
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    onClick={(e) => handleDownload(e, pub, 'poster')}
                                                    className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 hover:underline decoration-slate-500/30 underline-offset-2"
                                                >
                                                    [Poster]
                                                </a>
                                            )}
                                            {pub.demoUrl && (
                                                <a 
                                                    href={pub.demoUrl}
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="text-emerald-600 dark:text-emerald-400 hover:underline decoration-emerald-600/30 underline-offset-2"
                                                >
                                                    [Demo]
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>

        {/* BibTeX Modal */}
        <CitationModal 
            isOpen={!!citationPub} 
            onClose={() => setCitationPub(null)} 
            publication={citationPub} 
        />
      </div>
    </section>
  );
};

export default PublicationsSection;