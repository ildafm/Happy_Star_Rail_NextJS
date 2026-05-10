"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const Star = ({ style }) => (
  <div
    style={{
      position: "absolute",
      borderRadius: "50%",
      background: "white",
      ...style,
    }}
  />
);

// Simple seeded pseudo-random number generator (no Math.random on module load)
function seededRandom(seed) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

export default function NotFoundPage({ fullPage = false }) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Generate stars with deterministic seed — same result on server & client
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
    setMounted(true);
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Derive responsive values — server renders "desktop" defaults,
  // client patches after hydration (suppressHydrationWarning handles the diff).
  const orbitOuter = isMobile ? 76 : 150;
  const orbitMid = isMobile ? 54 : 110;
  const planet = isMobile ? 34 : 70;
  const wrapSize = isMobile ? 80 : 160;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;900&family=Rajdhani:wght@300;400;600;700&display=swap');
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.4); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(2deg); }
          66% { transform: translateY(-5px) rotate(-2deg); }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(168,131,255,0.3), 0 0 60px rgba(168,131,255,0.1); }
          50%       { box-shadow: 0 0 40px rgba(168,131,255,0.6), 0 0 100px rgba(168,131,255,0.2); }
        }
        @keyframes orbitRing {
          from { transform: translate(-50%,-50%) rotate(0deg); }
          to   { transform: translate(-50%,-50%) rotate(360deg); }
        }
        @keyframes orbitRingReverse {
          from { transform: translate(-50%,-50%) rotate(0deg); }
          to   { transform: translate(-50%,-50%) rotate(-360deg); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes scanline {
          0%   { top: -10%; }
          100% { top: 110%; }
        }
        @keyframes nebulaPulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50%       { opacity: 0.7; transform: scale(1.05); }
        }

        .hsr-btn {
          position: relative;
          background: transparent;
          border: 1px solid rgba(168,131,255,0.6);
          color: #d4b8ff;
          font-family: 'Rajdhani', sans-serif;
          font-weight: 600;
          letter-spacing: 3px;
          text-transform: uppercase;
          cursor: pointer;
          overflow: hidden;
          transition: all 0.3s ease;
          clip-path: polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%);
        }
        .hsr-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(168,131,255,0.15), transparent);
          transform: translateX(-100%);
          transition: transform 0.4s ease;
        }
        .hsr-btn:hover::before { transform: translateX(100%); }
        .hsr-btn:hover {
          background: rgba(168,131,255,0.12);
          border-color: rgba(168,131,255,1);
          color: #e8d5ff;
          box-shadow: 0 0 20px rgba(168,131,255,0.3), inset 0 0 20px rgba(168,131,255,0.05);
        }
        .hsr-btn:active { transform: scale(0.97); }

        .number-404 {
          background: linear-gradient(135deg, #ffffff 0%, #d4b8ff 40%, #9b7fe8 70%, #6b4fc4 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }
        .scanline {
          position: absolute;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(168,131,255,0.3), transparent);
          animation: scanline 6s linear infinite;
          pointer-events: none;
        }
        .orbit-dot {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #a883ff;
          top: -3px;
          left: calc(50% - 3px);
          box-shadow: 0 0 8px rgba(168,131,255,0.8);
        }
      `}</style>

      <div
        style={{
          height: fullPage ? "100dvh" : "100%",
          width: "100%",
          overflow: "hidden",
          background:
            "linear-gradient(135deg, #05030f 0%, #0a0618 40%, #070514 70%, #030210 100%)",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Rajdhani', sans-serif",
        }}
      >
        {/* Nebula blobs */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div
            style={{
              position: "absolute",
              top: "10%",
              left: "5%",
              width: 500,
              height: 400,
              background:
                "radial-gradient(ellipse, rgba(80,40,160,0.25) 0%, transparent 70%)",
              animation: "nebulaPulse 8s ease-in-out infinite",
              borderRadius: "50%",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "10%",
              right: "5%",
              width: 400,
              height: 350,
              background:
                "radial-gradient(ellipse, rgba(40,20,120,0.2) 0%, transparent 70%)",
              animation: "nebulaPulse 10s ease-in-out infinite reverse",
              borderRadius: "50%",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "40%",
              right: "15%",
              width: 250,
              height: 200,
              background:
                "radial-gradient(ellipse, rgba(160,80,200,0.15) 0%, transparent 70%)",
              animation: "nebulaPulse 7s ease-in-out infinite 2s",
              borderRadius: "50%",
            }}
          />
        </div>

        {/* Stars — same values server & client, no hydration mismatch */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          {stars.map((s) => (
            <Star key={s.id} style={s.style} />
          ))}
        </div>

        <div className="scanline" />

        {/* Main content — suppressHydrationWarning on elements whose inline styles
            differ between server (isMobile=false) and first client paint */}
        <div
          suppressHydrationWarning
          style={{
            position: "relative",
            zIndex: 10,
            textAlign: "center",
            padding: isMobile ? "0 16px" : "0 20px",
            maxWidth: 700,
            width: "100%",
            animation: mounted ? "fadeSlideUp 0.8s ease forwards" : "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Orbit planet */}
          <div
            suppressHydrationWarning
            style={{
              position: "relative",
              width: wrapSize,
              height: wrapSize,
              marginBottom: isMobile ? 12 : 40,
              animation: "float 6s ease-in-out infinite",
              flexShrink: 0,
            }}
          >
            <div
              suppressHydrationWarning
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: orbitOuter,
                height: orbitOuter,
                border: "1px solid rgba(168,131,255,0.25)",
                borderRadius: "50%",
                transform: "translate(-50%,-50%)",
                animation: "orbitRing 12s linear infinite",
              }}
            >
              <div className="orbit-dot" />
            </div>
            <div
              suppressHydrationWarning
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: orbitMid,
                height: orbitMid,
                border: "1px solid rgba(168,131,255,0.15)",
                borderRadius: "50%",
                transform: "translate(-50%,-50%)",
                animation: "orbitRingReverse 8s linear infinite",
              }}
            >
              <div className="orbit-dot" style={{ background: "#c4a0ff" }} />
            </div>
            <div
              suppressHydrationWarning
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: planet,
                height: planet,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle at 35% 35%, #8b6fd4, #3d1f8a 60%, #1a0a4a)",
                transform: "translate(-50%,-50%)",
                animation: "pulseGlow 3s ease-in-out infinite",
                boxShadow: "0 0 30px rgba(168,131,255,0.4)",
              }}
            />
          </div>

          {/* 404 */}
          <div
            suppressHydrationWarning
            className="number-404"
            style={{
              fontSize: isMobile
                ? "clamp(56px, 18vw, 90px)"
                : "clamp(96px, 12vw, 160px)",
              fontFamily: "'Cinzel', serif",
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: isMobile ? "-1px" : "-4px",
              marginBottom: isMobile ? 2 : 8,
            }}
          >
            404
          </div>

          {/* Divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              justifyContent: "center",
              margin: isMobile ? "10px 0 12px" : "20px 0 28px",
            }}
            suppressHydrationWarning
          >
            <div
              style={{
                height: 1,
                width: isMobile ? 32 : 60,
                background:
                  "linear-gradient(90deg, transparent, rgba(168,131,255,0.6))",
              }}
            />
            <div
              style={{
                width: 5,
                height: 5,
                background: "#a883ff",
                transform: "rotate(45deg)",
                boxShadow: "0 0 8px rgba(168,131,255,0.8)",
              }}
            />
            <div
              style={{
                height: 1,
                width: isMobile ? 32 : 60,
                background:
                  "linear-gradient(90deg, rgba(168,131,255,0.6), transparent)",
              }}
            />
          </div>

          {/* Title */}
          <h1
            suppressHydrationWarning
            style={{
              fontFamily: "'Cinzel', serif",
              fontWeight: 600,
              fontSize: isMobile
                ? "clamp(11px, 3.5vw, 16px)"
                : "clamp(18px, 4vw, 26px)",
              color: "#c4a0ff",
              letterSpacing: isMobile ? "3px" : "6px",
              textTransform: "uppercase",
              margin: isMobile ? "0 0 8px" : "0 0 16px",
            }}
          >
            Lost in the Cosmos
          </h1>

          {/* Subtitle */}
          <p
            suppressHydrationWarning
            style={{
              color: "rgba(180,150,255,0.6)",
              fontSize: isMobile ? "clamp(10px, 2.8vw, 13px)" : 15,
              letterSpacing: isMobile ? "0.5px" : "1.5px",
              lineHeight: 1.65,
              margin: isMobile ? "0 0 20px" : "0 0 48px",
              fontWeight: 300,
            }}
          >
            The Astral Express has traveled beyond this destination. The page
            you seek does not exist in this star system.
          </p>

          {/* Button */}
          <button
            suppressHydrationWarning
            className="hsr-btn"
            onClick={() => router.push("/")}
            style={{
              fontSize: isMobile ? "clamp(10px, 2.5vw, 12px)" : 15,
              padding: isMobile ? "9px 24px" : "14px 40px",
            }}
          >
            ✦ Back to Main Page
          </button>

          {/* Footer */}
          <p
            suppressHydrationWarning
            style={{
              marginTop: isMobile ? 16 : 48,
              color: "rgba(168,131,255,0.3)",
              fontSize: isMobile ? "clamp(8px, 2vw, 10px)" : 11,
              letterSpacing: "3px",
              textTransform: "uppercase",
            }}
          >
            Honkai: Star Rail — Error Code 404
          </p>
        </div>
      </div>
    </>
  );
}
