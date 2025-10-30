// src/app/page.tsx
import EventSearchClient from "@/components/EventSearchClient";
import { getAllEvents } from "@/lib/eventData";

export default function Home() {
  const allEvents = getAllEvents();

  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-12">
      <div className="w-full max-w-7xl mx-auto">
        <EventSearchClient allEvents={allEvents} />
      </div>
    </main>
  );
}
