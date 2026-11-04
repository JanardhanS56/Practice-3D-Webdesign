import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export const CausticBackground: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorDark: { value: new THREE.Color('#0A0705') },
      uColorMid: { value: new THREE.Color('#261A11') },
      uColorAccent: { value: new THREE.Color('#C78D4B') },
    }),
    []
  );

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    uniform vec3 uColorDark;
    uniform vec3 uColorMid;
    uniform vec3 uColorAccent;
    varying vec2 vUv;

    // Simplex noise approximation for amber caustics
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

    float snoise(vec2 v){
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
               -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
        dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      vec2 uv = vUv * 2.0 - 1.0;
      float d = length(uv);
      
      float n1 = snoise(uv * 1.8 + vec2(uTime * 0.12, uTime * 0.08));
      float n2 = snoise(uv * 3.2 - vec2(uTime * 0.15, -uTime * 0.1));
      float caustics = pow(abs(n1 * 0.6 + n2 * 0.4), 2.2);

      vec3 color = mix(uColorDark, uColorMid, smoothstep(0.8, 0.1, d));
      color = mix(color, uColorAccent, caustics * 0.45 * smoothstep(1.2, 0.0, d));

      gl_FragColor = vec4(color, 0.85);
    }
  `;

  useFrame((state) => {
    if (meshRef.current) {
      uniforms.uTime.value = state.clock.elapsedTime * 0.4;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -3.5]}>
      <planeGeometry args={[16, 12, 1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
      />
    </mesh>
  );
};

