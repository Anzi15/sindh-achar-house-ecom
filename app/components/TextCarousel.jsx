"use client"

import { useState, useEffect } from "react"
import { Gift, Package, Percent, ShieldCheck } from "lucide-react"

export default function TextCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const messages = [
    { text: "FREE shipping", icon: <Gift className="w-4 h-4 mr-2" /> },
    { text: "Easy and free returns", icon: <Package className="w-4 h-4 mr-2" /> },
    { text: "100% original products", icon: <Percent className="w-4 h-4 mr-2" /> },
    { text: "100% secure shopping", icon: <ShieldCheck className="w-4 h-4 mr-2" /> },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [messages.length])

  return (
    <div className="bg-gray-100 py-2 overflow-hidden">
      <div className="container mx-auto">
        <div className="h-6 relative overflow-hidden">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`absolute w-full flex items-center justify-center text-sm font-medium transition-all duration-300 ease-in-out ${
                index === currentIndex ? "opacity-100 transform translate-y-0" : "opacity-0 transform -translate-y-full"
              }`}
            >
              {message.icon}
              <span>{message.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
