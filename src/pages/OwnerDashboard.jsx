import React, { useState, useEffect } from "react";
import { useWaypointContext } from "../context/WaypointContext";
import { useAuth } from "../context/AuthContext";
import { useReviews } from "../context/ReviewsContext";
import { 
  Building, CheckCircle, BarChart3, TrendingUp, PhoneCall, 
  MapPin, Globe, Sparkles, MessageSquare, Send, Clock
} from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export const OwnerDashboard = () => {
  const { businesses, setBusinesses } = useWaypointContext();
  const { user, isAuthenticated } = useAuth();
  const { reviews, addReview } = useReviews();

  const [claimedBusiness, setClaimedBusiness] = useState(null);
  const [claimSearchQuery, setClaimSearchQuery] = useState("");
  const [claimResults, setClaimResults] = useState([]);
  
  // Owner updates states
  const [description, setDescription] = useState("");
  const [hours, setHours] = useState("");
  const [phone, setPhone] = useState("");
  const [activeTab, setActiveTab] = useState("analytics"); // 'analytics' | 'edit' | 'reviews'

  // Reply state
  const [replies, setReplies] = useState({});
  const [replyInputs, setReplyInputs] = useState({});

  useEffect(() => {
    // Check if user already claimed a business
    const saved = localStorage.getItem(`claimed_biz_${user?.email || 'guest'}`);
    if (saved) {
      const biz = JSON.parse(saved);
      // Sync with current businesses state if exists
      const current = businesses.find(b => b.id === biz.id);
      setClaimedBusiness(current || biz);
      setDescription(current?.description || biz.description);
      setHours(current?.businessHours || biz.businessHours);
      setPhone(current?.phone || biz.phone);
    }
  }, [businesses, user]);

  const handleClaimSearch = (e) => {
    e.preventDefault();
    if (!claimSearchQuery.trim()) return;
    const matches = businesses.filter(b => 
      b.name.toLowerCase().includes(claimSearchQuery.toLowerCase())
    );
    setClaimResults(matches);
  };

  const handleClaimSelect = (biz) => {
    const updatedBiz = { ...biz, isVerified: true };
    
    // Save locally
    setClaimedBusiness(updatedBiz);
    localStorage.setItem(`claimed_biz_${user?.email || 'guest'}`, JSON.stringify(updatedBiz));
    
    // Update main context
    setBusinesses(prev => prev.map(b => b.id === biz.id ? updatedBiz : b));
    
    // Reset claims search
    setClaimResults([]);
    setClaimSearchQuery("");
  };

  const handleSaveUpdates = (e) => {
    e.preventDefault();
    if (!claimedBusiness) return;

    const updated = {
      ...claimedBusiness,
      description,
      businessHours: hours,
      phone
    };

    setClaimedBusiness(updated);
    localStorage.setItem(`claimed_biz_${user?.email || 'guest'}`, JSON.stringify(updated));
    setBusinesses(prev => prev.map(b => b.id === claimedBusiness.id ? updated : b));
    alert("Listing details successfully updated!");
  };

  const handleSendReply = (reviewId) => {
    const txt = replyInputs[reviewId];
    if (!txt || !txt.trim()) return;
    setReplies(prev => ({
      ...prev,
      [reviewId]: txt
    }));
    setReplyInputs(prev => ({
      ...prev,
      [reviewId]: ""
    }));
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center px-4">
        <Building size={64} className="text-[#9AA6B2] mb-4 opacity-50" />
        <h2 className="text-2xl font-bold text-gray-800">Owner Verification Portal</h2>
        <p className="text-[#9AA6B2] mt-2 max-w-md">
          Please log in to your account using the menu bar above to claim, edit, and track analytics for your local business listing.
        </p>
      </div>
    );
  }

  // Generate Mock Analytics
  const trafficData = [
    { name: "Mon", visitors: 45, clicks: 12 },
    { name: "Tue", visitors: 58, clicks: 19 },
    { name: "Wed", visitors: 62, clicks: 22 },
    { name: "Thu", visitors: 78, clicks: 35 },
    { name: "Fri", visitors: 94, clicks: 48 },
    { name: "Sat", visitors: 120, clicks: 65 },
    { name: "Sun", visitors: 88, clicks: 40 }
  ];

  const businessReviews = claimedBusiness 
    ? reviews.filter(r => r.businessId === claimedBusiness.id)
    : [];

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 font-sans">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-800">Business Owner Dashboard</h1>
          <p className="text-[#9AA6B2] mt-1">Manage listings, view custom visitor charts, and track interactions.</p>
        </div>
      </div>

      {!claimedBusiness ? (
        <div className="bg-white/20 border border-[#BCCCDC]/40 rounded-3xl p-8 backdrop-blur-xl shadow-lg max-w-2xl mx-auto">
          <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
            <Building className="text-blue-600" />
            Claim Your Business
          </h2>
          <p className="text-[#7C8A9B] text-sm mb-6">
            Search for your establishment below to register as the verified owner. This gives you editing access and analytics tools.
          </p>

          <form onSubmit={handleClaimSearch} className="flex gap-2 mb-6">
            <input
              type="text"
              placeholder="Type business name (e.g. Starbucks)"
              value={claimSearchQuery}
              onChange={(e) => setClaimSearchQuery(e.target.value)}
              className="flex-1 px-4 py-3 bg-white border border-[#BCCCDC]/40 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-2xl text-sm font-semibold shadow-md hover:bg-blue-700 transition-all cursor-pointer"
            >
              Search
            </button>
          </form>

          {claimResults.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-[#9AA6B2] uppercase tracking-wider">Matching Businesses</h3>
              <div className="divide-y divide-slate-100 bg-white rounded-2xl border border-slate-100 overflow-hidden">
                {claimResults.map(biz => (
                  <div key={biz.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm">{biz.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">{biz.address}</p>
                    </div>
                    <button
                      onClick={() => handleClaimSelect(biz)}
                      className="px-4 py-1.5 bg-green-50 text-green-700 hover:bg-green-100 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1"
                    >
                      <CheckCircle size={14} />
                      Claim Listing
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1 flex flex-col gap-3 bg-white/20 border border-[#BCCCDC]/40 p-4 rounded-3xl backdrop-blur-xl">
            <div className="p-3 border-b border-[#BCCCDC]/20 text-center">
              <div className="w-16 h-16 mx-auto rounded-2xl overflow-hidden mb-3">
                <img src={claimedBusiness.imageUrl} alt={claimedBusiness.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-bold text-gray-800 text-sm">{claimedBusiness.name}</h3>
              <span className="inline-flex items-center gap-1 text-[10px] text-green-600 font-bold uppercase tracking-wider bg-green-50 px-2 py-0.5 rounded-full mt-1.5 border border-green-100">
                <CheckCircle size={10} />
                Verified Owner
              </span>
            </div>

            <button
              onClick={() => setActiveTab("analytics")}
              className={`w-full py-3 px-4 rounded-2xl text-left text-sm font-semibold transition-all cursor-pointer flex items-center gap-2.5 ${
                activeTab === "analytics" ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" : "text-[#7C8A9B] hover:bg-white/40 hover:text-gray-800"
              }`}
            >
              <BarChart3 size={18} />
              Analytics
            </button>
            <button
              onClick={() => setActiveTab("edit")}
              className={`w-full py-3 px-4 rounded-2xl text-left text-sm font-semibold transition-all cursor-pointer flex items-center gap-2.5 ${
                activeTab === "edit" ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" : "text-[#7C8A9B] hover:bg-white/40 hover:text-gray-800"
              }`}
            >
              <Building size={18} />
              Edit Listing
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`w-full py-3 px-4 rounded-2xl text-left text-sm font-semibold transition-all cursor-pointer flex items-center gap-2.5 ${
                activeTab === "reviews" ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" : "text-[#7C8A9B] hover:bg-white/40 hover:text-gray-800"
              }`}
            >
              <MessageSquare size={18} />
              User Reviews ({businessReviews.length})
            </button>

            <button
              onClick={() => {
                localStorage.removeItem(`claimed_biz_${user?.email || 'guest'}`);
                setClaimedBusiness(null);
              }}
              className="mt-6 w-full py-3 text-center text-xs font-bold text-red-500 hover:text-red-700 transition-colors border border-dashed border-red-200 hover:border-red-400 rounded-2xl cursor-pointer"
            >
              Unclaim Business
            </button>
          </div>

          {/* Main Dashboard Panel */}
          <div className="lg:col-span-3">
            {activeTab === "analytics" && (
              <div className="space-y-6">
                {/* Scorecards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white/30 border border-[#BCCCDC]/40 rounded-3xl p-5 backdrop-blur-md">
                    <div className="flex items-center justify-between text-[#9AA6B2] mb-3">
                      <span className="text-xs font-semibold uppercase">Total Views</span>
                      <TrendingUp size={18} />
                    </div>
                    <h3 className="text-3xl font-extrabold text-gray-800">545</h3>
                    <p className="text-[10px] text-green-600 font-bold mt-1">+14% vs last week</p>
                  </div>
                  <div className="bg-white/30 border border-[#BCCCDC]/40 rounded-3xl p-5 backdrop-blur-md">
                    <div className="flex items-center justify-between text-[#9AA6B2] mb-3">
                      <span className="text-xs font-semibold uppercase">Call Click-throughs</span>
                      <PhoneCall size={18} />
                    </div>
                    <h3 className="text-3xl font-extrabold text-gray-800">89</h3>
                    <p className="text-[10px] text-green-600 font-bold mt-1">+8% vs last week</p>
                  </div>
                  <div className="bg-white/30 border border-[#BCCCDC]/40 rounded-3xl p-5 backdrop-blur-md">
                    <div className="flex items-center justify-between text-[#9AA6B2] mb-3">
                      <span className="text-xs font-semibold uppercase">Directions Requests</span>
                      <MapPin size={18} />
                    </div>
                    <h3 className="text-3xl font-extrabold text-gray-800">112</h3>
                    <p className="text-[10px] text-green-600 font-bold mt-1">+24% vs last week</p>
                  </div>
                </div>

                {/* Visitor Charts */}
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                  <h3 className="text-base font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <BarChart3 className="text-blue-600" size={18} />
                    Weekly Performance Traffic Analytics
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={trafficData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} tickLine={false} />
                        <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
                        <Tooltip />
                        <Line type="monotone" dataKey="visitors" stroke="#3B82F6" strokeWidth={3} activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="clicks" stroke="#10B981" strokeWidth={3} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "edit" && (
              <form onSubmit={handleSaveUpdates} className="bg-white/20 border border-[#BCCCDC]/40 rounded-3xl p-6 backdrop-blur-xl space-y-5">
                <h3 className="text-lg font-bold text-gray-800 mb-2">Update Public Profile</h3>
                
                <div>
                  <label className="block text-xs font-bold text-[#9AA6B2] uppercase tracking-wider mb-2">Establishment Phone</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-[#BCCCDC]/40 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#9AA6B2] uppercase tracking-wider mb-2">Operational Hours</label>
                  <input
                    type="text"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-[#BCCCDC]/40 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#9AA6B2] uppercase tracking-wider mb-2">Business Description</label>
                  <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-[#BCCCDC]/40 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded-2xl text-sm font-semibold shadow-md hover:bg-blue-700 transition-all cursor-pointer active:scale-95"
                >
                  Save Business Details
                </button>
              </form>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-800 mb-2">Customer Feedback Reviews</h3>
                {businessReviews.length === 0 ? (
                  <div className="py-12 text-center bg-white/20 rounded-3xl border border-slate-100 backdrop-blur-md">
                    <MessageSquare size={32} className="mx-auto text-gray-300 mb-2" />
                    <p className="text-[#9AA6B2] text-sm">No reviews have been written for your business yet.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {businessReviews.map(rev => (
                      <div key={rev.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                          <img src={rev.avatar} alt={rev.author} className="w-8 h-8 rounded-full bg-slate-100" />
                          <div>
                            <h5 className="font-bold text-gray-800 text-xs">{rev.author}</h5>
                            <div className="flex items-center gap-1 mt-0.5">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star key={i} size={10} className={i < rev.rating ? "text-yellow-500 fill-yellow-500" : "text-slate-200"} />
                              ))}
                            </div>
                          </div>
                          <span className="text-[10px] text-gray-400 ml-auto">{rev.date}</span>
                        </div>
                        <p className="text-xs text-[#7C8A9B] leading-relaxed">{rev.comment}</p>

                        {/* Reply section */}
                        {replies[rev.id] ? (
                          <div className="mt-2 p-3 bg-slate-50 border border-slate-100 rounded-xl">
                            <span className="text-[10px] font-bold text-blue-600 flex items-center gap-1 mb-1">
                              <CheckCircle size={10} />
                              Your Official Response:
                            </span>
                            <p className="text-xs text-gray-700">{replies[rev.id]}</p>
                          </div>
                        ) : (
                          <div className="mt-2 flex gap-2">
                            <input
                              type="text"
                              placeholder="Write your official owner reply..."
                              value={replyInputs[rev.id] || ""}
                              onChange={(e) => setReplyInputs(prev => ({ ...prev, [rev.id]: e.target.value }))}
                              className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <button
                              onClick={() => handleSendReply(rev.id)}
                              className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all cursor-pointer flex items-center justify-center"
                            >
                              <Send size={12} />
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
