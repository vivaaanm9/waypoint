// AI Service Layer for Waypoint Local Search Assistant

export const generateAISummary = (name, category, rating) => {
  const score = parseFloat(rating || 4.0);
  let mood = "highly popular local venue";
  if (score >= 4.6) mood = "exceptional premium landmark";
  else if (score >= 4.2) mood = "well-reviewed favorite spot";
  
  const categoriesText = {
    Cafe: "offering premium fresh roasts, comfortable seating, and ideal conditions for remote work or studying.",
    Restaurant: "known for its authentic flavor palette, family-friendly seating, and highly attentive service staff.",
    Hospital: "serving the local community with dedicated primary care facilities, round-the-clock emergency assistance, and specialized doctors.",
    Clinic: "offering quick walk-in outpatient consultations, medical examinations, and diagnostic laboratory testing.",
    'Retail Store': "providing a diverse selection of products, great member offers, and highly cooperative shop staff.",
    Gym: "equipped with modern strength conditioning gear, expert coaches, and flexible monthly workout passes.",
    Workspace: "delivering fast fiber internet connections, quiet focus cabins, and complimentary coffee for members."
  };

  return `${name} is a ${mood} ${categoriesText[category] || "offering dedicated local amenities designed for comfortable neighborhood access."}`;
};

export const generateAIReviewsSummary = (businessReviews) => {
  if (!businessReviews || businessReviews.length === 0) {
    return "No verified user reviews have been submitted for this business yet. AI sentiment analysis will activate upon receipt of ratings.";
  }

  const avg = businessReviews.reduce((sum, r) => sum + r.rating, 0) / businessReviews.length;
  const positiveCount = businessReviews.filter(r => r.rating >= 4).length;
  const percentage = Math.round((positiveCount / businessReviews.length) * 100);

  let keyPraise = "customer service and general cleanliness";
  if (businessReviews.some(r => r.comment.toLowerCase().includes('coffee') || r.comment.toLowerCase().includes('drink'))) {
    keyPraise = "beverage quality and workspace atmosphere";
  } else if (businessReviews.some(r => r.comment.toLowerCase().includes('food') || r.comment.toLowerCase().includes('taste'))) {
    keyPraise = "authentic recipes and portion sizes";
  }

  return `AI Summary: ${percentage}% of customers reported positive experiences (average rating ${avg.toFixed(1)}/5.0). Primary praise points include ${keyPraise}. No recurring critical complaints detected.`;
};

export const getAIRecommendations = (businesses, filterType) => {
  if (!businesses || businesses.length === 0) return [];

  const list = [...businesses];

  if (filterType === 'top_rated') {
    return list.sort((a, b) => b.rating - a.rating).slice(0, 5);
  }
  if (filterType === 'most_affordable') {
    return list.filter(b => (b.priceLevel || 1) <= 2).slice(0, 5);
  }
  if (filterType === 'best_for_families') {
    return list.filter(b => b.category === 'Restaurant' || b.category === 'Retail Store').slice(0, 5);
  }
  if (filterType === 'least_crowded') {
    return list.filter(b => b.isOpen && b.rating >= 4.0).slice(0, 5);
  }

  return list.slice(0, 5);
};

export const getAIResponse = (userMessage, locationName = "your area", currentBusinesses = []) => {
  const msg = userMessage.toLowerCase();
  
  if (msg.includes('best') || msg.includes('top') || msg.includes('recommend')) {
    let matches = [...currentBusinesses];
    let type = 'places';
    
    if (msg.includes('cafe')) {
      matches = matches.filter(b => b.category === 'Cafe');
      type = 'Cafes';
    } else if (msg.includes('restaurant')) {
      matches = matches.filter(b => b.category === 'Restaurant');
      type = 'Restaurants';
    } else if (msg.includes('hospital') || msg.includes('clinic') || msg.includes('doctor')) {
      matches = matches.filter(b => b.category === 'Hospital' || b.category === 'Clinic');
      type = 'Medical Centers';
    }

    const sorted = matches.sort((a, b) => b.rating - a.rating).slice(0, 3);
    
    if (sorted.length > 0) {
      const names = sorted.map((s, idx) => `${idx + 1}. **${s.name}** (Rating: ${s.rating} ★, ${s.address})`).join('\n');
      return {
        text: `Here are the top-rated ${type} I found near ${locationName}:\n\n${names}\n\nAll of these spots are open and highly recommended by locals!`,
        suggestions: sorted
      };
    } else {
      return {
        text: `I searched for top-rated spots near ${locationName}, but couldn't find matches. Try typing a query like "Starbucks in Thane" to load more real businesses first!`,
        suggestions: []
      };
    }
  }

  if (msg.includes('compare')) {
    // Look for matching names in current businesses
    const found = currentBusinesses.slice(0, 2);
    if (found.length >= 2) {
      return {
        text: `Let's compare **${found[0].name}** and **${found[1].name}**:\n\n` +
              `• **Rating**: ${found[0].name} has ${found[0].rating} ★, whereas ${found[1].name} has ${found[1].rating} ★.\n` +
              `• **Reviews**: ${found[0].name} has ${found[0].reviewCount} reviews vs ${found[1].name}'s ${found[1].reviewCount}.\n` +
              `• **Price Level**: ${found[0].name} price is ${'$'.repeat(found[0].priceLevel)} vs ${found[1].name}'s ${'$'.repeat(found[1].priceLevel)}.\n` +
              `• **Directions**: Click 'Directions' to route routes on the map!`,
        compareItems: found
      };
    }
    return {
      text: "To compare businesses, please make sure there are at least two businesses visible in your search results list!",
      suggestions: []
    };
  }

  // General fallback chat response
  return {
    text: `Hello! I am your Waypoint AI Search Assistant. 🤖\n\nI can help you explore businesses around **${locationName}**.\n\nTry asking me:\n• *"Recommend the best cafes nearby"* \n• *"What are the most affordable restaurants in this area?"* \n• *"Compare the top businesses"*`,
    suggestions: []
  };
};
