// src/components/MitreTabs.tsx
import { MitreAttackInfo } from "@/types"; // Adjust path as needed

interface MitreTabsProps {
  techniques: MitreAttackInfo[];
  activeTechniqueId: string | null;
  onTabSelect: (techniqueId: string) => void;
}

export default function MitreTabs({
  techniques,
  activeTechniqueId,
  onTabSelect,
}: MitreTabsProps) {

  if (!techniques || techniques.length === 0) {
    return null;
  }

  // Tab Container: Subtle bottom border to contain tabs visually
  return (
    <div className="flex min-w-max border-b border-slate-700/60" role="tablist" aria-label="MITRE Techniques">
      {techniques.map((technique) => {
        const isActive = technique.id === activeTechniqueId;

        // Refined classes for tabs
        const baseClasses = "flex-shrink-0 whitespace-nowrap pt-2 pb-[0.4rem] px-3.5 text-sm border-b-2 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500"; // Adjusted padding/border placement slightly
        const activeClasses = "border-blue-500 text-slate-100 font-medium bg-slate-700/30"; // Clearer active state
        const inactiveClasses = "border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-600"; // Subtle hover

        return (
          <button
            key={technique.id}
            id={`mitre-tab-${technique.id}`}
            onClick={() => onTabSelect(technique.id)}
            role="tab"
            aria-selected={isActive}
            aria-controls={`mitre-panel-${technique.id}`}
            // Add slight rounding to top corners? Optional.
            className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses} rounded-t-sm`}
          >
            {/* ID slightly less prominent */}
            <span className="font-mono text-[0.9em] opacity-80 mr-1.5">{technique.id}</span>
             {/* Name more prominent */}
            <span className='hidden sm:inline'>{technique.name}</span>
             {/* Name shown on smaller screens if space allows? Maybe just ID? */}
             {/* <span className='sm:hidden'>{technique.id}</span> */}
          </button>
        );
      })}
      {/* Spacer with matching border style */}
       <div className="flex-grow flex-shrink-0 h-1 border-b-2 border-transparent"></div>
    </div>
  );
}
