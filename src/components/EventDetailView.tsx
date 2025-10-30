// src/components/EventDetailView.tsx
'use client';

import React from 'react';
import { EventDetail } from "@/types";
import Link from 'next/link';
import { FiX, FiExternalLink, FiAlertTriangle, FiInfo, FiList, FiShield } from 'react-icons/fi';
import { FaWindows } from 'react-icons/fa';
import { SiProxmox } from 'react-icons/si';

interface EventDetailViewProps {
  event: EventDetail | null;
  onClose?: () => void; // Make optional for standalone event pages
}

// --- Helper Components (with refined styles) ---

const getSourceIcon = (source: EventDetail['source']) => {
  const iconProps = { className: "h-4 w-4 shrink-0 text-slate-400" }; // Consistent icon color
  switch (source) {
    case 'Sysmon': return <SiProxmox {...iconProps} title="Sysmon Source" className="h-4 w-4 shrink-0 text-blue-400"/>; // Specific color
    case 'Windows Security': return <FaWindows {...iconProps} title="Windows Security Source" className="h-4 w-4 shrink-0 text-green-400"/>; // Specific color
    default: return <FiShield {...iconProps} title="Other Source" />;
  }
};

// Section component with refined heading style
const Section = ({ title, icon: Icon, children }: { title: string, icon: React.ElementType, children: React.ReactNode }) => (
    <section aria-labelledby={`section-title-${title.replace(/\s+/g, '-')}`}>
        <div className="mb-3 pb-1.5 border-b border-slate-700/70"> {/* Slightly lighter border */}
            <h3
                id={`section-title-${title.replace(/\s+/g, '-')}`}
                className="flex items-center gap-2 text-[0.8rem] font-semibold text-slate-300 tracking-wide uppercase" /* Smaller, uppercase heading */
            >
                <Icon className="h-3.5 w-3.5 text-slate-400" /> {/* Slightly smaller icon */}
                {title}
            </h3>
        </div>
        <div className="text-[0.85rem] text-slate-300 leading-relaxed space-y-3"> {/* Slightly smaller body text, adjusted leading, added spacing for children */}
            {children}
        </div>
    </section>
);

// --- Main EventDetailView Component (Grid Layout - Refined Styles) ---
export default function EventDetailView({ event, onClose }: EventDetailViewProps) {
  if (!event) {
    return (
      // Softer background, slightly darker border
      <div className="bg-slate-850 border border-slate-700/80 rounded-lg shadow-xl h-full flex items-center justify-center text-slate-500 p-6">
        Select an event to view details.
      </div>
    );
  }

  const sourceIcon = getSourceIcon(event.source);

  return (
    // Root Container: Using slate, slightly softer shadow
    <div className="grid grid-rows-[auto_1fr] h-full overflow-hidden min-w-0 bg-slate-850 border border-slate-700/80 rounded-lg shadow-lg text-[0.85rem]"> {/* Base text size slightly smaller */}

      {/* Header Row: Darker slate bg, subtle bottom border */}
      <header className="flex justify-between items-center p-3 pr-2 sm:p-3.5 sm:pr-2.5 border-b border-slate-700 bg-slate-900">
        <div className="flex items-center gap-2.5 overflow-hidden min-w-0"> {/* Slightly adjusted gap */}
          {sourceIcon}
          <div className="overflow-hidden">
            {/* Event ID prominent */}
            <h2 className="text-sm font-semibold text-slate-100 truncate" title={`Event ID: ${event.id}`}>
              Event ID: <span className="font-mono">{event.id}</span>
            </h2>
             {/* Source/Category less prominent */}
            <p className="text-xs text-slate-400 truncate">
              {event.source}
              {event.category && <span className="ml-1.5 opacity-80">- {event.category}</span>}
            </p>
          </div>
        </div>
        {onClose && (
          <div className="flex items-center gap-2">
            {/* View Full Page Link - only shown in sidebar view */}
            <Link
              href={`/event/${event.id}`}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-blue-400 hover:text-blue-300 hover:bg-slate-700/70 rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:ring-blue-500"
              aria-label="View full page for this event"
              title="View full page"
            >
              <FiExternalLink className="h-3.5 w-3.5" />
              <span>Full Page</span>
            </Link>
            {/* Mobile: Icon Only */}
            <Link
              href={`/event/${event.id}`}
              className="sm:hidden p-1.5 text-blue-400 hover:text-blue-300 hover:bg-slate-700/70 rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:ring-blue-500"
              aria-label="View full page for this event"
              title="View full page"
            >
              <FiExternalLink className="h-4 w-4" />
            </Link>
            {/* Close button with refined hover/focus */}
            <button
              onClick={onClose}
              className="ml-1 p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-700/70 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:ring-blue-500"
              aria-label="Close details"
            >
              <FiX className="h-5 w-5" />
            </button>
          </div>
        )}
      </header>

      {/* Content Row: Vertical scroll */}
      <main className="overflow-y-auto custom-scrollbar-v">
        {/* Inner padding container: Slightly increased padding */}
        <div className="p-5 md:p-6 space-y-6"> {/* Consistent spacing */}

          {/* Event Description Section */}
          <Section title="Event Description" icon={FiInfo}>
            <p className="break-words text-slate-200">{event.description || "No description provided."}</p> {/* Slightly brighter text */}
          </Section>

          {/* Notes & Common Scenarios Section */}
          {event.commonScenarios && event.commonScenarios.length > 0 && (
            // Using a slightly different background for notes? Optional.
            <div className="p-4 bg-slate-800/30 rounded border border-slate-700/50">
                <Section title="Analyst Notes & Scenarios" icon={FiAlertTriangle}>
                   <ul className="list-disc pl-5 space-y-1 text-slate-300"> {/* Adjusted list style */}
                     {event.commonScenarios.map((scenario, index) => (
                       <li key={index} className="break-words">{scenario}</li>
                     ))}
                   </ul>
                </Section>
            </div>
          )}

           {/* Key Log Fields Section */}
           {event.keyLogFields && event.keyLogFields.length > 0 ? (
             <Section title="Key Log Fields" icon={FiList}>
               <ul className="list-none pl-0 space-y-2 text-slate-300">
                 {event.keyLogFields.map((field, index) => (
                   <li key={index} className="break-words">
                     <code className="text-sm font-semibold text-blue-300">{field.field}</code>
                     <span className="text-slate-400"> - </span>
                     <span className="text-sm">{field.description}</span>
                   </li>
                 ))}
               </ul>
             </Section>
           ) : (
             <Section title="Key Log Fields" icon={FiList}>
               <p className="text-slate-500 italic text-sm">
                 Key log field information is not yet available for this event. Refer to official documentation for field details.
               </p>
             </Section>
           )}

           {/* Official Documentation Section */}
           {event.officialLink && (
             <Section title="Official Documentation" icon={FiExternalLink}>
                <Link
                  href={event.officialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 hover:underline break-all focus:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 rounded"
                >
                  <span className="truncate">{event.officialLink}</span>
                   <FiExternalLink className="h-3.5 w-3.5 shrink-0 opacity-60 group-hover:opacity-100 transition-opacity" />
                </Link>
             </Section>
           )}

        </div> {/* End Inner Padding Container */}
      </main> {/* End Content Row */}
    </div> // End Root Grid Container
  );
}
