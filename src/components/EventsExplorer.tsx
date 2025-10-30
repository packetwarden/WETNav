// Modern Events Explorer Component
// Advanced filtering, search, and display for all events
// Author: Hari Patel, Cybersecurity Researcher

'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { EventDetail } from '@/types';
import {
  FiSearch, FiFilter, FiGrid, FiList, FiX, FiChevronDown,
  FiChevronRight, FiCheckCircle, FiAlertCircle
} from 'react-icons/fi';
import { hasEnhancedContent } from '@/lib/enhancedContent';

interface EventsExplorerProps {
  allEvents: EventDetail[];
}

type ViewMode = 'grid' | 'list' | 'compact';
type SortOption = 'id' | 'name' | 'category' | 'relevance';

export default function EventsExplorer({ allEvents }: EventsExplorerProps) {
  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showMitreOnly, setShowMitreOnly] = useState(false);
  const [showEnhancedOnly, setShowEnhancedOnly] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('id');
  const [showFilters, setShowFilters] = useState(true);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    allEvents.forEach(e => {
      if (e.category) cats.add(e.category);
    });
    return Array.from(cats).sort();
  }, [allEvents]);

  // Filter and sort events
  const filteredEvents = useMemo(() => {
    let filtered = allEvents;

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(event =>
        event.id.toLowerCase().includes(query) ||
        event.name.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query) ||
        event.category?.toLowerCase().includes(query) ||
        event.mitreAttack?.some(m =>
          m.id.toLowerCase().includes(query) ||
          m.name.toLowerCase().includes(query)
        )
      );
    }

    // Source filter
    if (selectedSources.length > 0) {
      filtered = filtered.filter(event => selectedSources.includes(event.source));
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(event =>
        event.category && selectedCategories.includes(event.category)
      );
    }

    // MITRE filter
    if (showMitreOnly) {
      filtered = filtered.filter(event =>
        event.mitreAttack && event.mitreAttack.length > 0
      );
    }

    // Enhanced content filter
    if (showEnhancedOnly) {
      filtered = filtered.filter(event => hasEnhancedContent(event.id));
    }

    // Sort
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'id':
          return parseInt(a.id) - parseInt(b.id);
        case 'name':
          return a.name.localeCompare(b.name);
        case 'category':
          return (a.category || 'zzz').localeCompare(b.category || 'zzz');
        case 'relevance':
        default:
          return 0;
      }
    });

    return filtered;
  }, [allEvents, searchQuery, selectedSources, selectedCategories, showMitreOnly, showEnhancedOnly, sortBy]);

  // Stats
  const stats = useMemo(() => ({
    total: allEvents.length,
    windows: allEvents.filter(e => e.source === 'Windows Security').length,
    sysmon: allEvents.filter(e => e.source === 'Sysmon').length,
    withMitre: allEvents.filter(e => e.mitreAttack && e.mitreAttack.length > 0).length,
    enhanced: allEvents.filter(e => hasEnhancedContent(e.id)).length,
    filtered: filteredEvents.length,
  }), [allEvents, filteredEvents.length]);

  // Toggle functions
  const toggleSource = (source: string) => {
    setSelectedSources(prev =>
      prev.includes(source) ? prev.filter(s => s !== source) : [...prev, source]
    );
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSelectedSources([]);
    setSelectedCategories([]);
    setShowMitreOnly(false);
    setShowEnhancedOnly(false);
    setSearchQuery('');
  };

  const hasActiveFilters = selectedSources.length > 0 || selectedCategories.length > 0 ||
    showMitreOnly || showEnhancedOnly || searchQuery.trim();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <div className="bg-gradient-to-b from-slate-900 to-gray-900 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Title */}
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-100 mb-2">
              Event Database
            </h1>
            <p className="text-slate-400 text-lg">
              Browse and search {stats.total} Windows Security and Sysmon events
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by event ID, name, description, category, or MITRE technique..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
              >
                <FiX className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
              <div className="text-sm text-slate-400 mb-1">Total Events</div>
              <div className="text-2xl font-bold text-slate-100">{stats.total}</div>
            </div>
            <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
              <div className="text-sm text-slate-400 mb-1">Windows</div>
              <div className="text-2xl font-bold text-green-400">{stats.windows}</div>
            </div>
            <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
              <div className="text-sm text-slate-400 mb-1">Sysmon</div>
              <div className="text-2xl font-bold text-orange-400">{stats.sysmon}</div>
            </div>
            <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
              <div className="text-sm text-slate-400 mb-1">MITRE Mapped</div>
              <div className="text-2xl font-bold text-red-400">{stats.withMitre}</div>
            </div>
            <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
              <div className="text-sm text-slate-400 mb-1">Enhanced</div>
              <div className="text-2xl font-bold text-blue-400">{stats.enhanced}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          {/* Filter Sidebar */}
          <aside className={`${showFilters ? 'block' : 'hidden'} lg:block flex-shrink-0 w-64`}>
            <div className="sticky top-4 space-y-6">
              {/* Filter Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
                  <FiFilter className="h-5 w-5" />
                  Filters
                </h2>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Source Filter */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-slate-300 mb-3">Source</h3>
                {['Windows Security', 'Sysmon'].map(source => (
                  <label key={source} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedSources.includes(source)}
                      onChange={() => toggleSource(source)}
                      className="w-4 h-4 rounded border-slate-600 text-blue-500 focus:ring-blue-500 focus:ring-offset-slate-900"
                    />
                    <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                      {source}
                    </span>
                    <span className="text-xs text-slate-500 ml-auto">
                      ({source === 'Windows Security' ? stats.windows : stats.sysmon})
                    </span>
                  </label>
                ))}
              </div>

              {/* Special Filters */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-slate-300 mb-3">Special Filters</h3>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={showMitreOnly}
                    onChange={() => setShowMitreOnly(!showMitreOnly)}
                    className="w-4 h-4 rounded border-slate-600 text-blue-500 focus:ring-blue-500 focus:ring-offset-slate-900"
                  />
                  <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                    MITRE ATT&CK Mapped
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={showEnhancedOnly}
                    onChange={() => setShowEnhancedOnly(!showEnhancedOnly)}
                    className="w-4 h-4 rounded border-slate-600 text-blue-500 focus:ring-blue-500 focus:ring-offset-slate-900"
                  />
                  <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                    Enhanced Analysis
                  </span>
                </label>
              </div>

              {/* Category Filter */}
              {categories.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-slate-300 mb-3">Category</h3>
                  <div className="max-h-64 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                    {categories.map(category => (
                      <label key={category} className="flex items-start gap-2 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category)}
                          onChange={() => toggleCategory(category)}
                          className="w-4 h-4 mt-0.5 rounded border-slate-600 text-blue-500 focus:ring-blue-500 focus:ring-offset-slate-900 flex-shrink-0"
                        />
                        <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors leading-tight">
                          {category}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* Events Grid/List */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 transition-colors"
                >
                  <FiFilter className="h-4 w-4" />
                  Filters
                </button>
                <div className="text-sm text-slate-400">
                  {stats.filtered} {stats.filtered === 1 ? 'event' : 'events'}
                  {hasActiveFilters && ` (filtered from ${stats.total})`}
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="id">Sort by ID</option>
                  <option value="name">Sort by Name</option>
                  <option value="category">Sort by Category</option>
                </select>

                {/* View Mode */}
                <div className="flex items-center gap-1 bg-slate-800 border border-slate-700 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded transition-colors ${
                      viewMode === 'grid' ? 'bg-slate-700 text-blue-400' : 'text-slate-400 hover:text-slate-300'
                    }`}
                    title="Grid view"
                  >
                    <FiGrid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded transition-colors ${
                      viewMode === 'list' ? 'bg-slate-700 text-blue-400' : 'text-slate-400 hover:text-slate-300'
                    }`}
                    title="List view"
                  >
                    <FiList className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('compact')}
                    className={`p-2 rounded transition-colors ${
                      viewMode === 'compact' ? 'bg-slate-700 text-blue-400' : 'text-slate-400 hover:text-slate-300'
                    }`}
                    title="Compact view"
                  >
                    <FiList className="h-4 w-4 rotate-90" />
                  </button>
                </div>
              </div>
            </div>

            {/* Events Display */}
            {filteredEvents.length === 0 ? (
              <div className="text-center py-16">
                <FiAlertCircle className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-300 mb-2">No events found</h3>
                <p className="text-slate-500 mb-4">Try adjusting your filters or search query</p>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid md:grid-cols-2 gap-4">
                {filteredEvents.map(event => (
                  <EventCardGrid key={event.id} event={event} />
                ))}
              </div>
            ) : viewMode === 'list' ? (
              <div className="space-y-3">
                {filteredEvents.map(event => (
                  <EventCardList key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="space-y-1">
                {filteredEvents.map(event => (
                  <EventCardCompact key={event.id} event={event} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Event Card Components
function EventCardGrid({ event }: { event: EventDetail }) {
  const enhanced = hasEnhancedContent(event.id);

  return (
    <Link
      href={`/event/${event.id}`}
      className="block p-5 bg-slate-800/50 hover:bg-slate-800 rounded-lg border border-slate-700 hover:border-blue-500/50 transition-all group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/40">
            {event.source}
          </span>
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-slate-700 text-slate-200 border border-slate-600">
            Event {event.id}
          </span>
          {enhanced && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-green-500/20 text-green-300 border border-green-500/40">
              <FiCheckCircle className="h-3 w-3" />
              Enhanced
            </span>
          )}
        </div>
        <FiChevronRight className="h-5 w-5 text-slate-600 group-hover:text-blue-400 transition-colors flex-shrink-0" />
      </div>

      <h3 className="text-lg font-semibold text-slate-100 group-hover:text-blue-300 transition-colors mb-2">
        {event.name}
      </h3>

      <p className="text-sm text-slate-400 line-clamp-2 mb-3">
        {event.description}
      </p>

      <div className="flex items-center gap-3 text-xs text-slate-500">
        {event.category && (
          <span className="inline-flex items-center gap-1">
            <FiFilter className="h-3 w-3" />
            {event.category}
          </span>
        )}
        {event.mitreAttack && event.mitreAttack.length > 0 && (
          <span className="inline-flex items-center gap-1 text-red-400">
            <FiAlertCircle className="h-3 w-3" />
            {event.mitreAttack.length} MITRE
          </span>
        )}
      </div>
    </Link>
  );
}

function EventCardList({ event }: { event: EventDetail }) {
  const enhanced = hasEnhancedContent(event.id);

  return (
    <Link
      href={`/event/${event.id}`}
      className="block p-4 bg-slate-800/50 hover:bg-slate-800 rounded-lg border border-slate-700 hover:border-blue-500/50 transition-all group"
    >
      <div className="flex items-start gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/40">
              {event.source}
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-bold bg-slate-700 text-slate-200 border border-slate-600">
              {event.id}
            </span>
            {event.category && (
              <span className="text-xs text-slate-500">{event.category}</span>
            )}
            {enhanced && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs bg-green-500/20 text-green-300">
                <FiCheckCircle className="h-3 w-3" />
              </span>
            )}
            {event.mitreAttack && event.mitreAttack.length > 0 && (
              <span className="text-xs text-red-400">{event.mitreAttack.length} MITRE</span>
            )}
          </div>

          <h3 className="text-base font-semibold text-slate-100 group-hover:text-blue-300 transition-colors mb-1">
            {event.name}
          </h3>

          <p className="text-sm text-slate-400 line-clamp-1">
            {event.description}
          </p>
        </div>

        <FiChevronRight className="h-5 w-5 text-slate-600 group-hover:text-blue-400 transition-colors flex-shrink-0 mt-1" />
      </div>
    </Link>
  );
}

function EventCardCompact({ event }: { event: EventDetail }) {
  const enhanced = hasEnhancedContent(event.id);

  return (
    <Link
      href={`/event/${event.id}`}
      className="block px-4 py-3 bg-slate-800/30 hover:bg-slate-800/50 border-l-2 border-transparent hover:border-blue-500 transition-all group"
    >
      <div className="flex items-center gap-4">
        <span className="font-mono text-sm font-bold text-slate-400 group-hover:text-blue-400 w-12 flex-shrink-0">
          {event.id}
        </span>
        <span className="text-xs text-slate-500 w-32 flex-shrink-0 truncate">
          {event.source}
        </span>
        <span className="flex-1 text-sm text-slate-300 group-hover:text-slate-100 truncate">
          {event.name}
        </span>
        <div className="flex items-center gap-2 flex-shrink-0">
          {enhanced && (
            <span className="w-2 h-2 rounded-full bg-green-400"></span>
          )}
          {event.mitreAttack && event.mitreAttack.length > 0 && (
            <span className="text-xs text-red-400">{event.mitreAttack.length}</span>
          )}
          <FiChevronRight className="h-4 w-4 text-slate-600 group-hover:text-slate-400" />
        </div>
      </div>
    </Link>
  );
}
