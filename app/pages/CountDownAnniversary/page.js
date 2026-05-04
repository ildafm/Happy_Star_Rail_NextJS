"use client"; // test deploy

import React, { useEffect, useMemo, useState } from "react";
import confetti from "canvas-confetti";
import { getBackgroundList } from "./fetch";
import AudioPlayer from "@/app/components/audioPlayer/AudioPlayer";
import PastelButton from "@/app/components/button/PastelButton";
import ChangeBackgroundButton from "./components/ChangeBackgroundButton";
import { getRandomIndex } from "@/app/libs/customHandler";
import { ANNIVERSARY_CONFIG } from "@/app/constants/anniversary";
import Link from "next/link";

function getTimeLeft(targetDate) {
  const now = new Date();
  const difference = targetDate - now;

  let days = Math.floor(difference / (1000 * 60 * 60 * 24));
  let hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  let minutes = Math.floor((difference / 1000 / 60) % 60);
  let seconds = Math.floor((difference / 1000) % 60);

  return {
    days: String(days).padStart(2, "0"),
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
  };
}

function getTargetDate() {
  const today = new Date();
  const targetMonth = ANNIVERSARY_CONFIG.TARGET_MONTH; // April
  const targetDay = ANNIVERSARY_CONFIG.TARGET_DAY;

  const thisYear = today.getFullYear();
  const targetThisYear = new Date(thisYear, targetMonth - 1, targetDay);

  // Kalau sudah lewat, set ke tahun depan
  if (today.setHours(0, 0, 0, 0) > targetThisYear) {
    return new Date(thisYear + 1, targetMonth - 1, targetDay);
  }

  return targetThisYear;
}

function getOrdinalSuffix(n) {
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
}

function getCurrentAnniversary(targetYear) {
  const count = targetYear - ANNIVERSARY_CONFIG.RELEASE_YEAR;
  return `${count}${getOrdinalSuffix(count)}`;
}

export default function Page() {
  const [targetDate, setTargetDate] = useState(getTargetDate());
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate));
  const [isAnniversaryNow, setIsAnniversaryNow] = useState(false);
  const [finalBackgroundList, setFinalBackgroundList] = useState(null);
  const [backgroundList, setBackgroundList] = useState(null);
  const [currentSelectedBackground, setCurrentSelectedBackground] =
    useState(null);
  const [fetchError, setFetchError] = useState(null);

  const currentAnniversary = useMemo(
    () => getCurrentAnniversary(targetDate.getFullYear()),
    [targetDate],
  );

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
  }, [targetDate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  // fetch background list json
  useEffect(() => {
    // hanya fetch sekali saat mount
    const fetchData = async () => {
      try {
        const json = await getBackgroundList();
        setFinalBackgroundList(json);
        setBackgroundList(json);
      } catch (err) {
        console.error("[Page] Failed to fetch background list:", err);
        setFetchError("Gagal memuat background.");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (backgroundList && !currentSelectedBackground) {
      const randomIndex = getRandomIndex(backgroundList);
      setCurrentSelectedBackground(backgroundList[randomIndex]);
    }
  }, [backgroundList, currentSelectedBackground]);

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
      <div>
        <AudioPlayer />
        <ChangeBackgroundButton
          backgroundList={backgroundList}
          setBackgroundList={setBackgroundList}
          currentSelectedBackground={currentSelectedBackground}
          setCurrentSelectedBackground={setCurrentSelectedBackground}
          finalBackgroundList={finalBackgroundList}
        />
      </div>

      <div className="absolute top-0 right-0 bottom-0 left-0 bg-gray-900 opacity-90"></div>

      {/* text */}
      <div className="z-10 text-sm">
        {isAnniversaryNow
          ? `Trailblazers, The ${currentAnniversary} Anniversary is Happening Now!`
          : `Trailblazers, Prepare! ${currentAnniversary} Anniversary Begins In:`}
      </div>

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
            {isAnniversaryNow ? "00" : timeLeft.hours}
          </span>
          <p>Hours</p>
        </div>
        <div className="m-2 sm:m-5">
          <span className="text-[#e1c8be] font-bold text-xl sm:text-5xl">
            {isAnniversaryNow ? "00" : timeLeft.minutes}
          </span>
          <p>Minutes</p>
        </div>
        <div className="m-2 sm:m-5">
          <span className="text-[#e1c8be] font-bold text-xl sm:text-5xl">
            {isAnniversaryNow ? "00" : timeLeft.seconds}
          </span>
          <p>Seconds</p>
        </div>
      </div>

      {/* buttons */}
      <div className="z-10 mt-5">
        <div className="flex flex-col md:flex-row gap-8 md:gap-4">
          {/* button download */}
          <PastelButton
            buttonText={"Download"}
            navLink={ANNIVERSARY_CONFIG.DOWNLOAD_URL}
            targetBlank={true}
          />
        </div>
      </div>

      {/* Go to herta bot button */}
      <div className="z-10 absolute right-14 bottom-14">
        <Link href={"/pages/herta_bot"}>
          <div className="group relative flex items-center justify-end">
            {/* Teks slide keluar ke kiri */}
            <div
              className="
          absolute right-16
          flex items-center justify-end
          text-sm font-medium
          pl-4 pr-8 h-12 rounded-l-full
          whitespace-nowrap overflow-hidden
          max-w-0 opacity-0
          group-hover:max-w-[200px] group-hover:opacity-100
          transition-all duration-500 ease-in-out
        "
              style={{ backgroundColor: "#e1c8be", color: "#6b4c42" }}
            >
              Ngobrol Bareng Herta
            </div>

            {/* Lingkaran background pastel + gambar */}
            <div
              className="relative z-10 w-20 h-20 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: "#e1c8be" }}
            >
              <img
                src="/img/herta_profile.jpg"
                alt="Herta"
                className="
            w-20 h-20 rounded-full object-cover
            group-hover:w-16 group-hover:h-16
            transition-all duration-500 ease-in-out
          "
              />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
