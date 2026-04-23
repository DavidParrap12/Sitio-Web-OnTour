"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

export function SplashScreen() {
  const t = useTranslations("splash");
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    // Only show splash on first visit per session
    if (typeof window !== "undefined") {
      const played = sessionStorage.getItem("ontour-splash-played");
      if (played) {
        setIsVisible(false);
        setHasPlayed(true);
        return;
      }
    }

    // Auto-dismiss after animation completes (3.5s animation + 0.3s buffer)
    const timer = setTimeout(() => {
      setIsFading(true);
      setTimeout(() => {
        setIsVisible(false);
        sessionStorage.setItem("ontour-splash-played", "true");
      }, 800);
    }, 3800);

    return () => clearTimeout(timer);
  }, []);

  if (hasPlayed || !isVisible) return null;

  return (
    <div
      className={`splash-screen ${isFading ? "splash-fade-out" : ""}`}
      aria-hidden="true"
    >
      {/* Background gradient */}
      <div className="splash-bg" />

      {/* ===== ROAD + BUS SCENE (bottom strip) ===== */}
      <div className="splash-road-scene">
        {/* Road background strip */}
        <div className="splash-road-strip">
          {/* Road surface SVG */}
          <svg
            className="splash-road-svg"
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="roadGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4a4a4a" />
                <stop offset="100%" stopColor="#2a2a2a" />
              </linearGradient>
            </defs>
            {/* Road surface */}
            <rect x="0" y="0" width="1440" height="100" fill="url(#roadGrad)" />
            {/* Road edge lines */}
            <line x1="0" y1="5" x2="1440" y2="5" stroke="#eee" strokeWidth="2" opacity="0.3" />
            <line x1="0" y1="95" x2="1440" y2="95" stroke="#eee" strokeWidth="2" opacity="0.3" />
            {/* Center dashed line */}
            <line
              x1="0" y1="50" x2="1440" y2="50"
              stroke="#fbbf24"
              strokeWidth="3"
              strokeDasharray="30 20"
              className="splash-road-line"
            />
          </svg>
        </div>

        {/* The Bus — HTML element, positioned with CSS for full responsive control */}
        <div className="splash-bus-wrapper">
          <svg
            className="splash-bus-svg"
            viewBox="0 0 130 70"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <radialGradient id="hlGlow" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Shadow under bus */}
            <ellipse cx="65" cy="66" rx="55" ry="4" fill="rgba(0,0,0,0.2)" />

            {/* Bus body */}
            <rect x="10" y="12" width="105" height="42" rx="7" fill="#1c7ed6" />
            {/* Roof */}
            <rect x="10" y="12" width="105" height="15" rx="7" fill="#0a3566" />

            {/* Windows */}
            <rect x="18" y="17" width="14" height="9" rx="2" fill="#a8d8ff" opacity="0.9" />
            <rect x="36" y="17" width="14" height="9" rx="2" fill="#a8d8ff" opacity="0.9" />
            <rect x="54" y="17" width="14" height="9" rx="2" fill="#a8d8ff" opacity="0.9" />
            <rect x="72" y="17" width="14" height="9" rx="2" fill="#a8d8ff" opacity="0.9" />
            <rect x="90" y="17" width="14" height="9" rx="2" fill="#7cc4f5" opacity="0.9" />

            {/* Windshield (front) */}
            <path d="M108,12 Q120,12 120,22 L120,42 Q120,49 114,49 L108,49 Z" fill="#a8d8ff" opacity="0.85" />

            {/* Headlight */}
            <rect x="117" y="39" width="5" height="6" rx="1.5" fill="#fbbf24" />
            {/* Headlight glow */}
            <ellipse cx="130" cy="42" rx="12" ry="8" fill="url(#hlGlow)" className="splash-headlight" />

            {/* Door */}
            <rect x="22" y="34" width="11" height="20" rx="2" fill="#0d3d7a" />

            {/* Stripe */}
            <rect x="10" y="38" width="105" height="3" fill="#fbbf24" />

            {/* Rear lights */}
            <rect x="10" y="38" width="4" height="6" rx="1" fill="#e74c3c" />

            {/* Wheels — spinning */}
            <g className="splash-wheel splash-wheel-left">
              <circle cx="38" cy="57" r="9" fill="#222" />
              <circle cx="38" cy="57" r="5" fill="#555" />
              <line x1="38" y1="49" x2="38" y2="65" stroke="#777" strokeWidth="1" />
              <line x1="30" y1="57" x2="46" y2="57" stroke="#777" strokeWidth="1" />
            </g>
            <g className="splash-wheel splash-wheel-right">
              <circle cx="95" cy="57" r="9" fill="#222" />
              <circle cx="95" cy="57" r="5" fill="#555" />
              <line x1="95" y1="49" x2="95" y2="65" stroke="#777" strokeWidth="1" />
              <line x1="87" y1="57" x2="103" y2="57" stroke="#777" strokeWidth="1" />
            </g>

            {/* Luggage rack */}
            <rect x="28" y="5" width="58" height="9" rx="3" fill="#0d3d7a" />
            <rect x="33" y="2" width="14" height="6" rx="2" fill="#e67e22" />
            <rect x="51" y="1" width="17" height="7" rx="2" fill="#c0392b" />
            <rect x="72" y="3" width="10" height="5" rx="2" fill="#27ae60" />

            {/* Exhaust smoke */}
            <circle className="smoke-svg smoke-svg-1" cx="8" cy="52" r="3" fill="rgba(255,255,255,0.4)" />
            <circle className="smoke-svg smoke-svg-2" cx="4" cy="50" r="4" fill="rgba(255,255,255,0.3)" />
            <circle className="smoke-svg smoke-svg-3" cx="0" cy="48" r="3.5" fill="rgba(255,255,255,0.25)" />
          </svg>
        </div>
      </div>

      {/* ===== MOUNTAINS (behind the road) ===== */}
      <div className="splash-mountains-wrap">
        <svg
          className="splash-mountains-svg"
          viewBox="0 0 1440 300"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="mtn1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1a5f3a" />
              <stop offset="100%" stopColor="#0d3320" />
            </linearGradient>
            <linearGradient id="mtn2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2d8a56" />
              <stop offset="100%" stopColor="#1a5f3a" />
            </linearGradient>
            <linearGradient id="mtn3" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3ba36e" />
              <stop offset="100%" stopColor="#2d8a56" />
            </linearGradient>
          </defs>
          {/* Far mountains */}
          <path
            d="M0,180 Q120,60 240,130 Q360,40 500,110 Q600,20 720,100 Q840,10 960,90 Q1080,30 1200,110 Q1320,50 1440,120 L1440,300 L0,300 Z"
            fill="url(#mtn1)" opacity="0.5"
          />
          {/* Mid mountains */}
          <path
            d="M0,210 Q160,120 320,180 Q480,100 640,170 Q800,100 960,160 Q1120,110 1280,180 Q1380,140 1440,160 L1440,300 L0,300 Z"
            fill="url(#mtn2)" opacity="0.7"
          />
          {/* Near hills */}
          <path
            d="M0,250 Q200,190 400,230 Q550,180 700,220 Q900,180 1100,230 Q1280,200 1440,220 L1440,300 L0,300 Z"
            fill="url(#mtn3)" opacity="0.85"
          />
          {/* Bushes */}
          <circle cx="200" cy="275" r="8" fill="#2d8a56" opacity="0.6" />
          <circle cx="450" cy="270" r="6" fill="#3ba36e" opacity="0.5" />
          <circle cx="750" cy="268" r="7" fill="#2d8a56" opacity="0.5" />
          <circle cx="1100" cy="265" r="9" fill="#3ba36e" opacity="0.5" />
          <circle cx="1350" cy="272" r="6" fill="#2d8a56" opacity="0.6" />
        </svg>
      </div>

      {/* Logo & text */}
      <div className="splash-content">
        <div className="splash-logo-container">
          <Image
            src="/image/logo-ON-TOUR-Nuevo.png"
            alt="OnTour Logo"
            width={180}
            height={80}
            priority
            className="splash-logo"
          />
        </div>
        <p className="splash-tagline">
          <span className="splash-tagline-main">{t("main")}</span>
          <span className="splash-tagline-divider" />
          <span className="splash-tagline-sub">{t("sub")}</span>
        </p>

        {/* Progress bar — pure CSS animation */}
        <div className="splash-progress-track">
          <div className="splash-progress-fill" />
        </div>
      </div>
    </div>
  );
}
