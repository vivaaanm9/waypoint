import React from 'react';
import { DashboardCard } from './DashboardCard';
import { Activity } from 'lucide-react';



export const PerformanceScore = ({ score }) => {
  // Calculate SVG circle properties
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  // Determine color based on score
  const getColor = (s) => {
    if (s >= 90) return 'text-green-500';
    if (s >= 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <DashboardCard title="Performance Score" icon={<Activity size={20} />} className="flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center py-4">
        {/* Background Circle */}
        <svg className="transform -rotate-90 w-40 h-40">
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            className="text-[#BCCCDC]/20"
          />
          {/* Progress Circle */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className={`${getColor(score)} transition-all duration-1000 ease-out drop-shadow-md`}
            strokeLinecap="round"
          />
        </svg>
        {/* Score Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-gray-800">{score}</span>
          <span className="text-xs text-[#9AA6B2] font-medium uppercase tracking-wide">Out of 100</span>
        </div>
      </div>
      
      <div className="mt-2 text-center">
        <p className="text-sm text-[#9AA6B2]">
          Based on web vitals and overall digital health.
        </p>
      </div>
    </DashboardCard>
  );
};
