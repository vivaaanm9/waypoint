import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';



export const PhotoGallery = ({ photos }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  if (!photos || photos.length === 0) return null;

  const openLightbox = (index) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);
  
  const handlePrev = (e) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === 0 ? photos.length - 1 : selectedIndex - 1);
    }
  };

  const handleNext = (e) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === photos.length - 1 ? 0 : selectedIndex + 1);
    }
  };

  return (
    <div className="w-full">
      {/* Grid Layout */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.slice(0, 7).map((photo, index) => (
          <div 
            key={index}
            onClick={() => openLightbox(index)}
            className="group relative h-40 md:h-48 rounded-2xl overflow-hidden cursor-pointer bg-[#BCCCDC]/20 border border-[#BCCCDC]/30 shadow-sm transition-all hover:shadow-md hover:-translate-y-1"
          >
            <img src={photo} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <Maximize2 size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity transform scale-50 group-hover:scale-100 duration-300" />
            </div>
          </div>
        ))}
        {photos.length > 7 && (
          <div 
            onClick={() => openLightbox(7)}
            className="group relative h-40 md:h-48 rounded-2xl overflow-hidden cursor-pointer bg-[#D9EAFD]/30 border border-[#D9EAFD]/50 shadow-sm flex flex-col items-center justify-center transition-all hover:bg-[#D9EAFD]/50 hover:-translate-y-1"
          >
            <span className="text-3xl font-bold text-blue-600 mb-1">+{photos.length - 7}</span>
            <span className="text-sm font-medium text-blue-600/70 uppercase tracking-wider">More Photos</span>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200" onClick={closeLightbox}>
          <button 
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <X size={24} />
          </button>
          
          <button 
            onClick={handlePrev}
            className="absolute left-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <ChevronLeft size={32} />
          </button>
          
          <div className="relative max-w-5xl max-h-[80vh] w-full px-16">
            <img 
              src={photos[selectedIndex]} 
              alt={`Gallery ${selectedIndex + 1}`} 
              className="w-full h-full object-contain drop-shadow-2xl rounded-lg"
            />
            <div className="absolute bottom-4 left-0 right-0 text-center text-white/80 font-medium">
              {selectedIndex + 1} / {photos.length}
            </div>
          </div>

          <button 
            onClick={handleNext}
            className="absolute right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      )}
    </div>
  );
};
