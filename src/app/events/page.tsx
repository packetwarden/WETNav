// Modern Events Page with Advanced Filtering
// Professional, user-friendly interface for browsing all events
// Author: Hari Patel, Cybersecurity Researcher

import { Metadata } from 'next';
import { getAllEvents } from "@/lib/eventData";
import EventsExplorer from "@/components/EventsExplorer";

export const metadata: Metadata = {
  title: "Browse All Windows & Sysmon Events - Complete Event Database",
  description: "Explore 470+ Windows Security and Sysmon events with advanced filtering, search, and sorting. Filter by source, category, MITRE ATT&CK mappings, and more. Professional reference for security analysts.",
  alternates: {
    canonical: "https://wetnav.patelhari.com/events"
  },
  openGraph: {
    title: "All Windows Security & Sysmon Events Database",
    description: "Browse and search 470+ documented Windows events with MITRE ATT&CK mappings and detection guidance",
    url: "https://wetnav.patelhari.com/events",
  }
};

export default function EventsPage() {
  const allEvents = getAllEvents();

  return (
    <main className="min-h-screen bg-gray-900">
      <EventsExplorer allEvents={allEvents} />
    </main>
  );
}
