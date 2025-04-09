// src/app/page.tsx
import { EventDetail, MitreAttackInfo } from "@/types";
import windowsEventsData from "@/data/windows_events.json";
import sysmonEventsData from "@/data/sysmon_events.json";
import EventSearchClient from "@/components/EventSearchClient";
import allTechniquesData from "@/data/mitre_processed/techniques.json";


// Import category and scenario mappings
import { eventCategories } from "@/data/mappings/categories";
import { eventScenarios } from "@/data/mappings/scenarios";
// Import the MANUAL Event ID -> Technique ID mapping
import { eventMitreTechniqueIds } from "@/data/mappings/mitre";


// Prepare the techniques data for efficient lookup (Map: Technique ID -> Full Detail Object)
// Prepare the techniques data for efficient lookup (Map: Technique ID -> Full Detail Object)
const techniquesMap: Map<string, MitreAttackInfo> = new Map();

// Process the imported data safely
// Assume the raw data might have 'tactics' (array) instead of 'tactic' (string)
(allTechniquesData as any[]).forEach(rawTech => {
    // Create an object matching the MitreAttackInfo interface
    const techDetail: MitreAttackInfo = {
        id: rawTech.id || 'Unknown ID',
        name: rawTech.name || 'Unknown Name',
        // Create the 'tactic' string: join 'tactics' array if it exists, otherwise use raw 'tactic' field or default
        tactic: Array.isArray(rawTech.tactics) ? rawTech.tactics.join(', ') : (rawTech.tactic || 'Unknown Tactic'),
        url: rawTech.url || '#',
        description: rawTech.description // Optional field
        // Add other fields if needed from rawTech, ensure they match MitreAttackInfo
    };

    // Add the correctly structured object to the map
    if (techDetail.id !== 'Unknown ID') {
        techniquesMap.set(techDetail.id, techDetail);
    }
});

// Helper to find technique details by ATT&CK ID (Txxxx) - Now uses the correctly populated map
const findTechniqueDetails = (attackId: string): MitreAttackInfo | undefined => {
    return techniquesMap.get(attackId);
};

// Function to merge base event data with mapped metadata
const mergeEventData = (baseEvents: Omit<EventDetail, 'category' | 'mitreAttack' | 'commonScenarios'>[]): EventDetail[] => {
    return baseEvents.map(baseEvent => {
        const eventId = baseEvent.id;
        const category = eventCategories[eventId];
        const commonScenarios = eventScenarios[eventId];

        let mitreAttack: MitreAttackInfo[] | undefined = undefined;

        // --- MITRE Lookup Logic using Manual Map + Processed Details ---
        const techniqueIdsForEvent = eventMitreTechniqueIds[eventId] || []; // Get IDs from manual map

        if (techniqueIdsForEvent.length > 0) {
            mitreAttack = techniqueIdsForEvent
                .map(techId => techniquesMap.get(techId)) // Look up full details from techniques.json data
                .filter((tech): tech is MitreAttackInfo => !!tech) // Filter out any IDs not found in techniques.json
                .sort((a, b) => a.id.localeCompare(b.id)); // Sort for consistency
        }
        // --- End MITRE Logic ---

        const mergedEvent: EventDetail = {
            ...baseEvent,
            ...(category && { category }),
            ...(mitreAttack && mitreAttack.length > 0 && { mitreAttack }), // Add the array of full MitreAttackInfo objects
            ...(commonScenarios && { commonScenarios }),
        };
        return mergedEvent;
    });
};

// ... (rest of the file: Load base data, call mergeEventData, export Home component) ...
 // Load base data (Server-side)
const baseWindowsEvents: EventDetail[] = windowsEventsData as EventDetail[];
const baseSysmonEvents: EventDetail[] = sysmonEventsData as EventDetail[];

// Merge the data (Server-side)
const allEvents: EventDetail[] = [
    ...mergeEventData(baseWindowsEvents),
    ...mergeEventData(baseSysmonEvents),
];

export default function Home() {
  const numberOfEvents = allEvents.length;

  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-12">
      <div className="w-full max-w-7xl mx-auto">
        <EventSearchClient allEvents={allEvents} />
      </div>
    </main>
  );
}
