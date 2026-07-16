import React from 'react';
import { Star, MapPin } from 'lucide-react';
import { PriceLevel } from '../common/PriceLevel';


export const BusinessCard = ({
  id,
  name,
  category,
  rating,
  reviewCount,
  priceLevel,
  address,
  imageUrl,
  isOpen,
  onClick,
}) => {
  return (
    <div 
      onClick={() => onClick(id)}
      className="group relative flex flex-col sm:flex-row gap-4 p-4 bg-white/40 border border-[#BCCCDC]/40 rounded-3xl backdrop-blur-xl shadow-[0_8px_32px_rgba(188,204,220,0.15)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(188,204,220,0.3)] hover:-translate-y-1 cursor-pointer overflow-hidden"
    >
      {/* Decorative Gradient Background */}
      <div className="absolute inset-0 bg-glass-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Image Container */}
      <div className="relative w-full sm:w-48 h-48 sm:h-auto rounded-2xl overflow-hidden shrink-0">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80'; }}
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="px-2.5 py-1 text-xs font-semibold bg-white/80 backdrop-blur-md rounded-lg text-gray-800 shadow-sm">
            {category}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className={`px-2.5 py-1 text-xs font-semibold rounded-lg shadow-sm backdrop-blur-md ${
            isOpen ? 'bg-green-100/90 text-green-700' : 'bg-red-100/90 text-red-700'
          }`}>
            {isOpen ? 'Open' : 'Closed'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col justify-center flex-1 py-2 relative z-10">
        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
          {name}
        </h3>
        
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-1 bg-[#D9EAFD]/50 px-2 py-0.5 rounded-md">
            <span className="font-semibold text-gray-800">{rating}</span>
            <Star size={14} className="text-yellow-500 fill-yellow-500" />
          </div>
          <span className="text-sm text-[#9AA6B2]">({reviewCount} reviews)</span>
          <span className="text-[#BCCCDC]">•</span>
          <PriceLevel level={priceLevel} />
        </div>

        <div className="flex items-start gap-2 text-[#9AA6B2]">
          <MapPin size={16} className="mt-0.5 shrink-0" />
          <p className="text-sm line-clamp-2">{address}</p>
        </div>
      </div>
    </div>
  );
};
