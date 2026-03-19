import { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

const SLIDES = [
  { src: "/home-page.jpg", label: "Home Page" },
  { src: "/settings.png", label: "Settings" },
  { src: "/cal.png", label: "Annual Calculator" },
];

export function WatchDemoPage() {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [slide, setSlide] = useState(0);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const swapRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const duration = 120;

  useEffect(() => {
    if (playing) {
      tickRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) { setPlaying(false); return 0; }
          return Math.min(p + 100 / duration / 10, 100);
        });
      }, 100);
      swapRef.current = setInterval(() => setSlide((i) => (i + 1) % SLIDES.length), 4000);
    } else {
      if (tickRef.current) clearInterval(tickRef.current);
      if (swapRef.current) clearInterval(swapRef.current);
    }
    return () => {
      if (tickRef.current) clearInterval(tickRef.current);
      if (swapRef.current) clearInterval(swapRef.current);
    };
  }, [playing]);

  const sec = Math.floor((progress / 100) * duration);
  const mm = String(Math.floor(sec / 60)).padStart(2, "0");
  const ss = String(sec % 60).padStart(2, "0");
  const toggle = () => setPlaying((p) => !p);

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl tracking-tight mb-3">Watch Demo</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            See how Bram App helps you secure and scale your marketing — all from your phone.
          </p>
        </div>

        {/* Player wrapper */}
        <div className="rounded-xl overflow-hidden bg-black shadow-xl">
          {/* Image area — full picture, natural aspect ratio */}
          <div className="relative bg-black">
            {SLIDES.map((s, i) => (
              <img
                key={s.src}
                src={s.src}
                alt={s.label}
                className={`w-full transition-opacity duration-700 ${i === 0 ? "block" : "absolute inset-0"}`}
                style={{
                  opacity: i === slide ? 1 : 0,
                  objectFit: "contain",
                }}
              />
            ))}

            {/* Big center play button when paused */}
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

            {/* Slide label */}
            <div className="absolute top-3 left-3 bg-black/60 rounded-md px-2 py-0.5">
              <span className="text-xs text-white/80">{SLIDES[slide].label}</span>
            </div>

            {/* Slide counter */}
            <div className="absolute top-3 right-3 bg-black/60 rounded-md px-2 py-0.5">
              <span className="text-xs text-white/60">{slide + 1} / {SLIDES.length}</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-1 bg-white/10 cursor-pointer relative" onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setProgress(((e.clientX - rect.left) / rect.width) * 100);
          }}>
            <div
              className="h-full bg-orange-500 transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#111]">
            <div className="flex items-center gap-3">
              <button onClick={() => { setSlide((i) => (i - 1 + SLIDES.length) % SLIDES.length); setProgress((p) => Math.max(0, p - 10)); }} className="text-white/60 hover:text-white transition-colors">
                <SkipBack className="w-4 h-4" />
              </button>
              <button onClick={toggle} className="w-8 h-8 rounded-full bg-orange-500 hover:bg-orange-400 flex items-center justify-center transition-colors">
                {playing ? <Pause className="w-3.5 h-3.5 fill-white text-white" /> : <Play className="w-3.5 h-3.5 fill-white text-white ml-0.5" />}
              </button>
              <button onClick={() => { setSlide((i) => (i + 1) % SLIDES.length); setProgress((p) => Math.min(100, p + 10)); }} className="text-white/60 hover:text-white transition-colors">
                <SkipForward className="w-4 h-4" />
              </button>
            </div>

            <span className="text-xs text-white/50 font-mono">{mm}:{ss} / 02:00</span>

            {/* Dot navigation */}
            <div className="flex items-center gap-1.5">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSlide(i)}
                  className="w-2 h-2 rounded-full transition-all"
                  style={{ background: i === slide ? "#e87400" : "rgba(255,255,255,.25)" }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
