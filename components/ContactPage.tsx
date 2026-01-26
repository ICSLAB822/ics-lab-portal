
import React from 'react';
import { AppData, LabInfo } from '../types';
import SectionTitle from './SectionTitle';
import { Mail, Phone } from 'lucide-react';
import { ASSETS_BASE } from '../utils/cms';

interface ContactPageProps {
  info: LabInfo;
  labels: AppData['ui']['contactPage'];
  address: string[];
}

const ContactPage: React.FC<ContactPageProps> = ({ info, labels, address }) => {
  const mapImage = `${ASSETS_BASE}/map/map.png`;

  return (
    <div className="pt-2 pb-8 bg-white dark:bg-black min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionTitle title={labels.title} subtitle={labels.subtitle} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          <div className="space-y-12">
             
             {/* Text Info */}
             <div>
                <h3 className="text-lg font-bold font-mono text-slate-900 dark:text-white mb-4 border-b border-slate-200 dark:border-slate-800 pb-1">
                    ### {labels.infoTitle}
                </h3>
                <div className="space-y-6 font-mono text-sm">
                    <div>
                        <span className="text-slate-400 block mb-1">// Address</span>
                        {address.map((line, i) => <div key={i} className="text-slate-800 dark:text-slate-200">{line}</div>)}
                    </div>
                    <div>
                        <span className="text-slate-400 block mb-1">// Contact</span>
                        <div className="flex flex-col gap-1 text-slate-800 dark:text-slate-200">
                             <div className="flex items-center gap-2"><Mail size={14}/> contact@icslab.edu</div>
                             <div className="flex items-center gap-2"><Phone size={14}/> +86 21 6779 2114</div>
                        </div>
                    </div>
                </div>
             </div>

             {/* Path/Instructions */}
             <div>
                <h3 className="text-lg font-bold font-mono text-slate-900 dark:text-white mb-4 border-b border-slate-200 dark:border-slate-800 pb-1">
                    ### {labels.pathTitle}
                </h3>
                <ol className="list-decimal list-inside space-y-3 font-mono text-sm text-slate-700 dark:text-slate-300">
                    {labels.pathSteps.map((step, idx) => (
                        <li key={idx}>
                            <strong className="text-slate-900 dark:text-white">{step.title}</strong>: <span className="text-slate-500">{step.desc}</span>
                        </li>
                    ))}
                </ol>
             </div>
          </div>

          {/* Right: Map/Visual */}
          <div className="space-y-4 pt-8 lg:pt-0">
             <div className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2">
                <img 
                    src={mapImage} 
                    alt="Map" 
                    className="w-full h-auto opacity-90 hover:opacity-100 transition-opacity"
                />
             </div>
             <p className="font-mono text-xs text-center text-slate-400">
                * Fig: Campus Map from North Gate to Lab
             </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;
