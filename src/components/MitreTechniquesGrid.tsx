'use client';

import { useState } from 'react';
import { FiShield, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { MitreAttackInfo } from '@/types';

interface MitreTechniquesGridProps {
  techniques: MitreAttackInfo[];
  initialDisplayCount?: number;
}

export default function MitreTechniquesGrid({
  techniques,
  initialDisplayCount = 4
}: MitreTechniquesGridProps) {
  const [showAll, setShowAll] = useState(false);
  const hasMoreThanInitial = techniques.length > initialDisplayCount;
  const displayedTechniques = showAll ? techniques : techniques.slice(0, initialDisplayCount);

  return (
    <div className="p-6 bg-slate-800/30 rounded-lg border border-slate-700/60">
      <h2 className="text-xl font-semibold text-slate-100 mb-4 flex items-center gap-2">
        <FiShield className="h-5 w-5 text-red-400" />
        MITRE ATT&CK® Mapping ({techniques.length})
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayedTechniques.map((technique) => (
          <a
            key={technique.id}
            href={technique.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3 p-4 bg-slate-700/40 rounded-lg border border-slate-600/50 hover:border-blue-500/50 hover:bg-slate-700/60 transition-all"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="text-sm font-mono text-blue-400">
                  {technique.id}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-600/50 text-slate-300">
                  {technique.tactic}
                </span>
              </div>
              <div className="text-sm font-medium text-slate-200 mb-1">
                {technique.name}
              </div>
              {technique.description && (
                <p className="text-xs text-slate-400 line-clamp-2">
                  {technique.description}
                </p>
              )}
            </div>
          </a>
        ))}
      </div>

      {hasMoreThanInitial && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-blue-400 hover:text-blue-300 hover:bg-slate-700/50 rounded-lg transition-colors border border-slate-600/50"
        >
          {showAll ? (
            <>
              <FiChevronUp className="h-4 w-4" />
              Show Less
            </>
          ) : (
            <>
              <FiChevronDown className="h-4 w-4" />
              Show {techniques.length - initialDisplayCount} More
            </>
          )}
        </button>
      )}
    </div>
  );
}
