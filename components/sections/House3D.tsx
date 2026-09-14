"use client";

import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Bounds,
  Center,
  ContactShadows,
  OrbitControls,
  useGLTF,
  Html,
} from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";

function Loader() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-2 text-xs font-mono text-[var(--color-blueprint)]">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-[var(--color-blueprint)] border-t-transparent" />
        <span>Loading 3D Interior...</span>
      </div>
    </Html>
  );
}

function HouseModel() {
  const { scene } = useGLTF("/models/house.glb");
  const modelRef = useRef<THREE.Group>(null);

  React.useEffect(() => {
    scene.traverse((object) => {
      if ((object as THREE.Mesh).isMesh) {
        object.castShadow = true;
        object.receiveShadow = true;
        // Keep roof invisible from the top so interior is fully illuminated and visible
        if (
          object.name.includes("Cube_Material.002") ||
          object.name.includes("Cube.011")
        ) {
          // Semi-transparent or hidden from outside top view
          (object as THREE.Mesh).visible = false;
        }
      }
    });
  }, [scene]);

  // Continuous smooth rotation around the living room center
  useFrame((_, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group ref={modelRef} scale={1.35}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}

function Scene({ controlsRef }: { controlsRef: React.RefObject<OrbitControlsImpl | null> }) {
  return (
    <>
      <ambientLight intensity={2.2} />
      <directionalLight
        position={[10, 16, 12]}
        intensity={2.8}
        castShadow
      />
      <directionalLight position={[-12, 10, -8]} intensity={1.5} />
      <directionalLight position={[0, -6, 6]} intensity={0.8} />

      <Suspense fallback={<Loader />}>
        <HouseModel />

        <ContactShadows
          position={[0, -2.4, 0]}
          opacity={0.3}
          scale={30}
          blur={2.5}
          far={12}
        />
      </Suspense>

      <OrbitControls
        ref={controlsRef}
        enableRotate={true}
        enableZoom={true}
        enablePan={true}
        enableDamping={true}
        dampingFactor={0.06}
        target={[0.2, 0.4, 0]}
        minDistance={1.2}
        maxDistance={28}
        makeDefault
      />
    </>
  );
}

/*
 * Error boundary prevents any issue with the GLB from breaking the hero.
 */
class House3DErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error("House3D failed to render:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="flex h-full w-full items-center justify-center"
          aria-hidden="true"
        >
          <div className="relative h-64 w-64">
            <div className="absolute inset-0 rounded-full border border-[var(--color-blueprint)]/20" />
            <div className="absolute inset-8 rounded-full border border-[var(--color-blueprint)]/10" />
            <div className="absolute inset-x-12 top-1/2 h-px bg-[var(--color-blueprint)]/15" />
            <div className="absolute inset-y-12 left-1/2 w-px bg-[var(--color-blueprint)]/15" />
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export function House3D() {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);

  const handleReset = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <House3DErrorBoundary>
      <div
        onContextMenu={(event) => event.preventDefault()}
        className="
          relative
          h-full
          w-full
          overflow-hidden
          rounded-[2rem]
          cursor-grab
          bg-transparent
          active:cursor-grabbing
        "
      >
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{
            position: [4.2, 2.8, 5.8],
            fov: 42,
            near: 0.1,
            far: 100,
          }}
          gl={{
            alpha: true,
            antialias: true,
            powerPreference: "high-performance",
          }}
          className="h-full w-full touch-none"
          style={{
            background: "transparent",
            width: "100%",
            height: "100%",
          }}
        >
          <Scene controlsRef={controlsRef} />
        </Canvas>

        {/* 3D control interaction pill & reset button */}
        <div
          className="
            absolute
            bottom-5
            right-5
            flex
            items-center
            gap-2
            z-30
          "
        >
          <button
            type="button"
            onClick={handleReset}
            title="Reset View"
            className="
              cursor-pointer
              rounded-full
              border
              border-[var(--color-blueprint)]/20
              bg-[var(--color-concrete)]/80
              px-3
              py-2
              font-mono
              text-[9px]
              font-medium
              uppercase
              tracking-[0.14em]
              text-[var(--color-blueprint)]
              backdrop-blur-md
              transition-all
              hover:bg-[var(--color-blueprint)]
              hover:text-white
              active:scale-95
            "
          >
            Reset
          </button>

          <div
            className="
              pointer-events-none
              hidden
              rounded-full
              border
              border-[var(--color-blueprint)]/20
              bg-[var(--color-concrete)]/80
              px-4
              py-2
              font-mono
              text-[9px]
              font-medium
              uppercase
              tracking-[0.18em]
              text-[var(--color-blueprint)]
              backdrop-blur-md
              sm:block
            "
          >
            Rotate · Scroll to Zoom · Right-Click to Pan
          </div>
        </div>

        {/* Blueprint-style corner markers */}
        <div className="pointer-events-none absolute left-5 top-5 h-5 w-5 border-l border-t border-[var(--color-blueprint)]/20" />
        <div className="pointer-events-none absolute right-5 top-5 h-5 w-5 border-r border-t border-[var(--color-blueprint)]/20" />
        <div className="pointer-events-none absolute bottom-5 left-5 h-5 w-5 border-b border-l border-[var(--color-blueprint)]/20" />
        <div className="pointer-events-none absolute bottom-5 right-5 h-5 w-5 border-b border-r border-[var(--color-blueprint)]/20" />
      </div>
    </House3DErrorBoundary>
  );
}

useGLTF.preload("/models/house.glb");