import React from "react";
import Modal from "./Modal";
import { Star, ShieldAlert } from "lucide-react";
import { PriceLevel } from "../common/PriceLevel";

export const CompareModal = ({ isOpen, onClose, businessA, businessB }) => {
  if (!businessA || !businessB) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Compare Businesses">
      <div className="flex flex-col gap-6 overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="py-2 text-[#9AA6B2] uppercase font-semibold w-1/3">Feature</th>
              <th className="py-2 font-bold text-gray-800 text-sm w-1/3">{businessA.name}</th>
              <th className="py-2 font-bold text-gray-800 text-sm w-1/3">{businessB.name}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="py-3 font-semibold text-[#64748B]">Category</td>
              <td className="py-3 text-gray-700">{businessA.category}</td>
              <td className="py-3 text-gray-700">{businessB.category}</td>
            </tr>
            <tr>
              <td className="py-3 font-semibold text-[#64748B]">Rating</td>
              <td className="py-3">
                <div className="flex items-center gap-1">
                  <Star size={14} className="text-yellow-500 fill-yellow-500" />
                  <span className="font-bold text-gray-800">{businessA.rating}</span>
                  <span className="text-slate-400 font-normal">({businessA.reviewCount} reviews)</span>
                </div>
              </td>
              <td className="py-3">
                <div className="flex items-center gap-1">
                  <Star size={14} className="text-yellow-500 fill-yellow-500" />
                  <span className="font-bold text-gray-800">{businessB.rating}</span>
                  <span className="text-slate-400 font-normal">({businessB.reviewCount} reviews)</span>
                </div>
              </td>
            </tr>
            <tr>
              <td className="py-3 font-semibold text-[#64748B]">Price Level</td>
              <td className="py-3"><PriceLevel level={businessA.priceLevel} /></td>
              <td className="py-3"><PriceLevel level={businessB.priceLevel} /></td>
            </tr>
            <tr>
              <td className="py-3 font-semibold text-[#64748B]">Open Status</td>
              <td className="py-3 font-semibold">
                <span className={businessA.isOpen ? "text-green-600" : "text-red-500"}>
                  {businessA.isOpen ? "Open Now" : "Closed"}
                </span>
              </td>
              <td className="py-3 font-semibold">
                <span className={businessB.isOpen ? "text-green-600" : "text-red-500"}>
                  {businessB.isOpen ? "Open Now" : "Closed"}
                </span>
              </td>
            </tr>
            <tr>
              <td className="py-3 font-semibold text-[#64748B]">Phone</td>
              <td className="py-3 text-slate-600">{businessA.phone || "Not listed"}</td>
              <td className="py-3 text-slate-600">{businessB.phone || "Not listed"}</td>
            </tr>
            <tr>
              <td className="py-3 font-semibold text-[#64748B]">Address</td>
              <td className="py-3 text-slate-600 leading-relaxed">{businessA.address}</td>
              <td className="py-3 text-slate-600 leading-relaxed">{businessB.address}</td>
            </tr>
          </tbody>
        </table>

        {/* AI Insight */}
        <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex gap-3 items-start">
          <ShieldAlert className="text-blue-500 shrink-0 mt-0.5" size={18} />
          <div>
            <h5 className="font-bold text-blue-900 text-xs">Waypoint AI Comparison Summary</h5>
            <p className="text-[11px] text-blue-800 mt-1 leading-relaxed">
              {businessA.rating > businessB.rating 
                ? `**${businessA.name}** holds a higher score of **${businessA.rating} ★** compared to **${businessB.name}** (${businessB.rating} ★), backed by a stronger review base of ${businessA.reviewCount} customer ratings.`
                : `**${businessB.name}** holds a higher score of **${businessB.rating} ★** compared to **${businessA.name}** (${businessA.rating} ★), backed by a stronger review base of ${businessB.reviewCount} customer ratings.`
              }
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};
