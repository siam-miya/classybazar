"use client";

import { useEffect, useState } from "react";

export default function CountdownTimer() {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 3);

  const calculateTimeLeft = () => {
    const difference = +targetDate - +new Date();
    let timeLeft = { days: "03", hours: "23", minutes: "19", seconds: "56" }; 

    if (difference > 0) {
      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const m = Math.floor((difference / 1000 / 60) % 60);
      const s = Math.floor((difference / 1000) % 60);

      timeLeft = {
        days: d < 10 ? `0${d}` : `${d}`,
        hours: h < 10 ? `0${h}` : `${h}`,
        minutes: m < 10 ? `0${m}` : `${m}`,
        seconds: s < 10 ? `0${s}` : `${s}`,
      };
    }
    return timeLeft;
  };
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center justify-center font-sans select-none pt-4 bg-white">
      <div className="flex items-center space-x-2 md:space-x-4">
        
        {/* Days */}
        <div className="flex flex-col items-center">
          <span className="text-xs md:text-sm font-medium text-gray-800 mb-1">Days</span>
          <span className="text-3xl md:text-[32px] font-bold text-black tracking-tight">{timeLeft.days}</span>
        </div>

        {/* Separator */}
        <div className="text-xl md:text-3xl font-bold text-red-400 self-end mb-1 md:mb-2">:</div>

        {/* Hours */}
        <div className="flex flex-col items-center">
          <span className="text-xs md:text-sm font-medium text-gray-800 mb-1">Hours</span>
          <span className="text-3xl md:text-[32px] font-bold text-black tracking-tight">{timeLeft.hours}</span>
        </div>

        {/* Separator */}
        <div className="text-xl md:text-3xl font-bold text-red-400 self-end mb-1 md:mb-2">:</div>

        {/* Minutes */}
        <div className="flex flex-col items-center">
          <span className="text-xs md:text-sm font-medium text-gray-800 mb-1">Minutes</span>
          <span className="text-3xl md:text-[32px] font-bold text-black tracking-tight">{timeLeft.minutes}</span>
        </div>

        {/* Separator */}
        <div className="text-xl md:text-3xl font-bold text-red-400 self-end mb-1 md:mb-2">:</div>

        {/* Seconds */}
        <div className="flex flex-col items-center">
          <span className="text-xs md:text-sm font-medium text-gray-800 mb-1">Seconds</span>
          <span className="text-3xl md:text-[32px] font-bold text-black tracking-tight">{timeLeft.seconds}</span>
        </div>

      </div>
    </div>
  );
}