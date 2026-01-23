// import Link from "next/link";
// import { BsShopWindow } from "react-icons/bs";
// import { FaAccusoft, FaArrowDown } from "react-icons/fa";
// import { FaArrowDown19, FaArrowDown91, FaLocationDot } from "react-icons/fa6";
// import { MdKeyboardArrowDown } from "react-icons/md";
// import { RiAccountCircleLine } from "react-icons/ri";
// import "flag-icons/css/flag-icons.min.css";

// function HeaderTop() {
//   return (
//     <div className="flex bg-amber-400 mx-auto w-full h-10.75">
//       <div className="flex flex-row justify-between items-center mx-auto lg:w-360 text-black">
//         <h3 className="hidden lg:flex">
//           For any querires or asking, please contact{" "}
//           <span className="font-semibold text-blue-800">(+880) 1515212670</span>
//         </h3>
//         <div className="flex flex-row justify-around items-center gap-3 font-sans">
//           <h3 className="flex items-center gap-1">
//             {" "}
//             <RiAccountCircleLine size={20} color="blue" /> Account{" "}
//             <MdKeyboardArrowDown size={24} color="blue" />
//           </h3>
//           <h3 className="text-white">|</h3>
//           <Link href="#" className="flex items-center gap-1">
//             {" "}
//             <BsShopWindow size={16} color="blue" />
//             Outlets
//           </Link>
//           <h3 className="text-white">|</h3>
//           <h3 className="flex flex-row items-center gap-1">
//             <FaLocationDot size={16} color="blue" /> BGD{" "}
//             <MdKeyboardArrowDown size={24} color="blue" />
//           </h3>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default HeaderTop;

"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { BsShopWindow } from "react-icons/bs";
import { MdKeyboardArrowDown } from "react-icons/md";
import { RiAccountCircleLine } from "react-icons/ri";
import "flag-icons/css/flag-icons.min.css";

function HeaderTop() {
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    code: "BGD",
    flag: "bd",
    name: "Bangladesh",
  });

  const accountRef = useRef<HTMLDivElement>(null);
  const countryRef = useRef<HTMLDivElement>(null);

  const countries = [
    { code: "BGD", flag: "bd", name: "Bangladesh" },
    { code: "USA", flag: "us", name: "United States" },
    { code: "GBR", flag: "gb", name: "United Kingdom" },
    { code: "IND", flag: "in", name: "India" },
    { code: "PAK", flag: "pk", name: "Pakistan" },
    { code: "AUS", flag: "au", name: "Australia" },
    { code: "CAN", flag: "ca", name: "Canada" },
    { code: "SGP", flag: "sg", name: "Singapore" },
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        accountRef.current &&
        !accountRef.current.contains(event.target as Node)
      ) {
        setIsAccountOpen(false);
      }
      if (
        countryRef.current &&
        !countryRef.current.contains(event.target as Node)
      ) {
        setIsCountryOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCountrySelect = (country: (typeof countries)[0]) => {
    setSelectedCountry(country);
    setIsCountryOpen(false);
  };

  return (
    <div className="z-51 flex bg-amber-400 mx-auto w-full h-10.75">
      <div className="flex flex-row justify-between items-center mx-auto lg:w-360 text-black">
        <div className="hidden lg:flex flex-row justify-around items-center gap-5">
          <h3 className="font-sans">
            For any queries or asking, please contact
          </h3>
          <h3 className="font-semibold text-blue-800">(+880) 1515212670</h3>
        </div>
        <div className="flex flex-row justify-around items-center gap-3 font-sans">
          {/* Account Dropdown */}
          <div className="relative" ref={accountRef}>
            <button
              onClick={() => setIsAccountOpen(!isAccountOpen)}
              className="flex items-center gap-1 hover:opacity-80 transition-opacity cursor-pointer"
            >
              <RiAccountCircleLine size={20} color="blue" /> Account{" "}
              <span
                className={`transition-transform inline-block ${
                  isAccountOpen ? "rotate-180" : ""
                }`}
              >
                <MdKeyboardArrowDown size={24} color="blue" />
              </span>
            </button>

            {isAccountOpen && (
              <div className="top-full right-0 z-50 absolute bg-white shadow-lg mt-2 rounded-md min-w-37.5 overflow-hidden">
                <Link
                  href="/login"
                  className="block hover:bg-blue-50 px-4 py-2 text-gray-700 transition-colors"
                  onClick={() => setIsAccountOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="block hover:bg-blue-50 px-4 py-2 text-gray-700 transition-colors"
                  onClick={() => setIsAccountOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          <h3 className="text-white">|</h3>

          <Link
            href="#"
            className="flex items-center gap-1 hover:opacity-80 transition-opacity"
          >
            <BsShopWindow size={16} color="blue" />
            Outlets
          </Link>

          <h3 className="text-white">|</h3>

          {/* Country Dropdown */}
          <div className="z-51 relative" ref={countryRef}>
            <button
              onClick={() => setIsCountryOpen(!isCountryOpen)}
              className="flex flex-row items-center gap-1 hover:opacity-80 transition-opacity cursor-pointer"
            >
              <span className={`fi fi-${selectedCountry.flag} mr-1`}></span>
              {selectedCountry.code}{" "}
              <span
                className={`transition-transform inline-block ${
                  isCountryOpen ? "rotate-180" : ""
                }`}
              >
                <MdKeyboardArrowDown size={24} color="blue" />
              </span>
            </button>

            {isCountryOpen && (
              <div className="top-full right-0 z-50 absolute bg-white shadow-lg mt-2 rounded-md min-w-50 max-h-75 overflow-hidden overflow-y-auto">
                {countries.map(country => (
                  <button
                    key={country.code}
                    onClick={() => handleCountrySelect(country)}
                    className="flex items-center gap-2 hover:bg-blue-50 px-4 py-2 w-full text-gray-700 text-left transition-colors"
                  >
                    <span className={`fi fi-${country.flag}`}></span>
                    <span>{country.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderTop;
