// Aggregator for all enhanced event content
// Author: Hari Patel, Cybersecurity Researcher

import { enhancedEventContent } from '@/data/enhancedContent/top-events';
import { criticalEventsContent2 } from '@/data/enhancedContent/critical-events-2';
import { sysmonEventsContent } from '@/data/enhancedContent/sysmon-events';

// Merge all enhanced content
export const allEnhancedContent = {
  ...enhancedEventContent,
  ...criticalEventsContent2,
  ...sysmonEventsContent,
};

// Helper function to get enhanced content for an event
export function getEnhancedContent(eventId: string) {
  return allEnhancedContent[eventId] || null;
}

// Check if event has enhanced content
export function hasEnhancedContent(eventId: string): boolean {
  return eventId in allEnhancedContent;
}

// Get list of all events with enhanced content
export function getEnhancedEventIds(): string[] {
  return Object.keys(allEnhancedContent);
}
