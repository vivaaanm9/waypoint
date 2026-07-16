import React from 'react';
import { Clock } from 'lucide-react';


export const BusinessHours = ({ hours }) => {
  const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <div className="bg-white/40 border border-[#BCCCDC]/40 rounded-3xl p-6 backdrop-blur-xl shadow-[0_8px_32px_rgba(188,204,220,0.15)]">
      <div className="flex items-center gap-2 mb-6">
        <Clock className="text-[#9AA6B2]" size={20} />
        <h3 className="text-lg font-bold text-gray-800">Hours</h3>
      </div>
      
      <div className="flex flex-col gap-3">
        {hours.map((schedule) => {
          const isToday = schedule.day === currentDay;
          return (
            <div 
              key={schedule.day}
              className={`flex justify-between items-center p-2.5 rounded-xl transition-colors ${
                isToday ? 'bg-[#D9EAFD]/40 border border-[#D9EAFD]' : 'hover:bg-white/50 border border-transparent'
              }`}
            >
              <span className={`font-medium ${isToday ? 'text-gray-800' : 'text-[#7C8A9B]'}`}>
                {schedule.day}
                {isToday && <span className="ml-2 text-xs font-bold text-blue-500 uppercase tracking-wider">Today</span>}
              </span>
              <span className={`text-sm ${
                schedule.isClosed 
                  ? 'text-red-500 font-medium' 
                  : isToday ? 'text-gray-800 font-semibold' : 'text-[#9AA6B2]'
              }`}>
                {schedule.isClosed ? 'Closed' : `${schedule.open} - ${schedule.close}`}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
