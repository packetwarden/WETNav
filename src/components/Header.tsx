// src/components/Header.tsx
'use client';

import { useState } from 'react'; // Import useState
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';
import { FiTerminal, FiInfo, FiShield } from 'react-icons/fi'; // Import icons
import AboutModal from './AboutModal'; // Import the modal

// --- Configuration ---
const TOOL_NAME = "Windows Event Threat Navigator";
const GITHUB_REPO_URL = "https://github.com/packetwarden/WETNav";
// --- End Configuration ---

export default function Header() {
  // --- Add State for About Modal ---
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  // ---

  return (
    <> {/* Use Fragment to render modal alongside header */}
      <header className="bg-slate-900 border-b border-slate-700/80 shadow-sm sticky top-0 z-40"> {/* Lower z-index slightly */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            {/* Left Side: Logo & Tool Name */}
            <div className="flex-shrink-0 flex items-center gap-2 sm:gap-3">
               <span className="text-blue-400">
                  <FiTerminal className="h-6 w-6 sm:h-7 sm:w-7" />
               </span>
               <span className="text-lg sm:text-xl font-semibold text-slate-100 tracking-tight">
                  {TOOL_NAME}
               </span>
            </div>

            {/* Right Side: Links/Actions */}
            <div className="flex items-center gap-2"> {/* Added gap */}
              {/* Top Events Link */}
              <Link
                href="/top-events"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-slate-100 hover:bg-slate-700/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:ring-blue-500 rounded-md transition-colors"
                aria-label="View top exploited events"
                title="Top Exploited Events"
              >
                <FiShield className="h-4 w-4" />
                <span>Top Events</span>
              </Link>

              {/* Mobile Top Events Icon */}
              <Link
                href="/top-events"
                className="sm:hidden p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-700/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:ring-blue-500 rounded-md transition-colors"
                aria-label="View top exploited events"
                title="Top Exploited Events"
              >
                <FiShield className="h-5 w-5" />
              </Link>

              {/* Info Button */}
              <button
                  onClick={() => setIsAboutModalOpen(true)}
                  className="p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-700/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:ring-blue-500 rounded-md transition-colors"
                  aria-label="About this tool"
                  title="About this tool"
              >
                  <FiInfo className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>

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

      {/* Render Modal Conditionally - It will overlay everything due to fixed positioning */}
       <AboutModal isOpen={isAboutModalOpen} onClose={() => setIsAboutModalOpen(false)} />
    </>
  );
}
