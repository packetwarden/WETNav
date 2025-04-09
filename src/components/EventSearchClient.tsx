// src/components/EventSearchClient.tsx
'use client';

// Add useState to imports
import { useState, useEffect, useMemo } from 'react';
import { EventDetail } from '@/types';
import EventCard from './EventCard';
import EventDetailView from './EventDetailView';
import AboutModal from './AboutModal'; // <<< Import the modal component
// Import icons
import { FiSearch, FiInfo } from 'react-icons/fi'; // <<< Add FiInfo
import { FaWindows } from 'react-icons/fa';
import { SiProxmox } from 'react-icons/si';
import { MdOutlineCategory } from 'react-icons/md';


type SourceFilter = 'All' | 'Windows Security' | 'Sysmon';

interface EventSearchClientProps {
  allEvents: EventDetail[];
}

export default function EventSearchClient({ allEvents }: EventSearchClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>('All');
  const [filteredEvents, setFilteredEvents] = useState<EventDetail[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<EventDetail | null>(null);

  // Memoize the lowercased search query for efficiency
  const lowerCaseQuery = useMemo(() => searchQuery.toLowerCase().trim(), [searchQuery]);

  // Handler function to set the selected event
  const handleEventSelect = (event: EventDetail) => {
    setSelectedEvent(event);
  };

  // Handler function to close the detail view
  const handleCloseDetail = () => {
    setSelectedEvent(null);
  };

  // Effect to filter events whenever the search query or filter changes
  useEffect(() => {
    // Start with all events if no filter, or pre-filter by source if one is selected
    let results = allEvents;
    if (sourceFilter !== 'All') {
      results = results.filter(event => event.source === sourceFilter);
    }

    // If there's a search query, filter the results further
    if (lowerCaseQuery !== '') {
      results = results.filter(event => {
        // Check standard fields
        const idMatch = event.id.toLowerCase().includes(lowerCaseQuery);
        const nameMatch = event.name.toLowerCase().includes(lowerCaseQuery);
        // Description check (might be same as name, but good practice)
        const descriptionMatch = event.description.toLowerCase().includes(lowerCaseQuery);
        // Source check (already filtered, but include for direct source search like "sysmon")
        const sourceMatch = event.source.toLowerCase().includes(lowerCaseQuery);

        // Check Category (optional field)
        const categoryMatch = !!event.category && event.category.toLowerCase().includes(lowerCaseQuery);

        // Check MITRE Techniques (optional array)
        const mitreMatch = !!event.mitreAttack && event.mitreAttack.some(tech =>
            tech.id.toLowerCase().includes(lowerCaseQuery) ||
            tech.name.toLowerCase().includes(lowerCaseQuery)
        );

        // Check Common Scenarios (optional array)
        const scenarioMatch = !!event.commonScenarios && event.commonScenarios.some(scenario =>
            scenario.toLowerCase().includes(lowerCaseQuery)
        );

        // Return true if the query matches ANY of these fields
        return idMatch || nameMatch || descriptionMatch || sourceMatch || categoryMatch || mitreMatch || scenarioMatch;
      });
    } else {
        // If search query is empty, the results are just the source-filtered list
        // However, if BOTH query is empty AND filter is 'All', show nothing initially
        if (sourceFilter === 'All') {
            results = [];
        }
    }

    setFilteredEvents(results);

    // Optional: Deselect event if it's no longer in the filtered list
    if (selectedEvent && !results.some(e => e.id === selectedEvent.id && e.source === selectedEvent.source)) {
        // setSelectedEvent(null); // Uncomment if desired
    }

  }, [lowerCaseQuery, sourceFilter, allEvents, selectedEvent]); // Dependencies

  // Helper function to get button styles (remains the same)
  const getButtonClasses = (filterType: SourceFilter): string => {
    const baseClasses = "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500";
    const activeClasses = "bg-blue-600 text-white hover:bg-blue-700";
    const inactiveClasses = "bg-gray-700 text-gray-300 hover:bg-gray-600";
    return `${baseClasses} ${sourceFilter === filterType ? activeClasses : inactiveClasses}`;
  };

  return (
    <div className="w-full">
      {/* Control Bar (remains the same) */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 p-4 bg-gray-800 rounded-lg shadow-md border border-gray-700">
        {/* Search Input Area */}
        <div className="relative flex-grow">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <FiSearch className="h-5 w-5 text-gray-400" />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search ID, Name, Category, MITRE, Keyword..." // Updated placeholder
            className="w-full pl-10 pr-4 py-2 border border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            aria-label="Search Events"
          />
        </div>
        {/* Filter Buttons Area (remains the same) */}
        <div className="flex items-center gap-3 flex-wrap justify-center md:justify-start">
          <button onClick={() => setSourceFilter('All')} className={getButtonClasses('All')} aria-pressed={sourceFilter === 'All'}> <MdOutlineCategory className="h-4 w-4" /> All Sources </button>
          <button onClick={() => setSourceFilter('Windows Security')} className={getButtonClasses('Windows Security')} aria-pressed={sourceFilter === 'Windows Security'}> <FaWindows className="h-4 w-4" /> Windows </button>
          <button onClick={() => setSourceFilter('Sysmon')} className={getButtonClasses('Sysmon')} aria-pressed={sourceFilter === 'Sysmon'}> <SiProxmox className="h-4 w-4" /> Sysmon </button>
        </div>
      </div>

      {/* Main Content Area: List + Detail View (Layout remains the same) */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Column: Search Results List */}
        <div className="w-full md:w-1/2 lg:w-2/5 xl:w-1/3 flex-shrink-0">
          <h2 className="text-xl font-semibold mb-4 text-gray-200">
            {/* Show title based on filtering/search */}
             {(searchQuery || sourceFilter !== 'All') ? `Results (${filteredEvents.length}):` : 'Events:'}
          </h2>

          {/* Placeholder/Empty State Messages */}
          { (searchQuery || sourceFilter !== 'All') && filteredEvents.length === 0 && (
            <p className="text-center text-gray-400 py-10">No events found matching your criteria.</p>
          )}
          {/* Show initial prompt only if nothing is searched/filtered AND list is empty based on logic */}
          { searchQuery === '' && sourceFilter === 'All' && filteredEvents.length === 0 && (
               <p className="text-center text-gray-400 py-10">Enter a search term or select a filter above to find events.</p>
          )}

          {/* List Container */}
          {filteredEvents.length > 0 && (
            <div className="border border-gray-700 rounded-lg overflow-hidden shadow-md bg-gray-800/50 max-h-[70vh] overflow-y-auto">
              {/* Render EventCard components */}
                {filteredEvents.map((event) => (
                <EventCard
                    key={`${event.source}-${event.id}`}
                    event={event}
                    onClick={handleEventSelect}
                    // Check if the current event matches the selected one
                    isSelected={selectedEvent?.id === event.id && selectedEvent?.source === event.source}
                />
            ))}
            </div>
          )}
        </div>

        {/* Right Column: Detail View (remains the same) */}
        <div className="flex-grow">
          {selectedEvent ? (
            <EventDetailView
              event={selectedEvent}
              onClose={handleCloseDetail} // Pass the close handler
            />
          ) : (
            <div className="flex items-center justify-center h-full min-h-[300px] bg-gray-800 border border-gray-700 rounded-lg shadow-lg text-gray-500">
              Select an event from the list to view details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
