"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 border border-primary rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 border border-primary rounded-full translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="text-primary text-sm tracking-[0.3em] mb-4 block">BEGIN YOUR JOURNEY</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6 text-balance">
            Ready to Find Your
            <span className="text-primary font-medium"> Dream Property?</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
            Let our expert team guide you to the perfect property that matches your lifestyle and investment goals.
            Schedule a private consultation today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground text-sm tracking-wider hover:bg-primary/90 transition-all duration-300"
            >
              Schedule Consultation
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/properties"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 border border-foreground/20 text-foreground text-sm tracking-wider hover:border-primary hover:text-primary transition-all duration-300"
            >
              Browse Properties
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
