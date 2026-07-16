import React from 'react';
import { WaypointProvider, useWaypointContext } from './context/WaypointContext';
import { DashboardPage } from './views/DashboardPage';
import { DiscoveryPage } from './views/DiscoveryPage';
import { BusinessDetailsPage } from './views/BusinessDetailsPage';
import { TopNav } from './components/layout/TopNav';

const AppContent = () => {
  const { activeBusinessId, activeView } = useWaypointContext();

  return (
    <div className="min-h-screen bg-canvas font-sans overflow-x-hidden relative">
      {/* Decorative background blobs for glassmorphism effect */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-200/40 blur-[120px] pointer-events-none z-[-1]" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-200/40 blur-[120px] pointer-events-none z-[-1]" />
      <div className="fixed top-[40%] right-[20%] w-[30%] h-[30%] rounded-full bg-accent/30 blur-[100px] pointer-events-none z-[-1]" />
      
      {/* Navigation */}
      <TopNav />
      
      {/* View routing based on active business and active view */}
      <div className="animate-in fade-in duration-500 relative z-0">
        {activeBusinessId ? (
          <BusinessDetailsPage />
        ) : activeView === 'dashboard' ? (
          <DashboardPage />
        ) : (
          <DiscoveryPage />
        )}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <WaypointProvider>
      <AppContent />
    </WaypointProvider>
  );
};

export default App;
