"use client";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ShopByCategory() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);

  const categories = [
    {
      id: 1,
      name: "Kitchen Apron",
      image:
        "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&h=400&fit=crop",
    },
    {
      id: 2,
      name: "Flower Stick & Vase",
      image:
        "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=400&fit=crop",
    },
    {
      id: 3,
      name: "Showpieces",
      image:
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&h=400&fit=crop",
    },
    {
      id: 4,
      name: "Table Runner",
      image:
        "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=400&fit=crop",
    },
    {
      id: 5,
      name: "Bag",
      image:
        "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=400&fit=crop",
    },
    {
      id: 6,
      name: "Bed Sheet",
      image:
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=400&fit=crop",
    },
    {
      id: 7,
      name: "Bangladesh Polo",
      image:
        "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=400&fit=crop",
    },
  ];

  // Create infinite loop by duplicating categories
  const infiniteCategories = [...categories, ...categories, ...categories];

  // Start from the middle set to enable seamless infinite scroll
  useEffect(() => {
    setCurrentIndex(categories.length);
  }, []);

  const handlePrev = () => {
    setCurrentIndex(prev => prev - 1);
  };

  const handleNext = () => {
    setCurrentIndex(prev => prev + 1);
  };

  // Reset position for infinite loop (seamless)
  useEffect(() => {
    if (currentIndex >= categories.length * 2) {
      setCurrentIndex(categories.length);
    } else if (currentIndex <= 0) {
      setCurrentIndex(categories.length);
    }
  }, [currentIndex, categories.length]);

  // Auto-scroll effect
  useEffect(() => {
    if (!isHovered) {
      autoScrollRef.current = setInterval(() => {
        setCurrentIndex(prev => prev + 0.01);
      }, 100); // Much slower and smoother scroll
    }

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [isHovered]);

  const handleManualPrev = () => {
    setIsHovered(true);
    handlePrev();
    setTimeout(() => setIsHovered(false), 5000); // Resume auto-scroll after 5 seconds
  };

  const handleManualNext = () => {
    setIsHovered(true);
    handleNext();
    setTimeout(() => setIsHovered(false), 5000);
  };

  return (
    <div className="px-4 py-12 w-full">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-8 md:mb-12 font-bold text-3xl md:text-4xl">
          Shop By Category
        </h2>

        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={handleManualPrev}
            className="top-1/2 -left-10 z-10 absolute bg-gray-800 hover:bg-gray-700 p-2 md:p-3 rounded-full text-white transition-colors -translate-x-4 -translate-y-1/2"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 md:w-6 h-5 md:h-6" />
          </button>

          <button
            onClick={handleManualNext}
            className="top-1/2 -right-10 z-10 absolute bg-gray-800 hover:bg-gray-700 p-2 md:p-3 rounded-full text-white transition-colors -translate-y-1/2 translate-x-4"
            aria-label="Next"
          >
            <ChevronRight className="w-5 md:w-6 h-5 md:h-6" />
          </button>

          {/* Categories Carousel */}
          <div
            className="overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div
              className="flex gap-4 md:gap-6 transition-transform ease-linear"
              style={{
                transform: `translateX(-${(currentIndex / categories.length) * 100}%)`,
              }}
            >
              {infiniteCategories.map((category, index) => (
                <div
                  key={`${category.id}-${index}`}
                  className="group flex flex-col items-center w-32 sm:w-36 md:w-40 lg:w-44 cursor-pointer shrink-0"
                >
                  <div className="relative mb-3 md:mb-4 border-4 border-gray-200 group-hover:border-gray-800 rounded-full w-full aspect-square overflow-hidden transition-colors">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="px-2 font-medium group-hover:text-gray-600 text-sm md:text-base text-center transition-colors">
                    {category.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: Dot Indicators */}
        <div className="md:hidden flex justify-center gap-2 mt-6">
          {categories.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? "bg-gray-800" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
