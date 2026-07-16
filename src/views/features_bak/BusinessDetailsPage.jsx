import React, { useState } from 'react';
import styles from './BusinessDetailsPage.module.css';

// Components
import { BusinessDetails } from '../../components/features/business-info/BusinessDetails';
import { ContactCard } from '../../components/features/business-info/ContactCard';
import { BusinessHours } from '../../components/features/business-info/BusinessHours';
import { PhotoGallery } from '../../components/features/business-info/PhotoGallery';
import { ReviewCard } from '../../components/features/business-info/ReviewCard';
import { PriceLevel } from '../../components/features/business-info/PriceLevel';

export const BusinessDetailsPage = () => {
  // Mock Data
  const businessData = {
    name: "Lumina Cafe & Roastery",
    category: "Coffee Shop",
    rating: 4.8,
    reviewsCount: 324,
    location: "124 Main Street, Tech District",
    priceLevel: 2,
    about: "Lumina Cafe offers a cozy atmosphere and freshly roasted artisan coffee. We source our beans ethically from sustainable farms across the globe. Whether you're here to work, socialize, or just relax with a good book, our baristas are ready to serve you the perfect cup.",
    contact: {
      phone: "+1 (555) 123-4567",
      email: "hello@luminacafe.com",
      address: "124 Main Street, Tech District, Cityville 90210",
      website: "https://luminacafe.com"
    },
    hours: [
      { day: 'Monday', open: '7:00 AM', close: '6:00 PM', isClosed: false },
      { day: 'Tuesday', open: '7:00 AM', close: '6:00 PM', isClosed: false },
      { day: 'Wednesday', open: '7:00 AM', close: '6:00 PM', isClosed: false },
      { day: 'Thursday', open: '7:00 AM', close: '7:00 PM', isClosed: false },
      { day: 'Friday', open: '7:00 AM', close: '8:00 PM', isClosed: false },
      { day: 'Saturday', open: '8:00 AM', close: '8:00 PM', isClosed: false },
      { day: 'Sunday', open: '8:00 AM', close: '4:00 PM', isClosed: false },
    ],
    photos: [
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1525610553991-2bede1a236e2?auto=format&fit=crop&q=80&w=400',
    ],
    reviews: [
      {
        id: '1',
        reviewerName: "Alex Johnson",
        date: "2 days ago",
        rating: 5,
        comment: "Best pour-over coffee in the district! The atmosphere is perfect for getting some work done, and the staff is incredibly friendly."
      },
      {
        id: '2',
        reviewerName: "Sarah M.",
        date: "1 week ago",
        rating: 4,
        comment: "Great place, really good pastries. Can get a bit crowded on weekends, but the quality of the coffee makes up for the wait."
      }
    ]
  };

  const [activeTab, setActiveTab] = useState<'overview' | 'photos' | 'reviews'>('overview');

  return (
    <div className={styles.pageContainer}>
      <div className={styles.heroBanner}>
        <img src={businessData.photos[0]} alt="Hero Background" className={styles.heroImage} />
        <div className={styles.heroOverlay} />
      </div>

      <div className={`${styles.contentWrapper} animate-fade-in-up`}>
        <BusinessDetails
          name={businessData.name}
          category={businessData.category}
          rating={businessData.rating}
          reviewsCount={businessData.reviewsCount}
          location={businessData.location}
          about={businessData.about}
        >
          {/* Sidebar content via children */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Pricing:</span>
            <PriceLevel level={businessData.priceLevel as any} />
          </div>
          <ContactCard {...businessData.contact} />
          <BusinessHours hours={businessData.hours} />
        </BusinessDetails>

        <div className={styles.tabs}>
          <button 
            className={`${styles.tab} ${activeTab === 'overview' ? styles.active : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'photos' ? styles.active : ''}`}
            onClick={() => setActiveTab('photos')}
          >
            Photos ({businessData.photos.length})
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'reviews' ? styles.active : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews ({businessData.reviewsCount})
          </button>
        </div>

        <div className={styles.tabContent}>
          {activeTab === 'overview' && (
            <div style={{ padding: '24px', background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border-divider)' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', color: 'var(--text-dark)' }}>About this business</h3>
              <p style={{ color: 'var(--text-primary)', lineHeight: '1.6' }}>{businessData.about}</p>
            </div>
          )}

          {activeTab === 'photos' && (
            <div className={styles.gallerySection}>
              <PhotoGallery photos={businessData.photos} />
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className={styles.reviewsSection}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {businessData.reviews.map(review => (
                  <ReviewCard
                    key={review.id}
                    reviewerName={review.reviewerName}
                    date={review.date}
                    rating={review.rating}
                    comment={review.comment}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
