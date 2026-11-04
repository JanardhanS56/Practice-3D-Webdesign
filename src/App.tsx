import React, { useState } from 'react';
import { Scene3D } from './components/3d/Scene3D';
import { ViewAngle } from './types';

export default function App() {
  const [viewAngle, setViewAngle] = useState<ViewAngle>('showcase');

  return (
    <div className="min-h-screen bg-botanical-950 text-botanical-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-4xl h-[500px] relative">
        <Scene3D viewAngle={viewAngle} />
      </div>
      <div className="flex gap-4 mt-6">
        {(['showcase', 'label', 'dropper', 'ingredients'] as ViewAngle[]).map((mode) => (
          <button
            key={mode}
            onClick={() => setViewAngle(mode)}
            className="px-4 py-2 rounded-full border border-gold-500/30 bg-botanical-900 text-gold-300 capitalize text-sm hover:border-gold-400"
          >
            {mode}
          </button>
        ))}
      </div>
    </div>
  );
}

