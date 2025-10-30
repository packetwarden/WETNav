// src/components/EventDetailView.tsx
import React, { useState, useEffect } from 'react'; // Import React explicitly for useState/useEffect
import { EventDetail, MitreAttackInfo } from "@/types"; // Adjust path as needed
import Link from 'next/link';
import { FiX, FiExternalLink, FiTag, FiAlertTriangle, FiInfo, FiList, FiShield, FiChevronDown } from 'react-icons/fi'; // Added FiChevronDown
import { FaWindows } from 'react-icons/fa';
import { SiProxmox } from 'react-icons/si';
import { TbReportAnalytics } from "react-icons/tb";
import MitreTabs from './MitreTabs'; // Make sure this path is correct

interface EventDetailViewProps {
  event: EventDetail | null;
  onClose: () => void;
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

const TacticTag = ({ tactic }: { tactic: string }) => {
  const normalizedTactic = tactic.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  return (
    <span className="inline-block bg-slate-700 border border-slate-600 rounded px-2.5 py-0.5 text-xs font-medium text-slate-200 whitespace-nowrap shadow-sm"> {/* Using slate colors */}
      {normalizedTactic}
    </span>
  );
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

// Technique details with refined styling
const TechniqueDetailDisplay = ({ technique }: { technique: MitreAttackInfo | null }) => {
    if (!technique) {
        return <div className="mt-4 pt-4 border-t border-slate-700/50 text-slate-500 italic text-sm">Select a technique tab above.</div>;
    }

    const cleanDescription = (desc: string | undefined): string => {
        return desc?.replace(/\(Citation:[^)]+\)/g, '').trim() || "No description available.";
    };
    const cleanedDesc = cleanDescription(technique.description);
    const tactics = (technique.tactic || '').split(',').map(t => t.trim()).filter(t => t);

    return (
        // Slightly less prominent background, more subtle border
        <div className="mt-3 pt-4 px-4 pb-4 bg-slate-800/40 rounded border border-slate-700/50">
             <Link
               href={technique.url}
               target="_blank"
               rel="noopener noreferrer"
               className="group inline-flex items-center gap-1.5 text-base font-medium text-blue-400 mb-3 hover:text-blue-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-850 rounded" // Adjusted focus offset color
             >
               <span className="font-mono text-blue-500 mr-1">{technique.id}:</span> {/* ID emphasized */}
               <span>{technique.name}</span>
               <FiExternalLink className="h-3.5 w-3.5 shrink-0 opacity-60 group-hover:opacity-100 transition-opacity" />
             </Link>

            {tactics.length > 0 && (
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-2 mb-4 pl-1">
                    <span className="text-[0.7rem] font-semibold text-slate-400 uppercase mr-1">Tactics:</span>
                    {tactics.map(t => <TacticTag key={t} tactic={t} />)}
                </div>
            )}

            {/* Use prose for better typography control if needed */}
            <p className="text-sm text-slate-300 leading-relaxed prose prose-sm prose-invert max-w-none prose-p:my-1 prose-ul:my-1">
                {cleanedDesc}
            </p>
        </div>
    );
};

// --- Expandable Disclaimer Component ---
const Disclaimer = () => {
    const [isExpanded, setIsExpanded] = useState(false); // State to track expansion

    const toggleExpansion = () => {
        setIsExpanded(!isExpanded);
    };

    const detailsId = "disclaimer-details"; // For aria-controls

    return (
        // Main container styling remains similar
        <div className="mt-5 bg-yellow-900/20 border border-yellow-700/50 rounded-md text-xs">
            {/* Header is now a button to toggle */}
            <button
                type="button"
                onClick={toggleExpansion}
                aria-expanded={isExpanded}
                aria-controls={detailsId}
                // Make button look like the header, full width, flex layout
                className="flex w-full items-center justify-between gap-2 p-3 font-semibold text-yellow-100 hover:bg-yellow-900/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-600 rounded-t-md transition-colors"
            >
                <div className="flex items-center gap-2">
                    <FiAlertTriangle className="h-4 w-4 shrink-0" />
                    <span>Important Note on MITRE ATT&CK® Mappings</span>
                </div>
                 {/* Chevron icon rotates based on state */}
                <FiChevronDown
                    className={`h-5 w-5 shrink-0 transition-transform duration-200 ${
                        isExpanded ? 'rotate-180' : ''
                    }`}
                />
            </button>

            {/* Conditionally rendered details */}
            {isExpanded && (
                <div id={detailsId} className="px-3.5 pb-3.5 pt-2"> {/* Padding only when expanded */}
                    <ul className="list-disc list-outside pl-5 space-y-1.5 text-yellow-200/90"> {/* Increased spacing slightly */}
                        <li>
                            The MITRE ATT&CK® technique mappings presented here are based on my manual interpretation and analysis of Windows Event Logs. They are <strong>not official</strong> mappings endorsed by MITRE.
                        </li>
                        <li>
                            These mappings are intended for <strong>informational and guidance purposes only</strong> to suggest <em>potential</em> relevance. They do <strong>not</strong> constitute definitive proof of malicious activity.
                        </li>
                        <li>
                            Event log analysis <strong>requires context</strong>. Always correlate these potential mappings with surrounding events, system configurations, and other data sources.
                        </li>
                        <li>
                            Use this information as a <strong>starting point</strong> for investigation, not as a sole basis for decision-making. Independent verification and expert security analysis are strongly recommended.
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};


// --- Main EventDetailView Component (Grid Layout - Refined Styles) ---
export default function EventDetailView({ event, onClose }: EventDetailViewProps) {
  const [activeTechniqueId, setActiveTechniqueId] = useState<string | null>(null);

  useEffect(() => {
    if (event?.mitreAttack && event.mitreAttack.length > 0) {
      setActiveTechniqueId(event.mitreAttack[0].id);
    } else {
      setActiveTechniqueId(null);
    }
  }, [event]);

  const activeTechniqueDetails = event?.mitreAttack?.find(
    (tech) => tech.id === activeTechniqueId
  );

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
         {/* Close button with refined hover/focus */}
        <button
          onClick={onClose}
          className="ml-3 p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-700/70 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:ring-blue-500"
          aria-label="Close details"
        >
          <FiX className="h-5 w-5" />
        </button>
      </header>

      {/* Content Row: Vertical scroll */}
      <main className="overflow-y-auto custom-scrollbar-v">
        {/* Inner padding container: Slightly increased padding */}
        <div className="p-5 md:p-6 space-y-6"> {/* Consistent spacing */}

          {/* Event Description Section */}
          <Section title="Event Description" icon={FiInfo}>
            <p className="break-words text-slate-200">{event.description || "No description provided."}</p> {/* Slightly brighter text */}
          </Section>

          {/* MITRE ATT&CK Section */}
          {event.mitreAttack && event.mitreAttack.length > 0 && (
            <section aria-labelledby="mitre-section-title">
                 {/* --- MODIFIED HEADER FOR MITRE SECTION --- */}
                 <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 mb-2 pb-1.5 border-b border-slate-700/70">
                     {/* Original Title part */}
                     <h3 id="mitre-section-title" className="flex items-center gap-2 text-[0.8rem] font-semibold text-slate-300 tracking-wide uppercase">
                         <TbReportAnalytics className="h-4 w-4 text-red-500" />
                         <span>MITRE ATT&CK<sup>®</sup> Mapping ({event.mitreAttack.length})</span>
                     </h3>
                     {/* NEW: Short Disclaimer added here */}
                     <span className="flex items-center gap-1.5 text-xs text-yellow-400 italic shrink-0" title="ATT&CK mappings are interpretations based on event descriptions, not definitive proof. Always analyze full event details.">
                         <FiAlertTriangle className="h-3.5 w-3.5 shrink-0" />
                         Interpretations, not definitive proof. Analyze context.
                     </span>
                 </div>
                 {/* --- END MODIFIED HEADER --- */}
                 {/* Tab Container: Horizontal scroll */}
                 <div className="overflow-x-auto custom-scrollbar-h -mx-1"> {/* Negative margin for visual bleed */}
                    <MitreTabs
                        techniques={event.mitreAttack}
                        activeTechniqueId={activeTechniqueId}
                        onTabSelect={setActiveTechniqueId}
                    />
                 </div>

                 <TechniqueDetailDisplay technique={activeTechniqueDetails ?? null} />

                 {/* <<< Renders the Expandable Disclaimer >>> */}
                 <Disclaimer />

            </section>
          )}

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
               <div className="space-y-3">
                 <p className="text-xs text-slate-400 mb-3">
                   Important fields SOC/IR teams should focus on for this event:
                 </p>
                 <div className="space-y-2.5">
                   {event.keyLogFields.map((field, index) => (
                     <div
                       key={index}
                       className="p-3 bg-slate-800/40 rounded border border-slate-700/50 hover:border-slate-600/70 transition-colors"
                     >
                       <div className="flex items-start gap-2">
                         <span className="inline-block mt-0.5 h-1.5 w-1.5 rounded-full bg-blue-400 shrink-0"></span>
                         <div className="flex-1 min-w-0">
                           <code className="text-sm font-semibold text-blue-300 break-words">
                             {field.field}
                           </code>
                           <p className="text-sm text-slate-300 mt-1 leading-relaxed">
                             {field.description}
                           </p>
                         </div>
                       </div>
                     </div>
                   ))}
                 </div>
               </div>
             </Section>
           ) : (
             <Section title="Key Log Fields" icon={FiList}>
               <div className="p-3 bg-yellow-900/10 border border-yellow-700/30 rounded">
                 <p className="text-sm text-yellow-200/80 italic">
                   Key log field information is not yet available for this event. Refer to official documentation for field details.
                 </p>
               </div>
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
