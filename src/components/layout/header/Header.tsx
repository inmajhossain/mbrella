"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Search,
  ShoppingCart,
  Menu,
  X,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import HeaderTop from "./HeaderTop";

// Types
interface MenuItem {
  name: string;
  items: string[];
}

interface MenuCategory {
  name: string;
  subcategories: MenuItem[];
}

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

// Sample data structure
const menuData: MenuCategory[] = [
  {
    name: "Men",
    subcategories: [
      {
        name: "Clothing",
        items: ["Shirts", "T-Shirts", "Pants", "Jeans", "Jackets"],
      },
      {
        name: "Footwear",
        items: ["Sneakers", "Formal Shoes", "Sandals", "Boots"],
      },
      {
        name: "Accessories",
        items: ["Belts", "Wallets", "Sunglasses", "Watches"],
      },
    ],
  },
  {
    name: "Women",
    subcategories: [
      {
        name: "Clothing",
        items: ["Dresses", "Tops", "Skirts", "Jeans", "Jackets"],
      },
      {
        name: "Footwear",
        items: ["Heels", "Flats", "Sandals", "Boots"],
      },
      {
        name: "Accessories",
        items: ["Handbags", "Jewelry", "Scarves", "Sunglasses"],
      },
    ],
  },
  {
    name: "Kids",
    subcategories: [
      {
        name: "Boys",
        items: ["T-Shirts", "Shorts", "Shoes", "Accessories"],
      },
      {
        name: "Girls",
        items: ["Dresses", "Tops", "Shoes", "Accessories"],
      },
    ],
  },
  {
    name: "CAP",
    subcategories: [
      {
        name: "Baseball Caps",
        items: ["Sports Caps", "Casual Caps", "Branded Caps"],
      },
      {
        name: "Beanies",
        items: ["Winter Beanies", "Summer Beanies"],
      },
    ],
  },
  {
    name: "The Mbrella X Influencer",
    subcategories: [
      {
        name: "Clothing",
        items: ["Shirts", "T-Shirts", "Pants", "Jeans", "Jackets"],
      },
      {
        name: "Footwear",
        items: ["Sneakers", "Formal Shoes", "Sandals", "Boots"],
      },
      {
        name: "Accessories",
        items: ["Belts", "Wallets", "Sunglasses", "Watches"],
      },
    ],
  },
  {
    name: "U by Mbrella",
    subcategories: [
      {
        name: "Clothing",
        items: ["Dresses", "Tops", "Skirts", "Jeans", "Jackets"],
      },
      {
        name: "Footwear",
        items: ["Heels", "Flats", "Sandals", "Boots"],
      },
      {
        name: "Accessories",
        items: ["Handbags", "Jewelry", "Scarves", "Sunglasses"],
      },
    ],
  },
  {
    name: "MOMENTUM",
    subcategories: [
      {
        name: "Boys",
        items: ["T-Shirts", "Shorts", "Shoes", "Accessories"],
      },
      {
        name: "Girls",
        items: ["Dresses", "Tops", "Shoes", "Accessories"],
      },
    ],
  },
  {
    name: "Formal Edge/25",
    subcategories: [
      {
        name: "Baseball Caps",
        items: ["Sports Caps", "Casual Caps", "Branded Caps"],
      },
      {
        name: "Beanies",
        items: ["Winter Beanies", "Summer Beanies"],
      },
    ],
  },
  {
    name: "Winter 25/26",
    subcategories: [
      {
        name: "Boys",
        items: ["T-Shirts", "Shorts", "Shoes", "Accessories"],
      },
      {
        name: "Girls",
        items: ["Dresses", "Tops", "Shoes", "Accessories"],
      },
    ],
  },
  {
    name: "SALE",
    subcategories: [
      {
        name: "Baseball Caps",
        items: ["Sports Caps", "Casual Caps", "Branded Caps"],
      },
      {
        name: "Beanies",
        items: ["Winter Beanies", "Summer Beanies"],
      },
    ],
  },
];

const products: Product[] = [
  { id: 1, name: "Classic White Shirt", price: 49.99, image: "🎽" },
  { id: 2, name: "Blue Denim Jeans", price: 79.99, image: "👖" },
  { id: 3, name: "Leather Jacket", price: 199.99, image: "🧥" },
  { id: 4, name: "Sneakers", price: 89.99, image: "👟" },
  { id: 5, name: "Summer Dress", price: 69.99, image: "👗" },
];

export default function MbrellaHeader() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [mobileActiveCategory, setMobileActiveCategory] =
    useState<MenuCategory | null>(null);
  const [mobileActiveSubcategory, setMobileActiveSubcategory] =
    useState<MenuItem | null>(null);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearchOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (product: Product) => {
    setCartItems([...cartItems, { ...product, quantity: 1 }]);
  };

  const removeFromCart = (index: number) => {
    const newCart = [...cartItems];
    newCart.splice(index, 1);
    setCartItems(newCart);
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <header
        className={`z-1 transition-all duration-800 fixed left-0  right-0 ${
          isScrolled
            ? "bg-black/20 backdrop-blur-xl top-0"
            : "bg-[#383838] top-10.75 "
        }`}
      >
        <div className="mx-auto px-4 max-w-360">
          <div className="flex justify-between items-center lg:gap-12.5 h-16 lg:h-25 lg:font-sans">
            {/* Logo */}
            <Link href="/" className="font-bold text-amber-500 text-2xl">
              MBRELLA
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
              {menuData.map(menu => (
                <div
                  key={menu.name}
                  className="relative"
                  onMouseEnter={() => setHoveredMenu(menu.name)}
                  onMouseLeave={() => setHoveredMenu(null)}
                >
                  <button className="flex items-center space-x-1 py-2 text-amber-500 hover:text-amber-400">
                    <span>{menu.name}</span>
                    <ChevronDown size={16} />
                  </button>

                  {hoveredMenu === menu.name && (
                    <div className="top-full left-0 absolute bg-white shadow-xl mt-2 p-6 rounded-lg min-w-150">
                      <div className="gap-6 grid grid-cols-3">
                        {menu.subcategories.map(sub => (
                          <div key={sub.name}>
                            <h3 className="mb-3 font-semibold text-gray-900">
                              {sub.name}
                            </h3>
                            <ul className="space-y-2">
                              {sub.items.map(item => (
                                <li key={item}>
                                  <Link
                                    href={`/${menu.name.toLowerCase()}/${sub.name.toLowerCase()}/${item.toLowerCase()}`}
                                    className="text-gray-600 hover:text-amber-500 text-sm"
                                  >
                                    {item}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="text-amber-500 hover:text-amber-400"
              >
                <Search size={20} />
              </button>
              <Link
                href="/wishlist"
                className="text-amber-500 hover:text-amber-400"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </Link>
              <button
                onClick={() => setCartOpen(true)}
                className="relative text-amber-500 hover:text-amber-400"
              >
                <ShoppingCart size={20} />
                {cartItems.length > 0 && (
                  <span className="-top-2 -right-2 absolute flex justify-center items-center bg-red-500 rounded-full w-5 h-5 text-white text-xs">
                    {cartItems.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden text-amber-500 hover:text-amber-400"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Search Dropdown */}
        {searchOpen && (
          <div
            ref={searchRef}
            className={`fixed left-0 right-0 top-25 md:top-27 lg:top-35 lg:w-319 mx-auto z-40 transition-all duration-500 ease-in-out bg-none ${
              searchOpen
                ? "translate-y-0 opacity-100 pointer-events-auto"
                : "-translate-y-full opacity-0 pointer-events-none"
            }`}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0"
              onClick={() => setSearchOpen(false)}
            />

            {/* Drawer Panel */}
            <div className="relative mx-auto px-2 py-2 max-w-360">
              <div className="shadow-2xl backdrop-blur-md p-2 rounded-lg">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="px-4 py-3 border-2 border-white rounded-md focus:outline-none w-full text-white"
                />

                {searchQuery && (
                  <div className="mt-4 max-h-96 overflow-y-auto">
                    {filteredProducts.length > 0 ? (
                      <div className="space-y-2">
                        {filteredProducts.map(product => (
                          <div
                            key={product.id}
                            className="flex justify-between items-center hover:bg-black/10 p-3 rounded-lg"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="text-3xl">{product.image}</div>
                              <div>
                                <p className="font-medium text-white">
                                  {product.name}
                                </p>
                                <p className="text-white text-sm">
                                  ${product.price}
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={() => addToCart(product)}
                              className="bg-amber-500 hover:bg-amber-600 px-4 py-2 rounded-lg text-white"
                            >
                              Add
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="py-8 text-gray-600 text-center">
                        No products found
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-53 lg:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => {
            setMobileMenuOpen(false);
            setMobileActiveCategory(null);
            setMobileActiveSubcategory(null);
          }}
        />

        {/* Main Categories */}
        <div
          className={` absolute top-10 left-0 bottom-0 w-100 bg-white transform transition-transform duration-800 ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center p-4 border-black border-b">
            <h2 className="font-bold text-black text-xl">Menu</h2>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setMobileActiveCategory(null);
                setMobileActiveSubcategory(null);
              }}
              className="text-black hover:text-red-700"
            >
              <X size={24} />
            </button>
          </div>
          <div className="h-[calc(100vh-73px)] overflow-y-auto">
            {menuData.map(menu => (
              <div key={menu.name}>
                <button
                  onClick={() => setMobileActiveCategory(menu)}
                  className="flex justify-between items-center hover:bg-[#383838]/20 px-4 py-3 w-full"
                >
                  <span className="font-medium text-amber-600">
                    {menu.name}
                  </span>
                  <ChevronRight size={20} color="black" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Subcategories */}
        {mobileActiveCategory && (
          <div
            className={`absolute top-25 right-0 bottom-0 w-full bg-white transform transition-transform duration-800 ${
              mobileActiveCategory ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex justify-between items-center p-4 border-black border-b">
              <button
                onClick={() => setMobileActiveCategory(null)}
                className="text-amber-600"
              >
                <ChevronRight size={24} className="rotate-180" />
              </button>
              <h2 className="font-bold text-gray-900 text-xl">
                {mobileActiveCategory.name}
              </h2>
              <div className="w-6" />
            </div>
            <div className="h-[calc(100vh-73px)] overflow-y-auto">
              {mobileActiveCategory.subcategories.map(sub => (
                <button
                  key={sub.name}
                  onClick={() => setMobileActiveSubcategory(sub)}
                  className="flex justify-between items-center hover:bg-gray-50 px-4 py-3 w-full"
                >
                  <span className="font-medium text-amber-600">{sub.name}</span>
                  <ChevronRight size={24} />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Items */}
        {mobileActiveSubcategory && mobileActiveCategory && (
          <div
            className={`absolute top-25 left-0 bottom-0 w-full bg-white transform transition-transform duration-800 ${
              mobileActiveSubcategory ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex justify-between items-center p-4 border-gray-200 border-b">
              <button
                onClick={() => setMobileActiveSubcategory(null)}
                className="text-black"
              >
                <ChevronRight size={24} className="rotate-180" />
              </button>
              <h2 className="font-bold text-black text-xl">
                {mobileActiveSubcategory.name}
              </h2>
              <div className="w-6" />
            </div>
            <div className="h-[calc(100vh-73px)] overflow-y-auto">
              {mobileActiveSubcategory.items.map(item => (
                <Link
                  key={item}
                  href={`/${mobileActiveCategory.name.toLowerCase()}/${mobileActiveSubcategory.name.toLowerCase()}/${item.toLowerCase()}`}
                  className="block hover:bg-gray-50 px-4 py-3 text-amber-600"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Cart Drawer */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          cartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setCartOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 bottom-0 w-96 bg-white transform transition-transform duration-300 ${
            cartOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center p-4 border-gray-200 border-b">
            <h2 className="font-bold text-gray-900 text-xl">Shopping Cart</h2>
            <button
              onClick={() => setCartOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>

          {cartItems.length === 0 ? (
            <div className="flex flex-col justify-center items-center h-[calc(100vh-200px)]">
              <ShoppingCart size={64} className="mb-4 text-gray-300" />
              <p className="text-gray-500 text-lg">Your cart is empty</p>
              <p className="mt-2 text-gray-400 text-sm">
                Add items to get started
              </p>
            </div>
          ) : (
            <>
              <div className="p-4 h-[calc(100vh-200px)] overflow-y-auto">
                {cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 bg-gray-50 mb-4 p-3 rounded-lg"
                  >
                    <div className="text-3xl">{item.image}</div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-gray-500 text-sm">${item.price}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={20} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="right-0 bottom-0 left-0 absolute bg-white p-4 border-gray-200 border-t">
                <div className="flex justify-between mb-4">
                  <span className="font-semibold text-gray-900">Total:</span>
                  <span className="font-bold text-gray-900">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <button className="bg-amber-500 hover:bg-amber-600 py-3 rounded-lg w-full font-medium text-white">
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Spacer for fixed header */}
      <div className="h-16" />
    </>
  );
}
