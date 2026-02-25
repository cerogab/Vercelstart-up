import svgPaths from "./svg-v547mazg1d";

export default function Ellipse() {
  return (
    <div className="relative size-full">
      <div className="absolute inset-[0_-4%_-7.84%_-4%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 108 110">
          <g filter="url(#filter0_d_7_438)" id="Ellipse 1">
            <ellipse cx="54" cy="51" fill="url(#paint0_linear_7_438)" rx="50" ry="51" />
            <path d={svgPaths.p11168a80} stroke="var(--stroke-0, black)" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="110" id="filter0_d_7_438" width="108" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_7_438" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_7_438" mode="normal" result="shape" />
            </filter>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_7_438" x1="54" x2="54" y1="0" y2="102">
              <stop stopColor="#F29B0F" />
              <stop offset="1" stopColor="#735E43" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}