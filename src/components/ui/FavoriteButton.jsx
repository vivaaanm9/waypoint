import React from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FavoriteButton({
  isFav,
  onClick,
  className = ''
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.85 }}
      whileHover={{ scale: 1.08 }}
      onClick={(e) => {
        e.stopPropagation();
        onClick && onClick(e);
      }}
      className={`p-2 rounded-xl bg-white/95 backdrop-blur-xs flex items-center justify-center text-slate-350 hover:text-rose-500 shadow-xs border border-brand-border/20 transition-colors cursor-pointer ${className}`}
    >
      <Heart 
        className={`w-4.5 h-4.5 transition-all ${
          isFav 
            ? 'fill-rose-500 stroke-rose-500 text-rose-500' 
            : 'text-slate-400 group-hover:text-rose-500'
        }`} 
      />
    </motion.button>
  );
}
