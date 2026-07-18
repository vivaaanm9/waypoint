import React, { createContext, useState, useEffect, useContext } from 'react';
import { MOCK_PLACES } from '../data/places';

export const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  // Load favorites from either 'favorites' (remote) or 'waypoint_favourites' (local)
  const [favorites, setFavorites] = useState(() => {
    try {
      const savedRemote = localStorage.getItem('favorites');
      if (savedRemote) {
        return JSON.parse(savedRemote);
      }
      const savedLocal = localStorage.getItem('waypoint_favourites');
      if (savedLocal) {
        const parsed = JSON.parse(savedLocal);
        // Map string IDs to full objects if possible
        return parsed.map(id => {
          if (typeof id === 'object' && id !== null) return id;
          const found = MOCK_PLACES.find(p => p.id === id);
          return found || { id };
        });
      }
    } catch (e) {
      console.error('Failed to parse favorites', e);
    }
    return [];
  });

  const [collections, setCollections] = useState(() => {
    try {
      const saved = localStorage.getItem('collections');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse collections', e);
    }
    return [
      {
        id: 1,
        name: "Weekend Cafes",
        businesses: [],
      },
    ];
  });

  /* -------------------------
      FAVORITES ACTIONS
  -------------------------- */

  const isFavorite = (idOrItem) => {
    if (!idOrItem) return false;
    const id = typeof idOrItem === 'object' ? idOrItem.id : idOrItem;
    return favorites.some((item) => item && item.id === id);
  };

  const addFavorite = (business) => {
    if (!business) return;
    let businessObj;
    if (typeof business === 'object') {
      businessObj = business;
    } else {
      const found = MOCK_PLACES.find(p => p.id === business);
      businessObj = found || { id: business };
    }
    
    setFavorites((prev) => {
      const exists = prev.some((item) => item.id === businessObj.id);
      if (exists) return prev;
      return [...prev, businessObj];
    });
  };

  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleFavorite = (businessOrId) => {
    if (!businessOrId) return;
    const id = typeof businessOrId === 'object' ? businessOrId.id : businessOrId;
    const exists = favorites.some((item) => item.id === id);

    if (exists) {
      removeFavorite(id);
    } else {
      let businessObj;
      if (typeof businessOrId === 'object') {
        businessObj = businessOrId;
      } else {
        const found = MOCK_PLACES.find(p => p.id === businessOrId);
        businessObj = found || { id: businessOrId };
      }
      setFavorites((prev) => [...prev, businessObj]);
    }
  };

  /* -------------------------
      COLLECTIONS
  -------------------------- */

  const createCollection = (name) => {
    const collection = {
      id: Date.now(),
      name,
      businesses: [],
    };
    setCollections((prev) => [...prev, collection]);
  };

  const deleteCollection = (id) => {
    setCollections((prev) => prev.filter((collection) => collection.id !== id));
  };

  const addBusinessToCollection = (collectionId, business) => {
    setCollections((prev) =>
      prev.map((collection) => {
        if (collection.id !== collectionId) return collection;
        const exists = collection.businesses.find((item) => item.id === business.id);
        if (exists) return collection;
        return {
          ...collection,
          businesses: [...collection.businesses, business],
        };
      })
    );
  };

  /* -------------------------
      NOTES & TAGS
  -------------------------- */

  const addNote = (businessId, note) => {
    setFavorites((prev) =>
      prev.map((business) =>
        business.id === businessId ? { ...business, note } : business
      )
    );
  };

  const addTag = (businessId, tag) => {
    setFavorites((prev) =>
      prev.map((business) => {
        if (business.id !== businessId) return business;
        const tags = business.tags || [];
        if (tags.includes(tag)) return business;
        return { ...business, tags: [...tags, tag] };
      })
    );
  };

  const removeTag = (businessId, tag) => {
    setFavorites((prev) =>
      prev.map((business) => {
        if (business.id !== businessId) return business;
        return {
          ...business,
          tags: (business.tags || []).filter((item) => item !== tag),
        };
      })
    );
  };

  // Synchronize localStorage
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
    // Also sync the local key waypoint_favourites so previous components don't lose data
    const simpleIds = favorites.map(f => f.id);
    localStorage.setItem('waypoint_favourites', JSON.stringify(simpleIds));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('collections', JSON.stringify(collections));
  }, [collections]);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        collections,
        isFavorite,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        createCollection,
        deleteCollection,
        addBusinessToCollection,
        addNote,
        addTag,
        removeTag,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

// Hook to support your local pages
export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}

export default FavoritesProvider;
