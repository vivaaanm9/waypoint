import React from 'react';
import HeroSection from '../components/HeroSection';
import CategoryCards from '../components/CategoryCards';
import FeatureHighlights from '../components/FeatureHighlights';
import FeaturedBusinesses from '../components/FeaturedBusinesses';

export default function HomePage({
  searchTerm,
  setSearchTerm,
  activeTab,

  setActiveTab,
  filters,
  setFilters,
  handlePlaceSelect
}) {
  return (
    <div className="w-full flex flex-col space-y-12 pb-16 animate-[fadeIn_0.3s_ease-out]">
      <HeroSection
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="px-6 sm:px-8">
        <CategoryCards
          selectedCategory={filters.category}
          setSelectedCategory={(cat) => {
            setFilters(prev => ({ ...prev, category: cat }));
            setActiveTab('Search Map');
          }}
        />
      </div>

      <div className="px-6 sm:px-8">
        <FeatureHighlights />
      </div>

      <div className="px-6 sm:px-8 max-w-5xl mx-auto w-full">
        <FeaturedBusinesses onSelect={(place) => {
          handlePlaceSelect(place);
          setActiveTab('Search Map');
        }} />
      </div>
    </div>
  );
}
