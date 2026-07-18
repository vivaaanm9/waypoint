import React, { useState } from 'react';

export default function Tooltip({
  text,
  children,
  position = 'top',
  className = ''
}) {
  const [active, setActive] = useState(false);

  const showTooltip = () => setActive(true);
  const hideTooltip = () => setActive(false);

  const positionStyles = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2'
  };

  return (
    <div 
      className={`relative inline-flex group ${className}`}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}
      
      {/* Visual tooltip element triggered by React state (for focus/blur accessibility) and group-hover CSS */}
      <span
        className={`
          absolute
          z-100
          ${positionStyles[position]}
          whitespace-nowrap
          bg-[#0F172A] bg-slate-900/95
          text-white
          text-[10px] text-xs
          font-semibold font-bold
          px-3 py-2 px-2 py-1.5
          rounded-lg
          shadow-md
          pointer-events-none
          transition-all
          duration-300
          ${active ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-95 group-hover:opacity-100 group-hover:visible group-hover:scale-100'}
        `}
      >
        {text}
      </span>
    </div>
  );
}
