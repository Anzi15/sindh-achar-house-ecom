"use client"

import clsx from "clsx"
import Link from "next/link"
import Image from "next/image"
import SearchBar from "./SearchBar"
import { useState } from "react"

function MobileNavbar({ links, isMobileOpen, onClick }) {
  const [showSearch, setShowSearch] = useState(false)

  return (
    <>
      {/* Mobile Header Bar - Visible on small screens only */}
      <div className="fixed top-0 left-0 w-full bg-white text-neutral-600 md:hidden z-40 py-6 border-b border-gray-200">

        <div className="flex items-center justify-between px-4 py-3">
          {/* Hamburger Menu */}
          <button className="text-neutral-600 focus:outline-none" onClick={onClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>

          {/* Logo - Centered and sized appropriately */}
          <Link href="/" className="absolute left-1/2 transform -translate-x-1/2">
            <Image src="/logo.svg" alt="Logo" width={100} height={100} draggable={false} className="select-none" />
          </Link>

          {/* Right Icons */}
          <div className="flex items-center gap-3">
            {/* Search Icon */}
            <button className="text-neutral-600 focus:outline-none" onClick={() => setShowSearch(!showSearch)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>


            {/* Cart Icon */}
            <Link href="/cart" className="text-neutral-600 relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
            </Link>
          </div>
        </div>

        {/* Search Bar - Conditionally shown */}
        {showSearch && (
          <div className="px-4 pb-3">
            <SearchBar
              onPostSearch={() => {
                setShowSearch(false)
              }}
            />
          </div>
        )}
      </div>

      {/* Mobile Sidebar - Slides in from left */}
      <div
        className={clsx(
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
          "fixed top-0 left-0 w-[300px] h-screen bg-white px-6 pt-8 pb-4 flex flex-col gap-6 transition-transform duration-400 ease-linear z-50 shadow-lg overflow-y-auto",
        )}
      >
        {/* Header */}
        <header className="flex items-center justify-between">
          <Image src="/logo.svg" alt="Logo" width={60} height={60} draggable={false} className="select-none" />
          <button
            className="h-5 aspect-square cursor-pointer text-neutral-600 focus:rounded focus:outline-none focus:ring-4 focus:ring-indigo-600/[.12]"
            onClick={onClick}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path>
            </svg>
          </button>
        </header>

        {/* Search Bar */}
        <div className="w-full">
          <SearchBar onPostSearch={onClick} />
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-4 py-6">
          {links.map((link) => (
            <Link key={link.id} className="flex text-lg" href={link.href} onClick={onClick}>
              {link.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Overlay when mobile menu is open */}
      {isMobileOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={onClick} />}
    </>
  )
}

export default MobileNavbar
