
import React from 'react';
import { Terminal } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-white dark:bg-black z-[100] flex flex-col items-center justify-center">
      <div className="flex items-center gap-3 text-blue-600 dark:text-blue-500 mb-6 animate-bounce">
        <Terminal size={48} strokeWidth={1.5} />
      </div>
      
      <div className="font-mono text-xl font-bold text-slate-900 dark:text-white tracking-widest mb-2">
        ICS_LAB_PORTAL
      </div>
      
      <div className="w-48 h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden relative">
        <div className="absolute inset-y-0 bg-blue-600 dark:bg-blue-500 w-1/2 animate-[loading_1.5s_ease-in-out_infinite]"></div>
      </div>
      
      <div className="mt-4 font-mono text-xs text-slate-400">
        Fetching content from repository...
      </div>
      
      <style>{`
        @keyframes loading {
            0% { left: -50%; }
            100% { left: 150%; }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
