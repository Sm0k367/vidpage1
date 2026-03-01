"use client";
import React, { useRef, useState } from "react";
import Visualizer from "./components/Visualizer";

const accent = "#FA28FF";

// Club logo
function ClubLogo() {
return (
<svg width={48} height={48} viewBox="0 0 48 48" fill="none">
<defs>
<radialGradient id="clubGradient" cx="50%" cy="50%" r="70%" gradientTransform="rotate(30)">
<stop offset="0%" stopColor={accent} />
<stop offset="100%" stopColor="#00F6FF" />
</radialGradient>
</defs>
<circle cx={24} cy={24} r={22} fill="url(#clubGradient)" stroke="#090B12" strokeWidth={2} />
<ellipse cx={24} cy={18} rx={11} ry={7} fill="#fff" fillOpacity={0.12} />
<text x={24} y={32} textAnchor="middle" fontSize={17} fontFamily="monospace" fill="#090B12" fontWeight="bold">
AI💿
</text>
</svg>
);
}

export default function Home() {
const [file, setFile] = useState<File | null>(null);
const inputRef = useRef<HTMLInputElement | null>(null);

function onFile(e: React.ChangeEvent<HTMLInputElement>) {
if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
}
function onDrop(e: React.DragEvent) {
e.preventDefault();
if (e.dataTransfer.files && e.dataTransfer.files[0]) setFile(e.dataTransfer.files[0]);
}

return (
<div
className="relative min-h-screen bg-black text-epicCyan font-body overflow-hidden flex flex-col items-center"
onDrop={onDrop}
onDragOver={e => e.preventDefault()}
>
<header className="flex items-center gap-4 px-8 pt-7 z-20">
<ClubLogo />
<h1 className="font-display text-5xl text-epicCyan drop-shadow-lg">
<span className="text-spectralMagenta">AI Lounge </span>
After Dark
</h1>
</header>

{/* Upload Box or File select */}
<div className="mt-10 mb-4 w-full max-w-2xl flex flex-col items-center">
{!file && (
<label
htmlFor="file-upload"
className="cursor-pointer bg-black/70 border-2 border-epicCyan px-10 py-14 rounded-2xl font-mono text-lg text-epicCyan opacity-90 text-center hover:bg-epicCyan/10 transition-all duration-200 shadow-xl"
onClick={() => inputRef.current?.focus()}
>
<div className="mb-4 text-2xl">⬆️</div>
<div className="mb-2">Drop a file anywhere or click here to upload media</div>
<div className="text-xs text-spectralMagenta opacity-80 mt-2">
We support: <b>audio, image, GIF, video, text — anything!</b>
</div>
<input
id="file-upload"
ref={inputRef}
type="file"
accept="audio/*,image/*,video/*,text/*"
className="hidden"
onChange={onFile}
/>
</label>
)}
</div>

{/* Visualizer */}
<Visualizer file={file} />

{/* Reset Button */}
{file && (
<button
className="mt-8 px-6 py-2 rounded font-bold border border-spectralMagenta bg-black/70 text-spectralMagenta hover:bg-epicCyan hover:text-cyberBlack transition"
onClick={() => setFile(null)}
>
Upload another file
</button>
)}
</div>
);
}
