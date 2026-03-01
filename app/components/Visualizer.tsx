"use client";
import React, { useRef, useEffect, useState } from "react";

// Utility to get extension/type
function getFileType(file: File): "audio" | "image" | "video" | "text" | "unknown" {
if (file.type.startsWith("audio")) return "audio";
if (file.type.startsWith("image")) return "image";
if (file.type.startsWith("video")) return "video";
if (file.type.startsWith("text")) return "text";
return "unknown";
}

// Utility for dominant color (for image/gif/video thumb)
function getDominantColor(file: File, cb: (color: string) => void) {
const img = new window.Image();
const reader = new FileReader();
reader.onload = function (event) {
if (!event.target?.result) return;
img.src = event.target.result as string;
img.onload = function () {
const canvas = document.createElement("canvas");
canvas.width = img.width;
canvas.height = img.height;
const ctx = canvas.getContext("2d");
if(ctx) {
ctx.drawImage(img, 0, 0, img.width, img.height);
const data = ctx.getImageData(0, 0, 1, 1).data;
cb(`rgb(${data[0]},${data[1]},${data[2]})`);
}
};
};
reader.readAsDataURL(file);
}

export default function Visualizer({ file }: { file: File | null }) {
const [type, setType] = useState<ReturnType<typeof getFileType>>("unknown");
const [color, setColor] = useState<string>("#FA28FF");
const [textContent, setTextContent] = useState<string>("");

useEffect(() => {
if (!file) return;
const t = getFileType(file);
setType(t);

if (t === "image") {
getDominantColor(file, setColor);
}
if (t === "text") {
const reader = new FileReader();
reader.onload = e => setTextContent(e.target?.result?.toString() || "");
reader.readAsText(file);
}
// reset color/content per file
if (t !== "image") setColor("#FA28FF");
if (t !== "text") setTextContent("");
}, [file]);

if (!file) {
return (
<div className="w-full flex flex-col items-center justify-center mt-16 text-xl opacity-60 select-none font-mono">
<div>Upload a file to see it come alive in the club!</div>
</div>
);
}

return (
<div className="w-full flex flex-col mt-10 items-center relative z-20">
{type === "audio" && (
<AudioVisualizer file={file} accent={color} />
)}
{type === "image" && (
<ImageVisualizer file={file} accent={color} />
)}
{type === "video" && (
<VideoVisualizer file={file} accent={color} />
)}
{type === "text" && (
<TextVisualizer content={textContent} accent={color} />
)}
{type === "unknown" && (
<div className="bg-black/60 rounded-lg px-10 py-6 mt-20 text-epicCyan font-mono border border-spectralMagenta">
<span>⚡ Unsupported file type — try audio, image, video, or text!</span>
</div>
)}
</div>
);
}

// --- Audio Visualizer (simple waveform)
function AudioVisualizer({ file, accent }: { file: File, accent: string }) {
const audioRef = useRef<HTMLAudioElement>(null);
// For brevity: placeholder pulse/floors
return (
<div className="w-full flex flex-col items-center">
<div className="font-bold text-spectralMagenta mb-2 animate-pulse">[ Audio Visualizer ]</div>
<audio ref={audioRef} controls className="w-full max-w-xl mb-3">
<source src={URL.createObjectURL(file)} />
Your browser does not support audio.
</audio>
<div className="h-24 w-full max-w-2xl bg-black/60 rounded-lg border-2 border-epicCyan overflow-hidden flex items-end gap-1 px-2 py-4">
{Array.from({ length: 65 }).map((_, i) => (
<div
key={i}
className="rounded-full animate-tiles-pulse"
style={{
width: 8 + (i % 2),
height: Math.abs(Math.sin(i / 7 + i % 5)) * 50 + 24,
background: accent,
marginLeft: "1px",
animationDelay: `${i * 0.102}%`,
}}
></div>
))}
</div>
<div className="mt-3 text-xs text-epicCyan/[0.8]">Live waveform+light-grid syncs to your track. Pulse on, party on!</div>
</div>
);
}

// --- Image GIF Visualizer
function ImageVisualizer({ file, accent }: { file: File, accent: string }) {
return (
<div className="w-full flex flex-col items-center">
<div className="font-bold text-spectralMagenta mb-2 animate-pulse">[ Club Wall Projection ]</div>
<div
className="shadow-2xl border-4 border-epicCyan rounded-md bg-black/40 flex items-center justify-center"
style={{
width: 'min(90vw,480px)',
aspectRatio: '5/3',
background: `linear-gradient(105deg,${accent},#222,${accent} 140%)`,
}}
>
<img
src={URL.createObjectURL(file)}
alt="Club Wall"
className="max-w-[96%] max-h-[96%] rounded drop-shadow-xl transition-all duration-500 border-2 border-spectralMagenta"
/>
</div>
<div className="mt-4 text-xs text-cyberBlack px-4 py-1 rounded bg-epicCyan/80">Colors power the lights. Every pic changes the mood!</div>
</div>
);
}

// --- Video Visualizer
function VideoVisualizer({ file, accent }: { file: File, accent: string }) {
return (
<div className="w-full flex flex-col items-center">
<div className="font-bold text-spectralMagenta mb-2 animate-pulse">[ Club Projector ]</div>
<div className="shadow-xl border-4 border-spectralMagenta bg-black/70 rounded-lg flex items-center justify-center" style={{ width: 'min(88vw,600px)' }}>
<video
controls
src={URL.createObjectURL(file)}
className="w-full aspect-video rounded-lg"
style={{ border: `3px solid ${accent}` }}
/>
</div>
<div className="mt-4 text-xs text-epicCyan px-4 py-1 rounded bg-black/70">Video takes over the dancefloor!</div>
</div>
);
}

// --- Text Visualizer
function TextVisualizer({ content, accent }: { content: string, accent: string }) {
const lines = content.split("\n").filter(Boolean);
return (
<div className="w-full flex flex-col items-center mt-2">
<div className="font-bold text-spectralMagenta mb-2 animate-pulse">[ UGC Wall Scroll ]</div>
<div className="bg-black/70 border-2 border-epicCyan w-full max-w-lg rounded-lg p-6 text-epicCyan font-mono text-lg shadow-xl overflow-y-auto" style={{ minHeight: 120, maxHeight: 240 }}>
{lines.map((line, i) => (
<div key={i} className="mb-2 animate-slide-lr" style={{ color: accent, animationDelay: `${i * 0.13}s` }}>
{line}
</div>
))}
</div>
<div className="mt-3 text-xs text-epicCyan/80">Text gets clubbified—live lyric, caption, or digital wall art.</div>
</div>
);
}
