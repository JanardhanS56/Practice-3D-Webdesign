import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

interface CurtainLoaderProps {
  onComplete: () => void;
}

export const CurtainLoader: React.FC<CurtainLoaderProps> = ({ onComplete }) => {
  const [active, setActive] = useState(true);
  const curtainRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setActive(false);
        onComplete();
      },
    });

    // Animate counter from 0 to 100
    const counterObj = { val: 0 };
    tl.to(counterObj, {
      val: 100,
      duration: 1.4,
      ease: 'expo.inOut',
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.innerText = `${Math.floor(counterObj.val)}%`;
        }
      },
    });

    // Fade and split text reveal
    tl.fromTo(
      textRef.current,
      { opacity: 0, y: 30, letterSpacing: '0.4em' },
      { opacity: 1, y: 0, letterSpacing: '0.2em', duration: 1.0, ease: 'expo.out' },
      0.2
    );

    // Curtain wipe upwards
    tl.to(
      curtainRef.current,
      {
        yPercent: -100,
        duration: 1.2,
        ease: 'expo.inOut',
      },
      1.8
    );

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  if (!active) return null;

  return (
    <div
      ref={curtainRef}
      className="fixed inset-0 z-50 bg-[#0A0705] flex flex-col justify-between p-8 sm:p-14 border-b border-[#C78D4B]/30 select-none"
    >
      <div className="flex items-center justify-between text-xs tracking-[0.25em] text-[#BCA891] uppercase">
        <span>VEDAROOTS • MAISON DE BOTANIQUE</span>
        <span>EDITION 2026</span>
      </div>

      <div ref={textRef} className="text-center my-auto">
        <span className="text-xs uppercase tracking-[0.3em] text-[#C78D4B] block mb-4">
          Taila Paka Vidhi • 336-Hour Copper Maceration
        </span>
        <h1 className="text-4xl sm:text-7xl font-display font-medium text-amber-metallic tracking-tight">
          Awakening Botanical Vitality
        </h1>
      </div>

      <div className="flex items-end justify-between border-t border-[#261A11] pt-6 text-xs text-[#BCA891] tracking-widest uppercase">
        <span>COLD MACERATION EN ROUTE</span>
        <span ref={counterRef} className="font-mono text-base font-bold text-[#C78D4B]">
          0%
        </span>
      </div>
    </div>
  );
};

