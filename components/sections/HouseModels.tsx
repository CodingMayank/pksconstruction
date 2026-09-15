"use client";

import React, { Suspense, useRef, useState, useEffect } from "react";
import Image from "next/image";
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
import { motion, AnimatePresence } from "framer-motion";
import {
  Box,
  RotateCw,
  Maximize2,
  X,
  RotateCcw,
  Sparkles,
  Layers,
  MapPin,
  Eye,
  ZoomIn,
  Compass,
} from "lucide-react";

export interface HouseModelItem {
  id: string;
  title: string;
  villaNo: string;
  location: string;
  tag: string;
  description: string;
  specs: {
    plot: string;
    type: string;
    style: string;
  };
  image: string;
  modelUrl: string;
}

export const HOUSE_MODELS: HouseModelItem[] = [
  {
    id: "villa-10",
    title: "Villa 10",
    villaNo: "Villa No. 10",
    location: "6th Park View, Gaur Yamuna City (GYC)",
    tag: "Luxury Villa",
    description:
      "Modern multi-storey contemporary residence featuring expansive balconies, glass balustrades, and signature cantilever overhangs designed for optimal natural lighting and ventilation.",
    specs: {
      plot: "Villa 10",
      type: "Duplex Villa",
      style: "Contemporary Minimalist",
    },
    image: "/constructions/villa-10-6th-park.png",
    modelUrl: "/models/villa-10-6th-park.glb",
  },
  {
    id: "villa-22",
    title: "Villa 22",
    villaNo: "Villa No. 22",
    location: "6th Park View, Gaur Yamuna City (GYC)",
    tag: "Premium Residence",
    description:
      "Sculpted architectural facade with rich texture accents, private terraces, integrated ambient lighting recesses, and structural concrete framing built to the highest earthquake-resilient standards.",
    specs: {
      plot: "Villa 22",
      type: "Modern Villa",
      style: "Warm Modernist",
    },
    image: "/constructions/villa-22-6th-park.png",
    modelUrl: "/models/villa-22-6th-park.glb",
  },
  {
    id: "villa-214",
    title: "Villa 214",
    villaNo: "Villa No. 214",
    location: "6th Park View, Gaur Yamuna City (GYC)",
    tag: "Signature Estate",
    description:
      "Grand statement villa boasting geometric louvers, double-height entryway, spacious rooftop garden deck, and bespoke stone cladding meticulously executed by P.K.S. Construction.",
    specs: {
      plot: "Villa 214",
      type: "Luxury Residence",
      style: "Modern Classic",
    },
    image: "/constructions/villa-214-6th-park.png",
    modelUrl: "/models/villa-214-6th-park.glb",
  },
];

function ModelLoader() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-[var(--color-gold)]/20 bg-[#1e1e24]/90 p-5 shadow-2xl backdrop-blur-xl">
        <div className="relative h-10 w-10">
          <div className="absolute inset-0 animate-ping rounded-full bg-[var(--color-safety)]/20" />
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-[var(--color-gold)] border-t-[var(--color-safety)]" />
        </div>
        <div className="text-center">
          <span className="block font-mono text-xs font-semibold tracking-wider text-[var(--color-gold)]">
            LOADING 3D GEOMETRY
          </span>
          <span className="mt-0.5 block font-mono text-[10px] text-zinc-400">
            Parsing textures & lighting...
          </span>
        </div>
      </div>
    </Html>
  );
}

function DynamicGLTFModel({
  url,
  autoRotate = true,
}: {
  url: string;
  autoRotate?: boolean;
}) {
  const { scene } = useGLTF(url);
  const modelRef = useRef<THREE.Group>(null);

  useEffect(() => {
    scene.traverse((object) => {
      if ((object as THREE.Mesh).isMesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });
  }, [scene]);

  useFrame((_, delta) => {
    if (autoRotate && modelRef.current) {
      modelRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={modelRef}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}

function ModelViewerCanvas({
  modelUrl,
  autoRotate,
  controlsRef,
}: {
  modelUrl: string;
  autoRotate: boolean;
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
}) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{
        position: [0, 1.2, 5.2],
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
      <ambientLight intensity={2.0} />
      <directionalLight position={[10, 18, 12]} intensity={2.8} castShadow />
      <directionalLight position={[-12, 12, -8]} intensity={1.5} />
      <directionalLight position={[0, -6, 6]} intensity={0.8} />
      <directionalLight position={[0, 10, -10]} intensity={1.2} />

      <Suspense fallback={<ModelLoader />}>
        {/* Bounds automatically calculates bounding box and fits model comfortably into camera viewport */}
        <Bounds fit clip observe margin={1.15}>
          <DynamicGLTFModel url={modelUrl} autoRotate={autoRotate} />
        </Bounds>

        <ContactShadows
          position={[0, -1.8, 0]}
          opacity={0.4}
          scale={20}
          blur={2.4}
          far={8}
        />
      </Suspense>

      <OrbitControls
        ref={controlsRef}
        enableRotate={true}
        enableZoom={true}
        enablePan={true}
        enableDamping={true}
        dampingFactor={0.06}
        target={[0, 0, 0]}
        minDistance={1.2}
        maxDistance={20}
        makeDefault
      />
    </Canvas>
  );
}

class ModelErrorBoundary extends React.Component<
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
    console.error("House model 3D render failed:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center">
          <Box className="h-12 w-12 text-[var(--color-safety)] opacity-60 mb-3" />
          <p className="font-mono text-sm uppercase tracking-wider text-zinc-300">
            3D Viewer Notice
          </p>
          <p className="mt-1 max-w-sm text-xs text-zinc-400">
            Unable to load 3D graphics on this device. You can still view the photo gallery and architectural specifications.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

export function HouseModels() {
  const [activeModel, setActiveModel] = useState<HouseModelItem | null>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const controlsRef = useRef<OrbitControlsImpl | null>(null);

  // Close modal on Escape key, prevent background wheel scroll, and pause Lenis smooth scroll
  useEffect(() => {
    if (!activeModel) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveModel(null);
      }
    };

    // Pause Lenis smooth scroll if active
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    if (lenis?.stop) {
      lenis.stop();
    }

    // Lock standard document body and HTML scroll
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      if (lenis?.start) {
        lenis.start();
      }
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeModel]);

  const handleReset = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <section
      id="house-models"
      className="relative bg-[var(--color-charcoal)] py-20 text-[var(--color-off-white)] sm:py-28 overflow-hidden"
    >
      {/* Blueprint Grid Ambient Background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #EDEAE2 1px, transparent 1px),
            linear-gradient(to bottom, #EDEAE2 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />
      <div className="pointer-events-none absolute -left-48 top-1/4 h-96 w-96 rounded-full bg-[var(--color-safety)]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-48 bottom-1/4 h-96 w-96 rounded-full bg-[var(--color-blueprint)]/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-gold)]/20 bg-white/5 px-4 py-1.5 backdrop-blur-md">
            <Layers className="h-4 w-4 text-[var(--color-safety)]" />
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-gold)]">
              Interactive 3D Architectural Models
            </span>
          </div>

          <h2 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-white">
            Explore Our Built Villas in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-gold)] via-amber-200 to-[var(--color-safety)]">
              Full 3D
            </span>
          </h2>

          <p className="mt-4 text-base text-zinc-300 sm:text-lg">
            Experience our flagship residential architecture from every angle.
            Click any villa to launch the interactive real-time 3D walkthrough with
            full 360° rotation and zoom.
          </p>
        </div>

        {/* Model Cards Grid */}
        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {HOUSE_MODELS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#1f1f25] shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--color-safety)]/40 hover:shadow-2xl hover:shadow-[var(--color-safety)]/10"
            >
              {/* Image Preview Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/40">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1f1f25] via-transparent to-black/30" />

                {/* Badges */}
                <div className="absolute left-4 top-4 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-[11px] font-mono font-medium tracking-wide text-white backdrop-blur-md">
                    <Sparkles className="h-3 w-3 text-[var(--color-safety)]" />
                    {item.tag}
                  </span>
                </div>

                {/* 3D Available Indicator Pill */}
                <div className="absolute right-4 top-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-safety)]/30 bg-[var(--color-safety)]/20 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-orange-200 backdrop-blur-md">
                    <Box className="h-3 w-3 animate-pulse text-[var(--color-safety)]" />
                    3D Model Ready
                  </span>
                </div>

                {/* Hover CTA overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                  <button
                    type="button"
                    onClick={() => setActiveModel(item)}
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-[var(--color-safety)] px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <Box className="h-4 w-4" />
                    Launch 3D Model
                  </button>
                </div>
              </div>

              {/* Details Content */}
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-gold)]/80">
                  <MapPin className="h-3.5 w-3.5 text-[var(--color-safety)]" />
                  <span>{item.location}</span>
                </div>

                <h3 className="mt-2 text-xl font-bold text-white group-hover:text-[var(--color-gold)] transition-colors">
                  {item.villaNo} in 6th Park GYC
                </h3>

                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-zinc-300">
                  {item.description}
                </p>

                {/* Spec Badges */}
                <div className="mt-5 grid grid-cols-2 gap-2 border-t border-white/10 pt-4 text-[11px] font-mono">
                  <div className="flex flex-col">
                    <span className="text-zinc-400">STRUCTURE</span>
                    <span className="font-semibold text-zinc-200">{item.specs.type}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-zinc-400">ARCHITECTURAL STYLE</span>
                    <span className="font-semibold text-zinc-200">{item.specs.style}</span>
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-6 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveModel(item)}
                    className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-white/15 bg-white/5 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-white transition-all duration-200 hover:border-[var(--color-safety)] hover:bg-[var(--color-safety)] hover:text-white cursor-pointer"
                  >
                    <Eye className="h-4 w-4" />
                    Open 3D Model
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 3D Interactive Modal Viewer */}
      <AnimatePresence>
        {activeModel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/85 backdrop-blur-xl"
            onClick={() => setActiveModel(null)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#17171c] shadow-2xl"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-white/10 bg-[#1a1a20] px-5 py-3.5 sm:px-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-safety)]/15 border border-[var(--color-safety)]/30 text-[var(--color-safety)]">
                    <Box className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white tracking-wide">
                      {activeModel.villaNo} in 6th Park GYC
                    </h4>
                    <p className="flex items-center gap-1.5 text-xs text-zinc-400">
                      <MapPin className="h-3 w-3 text-[var(--color-safety)]" />
                      {activeModel.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Auto Rotate Toggle */}
                  <button
                    type="button"
                    onClick={() => setAutoRotate((prev) => !prev)}
                    title={autoRotate ? "Pause Auto-Rotation" : "Start Auto-Rotation"}
                    className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-mono text-xs transition cursor-pointer ${
                      autoRotate
                        ? "border-[var(--color-gold)]/40 bg-[var(--color-gold)]/10 text-[var(--color-gold)]"
                        : "border-white/10 bg-white/5 text-zinc-400 hover:text-white"
                    }`}
                  >
                    <RotateCw
                      className={`h-3.5 w-3.5 ${autoRotate ? "animate-spin" : ""}`}
                      style={{ animationDuration: "7s" }}
                    />
                    <span className="hidden sm:inline">
                      {autoRotate ? "Rotate: ON" : "Rotate: OFF"}
                    </span>
                  </button>

                  {/* Reset Camera View */}
                  <button
                    type="button"
                    onClick={handleReset}
                    title="Reset Camera View"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs text-zinc-300 transition hover:bg-white/10 hover:text-white cursor-pointer"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Reset</span>
                  </button>

                  {/* Close Modal Button */}
                  <button
                    type="button"
                    onClick={() => setActiveModel(null)}
                    aria-label="Close 3D Viewer"
                    className="rounded-lg border border-white/10 bg-white/5 p-1.5 text-zinc-400 transition hover:bg-[var(--color-safety)] hover:text-white cursor-pointer ml-1"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* 3D Canvas Area */}
              <div
                data-lenis-prevent
                className="relative flex-1 w-full overflow-hidden bg-gradient-to-b from-[#1c1c24] via-[#16161c] to-[#121217] cursor-grab active:cursor-grabbing touch-none overscroll-contain"
                onContextMenu={(e) => e.preventDefault()}
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
              >
                <ModelErrorBoundary>
                  <ModelViewerCanvas
                    modelUrl={activeModel.modelUrl}
                    autoRotate={autoRotate}
                    controlsRef={controlsRef}
                  />
                </ModelErrorBoundary>

                {/* Subtle minimalist control hint */}
                <div className="pointer-events-none absolute bottom-4 left-0 right-0 flex justify-center px-4 z-20">
                  <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-black/70 px-4 py-1.5 font-mono text-[11px] text-zinc-300 backdrop-blur-md shadow-lg">
                    <span className="flex items-center gap-1.5 text-[var(--color-gold)]">
                      <Compass className="h-3 w-3 text-[var(--color-safety)]" />
                      Drag to Rotate
                    </span>
                    <span className="text-zinc-600">•</span>
                    <span className="flex items-center gap-1.5 text-zinc-300">
                      <ZoomIn className="h-3 w-3 text-[var(--color-safety)]" />
                      Scroll to Zoom
                    </span>
                    <span className="text-zinc-600 hidden sm:inline">•</span>
                    <span className="text-zinc-400 hidden sm:inline">
                      Right-click to Pan
                    </span>
                  </div>
                </div>
              </div>

              {/* Modal Footer with Villa Architectural Description & Switcher */}
              <div className="border-t border-white/10 bg-[#1a1a20] px-5 py-3.5 sm:px-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-2xl">
                    {activeModel.description}
                  </p>

                  {/* Switch to another model quickly */}
                  <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 hidden md:inline">
                      Switch Villa:
                    </span>
                    {HOUSE_MODELS.map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setActiveModel(m)}
                        className={`rounded-lg px-3 py-1 font-mono text-xs transition cursor-pointer border ${
                          activeModel.id === m.id
                            ? "border-[var(--color-safety)] bg-[var(--color-safety)] text-white font-medium"
                            : "border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10"
                        }`}
                      >
                        {m.title}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// Preload GLTF models for snappy instant viewing
useGLTF.preload("/models/villa-10-6th-park.glb");
useGLTF.preload("/models/villa-22-6th-park.glb");
useGLTF.preload("/models/villa-214-6th-park.glb");
