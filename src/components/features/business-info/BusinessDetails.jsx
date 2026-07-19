import React from 'react';
import { Star, Share2, Heart, Sparkles, Navigation, Map } from 'lucide-react';
import { PriceLevel } from '../common/PriceLevel';
import { useFavorites } from '../../../context/FavoritesContext';

const getAIProducts = (name, category) => {
  const cleanName = name.toLowerCase();
  
  if (cleanName.includes('starbucks')) {
    return [
      {
        category: "Hot Coffees",
        items: [
          { name: "Caffè Latte", price: "₹285", desc: "Rich, full-bodied espresso in steamed milk." },
          { name: "Caramel Macchiato", price: "₹345", desc: "Steamed milk with vanilla syrup, marked with espresso and caramel." },
          { name: "Cappuccino", price: "₹275", desc: "Espresso with a smooth layer of thick milk foam." }
        ]
      },
      {
        category: "Cold Beverages",
        items: [
          { name: "Java Chip Frappuccino", price: "₹375", desc: "Coffee with chocolate chips, blended with milk and ice." },
          { name: "Cold Brew Coffee", price: "₹250", desc: "Slow-steeped in cool water for an ultra-smooth finish." }
        ]
      }
    ];
  }

  if (cleanName.includes('kfc')) {
    return [
      {
        category: "Chicken Buckets",
        items: [
          { name: "8 Pc Hot & Crispy Chicken", price: "₹699", desc: "Signature crispy chicken pieces seasoned to perfection." },
          { name: "4 Pc Smoky Grilled Chicken", price: "₹399", desc: "Juicy grilled chicken marinated with smoky spices." }
        ]
      },
      {
        category: "Burgers & Bowls",
        items: [
          { name: "Chicken Zinger Burger", price: "₹185", desc: "Crispy chicken fillet with lettuce and mayo." },
          { name: "KFC Popcorn Biryani Bucket", price: "₹265", desc: "Flavored rice served with crispy chicken popcorn." }
        ]
      }
    ];
  }

  if (cleanName.includes('burger king')) {
    return [
      {
        category: "Whoppers & Burgers",
        items: [
          { name: "Chicken Whopper", price: "₹199", desc: "Flame-grilled chicken patty, sesame bun, tomatoes, and mayo." },
          { name: "Crispy Veg Burger", price: "₹89", desc: "Crispy potato-based patty with signature sauce." }
        ]
      },
      {
        category: "Sides & Drinks",
        items: [
          { name: "King Onion Rings", price: "₹119", desc: "Golden-brown breaded crispy onion rings." },
          { name: "Chocolate Shake", price: "₹149", desc: "Thick creamy rich cocoa shake." }
        ]
      }
    ];
  }

  if (cleanName.includes('pizza hut')) {
    return [
      {
        category: "Personal Pizzas",
        items: [
          { name: "Tandoori Paneer Pizza", price: "₹345", desc: "Paneer cubes, capsicum, and onions with tandoori sauce." },
          { name: "Double Cheese Margherita", price: "₹285", desc: "Classic mozzarella cheese and liquid cheese blend." }
        ]
      },
      {
        category: "Sides & Garlic Breads",
        items: [
          { name: "Garlic Bread Stix", price: "₹149", desc: "Freshly baked garlic bread strips served with dip." }
        ]
      }
    ];
  }

  if (cleanName.includes('domino')) {
    return [
      {
        category: "Signature Pizzas",
        items: [
          { name: "Pepperoni Passion", price: "₹599", desc: "Double pepperoni and double cheese." },
          { name: "Vegi Supreme", price: "₹459", desc: "Mushrooms, sweetcorn, onions, and mixed peppers." },
          { name: "Texas BBQ Chicken", price: "₹549", desc: "Smokey BBQ sauce, chicken breast, bacon, and onions." }
        ]
      },
      {
        category: "Sides & Desserts",
        items: [
          { name: "Choco Lava Cake", price: "₹109", desc: "Warm, gooey chocolate center cake." }
        ]
      }
    ];
  }

  if (cleanName.includes('mcdonald')) {
    return [
      {
        category: "Burgers & Sandwiches",
        items: [
          { name: "McSpicy Chicken Burger", price: "₹189", desc: "Crispy chicken patty with spicy seasoning and lettuce." },
          { name: "McAloo Tikki Burger", price: "₹69", desc: "Indian favorite potato-pea patty with sweet tomato sauce." }
        ]
      },
      {
        category: "Sides",
        items: [
          { name: "World Famous Fries", price: "₹119", desc: "Golden, crispy French fries salted to perfection." }
        ]
      }
    ];
  }

  if (cleanName.includes('subway')) {
    return [
      {
        category: "Signature Subs",
        items: [
          { name: "Paneer Tikka Sub (6 Inch)", price: "₹220", desc: "Paneer tikka cubes with choice of fresh veggies and sauces." },
          { name: "Chicken Teriyaki Sub", price: "₹260", desc: "Sweet onion chicken teriyaki strips." }
        ]
      }
    ];
  }

  if (cleanName.includes('dmart') || cleanName.includes('smart')) {
    return [
      {
        category: "Daily Staples",
        items: [
          { name: "Premium Basmati Rice (5kg)", price: "₹499", desc: "Long grain aromatic rice." },
          { name: "Fortune Sunflower Oil (1L)", price: "₹145", desc: "Refined healthy cooking oil." }
        ]
      },
      {
        category: "Packaged Foods",
        items: [
          { name: "Amul Butter (500g)", price: "₹275", desc: "Delicious pasteurized salted butter." }
        ]
      }
    ];
  }

  if (cleanName.includes('croma')) {
    return [
      {
        category: "Accessories",
        items: [
          { name: "Croma 10000mAh Powerbank", price: "₹999", desc: "Dual USB output fast charging." },
          { name: "Wireless Bluetooth Earbuds", price: "₹1499", desc: "Active noise cancellation and type-C charging." }
        ]
      }
    ];
  }

  if (cleanName.includes('decathlon')) {
    return [
      {
        category: "Sportswear & Equipment",
        items: [
          { name: "Quechua 10L Backpack", price: "₹299", desc: "Compact hiking daypack." },
          { name: "Fitness Dumbbells (2 x 5kg)", price: "₹1199", desc: "Vinyl coated hand weights." }
        ]
      }
    ];
  }

  if (cleanName.includes('wework') || cleanName.includes('awfis')) {
    return [
      {
        category: "Desk Space Plans",
        items: [
          { name: "Co-working Day Pass", price: "₹499", desc: "Full access to high-speed internet and hot desk spaces." },
          { name: "Dedicated Desk Monthly", price: "₹9999", desc: "24/7 access to your own personal desk spot." }
        ]
      }
    ];
  }

  if (cleanName.includes('gold') || cleanName.includes('cult.fit')) {
    return [
      {
        category: "Memberships & Passes",
        items: [
          { name: "1 Month Fitness Membership", price: "₹2999", desc: "Access to group classes, cardio area, and strength weights." }
        ]
      }
    ];
  }

  if (cleanName.includes('apollo') || cleanName.includes('jupiter') || cleanName.includes('fortis')) {
    return [
      {
        category: "Medical Services & Health Checkups",
        items: [
          { name: "General Physician Checkup", price: "₹500", desc: "Primary health assessment and prescription check." },
          { name: "Full Body Diagnostics", price: "₹2499", desc: "Blood panels, sugar profiles, and ECG screening." }
        ]
      }
    ];
  }

  // Fallbacks
  if (category === 'Cafe') {
    return [
      {
        category: "Hot Brews",
        items: [
          { name: "House Drip Coffee", price: "₹150", desc: "Freshly roasted single-origin blend." },
          { name: "Hot Chocolate", price: "₹180", desc: "Creamy steamed milk infused with dark Belgian cacao." }
        ]
      },
      {
        category: "Snacks",
        items: [
          { name: "Avocado Toast", price: "₹299", desc: "Toasted sourdough bread topped with crushed avocado and sea salt." }
        ]
      }
    ];
  }

  if (category === 'Restaurant') {
    return [
      {
        category: "Entrées",
        items: [
          { name: "Chef's Special Pasta", price: "₹380", desc: "Penne tossed in creamy pesto with cherry tomatoes." },
          { name: "Pan-Seared Paneer Tikka", price: "₹320", desc: "Spiced cottage cheese chunks roasted in tandoor." }
        ]
      }
    ];
  }

  if (category === 'Hospital') {
    return [
      {
        category: "Services & Consultations",
        items: [
          { name: "General Practitioner Consult", price: "₹600", desc: "Routine health checkup and prescription writeup." },
          { name: "Emergency Room Visit", price: "₹1500", desc: "Urgent primary care and assessment." }
        ]
      }
    ];
  }

  if (category === 'Clinic') {
    return [
      {
        category: "Outpatient Services",
        items: [
          { name: "Standard Consultation", price: "₹400", desc: "Routine check with local resident doctor." }
        ]
      }
    ];
  }

  return [
    {
      category: "Featured Products",
      items: [
        { name: "Standard Service Consultation", price: "₹500", desc: "General access to services." }
      ]
    }
  ];
};

export const BusinessDetails = ({ business }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const fav = isFavorite(business.id);
  const products = getAIProducts(business.name, business.category);

  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${business.lat},${business.lng}`;
  const googleMapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.name + ', ' + business.address)}`;

  const handleShare = (e) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: business.name,
        text: business.description,
        url: window.location.href
      }).catch(err => console.log(err));
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="bg-white border border-[#BCCCDC]/40 rounded-3xl overflow-hidden shadow-[0_8px_32px_rgba(188,204,220,0.15)] flex flex-col w-full">
      {/* Hero Image Section */}
      <div className="relative h-64 md:h-80 w-full group">
        <img 
          src={business.imageUrl} 
          alt={business.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-3 z-30">
          <button 
            onClick={handleShare}
            className="p-2.5 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-colors cursor-pointer"
            title="Share business"
          >
            <Share2 size={20} />
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(business);
            }}
            className={`p-2.5 backdrop-blur-md rounded-full transition-colors cursor-pointer ${
              fav 
                ? 'bg-red-500 text-white hover:bg-red-600' 
                : 'bg-white/20 text-white hover:bg-white/40 hover:text-red-400'
            }`}
            title={fav ? "Remove from Favorites" : "Add to Favorites"}
          >
            <Heart size={20} className={fav ? 'fill-current' : ''} />
          </button>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
          <div className="flex gap-2 mb-3">
            <span className="px-3 py-1 text-xs font-semibold bg-white/20 backdrop-blur-md rounded-lg">
              {business.category}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-md">
            {business.name}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
            <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-lg">
              <Star size={16} className="text-yellow-400 fill-yellow-400" />
              <span>{business.rating}</span>
              <span className="text-white/70 font-normal">({business.reviewCount || 0} reviews)</span>
            </div>
            <div className="flex items-center bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-lg">
              <PriceLevel level={business.priceLevel} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8 bg-white justify-between items-start">
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-800 mb-4">About</h2>
          <p className="text-[#7C8A9B] leading-relaxed mb-6">
            {business.description || "A premium local business offering high-quality services matching your preferences."}
          </p>
          
          <div className="flex flex-col gap-3 text-sm text-[#7C8A9B]">
            <p><span className="font-semibold text-gray-700">Address:</span> {business.address || "Address not listed"}</p>
            <p><span className="font-semibold text-gray-700">Hours:</span> {business.businessHours || "9:00 AM - 9:00 PM"}</p>
            <p><span className="font-semibold text-gray-700">Phone:</span> {business.phone || "Phone not listed"}</p>
          </div>
        </div>

        {/* Navigation Actions */}
        <div className="w-full md:w-auto mt-6 md:mt-0 shrink-0 flex flex-col gap-3">
          <a 
            href={googleMapsSearchUrl}
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 border border-slate-200 text-gray-750 font-bold rounded-xl hover:bg-slate-50 transition-all text-sm cursor-pointer active:scale-95"
          >
            <Map size={16} />
            View Location on Google Maps
          </a>
          <a 
            href={googleMapsDirectionsUrl}
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/25 transition-all text-sm cursor-pointer active:scale-95"
          >
            <Navigation size={16} className="rotate-45" />
            Get Directions (Google Maps)
          </a>
        </div>
      </div>

      {/* Menu / Products Section */}
      <div className="p-6 md:p-8 border-t border-[#BCCCDC]/30 bg-slate-50">
        <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Sparkles className="text-blue-500 fill-blue-100 animate-pulse" size={18} />
          Products & Service Offerings <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">AI Verified</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((cat, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
              <h4 className="font-bold text-gray-800 text-sm mb-4 border-b pb-2 border-slate-100">{cat.category}</h4>
              <div className="space-y-4">
                {cat.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <h5 className="font-semibold text-gray-800 text-xs">{item.name}</h5>
                      <p className="text-[11px] text-[#7C8A9B] mt-1 line-clamp-2">{item.desc}</p>
                    </div>
                    <span className="font-bold text-blue-600 text-xs shrink-0">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
