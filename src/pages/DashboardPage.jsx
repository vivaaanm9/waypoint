import React from 'react';
import { useWaypointContext } from '../context/WaypointContext';
import { MOCK_PLACES } from '../data/places';
import { StatisticsCard } from '../components/features/dashboard/StatisticsCard';
import { RatingDistributionChart } from '../components/features/dashboard/RatingDistributionChart';
import { CategoryDistributionChart } from '../components/features/dashboard/CategoryDistributionChart';
import { Store, Star, ThumbsUp } from 'lucide-react';

export const DashboardPage = () => {
  const { businesses } = useWaypointContext();

  // Fall back to MOCK_PLACES if no live search results exist yet
  const activeData = businesses && businesses.length > 0 ? businesses : MOCK_PLACES;

  // 1. Compute dynamic KPIs
  const totalBusinesses = activeData.length;
  
  const avgRating = totalBusinesses > 0
    ? (activeData.reduce((sum, b) => sum + (b.rating || 0), 0) / totalBusinesses).toFixed(1)
    : "0.0";

  const totalReviews = activeData.reduce((sum, b) => sum + (b.reviews || b.reviewCount || 0), 0);

  // 2. Compute dynamic Rating Distribution
  const counts = { '1 Star': 0, '2 Star': 0, '3 Star': 0, '4 Star': 0, '5 Star': 0 };
  activeData.forEach(b => {
    const r = Math.round(b.rating || 0);
    if (r >= 5) counts['5 Star']++;
    else if (r === 4) counts['4 Star']++;
    else if (r === 3) counts['3 Star']++;
    else if (r === 2) counts['2 Star']++;
    else counts['1 Star']++;
  });
  const ratingData = Object.keys(counts).map(key => ({ rating: key, count: counts[key] }));

  // 3. Compute dynamic Category Distribution
  const catCounts = {};
  activeData.forEach(b => {
    const cat = b.category || 'Tourist';
    catCounts[cat] = (catCounts[cat] || 0) + 1;
  });
  const categoryData = Object.keys(catCounts).map(key => ({ name: key, value: catCounts[key] }));

  return (
    <div className="min-h-screen p-6 lg:p-8 flex flex-col gap-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Analytics Dashboard</h1>
        <p className="text-[#9AA6B2]">
          {businesses && businesses.length > 0 
            ? "Dynamic live statistics computed from current map area." 
            : "Platform-wide analytics (showing default dataset)."}
        </p>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatisticsCard label="Total Places" value={totalBusinesses.toString()} icon={<Store size={24} />} />
        <StatisticsCard label="Average Rating" value={`${avgRating} / 5.0`} icon={<Star size={24} />} />
        <StatisticsCard label="Total Reviews" value={totalReviews.toLocaleString()} icon={<ThumbsUp size={24} />} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
        <RatingDistributionChart data={ratingData} />
        <CategoryDistributionChart data={categoryData} />
      </div>
    </div>
  );
};
