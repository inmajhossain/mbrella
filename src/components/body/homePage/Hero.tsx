"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HeroSlide {
  id: number;
  image: string;
  link: string;
}

const heroSlides: HeroSlide[] = [
  { id: 1, image: "/heroImage/1713607928.webp", link: "/new-arrivals" },
  { id: 2, image: "/heroImage/1763380298.webp", link: "/new-arrivals" },
  { id: 3, image: "/heroImage/1764847147.webp", link: "/new-arrivals" },
  { id: 4, image: "/heroImage/1765787283.webp", link: "/new-arrivals" },
  { id: 5, image: "/heroImage/1765787618.webp", link: "/new-arrivals" },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentSlide(prev => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentSlide(prev => (prev + 1) % heroSlides.length);
  };

  return (
    <section className="relative mt-10.75 lg:mt-19.75 w-full h-44 md:h-88 lg:h-screen overflow-hidden">
      {/* Slides */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {heroSlides.map(slide => (
          <div key={slide.id} className="relative min-w-full h-full">
            <Link href={slide.link} className="block w-full h-full">
              <div
                className="absolute inset-0 lg:bg-cover bg-contain bg-no-repeat bg-center"
                style={{
                  backgroundImage: `url(${slide.image})`,
                }}
              >
                <div className="absolute inset-0 bg-black/30" />
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Left Arrow */}
      <button
        onClick={goToPrevious}
        className="top-1/2 left-0 lg:left-10 z-20 absolute text-amber-50 hover:text-white -translate-y-1/2"
      >
        <ChevronLeft size={40} />
      </button>

      {/* Right Arrow */}
      <button
        onClick={goToNext}
        className="top-1/2 right-0 lg:right-10 z-20 absolute text-amber-50 hover:text-white -translate-y-1/2"
      >
        <ChevronRight size={40} />
      </button>

      {/* Dots */}
      <div className="bottom-5 lg:bottom-20 left-1/2 z-20 absolute flex gap-2 -translate-x-1/2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-3 rounded-full transition-all ${
              currentSlide === index ? "w-10 bg-white" : "w-3 bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
