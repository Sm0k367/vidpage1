"use client";
import React from "react";

// Club Logo (SVG)
function ClubLogo() {
  const epicCyan = "#00F6FF";
  const spectralMagenta = "#FA28FF";
  const cyberBlack = "#090B12";
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

// Digital Globe (SVG + animation)
function DigitalGlobe() {
  const epicCyan = "#00F6FF";
  const spectralMagenta = "#FA28FF";
  return (
    <svg width={96} height={96} viewBox="0 0 96 96" fill="none" className="animate-spin-slow opacity-80 drop-shadow-2xl">
      <circle cx={48} cy={48} r={46} stroke={epicCyan} strokeWidth={3} fill="rgba(0,246,255,0.1)" />
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

// Mini Avatar
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

// Animated tile grid
function TileGrid() {
  const epicCyan = "#00F6FF";
  const spectralMagenta = "#FA28FF";
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

// UGC Wall
function UGCWall() {
  const epicCyan = "#00F6FF";
  const spectralMagenta = "#FA28FF";
  const colors = [epicCyan, spectralMagenta, "#fff", "#0ff", "#f0f"];
  const messages = [
    "🌍 'Love from Tokyo!'",
    "BASS LEVELS UNREAL 🚀",
