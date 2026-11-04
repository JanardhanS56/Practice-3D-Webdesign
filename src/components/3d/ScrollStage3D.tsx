import React, { useRef, useMemo, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Html } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CausticBackground } from './CausticBackground';
import { BotanicalParticles } from './BotanicalParticles';

gsap.registerPlugin(ScrollTrigger);

interface ScrollStage3DProps {
  macerationHours?: number; // 0 to 336
}

const DynamicBottle: React.FC<{ macerationHours: number }> = ({ macerationHours }) => {
  const groupRef = useRef<THREE.Group>(null);
  const liquidMaterialRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  // Dynamic canvas texture for archival label
  const labelTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      const bgGrad = ctx.createLinearGradient(0, 0, 1024, 1024);
      bgGrad.addColorStop(0, '#17110C');
      bgGrad.addColorStop(1, '#0A0705');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 1024, 1024);

      ctx.strokeStyle = '#C78D4B';
      ctx.lineWidth = 8;
      ctx.strokeRect(40, 40, 944, 944);

      ctx.strokeStyle = 'rgba(225, 182, 120, 0.3)';
      ctx.lineWidth = 2;
      ctx.strokeRect(55, 55, 914, 914);

      ctx.fillStyle = '#E1B678';
      ctx.font = '600 68px "Cormorant Garamond", Georgia, serif';
      ctx.textAlign = 'center';
      ctx.letterSpacing = '6px';
      ctx.fillText('VEDAROOTS', 512, 210);

      ctx.fillStyle = '#BCA891';
      ctx.font = '500 20px "Manrope", sans-serif';
      ctx.letterSpacing = '7px';
      ctx.fillText('MAISON DE BOTANIQUE • KERALA', 512, 260);

      ctx.strokeStyle = '#C78D4B';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(340, 300);
      ctx.lineTo(684, 300);
      ctx.stroke();

      ctx.fillStyle = '#F6F0E8';
      ctx.font = '600 38px "Cormorant Garamond", Georgia, serif';
      ctx.fillText('ROOT REVIVAL ELIXIR', 512, 430);

      ctx.fillStyle = '#BCA891';
      ctx.font = '400 22px "Manrope", sans-serif';
      ctx.fillText('Taila Paka Vidhi • 336-Hour Copper Maceration', 512, 480);
      ctx.fillText('24 Cold-Macerated Ayurvedic Actives', 512, 520);

      ctx.fillStyle = '#C78D4B';
      ctx.font = '500 22px "Manrope", sans-serif';
      ctx.letterSpacing = '4px';
      ctx.fillText('EDITION BATCH NO. 04', 512, 680);

      ctx.fillStyle = '#E1B678';
      ctx.font = 'bold 26px "Manrope", sans-serif';
      ctx.fillText('100 ML • 3.38 FL OZ', 512, 735);

      ctx.strokeStyle = '#C78D4B';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(512, 850, 42, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = '#E1B678';
      ctx.font = 'bold 15px "Manrope", sans-serif';
      ctx.fillText('KESHYA', 512, 855);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = 16;
    texture.needsUpdate = true;
    return texture;
  }, []);

  // Geometry profiles
  const bottleGeometry = useMemo(() => {
    const points: THREE.Vector2[] = [];
    points.push(new THREE.Vector2(0.01, -2.4));
    points.push(new THREE.Vector2(1.15, -2.4));
    points.push(new THREE.Vector2(1.22, -2.3));
    points.push(new THREE.Vector2(1.25, -2.1));
    points.push(new THREE.Vector2(1.25, 0.8));
    points.push(new THREE.Vector2(1.2, 1.2));
    points.push(new THREE.Vector2(0.85, 1.65));
    points.push(new THREE.Vector2(0.55, 1.95));
    points.push(new THREE.Vector2(0.52, 2.5));
    points.push(new THREE.Vector2(0.6, 2.55));
    points.push(new THREE.Vector2(0.6, 2.75));
    points.push(new THREE.Vector2(0.48, 2.75));
    points.push(new THREE.Vector2(0.48, 2.5));
    return new THREE.LatheGeometry(points, 64);
  }, []);

  const liquidGeometry = useMemo(() => {
    const points: THREE.Vector2[] = [];
    points.push(new THREE.Vector2(0.01, -2.35));
    points.push(new THREE.Vector2(1.1, -2.35));
    points.push(new THREE.Vector2(1.18, -2.1));
    points.push(new THREE.Vector2(1.18, 0.7));
    points.push(new THREE.Vector2(1.12, 1.1));
    points.push(new THREE.Vector2(0.8, 1.5));
    points.push(new THREE.Vector2(0.48, 1.7));
    points.push(new THREE.Vector2(0.01, 1.7));
    return new THREE.LatheGeometry(points, 48);
  }, []);

  // Calculate liquid color and opacity based on maceration hours (0 to 336)
  const macerationProgress = Math.min(1, Math.max(0, macerationHours / 336));

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Read normalized scroll progress from HTML attribute or window scroll
    const scrollY = window.scrollY;
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const scrollRatio = Math.min(1, Math.max(0, scrollY / maxScroll));

    // Dynamic scroll-driven camera choreography:
    // Chapter 1 (0.0 to 0.25): Centered Hero Bottle
    // Chapter 2 (0.25 to 0.50): Maceration inspection (zooms into liquid, shifts left)
    // Chapter 3 (0.50 to 0.75): Herbarium reveal (rotates to show herbs, shifts right)
    // Chapter 4 (0.75 to 1.0): Dispensary dock
    let targetX = 0;
    let targetY = Math.sin(state.clock.elapsedTime * 0.8) * 0.05;
    let targetRotY = state.clock.elapsedTime * 0.15;
    let targetRotX = 0;
    let targetScale = 1.0;

    if (scrollRatio < 0.22) {
      // Hero: centered, subtle mouse tracking
      const mouseX = (state.pointer.x * Math.PI) / 8;
      const mouseY = (state.pointer.y * Math.PI) / 12;
      targetX = 0;
      targetY = 0;
      targetRotY += mouseX;
      targetRotX = -mouseY;
      targetScale = 1.05;
    } else if (scrollRatio < 0.48) {
      // Maceration: Shift left, zoomed on dropper and liquid
      const progress = (scrollRatio - 0.22) / 0.26;
      targetX = THREE.MathUtils.lerp(0, -1.8, progress);
      targetY = THREE.MathUtils.lerp(0, -0.6, progress);
      targetRotY = THREE.MathUtils.lerp(0, 0.4, progress);
      targetRotX = THREE.MathUtils.lerp(0, 0.2, progress);
      targetScale = THREE.MathUtils.lerp(1.05, 1.35, progress);
    } else if (scrollRatio < 0.76) {
      // Herbarium: Shift right, rotate 180 to reveal suspended herbs
      const progress = (scrollRatio - 0.48) / 0.28;
      targetX = THREE.MathUtils.lerp(-1.8, 1.8, progress);
      targetY = THREE.MathUtils.lerp(-0.6, 0.2, progress);
      targetRotY = THREE.MathUtils.lerp(0.4, Math.PI * 1.1, progress);
      targetRotX = THREE.MathUtils.lerp(0.2, -0.1, progress);
      targetScale = THREE.MathUtils.lerp(1.35, 1.15, progress);
    } else {
      // Dispensary: Docked gracefully
      targetX = 0;
      targetY = 0.1;
      targetRotY = state.clock.elapsedTime * 0.1;
      targetRotX = 0;
      targetScale = 0.95;
    }

    groupRef.current.position.x = THREE.MathUtils.damp(groupRef.current.position.x, targetX, 3.5, delta);
    groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, targetY, 3.5, delta);
    groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetRotY, 3.5, delta);
    groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetRotX, 3.5, delta);

    const s = THREE.MathUtils.damp(groupRef.current.scale.x, targetScale, 3.5, delta);
    groupRef.current.scale.set(s, s, s);

    // Dynamic liquid darkening according to maceration hours
    if (liquidMaterialRef.current) {
      // Transitions from raw light virgin oil (#D97706) to deep dark mahogany copper (#8A4213)
      const lightOil = new THREE.Color('#D97706');
      const agedOil = new THREE.Color('#782E09');
      liquidMaterialRef.current.color.lerpColors(lightOil, agedOil, macerationProgress);
      liquidMaterialRef.current.emissiveIntensity = 0.15 + macerationProgress * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* 1. Glass Bottle */}
      <mesh geometry={bottleGeometry} castShadow receiveShadow>
        <meshPhysicalMaterial
          roughness={0.06}
          transmission={0.92}
          thickness={0.9}
          ior={1.52}
          color="#3A281A"
          attenuationColor="#C78D4B"
          attenuationDistance={1.4}
          transparent={true}
          opacity={1}
          metalness={0.03}
          clearcoat={1.0}
          clearcoatRoughness={0.04}
        />
      </mesh>

      {/* 2. Liquid */}
      <mesh geometry={liquidGeometry}>
        <meshPhysicalMaterial
          ref={liquidMaterialRef}
          color="#C78D4B"
          roughness={0.12}
          transmission={0.6}
          thickness={1.6}
          ior={1.46}
          attenuationColor="#8A5723"
          attenuationDistance={0.8}
          transparent={true}
          opacity={0.95}
          metalness={0.08}
          emissive="#261A11"
          emissiveIntensity={0.25}
        />
      </mesh>

      {/* 3. Label */}
      <mesh position={[0, -0.6, 1.255]}>
        <planeGeometry args={[1.7, 2.2]} />
        <meshStandardMaterial
          map={labelTexture}
          roughness={0.45}
          metalness={0.15}
          transparent={true}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 4. Pipette */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 3.8, 16]} />
        <meshPhysicalMaterial
          transmission={0.96}
          roughness={0.02}
          ior={1.5}
          transparent={true}
          opacity={0.85}
          color="#F6F0E8"
        />
      </mesh>

      {/* Pipette Droplet */}
      <mesh position={[0, -1.55, 0]}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial
          color="#E1B678"
          roughness={0.1}
          metalness={0.4}
          emissive="#C78D4B"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* 5. Aged Copper & Gold Collar */}
      <mesh position={[0, 2.65, 0]}>
        <cylinderGeometry args={[0.62, 0.62, 0.35, 32]} />
        <meshStandardMaterial
          color="#C78D4B"
          metalness={0.95}
          roughness={0.25}
        />
      </mesh>
      <mesh position={[0, 2.85, 0]}>
        <cylinderGeometry args={[0.58, 0.58, 0.15, 32]} />
        <meshStandardMaterial
          color="#E1B678"
          metalness={0.9}
          roughness={0.3}
        />
      </mesh>

      {/* 6. Rubber Bulb */}
      <mesh position={[0, 3.3, 0]}>
        <sphereGeometry args={[0.52, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.7]} />
        <meshStandardMaterial color="#120D09" roughness={0.85} metalness={0.05} />
      </mesh>
      <mesh position={[0, 3.1, 0]}>
        <cylinderGeometry args={[0.5, 0.52, 0.4, 32]} />
        <meshStandardMaterial color="#120D09" roughness={0.85} metalness={0.05} />
      </mesh>

      {/* 7. Suspended Botanicals on the reverse side */}
      <group rotation={[0, Math.PI, 0]}>
        {[
          { pos: [-0.4, -1.2, 0.3], scale: 0.35, type: 'leaf' },
          { pos: [0.5, -0.6, -0.3], scale: 0.4, type: 'leaf' },
          { pos: [-0.3, 0.2, -0.4], scale: 0.18, type: 'amla' },
          { pos: [0.3, -1.4, 0.2], scale: 0.22, type: 'amla' },
        ].map((item, idx) => (
          <mesh
            key={idx}
            position={item.pos as [number, number, number]}
            scale={item.scale}
          >
            {item.type === 'leaf' ? (
              <coneGeometry args={[0.5, 1.2, 5]} />
            ) : (
              <sphereGeometry args={[0.7, 16, 16]} />
            )}
            <meshStandardMaterial
              color={item.type === 'leaf' ? '#2e5b33' : '#6b7a33'}
              roughness={0.5}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
};

export const ScrollStage3D: React.FC<ScrollStage3DProps> = ({ macerationHours = 336 }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-10 select-none">
      <Canvas
        camera={{ position: [0, 0.4, 7.2], fov: 42 }}
        dpr={[1, 1.25]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <CausticBackground />
        <ambientLight intensity={0.7} color="#F6F0E8" />
        <directionalLight position={[5, 8, 6]} intensity={2.4} color="#FFF2DC" />
        <directionalLight position={[-6, 2, -3]} intensity={1.4} color="#C78D4B" />
        <spotLight position={[0, 6, -5]} intensity={3.8} color="#E1B678" angle={0.65} penumbra={0.8} />
        <pointLight position={[0, -3, 2]} intensity={0.8} color="#C78D4B" />

        <DynamicBottle macerationHours={macerationHours} />
        <BotanicalParticles />

        <ContactShadows position={[0, -2.55, 0]} opacity={0.85} scale={7.5} blur={2.5} far={4} color="#000000" />
      </Canvas>
    </div>
  );
};
