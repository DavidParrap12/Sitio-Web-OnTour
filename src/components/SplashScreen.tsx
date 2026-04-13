"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function SplashScreen() {
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

      {/* Landscape scene — single SVG with mountains, road, and bus together */}
      <div className="splash-scene">
        <svg
          className="splash-landscape"
          viewBox="0 0 1440 500"
          preserveAspectRatio="xMidYMax slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="mountain1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1a5f3a" />
              <stop offset="100%" stopColor="#0d3320" />
            </linearGradient>
            <linearGradient id="mountain2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2d8a56" />
              <stop offset="100%" stopColor="#1a5f3a" />
            </linearGradient>
            <linearGradient id="mountain3" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3ba36e" />
              <stop offset="100%" stopColor="#2d8a56" />
            </linearGradient>
            <linearGradient id="roadGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4a4a4a" />
              <stop offset="100%" stopColor="#2a2a2a" />
            </linearGradient>
            {/* Headlight glow */}
            <radialGradient id="headlightGlow" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Far mountains */}
          <path
            d="M0,300 Q120,160 240,240 Q360,140 500,220 Q600,120 720,210 Q840,100 960,200 Q1080,120 1200,220 Q1320,150 1440,230 L1440,500 L0,500 Z"
            fill="url(#mountain1)"
            opacity="0.5"
          />
          {/* Mid mountains */}
          <path
            d="M0,340 Q160,230 320,300 Q480,200 640,290 Q800,200 960,280 Q1120,220 1280,300 Q1380,250 1440,280 L1440,500 L0,500 Z"
            fill="url(#mountain2)"
            opacity="0.7"
          />
          {/* Near hills */}
          <path
            d="M0,380 Q200,310 400,360 Q550,300 700,350 Q900,300 1100,360 Q1280,320 1440,350 L1440,500 L0,500 Z"
            fill="url(#mountain3)"
            opacity="0.85"
          />

          {/* Road surface */}
          <path
            d="M0,420 Q200,410 400,416 Q600,405 800,412 Q1000,402 1200,410 Q1350,404 1440,408 L1440,500 L0,500 Z"
            fill="url(#roadGrad)"
          />
          {/* Road shoulder lines */}
          <path
            d="M0,420 Q200,410 400,416 Q600,405 800,412 Q1000,402 1200,410 Q1350,404 1440,408"
            fill="none"
            stroke="#eee"
            strokeWidth="1.5"
            opacity="0.4"
          />
          {/* Road center line — animated dashes */}
          <path
            d="M0,435 Q200,425 400,431 Q600,420 800,427 Q1000,417 1200,425 Q1350,419 1440,423"
            fill="none"
            stroke="#fbbf24"
            strokeWidth="2.5"
            strokeDasharray="25 18"
            className="splash-road-line"
          />

          {/* ===== THE BUS (inside SVG, on the road) ===== */}
          <g className="splash-bus-group">
            {/* Shadow under bus */}
            <ellipse cx="60" cy="455" rx="50" ry="5" fill="rgba(0,0,0,0.25)" />

            {/* Bus body */}
            <rect x="10" y="400" width="100" height="40" rx="6" fill="#1c7ed6" />
            {/* Roof */}
            <rect x="10" y="400" width="100" height="14" rx="6" fill="#0a3566" />

            {/* Windows */}
            <rect x="18" y="404" width="13" height="9" rx="2" fill="#a8d8ff" opacity="0.9" />
            <rect x="34" y="404" width="13" height="9" rx="2" fill="#a8d8ff" opacity="0.9" />
            <rect x="50" y="404" width="13" height="9" rx="2" fill="#a8d8ff" opacity="0.9" />
            <rect x="66" y="404" width="13" height="9" rx="2" fill="#a8d8ff" opacity="0.9" />
            <rect x="82" y="404" width="13" height="9" rx="2" fill="#7cc4f5" opacity="0.9" />

            {/* Windshield (front) */}
            <path d="M103,400 Q113,400 113,410 L113,428 Q113,435 108,435 L103,435 Z" fill="#a8d8ff" opacity="0.85" />

            {/* Headlight */}
            <rect x="110" y="425" width="5" height="5" rx="1.5" fill="#fbbf24" />
            {/* Headlight glow beam */}
            <ellipse cx="125" cy="428" rx="15" ry="8" fill="url(#headlightGlow)" className="splash-headlight" />

            {/* Door */}
            <rect x="22" y="420" width="10" height="20" rx="2" fill="#0d3d7a" />

            {/* Stripe */}
            <rect x="10" y="425" width="100" height="3" fill="#fbbf24" />

            {/* Rear lights */}
            <rect x="10" y="425" width="4" height="5" rx="1" fill="#e74c3c" />

            {/* Wheels — with spinning animation */}
            <g className="splash-wheel-left">
              <circle cx="35" cy="443" r="9" fill="#222" />
              <circle cx="35" cy="443" r="5" fill="#555" />
              <line x1="35" y1="435" x2="35" y2="451" stroke="#777" strokeWidth="1" />
              <line x1="27" y1="443" x2="43" y2="443" stroke="#777" strokeWidth="1" />
            </g>
            <g className="splash-wheel-right">
              <circle cx="90" cy="443" r="9" fill="#222" />
              <circle cx="90" cy="443" r="5" fill="#555" />
              <line x1="90" y1="435" x2="90" y2="451" stroke="#777" strokeWidth="1" />
              <line x1="82" y1="443" x2="98" y2="443" stroke="#777" strokeWidth="1" />
            </g>

            {/* Luggage rack */}
            <rect x="25" y="393" width="55" height="9" rx="3" fill="#0d3d7a" />
            <rect x="30" y="390" width="14" height="6" rx="2" fill="#e67e22" />
            <rect x="48" y="389" width="16" height="7" rx="2" fill="#c0392b" />
            <rect x="68" y="391" width="10" height="5" rx="2" fill="#27ae60" />

            {/* Exhaust smoke — SVG animated circles */}
            <circle className="smoke-svg smoke-svg-1" cx="8" cy="440" r="3" fill="rgba(255,255,255,0.4)" />
            <circle className="smoke-svg smoke-svg-2" cx="5" cy="438" r="4" fill="rgba(255,255,255,0.3)" />
            <circle className="smoke-svg smoke-svg-3" cx="2" cy="436" r="3.5" fill="rgba(255,255,255,0.25)" />
          </g>

          {/* Small trees/bushes on the roadside */}
          <circle cx="200" cy="415" r="8" fill="#2d8a56" opacity="0.6" />
          <circle cx="450" cy="410" r="6" fill="#3ba36e" opacity="0.5" />
          <circle cx="750" cy="407" r="7" fill="#2d8a56" opacity="0.5" />
          <circle cx="1100" cy="405" r="9" fill="#3ba36e" opacity="0.5" />
          <circle cx="1350" cy="402" r="6" fill="#2d8a56" opacity="0.6" />
        </svg>
      </div>

      {/* Logo & text */}
      <div className="splash-content">
        <div className="splash-logo-container">
          <Image
            src="/image/logo-ON-TOUR.png"
            alt="OnTour Logo"
            width={180}
            height={80}
            priority
            className="splash-logo"
          />
        </div>
        <p className="splash-tagline">Descubriendo Colombia</p>

        {/* Progress bar — pure CSS animation */}
        <div className="splash-progress-track">
          <div className="splash-progress-fill" />
        </div>
      </div>

      {/* Floating travel elements */}
      <div className="splash-floating">
        <span className="splash-float-icon float-1">✈️</span>
        <span className="splash-float-icon float-2">🌴</span>
        <span className="splash-float-icon float-3">🗻</span>
        <span className="splash-float-icon float-4">☀️</span>
        <span className="splash-float-icon float-5">🦜</span>
      </div>
    </div>
  );
}
