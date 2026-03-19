import { useState, useEffect, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward } from "lucide-react";

const APP_SCREENSHOTS = [
  { src: "/home-page.jpg", label: "Home" },
  { src: "/settings.png", label: "Settings" },
  { src: "/cal.png", label: "Annual Calculator" },
];

const SLIDE_INTERVAL = 3500; // ms each screenshot shows while playing

function FlashPlayerScreen() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const [volume, setVolume] = useState(70);
  const [muted, setMuted] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const slideRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const duration = 120; // 2 min demo

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return Math.min(p + 100 / duration / 10, 100);
        });
      }, 100);
      slideRef.current = setInterval(() => {
        setSlideIndex((i) => (i + 1) % APP_SCREENSHOTS.length);
      }, SLIDE_INTERVAL);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (slideRef.current) clearInterval(slideRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (slideRef.current) clearInterval(slideRef.current);
    };
  }, [isPlaying]);

  const currentSec = Math.floor((progress / 100) * duration);
  const mm = Math.floor(currentSec / 60).toString().padStart(2, "0");
  const ss = (currentSec % 60).toString().padStart(2, "0");

  return (
    <div className="w-full h-full flex flex-col text-white overflow-hidden bg-[#101828]">
      {/* Status bar */}
      <div className="flex items-center justify-between px-5 pt-3 pb-1 shrink-0">
        <span className="text-[10px] font-semibold">9:41</span>
        <div className="flex items-center gap-0.5">
          <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
          <div className="w-1.5 h-2 bg-white/60 rounded-sm" />
          <div className="w-1.5 h-2.5 bg-white/80 rounded-sm" />
          <div className="w-1.5 h-3 bg-white rounded-sm" />
        </div>
      </div>

      {/* App header */}
      <div className="px-4 py-2 flex items-center gap-2 border-b border-white/10 shrink-0">
        <div className="w-6 h-6 rounded-lg bg-orange-500 flex items-center justify-center shadow-sm">
          <Play className="w-3 h-3 fill-white text-white ml-0.5" />
        </div>
        <span className="text-xs font-semibold tracking-wide">Bram Player</span>
      </div>

      {/* Video frame — app preview screenshots */}
      <div
        className="mx-3 mt-3 rounded-xl overflow-hidden bg-black relative shrink-0"
        style={{ aspectRatio: "16/9" }}
      >
        {/* Screenshot slides */}
        {APP_SCREENSHOTS.map((shot, i) => (
          <img
            key={shot.src}
            src={shot.src}
            alt={shot.label}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
            style={{ opacity: i === slideIndex ? 1 : 0 }}
          />
        ))}
        {/* Overlay: dark tint + play button */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.28)" }}
        >
          <button
            onClick={() => setIsPlaying((p) => !p)}
            className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all hover:bg-orange-500/80 hover:scale-105 hover:border-orange-400"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-white text-white" />
            ) : (
              <Play className="w-4 h-4 fill-white text-white ml-0.5" />
            )}
          </button>
        </div>
        {/* Screen label */}
        <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-sm rounded-md px-1.5 py-0.5">
          <span className="text-[8px] text-white/80 font-medium">{APP_SCREENSHOTS[slideIndex].label}</span>
        </div>
        {/* Dot indicators */}
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
          {APP_SCREENSHOTS.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlideIndex(i)}
              className="w-1 h-1 rounded-full transition-all"
              style={{ background: i === slideIndex ? "#e87400" : "rgba(255,255,255,0.4)" }}
            />
          ))}
        </div>
        {/* Progress bar at bottom of video */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/15">
          <div
            className="h-full bg-orange-500 transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Track info */}
      <div className="px-4 mt-3 shrink-0">
        <p className="text-[11px] font-semibold leading-tight">Bram App — Full Demo</p>
        <p className="text-[9px] text-gray-400 mt-0.5">Marketing Suite · 2:00 min</p>
      </div>

      {/* Seek bar */}
      <div className="px-3 mt-2 shrink-0">
        <input
          type="range"
          min={0}
          max={100}
          value={progress}
          onChange={(e) => setProgress(Number(e.target.value))}
          className="w-full h-1 cursor-pointer rounded-full"
          style={{ accentColor: "#e87400" }}
        />
        <div className="flex justify-between text-[9px] text-gray-500 mt-0.5">
          <span>
            {mm}:{ss}
          </span>
          <span>02:00</span>
        </div>
      </div>

      {/* Playback controls */}
      <div className="flex items-center justify-center gap-6 mt-2 shrink-0">
        <button
          onClick={() => setProgress((p) => Math.max(0, p - 10))}
          className="text-gray-500 hover:text-gray-300 transition-colors"
        >
          <SkipBack className="w-4 h-4" fill="currentColor" />
        </button>
        <button
          onClick={() => setIsPlaying((p) => !p)}
          className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center shadow-lg hover:bg-orange-400 transition-all hover:scale-105"
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 fill-white text-white" />
          ) : (
            <Play className="w-4 h-4 fill-white text-white ml-0.5" />
          )}
        </button>
        <button
          onClick={() => setProgress((p) => Math.min(100, p + 10))}
          className="text-gray-500 hover:text-gray-300 transition-colors"
        >
          <SkipForward className="w-4 h-4" fill="currentColor" />
        </button>
      </div>

      {/* Volume */}
      <div className="flex items-center gap-2 px-4 mt-3 shrink-0">
        <button
          onClick={() => setMuted((m) => !m)}
          className="text-gray-500 hover:text-gray-300 transition-colors"
        >
          {muted || volume === 0 ? (
            <VolumeX className="w-3.5 h-3.5" />
          ) : (
            <Volume2 className="w-3.5 h-3.5" />
          )}
        </button>
        <input
          type="range"
          min={0}
          max={100}
          value={muted ? 0 : volume}
          onChange={(e) => {
            setVolume(Number(e.target.value));
            setMuted(false);
          }}
          className="flex-1 h-1 cursor-pointer"
          style={{ accentColor: "#e87400" }}
        />
      </div>

      {/* Settings / info bar */}
      <div className="flex items-center justify-between px-4 mt-4 pt-2.5 border-t border-white/10 shrink-0">
        <div className="flex items-center gap-1">
          <span
            className="w-1.5 h-1.5 rounded-full bg-orange-500 inline-block"
            style={isPlaying ? { animation: "pulse 1s infinite" } : {}}
          />
          <span className="text-[9px] text-orange-400 font-medium">
            {isPlaying ? "PLAYING" : "PAUSED"}
          </span>
        </div>
        <span className="text-[9px] text-gray-500">HD · 1080p</span>
        <span className="text-[9px] text-gray-500">1× speed</span>
        <span className="text-[9px] text-gray-500">CC</span>
      </div>
    </div>
  );
}

export function FlashPlayerCard() {
  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Outer card — matches the Figma workspace-background card */}
      <div
        className="relative w-full rounded-2xl overflow-hidden flex items-center justify-center"
        style={{
          height: "520px",
          background:
            "linear-gradient(135deg, #1c1c2e 0%, #16213e 45%, #0f3460 100%)",
          boxShadow:
            "0 25px 60px -10px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)",
        }}
      >
        {/* Warm orange glow (bottom-left, like desk lamp) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 15% 90%, rgba(232,116,0,0.4) 0%, transparent 55%)",
          }}
        />
        {/* Cool accent glow (top-right) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 85% 10%, rgba(99,102,241,0.12) 0%, transparent 50%)",
          }}
        />

        {/* iPhone 15 Mockup */}
        <div
          className="relative z-10"
          style={{ transform: "scale(0.55)", transformOrigin: "center" }}
        >
          <div
            className="relative bg-black rounded-[60px] w-[390px] h-[844px]"
            style={{
              boxShadow:
                "0px 30px 70px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.12)",
            }}
          >
            {/* Screen inner frame */}
            <div className="absolute left-[12px] top-[12px] w-[366px] h-[820px] rounded-[48px] overflow-hidden bg-[#101828]">
              {/* Dynamic Island notch */}
              <div className="absolute bg-black h-[37px] left-[108px] rounded-bl-[20px] rounded-br-[20px] top-0 w-[126px] z-20" />
              {/* Flash player content */}
              <div className="absolute inset-0 pt-[37px]">
                <FlashPlayerScreen />
              </div>
            </div>

            {/* Left side buttons */}
            <div className="absolute bg-[#1a1a1a] h-[30px] left-[-2px] rounded-bl-[6px] rounded-tl-[6px] top-[120px] w-[3px]" />
            <div className="absolute bg-[#1a1a1a] h-[60px] left-[-2px] rounded-bl-[6px] rounded-tl-[6px] top-[170px] w-[3px]" />
            <div className="absolute bg-[#1a1a1a] h-[60px] left-[-2px] rounded-bl-[6px] rounded-tl-[6px] top-[240px] w-[3px]" />
            {/* Right side button */}
            <div className="absolute bg-[#1a1a1a] h-[90px] right-[-2px] rounded-br-[6px] rounded-tr-[6px] top-[200px] w-[3px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
