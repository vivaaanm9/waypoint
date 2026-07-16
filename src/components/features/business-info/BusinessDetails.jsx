import React from 'react';
import { Star, Share2, Heart } from 'lucide-react';
import { PriceLevel } from '../common/PriceLevel';


export const BusinessDetails = ({ business }) => {
  return (
    <div className="bg-white/40 border border-[#BCCCDC]/40 rounded-3xl overflow-hidden backdrop-blur-xl shadow-[0_8px_32px_rgba(188,204,220,0.15)] flex flex-col">
      {/* Hero Image Section */}
      <div className="relative h-64 md:h-80 w-full group">
        <img 
          src={business.imageUrl} 
          alt={business.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button className="p-2.5 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-colors">
            <Share2 size={20} />
          </button>
          <button className="p-2.5 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 hover:text-red-400 transition-colors">
            <Heart size={20} />
          </button>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
          <div className="flex gap-2 mb-3">
            <span className="px-3 py-1 text-xs font-semibold bg-white/20 backdrop-blur-md rounded-lg">
              {business.category}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-md">
            {business.name}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
            <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-lg">
              <Star size={16} className="text-yellow-400 fill-yellow-400" />
              <span>{business.rating}</span>
              <span className="text-white/70 font-normal">({business.reviewCount} reviews)</span>
            </div>
            <div className="flex items-center bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-lg">
              <PriceLevel level={business.priceLevel} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-800 mb-4">About</h2>
          <p className="text-[#7C8A9B] leading-relaxed mb-6">
            {business.description}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {business.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-[#D9EAFD]/30 text-[#7C8A9B] rounded-full text-sm font-medium border border-[#D9EAFD]">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
