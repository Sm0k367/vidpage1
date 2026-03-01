"use client";
import React, { useRef, useState } from "react";
import Visualizer from "./components/Visualizer";

const epicCyan = "#00F6FF";
const spectralMagenta = "#FA28FF";
const cyberBlack = "#090B12";

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
{/* Moving neon fog/aura */}
<div
className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
style={{
background: `radial-gradient(ellipse at 60% 44%, ${spectralMagenta}33 0%, transparent 70%), radial-gradient(ellipse at 16% 82%, ${epicCyan}42 0%, transparent 90%)`,
filter: "blur(80px) brightness(0.98)",
opacity: 0.38,
}}
/>
<header className="flex items-center gap-4 px-8 pt-7 z-20">
{/* Use your PNG logo! */}
<img
src="/logo1.png"
alt="AI Lounge After Dark Logo"
width={56}
height={56}
className="drop-shadow-lg rounded-lg"
style={{ background: "#090B12" }}
/>
<h1 className="font-display text-5xl text-epicCyan drop-shadow-lg tracking-wider">
<span className="text-spectralMagenta">AI Lounge </span>
After Dark
</h1>
</header>

{/* Upload Box or File select */}
<div className="mt-10 mb-4 w-full max-w-2xl flex flex-col items-center z-20">
{!file && (
<label
htmlFor="file-upload"
className="cursor-pointer bg-black/70 border-2 border-epicCyan px-10 py-14 rounded-2xl font-mono text-lg text-epicCyan opacity-90 text-center hover:bg-epicCyan/10 transition-all duration-200 shadow-xl"
onClick={() => inputRef.current?.focus()}
>
<div className="mb-4 text-2xl">⬆️</div>
<div className="mb-2">Drop a file anywhere or click here to upload media</div>
<div className="text-xs text-spectralMagenta opacity-85 mt-2">
Supported: <b>audio, image, GIF, video, text—go wild!</b>
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

{/* Visualizer Spectacle */}
<Visualizer file={file} />

{/* Reset Button */}
{file && (
<button
className="mt-10 px-7 py-2 rounded font-bold border border-spectralMagenta bg-black/75 text-spectralMagenta hover:bg-epicCyan hover:text-cyberBlack transition"
onClick={() => setFile(null)}
>
Upload another file
</button>
)}
</div>
);
}
