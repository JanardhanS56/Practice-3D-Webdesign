import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export const BotanicalParticles: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const leavesRef = useRef<THREE.Group>(null);

  // Golden shimmer dust particles
  const [positions, scales] = useMemo(() => {
    const count = 90;
    const pos = new Float32Array(count * 3);
    const sca = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
      sca[i] = Math.random();
    }
    return [pos, sca];
  }, []);

  // Ambient floating leaves in 3D environment
  const leaves = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => ({
      x: (Math.random() - 0.5) * 10,
      y: -3 + Math.random() * 8,
      z: -2 + Math.random() * 6,
      rotX: Math.random() * Math.PI,
      rotY: Math.random() * Math.PI,
      rotZ: Math.random() * Math.PI,
      speed: 0.15 + Math.random() * 0.25,
      scale: 0.15 + Math.random() * 0.25,
    }));
  }, []);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.05;
    }

    if (leavesRef.current) {
      leavesRef.current.children.forEach((leaf, i) => {
        leaf.position.y += Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.003;
        leaf.rotation.x += 0.004;
        leaf.rotation.z += 0.002;
      });
    }
  });

  return (
    <>
      {/* Golden Mote Points */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          color="#f5cf74"
          transparent
          opacity={0.65}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Floating Ambient Herbal Leaves */}
      <group ref={leavesRef}>
        {leaves.map((l, i) => (
          <mesh
            key={i}
            position={[l.x, l.y, l.z]}
            rotation={[l.rotX, l.rotY, l.rotZ]}
            scale={l.scale}
          >
            <coneGeometry args={[0.4, 1.0, 4]} />
            <meshStandardMaterial
              color="#3f6641"
              roughness={0.6}
              metalness={0.1}
              transparent
              opacity={0.7}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}
      </group>
    </>
  );
};
