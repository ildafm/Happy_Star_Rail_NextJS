"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import "@/public/styles/not-found.css";

function seededRandom(seed) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

export default function NotFoundPage() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  const stars = useMemo(
    () =>
      Array.from({ length: 80 }, (_, i) => ({
        id: i,
        style: {
          width: `${seededRandom(i * 3) * 2.5 + 0.5}px`,
          height: `${seededRandom(i * 3 + 1) * 2.5 + 0.5}px`,
          top: `${seededRandom(i * 3 + 2) * 100}%`,
          left: `${seededRandom(i * 5) * 100}%`,
          opacity: seededRandom(i * 7) * 0.7 + 0.2,
          animation: `twinkle ${seededRandom(i * 11) * 3 + 2}s ease-in-out infinite`,
          animationDelay: `${seededRandom(i * 13) * 4}s`,
        },
      })),
    [],
  );

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const orbitOuter = isMobile ? 76 : 150;
  const orbitMid = isMobile ? 54 : 110;
  const planet = isMobile ? 34 : 70;
  const wrapSize = isMobile ? 80 : 160;

  return (
    <div className="not-found-wrapper">
      {/* Nebula blobs */}
      <div className="nebula-layer">
        <div className="nebula-blob nebula-blob--1" />
        <div className="nebula-blob nebula-blob--2" />
        <div className="nebula-blob nebula-blob--3" />
      </div>

      {/* Stars */}
      <div className="star-layer">
        {stars.map((s) => (
          <div key={s.id} className="star" style={s.style} />
        ))}
      </div>

      <div className="scanline" />

      {/* Main content */}
      <div className="not-found-content">
        {/* Orbit planet */}
        <div
          className="orbit-wrap"
          style={{ width: wrapSize, height: wrapSize }}
        >
          <div
            className="orbit-ring orbit-ring--outer"
            style={{
              width: orbitOuter,
              height: orbitOuter,
              transform: `translate(-50%, -50%)`,
            }}
          >
            <div className="orbit-dot" />
          </div>
          <div
            className="orbit-ring orbit-ring--mid"
            style={{
              width: orbitMid,
              height: orbitMid,
              transform: `translate(-50%, -50%)`,
            }}
          >
            <div className="orbit-dot orbit-dot--alt" />
          </div>
          <div
            className="orbit-planet"
            style={{ width: planet, height: planet }}
          />
        </div>

        {/* 404 */}
        <div
          className="not-found-number"
          style={{
            fontSize: isMobile
              ? "clamp(56px, 18vw, 90px)"
              : "clamp(96px, 12vw, 160px)",
            letterSpacing: isMobile ? "-1px" : "-4px",
          }}
        >
          404
        </div>

        {/* Divider */}
        <div className="not-found-divider">
          <div className="divider-line divider-line--left" />
          <div className="divider-diamond" />
          <div className="divider-line divider-line--right" />
        </div>

        {/* Title */}
        <h1
          className="not-found-title"
          style={{
            fontSize: isMobile
              ? "clamp(11px, 3.5vw, 16px)"
              : "clamp(18px, 4vw, 26px)",
          }}
        >
          Lost in the Cosmos
        </h1>

        {/* Subtitle */}
        <p
          className="not-found-subtitle"
          style={{ fontSize: isMobile ? "clamp(10px, 2.8vw, 13px)" : 15 }}
        >
          The Astral Express has traveled beyond this destination. The page you
          seek does not exist in this star system.
        </p>

        {/* Button */}
        <button className="hsr-btn" onClick={() => router.push("/")}>
          ✦ Back to Main Page
        </button>

        {/* Footer */}
        <p className="not-found-footer">Honkai: Star Rail — Error Code 404</p>
      </div>
    </div>
  );
}
