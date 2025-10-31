'use client';

import { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import Link from 'next/link';

interface FAQItemProps {
  question: string;
  answer: string | React.ReactNode;
}

export default function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-slate-700/50 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-4 p-4 text-left bg-slate-800/30 hover:bg-slate-800/50 transition-colors"
      >
        <h3 className="text-lg font-semibold text-slate-100">{question}</h3>
        <span className="flex-shrink-0 text-slate-400">
          {isOpen ? <FiChevronUp className="h-5 w-5" /> : <FiChevronDown className="h-5 w-5" />}
        </span>
      </button>
      {isOpen && (
        <div className="p-4 pt-0 mt-3 text-slate-300 leading-relaxed">
          {typeof answer === 'string' ? <p>{answer}</p> : answer}
        </div>
      )}
    </div>
  );
}
