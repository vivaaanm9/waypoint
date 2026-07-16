import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';



export const StatisticsCard = ({ label, value, trend, icon }) => {
  const isPositive = trend && trend > 0;
  
  return (
    <div className="bg-white/40 border border-[#BCCCDC]/40 rounded-3xl p-5 flex flex-col gap-3 backdrop-blur-xl shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-[#9AA6B2]">{label}</span>
        {icon && <div className="text-[#BCCCDC]">{icon}</div>}
      </div>
      <div className="flex items-end justify-between">
        <span className="text-3xl font-bold text-gray-800 tracking-tight">{value}</span>
        {trend !== undefined && (
          <div
            className={`flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-lg ${
              isPositive ? 'bg-green-100/50 text-green-700' : 'bg-red-100/50 text-red-700'
            }`}
          >
            {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
    </div>
  );
};
