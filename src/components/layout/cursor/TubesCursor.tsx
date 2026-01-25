"use client";

import { useEffect } from "react";
import TubesCursorLib from "threejs-components/build/cursors/tubes1.min.js";

export default function TubesCursor() {
  useEffect(() => {
    const canvas = document.getElementById("tubes-canvas") as HTMLCanvasElement;
    if (!canvas) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
    };

    resize();
    window.addEventListener("resize", resize);

    const app: any = TubesCursorLib(canvas, {
      backgroundColor: "transparent",
      tubes: {
        colors: ["#f967fb", "#53bc28", "#6958d5"],
        lights: {
          intensity: 200,
          colors: ["#83f36e", "#fe8a2e", "#ff008a", "#60aed5"],
        },
      },
    });

    return () => {
      window.removeEventListener("resize", resize);
      app?.destroy?.();
    };
  }, []);

  return (
    <canvas
      id="tubes-canvas"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 99, // ✅ must be positive
        background: "transparent",
        mixBlendMode: "screen", // ✅ overlay look without hiding content
      }}
    />
  );
}
