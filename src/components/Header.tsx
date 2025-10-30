// src/components/Header.tsx
'use client';

import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';
import { FiTerminal, FiShield, FiDatabase } from 'react-icons/fi';

// --- Configuration ---
const TOOL_NAME = "Windows Event Threat Navigator";
const GITHUB_REPO_URL = "https://github.com/packetwarden/WETNav";
// --- End Configuration ---

export default function Header() {
  return (
    <header className="bg-slate-900 border-b border-slate-700/80 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            {/* Left Side: Logo & Tool Name */}
            <Link href="/" className="flex-shrink-0 flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity">
               <span className="text-blue-400">
                  <FiTerminal className="h-6 w-6 sm:h-7 sm:w-7" />
               </span>
               <span className="text-lg sm:text-xl font-semibold text-slate-100 tracking-tight hidden sm:block">
                  {TOOL_NAME}
               </span>
            </Link>

            {/* Right Side: Links/Actions */}
            <div className="flex items-center gap-1"> {/* Added gap */}
              {/* Events Link */}
              <Link
                href="/events"
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-slate-100 hover:bg-slate-700/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:ring-blue-500 rounded-md transition-colors"
                aria-label="Browse all events"
                title="All Events"
              >
                <FiDatabase className="h-4 w-4" />
                <span>Events</span>
              </Link>

              {/* Top Events Link */}
              <Link
                href="/top-events"
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-slate-100 hover:bg-slate-700/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:ring-blue-500 rounded-md transition-colors"
                aria-label="View top exploited events"
                title="Top Exploited Events"
              >
                <FiShield className="h-4 w-4" />
                <span>Top Events</span>
              </Link>

              {/* Mobile Events Icon */}
              <Link
                href="/events"
                className="md:hidden p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-700/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:ring-blue-500 rounded-md transition-colors"
                aria-label="Browse all events"
                title="All Events"
              >
                <FiDatabase className="h-5 w-5" />
              </Link>

              {/* GitHub Button */}
              <Link
                href={GITHUB_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-700/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:ring-blue-500 rounded-md transition-colors"
                aria-label="View source on GitHub"
                title="View source on GitHub"
              >
                <FaGithub className="h-5 w-5 sm:h-6 sm:w-6" />
              </Link>
            </div>
          </div>
        </div>
      </header>
  );
}
