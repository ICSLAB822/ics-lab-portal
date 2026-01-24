
import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  light?: boolean;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle, light = false }) => {
  return (
    <div className="mb-16 text-left border-b border-slate-200 dark:border-slate-800 pb-4 max-w-5xl mx-auto">
      <h2 className={`text-3xl font-bold tracking-tight mb-2 font-mono flex items-center gap-2 ${light ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
        <span className="text-blue-600 dark:text-blue-500">##</span>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-base font-mono leading-relaxed pl-10 ${light ? 'text-slate-300' : 'text-slate-500 dark:text-slate-400'}`}>
          // {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
    