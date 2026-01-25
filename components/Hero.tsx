
import React, { useEffect, useState } from 'react';
import { AppData, LabInfo, NewsItem } from '../types';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeroProps {
  info: LabInfo;
  news: NewsItem[];
  labels: AppData['ui'];
}

const Hero: React.FC<HeroProps> = ({ info, news, labels }) => {
  // Simple type-writer effect cursor state
  const [cursorVisible, setCursorVisible] = useState(true);

  // Background Carousel State
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  useEffect(() => {
    // Cursor Blink
    const cursorTimer = setInterval(() => setCursorVisible(v => !v), 530);
    
    // Background Rotation (every 8 seconds)
    const bgTimer = setInterval(() => {
        if (info.heroImages && info.heroImages.length > 0) {
            setCurrentBgIndex(prev => (prev + 1) % info.heroImages.length);
        }
    }, 8000);

    return () => {
        clearInterval(cursorTimer);
        clearInterval(bgTimer);
    };
  }, [info.heroImages]);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-white dark:bg-black transition-colors duration-300">
      
      {/* 
        === Global Background Pattern === 
        Kept the grid pattern globally, but it will be subtle behind the image
      */}
      <div className="absolute inset-0 z-0 bg-grid-pattern dark:bg-grid-pattern-dark opacity-[0.4] pointer-events-none"></div>

      {/* 
        === Right-Aligned Image Carousel === 
        Positioned to the right, taking up ~60-70% of width on large screens.
        Uses mask-image to fade smoothly into the background on the left.
      */}
      <div className="absolute top-0 right-0 w-full lg:w-[70%] h-full z-0 select-none pointer-events-none overflow-hidden">
          {/* Gradient Mask: Transparent on left, Solid on right */}
          <div className="absolute inset-0 w-full h-full [mask-image:linear-gradient(to_right,transparent_0%,black_40%,black_100%)] z-10">
              {info.heroImages.map((img, idx) => (
                  <div 
                    key={idx} 
                    className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${
                        idx === currentBgIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                      {/* 
                         Image Layer 
                         1. Full Color (removed grayscale).
                         2. Ken Burns Effect (Slow Zoom).
                         3. Dark mode brightness adjustment.
                      */}
                      <img 
                        src={img} 
                        alt="Lab Background" 
                        className={`w-full h-full object-cover transition-transform duration-[10000ms] ease-linear ${
                            idx === currentBgIndex ? 'scale-110' : 'scale-100'
                        } dark:brightness-[0.6] brightness-[0.95]`} 
                      />
                  </div>
              ))}
          </div>
          
          {/* Bottom Fade - Only visible in dark mode */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent z-20 dark:block hidden"></div>
      </div>


      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            
            {/* Left: Main "Readme" Content 
                Added a subtle backdrop blur just in case the image overlaps on smaller screens
            */}
            <div className="lg:w-1/2 relative">
                {/* Header Block */}
                <div className="mb-8 font-mono relative">
                    <div className="text-sm text-slate-500 dark:text-slate-400 mb-2 font-bold">
                        // Welcome to our digital workspace
                    </div>
                    {/* Added text-shadow/drop-shadow to ensure readability if image edge comes close */}
                    <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-slate-900 dark:text-white mb-4 drop-shadow-sm">
                        # {info.name}
                    </h1>
                    <h2 className="text-xl sm:text-2xl text-slate-700 dark:text-slate-200 font-medium">
                        {info.fullName}
                        <span className={`${cursorVisible ? 'opacity-100' : 'opacity-0'} text-blue-600 dark:text-blue-400 ml-1 inline-block`}>
                            _
                        </span>
                    </h2>
                </div>

                {/* Description Quote Block */}
                {/* Unified padding to p-6 for consistent spacing on all sides */}
                <div className="border-l-4 border-slate-900 dark:border-slate-100 p-6 mb-6 bg-white/80 dark:bg-black/60 backdrop-blur-sm rounded-r-sm max-w-xl">
                    <p className="text-lg text-slate-800 dark:text-slate-200 leading-relaxed font-sans font-medium">
                        {info.description}
                    </p>
                </div>

                {/* Announcement Badge - Terminal Style */}
                {info.bannerText && (
                  <div className="mb-6 max-w-xl">
                    <Link
                      to="/join-us"
                      className="group inline-flex items-center gap-2 font-mono text-sm bg-white/80 dark:bg-black/60 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-sm px-4 py-2.5 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
                    >
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        <span className="text-green-600 dark:text-green-400 font-bold">NEW</span>
                      </span>
                      <span className="text-slate-600 dark:text-slate-400">|</span>
                      <span className="text-slate-700 dark:text-slate-300">{info.bannerText}</span>
                      <ArrowRight size={14} className="text-slate-400 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  </div>
                )}

                {/* Research Areas (Array style) */}
                <div className="mb-12 font-mono text-sm bg-white/80 dark:bg-black/60 p-4 rounded-sm backdrop-blur-sm inline-block border border-slate-200 dark:border-slate-800 shadow-sm">
                    <span className="text-purple-700 dark:text-purple-400 font-bold">const</span> <span className="text-blue-700 dark:text-blue-400 font-bold">researchAreas</span> = [
                    <div className="pl-4 flex flex-col gap-1 mt-1 text-slate-700 dark:text-slate-300 font-medium">
                        {info.researchAreas.map((area, idx) => (
                            <span key={idx}>
                                '{area}'{idx < info.researchAreas.length - 1 ? ',' : ''}
                            </span>
                        ))}
                    </div>
                    ];
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-6 font-mono text-sm">
                    <Link to="/publications" className="group flex items-center gap-2 border-b-2 border-slate-900 dark:border-white pb-1 text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-600 dark:hover:border-blue-400 transition-all font-bold">
                        View Publications <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
                    </Link>
                    <Link to="/people" className="group flex items-center gap-2 border-b-2 border-transparent pb-1 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all">
                        Meet the Team
                    </Link>
                </div>
            </div>

            {/* Right: Latest News (Changelog Style) 
                Moved down slightly to let the background image shine through more
            */}
            <div className="lg:w-1/2 mt-10 lg:mt-32">
                <div className="border border-slate-200 dark:border-slate-700 rounded-sm p-6 bg-white/90 dark:bg-black/80 backdrop-blur-md shadow-lg ring-1 ring-slate-900/5 dark:ring-white/10 max-w-md ml-auto">
                    <h3 className="font-mono text-sm font-bold text-slate-900 dark:text-white mb-6 border-b border-slate-200 dark:border-slate-700 pb-2">
                        ## Latest Updates
                    </h3>
                    
                    <ul className="space-y-6">
                        {news.slice(0, 3).map((item) => (
                            <li key={item.id} className="relative pl-6 border-l border-slate-200 dark:border-slate-700 group">
                                <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-black bg-blue-500"></div>
                                <div className="font-mono text-xs text-slate-400 mb-1">
                                    {new Date(item.date).toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit' })}
                                </div>
                                <Link to={`/news/${item.id}`} className="block text-sm font-bold text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:underline decoration-1 underline-offset-2 mb-1">
                                    {item.title}
                                </Link>
                                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed group-hover:line-clamp-none line-clamp-5 group-hover:whitespace-normal transition-all">
                                    {item.summary}
                                </p>
                            </li>
                        ))}
                    </ul>
                    
                    <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700 text-right">
                        <Link to="/news" className="font-mono text-xs text-blue-600 dark:text-blue-400 hover:underline">
                            view_all_news()
                        </Link>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
