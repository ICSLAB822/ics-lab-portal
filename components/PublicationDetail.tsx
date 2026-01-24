
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Publication } from '../types';
import { ArrowLeft, Calendar, MapPin, Download, MonitorPlay, FileImage, Code, Play, BookOpen, Terminal, Quote } from 'lucide-react';
import { jsPDF } from 'jspdf';
import CitationModal from './CitationModal';

interface PublicationDetailProps {
  publications: Publication[];
}

const PublicationDetail: React.FC<PublicationDetailProps> = ({ publications }) => {
  const { id } = useParams<{ id: string }>();
  const [showCitation, setShowCitation] = useState(false);
  const pub = publications.find(p => p.id === id);

  if (!pub) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center p-8 font-mono">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">404: Not Found</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-8">// The requested publication data is missing.</p>
        <Link to="/publications" className="px-6 py-3 border border-slate-900 dark:border-white text-slate-900 dark:text-white hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-colors">
          cd /publications
        </Link>
      </div>
    );
  }

  // Reuse the download logic
  const handleDownload = (e: React.MouseEvent, type: 'pdf' | 'slides' | 'poster') => {
    const url = type === 'pdf' ? pub.pdfUrl : type === 'slides' ? pub.slidesUrl : pub.posterUrl;
    if (url && url !== '#' && !url.startsWith('javascript')) return;
    
    e.preventDefault();
    const doc = new jsPDF();
    const label = type.charAt(0).toUpperCase() + type.slice(1);
    
    doc.setFontSize(18);
    doc.text(pub.title, 10, 20);
    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text(`[${label} Placeholder]`, 10, 35);
    doc.save(`${pub.title.substring(0, 15).replace(/\s+/g, '_')}_${type}.pdf`);
  };

  return (
    <div className="min-h-screen pt-8 pb-20 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation: CLI Style */}
        <div className="mb-8">
            <Link to="/publications" className="inline-flex items-center text-sm font-mono text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors group">
            <Terminal size={14} className="mr-2" />
            <span className="mr-2">cd ..</span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-300 dark:text-slate-600 ml-2">// Back to Publications</span>
            </Link>
        </div>

        {/* Main "Document" Container */}
        <div className="bg-white dark:bg-black border border-slate-200 dark:border-slate-800 p-6 md:p-12 relative shadow-sm">
            
            {/* Top Color Accent */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-blue-600 dark:bg-blue-500"></div>

            {/* Header Section */}
            <div className="mb-12 border-b border-slate-200 dark:border-slate-800 pb-8">
                <div className="font-mono text-xs text-slate-400 mb-2">
                    id: "{pub.id}"
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight mb-6 font-mono tracking-tight">
                    # {pub.title}
                </h1>
                
                {/* Metadata Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-mono text-slate-600 dark:text-slate-400">
                    <div className="flex items-center gap-3">
                         <Calendar size={16} className="text-blue-500" />
                         <span><span className="text-slate-400">year:</span> {pub.year}</span>
                    </div>
                    <div className="flex items-center gap-3">
                         <BookOpen size={16} className="text-blue-500" />
                         <span><span className="text-slate-400">venue:</span> <span className="italic font-bold text-slate-800 dark:text-slate-200">{pub.venue}</span></span>
                    </div>
                    {pub.location && (
                        <div className="flex items-center gap-3">
                             <MapPin size={16} className="text-blue-500" />
                             <span><span className="text-slate-400">loc:</span> {pub.location}</span>
                        </div>
                    )}
                    {pub.track && (
                        <div className="flex items-center gap-3">
                            <span className="w-4 h-4 flex items-center justify-center text-blue-500 font-bold text-xs border border-blue-500 rounded-[2px]">T</span>
                            <span><span className="text-slate-400">track:</span> {pub.track}</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                
                {/* Left Column: Image & Resources (30-40%) */}
                <div className="lg:col-span-4 space-y-10 order-2 lg:order-1">
                    {/* Main Image */}
                    <div className="border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/30 p-2">
                        {pub.imageUrl ? (
                            <img src={pub.imageUrl} alt={pub.title} className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                        ) : (
                            <div className="aspect-[4/3] flex flex-col items-center justify-center text-slate-400 font-mono text-xs border border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-black">
                                <FileImage size={24} className="mb-2 opacity-50"/>
                                [NO_IMAGE_DATA]
                            </div>
                        )}
                        <div className="mt-2 text-center font-mono text-[10px] text-slate-400 uppercase tracking-wider">
                            Fig 1. System Architecture
                        </div>
                    </div>
                    
                    {/* Resources List */}
                    <div>
                        <h3 className="text-sm font-bold font-mono text-slate-900 dark:text-white mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">
                            ## Resources
                        </h3>
                        <div className="flex flex-col gap-2 font-mono text-sm">
                            
                            {/* Cite Button */}
                            <button 
                                onClick={() => setShowCitation(true)}
                                className="flex items-center justify-between px-4 py-3 border border-slate-200 dark:border-slate-800 hover:border-purple-500 dark:hover:border-purple-500 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all group text-slate-600 dark:text-slate-300"
                            >
                                <span className="group-hover:text-purple-600 dark:group-hover:text-purple-400">[BIB] Cite this Paper</span>
                                <Quote size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-purple-500" />
                            </button>

                            {pub.pdfUrl && (
                                <a href={pub.pdfUrl} onClick={(e) => handleDownload(e, 'pdf')} className="flex items-center justify-between px-4 py-3 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all group text-slate-600 dark:text-slate-300">
                                    <span className="group-hover:text-blue-600 dark:group-hover:text-blue-400">[PDF] Download Paper</span>
                                    <Download size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-500" />
                                </a>
                            )}

                            {pub.slidesUrl && (
                                <a href={pub.slidesUrl} onClick={(e) => handleDownload(e, 'slides')} className="flex items-center justify-between px-4 py-3 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all group text-slate-600 dark:text-slate-300">
                                    <span className="group-hover:text-blue-600 dark:group-hover:text-blue-400">[PPT] Presentation Slides</span>
                                    <MonitorPlay size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-500" />
                                </a>
                            )}

                            {pub.posterUrl && (
                                <a href={pub.posterUrl} onClick={(e) => handleDownload(e, 'poster')} className="flex items-center justify-between px-4 py-3 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all group text-slate-600 dark:text-slate-300">
                                    <span className="group-hover:text-blue-600 dark:group-hover:text-blue-400">[IMG] Conference Poster</span>
                                    <FileImage size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-500" />
                                </a>
                            )}

                            {pub.codeUrl && (
                                <a href={pub.codeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between px-4 py-3 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all group text-slate-600 dark:text-slate-300">
                                    <span className="group-hover:text-blue-600 dark:group-hover:text-blue-400">[GIT] Source Code</span>
                                    <Code size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-500" />
                                </a>
                            )}

                            {pub.demoUrl && (
                                <a href={pub.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between px-4 py-3 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all group text-slate-600 dark:text-slate-300">
                                    <span className="group-hover:text-blue-600 dark:group-hover:text-blue-400">[WEB] Online Demo</span>
                                    <Play size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-500" />
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column: Abstract & Authors */}
                <div className="lg:col-span-8 flex flex-col gap-10 order-1 lg:order-2">
                    
                    {/* Authors Block */}
                    <div>
                         <h3 className="text-lg font-bold font-mono text-slate-900 dark:text-white mb-4">
                            ### Authors
                         </h3>
                         <div className="p-5 border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/20">
                             <div className="flex flex-wrap gap-x-8 gap-y-3 font-mono text-sm">
                                {pub.authors.map((author, index) => (
                                    <span key={index} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                                        <span className="text-slate-300 dark:text-slate-600 font-normal">[{index}]</span> 
                                        {author}
                                    </span>
                                ))}
                             </div>
                         </div>
                    </div>

                    {/* Abstract Block */}
                    <div>
                        <h3 className="text-lg font-bold font-mono text-slate-900 dark:text-white mb-4">
                            ### Abstract
                        </h3>
                        <div className="relative pl-6 border-l-2 border-blue-500 dark:border-blue-600">
                            <p className="text-slate-800 dark:text-slate-200 leading-relaxed text-justify font-sans text-lg">
                                {pub.abstract || "No abstract available."}
                            </p>
                        </div>
                    </div>

                    {/* Keywords/Tags */}
                    {pub.tags && (
                        <div>
                             <h3 className="text-sm font-bold font-mono text-slate-900 dark:text-white mb-3">
                                // Keywords
                             </h3>
                             <div className="flex flex-wrap gap-2 font-mono text-sm">
                                {pub.tags.map(tag => (
                                    <span key={tag} className="text-blue-600 dark:text-blue-400 hover:underline cursor-default">
                                        #{tag.replace(/\s+/g, '')}
                                    </span>
                                ))}
                             </div>
                        </div>
                    )}
                </div>
            </div>
        </div>

        {/* Citation Modal */}
        <CitationModal 
            isOpen={showCitation} 
            onClose={() => setShowCitation(false)} 
            publication={pub}
        />
      </div>
    </div>
  );
};

export default PublicationDetail;
