"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF, Center, ContactShadows, Float, Stars } from "@react-three/drei";
import { Suspense } from "react";

function Model() {
  const { scene } = useGLTF("/macbook_air_m2.glb");
  return (
    <Float speed={4} rotationIntensity={1} floatIntensity={2} floatingRange={[-0.1, 0.1]}>
      <Center top position={[0, -3, 0]}>
        <primitive object={scene} scale={1.0} />
      </Center>
    </Float>
  );
}

export function ModelSection() {
  return (
    <section className="w-full h-[100dvh] bg-background relative flex items-center justify-center overflow-hidden">
      {/* Futuristic Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-background to-background z-0" />

      <div className="absolute top-24 left-0 right-0 z-10 text-center pointer-events-none px-4 flex flex-col items-center">
        <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest border border-[#22d3ee]/30 rounded-full bg-[#22d3ee]/10 backdrop-blur-md uppercase">
          <span className="relative flex h-2 w-2 mr-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22d3ee] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22d3ee]"></span>
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22d3ee] to-[#4ade80]">Next Generation</span>
        </div>
        <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-bl from-[#ffffff] via-[#22d3ee] to-[#4ade80] tracking-tighter mb-6 drop-shadow-2xl pb-4 overflow-visible">
          A Computer for Every One
        </h1>
        <p className="hero-subtitle text-slate-400 text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto font-light tracking-wide">
          Giving Technology a Second Life. Reduce Waste. Empower Students.
        </p>
      </div>

      <div className="w-full h-full z-10 cursor-grab active:cursor-grabbing">
        <Canvas camera={{ position: [0, 1.5, 12], fov: 35 }}>
          <Suspense fallback={null}>
            <Environment preset="city" />
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 20, 10]} angle={0.15} penumbra={1} intensity={2} castShadow color="#93c5fd" />

            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={4} />

            <Model />

            <ContactShadows
              position={[0, -2.5, 0]}
              opacity={0.8}
              scale={20}
              blur={2.5}
              far={4.5}
              color="#000000"
            />

            <OrbitControls
              enablePan={false}
              enableZoom={false}
              minDistance={8}
              maxDistance={18}
              autoRotate={true}
              autoRotateSpeed={0.8}
              maxPolarAngle={Math.PI / 2 - 0.05}
              minPolarAngle={Math.PI / 4}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Bottom fade for seamless transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
    </section>
  );
}

useGLTF.preload("/macbook_air_m2.glb");
