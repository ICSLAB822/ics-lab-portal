
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { NewsItem } from '../types';
import { Terminal, Calendar, Tag } from 'lucide-react';

interface NewsDetailProps {
  news: NewsItem[];
}

const NewsDetail: React.FC<NewsDetailProps> = ({ news }) => {
  const { id } = useParams<{ id: string }>();
  const item = news.find(n => n.id === id);

  if (!item) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center p-8 font-mono">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">404: News Not Found</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-8">// The requested article is missing.</p>
        <Link to="/news" className="px-6 py-3 border border-slate-900 dark:border-white text-slate-900 dark:text-white hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-colors">
          cd /news
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-8 pb-20 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation: CLI Style */}
        <div className="mb-8">
            <Link to="/news" className="inline-flex items-center text-sm font-mono text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors group">
            <Terminal size={14} className="mr-2" />
            <span className="mr-2">cd ..</span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-300 dark:text-slate-600 ml-2">// Back to News List</span>
            </Link>
        </div>

        {/* Main Content Container */}
        <div className="bg-white dark:bg-black border border-slate-200 dark:border-slate-800 relative shadow-sm">
            
            {/* Top Color Accent */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-blue-600 dark:bg-blue-500"></div>
            
            {/* Hero Image (if available) */}
            {item.imageUrl && (
                <div className="w-full h-64 md:h-96 overflow-hidden border-b border-slate-200 dark:border-slate-800">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                </div>
            )}

            <div className="p-8 md:p-12">
                {/* Header Section */}
                <div className="mb-10 border-b border-slate-100 dark:border-slate-800 pb-8">
                    <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-500 dark:text-slate-400 mb-4 uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                             <Calendar size={14} className="text-blue-500" />
                             {new Date(item.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>
                        <div className="flex items-center gap-2">
                             <Tag size={14} className="text-blue-500" />
                             {item.tag}
                        </div>
                    </div>
                    
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white leading-tight font-heading">
                        {item.title}
                    </h1>
                </div>

                {/* Body Content */}
                <div className="prose prose-slate dark:prose-invert max-w-none font-sans leading-relaxed text-slate-800 dark:text-slate-200">
                     {/* Split content by newlines to create paragraphs */}
                     {(item.content || item.summary).split('\n').map((paragraph, idx) => (
                        <p key={idx} className="mb-4 text-lg">
                            {paragraph.trim()}
                        </p>
                     ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
