"use client";

import { useState, useEffect } from 'react';

const NAVANEETH_HOUR_IN_MS = 48 * 60 * 60 * 1000; // 1 Navaneeth Hour = 48 real hours

const pad = (num: number, length = 2) => Math.floor(num).toString().padStart(length, '0');

const TimeValue = ({ value }: { value: string }) => (
    <span className="inline-block w-[2.2ch] text-center">{value}</span>
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

  const formatNavaneethTime = () => {
    const remainingAppHoursDecimal = remainingTime / NAVANEETH_HOUR_IN_MS;
    const totalAppSecondsDecimal = remainingAppHoursDecimal * 3600;
    
    const h = pad(totalAppSecondsDecimal / 3600);
    const m = pad((totalAppSecondsDecimal % 3600) / 60);
    const s = pad(totalAppSecondsDecimal % 60);
    const ms = pad((totalAppSecondsDecimal * 1000) % 1000, 3);
    return { h, m, s, ms };
  };

  const formatRealTime = () => {
    const m = pad(remainingTime / (1000 * 60));
    const s = pad((remainingTime % (1000 * 60)) / 1000);
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

  const { h, m, s, ms } = formatNavaneethTime();

  return (
    <div className="font-mono font-bold text-4xl md:text-5xl text-primary tracking-tighter flex justify-center items-baseline bg-accent/50 rounded-lg p-4">
      <TimeValue value={h} />
      <span>:</span>
      <TimeValue value={m} />
      <span>:</span>
      <TimeValue value={s} />
      <span className="text-2xl md:text-3xl text-muted-foreground">.</span>
      <span className="text-2xl md:text-3xl text-muted-foreground w-[3.3ch] text-left">{ms}</span>
    </div>
  );
}
