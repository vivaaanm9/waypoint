import React from 'react';
import { MapPin, Phone, Mail, Globe, ExternalLink } from 'lucide-react';



export const ContactCard = ({ address, phone, email, website }) => {
  return (
    <div className="bg-white/40 border border-[#BCCCDC]/40 rounded-3xl p-6 backdrop-blur-xl shadow-[0_8px_32px_rgba(188,204,220,0.15)] flex flex-col gap-5">
      <h3 className="text-lg font-bold text-gray-800">Contact Info</h3>
      
      <div className="flex flex-col gap-4">
        <a 
          href={`https://maps.google.com/?q=${encodeURIComponent(address)}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="group flex items-start gap-4 p-3 rounded-2xl hover:bg-[#D9EAFD]/30 transition-colors"
        >
          <div className="p-2.5 bg-white/60 rounded-xl text-[#9AA6B2] group-hover:text-blue-500 group-hover:shadow-sm transition-all shadow-[0_2px_10px_rgba(188,204,220,0.2)]">
            <MapPin size={20} />
          </div>
          <div className="flex-1 pt-1">
            <p className="text-sm font-medium text-gray-800 group-hover:text-blue-600 transition-colors leading-relaxed">
              {address}
            </p>
          </div>
          <ExternalLink size={16} className="text-[#BCCCDC] opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
        </a>

        <a 
          href={`tel:${phone}`}
          className="group flex items-center gap-4 p-3 rounded-2xl hover:bg-[#D9EAFD]/30 transition-colors"
        >
          <div className="p-2.5 bg-white/60 rounded-xl text-[#9AA6B2] group-hover:text-green-500 group-hover:shadow-sm transition-all shadow-[0_2px_10px_rgba(188,204,220,0.2)]">
            <Phone size={20} />
          </div>
          <p className="text-sm font-medium text-gray-800 group-hover:text-green-600 transition-colors flex-1">
            {phone}
          </p>
        </a>

        <a 
          href={`mailto:${email}`}
          className="group flex items-center gap-4 p-3 rounded-2xl hover:bg-[#D9EAFD]/30 transition-colors"
        >
          <div className="p-2.5 bg-white/60 rounded-xl text-[#9AA6B2] group-hover:text-orange-500 group-hover:shadow-sm transition-all shadow-[0_2px_10px_rgba(188,204,220,0.2)]">
            <Mail size={20} />
          </div>
          <p className="text-sm font-medium text-gray-800 group-hover:text-orange-600 transition-colors flex-1">
            {email}
          </p>
        </a>

        <a 
          href={website}
          target="_blank" 
          rel="noopener noreferrer"
          className="group flex items-center gap-4 p-3 rounded-2xl hover:bg-[#D9EAFD]/30 transition-colors"
        >
          <div className="p-2.5 bg-white/60 rounded-xl text-[#9AA6B2] group-hover:text-purple-500 group-hover:shadow-sm transition-all shadow-[0_2px_10px_rgba(188,204,220,0.2)]">
            <Globe size={20} />
          </div>
          <p className="text-sm font-medium text-gray-800 group-hover:text-purple-600 transition-colors flex-1 truncate">
            {website.replace(/^https?:\/\//, '')}
          </p>
          <ExternalLink size={16} className="text-[#BCCCDC] opacity-0 group-hover:opacity-100 transition-opacity" />
        </a>
      </div>
    </div>
  );
};
