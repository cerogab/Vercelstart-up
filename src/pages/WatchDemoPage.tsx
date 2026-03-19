import { useState, useEffect, useRef } from "react";
import {
  Play, Pause, Volume2, VolumeX, SkipBack, SkipForward,
  Maximize2, Settings, MonitorPlay,
} from "lucide-react";

const SCREENS = [
  { src: "/home-page.jpg", label: "Home Page" },
  { src: "/settings.png", label: "Settings" },
  { src: "/cal.png", label: "Annual Calculator" },
];

export function WatchDemoPage() {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [slide, setSlide] = useState(0);
  const [vol, setVol] = useState(80);
  const [muted, setMuted] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [quality, setQuality] = useState("1080p");
  const [speed, setSpeed] = useState("1×");
  const tick = useRef<ReturnType<typeof setInterval> | null>(null);
  const swap = useRef<ReturnType<typeof setInterval> | null>(null);
  const dur = 120;

  useEffect(() => {
    if (playing) {
      tick.current = setInterval(() => {
        setProgress(p => {
          if (p >= 100) { setPlaying(false); return 0; }
          return Math.min(p + 100 / dur / 10, 100);
        });
      }, 100);
      swap.current = setInterval(() => setSlide(i => (i + 1) % SCREENS.length), 4000);
    } else {
      if (tick.current) clearInterval(tick.current);
      if (swap.current) clearInterval(swap.current);
    }
    return () => {
      if (tick.current) clearInterval(tick.current);
      if (swap.current) clearInterval(swap.current);
    };
  }, [playing]);

  const sec = Math.floor((progress / 100) * dur);
  const mm = String(Math.floor(sec / 60)).padStart(2, "0");
  const ss = String(sec % 60).padStart(2, "0");
  const toggle = () => setPlaying(p => !p);

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl tracking-tight mb-3">Watch Demo</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            See how Bram App helps you secure and scale your marketing — all from your phone.
          </p>
        </div>

        {/* ── Flash Player Card ── */}
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: "linear-gradient(145deg,#0d0d1a 0%,#111827 50%,#0f172a 100%)",
            boxShadow: "0 30px 80px -15px rgba(0,0,0,.6),0 0 0 1px rgba(255,255,255,.05)",
          }}
        >
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 0%,rgba(232,116,0,.15) 0%,transparent 60%)" }} />

          {/* 16:9 viewport */}
          <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
            {SCREENS.map((s, i) => (
              <img key={s.src} src={s.src} alt={s.label}
                className="absolute inset-0 w-full h-full object-contain transition-opacity duration-1000"
                style={{ opacity: i === slide ? 1 : 0 }} />
            ))}

            {/* Top / bottom gradients */}
            <div className="absolute inset-x-0 top-0 h-20 pointer-events-none" style={{ background: "linear-gradient(to bottom,rgba(0,0,0,.5),transparent)" }} />
            <div className="absolute inset-x-0 bottom-0 h-28 pointer-events-none" style={{ background: "linear-gradient(to top,rgba(0,0,0,.7),transparent)" }} />

            {/* Top badges */}
            <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 pt-4 z-10">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md rounded-full px-3 py-1">
                  <MonitorPlay className="w-3.5 h-3.5 text-orange-400" />
                  <span className="text-[11px] text-white font-semibold">App Preview</span>
                </div>
                <div className="bg-orange-500/90 backdrop-blur-md rounded-full px-2.5 py-1">
                  <span className="text-[10px] text-white font-bold tracking-wide">HD 1080p</span>
                </div>
              </div>
              <div className="bg-black/50 backdrop-blur-md rounded-full px-3 py-1">
                <span className="text-[10px] text-white/70">{SCREENS[slide].label}</span>
              </div>
            </div>

            {/* Center play button (when paused) */}
            {!playing && (
              <button onClick={toggle} className="absolute inset-0 z-10 flex items-center justify-center group">
                <div className="w-20 h-20 rounded-full bg-orange-500/90 backdrop-blur-sm flex items-center justify-center shadow-2xl transition-all group-hover:scale-110 group-hover:bg-orange-500">
                  <Play className="w-8 h-8 fill-white text-white ml-1" />
                </div>
              </button>
            )}

            {/* Dots */}
            <div className="absolute bottom-16 left-0 right-0 flex justify-center gap-2 z-10">
              {SCREENS.map((_, i) => (
                <button key={i} onClick={() => setSlide(i)}>
                  <span className="block rounded-full transition-all"
                    style={{ width: i === slide ? 20 : 6, height: 6, background: i === slide ? "#e87400" : "rgba(255,255,255,.35)" }} />
                </button>
              ))}
            </div>

            {/* ── Bottom controls ── */}
            <div className="absolute bottom-0 left-0 right-0 z-10 px-5 pb-4">
              {/* Seek */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[11px] text-white/70 font-mono w-10 text-right">{mm}:{ss}</span>
                <div className="flex-1 relative h-1 bg-white/20 rounded-full group cursor-pointer">
                  <div className="absolute left-0 top-0 h-full bg-orange-500 rounded-full transition-all duration-100" style={{ width: `${progress}%` }} />
                  <input type="range" min={0} max={100} value={progress} onChange={e => setProgress(Number(e.target.value))} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  <div className="absolute top-1/2 w-3 h-3 bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg" style={{ left: `${progress}%`, transform: "translate(-50%,-50%)" }} />
                </div>
                <span className="text-[11px] text-white/70 font-mono w-10">02:00</span>
              </div>

              {/* Controls row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button onClick={() => setProgress(p => Math.max(0, p - 10))} className="text-white/60 hover:text-white transition-colors"><SkipBack className="w-4 h-4" /></button>
                  <button onClick={toggle} className="w-9 h-9 rounded-full bg-white/10 hover:bg-orange-500 flex items-center justify-center transition-all">
                    {playing ? <Pause className="w-4 h-4 fill-white text-white" /> : <Play className="w-4 h-4 fill-white text-white ml-0.5" />}
                  </button>
                  <button onClick={() => setProgress(p => Math.min(100, p + 10))} className="text-white/60 hover:text-white transition-colors"><SkipForward className="w-4 h-4" /></button>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: playing ? "#f97316" : "#6b7280", boxShadow: playing ? "0 0 6px rgba(249,115,22,.6)" : "none" }} />
                  <span className="text-[11px] text-white/50 font-medium">{playing ? "PLAYING" : "PAUSED"}</span>
                </div>

                <div className="flex items-center gap-3">
                  <button onClick={() => setMuted(m => !m)} className="text-white/60 hover:text-white transition-colors">
                    {muted || vol === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <div className="relative w-20 h-1 bg-white/15 rounded-full overflow-hidden hidden sm:block">
                    <div className="absolute h-full bg-white/60 rounded-full" style={{ width: `${muted ? 0 : vol}%` }} />
                    <input type="range" min={0} max={100} value={muted ? 0 : vol} onChange={e => { setVol(Number(e.target.value)); setMuted(false); }} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  </div>
                  <div className="relative">
                    <button onClick={() => setSettingsOpen(s => !s)} className="text-white/60 hover:text-white transition-colors"><Settings className="w-4 h-4" /></button>
                    {settingsOpen && (
                      <div className="absolute bottom-8 right-0 bg-gray-900/95 backdrop-blur-md border border-white/10 rounded-lg p-3 min-w-[140px] shadow-xl">
                        <p className="text-[10px] text-white/40 uppercase tracking-wider mb-2">Quality</p>
                        {["1080p","720p","480p"].map(q => (
                          <button key={q} onClick={() => setQuality(q)} className={`block w-full text-left text-[12px] px-2 py-1 rounded transition-colors ${quality === q ? "text-orange-400 bg-orange-500/10" : "text-white/70 hover:text-white hover:bg-white/5"}`}>
                            {q}{q === "1080p" ? " HD" : ""}
                          </button>
                        ))}
                        <p className="text-[10px] text-white/40 uppercase tracking-wider mt-2 mb-2">Speed</p>
                        {["0.5×","1×","1.5×","2×"].map(s => (
                          <button key={s} onClick={() => setSpeed(s)} className={`block w-full text-left text-[12px] px-2 py-1 rounded transition-colors ${speed === s ? "text-orange-400 bg-orange-500/10" : "text-white/70 hover:text-white hover:bg-white/5"}`}>
                            {s}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <button className="text-white/60 hover:text-white transition-colors"><Maximize2 className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          </div>

          {/* Now-playing footer */}
          <div className="flex items-center justify-between px-5 py-3 border-t border-white/5 bg-black/30">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-orange-500/20 border border-orange-500/30 flex items-center justify-center">
                <Play className="w-3.5 h-3.5 text-orange-400 fill-orange-400 ml-0.5" />
              </div>
              <div>
                <p className="text-[12px] text-white font-medium">Bram App — Full Demo</p>
                <p className="text-[10px] text-white/40">Marketing Suite · {quality} · {speed} speed</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-[10px] text-white/40">
              <span>{SCREENS[slide].label}</span>
              <span>{slide + 1} / {SCREENS.length}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
