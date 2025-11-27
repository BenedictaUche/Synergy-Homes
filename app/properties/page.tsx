"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { PropertyCard } from "@/components/property-card"
import { PropertyFilters, type FilterState } from "@/components/property-filters"
import { properties } from "@/lib/data"

export default function PropertiesPage() {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    propertyType: "all",
    location: "all",
    priceRange: "all",
    beds: "all",
    status: "all",
  })

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        const matchesSearch =
          property.name.toLowerCase().includes(searchLower) ||
          property.location.toLowerCase().includes(searchLower) ||
          property.description.toLowerCase().includes(searchLower)
        if (!matchesSearch) return false
      }

      // Property type filter
      if (filters.propertyType !== "all" && property.propertyType !== filters.propertyType) {
        return false
      }

      // Location filter
      if (filters.location !== "all") {
        const locationMap: Record<string, string[]> = {
          "victoria-island": ["victoria island"],
          "banana-island": ["banana island"],
          ikoyi: ["ikoyi"],
          lekki: ["lekki"],
          abuja: ["abuja", "maitama"],
        }
        const locationKeywords = locationMap[filters.location] || []
        const matchesLocation = locationKeywords.some((keyword) => property.location.toLowerCase().includes(keyword))
        if (!matchesLocation) return false
      }

      // Price range filter
      if (filters.priceRange !== "all") {
        const priceInMillions = property.price / 1000000
        switch (filters.priceRange) {
          case "0-500":
            if (priceInMillions >= 500) return false
            break
          case "500-800":
            if (priceInMillions < 500 || priceInMillions >= 800) return false
            break
          case "800-1000":
            if (priceInMillions < 800 || priceInMillions >= 1000) return false
            break
          case "1000+":
            if (priceInMillions < 1000) return false
            break
        }
      }

      // Beds filter
      if (filters.beds !== "all") {
        const minBeds = Number.parseInt(filters.beds)
        if (property.beds < minBeds) return false
      }

      return true
    })
  }, [filters])

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
            <span className="text-primary text-sm tracking-[0.3em] mb-4 block">OUR PORTFOLIO</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6">
              Exceptional
              <span className="text-primary font-medium"> Properties</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Explore our curated collection of luxury properties, each selected to meet the highest standards of
              quality, location, and investment potential.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Properties Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <PropertyFilters onFilterChange={setFilters} />

          {/* Results Count */}
          <div className="mb-8">
            <p className="text-sm text-muted-foreground">
              Showing {filteredProperties.length} {filteredProperties.length === 1 ? "property" : "properties"}
            </p>
          </div>

          {/* Properties Grid */}
          {filteredProperties.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property, index) => (
                <PropertyCard key={property.id} property={property} index={index} />
              ))}
            </div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <p className="text-xl text-muted-foreground mb-4">No properties match your criteria</p>
              <p className="text-sm text-muted-foreground">Try adjusting your filters or search terms</p>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  )
}
