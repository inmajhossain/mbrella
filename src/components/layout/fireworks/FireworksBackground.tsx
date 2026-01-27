// "use client";

// import { useEffect, useRef, useState } from "react";
// import * as THREE from "three";
// import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
// import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
// import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

// interface FireworkParticle {
//   position: THREE.Vector3;
//   velocity: THREE.Vector3;
//   color: THREE.Color;
//   size: number;
//   life: number;
//   maxLife: number;
//   trail: THREE.Vector3[];
// }

// interface FireworkConfig {
//   count: number;
//   colors: string[];
//   intensity: number;
//   speed: number;
//   gravity: number;
//   wind: number;
//   trailLength: number;
//   explosionSize: number;
//   spawnRate: number;
// }

// const defaultConfig: FireworkConfig = {
//   count: 50,
//   colors: [
//     "#FF5252", // Red
//     "#FF4081", // Pink
//     "#E040FB", // Purple
//     "#7C4DFF", // Deep Purple
//     "#536DFE", // Indigo
//     "#448AFF", // Blue
//     "#40C4FF", // Light Blue
//     "#18FFFF", // Cyan
//     "#64FFDA", // Teal
//     "#69F0AE", // Green
//     "#B2FF59", // Light Green
//     "#EEFF41", // Lime
//     "#FFFF00", // Yellow
//     "#FFD740", // Amber
//     "#FFAB40", // Orange
//   ],
//   intensity: 2.0,
//   speed: 15,
//   gravity: 0.2,
//   wind: 0.05,
//   trailLength: 10,
//   explosionSize: 5,
//   spawnRate: 0.5,
// };

// class FireworksSystem {
//   private scene: THREE.Scene;
//   private camera: THREE.PerspectiveCamera;
//   private renderer: THREE.WebGLRenderer;
//   private composer: EffectComposer;

//   private fireworks: FireworkParticle[] = [];
//   private particles: THREE.Points[] = [];
//   private trails: THREE.Line[] = [];

//   private clock: THREE.Clock;
//   private lastSpawnTime: number = 0;

//   private config: FireworkConfig;
//   private isInitialized: boolean = false;

//   constructor(canvas: HTMLCanvasElement, config: Partial<FireworkConfig> = {}) {
//     this.config = { ...defaultConfig, ...config };

//     // Scene
//     this.scene = new THREE.Scene();
//     this.scene.fog = new THREE.Fog(0x000000, 50, 300);

//     // Camera
//     this.camera = new THREE.PerspectiveCamera(
//       75,
//       canvas.clientWidth / canvas.clientHeight,
//       0.1,
//       1000
//     );
//     this.camera.position.set(0, 0, 50);
//     this.camera.lookAt(0, 0, 0);

//     // Renderer
//     this.renderer = new THREE.WebGLRenderer({
//       canvas,
//       alpha: true,
//       antialias: true,
//       powerPreference: "high-performance",
//     });
//     this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
//     this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//     this.renderer.setClearColor(0x000000, 0);

//     // Post-processing for bloom effect
//     this.composer = new EffectComposer(this.renderer);
//     const renderPass = new RenderPass(this.scene, this.camera);
//     this.composer.addPass(renderPass);

//     const bloomPass = new UnrealBloomPass(
//       new THREE.Vector2(canvas.clientWidth, canvas.clientHeight),
//       1.5, // strength
//       0.4, // radius
//       0.85 // threshold
//     );
//     this.composer.addPass(bloomPass);

//     // Clock for timing
//     this.clock = new THREE.Clock();

//     this.isInitialized = true;
//   }

//   private createFirework(): FireworkParticle {
//     const x = (Math.random() - 0.5) * 60;
//     const y = -30;
//     const z = (Math.random() - 0.5) * 30;

//     const color = new THREE.Color(
//       this.config.colors[Math.floor(Math.random() * this.config.colors.length)]
//     );

//     return {
//       position: new THREE.Vector3(x, y, z),
//       velocity: new THREE.Vector3(
//         (Math.random() - 0.5) * 2,
//         Math.random() * this.config.speed + 10,
//         (Math.random() - 0.5) * 2
//       ),
//       color,
//       size: Math.random() * 0.5 + 0.3,
//       life: 0,
//       maxLife: Math.random() * 2 + 1,
//       trail: [],
//     };
//   }

//   private explodeFirework(firework: FireworkParticle) {
//     const particleCount = 100 + Math.random() * 100;
//     const positions = new Float32Array(particleCount * 3);
//     const colors = new Float32Array(particleCount * 3);
//     const sizes = new Float32Array(particleCount);

//     for (let i = 0; i < particleCount; i++) {
//       const i3 = i * 3;
//       const angle = Math.random() * Math.PI * 2;
//       const phi = Math.random() * Math.PI;
//       const radius = Math.random() * this.config.explosionSize;

//       positions[i3] =
//         firework.position.x + Math.sin(angle) * Math.cos(phi) * radius;
//       positions[i3 + 1] = firework.position.y + Math.sin(phi) * radius;
//       positions[i3 + 2] =
//         firework.position.z + Math.cos(angle) * Math.cos(phi) * radius;

//       // Create color variation
//       const colorVar = new THREE.Color(firework.color);
//       colorVar.offsetHSL(
//         (Math.random() - 0.5) * 0.2,
//         (Math.random() - 0.5) * 0.1,
//         Math.random() * 0.3
//       );

//       colors[i3] = colorVar.r;
//       colors[i3 + 1] = colorVar.g;
//       colors[i3 + 2] = colorVar.b;

//       sizes[i] = Math.random() * 0.4 + 0.1;
//     }

//     const geometry = new THREE.BufferGeometry();
//     geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
//     geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

//     const material = new THREE.PointsMaterial({
//       size: 0.2,
//       vertexColors: true,
//       transparent: true,
//       opacity: 0.8,
//       sizeAttenuation: true,
//       blending: THREE.AdditiveBlending,
//     });

//     const particles = new THREE.Points(geometry, material);

//     // Add velocity to particles
//     particles.userData = {
//       velocities: positions.slice(),
//       life: 0,
//       maxLife: Math.random() * 1.5 + 0.5,
//       gravity: this.config.gravity * 0.5,
//       wind: this.config.wind,
//     };

//     this.scene.add(particles);
//     this.particles.push(particles);
//   }

//   private createTrail(firework: FireworkParticle) {
//     if (firework.trail.length < 2) return;

//     const positions = firework.trail.map(p => [p.x, p.y, p.z]).flat();
//     const geometry = new THREE.BufferGeometry();
//     geometry.setAttribute(
//       "position",
//       new THREE.Float32BufferAttribute(positions, 3)
//     );

//     const material = new THREE.LineBasicMaterial({
//       color: firework.color,
//       transparent: true,
//       opacity: 0.3,
//       linewidth: 1,
//       blending: THREE.AdditiveBlending,
//     });

//     const line = new THREE.Line(geometry, material);
//     this.scene.add(line);
//     this.trails.push(line);
//   }

//   update() {
//     if (!this.isInitialized) return;

//     const delta = this.clock.getDelta();
//     const time = this.clock.getElapsedTime();

//     // Spawn new fireworks
//     if (time - this.lastSpawnTime > this.config.spawnRate) {
//       this.lastSpawnTime = time;
//       for (let i = 0; i < Math.floor(Math.random() * 3) + 1; i++) {
//         this.fireworks.push(this.createFirework());
//       }
//     }

//     // Update existing fireworks
//     for (let i = this.fireworks.length - 1; i >= 0; i--) {
//       const firework = this.fireworks[i];

//       // Update physics
//       firework.velocity.y -= this.config.gravity * delta * 60;
//       firework.velocity.x += (Math.random() - 0.5) * this.config.wind;
//       firework.velocity.z += (Math.random() - 0.5) * this.config.wind;

//       firework.position.add(
//         firework.velocity.clone().multiplyScalar(delta * 60)
//       );

//       // Add to trail
//       firework.trail.push(firework.position.clone());
//       if (firework.trail.length > this.config.trailLength) {
//         firework.trail.shift();
//       }

//       // Create trail geometry occasionally
//       if (Math.random() < 0.3) {
//         this.createTrail(firework);
//       }

//       // Update life
//       firework.life += delta;

//       // Explode if life is over or reached max height
//       if (
//         firework.life >= firework.maxLife ||
//         firework.position.y > Math.random() * 20 + 10
//       ) {
//         this.explodeFirework(firework);
//         this.fireworks.splice(i, 1);
//       }
//     }

//     // Update explosion particles
//     for (let i = this.particles.length - 1; i >= 0; i--) {
//       const particles = this.particles[i];
//       const userData = particles.userData;

//       const positions = particles.geometry.attributes.position
//         .array as Float32Array;

//       for (let j = 0; j < positions.length; j += 3) {
//         // Apply gravity and wind
//         positions[j + 1] -= userData.gravity * delta * 60;
//         positions[j] += (Math.random() - 0.5) * userData.wind;
//         positions[j + 2] += (Math.random() - 0.5) * userData.wind;

//         // Slow down
//         positions[j] *= 0.98;
//         positions[j + 1] *= 0.98;
//         positions[j + 2] *= 0.98;
//       }

//       particles.geometry.attributes.position.needsUpdate = true;

//       // Update life and fade out
//       userData.life += delta;
//       const opacity = 1 - userData.life / userData.maxLife;
//       (particles.material as THREE.PointsMaterial).opacity = opacity * 0.6;

//       // Remove dead particles
//       if (userData.life >= userData.maxLife) {
//         this.scene.remove(particles);
//         particles.geometry.dispose();
//         (particles.material as THREE.Material).dispose();
//         this.particles.splice(i, 1);
//       }
//     }

//     // Update and fade trails
//     for (let i = this.trails.length - 1; i >= 0; i--) {
//       const trail = this.trails[i];
//       const material = trail.material as THREE.LineBasicMaterial;

//       material.opacity -= delta * 0.5;

//       if (material.opacity <= 0) {
//         this.scene.remove(trail);
//         trail.geometry.dispose();
//         material.dispose();
//         this.trails.splice(i, 1);
//       }
//     }

//     // Gentle camera movement
//     this.camera.position.x = Math.sin(time * 0.1) * 2;
//     this.camera.position.z = 50 + Math.cos(time * 0.05) * 3;
//     this.camera.lookAt(Math.sin(time * 0.2) * 5, 0, 0);

//     // Render with post-processing
//     this.composer.render();
//   }

//   resize(width: number, height: number) {
//     if (!this.isInitialized) return;

//     this.camera.aspect = width / height;
//     this.camera.updateProjectionMatrix();
//     this.renderer.setSize(width, height);
//     this.composer.setSize(width, height);
//   }

//   dispose() {
//     if (!this.isInitialized) return;

//     // Clean up all resources
//     this.fireworks = [];

//     this.particles.forEach(particles => {
//       this.scene.remove(particles);
//       particles.geometry.dispose();
//       (particles.material as THREE.Material).dispose();
//     });
//     this.particles = [];

//     this.trails.forEach(trail => {
//       this.scene.remove(trail);
//       trail.geometry.dispose();
//       (trail.material as THREE.Material).dispose();
//     });
//     this.trails = [];

//     this.composer.dispose();
//     this.renderer.dispose();
//     this.isInitialized = false;
//   }
// }

// interface FireworksBackgroundProps {
//   config?: Partial<FireworkConfig>;
//   className?: string;
//   blendMode?: "normal" | "multiply" | "screen" | "overlay" | "lighten";
//   intensity?: number;
// }

// export default function FireworksBackground({
//   config = {},
//   className = "",
//   blendMode = "screen",
//   intensity = 1,
// }: FireworksBackgroundProps) {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const fireworksRef = useRef<FireworksSystem | null>(null);
//   const animationRef = useRef<number | null>(null);

//   const [isLoaded, setIsLoaded] = useState(false);

//   // Blend mode CSS classes
//   const blendModeClasses = {
//     normal: "mix-blend-normal",
//     multiply: "mix-blend-multiply",
//     screen: "mix-blend-screen",
//     overlay: "mix-blend-overlay",
//     lighten: "mix-blend-lighten",
//   };

//   useEffect(() => {
//     if (!canvasRef.current) return;

//     // Initialize fireworks system
//     fireworksRef.current = new FireworksSystem(canvasRef.current, {
//       ...config,
//       intensity: intensity,
//     });

//     setIsLoaded(true);

//     // Animation loop
//     const animate = () => {
//       if (fireworksRef.current) {
//         fireworksRef.current.update();
//       }
//       animationRef.current = requestAnimationFrame(animate);
//     };

//     animate();

//     // Handle resize
//     const handleResize = () => {
//       if (!containerRef.current || !fireworksRef.current) return;

//       const { width, height } = containerRef.current.getBoundingClientRect();
//       fireworksRef.current.resize(width, height);
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);

//     // Cleanup
//     return () => {
//       if (animationRef.current) {
//         cancelAnimationFrame(animationRef.current);
//       }

//       if (fireworksRef.current) {
//         fireworksRef.current.dispose();
//       }

//       window.removeEventListener("resize", handleResize);
//     };
//   }, [config, intensity]);

//   return (
//     <div
//       ref={containerRef}
//       className={`fixed inset-0 overflow-hidden ${className}`}
//     >
//       {/* Gradient Overlay for better blending */}
//       <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/20 to-black/40" />

//       {/* Fireworks Canvas */}
//       <canvas
//         ref={canvasRef}
//         className={`absolute inset-0 w-full h-full ${blendModeClasses[blendMode]} opacity-${intensity * 100}`}
//         style={{ opacity: intensity }}
//       />

//       {/* Loading State */}
//       {!isLoaded && (
//         <div className="absolute inset-0 flex justify-center items-center bg-black/50">
//           <div className="text-white text-lg">Loading Fireworks...</div>
//         </div>
//       )}

//       {/* Controls Info (for demo) */}
//       <div className="bottom-4 left-4 absolute text-white/60 text-sm">
//         <div className="flex items-center gap-2">
//           <div className="bg-green-500 rounded-full w-2 h-2 animate-pulse" />
//           <span>Live Fireworks Display</span>
//         </div>
//       </div>
//     </div>
//   );
// }
