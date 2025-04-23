// chatgpt optimalize

"use client";
import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";

const getTimeLeft = (target) => {
  const diff = target - new Date();
  const time = {
    days: String(Math.floor(diff / 864e5)).padStart(2, "0"),
    hours: Math.floor((diff / 36e5) % 24),
    minutes: Math.floor((diff / 6e4) % 60),
    seconds: Math.floor((diff / 1e3) % 60),
  };
  return time;
};

const getTargetDate = () => {
  const now = new Date();
  const targetMonth = 4,
    targetDay = 26;
  const year =
    now.getMonth() + 1 < targetMonth ||
    (now.getMonth() + 1 === targetMonth && now.getDate() < targetDay)
      ? now.getFullYear()
      : now.getFullYear() + 1;
  return new Date(year, targetMonth - 1, targetDay);
};

export default function CountDownAnniversary() {
  const [targetDate, setTargetDate] = useState(getTargetDate());
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate));
  const [isAnniversaryNow, setIsAnniversaryNow] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTimeLeft(getTimeLeft(targetDate));

      if (now > targetDate) {
        const newDate = getTargetDate();
        setTargetDate(newDate);
        setTimeLeft(getTimeLeft(newDate));
      }

      const isToday =
        now.getDate() === targetDate.getDate() &&
        now.getMonth() === targetDate.getMonth();

      if (isToday && !isAnniversaryNow) {
        setIsAnniversaryNow(true);
        const confettiInterval = setInterval(() => {
          if (
            new Date().getDate() !== targetDate.getDate() ||
            new Date().getMonth() !== targetDate.getMonth()
          ) {
            clearInterval(confettiInterval);
            setIsAnniversaryNow(false);
            return;
          }
          confetti({
            startVelocity: 30,
            spread: 360,
            ticks: 60,
            zIndex: 9999,
            particleCount: 80,
            origin: { x: Math.random(), y: Math.random() - 0.2 },
          });
        }, 1000);
        return () => clearInterval(confettiInterval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate, isAnniversaryNow]);

  const renderTimeUnit = (value, label) => (
    <div className="m-2 sm:m-5">
      <span
        className="font-bold text-xl sm:text-5xl"
        style={{ color: "#e1c8be" }}
      >
        {isAnniversaryNow ? "00" : String(value).padStart(2, "0")}
      </span>
      <p>{label}</p>
    </div>
  );

  return (
    <div
      className="relative h-screen w-full flex flex-col items-center justify-center text-center text-white bg-cover bg-center"
      style={{ backgroundImage: "url('/img/HSR_Image_01.webp')" }}
    >
      <div className="absolute inset-0 bg-gray-900 opacity-90"></div>
      <div className="z-10 text-sm">
        {isAnniversaryNow
          ? "Trailblazers, The Anniversary is Happening Now!"
          : "Trailblazers, Prepare! Anniversary Begins In:"}
      </div>
      <div className="flex items-end justify-center z-10">
        {renderTimeUnit(timeLeft.days, "Days")}
        {renderTimeUnit(timeLeft.hours, "Hours")}
        {renderTimeUnit(timeLeft.minutes, "Minutes")}
        {renderTimeUnit(timeLeft.seconds, "Seconds")}
      </div>
      <div className="rounded-md shadow z-10 mt-5">
        <a
          href="https://hsr.hoyoverse.com/en-us/"
          className="w-full px-8 py-3 text-base font-light rounded-full text-[#1d212e] bg-[#e1c8be] hover:bg-[#DAB7A9] focus:outline-none transition duration-150 ease-in-out md:py-4 md:text-md md:px-16"
          target="_blank"
        >
          <span>Download</span>
        </a>
      </div>
    </div>
  );
}
