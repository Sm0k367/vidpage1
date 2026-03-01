"use client";
import React from "react";

const epicCyan = "#00F6FF";
const spectralMagenta = "#FA28FF";
const cyberBlack = "#090B12";

// SVG Club Logo
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

function DigitalGlobe() {
return (
<svg width={96} height={96} viewBox="0 0 96 96" fill="none" className="animate-spin-slow opacity-80 drop-shadow-2xl">
<circle cx={48} cy={48} r={46} stroke={epicCyan} strokeWidth={3} fill={`rgba(0,246,255,0.10)`} />
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
{/* Club Logo & Brand */}
<header className="flex items-center gap-4 px-8 pt-6 z-20">
<ClubLogo />
<h1 className="font-display text-5xl text-epicCyan drop-shadow-lg">
<span className="text-spectralMagenta">AI Lounge </span>
After Dark
</h1>
</header>

{/* Animated HERO title */}
<div className="absolute left-0 right-0 top-40 z-30 flex flex-col items-center">
<div className="bg-black/60 px-10 py-6 rounded-2xl drop-shadow-2xl mb-6">
<h2 className="font-display text-4xl lg:text-6xl text-spectralMagenta font-bold mb-2 text-center animate-pulse">
Welcome to the Future<br />of Nightlife
</h2>
<p className="text-epicCyan text-lg max-w-xl text-center mb-2">
A club with dancing avatars, live audience data, and pure neon chaos—
100% rendered from code.
</p>
<p className="text-base text-cyan-300 text-center">
Live DJ: <span className="font-extrabold text-white">DJ Smoke Stream</span>
{" "}• {`Club Status: `}
<span className="animate-pulse text-spectralMagenta">[PARTY: ON]</span>
</p>
</div>
<button className="mt-1 px-8 py-3 bg-spectralMagenta text-cyberBlack text-xl font-bold rounded-xl shadow-xl hover:bg-epicCyan hover:text-cyberBlack transition ring-2 ring-epicCyan ring-offset-1">
Enter the Club
</button>
</div>

{/* UGC wall and virtual globe */}
<div className="absolute right-0 bottom-24 flex flex-col items-center gap-5 pr-8 z-30">
<UGCWall />
<div className="flex flex-col items-center">
<DigitalGlobe />
<div className="text-xs text-center text-epicCyan mt-2">
LIVE<br />
Virtual Audience: <span className="text-spectralMagenta font-extrabold">2,873</span>
</div>
</div>
</div>

{/* Tiles grid dance floor */}
<TileGrid />

{/* Animated fog effect */}
<div className="absolute inset-x-0 bottom-0 pointer-events-none z-10">
<div className="w-full h-44 absolute bottom-0 bg-gradient-to-t from-black via-spectralMagenta/25 to-transparent animate-fog"></div>
</div>

{/* ENHANCED: Flying AR/social icons (SVG inline) */}
<div className="absolute left-7 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-4">
<div className="flex gap-3">
<svg width={32} height={32} viewBox="0 0 64 64" className="drop-shadow-xl"><circle cx={32} cy={32} r={31} fill={epicCyan} /><text x="50%" y="56%" textAnchor="middle" fill={spectralMagenta} fontSize="24" fontWeight="bold">X</text></svg>
<svg width={32} height={32} viewBox="0 0 64 64" className="drop-shadow-xl"><circle cx={32} cy={32} r={31} fill={spectralMagenta} /><text x="50%" y="56%" textAnchor="middle" fill={epicCyan} fontSize="22" fontWeight="bold">💬</text></svg>
<svg width={32} height={32} viewBox="0 0 64 64" className="drop-shadow-xl"><circle cx={32} cy={32} r={31} fill="#000" /><text x="50%" y="56%" textAnchor="middle" fill={epicCyan} fontSize="18" fontWeight="bold">🎶</text></svg>
</div>
</div>

{/* Animations */}
<style>{`
.animate-spin-slow {
animation: spin 60s linear infinite;
}
@keyframes spin {
100% { transform: rotate(360deg); }
}
.animate-fog {
animation: fogMove 11s linear infinite alternate;
}
@keyframes fogMove {
0% { filter: blur(6px) opacity(0.7); }
100% { filter: blur(22px) opacity(1); }
}
.animate-slide-lr {
animation: slideLR 7s linear infinite alternate;
}
@keyframes slideLR {
0% { transform: translateX(0);}
60% { transform: translateX(25px);}
100% { transform: translateX(-12px);}
}
.animate-tiles-pulse {
animation: pulseTile 1.4s ease-in-out infinite alternate;
}
@keyframes pulseTile {
0% { filter: brightness(0.75); }
30% { filter: brightness(1.2); box-shadow: 0 2px 32px #FA28FF44;}
100% { filter: brightness(0.90); }
}
`}</style>
</div>
);
}
