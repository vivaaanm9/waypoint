import React, { useState } from 'react';
import { Users, Briefcase, Star, Activity } from 'lucide-react';
import styles from './DashboardAnalyticsView.module.css';

// Components
import { FilterChip } from '../../components/features/discovery/FilterChip';
import { SortDropdown } from '../../components/features/discovery/SortDropdown';
import { StatisticsCard } from '../../components/features/dashboard/StatisticsCard';
import { DashboardCard } from '../../components/features/dashboard/DashboardCard';
import { RatingDistributionChart } from '../../components/features/dashboard/RatingDistributionChart';
import { CategoryDistributionChart } from '../../components/features/dashboard/CategoryDistributionChart';
import { WebsiteAnalysisCard } from '../../components/features/analytics/WebsiteAnalysisCard';
import { PerformanceScore } from '../../components/features/analytics/PerformanceScore';

export const DashboardAnalyticsView = () => {
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({
    status: ['active'],
    category: ['coffee', 'restaurant']
  });
  const [sortOption, setSortOption] = useState('newest');

  const sortOptions = [
    { id: 'newest', label: 'Newest First' },
    { id: 'oldest', label: 'Oldest First' },
    { id: 'rating', label: 'Highest Rated' }
  ];

  const filterCategories = [
    {
      id: 'status',
      title: 'Business Status',
      options: [
        { id: 'active', label: 'Active & Verified' },
        { id: 'pending', label: 'Pending Verification' },
        { id: 'inactive', label: 'Inactive' }
      ]
    },
    {
      id: 'category',
      title: 'Industry Category',
      options: [
        { id: 'coffee', label: 'Coffee & Tea' },
        { id: 'restaurant', label: 'Restaurants' },
        { id: 'retail', label: 'Retail & Shopping' },
        { id: 'services', label: 'Professional Services' }
      ]
    }
  ];

  const handleToggleFilter = (categoryId, optionId) => {
    setActiveFilters(prev => {
      const categoryFilters = prev[categoryId] || [];
      if (categoryFilters.includes(optionId)) {
        return { ...prev, [categoryId]: categoryFilters.filter(id => id !== optionId) };
      }
      return { ...prev, [categoryId]: [...categoryFilters, optionId] };
    });
  };

  const handleRemoveFilter = (categoryId, optionId) => {
    handleToggleFilter(categoryId, optionId);
  };

  // Mock data for charts
  const ratingData = [
    { rating: '1 Star', count: 12 },
    { rating: '2 Stars', count: 28 },
    { rating: '3 Stars', count: 86 },
    { rating: '4 Stars', count: 214 },
    { rating: '5 Stars', count: 432 },
  ];

  const categoryData = [
    { name: 'Coffee Shops', value: 35 },
    { name: 'Restaurants', value: 45 },
    { name: 'Retail', value: 15 },
    { name: 'Services', value: 5 },
  ];

  const seoMetrics = [
    { label: 'Meta Tags Present', isPassing: true },
    { label: 'Mobile Responsive', isPassing: true },
    { label: 'Fast Load Time', isPassing: false },
    { label: 'Valid SSL Certificate', isPassing: true },
  ];

  // Derive flat active filters for chips
  const activeChips = Object.entries(activeFilters).flatMap(([categoryId, optionIds]) => {
    const category = filterCategories.find(c => c.id === categoryId);
    return optionIds.map(optId => ({
      categoryId,
      optionId: optId,
      label: category?.options.find(o => o.id === optId)?.label || optId
    }));
  });

  return (
    <div className={styles.pageContainer}>
      <div className={`${styles.header} animate-fade-in-up delay-1`}>
        <div>
          <h1 className={styles.title}>Network Overview</h1>
          <p className={styles.subtitle}>Real-time analytics and platform performance metrics</p>
        </div>
        <div className={styles.controls}>
          <SortDropdown 
            options={sortOptions} 
            value={sortOption} 
            onChange={setSortOption} 
          />
        </div>
      </div>

      <div className={`${styles.mainContent} animate-fade-in-up delay-2`}>
        {activeChips.length > 0 && (
          <div className={styles.activeFilters}>
            <span className={styles.filterLabel}>Active Filters:</span>
            {activeChips.map(chip => (
              <FilterChip 
                key={`${chip.categoryId}-${chip.optionId}`} 
                label={chip.label} 
                onRemove={() => handleRemoveFilter(chip.categoryId, chip.optionId)} 
              />
            ))}
          </div>
        )}

        {/* Top Row: KPIs */}
        <div className={styles.statsRow}>
          <StatisticsCard 
            title="Total Businesses" 
            value="1,248" 
            icon={<Briefcase size={24} strokeWidth={2} />} 
            trend={{ value: 12.5, direction: 'up' }}
          />
          <StatisticsCard 
            title="Active Users" 
            value="8,432" 
            icon={<Users size={24} strokeWidth={2} />} 
            trend={{ value: 4.2, direction: 'up' }}
          />
          <StatisticsCard 
            title="Avg Network Rating" 
            value="4.6" 
            icon={<Star size={24} strokeWidth={2} />} 
            trend={{ value: 0.2, direction: 'up' }}
          />
          <StatisticsCard 
            title="New Signups" 
            value="342" 
            icon={<Activity size={24} strokeWidth={2} />} 
            trend={{ value: 1.1, direction: 'down' }}
          />
        </div>

        {/* Middle Row: Main Charts */}
        <div className={styles.chartsRow}>
          <DashboardCard title="Rating Distribution">
            <RatingDistributionChart data={ratingData} />
          </DashboardCard>
          
          <DashboardCard title="Industry Breakdown">
            <CategoryDistributionChart data={categoryData} />
          </DashboardCard>
        </div>

        {/* Bottom Row: Health */}
        <div className={styles.bottomRow}>
          <WebsiteAnalysisCard score={85} metrics={seoMetrics} />
          <div style={{ display: 'flex', gap: '24px' }}>
            <div style={{ flex: 1 }}><PerformanceScore score={92} label="Network Speed" /></div>
            <div style={{ flex: 1 }}><PerformanceScore score={64} label="API Uptime" /></div>
          </div>
        </div>
      </div>
    </div>
  );
};
