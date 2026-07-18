import React from 'react';
import { DashboardCard } from './DashboardCard';
import { Globe } from 'lucide-react';



export const DomainAgeCard = ({ years, months, creationDate }) => {
  return (
    <DashboardCard title="Domain Age" icon={<Globe size={20} />}>
      <div className="flex flex-col items-center justify-center p-4">
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-5xl font-bold text-gray-800 tracking-tighter">{years}</span>
          <span className="text-lg font-medium text-[#9AA6B2]">yrs</span>
          <span className="text-5xl font-bold text-gray-800 tracking-tighter ml-2">{months}</span>
          <span className="text-lg font-medium text-[#9AA6B2]">mos</span>
        </div>
        
        <div className="w-full bg-white/30 border border-[#BCCCDC]/20 rounded-xl p-3 flex justify-between items-center mt-2">
          <span className="text-sm font-medium text-[#9AA6B2]">Registered On</span>
          <span className="text-sm font-semibold text-gray-800">{new Date(creationDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </div>
    </DashboardCard>
  );
};
