'use client';

import { useState, useEffect } from 'react';

const ROTATING_WORDS = [
  'Threat Detection',
  'SOC Operations',
  'Digital Forensics',
  'Malware Analysis',
  'Security Research'
];

export default function HeroTextAnimation() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);

      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
        setIsAnimating(false);
      }, 500); // Half second for fade out
    }, 3000); // Change word every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className={`inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 transition-opacity duration-500 ${
        isAnimating ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ minWidth: '280px', textAlign: 'center' }}
    >
      {ROTATING_WORDS[currentWordIndex]}
    </span>
  );
}
