"use client";

import React, { useEffect, useState } from "react";
import "./style.css";

const STARS = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 0.5,
  delay: Math.random() * 4,
  duration: Math.random() * 3 + 2,
}));

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 2,
  delay: Math.random() * 6,
  duration: Math.random() * 4 + 3,
  color: ["#7B61FF", "#A78BFA", "#60A5FA", "#F9A8D4", "#34D399"][
    Math.floor(Math.random() * 5)
  ],
}));

export default function WorkInProgress() {
  const [progress, setProgress] = useState(0);
  const [glitch, setGlitch] = useState(false);
  const [phase, setPhase] = useState("loading");

  useEffect(() => {
    if (phase !== "loading") return;
    const t = setInterval(() => {
      setProgress((p) => {
        if (p >= 99) return 99;
        return p + Math.random() * 0.4;
      });
    }, 80);
    return () => clearInterval(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "loading" || Math.floor(progress) < 99) return;
    const t1 = setTimeout(() => {
      setPhase("error");
      const t2 = setTimeout(() => {
        setPhase("relaunching");
        const t3 = setTimeout(() => {
          setProgress(0);
          setPhase("loading");
        }, 1800);
        return () => clearTimeout(t3);
      }, 2000);
      return () => clearTimeout(t2);
    }, 2000);
    return () => clearTimeout(t1);
  }, [progress, phase]);

  useEffect(() => {
    const t = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  const isError = phase === "error";
  const isRelaunching = phase === "relaunching";

  const progressDisplay =
    isError || isRelaunching ? 99 : Math.min(Math.floor(progress), 99);

  const statusLabel = isError
    ? "SYSTEM ERROR"
    : isRelaunching
      ? "Relaunching..."
      : "Departure Status";

  const progressBg = isError
    ? "linear-gradient(90deg, #7f1d1d, #dc2626, #ef4444)"
    : "linear-gradient(90deg, #4F46E5, #7B61FF, #A78BFA, #60A5FA)";

  const progressGlow = isError
    ? "0 0 10px rgba(239,68,68,0.7), 0 0 20px rgba(220,38,38,0.3)"
    : "0 0 10px rgba(123,97,255,0.6), 0 0 20px rgba(123,97,255,0.25)";

  const dotBg = isError ? "#fca5a5" : "#E0D7FF";
  const dotGlow = isError
    ? "0 0 8px #f87171, 0 0 20px #dc2626"
    : "0 0 8px #A78BFA, 0 0 20px #7B61FF";

  const labelColor = isError
    ? "#f87171"
    : isRelaunching
      ? "#facc15"
      : "rgba(167,139,250,0.7)";
  const pctColor = isError ? "#f87171" : "#d4ccff";

  return (
    <>
      <div className="W">
        {/* Nebula */}
        <div className="W-bg">
          <div className="W-nb W-nb1" />
          <div className="W-nb W-nb2" />
          <div className="W-nb W-nb3" />
        </div>

        {/* Stars */}
        <div className="W-stars">
          {STARS.map((s) => (
            <div
              key={s.id}
              className="W-star"
              style={{
                left: `${s.x}%`,
                top: `${s.y}%`,
                width: s.size,
                height: s.size,
                "--dur": `${s.duration}s`,
                "--delay": `${s.delay}s`,
              }}
            />
          ))}
        </div>

        {/* Particles */}
        {PARTICLES.map((p) => (
          <div
            key={p.id}
            className="W-particle"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              background: p.color,
              "--pdur": `${p.duration}s`,
              "--pdelay": `${p.delay}s`,
            }}
          />
        ))}

        <div className="W-scan" />
        <div className="W-corner W-tl" />
        <div className="W-corner W-tr" />
        <div className="W-corner W-bl" />
        <div className="W-corner W-br" />

        <div className="W-body">
          {/* Icon rings */}
          <div className="W-iconwrap">
            <div className="W-ring W-r1" />
            <div className="W-ring W-r2" />
            <div className="W-ring W-r3" />
            <div className="W-rc">✦</div>
          </div>

          <p className="W-badge">Interastral Peace Corporation</p>

          <h1 className={`W-title${glitch ? " glitch" : ""}`}>
            WORK IN PROGRESS
          </h1>
          <p className="W-sub">Boarding the Astral Express</p>

          <div className="W-divider">
            <div className="W-dl" />
            <div className="W-gem" />
            <div className="W-dlr" />
          </div>

          <p className="W-desc">
            The Trailblazers are charting this star rail destination. Our
            engineers are forging new paths through the cosmos — check back soon
            to board.
          </p>

          {/* Progress bar */}
          <div className="W-prog">
            <div className="W-prog-head">
              <span className="W-prog-lbl" style={{ color: labelColor }}>
                {statusLabel}
              </span>
              <span className="W-prog-pct" style={{ color: pctColor }}>
                {progressDisplay}%
              </span>
            </div>
            <div className="W-prog-track">
              <div
                className="W-prog-fill"
                style={{
                  width: `${progressDisplay}%`,
                  background: progressBg,
                  boxShadow: progressGlow,
                }}
              >
                <div
                  className="W-prog-dot"
                  style={{ background: dotBg, boxShadow: dotGlow }}
                />
              </div>
            </div>
            <div className="W-chips">
              {isError ? (
                <>
                  <span className="W-chip W-ce">ERR_0x4F</span>
                  <span className="W-chip W-ce">SYS_HALT</span>
                  <span className="W-chip W-ce">ABORT</span>
                </>
              ) : isRelaunching ? (
                <>
                  <span className="W-chip W-cw">REBOOTING</span>
                  <span className="W-chip W-cw">SYS_RESTART</span>
                  <span className="W-chip W-cw">STANDBY</span>
                </>
              ) : (
                <>
                  <span className="W-chip W-cn">SYS_ONLINE</span>
                  <span className="W-chip W-cn">NODE_ACTIVE</span>
                  <span className="W-chip W-cn">ETA_UNKNOWN</span>
                </>
              )}
            </div>
          </div>

          {/* Stat cards */}
          <div className="W-cards">
            <div className="W-card">
              <span className="W-cv">∞</span>
              <span className="W-cl">Galaxies</span>
            </div>
            <div className="W-card">
              <span className="W-cv">VII</span>
              <span className="W-cl">Paths</span>
            </div>
            <div className="W-card">
              <span className="W-cv">★★★</span>
              <span className="W-cl">Rank</span>
            </div>
          </div>

          {/* Email notify */}
          {/* <div className="W-notify">
            <input
              className="W-input"
              type="email"
              placeholder="trailblazer@astralexpress.com"
            />
            <button className="W-btn">Notify</button>
          </div> */}

          <p className="W-foot">
            Honkai: Star Rail · © HoYoverse · All rights reserved
          </p>
        </div>
      </div>
    </>
  );
}
