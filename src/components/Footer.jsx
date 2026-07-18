import React from 'react';
import { 
  MapPin, 
  Mail, 
  Phone
} from 'lucide-react';

export default function Footer({ setActiveTab }) {
  const handleNavClick = (tab) => {
    if (setActiveTab) {
      setActiveTab(tab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-white border-t border-brand-border/40 py-12 px-6 sm:px-12 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 select-none">
        
        {/* Column 1: About Company */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-bg border border-brand-border/30 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-brand-steel" />
            </div>
            <span className="font-extrabold text-sm text-slate-800 tracking-tight">Waypoint Inc.</span>
          </div>
          <p className="text-xs text-slate-450 leading-relaxed max-w-xs font-semibold">
            Waypoint is a high-performance geographic visualization platform powered by Waypoint Spatial Inc. Navigate, search, geocode, and route paths globally in real-time.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="space-y-3.5">
          <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-400">Navigation</h4>
          <ul className="space-y-2 text-xs text-slate-550 font-bold">
            <li>
              <button 
                onClick={() => handleNavClick('Home')}
                className="hover:text-brand-steel transition-colors cursor-pointer text-left"
              >
                Home Dashboard
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleNavClick('Search Map')}
                className="hover:text-brand-steel transition-colors cursor-pointer text-left"
              >
                Search Map Explorer
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleNavClick('Favourites')}
                className="hover:text-brand-steel transition-colors cursor-pointer text-left"
              >
                Saved Favourites
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact Details */}
        <div className="space-y-3.5">
          <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-400">Contact Details</h4>
          <ul className="space-y-2 text-xs text-slate-550 font-bold">
            <li className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-brand-steel shrink-0" />
              <span>1560 Broadway, Times Square, NY</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-brand-steel shrink-0" />
              <span>+1 (212) 555-0142</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-brand-steel shrink-0" />
              <span>support@waypoint.io</span>
            </li>
          </ul>
        </div>

        {/* Column 4: Connected Socials */}
        <div className="space-y-3.5">
          <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-400">Social Connect</h4>
          <p className="text-xs text-slate-450 leading-relaxed font-semibold">
            Follow our open source repositories and community map updates.
          </p>
          <div className="flex gap-3">
            
            {/* Twitter/X */}
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-slate-50 border border-brand-border/30 flex items-center justify-center text-slate-450 hover:text-brand-steel hover:bg-brand-accent/30 transition-all cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-slate-50 border border-brand-border/30 flex items-center justify-center text-slate-450 hover:text-brand-steel hover:bg-brand-accent/30 transition-all cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-slate-50 border border-brand-border/30 flex items-center justify-center text-slate-450 hover:text-brand-steel hover:bg-brand-accent/30 transition-all cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-slate-50 border border-brand-border/30 flex items-center justify-center text-slate-450 hover:text-brand-steel hover:bg-brand-accent/30 transition-all cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>

          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto border-t border-slate-100 mt-10 pt-6 flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-wider select-none">
        <div>
          &copy; 2026 Waypoint Spatial Inc. All rights reserved.
        </div>
        <div>
          Platform Latency: 0.02ms
        </div>
      </div>
    </footer>
  );
}