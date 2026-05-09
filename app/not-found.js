"use client";

import React, { useEffect, useState } from "react";
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

const stars = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  style: {
    width: `${Math.random() * 2.5 + 0.5}px`,
    height: `${Math.random() * 2.5 + 0.5}px`,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    opacity: Math.random() * 0.7 + 0.2,
    animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
    animationDelay: `${Math.random() * 4}s`,
  },
}));

export default function NotFound() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
          33% { transform: translateY(-18px) rotate(2deg); }
          66% { transform: translateY(-8px) rotate(-2deg); }
        }

        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(168, 131, 255, 0.3), 0 0 60px rgba(168, 131, 255, 0.1); }
          50% { box-shadow: 0 0 40px rgba(168, 131, 255, 0.6), 0 0 100px rgba(168, 131, 255, 0.2); }
        }

        @keyframes orbitRing {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        @keyframes orbitRingReverse {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(-360deg); }
        }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        @keyframes scanline {
          0% { top: -10%; }
          100% { top: 110%; }
        }

        @keyframes nebulaPulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }

        .hsr-btn {
          position: relative;
          background: transparent;
          border: 1px solid rgba(168, 131, 255, 0.6);
          color: #d4b8ff;
          font-family: 'Rajdhani', sans-serif;
          font-weight: 600;
          font-size: 15px;
          letter-spacing: 3px;
          text-transform: uppercase;
          padding: 14px 40px;
          cursor: pointer;
          overflow: hidden;
          transition: all 0.3s ease;
          clip-path: polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%);
        }

        .hsr-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(168, 131, 255, 0.15), transparent);
          transform: translateX(-100%);
          transition: transform 0.4s ease;
        }

        .hsr-btn:hover::before {
          transform: translateX(100%);
        }

        .hsr-btn:hover {
          background: rgba(168, 131, 255, 0.12);
          border-color: rgba(168, 131, 255, 1);
          color: #e8d5ff;
          box-shadow: 0 0 20px rgba(168, 131, 255, 0.3), inset 0 0 20px rgba(168, 131, 255, 0.05);
        }

        .hsr-btn:active {
          transform: scale(0.97);
        }

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
          box-shadow: 0 0 8px rgba(168, 131, 255, 0.8);
        }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg, #05030f 0%, #0a0618 40%, #070514 70%, #030210 100%)",
          position: "relative",
          overflow: "hidden",
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
                "radial-gradient(ellipse, rgba(80, 40, 160, 0.25) 0%, transparent 70%)",
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
                "radial-gradient(ellipse, rgba(40, 20, 120, 0.2) 0%, transparent 70%)",
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
                "radial-gradient(ellipse, rgba(160, 80, 200, 0.15) 0%, transparent 70%)",
              animation: "nebulaPulse 7s ease-in-out infinite 2s",
              borderRadius: "50%",
            }}
          />
        </div>

        {/* Stars */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          {stars.map((s) => (
            <Star key={s.id} style={s.style} />
          ))}
        </div>

        {/* Scanline effect */}
        <div className="scanline" />

        {/* Main content */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            textAlign: "center",
            padding: "0 20px",
            maxWidth: 700,
            animation: mounted ? "fadeSlideUp 0.8s ease forwards" : "none",
          }}
        >
          {/* Orbit planet graphic */}
          <div
            style={{
              position: "relative",
              width: 160,
              height: 160,
              margin: "0 auto 40px",
              animation: "float 6s ease-in-out infinite",
            }}
          >
            {/* Outer orbit ring */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: 150,
                height: 150,
                border: "1px solid rgba(168, 131, 255, 0.25)",
                borderRadius: "50%",
                transform: "translate(-50%, -50%)",
                animation: "orbitRing 12s linear infinite",
              }}
            >
              <div className="orbit-dot" />
            </div>

            {/* Inner orbit ring */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: 110,
                height: 110,
                border: "1px solid rgba(168, 131, 255, 0.15)",
                borderRadius: "50%",
                transform: "translate(-50%, -50%)",
                animation: "orbitRingReverse 8s linear infinite",
              }}
            >
              <div className="orbit-dot" style={{ background: "#c4a0ff" }} />
            </div>

            {/* Planet core */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: 70,
                height: 70,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle at 35% 35%, #8b6fd4, #3d1f8a 60%, #1a0a4a)",
                transform: "translate(-50%, -50%)",
                animation: "pulseGlow 3s ease-in-out infinite",
                boxShadow: "0 0 30px rgba(168, 131, 255, 0.4)",
              }}
            />
          </div>

          {/* 404 Number */}
          <div
            className="number-404"
            style={{
              fontSize: "clamp(96px, 18vw, 160px)",
              fontFamily: "'Cinzel', serif",
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: "-4px",
              marginBottom: 8,
            }}
          >
            404
          </div>

          {/* Decorative divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              justifyContent: "center",
              margin: "20px 0 28px",
            }}
          >
            <div
              style={{
                height: 1,
                width: 60,
                background:
                  "linear-gradient(90deg, transparent, rgba(168,131,255,0.6))",
              }}
            />
            <div
              style={{
                width: 6,
                height: 6,
                background: "#a883ff",
                transform: "rotate(45deg)",
                boxShadow: "0 0 8px rgba(168,131,255,0.8)",
              }}
            />
            <div
              style={{
                height: 1,
                width: 60,
                background:
                  "linear-gradient(90deg, rgba(168,131,255,0.6), transparent)",
              }}
            />
          </div>

          {/* Title */}
          <h1
            style={{
              fontFamily: "'Cinzel', serif",
              fontWeight: 600,
              fontSize: "clamp(18px, 4vw, 26px)",
              color: "#c4a0ff",
              letterSpacing: "6px",
              textTransform: "uppercase",
              margin: "0 0 16px",
            }}
          >
            Lost in the Cosmos
          </h1>

          {/* Subtitle */}
          <p
            style={{
              color: "rgba(180, 150, 255, 0.6)",
              fontSize: 15,
              letterSpacing: "1.5px",
              lineHeight: 1.8,
              margin: "0 0 48px",
              fontWeight: 300,
            }}
          >
            The Astral Express has traveled beyond this destination.
            <br />
            The page you seek does not exist in this star system.
          </p>

          {/* Button */}
          <button className="hsr-btn" onClick={() => router.push("/")}>
            ✦ Back to Main Page
          </button>

          {/* Footer text */}
          <p
            style={{
              marginTop: 48,
              color: "rgba(168, 131, 255, 0.3)",
              fontSize: 11,
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
