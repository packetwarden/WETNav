'use client';

import { useState } from 'react';
import { FiAlertCircle, FiChevronDown, FiChevronUp } from 'react-icons/fi';

interface CollapsibleAlertProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export default function CollapsibleAlert({ title, children, defaultOpen = false }: CollapsibleAlertProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="mb-6 bg-amber-500/10 border border-amber-500/30 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-start gap-3 p-4 text-left hover:bg-amber-500/5 transition-colors"
      >
        <FiAlertCircle className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-amber-300">{title}</h3>
        </div>
        <span className="flex-shrink-0 text-amber-400">
          {isOpen ? <FiChevronUp className="h-5 w-5" /> : <FiChevronDown className="h-5 w-5" />}
        </span>
      </button>
      {isOpen && (
        <div className="px-4 pb-4">
          {children}
        </div>
      )}
    </div>
  );
}
