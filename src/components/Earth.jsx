"use client";

import React, { Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, useTexture } from "@react-three/drei";

function EarthMesh() {
  const colorMap = useTexture("/textures/earth.jpg");
  const earthRef = React.useRef();

  // Auto rotate Earth
  useFrame(() => {
    earthRef.current.rotation.y += 0.002;
  });

  return (
    <mesh ref={earthRef}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial map={colorMap} />
    </mesh>
  );
}

export default function Earth() {
  return (
    <div style={{ width: "100%", height: "600px" }}>
      <Canvas camera={{ position: [5, 3, 5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <Suspense fallback={null}>
          <EarthMesh />
          <Stars radius={100} depth={50} count={5000} factor={4} />
        </Suspense>
        {/* Allow rotation but disable zoom */}
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}
