
import React from 'react';
import { NewsItem, AppData } from '../types';
import SectionTitle from './SectionTitle';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';

interface NewsSectionProps {
  news: NewsItem[];
  labels: AppData['ui']['news'];
}

const NewsSection: React.FC<NewsSectionProps> = ({ news, labels }) => {
  return (
    <section id="news" className="pt-2 pb-8 bg-white dark:bg-black">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle 
          title={labels.title} 
          subtitle={labels.subtitle}
        />
        
        {/* Timeline Layout */}
        <div className="border-l-2 border-slate-100 dark:border-slate-800 ml-4 md:ml-0 space-y-12">
          {news.map((item) => (
            <div key={item.id} className="relative pl-8 md:pl-10">
                {/* Timeline Dot */}
                <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-white dark:bg-black border-4 border-slate-200 dark:border-slate-700"></div>
                
                <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 mb-2">
                    <Link to={`/news/${item.id}`} className="hover:text-blue-600 transition-colors">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                            {item.title}
                        </h3>
                    </Link>
                    <div className="font-mono text-sm text-slate-400 dark:text-slate-500">
                        {new Date(item.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                </div>

                <div className="mb-3">
                    <span className="inline-block px-2 py-0.5 rounded text-xs font-mono bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800">
                        @{item.tag}
                    </span>
                </div>
                
                <div className="grid md:grid-cols-4 gap-6">
                    <div className="md:col-span-3">
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-justify">
                            {item.summary}
                        </p>
                        <Link to={`/news/${item.id}`} className="inline-flex items-center gap-2 mt-3 text-sm font-mono text-blue-600 dark:text-blue-400 hover:underline">
                            read_more <ArrowRight size={14}/>
                        </Link>
                    </div>
                    {item.imageUrl && (
                        <div className="md:col-span-1 mt-4 md:mt-0">
                            <div className="aspect-video bg-slate-100 dark:bg-slate-900 rounded-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                                <Link to={`/news/${item.id}`}>
                                    <img 
                                        src={item.imageUrl} 
                                        alt="" 
                                        className="w-full h-full object-cover transition-all duration-500 hover:scale-105" 
                                    />
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
          ))}
        </div>
        <ScrollToTop />
      </div>
    </section>
  );
};

export default NewsSection;
