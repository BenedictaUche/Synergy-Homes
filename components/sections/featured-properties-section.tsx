"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, MapPin, Bed, Bath, Square } from "lucide-react"

const featuredProperties = [
  {
    id: 1,
    name: "The Meridian Penthouse",
    location: "Victoria Island, Lagos",
    price: "₦850,000,000",
    beds: 5,
    baths: 6,
    sqft: "8,500",
    image: "/luxury-penthouse-with-modern-interior-design-and-p.jpg",
    featured: true,
  },
  {
    id: 2,
    name: "Oceanview Estate",
    location: "Banana Island, Lagos",
    price: "₦1,200,000,000",
    beds: 7,
    baths: 8,
    sqft: "12,000",
    image: "/luxury-waterfront-mansion-with-swimming-pool-and-o.jpg",
  },
  {
    id: 3,
    name: "Crown Heights Villa",
    location: "Ikoyi, Lagos",
    price: "₦650,000,000",
    beds: 4,
    baths: 5,
    sqft: "6,200",
    image: "/modern-luxury-villa-with-manicured-gardens-and-con.jpg",
  },
]

export function FeaturedPropertiesSection() {
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
              <span className="text-primary font-medium"> Residences</span>
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:row-span-2"
          >
            <Link href={`/properties/${featuredProperties[0].id}`} className="group block h-full">
              <div className="relative h-full min-h-[500px] overflow-hidden">
                <img
                  src={featuredProperties[0].image || "/placeholder.svg"}
                  alt={featuredProperties[0].name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs tracking-wider mb-4">
                    FEATURED
                  </span>
                  <h3 className="text-2xl lg:text-3xl font-medium mb-2">{featuredProperties[0].name}</h3>
                  <div className="flex items-center gap-2 text-muted-foreground mb-4">
                    <MapPin size={14} />
                    <span className="text-sm">{featuredProperties[0].location}</span>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Bed size={14} /> {featuredProperties[0].beds} Beds
                    </span>
                    <span className="flex items-center gap-1">
                      <Bath size={14} /> {featuredProperties[0].baths} Baths
                    </span>
                    <span className="flex items-center gap-1">
                      <Square size={14} /> {featuredProperties[0].sqft} sqft
                    </span>
                  </div>
                  <div className="text-2xl text-primary font-medium">{featuredProperties[0].price}</div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Smaller Properties */}
          {featuredProperties.slice(1).map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (index + 1) * 0.1 }}
            >
              <Link href={`/properties/${property.id}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden mb-4">
                  <img
                    src={property.image || "/placeholder.svg"}
                    alt={property.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="text-xl font-medium mb-2 group-hover:text-primary transition-colors">{property.name}</h3>
                <div className="flex items-center gap-2 text-muted-foreground mb-3">
                  <MapPin size={14} />
                  <span className="text-sm">{property.location}</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <Bed size={12} /> {property.beds}
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath size={12} /> {property.baths}
                  </span>
                  <span className="flex items-center gap-1">
                    <Square size={12} /> {property.sqft}
                  </span>
                </div>
                <div className="text-lg text-primary font-medium">{property.price}</div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
