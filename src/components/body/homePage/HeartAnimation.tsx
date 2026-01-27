"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three-stdlib";
import gsap from "gsap";

const HeartAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const animationIdRef = useRef<number>(0);
  const particlesRef = useRef<THREE.Points | null>(null);
  const verticesRef = useRef<THREE.Vector3[]>([]);

  // Heart SVG path data
  const heartPath =
    "M300,107.77C284.68,55.67,239.76,0,162.31,0,64.83,0,0,82.08,0,171.71c0,.48,0,.95,0,1.43-.52,19.5,0,217.94,299.87,379.69v0l0,0,.05,0,0,0,0,0v0C600,391.08,600.48,192.64,600,173.14c0-.48,0-.95,0-1.43C600,82.08,535.17,0,437.69,0,360.24,0,315.32,55.67,300,107.77";

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Initialize camera
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      5000
    );
    camera.position.z = 500;
    cameraRef.current = camera;

    // Initialize renderer with transparent background
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true, // Enable transparency
      preserveDrawingBuffer: true, // Helps with transparency
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );

    // Set transparent background (remove the black clear color)
    renderer.setClearColor(0x000000, 0); // Alpha = 0 for full transparency

    // Enable transparent rendering
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.sortObjects = true;

    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Add some lighting to make particles visible
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Initialize controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controlsRef.current = controls;

    // Create heart shape from path
    const createHeartParticles = () => {
      const svgPath = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      svgPath.setAttribute("d", heartPath);

      // Create temporary SVG to get path length
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("viewBox", "0 0 600 552");
      svg.appendChild(svgPath);
      document.body.appendChild(svg);

      const length = svgPath.getTotalLength();
      const vertices: THREE.Vector3[] = [];

      // Create timeline for animations
      const tl = gsap.timeline({
        repeat: -1,
        yoyo: true,
      });

      // Sample points along the path
      for (let i = 0; i < length; i += 0.1) {
        const point = svgPath.getPointAtLength(i);
        const vector = new THREE.Vector3(point.x, -point.y, 0);

        // Add some randomness
        vector.x += (Math.random() - 0.5) * 30;
        vector.y += (Math.random() - 0.5) * 30;
        vector.z += (Math.random() - 0.5) * 70;

        vertices.push(vector);

        // Create animation for each particle
        tl.from(
          vector,
          {
            x: 600 / 2,
            y: -552 / 2,
            z: 0,
            ease: "power2.inOut",
            duration: gsap.utils.random(2, 5),
          },
          i * 0.002
        );
      }

      document.body.removeChild(svg);
      verticesRef.current = vertices;

      // Create particle system
      const geometry = new THREE.BufferGeometry().setFromPoints(vertices);

      // Make particles more vibrant with additive blending
      const material = new THREE.PointsMaterial({
        color: 0xd01212,
        size: 4, // Slightly larger for better visibility
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.9,
        sizeAttenuation: true,
        depthWrite: false, // Important for transparency
      });

      const particles = new THREE.Points(geometry, material);
      particles.position.x -= 600 / 2;
      particles.position.y += 552 / 2;
      scene.add(particles);
      particlesRef.current = particles;

      // Add scene rotation animation
      gsap.fromTo(
        scene.rotation,
        {
          y: -0.2,
        },
        {
          y: 0.2,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
          duration: 3,
        }
      );

      // Add slight pulsing effect
      gsap.to(material, {
        opacity: 0.7,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    };

    createHeartParticles();

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      if (controlsRef.current) {
        controlsRef.current.update();
      }

      if (particlesRef.current && verticesRef.current.length > 0) {
        const geometry = particlesRef.current.geometry;
        geometry.setFromPoints(verticesRef.current);
        geometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current)
        return;

      cameraRef.current.aspect =
        containerRef.current.clientWidth / containerRef.current.clientHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(
        containerRef.current.clientWidth,
        containerRef.current.clientHeight
      );
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationIdRef.current);

      if (
        rendererRef.current &&
        containerRef.current &&
        containerRef.current.contains(rendererRef.current.domElement)
      ) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }

      if (rendererRef.current) {
        rendererRef.current.dispose();
      }

      if (controlsRef.current) {
        controlsRef.current.dispose();
      }
    };
  }, []);

  return (
    <div className="relative mx-auto mt-12.5 mb-12.5 w-80 md:w-170 lg:w-7xl min-h-125 overflow-hidden">
      {/* Main canvas container */}
      <div ref={containerRef} className="absolute inset-0 mx-auto" />
    </div>
  );
};

export default HeartAnimation;
