import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  AreaChart, 
  Area 
} from 'recharts';
import { Layers, Star, MessageSquare, Award, TrendingUp } from 'lucide-react';

const COLORS = ['#9AA6B2', '#D9EAFD', '#BCCCDC', '#475569', '#3b82f6', '#10b981', '#f59e0b', '#ec4899'];

export default function Dashboard({ places = [] }) {
  // 1. Stats Calculations
  const totalVerified = places.length;
  const avgRating = totalVerified > 0 
    ? (places.reduce((acc, p) => acc + p.rating, 0) / totalVerified).toFixed(2)
    : '0.00';
  const totalReviews = places.reduce((acc, p) => acc + p.reviews, 0);

  // Category counts
  const categoryCounts = places.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});

  const topCategory = Object.entries(categoryCounts).length > 0
    ? Object.entries(categoryCounts).reduce((a, b) => a[1] > b[1] ? a : b)[0]
    : 'N/A';

  // 2. Chart 1: Category Distribution (Pie Chart)
  const categoryData = Object.entries(categoryCounts).map(([name, value]) => ({
    name,
    value
  }));

  // 3. Chart 2: Ratings Breakdown (Bar Chart)
  // Group ratings into brackets: <4.5, 4.5, 4.6, 4.7, 4.8, 4.9
  const ratingBrackets = {
    '4.4 & below': 0,
    '4.5': 0,
    '4.6': 0,
    '4.7': 0,
    '4.8': 0,
    '4.9': 0
  };
  places.forEach((p) => {
    const r = p.rating;
    if (r <= 4.4) ratingBrackets['4.4 & below']++;
    else if (r === 4.5) ratingBrackets['4.5']++;
    else if (r === 4.6) ratingBrackets['4.6']++;
    else if (r === 4.7) ratingBrackets['4.7']++;
    else if (r === 4.8) ratingBrackets['4.8']++;
    else if (r === 4.9) ratingBrackets['4.9']++;
  });
  const ratingData = Object.entries(ratingBrackets).map(([name, value]) => ({
    name,
    count: value
  }));

  // 4. Chart 3: Reviews per Category (Area Chart)
  const categoryReviews = places.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + p.reviews;
    return acc;
  }, {});
  const reviewsData = Object.entries(categoryReviews).map(([name, count]) => ({
    category: name,
    reviewsCount: count
  }));

  return (
    <div className="w-full max-w-6xl mx-auto px-6 sm:px-8 py-8 space-y-8 select-none animate-[fadeIn_0.3s_ease-out]">
      {/* Dashboard Summary Header */}
      <div className="space-y-1.5 text-left border-b border-slate-200/60 pb-5">
        <h2 className="text-xl font-black text-slate-800 leading-none">Waypoint Intelligence</h2>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
          Real-time metrics & data analysis distributions
        </p>
      </div>

      {/* Grid of Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Verified Waypoints', val: totalVerified, icon: Layers, desc: 'Active places' },
          { label: 'Average Rating', val: `${avgRating} / 5.0`, icon: Star, desc: 'User experience' },
          { label: 'Popular Category', val: topCategory, icon: Award, desc: 'Density hub' },
          { label: 'Total Reviews', val: totalReviews.toLocaleString(), icon: MessageSquare, desc: 'Aggregate reviews' }
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="p-4 bg-white border border-brand-border/30 rounded-2.5xl flex flex-col justify-between shadow-xs">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-extrabold uppercase text-slate-400 tracking-wider">
                  {stat.label}
                </span>
                <div className="w-8 h-8 rounded-lg bg-brand-accent/40 flex items-center justify-center text-slate-650">
                  <Icon className="w-4 h-4 text-brand-steel" />
                </div>
              </div>
              <div className="mt-3.5">
                <span className="text-lg font-black text-slate-850 block leading-none">
                  {stat.val}
                </span>
                <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider block mt-1">
                  {stat.desc}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Grid of Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Category distribution (Pie chart) */}
        <div className="bg-white border border-brand-border/30 rounded-2.5xl p-5 shadow-xs flex flex-col h-[320px]">
          <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-450 mb-4 text-left">
            Category Representation
          </h4>
          <div className="flex-grow relative flex items-center justify-center">
            {categoryData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <span className="text-xs text-slate-350 font-bold">No place data available</span>
            )}
          </div>
          {/* Legend list */}
          <div className="flex flex-wrap gap-2 justify-center mt-2.5 max-h-16 overflow-y-auto pt-1">
            {categoryData.map((entry, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-[8px] font-black uppercase text-slate-500">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                <span>{entry.name} ({entry.value})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Ratings Breakdown (Bar chart) */}
        <div className="bg-white border border-brand-border/30 rounded-2.5xl p-5 shadow-xs flex flex-col h-[320px]">
          <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-450 mb-4 text-left">
            Ratings Frequency
          </h4>
          <div className="flex-grow">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ratingData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fontSize: 9, fontWeight: 700 }} stroke="#9AA6B2" />
                <YAxis tick={{ fontSize: 9, fontWeight: 700 }} stroke="#9AA6B2" allowDecimals={false} />
                <RechartsTooltip cursor={{ fill: 'rgba(154, 166, 178, 0.05)' }} />
                <Bar dataKey="count" fill="#9AA6B2" radius={[6, 6, 0, 0]} maxBarSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Reviews by Category (Area chart) */}
        <div className="bg-white border border-brand-border/30 rounded-2.5xl p-5 shadow-xs flex flex-col h-[320px]">
          <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-450 mb-4 text-left">
            Reviews Engagement
          </h4>
          <div className="flex-grow">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={reviewsData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <XAxis dataKey="category" tick={{ fontSize: 8, fontWeight: 700 }} stroke="#9AA6B2" />
                <YAxis tick={{ fontSize: 9, fontWeight: 700 }} stroke="#9AA6B2" />
                <RechartsTooltip />
                <defs>
                  <linearGradient id="colorReviews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D9EAFD" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#D9EAFD" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="reviewsCount" stroke="#9AA6B2" strokeWidth={2} fillOpacity={1} fill="url(#colorReviews)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
