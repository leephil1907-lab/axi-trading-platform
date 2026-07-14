import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { heroSlides } from "@/lib/data"
import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => setCurrent((p) => (p + 1) % heroSlides.length), [])
  const prev = useCallback(() => setCurrent((p) => (p - 1 + heroSlides.length) % heroSlides.length), [])

  useEffect(() => {
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [next])

  return (
    <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
      {heroSlides.map((slide, idx) => (
        <div
          key={idx}
          className={cn(
            "absolute inset-0 transition-opacity duration-700 flex items-center",
            idx === current ? "opacity-100 z-10" : "opacity-0 z-0"
          )}
        >
          <div className={cn("absolute inset-0 bg-gradient-to-r", slide.bg)} />
          <div className="absolute inset-0 bg-black/30" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">{slide.title}</h1>
              <p className="text-lg md:text-xl text-white/80 mb-8">{slide.subtitle}</p>
              <div className="flex flex-wrap gap-3">
                <Link to="/register" className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors">{slide.cta}</Link>
                <Link to="/register" className="px-6 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors backdrop-blur">{slide.cta2}</Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center text-white hover:bg-white/20 transition-colors">
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center text-white hover:bg-white/20 transition-colors">
        <ChevronRight className="w-5 h-5" />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {heroSlides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={cn(
              "h-1.5 rounded-full transition-all",
              idx === current ? "w-8 bg-white" : "w-4 bg-white/40 hover:bg-white/60"
            )}
          />
        ))}
      </div>
    </section>
  )
}
