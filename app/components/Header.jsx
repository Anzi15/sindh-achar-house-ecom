"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  FaArrowRight,
  FaSearch,
  FaShoppingCart,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const links = [
  { id: 2, name: "All Products", href: "/products" },
  { id: 3, name: "Achars", href: "/collection/achar" },
  { id: 4, name: "Chutneys", href: "/collection/chutney" },
  { id: 5, name: "Murabbas", href: "/collection/murabba" },
  { id: 6, name: "About Us", href: "/about" },
  { id: 7, name: "Contact Us", href: "/contact" },
];

export default function Header({ children, headerText }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart-items") || "[]");
    setCartCount(cartItems.length);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (query) {
      router.push(`/search?query=${encodeURIComponent(query)}`);
      setSearchQuery("");
      setIsMobileOpen(false);
    }
  };

  return (
    <>
      {children}

      {/* Banner */}
      <Link href="/products">
        <div className="w-full bg-gradient-to-r from-red-600 to-red-700 p-3 text-center text-white group transition-all hover:from-red-700 hover:to-red-800">
          <div className="flex gap-3 items-center justify-center text-sm md:text-base font-medium">
            <span className="animate-pulse">🔥</span>
            <span>
              {headerText || "Discover Authentic Pakistani Flavors - Shop Now!"}
            </span>
            <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </Link>

      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-red-600 transition-colors duration-300"
            >
              {isMobileOpen ? (
                <FaTimes className="text-xl" />
              ) : (
                <FaBars className="text-xl" />
              )}
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <Image
                src="/logo.svg"
                alt="Sindh Achar"
                width={60}
                height={60}
                className="transition-transform duration-300 group-hover:scale-105"
              />
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-300">
                  Sindh Achar
                </h1>
                <p className="text-xs text-gray-500">
                  Authentic Pakistani Flavors
                </p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-8">
              {links.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  className="text-gray-700 hover:text-red-600 font-medium transition-colors duration-300 relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              {/* Desktop Search */}
              <form onSubmit={handleSearch} className="hidden lg:flex relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </form>

              {/* Mobile Search button (non-functional, optional popup/redirect if needed) */}

              {/* Cart */}
              <Link href={"/cart"} className="relative">
              <button className="relative p-2 text-gray-600 hover:text-red-600 transition-all duration-300 hover:scale-105">
                <FaShoppingCart className="text-xl" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-pulse">
                    {cartCount}
                  </span>
                )}
              </button>
                    </Link>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        <div
          className={`md:hidden transition-all duration-300 ${
            isMobileOpen
              ? "max-h-96 opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="bg-white border-t border-gray-100 shadow-lg">
            {/* Mobile Search */}
            <form
              onSubmit={handleSearch}
              className="px-4 py-4 border-b border-gray-100"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </form>

            {/* Mobile Links */}
            <div className="px-4 py-2">
              {links.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  className="block px-4 py-3 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 font-medium"
                  onClick={() => setIsMobileOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              {/* Wholesale CTA */}
              <Link
                href="https://wa.me/923047210222?text=I want to know about wholesale"
                className="block px-4 py-3 text-white bg-red-600 hover:bg-red-700 rounded-lg transition-all duration-200 font-medium text-center mt-4"
                onClick={() => setIsMobileOpen(false)}
              >
                📞 Contact for Wholesale
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
