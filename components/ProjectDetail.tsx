
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Project } from '../types';
import { Terminal, Calendar, Award, User, Tag, FileText } from 'lucide-react';

interface ProjectDetailProps {
  projects: Project[];
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ projects }) => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center p-8 font-mono">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">404: Project Not Found</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-8">// The requested project ID is missing.</p>
        <Link to="/projects" className="px-6 py-3 border border-slate-900 dark:border-white text-slate-900 dark:text-white hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-colors">
          cd /projects
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-8 pb-20 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation */}
        <div className="mb-8">
            <Link to="/projects" className="inline-flex items-center text-sm font-mono text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors group">
            <Terminal size={14} className="mr-2" />
            <span className="mr-2">cd ..</span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-300 dark:text-slate-600 ml-2">// Back to Projects</span>
            </Link>
        </div>

        {/* Header Block */}
        <div className="bg-white dark:bg-black border border-slate-200 dark:border-slate-800 p-8 md:p-12 mb-8 shadow-sm relative overflow-hidden">
            {/* Background Texture/Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-100 dark:bg-slate-900 rounded-bl-full -mr-16 -mt-16 opacity-50 pointer-events-none"></div>

            <div className="relative z-10">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className={`px-2 py-1 text-xs font-bold font-mono border ${
                        project.status === 'Ongoing' 
                        ? 'border-green-500 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20' 
                        : 'border-slate-300 text-slate-500 bg-slate-50 dark:bg-slate-900/20'
                    }`}>
                        {project.status.toUpperCase()}
                    </span>
                    <span className="text-slate-400 font-mono text-xs uppercase tracking-wider">
                        {project.type} Project
                    </span>
                </div>
                
                <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight mb-6">
                    {project.title}
                </h1>
                
                <div className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
                    {project.summary}
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Sidebar (Metadata) */}
            <div className="lg:col-span-1 space-y-6">
                
                {/* Info Card */}
                <div className="bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 p-6">
                    <h3 className="text-sm font-bold font-mono text-slate-900 dark:text-white mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">
                        Project Details
                    </h3>
                    <div className="space-y-4 text-sm font-mono">
                        <div>
                            <div className="text-slate-400 mb-1 flex items-center gap-2"><Award size={14}/> Funding Agency</div>
                            <div className="text-slate-800 dark:text-slate-200 font-medium">{project.agency}</div>
                        </div>
                        <div>
                            <div className="text-slate-400 mb-1 flex items-center gap-2"><Calendar size={14}/> Duration</div>
                            <div className="text-slate-800 dark:text-slate-200">{project.duration}</div>
                        </div>
                        {project.role && (
                             <div>
                                <div className="text-slate-400 mb-1 flex items-center gap-2"><User size={14}/> Our Role</div>
                                <div className="text-slate-800 dark:text-slate-200">{project.role}</div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Tags Card */}
                {project.tags && (
                    <div className="bg-white dark:bg-black border border-slate-200 dark:border-slate-800 p-6">
                        <h3 className="text-sm font-bold font-mono text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                            <Tag size={14} /> Keywords
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map(tag => (
                                <span key={tag} className="px-2 py-1 text-xs bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 rounded-sm">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
                {project.imageUrl && (
                    <div className="w-full aspect-video bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden">
                        <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
                    </div>
                )}

                <div className="prose prose-slate dark:prose-invert max-w-none font-sans">
                     <h3 className="flex items-center gap-2 text-xl font-bold font-mono text-slate-900 dark:text-white not-prose mb-4 pb-2 border-b border-slate-100 dark:border-slate-800">
                        <FileText size={20} className="text-blue-500"/> Description
                     </h3>
                     {/* Render content paragraphs */}
                     {(project.content || project.summary).split('\n').map((paragraph, idx) => {
                         // Simple Markdown-ish parsing for bold text (**text**)
                         const parts = paragraph.split(/(\*\*.*?\*\*)/g);
                         return (
                            <p key={idx} className="mb-4 text-slate-800 dark:text-slate-200 leading-relaxed text-lg">
                                {parts.map((part, i) => {
                                    if (part.startsWith('**') && part.endsWith('**')) {
                                        return <strong key={i} className="font-bold text-slate-900 dark:text-white">{part.slice(2, -2)}</strong>;
                                    }
                                    return part;
                                })}
                            </p>
                         );
                     })}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
