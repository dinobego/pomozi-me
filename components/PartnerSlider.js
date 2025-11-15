"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

export default function PartnerSlider({ partners = [] }) {
  const [current, setCurrent] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  // AKO NEMA PARTNERA, NE PRIKAZUJ SEKCIJU
  if (!partners || partners.length === 0) {
    return null
  }

  const next = () => {
    setCurrent((current + 1) % partners.length)
    setAutoPlay(false)
  }

  const prev = () => {
    setCurrent((current - 1 + partners.length) % partners.length)
    setAutoPlay(false)
  }

  const goToSlide = (idx) => {
    setCurrent(idx)
    setAutoPlay(false)
  }

  // Auto-rotacija partnera svakih 5 sekundi
  useEffect(() => {
    if (!autoPlay) return

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % partners.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [autoPlay, partners.length])

  // Resume auto-play nakon 10 sekundi bez interakcije
  useEffect(() => {
    if (autoPlay) return

    const timeout = setTimeout(() => {
      setAutoPlay(true)
    }, 5000)

    return () => clearTimeout(timeout)
  }, [autoPlay])

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          Naši partneri
        </h2>

        {/* Slideshow */}
        <div className="max-w-5xl mx-auto">
          <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Slajdovi sa transitacijom */}
            <div className="relative h-64 md:h-80 flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
              {partners.map((partner, idx) => (
                <div
                  key={partner.id || idx}
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-in-out ${
                    idx === current
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95 pointer-events-none"
                  }`}
                >
                  <div className="px-8 text-center">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={300}
                      height={150}
                      className="object-contain max-h-40 w-auto mx-auto"
                      priority={idx === current}
                    />
                    <p className="text-gray-700 font-semibold mt-6 text-lg">
                      {partner.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigacijski dugmići */}
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-white hover:bg-primary hover:text-white rounded-full shadow-lg transition-all transform hover:scale-110"
              aria-label="Prethodni partner"
            >
              <FaChevronLeft className="text-2xl" />
            </button>

            <button
              onClick={next}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-white hover:bg-primary hover:text-white rounded-full shadow-lg transition-all transform hover:scale-110"
              aria-label="Sljedeći partner"
            >
              <FaChevronRight className="text-2xl" />
            </button>

            {/* Broji slajdova */}
            <div className="absolute top-4 right-4 bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold">
              {current + 1} / {partners.length}
            </div>
          </div>

          {/* Indikatori sa točkama */}
          <div className="flex justify-center gap-2 mt-8">
            {partners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`transition-all duration-300 rounded-full ${
                  idx === current
                    ? "bg-primary w-8 h-3"
                    : "bg-gray-300 w-2 h-2 hover:bg-gray-400"
                }`}
                aria-label={`Idi na slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
