"use client";

import { useState, useEffect } from 'react';

const padZero = (num: number) => Math.floor(num).toString().padStart(2, '0');

const TimeValue = ({ value }: { value: string }) => (
    <span className="inline-block w-[2.5ch] text-center">{value}</span>
);

type TimerDisplayProps = {
  expiresAt: number;
  isActionDeadline?: boolean;
};

export default function TimerDisplay({ expiresAt, isActionDeadline = false }: TimerDisplayProps) {
  const [remainingTime, setRemainingTime] = useState(expiresAt - Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = expiresAt - Date.now();
      setRemainingTime(remaining > 0 ? remaining : 0);
    }, 50); // Update frequently for smooth display
    return () => clearInterval(interval);
  }, [expiresAt]);

  const formatTemporalTime = () => {
    const remainingAppHoursDecimal = remainingTime / 1000;
    const totalAppSeconds = remainingAppHoursDecimal * 3600;
    const h = padZero(totalAppSeconds / 3600);
    const m = padZero((totalAppSeconds % 3600) / 60);
    const s = padZero(totalAppSeconds % 60);
    return { h, m, s };
  };

  const formatRealTime = () => {
    const m = padZero(remainingTime / (1000 * 60));
    const s = padZero((remainingTime % (1000 * 60)) / 1000);
    return { m, s };
  };

  if (isActionDeadline) {
    const { m, s } = formatRealTime();
    return (
      <span className="font-mono font-medium">
        {m}:{s}
      </span>
    );
  }

  const { h, m, s } = formatTemporalTime();

  return (
    <div className="font-mono font-bold text-4xl md:text-5xl text-primary tracking-tighter flex justify-center items-center bg-accent/50 rounded-lg p-4">
      <TimeValue value={h} />
      <span>:</span>
      <TimeValue value={m} />
      <span>:</span>
      <TimeValue value={s} />
    </div>
  );
}
