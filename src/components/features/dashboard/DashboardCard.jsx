import React from 'react';



export const DashboardCard = ({ title, icon, children, className = '' }) => {
  return (
    <div className={`bg-white/40 border border-[#BCCCDC]/40 rounded-3xl p-6 backdrop-blur-xl shadow-[0_8px_32px_rgba(188,204,220,0.15)] transition-all duration-300 hover:shadow-[0_8px_32px_rgba(188,204,220,0.25)] hover:-translate-y-1 ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        {icon && <div className="text-[#9AA6B2] p-2 bg-[#D9EAFD]/30 rounded-xl">{icon}</div>}
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      <div className="w-full">
        {children}
      </div>
    </div>
  );
};
