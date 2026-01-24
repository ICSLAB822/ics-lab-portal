
import React from 'react';
import { AppData, Person } from '../types';
import SectionTitle from './SectionTitle';
import { Globe } from 'lucide-react';

interface PeopleSectionProps {
  people: Person[];
  labels: AppData['ui']['people'];
}

const PeopleSection: React.FC<PeopleSectionProps> = ({ people, labels }) => {
  const categories: Person['roleKey'][] = ['Professor', 'Researcher', 'PhD Student', 'Master Student', 'Alumni'];
  
  const getCategoryTitle = (roleKey: string) => {
    const sample = people.find(p => p.roleKey === roleKey);
    return sample ? sample.role : roleKey;
  };

  return (
    <section id="people" className="py-24 bg-white dark:bg-black">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title={labels.title} subtitle={labels.subtitle} />
        
        <div className="space-y-16">
            {categories.map((categoryKey) => {
            const group = people.filter(p => p.roleKey === categoryKey);
            if (group.length === 0) return null;
            
            return (
                <div key={categoryKey}>
                <h3 className="text-xl font-bold font-mono text-slate-900 dark:text-white mb-8 border-b border-slate-200 dark:border-slate-800 pb-2 flex items-center gap-2">
                    <span className="text-blue-500">###</span> {getCategoryTitle(categoryKey)}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                    {group.map((person) => (
                    <div key={person.id} className="group flex items-start gap-6">
                        {/* 
                            Avatar: Adjusted size per user request
                            w-[6.5rem] corresponds to 'w-26' (26 * 0.25rem = 6.5rem)
                            sm:w-32 is the desktop size (8rem)
                            aspect-[3/4] keeps rectangular shape
                        */}
                        <div className="w-[6.5rem] sm:w-32 aspect-[3/4] shrink-0 bg-slate-100 dark:bg-slate-900 overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm relative">
                            <img 
                                src={person.imageUrl} 
                                alt={person.name} 
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                            />
                            {/* Optional subtle overlay on hover */}
                            <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/5 transition-colors pointer-events-none"></div>
                        </div>
                        
                        <div className="flex-1 min-w-0 pt-1">
                            <h4 className="font-bold text-xl text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight mb-2">
                                {person.name}
                            </h4>

                            {/* Period / Year Span */}
                            {person.period && (
                                <div className="text-xs font-mono text-slate-400 mb-3 block">
                                    // {person.period}
                                </div>
                            )}
                            
                            {/* Research Interests */}
                            {person.roleKey !== 'Professor' && person.researchInterests.length > 0 && (
                                <div className="mb-4">
                                    <div className="flex flex-wrap gap-1.5">
                                        {person.researchInterests.map(tag => (
                                            <span key={tag} className="px-1.5 py-0.5 text-[10px] font-mono border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/50">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            
                            {/* Description/Bio for Professors (if available) */}
                            {person.roleKey === 'Professor' && person.bio && (
                                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 mb-4 leading-relaxed">
                                    {person.bio}
                                </p>
                            )}
                            
                            <div className="flex flex-col gap-1.5 mt-auto">
                                {/* Email */}
                                {person.email && (
                                    <div className="text-xs sm:text-sm font-mono text-slate-600 dark:text-slate-400 break-all">
                                        {person.email}
                                    </div>
                                )}
                                
                                {/* Website */}
                                {person.website && (
                                    <a 
                                        href={person.website} 
                                        target="_blank" 
                                        rel="noreferrer" 
                                        className="flex items-center gap-1.5 text-xs font-mono text-blue-600 dark:text-blue-400 hover:underline decoration-blue-600/30 underline-offset-2 mt-1"
                                    >
                                        <Globe size={12} /> Personal Page
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
                </div>
            );
            })}
        </div>
      </div>
    </section>
  );
};

export default PeopleSection;
