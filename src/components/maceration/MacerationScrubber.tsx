import React from 'react';
import { Flame, Clock, ShieldCheck, Sparkles } from 'lucide-react';

interface MacerationScrubberProps {
  hours: number;
  onHoursChange: (h: number) => void;
}

export const MacerationScrubber: React.FC<MacerationScrubberProps> = ({ hours, onHoursChange }) => {
  const milestones = [
    {
      hour: 0,
      title: 'Raw Infusion',
      temp: '24°C',
      desc: 'Raw hand-crushed Bhringraj, Amla, and wild rosemary leaves submerged into virgin sesame lipid matrix.',
      status: 'Initial Cold Stage',
    },
    {
      hour: 72,
      title: 'Thermal Activation',
      temp: '42°C',
      desc: 'Solid copper cauldron low simmer begins. Plant cell walls rupture, liberating hydrolyzable tannins.',
      status: 'Enzymatic Release',
    },
    {
      hour: 168,
      title: 'Polyphenol Binding',
      temp: '44°C',
      desc: 'Wedelolactone and carnosic acid chemically complex with omega-9 lipids, creating permanent bioavailability.',
      status: 'Active Complexation',
    },
    {
      hour: 336,
      title: 'Peak Keshya Maturity',
      temp: '40°C',
      desc: 'Taila Paka Vidhi complete. All moisture evaporated; dark amber viscosity reached with 88% clinical potency.',
      status: 'Finished Elixir',
    },
  ];

  const currentMilestone =
    milestones.slice().reverse().find((m) => hours >= m.hour) || milestones[0];

  return (
    <section className="relative w-full min-h-screen py-24 px-6 sm:px-12 lg:px-16 flex flex-col justify-center z-20 pointer-events-none">
      <div className="max-w-xl ml-auto pointer-events-auto space-y-8 bg-[#0A0705]/90 border border-[#C78D4B]/30 p-8 sm:p-12 shadow-2xl backdrop-blur-md">
        {/* Header */}
        <div className="space-y-2 border-b border-[#261A11] pb-6">
          <div className="flex items-center gap-3">
            <span className="w-6 h-[1px] bg-[#C78D4B]" />
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C78D4B] font-bold">
              ACT II • COPPER MACERATION TIMELINE
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-medium text-[#F6F0E8]">
            The 336-Hour <span className="text-amber-metallic italic">Copper Cauldron</span>
          </h2>
          <p className="text-xs text-[#BCA891] leading-relaxed">
            Drag the time scrubber to observe the real-time thermal transformation of the herbal elixir inside the 3D bottle.
          </p>
        </div>

        {/* Real-time Metric Readout */}
        <div className="grid grid-cols-3 gap-4 py-3 bg-[#17110C] border border-[#261A11] px-5 text-center">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#BCA891] block">
              Elapsed Time
            </span>
            <span className="text-2xl font-mono font-bold text-[#E1B678]">
              {hours}h
            </span>
          </div>
          <div className="border-x border-[#261A11]">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#BCA891] block">
              Cauldron Temp
            </span>
            <span className="text-2xl font-mono font-bold text-[#E1B678]">
              {currentMilestone.temp}
            </span>
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#BCA891] block">
              Phase
            </span>
            <span className="text-xs font-mono font-bold text-[#C78D4B] mt-1 block truncate">
              {currentMilestone.status}
            </span>
          </div>
        </div>

        {/* Interactive Scrubber Control */}
        <div className="space-y-3">
          <div className="flex justify-between text-xs font-mono text-[#BCA891]">
            <span>000h (Cold Seed)</span>
            <span className="text-[#E1B678] font-bold">Scrub Hours: {hours}h / 336h</span>
            <span>336h (Matured)</span>
          </div>
          <input
            type="range"
            min={0}
            max={336}
            step={6}
            value={hours}
            onChange={(e) => onHoursChange(Number(e.target.value))}
            className="w-full h-2 bg-[#17110C] rounded-none appearance-none cursor-pointer accent-[#C78D4B] border border-[#261A11]"
          />
        </div>

        {/* Milestone Buttons */}
        <div className="grid grid-cols-4 gap-2">
          {milestones.map((m) => (
            <button
              key={m.hour}
              onClick={() => onHoursChange(m.hour)}
              className={`py-2 px-1 text-[10px] font-mono uppercase tracking-wider border transition-all ${
                hours >= m.hour
                  ? 'bg-[#17110C] border-[#C78D4B] text-[#E1B678] font-bold'
                  : 'bg-[#0A0705] border-[#261A11] text-[#BCA891]/50'
              }`}
            >
              {m.hour}h Milestone
            </button>
          ))}
        </div>

        {/* Active Phase Explanation */}
        <div className="p-4 bg-[#17110C] border-l-2 border-[#C78D4B] text-xs text-[#BCA891] space-y-1">
          <strong className="text-[#F6F0E8] font-display text-base block font-medium">
            {currentMilestone.title}
          </strong>
          <p className="leading-relaxed">{currentMilestone.desc}</p>
        </div>
      </div>
    </section>
  );
};
