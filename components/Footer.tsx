
import React from 'react';
import { AppData, LabInfo } from '../types';

interface FooterProps {
  info: LabInfo;
  labels: AppData['ui']['footer'];
}

const Footer: React.FC<FooterProps> = ({ info, labels }) => {
  return (
    <footer className="bg-white dark:bg-black text-slate-500 dark:text-slate-500 py-12 border-t border-slate-200 dark:border-slate-800 font-mono text-xs">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        
        <div className="flex flex-col gap-1">
            <span className="font-bold text-slate-900 dark:text-slate-300">{info.name}</span>
            <span>{info.fullName}</span>
        </div>

        <div className="flex gap-6">
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline">Twitter</a>
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline">GitHub</a>
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline">LinkedIn</a>
        </div>

        <div className="text-right">
          <p>&copy; {new Date().getFullYear()} ICS LAB.</p>
          <p>{labels.designed}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
    
