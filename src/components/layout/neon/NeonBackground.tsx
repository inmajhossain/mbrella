// // @ts-nocheck
// "use client";

// import { useEffect, useRef } from "react";
// import {
//   Clock,
//   PerspectiveCamera,
//   Scene,
//   WebGLRenderer,
//   SRGBColorSpace,
//   MathUtils,
//   Color,
//   Vector3,
//   Vector2,
//   ShaderMaterial,
//   Mesh,
//   PlaneGeometry,
//   CatmullRomCurve3,
//   OrthographicCamera,
// } from "three";

// const defaultConfig = {
//   segments: 128,
//   colors: ["#c7d8e2", "#aa3b8c", "#3c97ee"],
//   points: [
//     { x: 0, y: 5, z: 20 },
//     { x: 0, y: 0, z: 0 },
//     { x: 0, y: -5, z: 20 },
//   ],
//   closed: false,
//   offsetScale: { x: 10, y: 0, z: 0 },
//   neonSize: 5,
//   timeScale: 10,
// };

// // ThreeApp ক্লাস - Private fields ট্রাডিশনাল ভাবে ডিফাইন করি
// class ThreeApp {
//   private _config: any;
//   canvas: HTMLCanvasElement | null = null;
//   camera: OrthographicCamera | PerspectiveCamera | null = null;
//   cameraMinAspect: number | undefined;
//   cameraMaxAspect: number | undefined;
//   cameraFov: number | undefined;
//   maxPixelRatio: number | undefined;
//   minPixelRatio: number | undefined;
//   scene: Scene | null = null;
//   renderer: WebGLRenderer | null = null;
//   private _composer: any = null;
//   size = {
//     width: 0,
//     height: 0,
//     wWidth: 0,
//     wHeight: 0,
//     ratio: 0,
//     pixelRatio: 0,
//   };

//   // Private fields traditional way
//   private _isIntersecting = false;
//   private _isRendering = false;
//   private _resizeObserver: ResizeObserver | null = null;
//   private _resizeTimeout: NodeJS.Timeout | null = null;
//   private _intersectionObserver: IntersectionObserver | null = null;
//   private _clock = new Clock();
//   private _time = { elapsed: 0, delta: 0 };
//   private _animationFrameId: number | null = null;

//   // Callbacks
//   onBeforeRender: (time: { elapsed: number; delta: number }) => void = () => {};
//   onAfterRender: (time: { elapsed: number; delta: number }) => void = () => {};
//   onAfterResize: (size: typeof this.size) => void = () => {};

//   constructor(config: any) {
//     this._config = { ...config };
//     this._initCanvas();
//     this._initScene();
//     this._initRenderer();

//     // Create default camera
//     this.camera = new OrthographicCamera(-1, 1, 1, -1, 0.1, 1000);
//     this.camera.position.z = 5;

//     this.resize();
//     this._initEventListeners();
//   }

//   private _initCanvas() {
//     if (this._config.canvas) {
//       this.canvas = this._config.canvas;
//     } else if (this._config.id) {
//       this.canvas = document.getElementById(
//         this._config.id
//       ) as HTMLCanvasElement;
//     } else {
//       console.error("Three: Missing canvas or id parameter");
//       return;
//     }

//     if (this.canvas) {
//       this.canvas.style.display = "block";
//     }
//   }

//   private _initScene() {
//     this.scene = new Scene();
//   }

//   private _initRenderer() {
//     if (!this.canvas) {
//       console.error("Canvas not initialized");
//       return;
//     }

//     const config = {
//       canvas: this.canvas,
//       powerPreference: "high-performance" as const,
//       ...(this._config.rendererOptions ?? {}),
//     };

//     try {
//       this.renderer = new WebGLRenderer(config);
//       this.renderer.outputColorSpace = SRGBColorSpace;
//     } catch (error) {
//       console.error("Failed to create WebGLRenderer:", error);
//     }
//   }

//   private _initEventListeners() {
//     if (!this.canvas) return;

//     if (!(this._config.size instanceof Object)) {
//       window.addEventListener("resize", this._handleResize.bind(this));
//       if (this._config.size === "parent" && this.canvas.parentNode) {
//         this._resizeObserver = new ResizeObserver(
//           this._handleResize.bind(this)
//         );
//         this._resizeObserver.observe(this.canvas.parentNode);
//       }
//     }

//     this._intersectionObserver = new IntersectionObserver(
//       this._handleIntersection.bind(this),
//       { root: null, rootMargin: "0px", threshold: 0.1 }
//     );
//     this._intersectionObserver.observe(this.canvas);

//     document.addEventListener(
//       "visibilitychange",
//       this._handleVisibilityChange.bind(this)
//     );
//   }

//   private _removeEventListeners() {
//     window.removeEventListener("resize", this._handleResize.bind(this));
//     this._resizeObserver?.disconnect();
//     this._intersectionObserver?.disconnect();
//     document.removeEventListener(
//       "visibilitychange",
//       this._handleVisibilityChange.bind(this)
//     );
//   }

//   private _handleIntersection(entries: IntersectionObserverEntry[]) {
//     this._isIntersecting = entries[0]?.isIntersecting || false;
//     this._isIntersecting ? this._startRendering() : this._stopRendering();
//   }

//   private _handleVisibilityChange() {
//     if (this._isIntersecting) {
//       document.hidden ? this._stopRendering() : this._startRendering();
//     }
//   }

//   private _handleResize() {
//     if (this._resizeTimeout) {
//       clearTimeout(this._resizeTimeout);
//     }
//     this._resizeTimeout = setTimeout(() => this.resize(), 100);
//   }

//   resize() {
//     if (!this.canvas) return;

//     let width, height;

//     if (this._config.size instanceof Object) {
//       width = this._config.size.width;
//       height = this._config.size.height;
//     } else if (this._config.size === "parent" && this.canvas.parentNode) {
//       const parent = this.canvas.parentNode;
//       width = parent.clientWidth || (parent as HTMLElement).offsetWidth;
//       height = parent.clientHeight || (parent as HTMLElement).offsetHeight;
//     } else {
//       width = window.innerWidth;
//       height = window.innerHeight;
//     }

//     this.size.width = width;
//     this.size.height = height;
//     this.size.ratio = width / height;

//     this._updateCamera();
//     this._updateRenderer();
//     this.onAfterResize(this.size);
//   }

//   private _updateCamera() {
//     if (!this.camera) return;

//     this.camera.aspect = this.size.width / this.size.height;

//     if (this.camera.isPerspectiveCamera && this.cameraFov) {
//       if (this.cameraMinAspect && this.camera.aspect < this.cameraMinAspect) {
//         this._adjustFovForAspect(this.cameraMinAspect);
//       } else if (
//         this.cameraMaxAspect &&
//         this.camera.aspect > this.cameraMaxAspect
//       ) {
//         this._adjustFovForAspect(this.cameraMaxAspect);
//       } else {
//         this.camera.fov = this.cameraFov;
//       }
//     }

//     this.camera.updateProjectionMatrix();
//     this.updateWorldSize();
//   }

//   private _adjustFovForAspect(targetAspect: number) {
//     if (!this.camera) return;

//     const tanValue =
//       Math.tan(MathUtils.degToRad(this.cameraFov! / 2)) /
//       (this.camera.aspect / targetAspect);
//     this.camera.fov = 2 * MathUtils.radToDeg(Math.atan(tanValue));
//   }

//   updateWorldSize() {
//     if (!this.camera) return;

//     if (this.camera.isPerspectiveCamera) {
//       const fovRad = (this.camera.fov * Math.PI) / 180;
//       this.size.wHeight =
//         2 * Math.tan(fovRad / 2) * Math.abs(this.camera.position.z);
//       this.size.wWidth = this.size.wHeight * this.camera.aspect;
//     } else if (this.camera.isOrthographicCamera) {
//       this.size.wHeight = this.camera.top - this.camera.bottom;
//       this.size.wWidth = this.camera.right - this.camera.left;
//     }
//   }

//   private _updateRenderer() {
//     if (!this.renderer) return;

//     this.renderer.setSize(this.size.width, this.size.height);
//     this._composer?.setSize(this.size.width, this.size.height);

//     let pixelRatio = window.devicePixelRatio;
//     if (this.maxPixelRatio && pixelRatio > this.maxPixelRatio) {
//       pixelRatio = this.maxPixelRatio;
//     } else if (this.minPixelRatio && pixelRatio < this.minPixelRatio) {
//       pixelRatio = this.minPixelRatio;
//     }

//     this.renderer.setPixelRatio(pixelRatio);
//     this.size.pixelRatio = pixelRatio;
//   }

//   get postprocessing() {
//     return this._composer;
//   }

//   set postprocessing(composer: any) {
//     this._composer = composer;
//   }

//   private _startRendering() {
//     if (this._isRendering || !this.renderer || !this.scene || !this.camera)
//       return;

//     console.log("Start rendering");

//     const animate = () => {
//       this._animationFrameId = requestAnimationFrame(animate);
//       this._time.delta = this._clock.getDelta();
//       this._time.elapsed += this._time.delta;

//       this.onBeforeRender(this._time);
//       this.render();
//       this.onAfterRender(this._time);
//     };

//     this._isRendering = true;
//     this._clock.start();
//     animate();
//   }

//   private _stopRendering() {
//     if (this._isRendering) {
//       console.log("Stop rendering");
//       if (this._animationFrameId) {
//         cancelAnimationFrame(this._animationFrameId);
//       }
//       this._isRendering = false;
//       this._clock.stop();
//     }
//   }

//   render() {
//     if (this.renderer && this.scene && this.camera) {
//       if (this._composer) {
//         this._composer.render();
//       } else {
//         this.renderer.render(this.scene, this.camera);
//       }
//     }
//   }

//   clear() {
//     if (!this.scene) return;

//     this.scene.traverse((object: any) => {
//       if (object.isMesh && typeof object.material === "object") {
//         Object.keys(object.material).forEach(key => {
//           const value = object.material[key];
//           if (
//             value !== null &&
//             typeof value === "object" &&
//             typeof value.dispose === "function"
//           ) {
//             value.dispose();
//           }
//         });
//         object.material.dispose();
//         object.geometry.dispose();
//       }
//     });
//     this.scene.clear();
//   }

//   dispose() {
//     console.log("dispose");
//     this._removeEventListeners();
//     this._stopRendering();
//     this.clear();
//     this._composer?.dispose();
//     this.renderer?.dispose();
//   }
// }

// // createNeonCurve ফাংশন
// function createNeonCurve(config = {}) {
//   const options = { ...defaultConfig, ...config };
//   const segments = options.segments;
//   const numPoints = 2 * segments;
//   const { randFloat, randFloatSpread } = MathUtils;

//   // Particles data
//   const particles = {
//     positions: new Array(segments).fill().map(() => new Vector3()),
//     colors: new Array(segments).fill().map(() => new Color()),
//     lengths: new Array(segments).fill().map(() => randFloat(0.005, 0.03)),
//     timeOffsets: new Array(segments).fill().map(() => randFloat(0, 1)),
//     velocities: new Array(segments).fill().map(() => randFloat(0.5, 1)),
//   };

//   // Uniforms
//   let camera: PerspectiveCamera | null = null;
//   const screenSize = { width: 0, height: 0 };
//   const uniforms = {
//     uTime: { value: 0 },
//     uRatio: { value: new Vector2() },
//     uNeonSize: { value: options.neonSize },
//     uPoints: { value: new Array(numPoints).fill().map(() => new Vector3()) },
//     uColors: { value: particles.colors.map(color => color.clone()) },
//   };

//   let curve: CatmullRomCurve3 | null = null;
//   let material: ShaderMaterial | null = null;
//   let mesh: Mesh | null = null;
//   const tempVector = new Vector3();

//   // Initialize
//   function init() {
//     // Camera for projection
//     camera = new PerspectiveCamera();
//     camera.position.set(0, 0, 25);
//     camera.updateProjectionMatrix();
//     camera.updateMatrixWorld();

//     // Shader material
//     material = new ShaderMaterial({
//       uniforms,
//       defines: {
//         NUM_SEGMENTS: segments.toString(),
//         NUM_POINTS: numPoints.toString(),
//       },
//       vertexShader: `
//         varying vec2 vUv;
//         void main() {
//           vUv = uv;
//           gl_Position = vec4(position, 1.0);
//         }
//       `,
//       fragmentShader: `
//         uniform vec2 uRatio;
//         uniform float uNeonSize;
//         uniform vec3 uPoints[NUM_POINTS];
//         uniform vec3 uColors[NUM_SEGMENTS];
//         varying vec2 vUv;

//         float sdSegment(in vec2 p, in vec2 a, in vec2 b) {
//           vec2 pa = p - a;
//           vec2 ba = b - a;
//           float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
//           return length(pa - ba * h);
//         }

//         void main() {
//           vec2 pos = (vUv - 0.5) * uRatio;
//           vec3 col = vec3(0.0);

//           for (int i = 0; i < NUM_SEGMENTS; i++) {
//             vec3 p1 = uPoints[i * 2];
//             vec3 p2 = uPoints[i * 2 + 1];

//             // Skip if points are behind or too far
//             if ((p1.z < -1.0 || p1.z > 1.0) || (p2.z < -1.0 || p2.z > 1.0)) {
//               continue;
//             }

//             float dist = sdSegment(pos, p1.xy, p2.xy);
//             float glow = uNeonSize / dist;
//             col += glow * uColors[i];
//           }

//           gl_FragColor = vec4(col, 1.0);
//         }
//       `,
//     });

//     // Mesh
//     mesh = new Mesh(new PlaneGeometry(2, 2), material!);

//     // Curve
//     curve = new CatmullRomCurve3([]);
//     setCurvePoints(options.points);
//     if (curve) {
//       curve.closed = options.closed;
//     }

//     // Initialize positions
//     for (let i = 0; i < segments; i++) {
//       particles.positions[i].set(
//         randFloatSpread(1),
//         randFloatSpread(1),
//         randFloatSpread(1)
//       );
//     }

//     // Initialize colors
//     setColors(options.colors);
//   }

//   // Initialize now
//   init();

//   // Update function
//   function update(time: any) {
//     if (!time || !camera || !curve) return;

//     let t1, t2;
//     uniforms.uTime.value += time.delta * options.timeScale;

//     for (let i = 0; i < segments; i++) {
//       const position = particles.positions[i];
//       const point1 = uniforms.uPoints.value[2 * i];
//       const point2 = uniforms.uPoints.value[2 * i + 1];

//       // Calculate positions along curve
//       t1 =
//         (particles.timeOffsets[i] +
//           uniforms.uTime.value * particles.velocities[i] * 0.025) %
//         1;
//       t2 = curve.closed
//         ? (t1 + particles.lengths[i]) % 1
//         : Math.min(1, t1 + particles.lengths[i]);

//       // Get curve points
//       curve.getPoint(t1, point1);
//       curve.getPoint(t2, point2);

//       // Apply offset
//       tempVector.x = position.x * options.offsetScale.x;
//       tempVector.y = position.y * options.offsetScale.y;
//       tempVector.z = position.z * options.offsetScale.z;

//       point1.add(tempVector);
//       point2.add(tempVector);

//       // Project to screen space
//       point1.project(camera);
//       point2.project(camera);

//       // Adjust color intensity
//       if (!curve.closed) {
//         uniforms.uColors.value[i]
//           .copy(particles.colors[i])
//           .multiplyScalar(Math.sin(Math.PI * t1));
//       }
//     }
//   }

//   // Set colors
//   function setColors(colors: string[]) {
//     const colorGradient = (() => {
//       let colorArray: string[] = [];
//       let colorObjects: Color[] = [];

//       function init(colors: string[]) {
//         colorArray = colors;
//         colorObjects = [];
//         colors.forEach(color => {
//           const colorObj = new Color(color);
//           colorObjects.push(colorObj);
//         });
//       }

//       function getColorAt(position: number, target = new Color()) {
//         const pos =
//           Math.max(0, Math.min(1, position)) * (colorArray.length - 1);
//         const index = Math.floor(pos);
//         const color1 = colorObjects[index];

//         if (index >= colorArray.length - 1) {
//           return target.copy(color1);
//         }

//         const mix = pos - index;
//         const color2 = colorObjects[index + 1];

//         target.r = color1.r + mix * (color2.r - color1.r);
//         target.g = color1.g + mix * (color2.g - color1.g);
//         target.b = color1.b + mix * (color2.b - color1.b);

//         return target;
//       }

//       return { init, getColorAt };
//     })();

//     colorGradient.init(colors);

//     for (let i = 0; i < segments; i++) {
//       particles.colors[i].copy(colorGradient.getColorAt(randFloat(0, 1)));
//       uniforms.uColors.value[i].copy(particles.colors[i]);
//     }
//   }

//   // Set curve points
//   function setCurvePoints(points: any[]) {
//     if (!curve) return;

//     curve.points = points.map(point =>
//       point.isVector3 ? point : new Vector3(point.x, point.y, point.z)
//     );
//   }

//   // Set curve closed
//   function setCurveClosed(closed: boolean) {
//     if (curve) {
//       curve.closed = closed;
//     }
//   }

//   // Set curve offset scale
//   function setCurveOffsetScale(scale: any) {
//     options.offsetScale = scale;
//   }

//   // Set neon size
//   function setNeonSize(size: number) {
//     options.neonSize = size;
//     if (screenSize.width && screenSize.height) {
//       screenSize.width >= screenSize.height
//         ? (uniforms.uNeonSize.value = options.neonSize / screenSize.width)
//         : (uniforms.uNeonSize.value = options.neonSize / screenSize.height);
//     }
//   }

//   // Set velocity
//   function setVelocity(velocity: number) {
//     options.timeScale = velocity;
//   }

//   // Set size
//   function setSize(width: number, height: number) {
//     screenSize.width = width;
//     screenSize.height = height;

//     if (width >= height) {
//       uniforms.uRatio.value.set(1, height / width);
//       uniforms.uNeonSize.value = options.neonSize / width;
//     } else {
//       uniforms.uRatio.value.set(width / height, 1);
//       uniforms.uNeonSize.value = options.neonSize / height;
//     }
//   }

//   // Return mesh with methods
//   return {
//     update,
//     setColors,
//     setCurvePoints,
//     setCurveClosed,
//     setCurveOffsetScale,
//     setNeonSize,
//     setVelocity,
//     setSize,
//     mesh,
//   };
// }

// // createNeonBackground ফাংশন
// function createNeonBackground(canvas: HTMLCanvasElement, options = {}) {
//   if (!canvas) {
//     console.error("Canvas is required");
//     return null;
//   }

//   const config = { ...defaultConfig, ...options };

//   try {
//     const threeApp = new ThreeApp({ canvas, size: "parent" });
//     threeApp.maxPixelRatio = 1;

//     const neon = createNeonCurve(config);

//     if (!neon || !neon.mesh) {
//       console.error("Failed to create neon curve");
//       return null;
//     }

//     neon.setSize(threeApp.size.width, threeApp.size.height);

//     if (threeApp.scene) {
//       threeApp.scene.add(neon.mesh);
//     }

//     threeApp.onBeforeRender = (time: any) => {
//       if (neon && neon.update) {
//         neon.update(time);
//       }
//     };

//     threeApp.onAfterResize = (size: any) => {
//       if (neon && neon.setSize) {
//         neon.setSize(size.width, size.height);
//       }
//     };

//     // Start rendering after a short delay
//     setTimeout(() => {
//       (threeApp as any)._startRendering?.();
//     }, 100);

//     return {
//       three: threeApp,
//       neon,
//       setColors: neon.setColors,
//       setCurvePoints: neon.setCurvePoints,
//       setCurveClosed: neon.setCurveClosed,
//       setCurveOffsetScale: neon.setCurveOffsetScale,
//       setNeonSize: neon.setNeonSize,
//       setVelocity: neon.setVelocity,
//       dispose: () => {
//         threeApp.dispose();
//       },
//     };
//   } catch (error) {
//     console.error("Failed to create neon background:", error);
//     return null;
//   }
// }

// // React Component
// export default function NeonBackground({ config = {} }) {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const neonRef = useRef<any>(null);

//   useEffect(() => {
//     if (!canvasRef.current) {
//       console.log("Canvas ref is not available yet");
//       return;
//     }

//     console.log("Initializing neon background...");

//     const neon = createNeonBackground(canvasRef.current, config);

//     if (!neon) {
//       console.error("Failed to initialize neon background");
//       return;
//     }

//     neonRef.current = neon;

//     // Handle resize
//     const handleResize = () => {
//       if (neonRef.current?.three?.resize) {
//         neonRef.current.three.resize();
//       }
//     };

//     window.addEventListener("resize", handleResize);

//     return () => {
//       console.log("Cleaning up neon background...");
//       window.removeEventListener("resize", handleResize);
//       if (neonRef.current?.dispose) {
//         neonRef.current.dispose();
//       }
//     };
//   }, [config]);

//   return (
//     <div className="-z-10 fixed inset-0 bg-linear-to-br from-gray-900 to-black overflow-hidden">
//       <canvas
//         ref={canvasRef}
//         className="w-full h-full"
//         style={{
//           position: "fixed",
//           inset: 0,
//           width: "100vw",
//           height: "100vh",
//           pointerEvents: "none",
//           zIndex: 99, // ✅ must be positive
//           background: "transparent",
//           mixBlendMode: "screen", // ✅ overlay look without hiding content
//         }}
//       />
//     </div>
//   );
// }
