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
      className={`relative inline-block ${className}`}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}
      {active && (
        <div className={`absolute z-100 ${positionStyles[position]} bg-slate-900/95 text-white text-[9px] font-bold px-2 py-1.5 rounded-lg whitespace-nowrap shadow-md select-none pointer-events-none animate-[fadeIn_0.15s_ease-out]`}>
          {text}
        </div>
      )}
    </div>
  );
}
