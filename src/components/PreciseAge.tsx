'use client';

import { useState, useEffect } from 'react';

export default function PreciseAge() {
  const [preciseAge, setPreciseAge] = useState(16);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!isHovering) return;

    const birthDate = new Date('2008-04-07');
    
    const calculateAge = () => {
      const now = new Date();
      const diff = now.getTime() - birthDate.getTime();
      const age = diff / (1000 * 60 * 60 * 24 * 365.25);
      setPreciseAge(age);
    };

    const interval = setInterval(calculateAge, 50);
    calculateAge();

    return () => clearInterval(interval);
  }, [isHovering]);

  return (
    <span
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setPreciseAge(16);
      }}
      className="inline-block transition-all duration-200 hover:text-sky-400"
    >
      {isHovering ? preciseAge.toFixed(7) : '16'}
    </span>
  );
}
