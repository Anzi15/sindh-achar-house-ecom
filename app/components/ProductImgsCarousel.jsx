"use client"
import { useState, useRef, useEffect } from "react"
import { Button } from "../components/ui/button"
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import { cn } from "./utils"
import Image from "next/image"

export default function ProductsImgCarousel({ parsedProductImages }) {
  const productImages = JSON.parse(parsedProductImages)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const carouselRef = useRef(null)

  const minSwipeDistance = 50

  const onTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      nextImage()
    } else if (isRightSwipe) {
      prevImage()
    }
  }

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % productImages.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + productImages.length) % productImages.length)
  }

  const goToImage = (index) => {
    setCurrentIndex(index)
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prevImage()
      if (e.key === 'ArrowRight') nextImage()
      if (e.key === 'Escape') setIsZoomed(false)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      {/* Main Image Display */}
      <div className="relative group mb-4">
        <div 
          className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100 shadow-lg"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          ref={carouselRef}
        >
          <Image
            src={productImages[currentIndex] || "/placeholder.svg"}
            alt={`Product image ${currentIndex + 1}`}
            fill
            className={cn(
              "object-cover transition-transform duration-300",
              isZoomed ? "scale-150 cursor-zoom-out" : "cursor-zoom-in"
            )}
            onClick={() => setIsZoomed(!isZoomed)}
            priority={currentIndex === 0}
          />
          
          {/* Navigation Arrows */}
          {productImages.length > 1 && (
            <>
              <Button
                variant="secondary"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/90 hover:bg-white shadow-lg"
                onClick={prevImage}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/90 hover:bg-white shadow-lg"
                onClick={nextImage}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}

          {/* Zoom Icon */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="bg-white/90 rounded-full p-2 shadow-lg">
              <ZoomIn className="h-4 w-4 text-gray-700" />
            </div>
          </div>

          {/* Image Counter */}
          {productImages.length > 1 && (
            <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
              {currentIndex + 1} / {productImages.length}
            </div>
          )}
        </div>
      </div>

      {/* Thumbnail Navigation */}
      {productImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {productImages.map((image, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={cn(
                "relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200",
                currentIndex === index
                  ? "border-red-500 ring-2 ring-red-200"
                  : "border-gray-200 hover:border-gray-300"
              )}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
              {currentIndex !== index && (
                <div className="absolute inset-0 bg-black/20" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
