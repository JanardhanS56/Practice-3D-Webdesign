import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [hotspotText, setHotspotText] = useState<string | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('button, a, input, select, [data-cursor-interactive]');
        const hotspot = target.closest('[data-hotspot-label]');

        setIsHovered(!!interactive);
        if (hotspot) {
          setHotspotText(hotspot.getAttribute('data-hotspot-label'));
        } else {
          setHotspotText(null);
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className="fixed pointer-events-none z-50 transition-transform duration-75 ease-out hidden lg:block"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        left: 0,
        top: 0,
      }}
    >
      <div
        className={`relative -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 ease-out flex items-center justify-center ${
          hotspotText
            ? 'w-24 h-24 border border-[#E1B678] bg-[#0A0705]/80 backdrop-blur-sm'
            : isHovered
            ? 'w-12 h-12 bg-[#C78D4B] mix-blend-difference'
            : 'w-3.5 h-3.5 bg-[#C78D4B] mix-blend-difference'
        }`}
      >
        {hotspotText && (
          <span className="text-[9px] font-sans font-bold tracking-widest text-[#E1B678] uppercase text-center px-1">
            {hotspotText}
          </span>
        )}
      </div>
    </div>
  );
};
