// src/components/AboutModal.tsx
import React, { useEffect } from 'react';
import { FiX, FiInfo } from 'react-icons/fi';
import Link from 'next/link';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// --- Configuration ---
// >>> IMPORTANT: Replace this with the name you chose! <<<
const TOOL_NAME = "Windows Event Threat Navigator";
const GITHUB_REPO_URL = "https://github.com/packetwarden/WETNav"; // Your Repo URL
// --- End Configuration ---

export default function AboutModal({ isOpen, onClose }: AboutModalProps) {
  // Effect to handle Escape key press for closing modal
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    // Cleanup listener on component unmount or when modal closes
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // Prevent rendering if not open
  if (!isOpen) {
    return null;
  }

  // Stop click propagation inside the modal content from closing it via the overlay click
  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    // Overlay: Fixed position, covers screen, background dimming, z-index
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose} // Close modal when clicking overlay
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-modal-title"
    >
      {/* Modal Panel: Max width, background, rounded, shadow, positioning */}
      <div
        className="bg-slate-850 border border-slate-700 rounded-lg shadow-xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden"
        onClick={stopPropagation} // Prevent overlay click when clicking panel
      >
        {/* Modal Header */}
        <header className="flex items-center justify-between p-4 border-b border-slate-700 flex-shrink-0 bg-slate-900/80">
          <h2 id="about-modal-title" className="flex items-center gap-2 text-lg font-semibold text-slate-100">
            <FiInfo className="h-5 w-5 text-blue-400" />
            About {TOOL_NAME}
          </h2>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-100 hover:bg-slate-700/70 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:ring-blue-500"
            aria-label="Close About modal"
          >
            <FiX className="h-5 w-5" />
          </button>
        </header>

        {/* Modal Body: Scrollable content */}
        <div className="p-5 md:p-6 overflow-y-auto custom-scrollbar-v space-y-5 text-sm text-slate-300 leading-relaxed">
          <p className="italic text-slate-400">
            An experimental, vibe-coded quick reference tool for Windows Security & Sysmon events, built in collaboration with Gemini 2.5 Pro Preview.
          </p>

          <section>
            <h3 className="font-semibold text-slate-100 mb-1.5">Purpose</h3>
            <p>
              This tool aims to provide security analysts with a fast, searchable interface to look up Windows Security and Sysmon event IDs, understand their meaning, view potential MITRE ATT&CK® mappings, and access contextual notes – all to aid investigation and threat hunting.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-slate-100 mb-1.5">Data & Mappings</h3>
            <ul className="list-disc list-outside pl-5 space-y-1.5">
              <li>Event descriptions are derived from Microsoft documentation and community sources.</li>
              <li>Event Categories and Analyst Notes/Scenarios are manually curated.</li>
              <li>MITRE ATT&CK® technique details are sourced from pre-processed official STIX data.</li>
              <li>The mapping between **Event IDs and specific ATT&CK® Techniques** is maintained manually (`src/data/mappings/mitre.ts`) and represents potential relevance, requiring analyst judgment.</li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold text-slate-100 mb-1.5">Technology</h3>
            <p>
              Built with Next.js, TypeScript, Tailwind CSS, and React Icons. Deployed on Vercel.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-red-400 mb-1.5">Important Disclaimers</h3>
            <ul className="list-disc list-outside pl-5 space-y-1.5 text-red-300/90">
              <li>This is an **experimental side project**, not a production-ready security product. Use as a reference aid only.</li>
              <li>Data and mappings may contain errors or become outdated. **Always verify** information and use context.</li>
              <li>MITRE ATT&CK® mappings suggest *potential* relevance, not definitive proof of malicious activity.</li>
              <li>This tool comes with **NO WARRANTY**. Use at your own discretion.</li>
            </ul>
          </section>

           <div className="text-center pt-4 border-t border-slate-700/50">
                <Link
                  href={GITHUB_REPO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-400 hover:text-blue-300 hover:underline focus:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 rounded"
                >
                  View Project on GitHub
                </Link>
           </div>

        </div>
      </div>
    </div>
  );
}
