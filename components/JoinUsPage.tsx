
import React, { useState } from 'react';
import { AppData, JoinUsData } from '../types';
import SectionTitle from './SectionTitle';
import { Mail, CheckCircle, HelpCircle, Briefcase, GraduationCap, ChevronDown, ChevronUp } from 'lucide-react';

interface JoinUsPageProps {
  data: JoinUsData;
  labels: AppData['ui']['joinUs'];
}

const JoinUsPage: React.FC<JoinUsPageProps> = ({ data, labels }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="py-12 bg-white dark:bg-black min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionTitle title={labels.title} subtitle={labels.subtitle} />

        {/* Introduction */}
        <div className="mb-20">
             <div className="text-xl md:text-2xl font-light text-slate-800 dark:text-slate-200 leading-relaxed border-l-4 border-blue-600 pl-6">
                {data.intro}
             </div>
        </div>

        {/* Alumni Placement Wall */}
        <div className="mb-24">
            <h3 className="text-xl font-bold font-mono text-slate-900 dark:text-white mb-8 border-b border-slate-200 dark:border-slate-800 pb-2 flex items-center gap-2">
                <span className="text-blue-500">##</span> {labels.alumniTitle}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {data.placements.map((group, idx) => (
                    <div key={idx} className="bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 p-6 rounded-sm">
                        <div className="flex items-center gap-3 mb-6">
                            {group.category === 'Academia' ? <GraduationCap size={24} className="text-blue-600"/> : <Briefcase size={24} className="text-emerald-600"/>}
                            <h4 className="text-lg font-bold text-slate-900 dark:text-white font-mono uppercase tracking-wider">
                                {group.category}
                            </h4>
                        </div>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4">
                            {group.items.map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300 font-medium">
                                    <span className="text-slate-300 mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0"></span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>

        {/* Open Positions */}
        <div className="mb-24">
            <h3 className="text-xl font-bold font-mono text-slate-900 dark:text-white mb-8 border-b border-slate-200 dark:border-slate-800 pb-2 flex items-center gap-2">
                <span className="text-blue-500">##</span> {labels.openPositionsTitle}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {data.positions.map((pos, idx) => (
                    <div key={idx} className="group border border-slate-200 dark:border-slate-800 p-6 hover:border-blue-500 dark:hover:border-blue-500 transition-colors bg-white dark:bg-black">
                        <div className="mb-4">
                            <span className="px-2 py-1 bg-slate-100 dark:bg-slate-900 text-xs font-mono font-bold text-slate-600 dark:text-slate-300 rounded-sm">
                                {pos.type.toUpperCase()}
                            </span>
                        </div>
                        <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors">
                            {pos.title}
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                            {pos.description}
                        </p>
                        
                        <div className="space-y-2">
                            <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">Requirements</div>
                            {pos.requirements.map((req, rIdx) => (
                                <div key={rIdx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                                    <CheckCircle size={14} className="text-blue-500 shrink-0 mt-0.5" />
                                    <span>{req}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* FAQ & Apply Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left: FAQ */}
            <div className="lg:col-span-2">
                <h3 className="text-xl font-bold font-mono text-slate-900 dark:text-white mb-6 border-b border-slate-200 dark:border-slate-800 pb-2 flex items-center gap-2">
                    <span className="text-blue-500">##</span> {labels.faqTitle}
                </h3>
                <div className="space-y-4">
                    {data.faq.map((item, idx) => (
                        <div key={idx} className="border border-slate-200 dark:border-slate-800 rounded-sm overflow-hidden">
                            <button 
                                onClick={() => toggleFaq(idx)}
                                className="w-full flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/20 hover:bg-slate-100 dark:hover:bg-slate-900/40 transition-colors text-left"
                            >
                                <span className="font-bold text-slate-800 dark:text-slate-200 text-sm flex items-center gap-3">
                                    <HelpCircle size={16} className="text-slate-400"/>
                                    {item.question}
                                </span>
                                {openFaqIndex === idx ? <ChevronUp size={16} className="text-slate-400"/> : <ChevronDown size={16} className="text-slate-400"/>}
                            </button>
                            {openFaqIndex === idx && (
                                <div className="p-4 bg-white dark:bg-black text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 animate-in slide-in-from-top-1">
                                    {item.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Right: Apply Card */}
            <div className="lg:col-span-1">
                 <div className="sticky top-24">
                    <div className="bg-slate-900 dark:bg-slate-800 text-white p-8 rounded-sm shadow-xl">
                        <h3 className="text-2xl font-bold font-mono mb-6 flex items-center gap-2">
                            {labels.applyTitle}
                        </h3>
                        
                        <div className="space-y-6 text-sm">
                            <div>
                                <div className="text-slate-400 text-xs font-mono uppercase mb-1">Send Email To</div>
                                <div className="flex items-center gap-2 font-mono font-bold text-blue-300">
                                    <Mail size={16}/> {data.applicationGuide.email}
                                </div>
                            </div>

                            <div>
                                <div className="text-slate-400 text-xs font-mono uppercase mb-1">Subject Format</div>
                                <div className="p-2 bg-black/30 rounded font-mono text-xs text-slate-300 break-all border border-white/10">
                                    {data.applicationGuide.subjectFormat}
                                </div>
                            </div>

                            <div>
                                <div className="text-slate-400 text-xs font-mono uppercase mb-2">Required Materials</div>
                                <ul className="space-y-2">
                                    {data.applicationGuide.materials.map((m, i) => (
                                        <li key={i} className="flex items-center gap-2 text-slate-200">
                                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                            {m}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                 </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default JoinUsPage;
