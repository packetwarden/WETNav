// src/components/EventCard.tsx
import { EventDetail } from "@/types";
// Import icons
import { FaWindows } from 'react-icons/fa';
import { SiProxmox } from 'react-icons/si'; // Sysmon stand-in icon
import { FiTag } from 'react-icons/fi';
import { TbReportAnalytics } from "react-icons/tb";
import { FiChevronRight } from 'react-icons/fi'; // Icon to indicate clickability

interface EventCardProps {
  event: EventDetail;
  onClick: (event: EventDetail) => void;
  isSelected: boolean; // Add prop to know if this card is currently selected
}


// Helper for source badge styles - simplified for just icon
const getSourceIcon = (source: EventDetail['source']) => {
  switch (source) {
    case 'Sysmon':
      return <SiProxmox className="h-4 w-4 text-blue-400" />;
    case 'Windows Security':
      return <FaWindows className="h-4 w-4 text-green-400" />;
    default:
      return null;
  }
};

export default function EventCard({ event, onClick, isSelected }: EventCardProps) {
  const sourceIcon = getSourceIcon(event.source);
  const mitreCount = event.mitreAttack?.length || 0;

  // Define base and selected styles
  const baseClasses = "flex items-center justify-between gap-4 px-4 py-3 border-b border-gray-700 hover:bg-gray-700/50 transition-colors duration-150 cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-1 focus:ring-offset-gray-800";
  const selectedClasses = "bg-blue-900/30 border-l-2 border-l-blue-500 hover:bg-blue-900/40"; // Highlight background and add left border

  return (
    <div
      className={`${baseClasses} ${isSelected ? selectedClasses : 'border-l-2 border-l-transparent'}`} // Apply selected styles conditionally, keep transparent border for alignment
      onClick={() => onClick(event)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(event) }}
      role="button"
      tabIndex={0}
      aria-label={`View details for Event ID ${event.id}: ${event.name}`}
      aria-selected={isSelected} // Accessibility for selection state
    >
      {/* Main Content Area */}
      <div className="flex items-center gap-3 flex-grow min-w-0">
        {/* Source Icon */}
        <div className="flex-shrink-0 w-6 text-center">
            {sourceIcon}
        </div>

        {/* ID, Name, and Metadata Block */}
        <div className="flex-grow min-w-0">
          {/* Top Row: ID and Name */}
          <div className="flex items-baseline gap-2 mb-0.5">
              <span className="font-mono text-sm text-gray-300 font-medium shrink-0">
                  {event.id}
              </span>
              <p className="text-sm text-gray-100 truncate font-semibold" title={event.name}>
                  {event.name}
              </p>
          </div>

          {/* Bottom Row: Metadata (Category & MITRE Count) */}
          {(event.category || mitreCount > 0) && (
            <div className="flex items-center gap-3 text-xs text-gray-400">
              {/* Category */}
              {event.category && (
                <span className="inline-flex items-center gap-1">
                  <FiTag className="h-3 w-3" />
                  {event.category}
                </span>
              )}
              {/* MITRE Count */}
              {mitreCount > 0 && (
                <span className="inline-flex items-center gap-1" title={`${mitreCount} MITRE Technique(s) mapped`}>
                  <TbReportAnalytics className="h-3.5 w-3.5 text-red-400/80" />
                  {mitreCount} ATT&CK
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right Side: Chevron Indicator */}
      <div className="flex-shrink-0">
        <FiChevronRight className={`h-5 w-5 transition-colors ${isSelected ? 'text-blue-400' : 'text-gray-500'}`} />
      </div>
    </div>
  );
}
