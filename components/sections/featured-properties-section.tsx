"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, MapPin, Maximize2, Compass, FileText } from "lucide-react"
import { PropertyCard } from "@/components/property-card"

interface FeaturedPropertiesSectionProps {
  featuredProperties: Array<{
    id: string
    name: string
    slug: string
    location: string
    priceFormatted: string
    sizeFormatted: string
    landUse: string
    documentationType: string
    images: string[]
    featured: boolean
    investmentSuitable: boolean
    status: string
  }>
}

export function FeaturedPropertiesSection({ featuredProperties }: FeaturedPropertiesSectionProps) {
  if (!featuredProperties || featuredProperties.length === 0) {
    return null
  }

  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <span className="text-primary text-sm tracking-[0.3em] mb-4 block">FEATURED PROPERTIES</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light">
              Exceptional
              <span className="text-primary font-medium"> Land Parcels</span>
            </h2>
          </div>
          <Link
            href="/properties"
            className="group inline-flex items-center gap-2 text-sm tracking-wider text-primary hover:text-foreground transition-colors"
          >
            View All Properties
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Properties Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Featured Large Property */}
          {featuredProperties[0] && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:row-span-2"
            >
              <PropertyCard property={featuredProperties[0]} index={0} variant="featured" />
            </motion.div>
          )}

          {/* Smaller Properties */}
          {featuredProperties.slice(1, 3).map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (index + 1) * 0.1 }}
            >
              <PropertyCard property={property} index={index + 1} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
