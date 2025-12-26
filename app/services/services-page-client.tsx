"use client"

import type React from "react"

import { motion } from "framer-motion"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Building2, Key, TrendingUp, Shield, Calculator, Compass, Check, ArrowRight } from "lucide-react"

interface Service {
  id: string
  title: string
  description: string
  features: string[]
  icon: string
}

const iconMap: Record<string, React.ElementType> = {
  Building2,
  Key,
  TrendingUp,
  Shield,
  Calculator,
  Compass,
  Map: Building2,
  FileText: Key,
}

const serviceImages = [
  "/land.jpg",
  "/land-two.jpg",
  "/land-three.jpg",
  "/land-four.jpg",
]

const getServiceImage = (index: number): string => {
  return serviceImages[index % serviceImages.length]
}

export function ServicesPageClient({ services }: { services: Service[] }) {
  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-card">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="text-primary text-sm tracking-[0.3em] mb-4 block">OUR SERVICES</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6">
              Comprehensive
              <span className="text-primary font-medium"> Solutions</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              From property acquisition to investment advisory, we provide end-to-end real estate services designed to
              exceed your expectations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="space-y-16">
            {services.map((service, index) => {
              const IconComponent = iconMap[service.icon] || Building2
              const isEven = index % 2 === 0

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${isEven ? "" : "lg:flex-row-reverse"}`}
                >
                  <div className={isEven ? "lg:order-1" : "lg:order-2"}>
                    <div className="w-16 h-16 flex items-center justify-center border border-primary/30 text-primary mb-6">
                      <IconComponent size={28} />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-light mb-4">{service.title}</h2>
                    <p className="text-muted-foreground leading-relaxed mb-6">{service.description}</p>
                    <div className="grid sm:grid-cols-2 gap-3 mb-8">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2">
                          <Check size={14} className="text-primary shrink-0" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Link
                      href="/contact"
                      className="group inline-flex items-center gap-2 text-sm tracking-wider text-primary hover:text-foreground transition-colors"
                    >
                      Get Started
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                  <div className={isEven ? "lg:order-2" : "lg:order-1"}>
                    <div className="aspect-4/3 relative overflow-hidden">
                      <img
                        src={getServiceImage(index)}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 lg:py-24 bg-card">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-primary text-sm tracking-[0.3em] mb-4 block">HOW WE WORK</span>
            <h2 className="text-3xl md:text-4xl font-light">
              Our
              <span className="text-primary font-medium"> Process</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Consultation",
                description: "We begin with understanding your unique requirements and goals.",
              },
              {
                step: "02",
                title: "Research",
                description: "Our team conducts thorough research to identify the best options.",
              },
              {
                step: "03",
                title: "Presentation",
                description: "We present carefully curated options tailored to your needs.",
              },
              {
                step: "04",
                title: "Execution",
                description: "We handle all aspects of the transaction with precision.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <div className="text-6xl font-light text-primary/20 mb-4">{item.step}</div>
                <h3 className="text-xl font-medium mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
                {index < 3 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-border -translate-x-1/2" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-light mb-4">Ready to Get Started?</h2>
            <p className="text-lg opacity-80 mb-8 max-w-2xl mx-auto">
              Let us help you achieve your real estate goals. Contact us today to schedule a consultation with our
              expert team.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-background text-foreground text-sm tracking-wider hover:bg-background/90 transition-colors"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  )
}
