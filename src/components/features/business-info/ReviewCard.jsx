import React from 'react';
import { Star, ThumbsUp, MessageSquare } from 'lucide-react';



export const ReviewCard = ({
  authorName,
  authorAvatar,
  rating,
  date,
  content,
  helpfulCount = 0,
}) => {
  return (
    <div className="bg-white/40 border border-[#BCCCDC]/30 rounded-3xl p-6 backdrop-blur-md shadow-sm transition-all duration-300 hover:bg-white/60 hover:shadow-md hover:-translate-y-0.5">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {authorAvatar ? (
            <img src={authorAvatar} alt={authorName} className="w-10 h-10 rounded-full object-cover shadow-sm" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D9EAFD] to-[#BCCCDC] flex items-center justify-center shadow-sm">
              <span className="text-sm font-bold text-gray-700">{authorName.charAt(0)}</span>
            </div>
          )}
          <div>
            <h4 className="font-semibold text-gray-800 text-sm">{authorName}</h4>
            <p className="text-xs text-[#9AA6B2]">{date}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-0.5 text-yellow-500 bg-yellow-50/50 px-2 py-1 rounded-lg">
          <span className="text-sm font-bold">{rating}</span>
          <Star size={14} className="fill-current" />
        </div>
      </div>
      
      <p className="text-gray-700 text-sm leading-relaxed mb-4">
        {content}
      </p>
      
      <div className="flex items-center gap-4 text-xs font-medium text-[#9AA6B2]">
        <button className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
          <ThumbsUp size={14} />
          <span>Helpful ({helpfulCount})</span>
        </button>
        <button className="flex items-center gap-1.5 hover:text-gray-700 transition-colors">
          <MessageSquare size={14} />
          <span>Reply</span>
        </button>
      </div>
    </div>
  );
};
