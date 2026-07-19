import React, { createContext, useContext, useState, useEffect } from 'react';

const ReviewsContext = createContext(undefined);

export const ReviewsProvider = ({ children }) => {
  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem('waypoint_reviews_db');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse reviews db', e);
    }
    // Default initial mock reviews
    return [
      {
        id: 'rev-1',
        businessId: 'osm-1',
        author: 'Sanjay Kumar',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
        rating: 5,
        comment: 'Absolutely amazing coffee and workspace! Highly recommend for remote workers.',
        likes: 12,
        reported: false,
        verified: true,
        date: 'Today'
      },
      {
        id: 'rev-2',
        businessId: 'osm-2',
        author: 'Aria Sharma',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
        rating: 4,
        comment: 'Great ambience but service was a bit slow on weekends. Food is delicious.',
        likes: 5,
        reported: false,
        verified: false,
        date: 'Yesterday'
      }
    ];
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('waypoint_reviews_db', JSON.stringify(reviews));
  }, [reviews]);

  const addReview = (businessId, author, rating, comment, photos = [], verified = false) => {
    const newRev = {
      id: `rev-${Date.now()}`,
      businessId,
      author: author || 'Anonymous User',
      avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${author || 'Anon'}`,
      rating: parseFloat(rating),
      comment,
      photos,
      likes: 0,
      reported: false,
      verified,
      date: 'Just now'
    };
    setReviews(prev => [newRev, ...prev]);
  };

  const editReview = (reviewId, rating, comment) => {
    setReviews(prev =>
      prev.map(r => (r.id === reviewId ? { ...r, rating: parseFloat(rating), comment, date: 'Edited just now' } : r))
    );
  };

  const deleteReview = (reviewId) => {
    setReviews(prev => prev.filter(r => r.id !== reviewId));
  };

  const likeReview = (reviewId) => {
    setReviews(prev =>
      prev.map(r => (r.id === reviewId ? { ...r, likes: r.likes + 1 } : r))
    );
  };

  const reportReview = (reviewId) => {
    setReviews(prev =>
      prev.map(r => (r.id === reviewId ? { ...r, reported: true } : r))
    );
  };

  return (
    <ReviewsContext.Provider
      value={{
        reviews,
        addReview,
        editReview,
        deleteReview,
        likeReview,
        reportReview
      }}
    >
      {children}
    </ReviewsContext.Provider>
  );
};

export const useReviews = () => {
  const context = useContext(ReviewsContext);
  if (context === undefined) {
    throw new Error('useReviews must be used within a ReviewsProvider');
  }
  return context;
};
