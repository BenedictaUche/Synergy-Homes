"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Building2, Key, TrendingUp, Shield, ArrowRight } from "lucide-react"

const services = [
  {
    icon: Building2,
    title: "Lands and Property Sales",
    description: "Access our exclusive portfolio of luxury residential and commercial properties and lands in prime locations.",
  },
  {
    icon: Key,
    title: "Property Management",
    description: "Comprehensive management services to protect and maximize the value of your real estate investments.",
  },
  {
    icon: TrendingUp,
    title: "Investment Advisory",
    description: "Expert guidance on high-yield property investments tailored to your financial objectives.",
  },
  {
    icon: Shield,
    title: "Legal & Documentation",
    description: "Complete legal support ensuring secure and transparent property transactions.",
  },
]

export function ServicesSection() {
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
          <span className="text-primary text-sm tracking-[0.3em] mb-4 block">OUR SERVICES</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6">
            Comprehensive
            <span className="text-primary font-medium"> Solutions</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
          From consulting to estate development and management, we provide end-to-end real estate services designed to exceed your
            expectations.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group p-8 bg-background border border-border hover:border-primary/50 transition-all duration-500"
            >
              <div className="w-14 h-14 flex items-center justify-center border border-primary/30 text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                <service.icon size={24} />
              </div>
              <h3 className="text-xl font-medium mb-3">{service.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">{service.description}</p>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-xs tracking-wider text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                Learn More
                <ArrowRight size={14} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
