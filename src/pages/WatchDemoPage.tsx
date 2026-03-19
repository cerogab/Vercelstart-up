import { useRef, useState, useEffect } from "react";
import { Play, Pause, Maximize2, Volume2, VolumeX } from "lucide-react";

export function WatchDemoPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [vol, setVol] = useState(80);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onTime = () => {
      setCurrentTime(v.currentTime);
      if (v.duration) setProgress((v.currentTime / v.duration) * 100);
    };
    const onMeta = () => setDuration(v.duration);
    const onEnd = () => setPlaying(false);
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("loadedmetadata", onMeta);
    v.addEventListener("ended", onEnd);
    return () => {
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("loadedmetadata", onMeta);
      v.removeEventListener("ended", onEnd);
    };
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) { v.play().catch(() => setPlaying(false)); }
    else { v.pause(); }
  }, [playing]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = vol / 100;
      videoRef.current.muted = muted;
    }
  }, [vol, muted]);

  const toggle = () => setPlaying((p) => !p);

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    v.currentTime = ((e.clientX - rect.left) / rect.width) * v.duration;
  };

  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  const goFullscreen = () => {
    videoRef.current?.requestFullscreen?.();
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl tracking-tight mb-3">Watch Demo</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            See how Bram App helps you secure and scale your marketing — all from your phone.
          </p>
        </div>

        {/* Video player card */}
        <div className="rounded-xl overflow-hidden bg-black shadow-xl">
          {/* Video */}
          <div className="relative bg-black">
            <video
              ref={videoRef}
              className="w-full block"
              playsInline
              preload="metadata"
              poster="/home-page.jpg"
              onClick={toggle}
            >
              <source src="/app-preview.mov" type="video/mp4" />
            </video>

            {/* Center play overlay when paused */}
            {!playing && (
              <button
                onClick={toggle}
                className="absolute inset-0 flex items-center justify-center bg-black/30 group"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-orange-500/90 flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                  <Play className="w-7 h-7 md:w-8 md:h-8 fill-white text-white ml-1" />
                </div>
              </button>
            )}

            {/* HD badge */}
            <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm rounded-md px-2 py-0.5">
              <span className="text-xs text-white/80 font-medium">App Preview — HD 1080p</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-1 bg-white/10 cursor-pointer relative" onClick={seek}>
            <div
              className="h-full bg-orange-500 transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#111]">
            {/* Play + time */}
            <div className="flex items-center gap-3">
              <button onClick={toggle} className="w-8 h-8 rounded-full bg-orange-500 hover:bg-orange-400 flex items-center justify-center transition-colors">
                {playing ? <Pause className="w-3.5 h-3.5 fill-white text-white" /> : <Play className="w-3.5 h-3.5 fill-white text-white ml-0.5" />}
              </button>
              <span className="text-xs text-white/50 font-mono">
                {fmt(currentTime)} / {duration ? fmt(duration) : "--:--"}
              </span>
            </div>

            {/* Volume + fullscreen */}
            <div className="flex items-center gap-3">
              <button onClick={() => setMuted((m) => !m)} className="text-white/60 hover:text-white transition-colors">
                {muted || vol === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <input
                type="range" min={0} max={100}
                value={muted ? 0 : vol}
                onChange={(e) => { setVol(Number(e.target.value)); setMuted(false); }}
                className="w-16 h-1 cursor-pointer accent-orange-500"
              />
              <button onClick={goFullscreen} className="text-white/60 hover:text-white transition-colors">
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
