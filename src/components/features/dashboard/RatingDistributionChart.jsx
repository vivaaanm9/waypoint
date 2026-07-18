import React from 'react';
import { DashboardCard } from './DashboardCard';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Star } from 'lucide-react';


export const RatingDistributionChart = ({ data }) => {
  return (
    <DashboardCard title="Rating Distribution" icon={<Star size={20} />}>
      <div className="h-64 w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <XAxis 
              dataKey="rating" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9AA6B2', fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9AA6B2', fontSize: 12 }}
            />
            <Tooltip 
              cursor={{ fill: 'rgba(188, 204, 220, 0.1)' }}
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                borderRadius: '12px',
                border: '1px solid rgba(188, 204, 220, 0.4)',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
              }}
              itemStyle={{ color: '#1f2937', fontWeight: 600 }}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.rating === '5 Star' ? '#D9EAFD' : '#BCCCDC'} 
                  className="transition-all duration-300 hover:opacity-80 cursor-pointer"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
};
