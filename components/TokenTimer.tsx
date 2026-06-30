'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';

export function TokenTimer() {
  const { token, createdAt } = useAuthStore();
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (!token) {
      timeoutId = setTimeout(() => setTimeLeft(null), 0);
      return () => clearTimeout(timeoutId);
    }

    const activeCreatedAt = createdAt || Date.now();

    const calculateTimeLeft = () => {
      const now = Date.now();
      const expiresAt = activeCreatedAt + 24 * 60 * 60 * 1000;
      return Math.max(0, Math.floor((expiresAt - now) / 1000));
    };

    timeoutId = setTimeout(() => setTimeLeft(calculateTimeLeft()), 0);

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(interval);
    };
  }, [token, createdAt]);

  if (!token || timeLeft === null) return null;

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  let colorClass = 'text-green-500';
  if (timeLeft <= 0) {
    colorClass = 'text-red-500';
  } else if (timeLeft <= 3600) {
    colorClass = 'text-yellow-500';
  }

  return (
    <div className="flex flex-col items-end justify-center pl-4 border-l border-border">
      <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Validade</span>
      <span className={`text-xs font-mono font-medium ${colorClass}`}>
        {timeLeft <= 0 ? 'Expirado' : formattedTime}
      </span>
    </div>
  );
}
