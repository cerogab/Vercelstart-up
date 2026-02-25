import svgPaths from "../assets/svg-v547mazg1d";

export function Sun({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`} style={{ width: 220, height: 220 }}>
      <div className="absolute" style={{ inset: "0 -4% -7.84% -4%", width: "108%", height: "107.84%" }}>
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 108 110"
        >
          <g filter="url(#sun_filter0)" id="Ellipse 1">
            <ellipse cx="54" cy="51" fill="url(#sun_paint0_linear)" rx="50" ry="51" />
            <path d={svgPaths.p11168a80} stroke="rgba(0,0,0,0.25)" strokeWidth="0.5" />
          </g>
          <defs>
            <filter
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="110"
              id="sun_filter0"
              width="108"
              x="0"
              y="0"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                result="hardAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow" mode="normal" result="shape" />
            </filter>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="sun_paint0_linear"
              x1="54"
              x2="54"
              y1="0"
              y2="102"
            >
              <stop stopColor="#F29B0F" />
              <stop offset="1" stopColor="#735E43" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
