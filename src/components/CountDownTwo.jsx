"use client"
import { useState, useEffect } from 'react';

export default function CountdownTwo() {
  const targetDate = new Date('2026-12-31T23:59:59').getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(timer);
        return;
      }
      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);
      setTimeLeft({
        days: d < 10 ? `0${d}` : d.toString(),
        hours: h < 10 ? `0${h}` : h.toString(),
        minutes: m < 10 ? `0${m}` : m.toString(),
        seconds: s < 10 ? `0${s}` : s.toString(),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);
  const timerItems = [
    { value: timeLeft.hours, label: 'Hours' },
    { value: timeLeft.days, label: 'Days' },
    { value: timeLeft.minutes, label: 'Minutes' },
    { value: timeLeft.seconds, label: 'Seconds' },
  ];

  return (
    <div className="flex items-center min-h-[20px] bg-black">
      <div className="flex gap-4 md:gap-6">
        {timerItems.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center w-6 h-6 md:w-10 md:h-10 bg-white rounded-full text-black font-sans shadow-lg p-7"
          >
            <span className="text-[14px] md:text-[14px] font-sm leading-4.2">
              {item.value}
            </span>
            <span className="text-[10px] md:text-xs text-gray-800 font-sm">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
