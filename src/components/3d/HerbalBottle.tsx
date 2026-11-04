import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { ViewAngle } from '../../types';

interface HerbalBottleProps {
  viewAngle: ViewAngle;
  interactive?: boolean;
}

export const HerbalBottle: React.FC<HerbalBottleProps> = ({ viewAngle, interactive = true }) => {
  const groupRef = useRef<THREE.Group>(null);
  const liquidRef = useRef<THREE.Mesh>(null);
  const herbsGroupRef = useRef<THREE.Group>(null);
  const bubblesGroupRef = useRef<THREE.Group>(null);

  // Generate dynamic canvas texture for high-res bottle label
  const labelTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      // Background parchment tone with subtle gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 1024, 1024);
      bgGrad.addColorStop(0, '#102213');
      bgGrad.addColorStop(1, '#08140a');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 1024, 1024);

      // Gold border
      ctx.strokeStyle = '#e5b23d';
      ctx.lineWidth = 14;
      ctx.strokeRect(40, 40, 944, 944);

      // Inner thin border
      ctx.strokeStyle = 'rgba(245, 207, 116, 0.4)';
      ctx.lineWidth = 4;
      ctx.strokeRect(60, 60, 904, 904);

      // Brand name
      ctx.fillStyle = '#f5cf74';
      ctx.font = 'bold 64px "Playfair Display", Georgia, serif';
      ctx.textAlign = 'center';
      ctx.letterSpacing = '8px';
      ctx.fillText('VEDAROOTS', 512, 220);

      // Tagline
      ctx.fillStyle = '#cbd8cb';
      ctx.font = '24px "Plus Jakarta Sans", sans-serif';
      ctx.letterSpacing = '6px';
      ctx.fillText('BOTANICAL HAIR ELIXIR', 512, 275);

      // Decorative divider
      ctx.strokeStyle = '#e5b23d';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(312, 320);
      ctx.lineTo(712, 320);
      ctx.stroke();

      // Botanical icon leaf representation
      ctx.fillStyle = '#759d77';
      ctx.font = '42px sans-serif';
      ctx.fillText('🌿', 512, 385);

      // Product description
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 36px "Playfair Display", Georgia, serif';
      ctx.fillText('ROOT REVIVAL FORMULA', 512, 460);

      ctx.fillStyle = '#a3bda4';
      ctx.font = '26px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('Enriched with 24 Cold-Pressed Ayurvedic Herbs', 512, 510);
      ctx.fillText('Bhringraj • Amla • Brahmi • Rosemary', 512, 555);

      // Volume & Badges
      ctx.fillStyle = '#f5cf74';
      ctx.font = 'bold 28px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('100 ML • 3.38 FL OZ', 512, 700);

      ctx.fillStyle = '#cbd8cb';
      ctx.font = 'italic 22px "Playfair Display", serif';
      ctx.fillText('100% Pure • Vegan • Silicon-Free', 512, 760);
      ctx.fillText('Crafted in Small Batches', 512, 800);

      // Bottom seal
      ctx.strokeStyle = '#e5b23d';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(512, 870, 35, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = '#e5b23d';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText('AYUR', 512, 875);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = 16;
    texture.needsUpdate = true;
    return texture;
  }, []);

  // Procedural geometry profile for apothecary glass bottle
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

  // Inner liquid geometry profile
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

  // Suspended herbs data
  const herbsData = useMemo(() => {
    return [
      { pos: [-0.4, -1.2, 0.3], rot: [0.4, 0.8, -0.2], scale: 0.35, type: 'leaf' },
      { pos: [0.5, -0.6, -0.3], rot: [-0.6, 1.2, 0.5], scale: 0.4, type: 'leaf' },
      { pos: [-0.2, 0.4, -0.4], rot: [0.8, -0.5, 0.3], scale: 0.3, type: 'leaf' },
      { pos: [0.35, -1.6, 0.2], rot: [0.2, 0.3, 0.9], scale: 0.38, type: 'leaf' },
      { pos: [-0.45, -1.7, -0.2], rot: [0, 0, 0], scale: 0.18, type: 'amla' },
      { pos: [0.3, -0.2, 0.4], rot: [0, 0, 0], scale: 0.16, type: 'amla' },
      { pos: [0.1, -1.4, -0.4], rot: [0, 0, 0], scale: 0.2, type: 'amla' },
    ];
  }, []);

  // Suspended micro bubbles
  const bubblesData = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => ({
      x: (Math.random() - 0.5) * 1.5,
      y: -2.0 + Math.random() * 3.4,
      z: (Math.random() - 0.5) * 1.5,
      size: 0.02 + Math.random() * 0.04,
      speed: 0.2 + Math.random() * 0.4,
      offset: i * 0.5,
    }));
  }, []);

  // Animation frame loop
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Smooth transition to target view angle
    let targetRotY = state.clock.elapsedTime * 0.25;
    let targetRotX = 0;
    let targetPosY = 0;
    let targetScale = 1;

    if (viewAngle === 'label') {
      targetRotY = 0;
      targetRotX = 0.05;
      targetPosY = 0.2;
      targetScale = 1.05;
    } else if (viewAngle === 'dropper') {
      targetRotY = -0.4;
      targetRotX = 0.35;
      targetPosY = -1.2;
      targetScale = 1.2;
    } else if (viewAngle === 'ingredients') {
      targetRotY = Math.PI * 0.75 + Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      targetRotX = -0.1;
      targetPosY = 0.4;
      targetScale = 1.15;
    }

    if (interactive && viewAngle === 'showcase') {
      // Subtly track mouse
      const mouseX = (state.pointer.x * Math.PI) / 8;
      const mouseY = (state.pointer.y * Math.PI) / 12;
      groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetRotY + mouseX, 3, delta);
      groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetRotX - mouseY, 3, delta);
    } else {
      groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetRotY, 3, delta);
      groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetRotX, 3, delta);
    }

    groupRef.current.position.y = THREE.MathUtils.damp(
      groupRef.current.position.y,
      targetPosY + Math.sin(state.clock.elapsedTime * 1.2) * 0.06,
      3,
      delta
    );

    const s = THREE.MathUtils.damp(groupRef.current.scale.x, targetScale, 3, delta);
    groupRef.current.scale.set(s, s, s);

    // Subtle drift for suspended botanicals
    if (herbsGroupRef.current) {
      herbsGroupRef.current.children.forEach((child, idx) => {
        child.position.y += Math.sin(state.clock.elapsedTime * 0.8 + idx) * 0.0008;
        child.rotation.y += 0.002 * (idx % 2 === 0 ? 1 : -1);
      });
    }

    // Gentle upward shimmer for micro bubbles
    if (bubblesGroupRef.current) {
      bubblesGroupRef.current.children.forEach((bubble, idx) => {
        bubble.position.y += 0.003;
        if (bubble.position.y > 1.6) {
          bubble.position.y = -2.1;
        }
      });
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* 1. Outer Glass Bottle */}
      <mesh geometry={bottleGeometry} castShadow receiveShadow>
        <meshPhysicalMaterial
          roughness={0.05}
          transmission={0.92}
          thickness={0.8}
          ior={1.52}
          color="#a3c4a8"
          attenuationColor="#234526"
          attenuationDistance={1.2}
          transparent={true}
          opacity={1}
          metalness={0.02}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
        />
      </mesh>

      {/* 2. Inner Golden Herbal Oil */}
      <mesh ref={liquidRef} geometry={liquidGeometry}>
        <meshPhysicalMaterial
          color="#d97706"
          roughness={0.15}
          transmission={0.65}
          thickness={1.5}
          ior={1.45}
          attenuationColor="#b45309"
          attenuationDistance={0.8}
          transparent={true}
          opacity={0.94}
          metalness={0.05}
          emissive="#78350f"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* 3. Parchment & Gold Label on the front */}
      <mesh position={[0, -0.6, 1.255]} rotation={[0, 0, 0]}>
        <planeGeometry args={[1.7, 2.2]} />
        <meshStandardMaterial
          map={labelTexture}
          roughness={0.5}
          metalness={0.1}
          transparent={true}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 4. Glass Dropper Pipette inside the bottle */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 3.8, 16]} />
        <meshPhysicalMaterial
          transmission={0.95}
          roughness={0.02}
          ior={1.5}
          transparent={true}
          opacity={0.85}
          color="#ffffff"
        />
      </mesh>
      {/* Pipette golden droplet tip */}
      <mesh position={[0, -1.55, 0]}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial
          color="#f59e0b"
          roughness={0.1}
          metalness={0.2}
          emissive="#d97706"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* 5. Gold Collar Ring */}
      <mesh position={[0, 2.65, 0]}>
        <cylinderGeometry args={[0.62, 0.62, 0.35, 32]} />
        <meshStandardMaterial
          color="#e5b23d"
          metalness={0.92}
          roughness={0.2}
        />
      </mesh>
      {/* Gold ribbed grip detail */}
      <mesh position={[0, 2.85, 0]}>
        <cylinderGeometry args={[0.58, 0.58, 0.15, 32]} />
        <meshStandardMaterial
          color="#f5cf74"
          metalness={0.85}
          roughness={0.3}
        />
      </mesh>

      {/* 6. Soft Dropper Rubber Bulb */}
      <mesh position={[0, 3.3, 0]}>
        <sphereGeometry args={[0.52, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.7]} />
        <meshStandardMaterial
          color="#0f2613"
          roughness={0.8}
          metalness={0.05}
        />
      </mesh>
      <mesh position={[0, 3.1, 0]}>
        <cylinderGeometry args={[0.5, 0.52, 0.4, 32]} />
        <meshStandardMaterial
          color="#0f2613"
          roughness={0.8}
          metalness={0.05}
        />
      </mesh>

      {/* 7. Suspended Ayurvedic Botanicals inside oil */}
      <group ref={herbsGroupRef}>
        {herbsData.map((herb, idx) => (
          <group
            key={idx}
            position={herb.pos as [number, number, number]}
            rotation={herb.rot as [number, number, number]}
            scale={herb.scale}
          >
            {herb.type === 'leaf' ? (
              <mesh>
                {/* Curved herbal leaf shape */}
                <coneGeometry args={[0.5, 1.2, 5]} />
                <meshStandardMaterial
                  color="#2d5a32"
                  roughness={0.4}
                  metalness={0.1}
                  side={THREE.DoubleSide}
                />
              </mesh>
            ) : (
              <mesh>
                {/* Amla berry sphere with natural texture */}
                <sphereGeometry args={[0.7, 16, 16]} />
                <meshStandardMaterial
                  color="#708238"
                  roughness={0.5}
                  metalness={0.05}
                />
              </mesh>
            )}
          </group>
        ))}
      </group>

      {/* 8. Micro Bubbles in oil */}
      <group ref={bubblesGroupRef}>
        {bubblesData.map((b, idx) => (
          <mesh key={idx} position={[b.x, b.y, b.z]}>
            <sphereGeometry args={[b.size, 12, 12]} />
            <meshPhysicalMaterial
              color="#fbbf24"
              transmission={0.8}
              roughness={0.1}
              transparent={true}
              opacity={0.7}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
};
