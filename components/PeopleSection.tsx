
import React, { useState } from 'react';
import { AppData, Person } from '../types';
import SectionTitle from './SectionTitle';
import { Globe, User, X, Copy, Check, Building2, Briefcase } from 'lucide-react';

interface PeopleSectionProps {
  people: Person[];
  labels: AppData['ui']['people'];
}

// Bio Modal Component
const BioModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  person: Person | null;
}> = ({ isOpen, onClose, person }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (person?.bio) {
      navigator.clipboard.writeText(person.bio);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isOpen || !person) return null;

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
            <div className="flex items-center gap-3 text-slate-900 dark:text-white font-mono font-bold">
                <User size={18} className="text-blue-600" />
                <span>{person.name}</span>
                {person.title && (
                  <span className="text-xs font-normal text-slate-500 dark:text-slate-400">
                    · {person.title}
                  </span>
                )}
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
                Personal Introduction / Biography:
            </p>

            <div className="relative group">
                <div className="bg-slate-100 dark:bg-black border border-slate-200 dark:border-slate-800 p-4 rounded text-sm font-sans text-slate-800 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                    {person.bio}
                </div>

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
                {copied ? 'Copied!' : 'Copy Text'}
            </button>
        </div>
      </div>
    </div>
  );
};

const PeopleSection: React.FC<PeopleSectionProps> = ({ people, labels }) => {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [isBioModalOpen, setIsBioModalOpen] = useState(false);

  const categories: Person['roleKey'][] = ['Professor', 'Researcher', 'PhD Student', 'Master Student', 'Alumni'];

  const getCategoryTitle = (roleKey: string) => {
    const sample = people.find(p => p.roleKey === roleKey);
    return sample ? sample.role : roleKey;
  };

  const openBioModal = (person: Person) => {
    setSelectedPerson(person);
    setIsBioModalOpen(true);
  };

  return (
    <>
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
                        {/* Avatar */}
                        <div className="w-[6.5rem] sm:w-32 aspect-[3/4] shrink-0 bg-slate-100 dark:bg-slate-900 overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm relative">
                            <img
                                src={person.imageUrl}
                                alt={person.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/5 transition-colors pointer-events-none"></div>
                        </div>

                        <div className="flex-1 min-w-0 pt-1">
                            <h4 className="font-bold text-xl text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight mb-2">
                                {person.name}
                            </h4>

                            {/* Title (e.g. "ICS LAB Director") */}
                            {person.title && (
                                <div className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-3 flex items-center gap-1.5">
                                    <Briefcase size={12} />
                                    {person.title}
                                </div>
                            )}

                            {/* Institution & Department - Compact single line */}
                            {(person.institution || person.department) && (
                                <div className="text-xs text-slate-500 dark:text-slate-400 mb-1 flex items-start gap-1.5">
                                    <Building2 size={11} className="flex-shrink-0 mt-0.5" />
                                    <div className="flex-1">
                                        {person.institution && <div>{person.institution}</div>}
                                        {person.department && (
                                            <div className="text-slate-400 dark:text-slate-500">
                                                {person.department}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Period / Year Span - Cleaner style */}
                            {person.period && (
                                <div className="text-xs text-slate-400 dark:text-slate-500 mb-1">
                                    {person.period}
                                </div>
                            )}

                            {/* Research Interests */}
                            {person.roleKey !== 'Professor' && person.researchInterests.length > 0 && (
                                <div className="mb-3">
                                    <div className="flex flex-wrap gap-1.5">
                                        {person.researchInterests.map(tag => (
                                            <span key={tag} className="px-1.5 py-0.5 text-[10px] font-mono border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/50">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}


                            <div className="flex flex-col gap-2">
                                

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
                                        className="flex items-center gap-1.5 text-xs font-mono text-blue-600 dark:text-blue-400 hover:underline decoration-blue-600/30 underline-offset-2"
                                    >
                                        <Globe size={12} /> Personal Page
                                    </a>
                                )}
                                {/* Bio Button (for Professors with bio) */}
                                {person.roleKey === 'Professor' && person.bio && (
                                    <button
                                        onClick={() => openBioModal(person)}
                                        className="text-xs font-mono text-blue-600 dark:text-blue-400 hover:underline decoration-blue-600/30 underline-offset-2 flex items-center gap-1.5 self-start"
                                    >
                                        <User size={12} /> View Bio
                                    </button>
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

    {/* Bio Modal */}
    <BioModal
      isOpen={isBioModalOpen}
      onClose={() => setIsBioModalOpen(false)}
      person={selectedPerson}
    />
    </>
  );
};

export default PeopleSection;
