"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useRef } from "react";

export default function PhotoGallery() {
  const photos = [
    {
      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      link: "#",
      category: "Men",
    },
    {
      url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800",
      link: "#",
      category: "Women",
    },
    {
      url: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800",
      link: "#",
      category: "Kids",
    },
    {
      url: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800",
      link: "#",
      category: "CAP",
    },
    {
      url: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800",
      link: "#",
      category: "Mbrella X Influencer",
    },
    {
      url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800",
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
                      src={photo.url}
                      alt={`Photo ${index + 1}`}
                      className="rounded-sm w-full md:w-90 lg:w-155 h-64 sm:h-80 md:h-90 lg:h-155 object-cover hover:scale-102 transition-transform duration-500 ease-out"
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
