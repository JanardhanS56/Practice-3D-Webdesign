import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Float } from '@react-three/drei';
import { HerbalBottle } from './HerbalBottle';
import { CausticBackground } from './CausticBackground';
import { BotanicalParticles } from './BotanicalParticles';
import { ViewAngle } from '../../types';

interface Scene3DProps {
  viewAngle: ViewAngle;
  interactive?: boolean;
  onHotspotSelect?: (hotspot: { title: string; subtitle: string; desc: string }) => void;
}

const CanvasLoader: React.FC = () => (
  <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0A0705]/80 backdrop-blur-sm z-10">
    <div className="w-10 h-10 rounded-full border border-[#C78D4B]/30 border-t-[#E1B678] animate-spin" />
    <span className="mt-4 text-[10px] tracking-[0.25em] text-[#BCA891] uppercase font-medium">
      Extracting Botanical Shader...
    </span>
  </div>
);

export const Scene3D: React.FC<Scene3DProps> = ({ viewAngle, interactive = true, onHotspotSelect }) => {
  return (
    <div className="relative w-full h-full min-h-[480px] md:min-h-[640px] select-none">
      <Suspense fallback={<CanvasLoader />}>
        <Canvas
          camera={{ position: [0, 0.4, 7.2], fov: 42 }}
          // Capped DPR 1.25 per creative engine specification
          dpr={[1, 1.25]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          className="cursor-grab active:cursor-grabbing"
        >
          {/* Amber Caustic Noise Shader Backdrop */}
          <CausticBackground />

          {/* Studio Lighting */}
          <ambientLight intensity={0.7} color="#F6F0E8" />

          {/* Warm Key Light */}
          <directionalLight
            position={[5, 8, 6]}
            intensity={2.4}
            color="#FFF2DC"
            castShadow
          />

          {/* Warm Amber Fill Light */}
          <directionalLight
            position={[-6, 2, -3]}
            intensity={1.4}
            color="#C78D4B"
          />

          {/* Golden Rim Spotlight */}
          <spotLight
            position={[0, 6, -5]}
            intensity={3.8}
            color="#E1B678"
            angle={0.65}
            penumbra={0.8}
          />

          <pointLight position={[0, -3, 2]} intensity={0.8} color="#C78D4B" />

          {/* Floating Bottle Assembly */}
          <Float
            speed={1.8}
            rotationIntensity={0.15}
            floatIntensity={0.35}
            floatingRange={[-0.12, 0.12]}
          >
            <HerbalBottle
              viewAngle={viewAngle}
              interactive={interactive}
              onHotspotSelect={onHotspotSelect}
            />
          </Float>

          {/* Floating Golden Motes */}
          <BotanicalParticles />

          {/* Contact Shadow */}
          <ContactShadows
            position={[0, -2.55, 0]}
            opacity={0.85}
            scale={7.5}
            blur={2.5}
            far={4}
            color="#000000"
          />

          {/* Restricted Orbit Controls */}
          {interactive && (
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              maxPolarAngle={Math.PI / 2 + 0.15}
              minPolarAngle={Math.PI / 3}
              rotateSpeed={0.5}
              dampingFactor={0.05}
            />
          )}
        </Canvas>
      </Suspense>
    </div>
  );
};
