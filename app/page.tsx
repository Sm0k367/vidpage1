"use client";
import React from "react";

// Color palette helpers
const epicCyan = "#00F6FF";
const spectralMagenta = "#FA28FF";
const cyberBlack = "#090B12";

// SVG club logo
function ClubLogo() {
  return (
    <svg width={52} height={52} viewBox="0 0 52 52" fill="none">
      <defs>
        <radialGradient id="clubGradient" cx="50%" cy="50%" r="70%" gradientTransform="rotate(30)">
          <stop offset="0%" stopColor={spectralMagenta} />
          <stop offset="100%" stopColor={epicCyan} />
        </radialGradient>
      </defs>
      <circle cx={26} cy={26} r={24} fill="url(#clubGradient)" stroke={cyberBlack} strokeWidth={2} />
      <ellipse cx={26} cy={20} rx={13} ry={10} fill="#fff" fillOpacity={0.1} />
      <text x={26} y={32} textAnchor="middle" fontSize={18} fontFamily="monospace" fill={cyberBlack} fontWeight="bold">
        AI💿
      </text>
    </svg>
  );
}

// Animated digital globe
function DigitalGlobe() {
  return (
    <svg width={96} height={96} viewBox="0 0 96 96" fill="none" className="animate-spin-slow opacity-80 drop-shadow-2xl">
      <circle cx={48} cy={48} r={46} stroke={epicCyan} strokeWidth={3} fill={`rgba(0,246,255,0.1)`} />
      <ellipse cx={48} cy={48} rx={30} ry={15} stroke={spectralMagenta} strokeWidth={2} fill="none" />
      <ellipse cx={48} cy={48} rx={36} ry={40} stroke={spectralMagenta} strokeDasharray="8 12" strokeWidth={1.5} fill="none" />
      <circle cx={72} cy={32} r={4} fill={spectralMagenta} />
      <circle cx={27} cy={68} r={3} fill={epicCyan} />
      <circle cx={64} cy={70} r={2.5} fill={spectralMagenta} />
      <circle cx={78} cy={62} r={2.5} fill={epicCyan} />
      <circle cx={24} cy={32} r={2.5} fill={epicCyan} />
    </svg>
  );
}

// Tiny avatar chips
function MiniAvatar({ color, i }: { color: string; i: number }) {
  return (
    <div
      className="rounded-full flex items-center justify-center border-2 border-white"
      style={{
        width: 30 + ((i * 3) % 8), height: 30 + ((i * 3) % 8),
        background: `linear-gradient(160deg,${color},#222 80%)`,
      }}
    >
      <span className="text-xs text-white drop-shadow-sm">👾</span>
    </div>
  );
}

// Dancefloor tiles
function TileGrid() {
  return (
    <div className="absolute left-0 right-0 bottom-14 z-0 flex flex-col items-center justify-end pointer-events-none">
      <div className="grid grid-cols-12 gap-2 w-[96vw] max-w-5xl pb-4">
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            className={`rounded-lg h-7 transition-all animate-tiles-pulse`}
            style={{
              background: i % 5 === 0
                ? `linear-gradient(90deg, ${epicCyan}77, #fff2)`
                : `linear-gradient(90deg, ${spectralMagenta}88 0%, ${epicCyan}44 100%)`,
              boxShadow: i % 7 === 0 ? `0 0 30px 8px ${spectralMagenta}44` : undefined,
              animationDelay: `${i * 0.13}s`
            }}
          />
        ))}
      </div>
    </div>
  );
}

// Animated UGC Wall
function UGCWall() {
  const colors = [epicCyan, spectralMagenta, "#fff", "#0ff", "#f0f"];
  const messages = [
    "🌍 'Love from Tokyo!'",
    "BASS LEVELS UNREAL 🚀",
    "Dancing in NYC!!",
    "👾 My avatar's glitching!",
    "Virtual club slaps!",
    "🔥 AV Experience TOP TIER",
    "❤️‍🔥 Shoutout Berlin crew!",
    "My bot is dancing too 🤖"
  ];
  return (
    <div className="bg-black/70 rounded-xl border border-epicCyan px-5 py-3 mb-3 max-w-xs animate-fade-in">
      <span className="text-lg text-spectralMagenta font-mono">UGC Wall:</span>
      <div className="my-1 flex flex-row gap-1">
        {Array.from({ length: 7 }).map((_, i) => (
          <MiniAvatar key={i} color={colors[i % colors.length]} i={i} />
        ))}
      </div>
      <div className="text-epicCyan text-xs mt-2 space-y-0.5 font-mono">
        {messages.map((m, i) => (
          <div className={`animate-slide-lr`} style={{ animationDelay: `${0.5 + i * 0.27}s` }} key={m}>{m}</div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black text-epicCyan font-body overflow-hidden">
      <header className="flex items-center gap-4 px-8 pt-6 z-20">
        <ClubLogo />
        <h1 className="font-display text-5xl text-epicCyan drop-shadow-lg">
          <span className="text-spectralMagenta">AI Lounge </span>
          After Dark
        </h1>
      </header>

      <div className="absolute left-0 right-0 top-40 z-30 flex flex-col items-center">
        <div className="bg-black/60 px-10 py-6 rounded-2xl drop-shadow-2xl mb-6">
          <h2 className="font-display text-4xl lg:text-6xl text-spectralMagenta font-bold mb-2 text-center animate-pulse">
            Welcome to the Future<br />of Nightlife
          </h2>
          <p className="text-epicCyan text-lg max-w-xl text-center mb-2">
            A club with dancing avatars, live audience data, and pure neon chaos—100% rendered from code.
          </p>
          <p className="text-base text-cyan-300 text-center">
            Live DJ: <span className="font-extrabold text-white">DJ Smoke Stream</span>
            {" "}• {`Club Status: `}
            <span className="
