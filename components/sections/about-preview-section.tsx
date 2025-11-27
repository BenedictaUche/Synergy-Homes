"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function AboutPreviewSection() {
  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] relative overflow-hidden">
              <img
                src="/elegant-modern-office-interior-with-luxury-furnitu.jpg"
                alt="Synergy Homes Limited Office"
                className="object-cover w-full h-full"
              />
            </div>
            {/* Decorative Frame */}
            <div className="absolute -bottom-6 -right-6 w-full h-full border border-primary -z-10" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary text-sm tracking-[0.3em] mb-4 block">ABOUT US</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6 text-balance">
              A Legacy of
              <span className="text-primary font-medium"> Excellence</span>
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
              <p>
                For nearly two decades, Synergy Homes Limited has been the premier destination for luxury real estate in the
                region. Our commitment to excellence and personalized service has earned us the trust of discerning
                clients worldwide.
              </p>
              <p>
                We curate an exclusive portfolio of exceptional properties, each selected to meet the highest standards
                of quality, location, and investment potential.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-10">
              {[
                { value: "6+", label: "Years Experience" },
                { value: "100+", label: "Plots Sold" },
                { value: "₦50M+", label: "In Transactions" },
              ].map((stat, index) => (
                <div key={index} className="text-center lg:text-left">
                  <div className="text-3xl lg:text-4xl font-light text-primary mb-1">{stat.value}</div>
                  <div className="text-xs tracking-wider text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="group inline-flex items-center gap-2 text-sm tracking-wider text-primary hover:text-foreground transition-colors"
            >
              Learn Our Story
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
