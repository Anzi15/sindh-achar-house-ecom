"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import AnimatedDiv from "./AnimatedDiv"
import Image from "next/image"

const cards = [
  { id: 1, title: "CHUTNEYS", image: "https://i.ibb.co/SD9cxdQR/Cilantro-Chutney-9.jpg", description: "Authentic homemade chutneys with fresh ingredients", link: "/collection/chutney" },
  { id: 2, title: "ACHAR", image: "https://i.ibb.co/QFVKy9CM/65449803.webp", description: "Traditional pickles made with age-old recipes", link: "/collection/achar" },
  { id: 3, title: "MURABBA", image: "https://i.ibb.co/wZR0vcDQ/61878031.webp", description: "Traditional South Asian sweet fruit preserve", link: "/collection/murabba" },
]

export default function AutoCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const totalSlides = Math.ceil(cards.length / 2)
  const autoPlayRef = useRef(null)

  const nextSlide = () => setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1))
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1))
  const resetTimer = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
      autoPlayRef.current = setInterval(nextSlide, 5000)
    }
  }

  useEffect(() => {
    autoPlayRef.current = setInterval(nextSlide, 5000)
    return () => clearInterval(autoPlayRef.current)
  }, [])

  return (
    <div className="w-full bg-[#fffbe6] py-10 px-4">
      <div className="max-w-lg mx-auto">
        <AnimatedDiv>
        <div className="text-center mb-8">
          <p className="text-sm md:text-base text-gray-700 mb-2">Authentic · Pure · Homemade</p>
          <h2 className="text-2xl md:text-4xl font-medium">Shop by collections</h2>
        </div>
        </AnimatedDiv>
        <div className="relative">
          <div className="overflow-hidden rounded-lg">
            <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {Array.from({ length: totalSlides }).map((_, index) => (
                <div key={index} className="w-full flex-shrink-0 grid grid-cols-2 gap-4">

                  {cards.slice(index * 2, index * 2 + 2).map((card) => (
                  <AnimatedDiv>
                    <Link href={card.link?card.link:"#"} key={card.id} className="bg-white p-4 rounded-lg flex flex-col items-center">
                      <h3 className="font-medium text-lg md:text-xl mb-4">{card.title}</h3>
                      <Image src={card.image} alt={card.title} className="w-full aspect-square object-cover rounded-md" width="720" height="720" />
                      <p className="text-center text-gray-600 mt-2">{card.description}</p>
                    </Link>
                  </AnimatedDiv>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <button onClick={() => { prevSlide(); resetTimer(); }} className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white">
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
          </button>
          <button onClick={() => { nextSlide(); resetTimer(); }} className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white">
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
          </button>
          <div className="flex justify-center mt-6">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button key={index} onClick={() => { setCurrentSlide(index); resetTimer(); }} className={`h-2 w-2 mx-1 rounded-full ${currentSlide === index ? "bg-gray-800 w-4" : "bg-gray-300"}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
