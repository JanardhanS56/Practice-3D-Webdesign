import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Float } from '@react-three/drei';
import { HerbalBottle } from './HerbalBottle';
import { BotanicalParticles } from './BotanicalParticles';
import { ViewAngle } from '../../types';

interface Scene3DProps {
  viewAngle: ViewAngle;
  interactive?: boolean;
}

const CanvasLoader: React.FC = () => (
  <div className="absolute inset-0 flex flex-col items-center justify-center bg-botanical-950/60 backdrop-blur-sm z-10">
    <div className="w-12 h-12 rounded-full border-2 border-gold-500/20 border-t-gold-500 animate-spin" />
    <span className="mt-4 text-xs tracking-widest text-gold-400 uppercase font-medium">Brewing 3D Elixir...</span>
  </div>
);

export const Scene3D: React.FC<Scene3DProps> = ({ viewAngle, interactive = true }) => {
  return (
    <div className="relative w-full h-full min-h-[460px] md:min-h-[620px] select-none">
      <Suspense fallback={<CanvasLoader />}>
        <Canvas
          camera={{ position: [0, 0.4, 7.2], fov: 42 }}
          dpr={[1, 2]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          className="cursor-grab active:cursor-grabbing"
        >
          {/* Studio Botanical Lighting */}
          <ambientLight intensity={0.8} color="#e6f2e8" />
          
          {/* Warm Golden Key Light */}
          <directionalLight
            position={[5, 8, 6]}
            intensity={2.2}
            color="#fff4d4"
            castShadow
            shadow-mapSize={[1024, 1024]}
          />

          {/* Deep Green/Teal Fill Light */}
          <directionalLight
            position={[-6, 2, -3]}
            intensity={1.2}
            color="#759d77"
          />

          {/* Amber Rim Light to highlight liquid refraction and glass edge */}
          <spotLight
            position={[0, 6, -5]}
            intensity={3.5}
            color="#f59e0b"
            angle={0.6}
            penumbra={0.8}
          />

          {/* Bottom subtle uplight */}
          <pointLight position={[0, -3, 2]} intensity={0.9} color="#e5b23d" />

          {/* Floating Subtle Ambient System */}
          <Float
            speed={2}
            rotationIntensity={0.2}
            floatIntensity={0.4}
            floatingRange={[-0.15, 0.15]}
          >
            <HerbalBottle viewAngle={viewAngle} interactive={interactive} />
          </Float>

          {/* Floating Leaves and Golden Particles */}
          <BotanicalParticles />

          {/* Realistic Soft Contact Shadow underneath bottle */}
          <ContactShadows
            position={[0, -2.55, 0]}
            opacity={0.7}
            scale={8}
            blur={2.4}
            far={4}
            color="#040905"
          />

          {/* Smooth Orbit Controls with restricted elevation */}
          {interactive && (
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              maxPolarAngle={Math.PI / 2 + 0.15}
              minPolarAngle={Math.PI / 3}
              rotateSpeed={0.6}
              dampingFactor={0.05}
            />
          )}
        </Canvas>
      </Suspense>
    </div>
  );
};
