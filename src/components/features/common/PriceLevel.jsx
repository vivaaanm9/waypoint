import React from 'react';



export const PriceLevel = ({ level, className = '' }) => {
  return (
    <div className={`flex items-center gap-0.5 ${className}`}>
      {[1, 2, 3, 4].map((step) => (
        <span
          key={step}
          className={`text-sm font-bold ${
            step <= level ? 'text-[#9AA6B2]' : 'text-[#BCCCDC]/50 font-normal'
          }`}
        >
          $
        </span>
      ))}
    </div>
  );
};
