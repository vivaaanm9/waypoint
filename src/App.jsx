import React, { useState } from "react";
import { WaypointProvider } from "./context/WaypointContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ReviewsProvider } from "./context/ReviewsContext";
import { DiscoveryPage } from "./pages/DiscoveryPage";
import Favorites from "./pages/Favorites";
import ExportCenter from "./pages/ExportCenter";
import { DashboardPage } from "./pages/DashboardPage";
import { OwnerDashboard } from "./pages/OwnerDashboard";
import { AIChatbot } from "./components/ui/AIChatbot";
import { AuthModal } from "./components/ui/AuthModal";
import { Compass, Heart, Download, BarChart2, Building, LogIn, LogOut } from "lucide-react";

function AppContent() {
  const [activePage, setActivePage] = useState("explore"); // 'explore' | 'favorites' | 'dashboard' | 'export' | 'owner'
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      {/* Navigation Header */}
      <header className="bg-white border-b border-[#E2E8F0] sticky top-0 z-50 px-6 py-4 flex items-center justify-between gap-4 flex-wrap md:flex-nowrap">
        <div className="flex items-center gap-3 select-none shrink-0">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-md">
            W
          </div>
          <div>
            <span className="font-extrabold text-xl text-gray-800 tracking-tight">Waypoint</span>
            <span className="text-[10px] text-blue-600 font-bold block leading-none uppercase tracking-widest mt-0.5">Explorer</span>
          </div>
        </div>

        <nav className="flex bg-slate-100 p-1 rounded-xl overflow-x-auto shrink-0 max-w-full">
          {[
            { id: "explore", label: "Explore Map", icon: Compass },
            { id: "favorites", label: "Favorites", icon: Heart },
            { id: "dashboard", label: "Analytics", icon: BarChart2 },
            { id: "owner", label: "Owner Panel", icon: Building },
            { id: "export", label: "Export", icon: Download }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activePage === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActivePage(tab.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-850 hover:bg-white/50"
                }`}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User Account Controls */}
        <div className="flex items-center gap-3 shrink-0 ml-auto md:ml-0">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-8 h-8 rounded-full border border-slate-200 bg-slate-50"
                />
                <span className="hidden sm:inline text-xs font-bold text-gray-700">{user.name}</span>
              </div>
              <button
                onClick={logout}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
                title="Logout"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setAuthModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 hover:bg-slate-50 text-gray-700 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-95"
            >
              <LogIn size={14} />
              Sign In
            </button>
          )}
        </div>
      </header>

      {/* Page Content */}
      <div className="flex-1 flex flex-col">
        {activePage === "explore" && <DiscoveryPage />}
        {activePage === "favorites" && <Favorites />}
        {activePage === "dashboard" && <DashboardPage />}
        {activePage === "owner" && <OwnerDashboard />}
        {activePage === "export" && <ExportCenter />}
      </div>

      {/* Floating Chatbot */}
      <AIChatbot />

      {/* Auth Dialog */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  );
}

function App() {
  return (
    <WaypointProvider>
      <AuthProvider>
        <ReviewsProvider>
          <AppContent />
        </ReviewsProvider>
      </AuthProvider>
    </WaypointProvider>
  );
}

export default App;