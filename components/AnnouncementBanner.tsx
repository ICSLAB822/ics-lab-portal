import React from 'react';
import { Announcement } from '../types';
import { Sparkles, Info, Megaphone, ChevronUp } from 'lucide-react';

interface AnnouncementBannerProps {
  announcement: Announcement;
  onDismiss?: () => void;
}

const AnnouncementBanner: React.FC<AnnouncementBannerProps> = ({ announcement, onDismiss }) => {
  const { title, subtitle, imageUrl, mobileImageUrl, imagePosition = 'center', actionText, actionUrl, theme = 'default' } = announcement;

  const themeStyles = {
    celebration: {
      overlay: 'bg-gradient-to-t from-black/80 via-black/40 to-transparent',
      title: 'text-white drop-shadow-xl shadow-black/50',
      subtitle: 'text-white/95 drop-shadow-lg shadow-black/50',
      icon: Sparkles,
      iconColor: 'text-yellow-200',
      labelBg: 'bg-white/10 backdrop-blur-md border-white/20 shadow-lg',
      labelText: 'text-white/90',
    },
    info: {
      overlay: 'bg-gradient-to-t from-blue-900/90 via-blue-900/50 to-blue-900/20',
      title: 'text-white drop-shadow-lg',
      subtitle: 'text-blue-50 drop-shadow-md',
      icon: Info,
      iconColor: 'text-cyan-200',
      labelBg: 'bg-blue-500/30 backdrop-blur-md border-blue-400/30',
      labelText: 'text-blue-100',
    },
    default: {
      overlay: 'bg-gradient-to-t from-slate-900/90 via-slate-900/60 to-slate-900/30',
      title: 'text-white drop-shadow-lg',
      subtitle: 'text-slate-200 drop-shadow-md',
      icon: Megaphone,
      iconColor: 'text-slate-300',
      labelBg: 'bg-slate-500/30 backdrop-blur-md border-slate-400/30',
      labelText: 'text-slate-200',
    },
  };

  const style = themeStyles[theme] || themeStyles.default;
  const Icon = style.icon;

  const hasImage = imageUrl && imageUrl.trim() !== '';

  // Use mobile image if available and on mobile (handled via CSS media query logic or simpler inline style)
  // For simplicity, we'll use a style block to swap images
  const bgStyle = hasImage ? {
    backgroundImage: `url(${imageUrl})`,
    backgroundPosition: imagePosition,
  } : {};

  // If mobileImageUrl exists, we can use a CSS variable to switch it in a style tag or just use window.matchMedia logic in JS
  // But CSS variables are cleaner.
  const containerStyle = {
    '--bg-desktop': imageUrl ? `url(${imageUrl})` : 'none',
    '--bg-mobile': mobileImageUrl ? `url(${mobileImageUrl})` : (imageUrl ? `url(${imageUrl})` : 'none'),
    '--bg-pos': imagePosition,
  } as React.CSSProperties;

  return (
    <div 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cover bg-no-repeat"
      style={{ 
        backgroundImage: 'var(--bg-desktop)',
        backgroundPosition: 'var(--bg-pos)',
        ...containerStyle 
      }}
    >
      {/* Mobile Image Overlay (only visible on small screens if mobile image provided) */}
      <style>{`
        @media (max-width: 768px) {
          .announcement-bg-container {
            background-image: var(--bg-mobile) !important;
          }
        }
      `}</style>
      
      <div className="announcement-bg-container absolute inset-0 bg-cover bg-no-repeat" 
           style={{ 
             backgroundImage: 'var(--bg-desktop)', 
             backgroundPosition: 'var(--bg-pos)' 
           }} 
      />
      
      {!hasImage && !mobileImageUrl && (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-black" />
      )}
      
      <div className={`absolute inset-0 ${style.overlay}`} />
      
      {theme === 'celebration' && (
        <>
          <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-yellow-400/20 rounded-full blur-[64px] animate-pulse" />
          <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-orange-400/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '2s' }} />
        </>
      )}

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 text-center py-20 flex flex-col items-center">
        
        <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border ${style.labelBg} mb-10 transform transition-transform hover:scale-105 duration-300`}>
          <Icon size={16} className={style.iconColor} />
          <span className={`text-xs font-mono uppercase tracking-[0.2em] font-bold ${style.labelText}`}>
            {theme === 'celebration' ? 'Welcome' : theme === 'info' ? 'Notice' : 'Announcement'}
          </span>
        </div>

        <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight ${style.title} mb-8 max-w-5xl`}>
          {title}
        </h1>

        {subtitle && (
          <p className={`text-xl sm:text-2xl md:text-3xl font-light leading-relaxed ${style.subtitle} max-w-4xl mx-auto opacity-90`}>
            {subtitle}
          </p>
        )}

        {/* CTA Button */}
        {actionText && actionUrl && (
          <a 
            href={actionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              mt-10 inline-flex items-center gap-2 px-8 py-3 rounded-full 
              text-lg font-bold tracking-wide transition-all duration-300
              hover:scale-105 hover:shadow-xl active:scale-95
              ${theme === 'celebration' 
                ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-orange-500/30' 
                : theme === 'info'
                ? 'bg-blue-500 text-white shadow-blue-500/30'
                : 'bg-white text-slate-900 shadow-white/20'
              }
            `}
          >
            {actionText}
          </a>
        )}
      </div>

      <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce opacity-70">
        <button 
          onClick={onDismiss}
          className="hover:opacity-80 transition-opacity cursor-pointer focus:outline-none"
          aria-label="Dismiss announcement and show homepage"
        >
          <ChevronUp size={32} className="text-white drop-shadow-md" />
        </button>
      </div>

      {theme !== 'celebration' && (
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-black to-transparent pointer-events-none" />
      )}
    </div>
  );
};

export default AnnouncementBanner;
