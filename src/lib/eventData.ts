// src/lib/eventData.ts
// Shared utility for loading and merging event data across the application

import { EventDetail, MitreAttackInfo } from "@/types";
import windowsEventsData from "@/data/windows_events.json";
import sysmonEventsData from "@/data/sysmon_events.json";
import allTechniquesData from "@/data/mitre_processed/techniques.json";
import { eventCategories } from "@/data/mappings/categories";
import { eventScenarios } from "@/data/mappings/scenarios";
import { eventMitreTechniqueIds } from "@/data/mappings/mitre";
import { eventKeyFields } from "@/data/mappings/keyFields";

// Prepare the techniques data for efficient lookup
const techniquesMap: Map<string, MitreAttackInfo> = new Map();

// Process the imported data safely
(allTechniquesData as any[]).forEach(rawTech => {
    const techDetail: MitreAttackInfo = {
        id: rawTech.id || 'Unknown ID',
        name: rawTech.name || 'Unknown Name',
        tactic: Array.isArray(rawTech.tactics) ? rawTech.tactics.join(', ') : (rawTech.tactic || 'Unknown Tactic'),
        url: rawTech.url || '#',
        description: rawTech.description
    };

    if (techDetail.id !== 'Unknown ID') {
        techniquesMap.set(techDetail.id, techDetail);
    }
});

// Helper to find technique details by ATT&CK ID
const findTechniqueDetails = (attackId: string): MitreAttackInfo | undefined => {
    return techniquesMap.get(attackId);
};

// Function to merge base event data with mapped metadata
const mergeEventData = (baseEvents: Omit<EventDetail, 'category' | 'mitreAttack' | 'commonScenarios' | 'keyLogFields'>[]): EventDetail[] => {
    return baseEvents.map(baseEvent => {
        const eventId = baseEvent.id;
        const category = eventCategories[eventId];
        const commonScenarios = eventScenarios[eventId];
        const keyLogFields = eventKeyFields[eventId];

        let mitreAttack: MitreAttackInfo[] | undefined = undefined;

        const techniqueIdsForEvent = eventMitreTechniqueIds[eventId] || [];

        if (techniqueIdsForEvent.length > 0) {
            mitreAttack = techniqueIdsForEvent
                .map(techId => techniquesMap.get(techId))
                .filter((tech): tech is MitreAttackInfo => !!tech)
                .sort((a, b) => a.id.localeCompare(b.id));
        }

        const mergedEvent: EventDetail = {
            ...baseEvent,
            ...(category && { category }),
            ...(mitreAttack && mitreAttack.length > 0 && { mitreAttack }),
            ...(commonScenarios && { commonScenarios }),
            ...(keyLogFields && { keyLogFields }),
        };
        return mergedEvent;
    });
};

// Load and merge all events (Server-side)
export function getAllEvents(): EventDetail[] {
    const baseWindowsEvents: EventDetail[] = windowsEventsData as EventDetail[];
    const baseSysmonEvents: EventDetail[] = sysmonEventsData as EventDetail[];

    return [
        ...mergeEventData(baseWindowsEvents),
        ...mergeEventData(baseSysmonEvents),
    ];
}

// Get a single event by ID
export function getEventById(eventId: string): EventDetail | undefined {
    const allEvents = getAllEvents();
    return allEvents.find(event => event.id === eventId);
}

// Get all event IDs (useful for static generation)
export function getAllEventIds(): string[] {
    const allEvents = getAllEvents();
    return allEvents.map(event => event.id);
}

// Get top exploited events (used for SEO and Top Events page)
export function getTopExploitedEvents(): EventDetail[] {
    const allEvents = getAllEvents();

    // Most exploited/critical event IDs based on security research
    const topEventIds = [
        '4624', // Logon (credential attacks)
        '4625', // Failed Logon (brute force detection)
        '4688', // Process Creation (malware execution)
        '4672', // Special Privileges Assigned (privilege escalation)
        '4698', // Scheduled Task Created (persistence)
        '4720', // User Account Created (account manipulation)
        '4732', // Member Added to Security Group (privilege escalation)
        '4719', // System Audit Policy Changed (defense evasion)
        '4663', // Object Access Attempt (data exfiltration)
        '4697', // Service Installed (persistence)
        '1',    // Sysmon: Process Creation (malware execution)
        '3',    // Sysmon: Network Connection (C2 communication)
        '7',    // Sysmon: Image Loaded (DLL injection)
        '10',   // Sysmon: Process Access (credential dumping)
        '11',   // Sysmon: File Created (malware dropped files)
        '22',   // Sysmon: DNS Query (C2 beaconing)
    ];

    return topEventIds
        .map(id => allEvents.find(event => event.id === id))
        .filter((event): event is EventDetail => !!event);
}
