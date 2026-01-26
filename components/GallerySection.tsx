
import React, { useState, useEffect, useCallback } from 'react';
import { AppData, GalleryAlbum } from '../types';
import SectionTitle from './SectionTitle';
import { X, ChevronLeft, ChevronRight, ZoomIn, Folder, ArrowLeft, Image as ImageIcon } from 'lucide-react';

interface GallerySectionProps {
  albums: GalleryAlbum[];
  labels: AppData['ui']['gallery'];
}

const GallerySection: React.FC<GallerySectionProps> = ({ albums, labels }) => {
  // State for Album Selection
  const [selectedAlbumId, setSelectedAlbumId] = useState<string | null>(null);
  
  // State for Photo Selection (Lightbox)
  const [selectedPhotoId, setSelectedPhotoId] = useState<string | null>(null);

  // Derived state
  const selectedAlbum = albums.find(a => a.id === selectedAlbumId);
  // If an album is selected, get its items, otherwise empty
  const currentItems = selectedAlbum ? selectedAlbum.items : [];
  
  // Find index for lightbox navigation
  const selectedIndex = currentItems.findIndex(item => item.id === selectedPhotoId);
  const selectedItem = currentItems[selectedIndex];

  const handleCloseLightbox = useCallback(() => {
    setSelectedPhotoId(null);
  }, []);

  const handlePrevPhoto = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex > 0) {
      setSelectedPhotoId(currentItems[selectedIndex - 1].id);
    } else {
      setSelectedPhotoId(currentItems[currentItems.length - 1].id);
    }
  }, [selectedIndex, currentItems]);

  const handleNextPhoto = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex < currentItems.length - 1) {
      setSelectedPhotoId(currentItems[selectedIndex + 1].id);
    } else {
      setSelectedPhotoId(currentItems[0].id);
    }
  }, [selectedIndex, currentItems]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedPhotoId) return;
      if (e.key === 'Escape') handleCloseLightbox();
      if (e.key === 'ArrowLeft') handlePrevPhoto();
      if (e.key === 'ArrowRight') handleNextPhoto();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoId, handleCloseLightbox, handlePrevPhoto, handleNextPhoto]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedPhotoId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedPhotoId]);

  return (
    <section id="gallery" className="pt-2 pb-8 bg-white dark:bg-black relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle 
          title={labels.title}
          subtitle={labels.subtitle}
        />
        
        {/* === VIEW 1: ALBUM GRID (Show when no album is selected) === */}
        {!selectedAlbumId && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {albums.map((album) => (
                    <div 
                        key={album.id}
                        onClick={() => setSelectedAlbumId(album.id)}
                        className="group cursor-pointer flex flex-col gap-4"
                    >
                        {/* Album Cover */}
                        <div className="aspect-[4/3] bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden relative shadow-sm transition-all duration-300 group-hover:shadow-lg group-hover:border-blue-400 dark:group-hover:border-blue-600 rounded-sm">
                             {/* Stack Effect Layers */}
                             <div className="absolute top-2 right-2 w-full h-full bg-slate-200 dark:bg-slate-800 -z-10 rounded-sm transform translate-x-2 translate-y-2"></div>
                             
                             <img 
                                src={album.coverUrl} 
                                alt={album.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                             />
                             
                             {/* Overlay with Icon */}
                             <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/30 transition-colors duration-300 flex items-center justify-center">
                                <div className="bg-white/90 dark:bg-black/80 backdrop-blur-sm p-4 rounded-full text-slate-900 dark:text-white shadow-xl opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all duration-300">
                                    <Folder size={24} />
                                </div>
                             </div>
                        </div>

                        {/* Album Info */}
                        <div>
                            <div className="flex justify-between items-baseline mb-1">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {album.title}
                                </h3>
                                <span className="font-mono text-xs text-slate-400">
                                    {album.date}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                                <ImageIcon size={12}/> {album.items.length} {labels.photosCount}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )}

        {/* === VIEW 2: PHOTO GRID (Show when an album IS selected) === */}
        {selectedAlbum && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                {/* Header / Back Button */}
                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                    <button 
                        onClick={() => setSelectedAlbumId(null)}
                        className="flex items-center gap-2 text-sm font-mono text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors group"
                    >
                        <div className="p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
                            <ArrowLeft size={16} />
                        </div>
                        {labels.backToAlbums}
                    </button>
                    
                    <div className="text-right">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                            {selectedAlbum.title}
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-mono">
                            {selectedAlbum.description}
                        </p>
                    </div>
                </div>

                {/* Photos Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentItems.map((item, index) => (
                    <div 
                        key={item.id} 
                        className="group cursor-pointer flex flex-col gap-3"
                        onClick={() => setSelectedPhotoId(item.id)}
                    >
                        <div className="aspect-[4/3] bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden relative shadow-sm transition-all duration-300 group-hover:shadow-lg group-hover:border-blue-400 dark:group-hover:border-blue-600">
                            <img 
                                src={item.imageUrl} 
                                alt={item.caption}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <div className="bg-white/90 dark:bg-black/80 backdrop-blur-sm p-3 rounded-full text-slate-900 dark:text-white shadow-xl transform scale-90 group-hover:scale-100 transition-all duration-300">
                                    <ZoomIn size={24} />
                                </div>
                            </div>
                        </div>

                        <div className="font-mono text-sm text-slate-500 dark:text-slate-400 border-l-2 border-transparent group-hover:border-blue-500 pl-3 transition-colors">
                            <span className="font-bold text-slate-900 dark:text-slate-300">#{index + 1}:</span> {item.caption}
                        </div>
                    </div>
                ))}
                </div>
            </div>
        )}
      </div>

      {/* Lightbox / Detail View Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-[100] bg-white/95 dark:bg-black/95 backdrop-blur-md flex items-center justify-center animate-in fade-in duration-200">
            <button 
                onClick={handleCloseLightbox}
                className="absolute top-6 right-6 p-2 text-slate-500 hover:text-red-500 dark:text-slate-400 dark:hover:text-red-400 transition-colors z-50"
            >
                <X size={32} strokeWidth={1.5} />
            </button>

            <button 
                onClick={handlePrevPhoto}
                className="absolute left-4 md:left-8 p-3 rounded-full bg-slate-100/50 dark:bg-slate-800/50 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-600 text-slate-900 dark:text-white transition-all z-40 hidden md:block"
            >
                <ChevronLeft size={32} />
            </button>

            <button 
                onClick={handleNextPhoto}
                className="absolute right-4 md:right-8 p-3 rounded-full bg-slate-100/50 dark:bg-slate-800/50 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-600 text-slate-900 dark:text-white transition-all z-40 hidden md:block"
            >
                <ChevronRight size={32} />
            </button>

            <div className="w-full h-full flex flex-col items-center justify-center px-4 md:px-20 py-12" onClick={handleCloseLightbox}>
                <div 
                    className="relative max-w-7xl max-h-[80vh] flex flex-col items-center"
                    onClick={(e) => e.stopPropagation()} 
                >
                    <img 
                        src={selectedItem.imageUrl} 
                        alt={selectedItem.caption}
                        className="max-w-full max-h-[75vh] w-auto h-auto object-contain shadow-2xl bg-black" 
                    />
                    
                    <div className="mt-6 text-center max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 md:px-8 md:py-4 shadow-lg rounded-sm">
                        <div className="font-mono text-xs text-blue-600 dark:text-blue-400 mb-1 font-bold tracking-wider">
                            {selectedAlbum?.title} // {selectedIndex + 1} OF {currentItems.length}
                        </div>
                        <p className="text-lg text-slate-900 dark:text-white font-medium leading-relaxed">
                            {selectedItem.caption}
                        </p>
                    </div>
                </div>
            </div>

            <div className="md:hidden absolute inset-y-0 left-0 w-1/4 z-30" onClick={handlePrevPhoto}></div>
            <div className="md:hidden absolute inset-y-0 right-0 w-1/4 z-30" onClick={handleNextPhoto}></div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
