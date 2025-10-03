"use client";

import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { getBackgroundList } from "./fetch";
import AudioPlayer from "@/app/components/audioPlayer/AudioPlayer";
import PastelButton from "@/app/components/button/PastelButton";
import ChangeBackgroundButton from "./components/ChangeBackgroundButton";
import { getRandomIndex } from "@/app/libs/customHandler";

function getTimeLeft(targetDate) {
  const now = new Date();
  const difference = targetDate - now;

  let days = Math.floor(difference / (1000 * 60 * 60 * 24));
  let hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  let minutes = Math.floor((difference / 1000 / 60) % 60);
  let seconds = Math.floor((difference / 1000) % 60);

  if (days >= 0 && days < 10) {
    days = `0${days}`;
  }

  return { days, hours, minutes, seconds };
}

function getTargetDate() {
  const today = new Date();
  const targetMonth = 4; // April
  const targetDay = 26;

  const thisYear = today.getFullYear();
  const targetThisYear = new Date(thisYear, targetMonth - 1, targetDay);

  // Kalau sudah lewat, set ke tahun depan
  if (today > targetThisYear) {
    return new Date(thisYear + 1, targetMonth - 1, targetDay);
  }

  return targetThisYear;
}

function getCurrentAnniversary(targetYear) {
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
  const currentAnniversary = targetYear - releaseDate;

  const suffix = getOrdinalSuffix(currentAnniversary);

  const text = `${currentAnniversary}${suffix}`;

  return text;
}

export default function page() {
  const [targetDate, setTargetDate] = useState(getTargetDate());
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate));
  const [isAnniversaryNow, setIsAnniversaryNow] = useState(false); // ubah sesuai tanggal anniversary
  const [finalBackgroundList, setFinalBackgroundList] = useState(null);
  const [backgroundList, setBackgroundList] = useState(null);
  const [currentSelectedBackground, setCurrentSelectedBackground] =
    useState(null);

  const currentAnniversary = getCurrentAnniversary(targetDate.getFullYear());

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

  // confeti
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

  // fetch background list json
  useEffect(() => {
    // Ubah string JSON menjadi objek JavaScript
    if (!backgroundList) {
      // console.log("Fetch background list");
      const fetchBackgroundList = async () => {
        const json = await getBackgroundList();
        setFinalBackgroundList(json);
        setBackgroundList(json);
      };

      fetchBackgroundList();
    } else {
      if (!currentSelectedBackground) {
        // console.log("Have background list, try to set background...");
        const randomIndex = getRandomIndex(backgroundList);

        // console.log("choosen background:");
        const choosenBackgroundData = backgroundList[randomIndex];
        setCurrentSelectedBackground(choosenBackgroundData);
      }
    }
  }, [backgroundList]);
  // console.log(currentSelectedBackground);

  return (
    <div
      className="relative h-screen w-full flex flex-col items-center justify-center text-center text-white bg-cover bg-center"
      style={{
        backgroundImage: `url(${
          currentSelectedBackground
            ? currentSelectedBackground.link_background
            : ""
        })`,
      }}
    >
      {/* component audio */}
      <div className="">
        <div className="">
          <AudioPlayer />
        </div>
        <div className="">
          <ChangeBackgroundButton
            backgroundList={backgroundList}
            setBackgroundList={setBackgroundList}
            currentSelectedBackground={currentSelectedBackground}
            setCurrentSelectedBackground={setCurrentSelectedBackground}
            finalBackgroundList={finalBackgroundList}
          />
        </div>
      </div>

      <div className="absolute top-0 right-0 bottom-0 left-0 bg-gray-900 opacity-90"></div>

      {/* text */}
      <div className="z-10 text-sm">
        {isAnniversaryNow
          ? `Trailblazers, The ${currentAnniversary} Anniversary is Happening Now!`
          : `Trailblazers, Prepare! ${currentAnniversary} Anniversary Begins In:`}
      </div>
      {/* end text */}

      {/* count down */}
      <div className="flex items-end justify-center z-10">
        <div className="m-2 sm:m-5">
          <span className="text-[#e1c8be] font-bold text-xl sm:text-5xl">
            {isAnniversaryNow ? "00" : timeLeft.days}
          </span>
          <p>Days</p>
        </div>
        <div className="m-2 sm:m-5">
          <span className="text-[#e1c8be] font-bold text-xl sm:text-5xl">
            {isAnniversaryNow
              ? "00"
              : timeLeft.hours.toString().padStart(2, "0")}
          </span>
          <p>Hours</p>
        </div>
        <div className="m-2 sm:m-5">
          <span className="text-[#e1c8be] font-bold text-xl sm:text-5xl">
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
      {/* end count down */}

      {/* buttons */}
      <div className="z-10 mt-5">
        <div className="flex flex-col md:flex-row gap-8 md:gap-4">
          {/* button download */}
          <PastelButton
            buttonText={"Download"}
            navLink={"https://hsr.hoyoverse.com/en-us/"}
            targetBlank={true}
          />
          {/* end button download */}
        </div>
      </div>
      {/* end buttons */}
    </div>
  );
}
