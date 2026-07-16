import React from 'react';
import { DashboardCard } from './DashboardCard';
import { Smartphone, Monitor, ShieldCheck, Zap } from 'lucide-react';

export const WebsiteAnalysisCard = () => {
  const metrics = [
    { label: 'Mobile Responsive', value: 'Yes', icon: <Smartphone size={18} />, status: 'good' },
    { label: 'Desktop Optimized', value: 'Yes', icon: <Monitor size={18} />, status: 'good' },
    { label: 'SSL Certificate', value: 'Valid', icon: <ShieldCheck size={18} />, status: 'good' },
    { label: 'Load Speed', value: '1.2s', icon: <Zap size={18} />, status: 'warning' },
  ];

  return (
    <DashboardCard title="Website Analysis" icon={<Monitor size={20} />}>
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric, idx) => (
          <div key={idx} className="flex items-center gap-3 p-3 rounded-2xl bg-white/30 border border-[#BCCCDC]/20 transition-all hover:bg-white/50">
            <div className={`p-2 rounded-xl ${
              metric.status === 'good' ? 'bg-green-100/50 text-green-600' : 'bg-yellow-100/50 text-yellow-600'
            }`}>
              {metric.icon}
            </div>
            <div>
              <p className="text-xs text-[#9AA6B2] font-medium uppercase tracking-wider">{metric.label}</p>
              <p className="text-sm font-semibold text-gray-800">{metric.value}</p>
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
};
