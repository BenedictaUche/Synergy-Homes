"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    content:
      "Prestige Estates made our dream home a reality. Their attention to detail and understanding of our needs was exceptional. The entire process was seamless and professional.",
    author: "Chief Adebayo Williams",
    position: "CEO, Williams Holdings",
    image: "/professional-african-businessman.png",
  },
  {
    id: 2,
    content:
      "The team at Prestige Estates demonstrated unparalleled expertise in the luxury market. They found us the perfect investment property that exceeded all our expectations.",
    author: "Mrs. Chidinma Okonkwo",
    position: "Managing Director, Okonkwo Industries",
    image: "/professional-african-businesswoman-portrait.jpg",
  },
  {
    id: 3,
    content:
      "Working with Prestige Estates was a privilege. Their knowledge of the premium property market and commitment to client satisfaction is truly world-class.",
    author: "Dr. Emmanuel Nwachukwu",
    position: "Consultant Surgeon",
    image: "/professional-african-doctor-portrait.jpg",
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-24 lg:py-32 bg-card">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-primary text-sm tracking-[0.3em] mb-4 block">TESTIMONIALS</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light">
            Client
            <span className="text-primary font-medium"> Experiences</span>
          </h2>
        </motion.div>

        {/* Testimonial Slider */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <Quote className="w-12 h-12 text-primary/30 mx-auto mb-8" />
                <p className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed mb-10 text-foreground/90">
                  "{testimonials[currentIndex].content}"
                </p>
                <div className="flex flex-col items-center">
                  <img
                    src={testimonials[currentIndex].image || "/placeholder.svg"}
                    alt={testimonials[currentIndex].author}
                    className="w-16 h-16 rounded-full object-cover mb-4 border-2 border-primary"
                  />
                  <div className="text-lg font-medium">{testimonials[currentIndex].author}</div>
                  <div className="text-sm text-muted-foreground">{testimonials[currentIndex].position}</div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-12">
              <button
                onClick={prev}
                className="w-12 h-12 flex items-center justify-center border border-border hover:border-primary hover:text-primary transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentIndex ? "bg-primary" : "bg-muted"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={next}
                className="w-12 h-12 flex items-center justify-center border border-border hover:border-primary hover:text-primary transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
