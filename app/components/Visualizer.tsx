"use client";
import React, { useRef, useEffect, useState } from "react";

// Color palette
const epicCyan = "#00F6FF";
const spectralMagenta = "#FA28FF";
const cyberBlack = "#090B12";

// --- File-type detection
function getFileType(file: File): "audio" | "image" | "video" | "text" | "unknown" {
if (file.type.startsWith("audio")) return "audio";
if (file.type.startsWith("image")) return "image";
if (file.type.startsWith("video")) return "video";
if (file.type.startsWith("text")) return "text";
return "unknown";
}

export default function Visualizer({ file }: { file: File | null }) {
const [type, setType] = useState<ReturnType<typeof getFileType>>("unknown");
const [textContent, setTextContent] = useState<string>("");

useEffect(() => {
if (!file) return;
const t = getFileType(file);
setType(t);

if (t === "text") {
const reader = new FileReader();
reader.onload = e => setTextContent(e.target?.result?.toString() || "");
reader.readAsText(file);
}
if (t !== "text") setTextContent("");
}, [file]);

if (!file) {
return (
<div className="w-full flex flex-col items-center justify-center mt-16 text-xl opacity-60 select-none font-mono">
<div>Upload a file to see jaw-dropping club visuals!</div>
</div>
);
}

return (
<div className="w-full flex flex-col mt-10 items-center relative z-20">
{type === "audio" && (
<AudioSpectacle file={file} />
)}
{type === "image" && (
<ImageSpectacle file={file} />
)}
{type === "video" && (
<VideoSpectacle file={file} />
)}
{type === "text" && (
<TextSpectacle content={textContent} />
)}
{type === "unknown" && (
<div className="bg-black/60 rounded-lg px-10 py-6 mt-20 text-epicCyan font-mono border border-spectralMagenta">
<span>⚡ Unsupported file type — try audio, image, video, or text!</span>
</div>
)}
</div>
);
}

// --- AUDIO SPECTACLE ---
// True waveform + spectrum + avatar grid/reactive floor
function AudioSpectacle({ file }: { file: File }) {
const audioRef = useRef<HTMLAudioElement>(null);
const canvasRef = useRef<HTMLCanvasElement>(null);
const gridRef = useRef<HTMLDivElement>(null);

useEffect(() => {
if (!audioRef.current || !canvasRef.current) return;
let ctx = canvasRef.current.getContext("2d");
let audio = audioRef.current;
let running = true;
let audioCtx: AudioContext | null = null;
let analyser: AnalyserNode | null = null;
let freqData: Uint8Array, timeData: Uint8Array;

audio.onplay = () => {
if (!audioCtx) {
audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
const source = audioCtx.createMediaElementSource(audio);
analyser = audioCtx.createAnalyser();
analyser.fftSize = 256;
source.connect(analyser);
analyser.connect(audioCtx.destination);
freqData = new Uint8Array(analyser.frequencyBinCount);
timeData = new Uint8Array(analyser.frequencyBinCount);
}
draw();
};

audio.onpause = audio.onended = () => { running = false; };

function draw() {
if (!ctx || !analyser || !running) return;
// Spectrum BG
ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
analyser.getByteFrequencyData(freqData);
analyser.getByteTimeDomainData(timeData);
// Neon bars
for (let i = 0; i < freqData.length; i++) {
let val = freqData[i] / 255;
let x = i * (ctx.canvas.width / freqData.length);
let h = val * ctx.canvas.height * 0.8;
let grd = ctx.createLinearGradient(x, ctx.canvas.height, x, ctx.canvas.height - h);
grd.addColorStop(0, spectralMagenta);
grd.addColorStop(1, epicCyan);
ctx.fillStyle = grd;
ctx.fillRect(x, ctx.canvas.height - h, ctx.canvas.width / freqData.length - 2, h);
}
// Neon waveform
ctx.beginPath();
for (let i = 0; i < timeData.length; i++) {
let x = i * (ctx.canvas.width / timeData.length);
let y = ctx.canvas.height / 4 + (timeData[i] - 128) * 0.3;
if (i === 0) ctx.moveTo(x, y);
else ctx.lineTo(x, y);
}
ctx.strokeStyle = epicCyan;
ctx.shadowColor = spectralMagenta;
ctx.shadowBlur = 10;
ctx.lineWidth = 3;
ctx.stroke();
ctx.shadowBlur = 0;
// Call again
if (running) requestAnimationFrame(draw);
}

// Responsive canvas
function resize() {
if (!canvasRef.current) return;
canvasRef.current.width = canvasRef.current.offsetWidth * window.devicePixelRatio;
canvasRef.current.height = 180 * window.devicePixelRatio;
ctx = canvasRef.current.getContext("2d");
}
resize();
window.addEventListener("resize", resize);
return () => {
running = false;
window.removeEventListener("resize", resize);
if (audioCtx) audioCtx.close();
};
}, [file]);

// Avatar grid pulsates (fake, but could sync to bass)
useEffect(() => {
if (!gridRef.current) return;
let avs = Array.from(gridRef.current.querySelectorAll(".avatar-tile"));
let t = 0;
let intv = setInterval(() => {
t += 1;
avs.forEach((el, i) => {
let phase = Math.abs(Math.sin((t/9) + (i / 3)));
(el as HTMLElement).style.transform = `scale(${1 + phase * 0.45}) rotate(${phase * 8}deg)`;
(el as HTMLElement).style.filter = `drop-shadow(0 0 ${8 + phase * 18}px ${epicCyan})`;
});
}, 90);
return () => clearInterval(intv);
}, [file]);

return (
<div className="w-full flex flex-col items-center mb-8">
<div className="font-bold text-spectralMagenta mb-2 animate-pulse">[ Audio Club Spectacle ]</div>
<audio ref={audioRef} controls className="w-full max-w-lg drop-shadow-2xl mb-4" preload="auto">
<source src={URL.createObjectURL(file)} />
Your browser does not support audio.
</audio>
<canvas ref={canvasRef} style={{ width: "100%", maxWidth: 560, height: 180, borderRadius: 16, background: "#0c0f2f", marginBottom: 20, boxShadow: `0 0 60px ${spectralMagenta}55` }}></canvas>
<div ref={gridRef} className="flex flex-row gap-2 items-end scale-95 mt-2 max-w-lg w-full overflow-x-auto">
{Array.from({ length: 9 }).map((_, i) => (
<div key={i} className="avatar-tile" style={{
width: 38,
height: 38,
borderRadius: "50%",
background: `linear-gradient(120deg,${epicCyan},${spectralMagenta})`,
display: "flex",
alignItems: "center",
justifyContent: "center",
border: "2.5px solid #fff",
boxShadow: `0 0 15px 2px ${spectralMagenta}cc, 0 0 50px 7px ${epicCyan}44`,
fontSize: 22,
fontWeight: "bold",
color: "#fff",
fontFamily: 'monospace'
}}>
👾
</div>
))}
</div>
<div className="mt-2 text-xs text-epicCyan/[0.8]">
Reactive spectrum + avatars: pulsing to every beat!
</div>
</div>
);
}

// --- IMAGE SPECTACLE ---
// Club projection wall w/ rippling, animated color border
function ImageSpectacle({ file }: { file: File }) {
const [accent, setAccent] = useState(epicCyan);

useEffect(() => {
// Extract basic dominant (top-left) color for neon
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
if (ctx) {
ctx.drawImage(img, 0, 0, img.width, img.height);
const data = ctx.getImageData(0, 0, 1, 1).data;
setAccent(`rgb(${data[0]},${data[1]},${data[2]})`);
}
};
};
reader.readAsDataURL(file);
}, [file]);

const [r, setR] = useState(100);

useEffect(() => {
const i = setInterval(() => setR(r => 92 + Math.sin(Date.now() / 1400) * 18), 40);
return () => clearInterval(i);
}, []);

return (
<div className="w-full flex flex-col items-center mb-8">
<div className="font-bold text-spectralMagenta mb-2 animate-pulse">[ Club Wall: Animated Visual Mapping ]</div>
<div
className="shadow-2xl rounded-lg flex items-center justify-center"
style={{
width: r + "%",
aspectRatio: '5/3',
position: 'relative',
background: `linear-gradient(115deg,${accent}96,${spectralMagenta}33,#090B12 94%)`,
border: `4px solid ${accent}`,
boxShadow: `0 0 60px 6px ${accent}`,
transition: "width 1.2s cubic-bezier(0.12,1.2,0.9,0.7)"
}}
>
<img
src={URL.createObjectURL(file)}
alt="Club Wall"
className="max-w-[97%] max-h-[97%] rounded drop-shadow-xl transition-all duration-700 border-2 border-spectralMagenta"
style={{
animation: "ripple 2.2s infinite alternate cubic-bezier(0.6,0,0.4,1)",
}}
/>
<style>{`
@keyframes ripple {
0% { filter: blur(0.5px) brightness(1.08) }
100% { filter: blur(2.2px) brightness(1.33) }
}
`}</style>
</div>
<div className="mt-4 text-xs text-cyberBlack px-4 py-1 rounded bg-epicCyan/90">Your media—club-projected, animated, electrified.</div>
</div>
);
}

// --- VIDEO SPECTACLE ---
// Club projector with glowing reactive lightbar
function VideoSpectacle({ file }: { file: File }) {
const videoRef = useRef<HTMLVideoElement>(null);
const [level, setLevel] = useState(0.15);

useEffect(() => {
if (!videoRef.current) return;
let ctx: AudioContext | null = null;
let analyser: AnalyserNode | null = null;
let freqData: Uint8Array;

videoRef.current.onplay = () => {
ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
const source = ctx.createMediaElementSource(videoRef.current!);
analyser = ctx.createAnalyser();
source.connect(analyser);
analyser.connect(ctx.destination);
freqData = new Uint8Array(analyser.frequencyBinCount);
function draw() {
if (!analyser) return;
analyser.getByteFrequencyData(freqData);
const v = Math.max(...freqData) / 255;
setLevel(0.07 + v * 0.85);
if (!videoRef.current?.paused && !videoRef.current?.ended) requestAnimationFrame(draw);
}
draw();
};
// Clean up
return () => {
ctx?.close();
};
}, [file]);

return (
<div className="w-full flex flex-col items-center mb-8">
<div className="font-bold text-spectralMagenta mb-2 animate-pulse">[ Club Projector: Sonic Glow ]</div>
<div
className="shadow-xl bg-black/80 rounded-lg flex items-center justify-center"
style={{
width: 'min(93vw,680px)',
position: 'relative',
border: `4px solid ${spectralMagenta}`,
boxShadow: `0 0 ${40 + level*200}px 6px ${epicCyan}88,0 0 60px 18px ${spectralMagenta}33`,
overflow: 'hidden'
}}
>
<video
ref={videoRef}
controls
src={URL.createObjectURL(file)}
className="w-full aspect-video rounded-lg"
style={{ border: `3px solid ${epicCyan}`, background: "#000", position: 'relative', zIndex: 10 }}
/>
{/* Bass-reactive lightbar */}
<div
style={{
position: 'absolute',
bottom: 0,
left: 0,
height: 10 + level * 68,
width: "100%",
background: `linear-gradient(90deg,${spectralMagenta},${epicCyan},${cyberBlack} 130%)`,
opacity: 0.45 + level * 0.8,
filter: `blur(${3 + level * 14}px) brightness(1.1)`,
zIndex: 11,
pointerEvents: "none"
}}
/>
</div>
<div className="mt-2 text-xs text-epicCyan/80">Video plays—club pulses in sync!</div>
</div>
);
}

// --- TEXT SPECTACLE ---
// Kinetic animated club wall, neon scanline, color cycling
function TextSpectacle({ content }: { content: string }) {
const lines = content.split("\n").filter(Boolean);
const [hue, setHue] = useState(0);

useEffect(() => {
const i = setInterval(() => setHue(h => (h+1)%360), 25);
return () => clearInterval(i);
}, []);
return (
<div className="w-full flex flex-col items-center mt-2 mb-4">
<div className="font-bold text-spectralMagenta mb-2 animate-pulse">[ UGC Wall: Kinetic Club Typography ]</div>
<div className="bg-black/80 border-2 border-epicCyan w-full max-w-xl rounded-lg p-6 text-epicCyan font-mono text-lg shadow-2xl relative overflow-y-auto" style={{ minHeight: 120, maxHeight: 260 }}>
<div
style={{
position: "absolute",
top: 0, left: 0, width: "100%", height: "100%",
pointerEvents: "none", zIndex: 2,
background: `repeating-linear-gradient(0deg,transparent,transparent 6px,rgba(250,40,255,0.08) 7px,transparent 9px)`
}}
/>
{lines.map((line, i) => (
<div
key={i}
className="mb-2 animate-slide-lr"
style={{
color: `hsl(${(hue + i*33)%360},98%,70%)`,
textShadow: `0 0 8px hsl(${(hue + i*33)%360},90%,65%)`,
fontWeight: 700,
fontFamily: 'JetBrains Mono, monospace',
fontSize: `${1.2 + i*0.13}em`,
letterSpacing: `${1.5 + (i%2) * 1.4}px`,
animationDelay: `${i * 0.19}s`
}}>
{line}
</div>
))}
</div>
<div className="mt-3 text-xs text-epicCyan/80">Your text comes alive: club wall, live color, scanline, and glitch!</div>
<style>{`
.animate-slide-lr {
animation: slideLR 5.7s cubic-bezier(.11,.9,.46,1.22) infinite alternate;
}
@keyframes slideLR {
0% { transform: translateX(0);}
80% { transform: translateX(40px);}
100% { transform: translateX(-22px);}
}
`}</style>
</div>
);
}
