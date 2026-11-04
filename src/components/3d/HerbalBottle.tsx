import React, { useRef, useMemo, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { ViewAngle } from '../../types';

interface HerbalBottleProps {
  viewAngle: ViewAngle;
  interactive?: boolean;
  onHotspotSelect?: (hotspot: { title: string; subtitle: string; desc: string }) => void;
}

export const HerbalBottle: React.FC<HerbalBottleProps> = ({
  viewAngle,
  interactive = true,
  onHotspotSelect,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const liquidRef = useRef<THREE.Mesh>(null);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  // Generate dynamic canvas texture for refined archival maison label
  const labelTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      // Dark archival parchment
      const bgGrad = ctx.createLinearGradient(0, 0, 1024, 1024);
      bgGrad.addColorStop(0, '#17110C');
      bgGrad.addColorStop(1, '#0A0705');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 1024, 1024);

      // Fine golden rule border
      ctx.strokeStyle = '#C78D4B';
      ctx.lineWidth = 8;
      ctx.strokeRect(40, 40, 944, 944);

      ctx.strokeStyle = 'rgba(225, 182, 120, 0.3)';
      ctx.lineWidth = 2;
      ctx.strokeRect(55, 55, 914, 914);

      // Editorial Header
      ctx.fillStyle = '#E1B678';
      ctx.font = '600 68px "Cormorant Garamond", Georgia, serif';
      ctx.textAlign = 'center';
      ctx.letterSpacing = '6px';
      ctx.fillText('VEDAROOTS', 512, 210);

      ctx.fillStyle = '#BCA891';
      ctx.font = '500 20px "Manrope", sans-serif';
      ctx.letterSpacing = '7px';
      ctx.fillText('MAISON DE BOTANIQUE • KERALA', 512, 260);

      // Thin divider
      ctx.strokeStyle = '#C78D4B';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(340, 300);
      ctx.lineTo(684, 300);
      ctx.stroke();

      // Formula Title
      ctx.fillStyle = '#F6F0E8';
      ctx.font = '600 38px "Cormorant Garamond", Georgia, serif';
      ctx.fillText('ROOT REVIVAL ELIXIR', 512, 430);

      ctx.fillStyle = '#BCA891';
      ctx.font = '400 22px "Manrope", sans-serif';
      ctx.fillText('Taila Paka Vidhi • 336-Hour Copper Maceration', 512, 480);
      ctx.fillText('24 Cold-Macerated Ayurvedic Actives', 512, 520);

      // Provenance notes
      ctx.fillStyle = '#C78D4B';
      ctx.font = '500 22px "Manrope", sans-serif';
      ctx.letterSpacing = '4px';
      ctx.fillText('EDITION BATCH NO. 04', 512, 680);

      ctx.fillStyle = '#E1B678';
      ctx.font = 'bold 26px "Manrope", sans-serif';
      ctx.fillText('100 ML • 3.38 FL OZ', 512, 735);

      // Seal
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

  // Procedural apothecary bottle profile
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

  // Inner amber liquid
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

  // Hotspots metadata
  const hotspots = [
    {
      id: 1,
      pos: [0, 3.2, 0.6] as [number, number, number],
      title: 'Precision Gold Pipette',
      subtitle: '0.5ml Scalp Dosing',
      desc: 'Formed from medical borosilicate glass with knurled aged-copper collar.',
    },
    {
      id: 2,
      pos: [0.95, 1.3, 0.8] as [number, number, number],
      title: 'Copper Cauldron Proof',
      subtitle: '336-Hour Low Heat',
      desc: 'Simmered over slow flame according to authentic Charaka Samhita Taila Paka Vidhi.',
    },
    {
      id: 3,
      pos: [-0.9, -1.2, 0.9] as [number, number, number],
      title: 'Cold Macerated Bhringraj',
      subtitle: 'King of Hair (Keshya)',
      desc: 'Awakens dormant anagen follicles and curbs active shedding by 64%.',
    },
  ];

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    let targetRotY = state.clock.elapsedTime * 0.18;
    let targetRotX = 0;
    let targetPosY = 0;
    let targetScale = 1;

    if (viewAngle === 'label') {
      targetRotY = 0;
      targetRotX = 0.04;
      targetPosY = 0.15;
      targetScale = 1.05;
    } else if (viewAngle === 'dropper') {
      targetRotY = -0.35;
      targetRotX = 0.32;
      targetPosY = -1.1;
      targetScale = 1.25;
    } else if (viewAngle === 'ingredients') {
      targetRotY = Math.PI * 0.7;
      targetRotX = -0.08;
      targetPosY = 0.35;
      targetScale = 1.15;
    }

    if (interactive && viewAngle === 'showcase') {
      const mouseX = (state.pointer.x * Math.PI) / 9;
      const mouseY = (state.pointer.y * Math.PI) / 14;
      groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetRotY + mouseX, 3, delta);
      groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetRotX - mouseY, 3, delta);
    } else {
      groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetRotY, 3, delta);
      groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetRotX, 3, delta);
    }

    groupRef.current.position.y = THREE.MathUtils.damp(
      groupRef.current.position.y,
      targetPosY + Math.sin(state.clock.elapsedTime * 1.0) * 0.05,
      3,
      delta
    );

    const s = THREE.MathUtils.damp(groupRef.current.scale.x, targetScale, 3, delta);
    groupRef.current.scale.set(s, s, s);
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* 1. Outer Glass Bottle with deep amber-obsidian physical transmission */}
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

      {/* 2. Inner Viscous Amber Herbal Oil Liquid */}
      <mesh ref={liquidRef} geometry={liquidGeometry}>
        <meshPhysicalMaterial
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

      {/* 3. Archival Maison Label on the front */}
      <mesh position={[0, -0.6, 1.255]} rotation={[0, 0, 0]}>
        <planeGeometry args={[1.7, 2.2]} />
        <meshStandardMaterial
          map={labelTexture}
          roughness={0.45}
          metalness={0.15}
          transparent={true}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 4. Glass Dropper Pipette inside the bottle */}
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

      {/* Pipette golden droplet tip */}
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

      {/* 6. Obsidian Dropper Rubber Bulb */}
      <mesh position={[0, 3.3, 0]}>
        <sphereGeometry args={[0.52, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.7]} />
        <meshStandardMaterial
          color="#120D09"
          roughness={0.85}
          metalness={0.05}
        />
      </mesh>
      <mesh position={[0, 3.1, 0]}>
        <cylinderGeometry args={[0.5, 0.52, 0.4, 32]} />
        <meshStandardMaterial
          color="#120D09"
          roughness={0.85}
          metalness={0.05}
        />
      </mesh>

      {/* 7. Interactive Tasting / Provenance Hotspots */}
      {hotspots.map((h) => (
        <group key={h.id} position={h.pos}>
          <Html distanceFactor={12} position={[0, 0, 0]}>
            <div
              data-hotspot-label={h.subtitle}
              onClick={() => {
                setActiveHotspot(h.id);
                if (onHotspotSelect) {
                  onHotspotSelect(h);
                }
              }}
              className="relative cursor-pointer group"
            >
              <div className="w-5 h-5 rounded-full border border-[#E1B678] bg-[#0A0705]/85 flex items-center justify-center transition-transform hover:scale-125 shadow-lg shadow-black/80">
                <div className="w-1.5 h-1.5 rounded-full bg-[#C78D4B] animate-ping" />
              </div>

              {activeHotspot === h.id && (
                <div className="absolute left-6 top-1/2 -translate-y-1/2 w-48 p-3 rounded-lg bg-[#17110C]/95 border border-[#C78D4B]/40 text-left backdrop-blur-md shadow-2xl animate-fadeIn pointer-events-auto">
                  <span className="text-[9px] uppercase font-bold text-[#E1B678] tracking-widest block">
                    {h.subtitle}
                  </span>
                  <strong className="text-xs font-display text-[#F6F0E8] block mt-0.5">
                    {h.title}
                  </strong>
                  <p className="text-[10px] text-[#BCA891] mt-1 leading-snug">
                    {h.desc}
                  </p>
                </div>
              )}
            </div>
          </Html>
        </group>
      ))}
    </group>
  );
};
