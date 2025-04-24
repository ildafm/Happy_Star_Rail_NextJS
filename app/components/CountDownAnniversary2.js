"use client";
import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";

function getTimeLeft(targetDate) {
  const now = new Date();
  const difference = targetDate - now;

  let days = Math.floor(difference / (1000 * 60 * 60 * 24));
  let hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  let minutes = Math.floor((difference / 1000 / 60) % 60);
  let seconds = Math.floor((difference / 1000) % 60);

  if (days > 0 && days < 10) {
    days = `0${days}`;
  }

  return { days, hours, minutes, seconds };
}

function getTargetDate() {
  const today = new Date(); // Mendapatkan tanggal hari ini
  today.setMonth(today.getMonth() + 1);

  // anniversary HSR adalah 26 April
  const targetMonth = 4;
  const targetDate = 26;
  let targetYear = 2025;

  if (today.getMonth() < targetMonth) {
    // jika bulan sekarang kurang dari targetMonth, maka targetYear adalah tahun sekarang
    targetYear = today.getFullYear();
  } else if (today.getMonth() == targetMonth) {
    // jika bulan sekarang sama dengan targetMonth, maka cek tanggalnya
    if (today.getDate() < targetDate) {
      // jika tanggal sekarang kurang dari targetDate, maka maka targetYear adalah tahun sekarang
      targetYear = today.getFullYear();
    }
  } else {
    // jika bulan sekarang lebih dari targetMonth, maka targetYear adalah tahun depan
    targetYear = today.getFullYear() + 1;
  }
  const finalTargetDate = new Date(
    targetYear,
    targetMonth - 1, // bulan dimulai dari 0 jadi untuk menargetkan april harus dikurang 1
    targetDate
  );

  return finalTargetDate;
}

function getCurrentAnniversary() {
  const getOrdinalSuffix = (n) => {
    const lastDigit = n % 10;
    const lastTwoDigits = n % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
      return "th";
    }

    switch (lastDigit) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const releaseDate = 2023;
  const currentYear = new Date().getFullYear();
  const currentAnniversary = currentYear - releaseDate;

  const suffix = getOrdinalSuffix(currentAnniversary);

  const text = `${currentAnniversary}${suffix}`;

  return text;
}

export default function CountDownAnniversary() {
  // const targetDate = getTargetDate(); // ubah sesuai tanggal anniversary
  const [targetDate, setTargetDate] = useState(getTargetDate());
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate));
  const [isAnniversaryNow, setIsAnniversaryNow] = useState(false); // ubah sesuai tanggal anniversary
  const currentAnniversary = getCurrentAnniversary();

  useEffect(() => {
    const checkDateChange = setInterval(() => {
      const now = new Date();
      if (now > targetDate) {
        const newTargetDate = getTargetDate();
        setTargetDate(newTargetDate);
        setTimeLeft(getTimeLeft(newTargetDate));
      }
    }, 60 * 1000); // cek setiap 1 menit

    return () => clearInterval(checkDateChange);
  }, [targetDate]);

  useEffect(() => {
    const now = new Date();
    const isTodayAnniversary =
      now.getMonth() === targetDate.getMonth() &&
      now.getDate() === targetDate.getDate();

    if (isTodayAnniversary) {
      // console.log("Anniversary Now");
      setIsAnniversaryNow(true);

      // Jalankan confetti saat ulang tahun
      const defaults = {
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        zIndex: 9999,
      };

      // Jalankan confetti tiap beberapa detik
      const interval = setInterval(() => {
        const checkDate = new Date();

        // Hentikan jika sudah bukan tanggal anniversary lagi
        if (
          checkDate.getMonth() !== targetDate.getMonth() ||
          checkDate.getDate() !== targetDate.getDate()
        ) {
          clearInterval(interval);
          setIsAnniversaryNow(false);
          return;
        }

        // Tembakkan confetti random
        confetti({
          ...defaults,
          particleCount: 80,
          origin: {
            x: Math.random(),
            y: Math.random() - 0.2,
          },
        });
      }, 1000); // setiap 1 detik
      return () => clearInterval(interval);
    } else {
      setIsAnniversaryNow(false);
    }
  }, [timeLeft]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="relative h-screen w-full flex flex-col items-center justify-center text-center text-white bg-cover bg-center"
      style={{
        backgroundImage: "url('/img/HSR_Image_01.webp')",
      }}
    >
      <div className="absolute top-0 right-0 bottom-0 left-0 bg-gray-900 opacity-90"></div>

      <div className="z-10 text-sm">
        {isAnniversaryNow
          ? `Trailblazers, The ${currentAnniversary} Anniversary is Happening Now!`
          : `Trailblazers, Prepare! ${currentAnniversary} Anniversary Begins In:`}
      </div>

      <div className="flex items-end justify-center z-10">
        <div className="m-2 sm:m-5">
          <span
            className="text-[#e1c8be] font-bold text-xl sm:text-5xl"
            // style={{ color: "#e1c8be" }}
          >
            {isAnniversaryNow ? "00" : timeLeft.days}
          </span>
          <p>Days</p>
        </div>
        <div className="m-2 sm:m-5">
          <span
            className="text-[#e1c8be] font-bold text-xl sm:text-5xl"
            // style={{ color: "#e1c8be" }}
          >
            {isAnniversaryNow
              ? "00"
              : timeLeft.hours.toString().padStart(2, "0")}
          </span>
          <p>Hours</p>
        </div>
        <div className="m-2 sm:m-5">
          <span
            className="text-[#e1c8be] font-bold text-xl sm:text-5xl"
            // style={{ color: "#e1c8be" }}
          >
            {isAnniversaryNow
              ? "00"
              : timeLeft.minutes.toString().padStart(2, "0")}
          </span>
          <p>Minutes</p>
        </div>
        <div className="m-2 sm:m-5">
          <span
            className="text-[#e1c8be] font-bold text-xl sm:text-5xl"
            // style={{ color: "#e1c8be" }}
          >
            {isAnniversaryNow
              ? "00"
              : timeLeft.seconds.toString().padStart(2, "0")}
          </span>
          <p>Seconds</p>
        </div>
      </div>

      <div className="rounded-md shadow z-10 mt-5">
        <a
          href="https://hsr.hoyoverse.com/en-us/"
          className="w-full px-8 py-3 border border-transparent text-base leading-6 font-light rounded-full text-[#1d212e] bg-[#e1c8be] hover:bg-[#DAB7A9] focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition duration-150 ease-in-out md:py-4 md:text-md md:px-16"
          target="_blank"
          // style={{ backgroundColor: "#e1c8be", color: "#1d212e" }}
        >
          <span>Download</span>
        </a>
      </div>
    </div>
  );
}
