// "use client";

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   ChevronLeft,
//   ChevronRight,
//   X,
//   Zap,
//   Star,
//   ShoppingCart,
// } from "lucide-react";

// // Product types and data included in the same file
// interface ProductDetail {
//   features: string[];
//   specifications: Record<string, string>;
//   colorOptions: string[];
// }

// interface Product {
//   id: number;
//   name: string;
//   description: string;
//   price: number;
//   image: string;
//   details: ProductDetail;
//   discount?: number;
// }

// const products: Product[] = [
//   {
//     id: 1,
//     name: "Quantum Laptop X9",
//     description: "Next-gen laptop with quantum computing capabilities",
//     price: 2499,
//     image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
//     details: {
//       features: [
//         "Quantum Processing Unit",
//         "32GB DDR5 RAM",
//         "2TB NVMe SSD",
//         "4K OLED Display",
//       ],
//       specifications: {
//         Processor: "Quantum QX-9",
//         Graphics: "Neural RTX 5090",
//         Battery: "99Wh",
//         Weight: "1.8kg",
//       },
//       colorOptions: ["Space Gray", "Neon Blue", "Phantom Black"],
//     },
//     discount: 15,
//   },
//   {
//     id: 2,
//     name: "Nebula Watch Pro",
//     description: "Smartwatch with holographic display",
//     price: 599,
//     image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
//     details: {
//       features: [
//         "Holographic Display",
//         "Health Monitoring",
//         "7-day battery",
//         "Water resistant",
//       ],
//       specifications: {
//         Display: '2.5" Holographic',
//         Battery: "200mAh",
//         Connectivity: "Bluetooth 5.3",
//         "Water Resistance": "50m",
//       },
//       colorOptions: ["Midnight", "Solar Red", "Cosmic Silver"],
//     },
//   },
//   {
//     id: 3,
//     name: "Aether Headphones",
//     description: "Noise-cancelling with spatial audio",
//     price: 349,
//     image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
//     details: {
//       features: [
//         "Active Noise Cancellation",
//         "Spatial Audio",
//         "40hr battery",
//         "Voice Assistant",
//       ],
//       specifications: {
//         "Driver Size": "40mm",
//         Frequency: "20Hz-40kHz",
//         Bluetooth: "5.2",
//         Weight: "265g",
//       },
//       colorOptions: ["Matte Black", "Crystal White", "Neon Green"],
//     },
//     discount: 10,
//   },
//   {
//     id: 4,
//     name: "Celestial Drone",
//     description: "4K drone with AI tracking",
//     price: 1299,
//     image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=500",
//     details: {
//       features: [
//         "8K Camera",
//         "AI Tracking",
//         "40min flight time",
//         "Obstacle Avoidance",
//       ],
//       specifications: {
//         Camera: "8K 60fps",
//         Range: "15km",
//         Battery: "8000mAh",
//         "Max Speed": "80km/h",
//       },
//       colorOptions: ["Arctic White", "Stealth Black", "Sky Blue"],
//     },
//   },
//   {
//     id: 5,
//     name: "Nova Console",
//     description: "Next-generation gaming console",
//     price: 799,
//     image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500",
//     details: {
//       features: ["8K Gaming", "Ray Tracing", "1TB SSD", "Cloud Gaming"],
//       specifications: {
//         GPU: "Custom RDNA 3",
//         Storage: "1TB NVMe",
//         RAM: "16GB GDDR6",
//         Output: "8K @ 120Hz",
//       },
//       colorOptions: ["Phantom Black", "Cosmic Blue", "Lunar White"],
//     },
//   },
// ];

// // Tailwind Animation and Keyframes CSS (injected via style tag)
// const tailwindAnimations = `
//   @keyframes float {
//     0%, 100% { transform: translateY(0px); }
//     50% { transform: translateY(-20px); }
//   }

//   @keyframes glow {
//     0%, 100% { opacity: 0.2; }
//     50% { opacity: 0.5; }
//   }

//   @keyframes slide-in {
//     from { transform: translateX(100px); opacity: 0; }
//     to { transform: translateX(0); opacity: 1; }
//   }

//   @keyframes slide-out {
//     from { transform: translateX(0); opacity: 1; }
//     to { transform: translateX(-100px); opacity: 0; }
//   }

//   .animate-float {
//     animation: float 6s ease-in-out infinite;
//   }

//   .animate-glow {
//     animation: glow 2s ease-in-out infinite;
//   }

//   .animate-slide-in {
//     animation: slide-in 0.5s ease-out forwards;
//   }

//   .animate-slide-out {
//     animation: slide-out 0.5s ease-in forwards;
//   }

//   .neon-text {
//     text-shadow:
//       0 0 5px rgba(34, 211, 238, 0.8),
//       0 0 10px rgba(34, 211, 238, 0.6),
//       0 0 15px rgba(34, 211, 238, 0.4);
//   }

//   .neon-border {
//     box-shadow:
//       inset 0 0 20px rgba(34, 211, 238, 0.1),
//       0 0 20px rgba(34, 211, 238, 0.1),
//       0 0 40px rgba(168, 85, 247, 0.1);
//   }

//   .neon-glow {
//     box-shadow:
//       0 0 30px rgba(34, 211, 238, 0.3),
//       0 0 60px rgba(168, 85, 247, 0.2),
//       inset 0 0 20px rgba(34, 211, 238, 0.1);
//   }

//   .scrollbar-hidden {
//     -ms-overflow-style: none;
//     scrollbar-width: none;
//   }

//   .scrollbar-hidden::-webkit-scrollbar {
//     display: none;
//   }
// `;

// export default function ProductShowcase() {
//   const [selectedProduct, setSelectedProduct] = useState<Product>(products[2]);
//   const [showDetails, setShowDetails] = useState(false);
//   const [direction, setDirection] = useState(0);

//   const handleNext = () => {
//     setDirection(1);
//     const currentIndex = products.findIndex(p => p.id === selectedProduct.id);
//     const nextIndex = (currentIndex + 1) % products.length;
//     setSelectedProduct(products[nextIndex]);
//   };

//   const handlePrevious = () => {
//     setDirection(-1);
//     const currentIndex = products.findIndex(p => p.id === selectedProduct.id);
//     const prevIndex =
//       currentIndex === 0 ? products.length - 1 : currentIndex - 1;
//     setSelectedProduct(products[prevIndex]);
//   };

//   const handleProductClick = (product: Product) => {
//     const currentIndex = products.findIndex(p => p.id === selectedProduct.id);
//     const clickedIndex = products.findIndex(p => p.id === product.id);
//     setDirection(clickedIndex > currentIndex ? 1 : -1);
//     setSelectedProduct(product);
//   };

//   const getProductPosition = (index: number) => {
//     const selectedIndex = products.findIndex(p => p.id === selectedProduct.id);
//     const distance = index - selectedIndex;

//     if (distance === 0) return 0; // Center
//     if (Math.abs(distance) > 2) return null; // Too far

//     return distance;
//   };

//   return (
//     <>
//       {/* Inject Tailwind animations as style tag */}
//       <style jsx global>
//         {tailwindAnimations}
//       </style>

//       <div className="bg-linear-to-br from-gray-900 to-black p-4 md:p-8 min-h-screen overflow-hidden text-white">
//         {/* Neon Glow Background */}
//         <div className="absolute inset-0 overflow-hidden">
//           <div className="-top-40 -right-40 absolute bg-purple-500 opacity-20 blur-3xl rounded-full w-80 h-80 animate-pulse mix-blend-multiply filter"></div>
//           <div className="-bottom-40 -left-40 absolute bg-cyan-500 opacity-20 blur-3xl rounded-full w-80 h-80 animate-pulse delay-1000 mix-blend-multiply filter"></div>
//           <div className="top-1/4 left-1/4 absolute bg-blue-500 opacity-10 blur-3xl rounded-full w-64 h-64 animate-float mix-blend-multiply filter"></div>
//         </div>

//         {/* Header */}
//         <div className="relative mb-12 text-center">
//           <h1 className="mb-4 font-bold text-4xl md:text-6xl">
//             <span className="bg-clip-text bg-linear-to-r from-cyan-400 to-purple-500 text-transparent">
//               TECHNO
//             </span>
//             <span className="neon-text">STORE</span>
//           </h1>
//           <p className="text-gray-400 text-lg">
//             Experience the future of technology
//           </p>
//         </div>

//         <div className="relative mx-auto max-w-7xl">
//           {/* Main Content */}
//           <div className="items-center gap-8 grid grid-cols-1 lg:grid-cols-2 min-h-150">
//             {/* Left Panel - Product Info */}
//             <motion.div
//               key={selectedProduct.id}
//               initial={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
//               transition={{ duration: 0.5 }}
//               className="relative"
//             >
//               <div className="bg-gray-800/50 shadow-2xl backdrop-blur-lg p-6 md:p-8 border neon-border border-gray-700 rounded-2xl">
//                 {/* Discount Badge */}
//                 {selectedProduct.discount && (
//                   <div className="-top-3 -right-3 absolute animate-float">
//                     <div className="relative">
//                       <div className="absolute inset-0 bg-red-500 blur-md rounded-full animate-pulse"></div>
//                       <div className="relative bg-red-600 px-4 py-1 rounded-full font-bold text-white text-sm">
//                         -{selectedProduct.discount}% OFF
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 <div className="mb-6">
//                   <h2 className="mb-2 font-bold text-3xl md:text-4xl neon-text">
//                     {selectedProduct.name}
//                   </h2>
//                   <p className="text-gray-300 text-lg">
//                     {selectedProduct.description}
//                   </p>
//                 </div>

//                 {/* Features */}
//                 <div className="mb-6">
//                   <h3 className="flex items-center gap-2 mb-3 font-semibold text-xl">
//                     <Zap className="text-yellow-400" size={20} />
//                     Key Features
//                   </h3>
//                   <ul className="space-y-2">
//                     {selectedProduct.details.features.map((feature, index) => (
//                       <motion.li
//                         key={index}
//                         initial={{ opacity: 0, x: -20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ delay: index * 0.1 }}
//                         className="flex items-center gap-2 text-gray-300"
//                       >
//                         <div className="bg-cyan-400 rounded-full w-1.5 h-1.5 animate-pulse"></div>
//                         {feature}
//                       </motion.li>
//                     ))}
//                   </ul>
//                 </div>

//                 {/* Price */}
//                 <div className="mb-8">
//                   <div className="flex items-center gap-4">
//                     <span className="bg-clip-text bg-linear-to-r from-cyan-400 to-purple-500 font-bold text-transparent text-4xl">
//                       ${selectedProduct.price}
//                     </span>
//                     {selectedProduct.discount && (
//                       <span className="text-gray-400 text-xl line-through">
//                         $
//                         {(
//                           selectedProduct.price /
//                           (1 - selectedProduct.discount / 100)
//                         ).toFixed(0)}
//                       </span>
//                     )}
//                   </div>
//                 </div>

//                 {/* Buttons */}
//                 <div className="flex flex-wrap gap-4">
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={() => setShowDetails(true)}
//                     className="flex flex-1 justify-center items-center gap-2 bg-linear-to-r from-cyan-500 to-blue-600 shadow-lg hover:shadow-cyan-500/25 px-6 py-3 rounded-xl min-w-50 font-semibold text-white text-lg transition-all duration-300"
//                   >
//                     View Details
//                   </motion.button>
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     className="flex flex-1 justify-center items-center gap-2 bg-linear-to-r from-purple-500 to-pink-600 shadow-lg hover:shadow-purple-500/25 px-6 py-3 rounded-xl min-w-50 font-semibold text-white text-lg transition-all duration-300"
//                   >
//                     <ShoppingCart size={20} />
//                     Add to Cart
//                   </motion.button>
//                 </div>

//                 {/* Rating */}
//                 <div className="flex items-center gap-2 mt-6 text-gray-400">
//                   {[...Array(5)].map((_, i) => (
//                     <Star
//                       key={i}
//                       size={20}
//                       className="fill-yellow-400 text-yellow-400"
//                     />
//                   ))}
//                   <span className="ml-2">4.8 (2.4k reviews)</span>
//                 </div>
//               </div>
//             </motion.div>

//             {/* Right Panel - Angled Product Line */}
//             <div className="z-0 relative h-125 lg:h-150">
//               {/* Angled Line */}
//               <div className="top-1/2 left-1/2 absolute bg-linear-to-r from-transparent via-cyan-500 to-transparent w-[120%] h-0.5 rotate-12 -translate-x-1/2 -translate-y-1/2 animate-glow transform"></div>

//               {/* Products */}
//               <div className="relative h-full">
//                 {products.map((product, index) => {
//                   const position = getProductPosition(index);
//                   if (position === null) return null;

//                   const isSelected = product.id === selectedProduct.id;

//                   return (
//                     <motion.div
//                       key={product.id}
//                       layout
//                       initial={false}
//                       animate={{
//                         x: position * 120,
//                         y: Math.abs(position) * 40,
//                         scale: isSelected ? 1 : 0.85,
//                         opacity: isSelected ? 1 : 0.7,
//                         filter: isSelected ? "blur(0px)" : "blur(2px)",
//                         zIndex: isSelected ? 50 : 40 - Math.abs(position),
//                       }}
//                       transition={{
//                         type: "spring",
//                         stiffness: 300,
//                         damping: 30,
//                         duration: 0.5,
//                       }}
//                       className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer ${
//                         isSelected ? "" : ""
//                       }`}
//                       onClick={() => handleProductClick(product)}
//                     >
//                       {/* Product Card */}
//                       <div className="relative">
//                         {/* Glow Effect for selected */}
//                         {isSelected && (
//                           <motion.div
//                             className="absolute -inset-4 bg-linear-to-r from-cyan-500 to-purple-500 opacity-50 blur-xl rounded-2xl"
//                             animate={{
//                               opacity: [0.3, 0.5, 0.3],
//                               scale: [1, 1.05, 1],
//                             }}
//                             transition={{
//                               duration: 2,
//                               repeat: Infinity,
//                               ease: "easeInOut",
//                             }}
//                           />
//                         )}

//                         <div
//                           className={`relative  bg-gray-800 rounded-2xl p-4 border-2 transition-all duration-300 ${
//                             isSelected
//                               ? "border-cyan-400  shadow-2xl shadow-cyan-500/30"
//                               : "border-gray-700 hover:border-gray-600"
//                           }`}
//                         >
//                           {/* Product Image */}
//                           <div className="mb-4 rounded-xl w-48 md:w-56 h-48 md:h-56 overflow-hidden">
//                             <motion.img
//                               src={product.image}
//                               alt={product.name}
//                               className="w-full h-full object-cover"
//                               whileHover={{ scale: 1.1 }}
//                               transition={{ duration: 0.3 }}
//                             />
//                           </div>

//                           {/* Quick Info */}
//                           <div className="text-center">
//                             <h3 className="mb-1 font-semibold text-lg">
//                               {product.name}
//                             </h3>
//                             <p className="font-bold text-cyan-400">
//                               ${product.price}
//                             </p>
//                           </div>
//                         </div>

//                         {/* Selected Indicator */}
//                         {isSelected && (
//                           <motion.div
//                             initial={{ scale: 0 }}
//                             animate={{ scale: 1 }}
//                             transition={{ type: "spring", stiffness: 200 }}
//                             className="-top-2 -right-2 absolute flex justify-center items-center bg-linear-to-r from-cyan-500 to-purple-500 shadow-lg rounded-full w-8 h-8"
//                           >
//                             <div className="bg-white rounded-full w-2 h-2 animate-pulse"></div>
//                           </motion.div>
//                         )}
//                       </div>
//                     </motion.div>
//                   );
//                 })}
//               </div>

//               {/* Navigation Buttons */}
//               <div className="bottom-0 left-1/2 absolute flex gap-4 -translate-x-1/2">
//                 <motion.button
//                   whileHover={{ scale: 1.1, rotate: -5 }}
//                   whileTap={{ scale: 0.9 }}
//                   onClick={handlePrevious}
//                   className="flex justify-center items-center bg-linear-to-r from-cyan-500 to-blue-600 shadow-lg hover:shadow-cyan-500/50 rounded-full w-12 h-12 transition-all duration-300"
//                 >
//                   <ChevronLeft size={24} />
//                 </motion.button>

//                 <motion.button
//                   whileHover={{ scale: 1.1, rotate: 5 }}
//                   whileTap={{ scale: 0.9 }}
//                   onClick={handleNext}
//                   className="flex justify-center items-center bg-linear-to-r from-purple-500 to-pink-600 shadow-lg hover:shadow-purple-500/50 rounded-full w-12 h-12 transition-all duration-300"
//                 >
//                   <ChevronRight size={24} />
//                 </motion.button>
//               </div>
//             </div>
//           </div>

//           {/* Product Indicators */}
//           <div className="flex justify-center gap-3 mt-12">
//             {products.map((product, index) => {
//               const isActive = product.id === selectedProduct.id;
//               return (
//                 <motion.button
//                   key={product.id}
//                   onClick={() => handleProductClick(product)}
//                   whileHover={{ scale: 1.2 }}
//                   whileTap={{ scale: 0.9 }}
//                   className="relative"
//                 >
//                   {isActive && (
//                     <motion.div
//                       layoutId="activeIndicator"
//                       className="absolute -inset-2 bg-cyan-500 opacity-50 blur-md rounded-full"
//                     />
//                   )}
//                   <div
//                     className={`w-3 h-3 rounded-full relative transition-all duration-300 ${
//                       isActive
//                         ? "w-12 bg-linear-to-r from-cyan-500 to-purple-500"
//                         : "bg-gray-700 hover:bg-gray-600"
//                     }`}
//                   />
//                 </motion.button>
//               );
//             })}
//           </div>
//         </div>

//         {/* Details Modal */}
//         <AnimatePresence>
//           {showDetails && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="z-70 fixed inset-0 flex justify-center items-center bg-black/80 backdrop-blur-sm p-4"
//               onClick={() => setShowDetails(false)}
//             >
//               <motion.div
//                 initial={{ scale: 0.9, opacity: 0, y: 20 }}
//                 animate={{ scale: 1, opacity: 1, y: 0 }}
//                 exit={{ scale: 0.9, opacity: 0, y: 20 }}
//                 transition={{ type: "spring", damping: 25 }}
//                 onClick={e => e.stopPropagation()}
//                 className="scrollbar-hidden bg-gray-900 shadow-2xl border border-gray-700 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto neon-glow"
//               >
//                 <div className="p-6 md:p-8">
//                   {/* Header */}
//                   <div className="flex justify-between items-start mb-8">
//                     <div>
//                       <h2 className="mb-2 font-bold text-3xl neon-text">
//                         {selectedProduct.name}
//                       </h2>
//                       <p className="text-gray-400">
//                         {selectedProduct.description}
//                       </p>
//                     </div>
//                     <motion.button
//                       whileHover={{ rotate: 90, scale: 1.1 }}
//                       whileTap={{ scale: 0.9 }}
//                       onClick={() => setShowDetails(false)}
//                       className="flex justify-center items-center bg-gray-800 hover:bg-gray-700 rounded-full w-10 h-10 transition-all duration-300"
//                     >
//                       <X size={24} />
//                     </motion.button>
//                   </div>

//                   <div className="gap-8 grid grid-cols-1 lg:grid-cols-2">
//                     {/* Left Column */}
//                     <div>
//                       <motion.div
//                         initial={{ opacity: 0, scale: 0.9 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         transition={{ delay: 0.1 }}
//                         className="mb-6 border border-gray-700 rounded-2xl overflow-hidden"
//                       >
//                         <img
//                           src={selectedProduct.image}
//                           alt={selectedProduct.name}
//                           className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
//                         />
//                       </motion.div>

//                       {/* Specifications */}
//                       <div>
//                         <h3 className="flex items-center gap-2 mb-4 font-bold text-2xl">
//                           <Zap className="text-cyan-400" size={24} />
//                           Specifications
//                         </h3>
//                         <div className="space-y-3">
//                           {Object.entries(
//                             selectedProduct.details.specifications
//                           ).map(([key, value], index) => (
//                             <motion.div
//                               key={key}
//                               initial={{ opacity: 0, x: -20 }}
//                               animate={{ opacity: 1, x: 0 }}
//                               transition={{ delay: index * 0.05 }}
//                               className="flex justify-between items-center hover:bg-gray-800/50 px-3 py-3 border-gray-800 border-b rounded-lg transition-colors duration-300"
//                             >
//                               <span className="text-gray-400">{key}</span>
//                               <span className="font-semibold text-cyan-300">
//                                 {value}
//                               </span>
//                             </motion.div>
//                           ))}
//                         </div>
//                       </div>
//                     </div>

//                     {/* Right Column */}
//                     <div className="space-y-8">
//                       {/* Color Options */}
//                       <div>
//                         <h3 className="mb-4 font-bold text-2xl">
//                           Color Options
//                         </h3>
//                         <div className="flex flex-wrap gap-4">
//                           {selectedProduct.details.colorOptions.map(
//                             (color, index) => (
//                               <motion.div
//                                 key={color}
//                                 initial={{ opacity: 0, scale: 0 }}
//                                 animate={{ opacity: 1, scale: 1 }}
//                                 transition={{ delay: index * 0.1 }}
//                                 whileHover={{ scale: 1.1, y: -5 }}
//                                 whileTap={{ scale: 0.95 }}
//                                 className={`w-16 h-16 rounded-xl border-2 cursor-pointer ${
//                                   index === 0
//                                     ? " border-cyan-400 shadow-lg shadow-cyan-500/30"
//                                     : "border-gray-700"
//                                 } transition-all duration-300`}
//                                 style={{
//                                   backgroundColor: color
//                                     .toLowerCase()
//                                     .includes("black")
//                                     ? "#1a1a1a"
//                                     : color.toLowerCase().includes("white")
//                                       ? "#f0f0f0"
//                                       : color.toLowerCase().includes("blue")
//                                         ? "#3b82f6"
//                                         : color.toLowerCase().includes("red")
//                                           ? "#ef4444"
//                                           : color
//                                                 .toLowerCase()
//                                                 .includes("green")
//                                             ? "#10b981"
//                                             : color
//                                                   .toLowerCase()
//                                                   .includes("gray")
//                                               ? "#6b7280"
//                                               : color
//                                                     .toLowerCase()
//                                                     .includes("silver")
//                                                 ? "#9ca3af"
//                                                 : "#8b5cf6",
//                                 }}
//                                 title={color}
//                               />
//                             )
//                           )}
//                         </div>
//                       </div>

//                       {/* Full Features */}
//                       <div>
//                         <h3 className="mb-4 font-bold text-2xl">
//                           All Features
//                         </h3>
//                         <ul className="space-y-3">
//                           {selectedProduct.details.features.map(
//                             (feature, index) => (
//                               <motion.li
//                                 key={index}
//                                 initial={{ opacity: 0, x: -20 }}
//                                 animate={{ opacity: 1, x: 0 }}
//                                 transition={{ delay: index * 0.05 }}
//                                 whileHover={{ x: 5 }}
//                                 className="flex items-start gap-3 bg-gray-800/50 hover:bg-gray-800/70 p-3 rounded-xl transition-all duration-300"
//                               >
//                                 <motion.div
//                                   className="bg-cyan-400 mt-2 rounded-full w-2 h-2"
//                                   animate={{ scale: [1, 1.5, 1] }}
//                                   transition={{ duration: 2, repeat: Infinity }}
//                                 />
//                                 <span>{feature}</span>
//                               </motion.li>
//                             )
//                           )}
//                         </ul>
//                       </div>

//                       {/* Price & Action */}
//                       <motion.div
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: 0.3 }}
//                         className="bg-linear-to-r from-gray-800 to-gray-900 p-6 border neon-border border-gray-700 rounded-2xl"
//                       >
//                         <div className="flex justify-between items-center mb-6">
//                           <div>
//                             <div className="bg-clip-text bg-linear-to-r from-cyan-400 to-purple-500 font-bold text-transparent text-5xl">
//                               ${selectedProduct.price}
//                             </div>
//                             {selectedProduct.discount && (
//                               <motion.div
//                                 initial={{ opacity: 0, scale: 0.8 }}
//                                 animate={{ opacity: 1, scale: 1 }}
//                                 className="text-gray-400"
//                               >
//                                 <span className="text-xl line-through">
//                                   $
//                                   {(
//                                     selectedProduct.price /
//                                     (1 - selectedProduct.discount / 100)
//                                   ).toFixed(0)}
//                                 </span>
//                                 <span className="ml-3 font-semibold text-green-400">
//                                   Save {selectedProduct.discount}%
//                                 </span>
//                               </motion.div>
//                             )}
//                           </div>
//                           <div className="text-right">
//                             <div className="flex items-center gap-1 mb-2">
//                               {[...Array(5)].map((_, i) => (
//                                 <Star
//                                   key={i}
//                                   size={20}
//                                   className="fill-yellow-400 text-yellow-400"
//                                 />
//                               ))}
//                             </div>
//                             <div className="text-gray-400">
//                               4.8/5 from 2.4k reviews
//                             </div>
//                           </div>
//                         </div>

//                         <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
//                           <motion.button
//                             whileHover={{
//                               scale: 1.05,
//                               boxShadow: "0 0 30px rgba(34, 211, 238, 0.5)",
//                             }}
//                             whileTap={{ scale: 0.95 }}
//                             className="bg-linear-to-r from-cyan-500 to-blue-600 shadow-lg py-4 rounded-xl w-full font-bold text-white text-lg transition-all duration-300"
//                           >
//                             Buy Now
//                           </motion.button>
//                           <motion.button
//                             whileHover={{
//                               scale: 1.05,
//                               boxShadow: "0 0 30px rgba(168, 85, 247, 0.5)",
//                             }}
//                             whileTap={{ scale: 0.95 }}
//                             className="flex justify-center items-center gap-2 bg-linear-to-r from-purple-500 to-pink-600 shadow-lg py-4 rounded-xl w-full font-bold text-white text-lg transition-all duration-300"
//                           >
//                             <ShoppingCart size={24} />
//                             Add to Cart
//                           </motion.button>
//                         </div>
//                       </motion.div>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </>
//   );
// }

// @ts-nocheck
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Zap,
  Star,
  ShoppingCart,
} from "lucide-react";

const products = [
  {
    id: 1,
    name: "Man Jeans",
    description: "Premium Woven Jeans for Trnedy Fashion",
    price: 2499,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
    features: [
      "Organic Cotton",
      "Slim Fit",
      "6th Pokecket",
      "3 Colors Available",
    ],
    specs: {
      Processor: "Quantum QX-9",
      Graphics: "Neural RTX 5090",
      Battery: "99Wh",
      Weight: "1.8kg",
    },
    colors: ["Space Gray", "Neon Blue", "Phantom Black"],
    discount: 15,
  },
  {
    id: 2,
    name: "Nebula Watch Pro",
    description: "Smartwatch with holographic display",
    price: 599,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    features: [
      "Holographic Display",
      "Health Monitoring",
      "7-day battery",
      "Water resistant",
    ],
    specs: {
      Display: '2.5" Holographic',
      Battery: "200mAh",
      Connectivity: "Bluetooth 5.3",
      "Water Resistance": "50m",
    },
    colors: ["Midnight", "Solar Red", "Cosmic Silver"],
  },
  {
    id: 3,
    name: "Aether Headphones",
    description: "Noise-cancelling with spatial audio",
    price: 349,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    features: [
      "Active Noise Cancellation",
      "Spatial Audio",
      "40hr battery",
      "Voice Assistant",
    ],
    specs: {
      "Driver Size": "40mm",
      Frequency: "20Hz-40kHz",
      Bluetooth: "5.2",
      Weight: "265g",
    },
    colors: ["Matte Black", "Crystal White", "Neon Green"],
    discount: 10,
  },
  {
    id: 4,
    name: "Celestial Drone",
    description: "4K drone with AI tracking",
    price: 1299,
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=500",
    features: [
      "8K Camera",
      "AI Tracking",
      "40min flight time",
      "Obstacle Avoidance",
    ],
    specs: {
      Camera: "8K 60fps",
      Range: "15km",
      Battery: "8000mAh",
      "Max Speed": "80km/h",
    },
    colors: ["Arctic White", "Stealth Black", "Sky Blue"],
  },
  {
    id: 5,
    name: "Nova Console",
    description: "Next-generation gaming console",
    price: 799,
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500",
    features: ["8K Gaming", "Ray Tracing", "1TB SSD", "Cloud Gaming"],
    specs: {
      GPU: "Custom RDNA 3",
      Storage: "1TB NVMe",
      RAM: "16GB GDDR6",
      Output: "8K @ 120Hz",
    },
    colors: ["Phantom Black", "Cosmic Blue", "Lunar White"],
  },
];

export default function ProductShowcase() {
  const [selected, setSelected] = useState(products[2]);
  const [showModal, setShowModal] = useState(false);

  const navigate = direction => {
    const idx = products.findIndex(p => p.id === selected.id);
    const next =
      direction > 0
        ? (idx + 1) % products.length
        : idx === 0
          ? products.length - 1
          : idx - 1;
    setSelected(products[next]);
  };

  const getColorBg = color => {
    const colorMap = {
      black: "#1a1a1a",
      white: "#f0f0f0",
      blue: "#3b82f6",
      red: "#ef4444",
      green: "#10b981",
      gray: "#6b7280",
      silver: "#9ca3af",
    };
    return (
      Object.entries(colorMap).find(([k]) =>
        color.toLowerCase().includes(k)
      )?.[1] || "#8b5cf6"
    );
  };

  return (
    <div className="bg-linear-to-br from-gray-900 to-black p-4 md:p-8 min-h-screen text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="-top-40 -right-40 absolute bg-purple-500 opacity-20 blur-3xl rounded-full w-80 h-80 animate-pulse" />
        <div className="-bottom-40 -left-40 absolute bg-cyan-500 opacity-20 blur-3xl rounded-full w-80 h-80 animate-pulse" />
      </div>

      {/* Header */}
      <div className="relative mb-12 text-center">
        <h1 className="mb-4 font-bold text-4xl md:text-6xl">
          <span className="bg-clip-text bg-linear-to-r from-cyan-400 to-purple-500 text-transparent">
            MBRELLA{" "}
          </span>
          <span className="text-white">STORE</span>
        </h1>
        <p className="text-gray-400 text-lg">Experience the Fashion Flow</p>
      </div>

      {/* Main Content */}
      <div className="relative mx-auto max-w-7xl">
        <div className="items-center gap-40 grid grid-cols-1 lg:grid-cols-2">
          {/* Product Info */}
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative bg-gray-800/50 backdrop-blur-lg p-6 md:p-8 border border-gray-700 rounded-2xl"
          >
            {selected.discount && (
              <div className="-top-3 -right-3 absolute bg-red-600 px-4 py-1 rounded-full font-bold text-white text-sm">
                -{selected.discount}% OFF
              </div>
            )}

            <h2 className="mb-2 font-bold text-cyan-400 text-3xl md:text-4xl">
              {selected.name}
            </h2>
            <p className="mb-6 text-gray-300 text-lg">{selected.description}</p>

            <div className="mb-6">
              <h3 className="flex items-center gap-2 mb-3 font-semibold text-xl">
                <Zap className="text-yellow-400" size={20} />
                Key Features
              </h3>
              <ul className="space-y-2">
                {selected.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-300">
                    <div className="bg-cyan-400 rounded-full w-1.5 h-1.5" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <span className="bg-clip-text bg-linear-to-r from-cyan-400 to-purple-500 font-bold text-transparent text-4xl">
                ${selected.price}
              </span>
              {selected.discount && (
                <span className="text-gray-400 text-xl line-through">
                  ${(selected.price / (1 - selected.discount / 100)).toFixed(0)}
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-4 mb-6">
              <button
                onClick={() => setShowModal(true)}
                className="flex-1 bg-linear-to-r from-cyan-500 to-blue-600 hover:shadow-lg px-6 py-3 rounded-xl min-w-37.5 font-semibold transition-all"
              >
                View Details
              </button>
              <button className="flex flex-1 justify-center items-center gap-2 bg-linear-to-r from-purple-500 to-pink-600 hover:shadow-lg px-6 py-3 rounded-xl min-w-37.5 font-semibold transition-all">
                <ShoppingCart size={20} />
                Add to Cart
              </button>
            </div>

            <div className="flex items-center gap-2 text-gray-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className="fill-yellow-400 text-yellow-400"
                />
              ))}
              <span className="ml-2">4.8 (2.4k reviews)</span>
            </div>
          </motion.div>

          {/* Product Carousel */}
          <div className="z-0 relative h-125">
            <div className="top-1/2 left-1/2 absolute bg-linear-to-r from-transparent via-cyan-500 to-transparent w-[120%] h-0.5 rotate-12 -translate-x-1/2 -translate-y-1/2 transform" />

            {products.map((p, i) => {
              const idx = products.findIndex(x => x.id === selected.id);
              const pos = i - idx;
              if (Math.abs(pos) > 2) return null;
              const isActive = p.id === selected.id;

              return (
                <motion.div
                  key={p.id}
                  animate={{
                    x: pos * 120,
                    y: Math.abs(pos) * 40,
                    scale: isActive ? 1 : 0.85,
                    opacity: isActive ? 1 : 0.7,
                    zIndex: isActive ? 50 : 40 - Math.abs(pos),
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="top-1/2 left-1/2 absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={() => setSelected(p)}
                >
                  <div
                    className={`bg-gray-800 rounded-2xl p-4 border-2 transition-all ${
                      isActive
                        ? "border-cyan-400 shadow-2xl"
                        : "border-gray-700"
                    }`}
                  >
                    <div className="mb-4 rounded-xl w-48 md:w-56 h-48 md:h-56 overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-center">
                      <h3 className="mb-1 font-semibold text-lg">{p.name}</h3>
                      <p className="font-bold text-cyan-400">${p.price}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Navigation */}
            <div className="bottom-0 left-1/2 absolute flex gap-4 -translate-x-1/2">
              <button
                onClick={() => navigate(-1)}
                className="flex justify-center items-center bg-linear-to-r from-cyan-500 to-blue-600 rounded-full w-12 h-12 hover:scale-110 transition-transform"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={() => navigate(1)}
                className="flex justify-center items-center bg-linear-to-r from-purple-500 to-pink-600 rounded-full w-12 h-12 hover:scale-110 transition-transform"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-3 mt-12">
          {products.map(p => (
            <button
              key={p.id}
              onClick={() => setSelected(p)}
              className={`h-3 rounded-full transition-all ${
                p.id === selected.id
                  ? "w-12 bg-linear-to-r from-cyan-500 to-purple-500"
                  : "w-3 bg-gray-700"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Details Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="z-50 fixed inset-0 flex justify-center items-center bg-black/80 backdrop-blur-sm mt-8 p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-gray-900 border border-gray-700 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 md:p-8">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h2 className="mb-2 font-bold text-cyan-400 text-3xl">
                      {selected.name}
                    </h2>
                    <p className="text-gray-400">{selected.description}</p>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex justify-center items-center bg-gray-800 hover:bg-gray-700 rounded-full w-10 h-10"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="gap-8 grid grid-cols-1 lg:grid-cols-2">
                  {/* Left Column */}
                  <div>
                    <div className="mb-6 border border-gray-700 rounded-2xl overflow-hidden">
                      <img
                        src={selected.image}
                        alt={selected.name}
                        className="w-full h-64 object-cover"
                      />
                    </div>

                    <h3 className="flex items-center gap-2 mb-4 font-bold text-2xl">
                      <Zap className="text-cyan-400" size={24} />
                      Specifications
                    </h3>
                    <div className="space-y-3">
                      {Object.entries(selected.specs).map(([k, v]) => (
                        <div
                          key={k}
                          className="flex justify-between items-center hover:bg-gray-800/50 px-3 py-3 border-gray-800 border-b rounded-lg"
                        >
                          <span className="text-gray-400">{k}</span>
                          <span className="font-semibold text-cyan-300">
                            {v}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-8">
                    <div>
                      <h3 className="mb-4 font-bold text-2xl">Color Options</h3>
                      <div className="flex flex-wrap gap-4">
                        {selected.colors.map((c, i) => (
                          <div
                            key={c}
                            className={`w-16 h-16 rounded-xl border-2 cursor-pointer ${
                              i === 0 ? "border-cyan-400" : "border-gray-700"
                            }`}
                            style={{ backgroundColor: getColorBg(c) }}
                            title={c}
                          />
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-4 font-bold text-2xl">All Features</h3>
                      <ul className="space-y-3">
                        {selected.features.map((f, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 bg-gray-800/50 p-3 rounded-xl"
                          >
                            <div className="bg-cyan-400 mt-2 rounded-full w-2 h-2" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-linear-to-r from-gray-800 to-gray-900 p-6 border border-gray-700 rounded-2xl">
                      <div className="flex justify-between items-center mb-6">
                        <div>
                          <div className="bg-clip-text bg-linear-to-r from-cyan-400 to-purple-500 font-bold text-transparent text-5xl">
                            ${selected.price}
                          </div>
                          {selected.discount && (
                            <div className="text-gray-400">
                              <span className="text-xl line-through">
                                $
                                {(
                                  selected.price /
                                  (1 - selected.discount / 100)
                                ).toFixed(0)}
                              </span>
                              <span className="ml-3 font-semibold text-green-400">
                                Save {selected.discount}%
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={20}
                                className="fill-yellow-400 text-yellow-400"
                              />
                            ))}
                          </div>
                          <div className="text-gray-400">
                            4.8/5 from 2.4k reviews
                          </div>
                        </div>
                      </div>

                      <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                        <button className="bg-linear-to-r from-cyan-500 to-blue-600 py-4 rounded-xl font-bold hover:scale-105 transition-transform">
                          Buy Now
                        </button>
                        <button className="flex justify-center items-center gap-2 bg-linear-to-r from-purple-500 to-pink-600 py-4 rounded-xl font-bold hover:scale-105 transition-transform">
                          <ShoppingCart size={24} />
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
