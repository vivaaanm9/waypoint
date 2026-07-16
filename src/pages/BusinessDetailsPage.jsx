import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useWaypointContext } from '../context/WaypointContext';
import { BusinessDetails } from '../components/features/business-info/BusinessDetails';
import { BusinessHours } from '../components/features/business-info/BusinessHours';
import { ContactCard } from '../components/features/business-info/ContactCard';
import { PhotoGallery } from '../components/features/business-info/PhotoGallery';
import { ReviewCard } from '../components/features/business-info/ReviewCard';
import { WebsiteAnalysisCard } from '../components/features/dashboard/WebsiteAnalysisCard';
import { PerformanceScore } from '../components/features/dashboard/PerformanceScore';
import { DomainAgeCard } from '../components/features/dashboard/DomainAgeCard';
export const BusinessDetailsPage = () => {
  const { activeBusinessId, setActiveBusinessId, businesses, searchLocation } = useWaypointContext();

  const baseBusiness = businesses.find(b => b.id === activeBusinessId) || businesses[0];
  
  if (!baseBusiness) return <div className="p-12 text-center text-gray-500">Business not found.</div>;

  const MOCK_BUSINESS_DATA = {
    ...baseBusiness,
    description: `A top-rated ${baseBusiness.category.toLowerCase()} offering incredible service. Our mission is to bring the community together over delightful experiences.`,
    phone: '(555) 123-4567',
    email: `hello@${baseBusiness.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
    website: baseBusiness.websiteUrl || `https://${baseBusiness.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.example.com`,
    tags: ['Popular', 'Highly Rated', 'Great Service'],
    hours: [
      { day: 'Monday', open: '7:00 AM', close: '6:00 PM', isClosed: false },
      { day: 'Tuesday', open: '7:00 AM', close: '6:00 PM', isClosed: false },
      { day: 'Wednesday', open: '7:00 AM', close: '6:00 PM', isClosed: false },
      { day: 'Thursday', open: '7:00 AM', close: '6:00 PM', isClosed: false },
      { day: 'Friday', open: '7:00 AM', close: '8:00 PM', isClosed: false },
      { day: 'Saturday', open: '8:00 AM', close: '8:00 PM', isClosed: false },
      { day: 'Sunday', open: '', close: '', isClosed: true },
    ],
    photos: [
      baseBusiness.imageUrl,
      ...(baseBusiness.photos || [])
    ],
    reviews: [
      { id: 1, authorName: 'Sarah Jenkins', rating: 5, date: '2 days ago', content: `Absolutely love ${baseBusiness.name}! The atmosphere is perfect.`, helpfulCount: 12 },
      { id: 2, authorName: 'Michael Chen', rating: 4, date: '1 week ago', content: 'Great experience, but it gets a bit crowded on weekends.', helpfulCount: 5 },
      { id: 3, authorName: 'Emma Watson', rating: 5, date: '3 weeks ago', content: 'My favorite spot in town. The staff is always friendly.', helpfulCount: 8 },
    ]
  };

  return (
    <div className="min-h-screen p-6 lg:p-8 max-w-[1400px] mx-auto">
      <button 
        onClick={() => setActiveBusinessId(null)}
        className="mb-6 flex items-center gap-2 px-4 py-2 bg-white/40 border border-[#BCCCDC]/40 rounded-xl backdrop-blur-lg shadow-sm text-gray-800 hover:bg-[#D9EAFD]/30 hover:-translate-y-0.5 transition-all font-medium"
      >
        <ArrowLeft size={18} />
        Back to Dashboard
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Column */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <BusinessDetails business={MOCK_BUSINESS_DATA} />
          
          <div className="bg-white/40 border border-[#BCCCDC]/40 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Gallery</h2>
            <PhotoGallery photos={MOCK_BUSINESS_DATA.photos} />
          </div>

          <div className="bg-white/40 border border-[#BCCCDC]/40 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Reviews</h2>
              <button className="text-blue-600 font-medium hover:text-blue-700">Write a Review</button>
            </div>
            <div className="flex flex-col gap-4">
              {MOCK_BUSINESS_DATA.reviews.map((review) => (
                <ReviewCard key={review.id} {...review} />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="flex flex-col gap-6">
          <ContactCard 
            address={MOCK_BUSINESS_DATA.address}
            phone={MOCK_BUSINESS_DATA.phone}
            email={MOCK_BUSINESS_DATA.email}
            website={MOCK_BUSINESS_DATA.website}
          />
          
          <BusinessHours hours={MOCK_BUSINESS_DATA.hours} />
          
          <div className="bg-gradient-to-br from-[#F8FAFC] to-[#D9EAFD]/20 border border-[#BCCCDC]/40 rounded-3xl p-6 backdrop-blur-xl shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Digital Health</h3>
            <div className="flex flex-col gap-4">
              <PerformanceScore score={86} />
              <WebsiteAnalysisCard />
              <DomainAgeCard years={4} months={7} creationDate="2021-11-15T00:00:00Z" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
