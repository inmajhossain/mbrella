"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useRef } from "react";

export default function PhotoGallery() {
  const photos = [
    {
      src: "/galary/men.webp",
      link: "#",
      category: "Men",
    },
    {
      src: "/galary/women.webp",
      link: "#",
      category: "Women",
    },
    {
      src: "/galary/kids.webp",
      link: "#",
      category: "Kids",
    },
    {
      src: "/galary/cap.webp",
      link: "#",
      category: "CAP",
    },
    {
      src: "/galary/mbrellax.webp",
      link: "#",
      category: "Mbrella X Influencer",
    },
    {
      src: "/galary/umbrella.webp",
      link: "#",
      category: "U by Mbrella",
    },
  ];

  const photoRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-slide-up");
          }
        });
      },
      { threshold: 0.1 }
    );

    photoRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-up {
          animation: slideUp 0.6s ease-out forwards;
        }

        .photo-item {
          opacity: 0;
        }
      `}</style>

      <div className="mx-auto max-w-7xl">
        <div className="flex lg:flex-row flex-col gap-6">
          {/* Photos Grid */}
          <div className="flex md:flex-row flex-col flex-wrap flex-1 justify-between items-center gap-6 md:gap-3 md:gap-y-9">
            {photos.map((photo, index) => (
              <div
                key={index}
                ref={el => {
                  photoRefs.current[index] = el;
                }}
                className="photo-item"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative">
                  <Link href={photo.link} className="block">
                    <Image
                      src={photo.src}
                      alt={`Photo ${index + 1}`}
                      className="bg-cover rounded-sm md:w-90 lg:w-155 min-w-85 h-64 sm:h-80 md:h-90 lg:h-155 object-cover object-top md:object-cover hover:scale-102 transition-transform duration-500 ease-out"
                      width={620}
                      height={620}
                    />
                  </Link>
                  <Link
                    href={photo.link}
                    className="right-2 -bottom-3 absolute bg-blue-900 hover:bg-black shadow-lg px-4 md:px-8 py-2 rounded-sm font-sans text-md text-white transition-colors duration-500"
                    onClick={e => e.preventDefault()}
                  >
                    {photo.category}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
