
import React from 'react';
import { AppData, Project } from '../types';
import SectionTitle from './SectionTitle';
import { ArrowUpRight, Folder } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';

interface ProjectsSectionProps {
  projects: Project[];
  labels: AppData['ui']['projects'];
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects, labels }) => {
  return (
    <section id="projects" className="pt-2 pb-8 bg-white dark:bg-black">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle 
          title={labels.title}
          subtitle={labels.subtitle}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Link 
              to={`/projects/${project.id}`}
              key={project.id} 
              className="group relative bg-white dark:bg-black p-6 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 transition-colors duration-300 flex flex-col h-full cursor-pointer"
            >
              <div className="flex justify-between items-start mb-4">
                 <div className="text-slate-400 dark:text-slate-600">
                    <Folder size={24} />
                 </div>
                 <span className={`text-[10px] font-mono px-2 py-0.5 border ${project.status === 'Ongoing' ? 'border-green-500 text-green-600 dark:text-green-400' : 'border-slate-300 text-slate-500'}`}>
                    {project.status.toUpperCase()}
                 </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {project.title}
              </h3>

              <div className="font-mono text-xs text-slate-400 mb-4">
                {project.agency} // {project.duration}
              </div>

              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6 flex-grow">
                 {project.summary}
              </p>
              
              <div className="mt-auto pt-4 border-t border-dashed border-slate-100 dark:border-slate-800 flex justify-between items-center">
                 <span className="text-xs font-mono text-slate-500">{project.type}</span>
                 <ArrowUpRight size={16} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
              </div>
            </Link>
          ))}
        </div>
        <ScrollToTop />
      </div>
    </section>
  );
};

export default ProjectsSection;
