import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const vibrantColors = [
  { name: "Sunset", from: "#e87400", to: "#f59e0b" },
  { name: "Ocean", from: "#0ea5e9", to: "#3b82f6" },
  { name: "Berry", from: "#d946ef", to: "#8b5cf6" },
  { name: "Forest", from: "#22c55e", to: "#10b981" },
  { name: "Cherry", from: "#ef4444", to: "#f43f5e" },
  { name: "Midnight", from: "#6366f1", to: "#8b5cf6" },
];

export function ColorSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Transform vertical scroll into horizontal movement
  // Move the slider horizontally based on scroll position
  const x = useTransform(scrollY, [0, 800], ["0%", "-30%"]);
  
  // Vibrant colors based on the orange theme and complementary colors
  const vibrantColors = [
    { name: "Sunset", from: "#e87400", to: "#f59e0b" },
    { name: "Ocean", from: "#0ea5e9", to: "#3b82f6" },
    { name: "Berry", from: "#d946ef", to: "#8b5cf6" },
    { name: "Forest", from: "#22c55e", to: "#10b981" },
    { name: "Cherry", from: "#ef4444", to: "#f43f5e" },
    { name: "Midnight", from: "#6366f1", to: "#8b5cf6" },
  ];
  
  // Duplicate for seamless look
  const cards = [...vibrantColors, ...vibrantColors, ...vibrantColors];

  return (
    <div 
      ref={containerRef} 
      className="relative w-full py-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10 pointer-events-none" />
      
      <motion.div 
        style={{ x }}
        className="flex gap-8 px-4 w-max"
      >
        {cards.map((color, index) => (
          <div
            key={index}
            className="relative w-64 h-80 rounded-3xl overflow-hidden shadow-2xl shrink-0 group hover:-translate-y-2 transition-transform duration-300"
          >
            <div 
              className="absolute inset-0 bg-gradient-to-br"
              style={{ 
                backgroundImage: `linear-gradient(135deg, ${color.from}, ${color.to})` 
              }}
            />
            
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-white transition-opacity duration-300" />
            
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-2xl font-bold mb-1">{color.name}</h3>
              <div className="flex gap-2 mt-2">
                <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-md" />
                <div className="w-6 h-6 rounded-full bg-white/40 backdrop-blur-md" />
              </div>
            </div>
            
            {/* Glossy effect */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
