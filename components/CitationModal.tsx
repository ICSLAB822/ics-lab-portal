import React, { useState, useEffect } from 'react';
import { Publication } from '../types';
import { X, Copy, Check, Quote } from 'lucide-react';

interface CitationModalProps {
  isOpen: boolean;
  onClose: () => void;
  publication: Publication | null;
}

const CitationModal: React.FC<CitationModalProps> = ({ isOpen, onClose, publication }) => {
  const [copied, setCopied] = useState(false);
  const [bibtex, setBibtex] = useState('');

  useEffect(() => {
    if (publication) {
      // Generate BibTeX
      const type = publication.track === 'Journal' ? '@article' : '@inproceedings';
      
      // Safe parsing for BibTeX Key
      const firstAuthor = publication.authors[0] || 'Unknown';
      // Fallback to 'author' if pop() returns undefined
      const lastName = firstAuthor.split(' ').pop() || 'author'; 
      const firstTitleWord = publication.title.split(' ')[0] || 'title';
      
      const key = lastName.toLowerCase() + publication.year + firstTitleWord.toLowerCase();
      
      const authorStr = publication.authors.join(' and ');
      
      const text = `${type}{${key},
  title={${publication.title}},
  author={${authorStr}},
  ${publication.track === 'Journal' ? 'journal' : 'booktitle'}={${publication.venue}},
  year={${publication.year}}${publication.location ? `,\n  address={${publication.location}}` : ''}
}`;
      setBibtex(text);
    }
  }, [publication]);

  const handleCopy = () => {
    navigator.clipboard.writeText(bibtex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen || !publication) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-white/80 dark:bg-black/80 backdrop-blur-sm" 
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-sm overflow-hidden transform transition-all scale-100">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-black">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-mono font-bold">
                <Quote size={18} className="text-blue-600" />
                Cite this paper
            </div>
            <button 
                onClick={onClose}
                className="text-slate-400 hover:text-red-500 transition-colors"
            >
                <X size={20} />
            </button>
        </div>

        {/* Body */}
        <div className="p-6">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 font-sans">
                Copy the following BibTeX entry for your bibliography:
            </p>
            
            <div className="relative group">
                <pre className="bg-slate-100 dark:bg-black border border-slate-200 dark:border-slate-800 p-4 rounded text-xs sm:text-sm font-mono text-slate-800 dark:text-slate-300 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                    {bibtex}
                </pre>
                
                <button 
                    onClick={handleCopy}
                    className="absolute top-2 right-2 p-2 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                    title="Copy to Clipboard"
                >
                    {copied ? <Check size={16} className="text-green-500"/> : <Copy size={16} />}
                </button>
            </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 dark:bg-black px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
            <button 
                onClick={onClose}
                className="px-4 py-2 text-sm font-mono text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
                Close
            </button>
            <button 
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 text-sm font-mono font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-md"
            >
                {copied ? 'Copied!' : 'Copy BibTeX'}
            </button>
        </div>
      </div>
    </div>
  );
};

export default CitationModal;