import React from 'react';
import { StatisticsCard } from '../components/features/dashboard/StatisticsCard';
import { RatingDistributionChart } from '../components/features/dashboard/RatingDistributionChart';
import { CategoryDistributionChart } from '../components/features/dashboard/CategoryDistributionChart';
import { Store, Users, TrendingUp } from 'lucide-react';



const RATING_DATA = [
  { rating: '1 Star', count: 12 },
  { rating: '2 Star', count: 25 },
  { rating: '3 Star', count: 68 },
  { rating: '4 Star', count: 156 },
  { rating: '5 Star', count: 420 },
];

const CATEGORY_DATA = [
  { name: 'Restaurant', value: 45 },
  { name: 'Cafe', value: 25 },
  { name: 'Retail', value: 15 },
  { name: 'Service', value: 15 },
];

export const DashboardPage = () => {
  return (
    <div className="min-h-screen p-6 lg:p-8 flex flex-col gap-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Analytics Dashboard</h1>
        <p className="text-[#9AA6B2]">Platform-wide performance and engagement metrics.</p>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatisticsCard label="Total Businesses" value="1,248" trend={5.2} icon={<Store size={24} />} />
        <StatisticsCard label="Active Users" value="8,492" trend={12.4} icon={<Users size={24} />} />
        <StatisticsCard label="Platform Engagement" value="78%" trend={-2.1} icon={<TrendingUp size={24} />} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
        <RatingDistributionChart data={RATING_DATA} />
        <CategoryDistributionChart data={CATEGORY_DATA} />
      </div>
    </div>
  );
};
