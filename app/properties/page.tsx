"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { PropertyCard } from "@/components/property-card"
import { PropertyFilters, type FilterState } from "@/components/property-filters"
import { landParcels } from "@/lib/data"

export default function PropertiesPage() {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    propertyType: "all",
    location: "all",
    priceRange: "all",
    beds: "all",
    status: "all",
  })

  const filteredLandParcels = useMemo(() => {
    return landParcels.filter((land) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        const matchesSearch =
          land.name.toLowerCase().includes(searchLower) ||
          land.location.toLowerCase().includes(searchLower) ||
          land.description.toLowerCase().includes(searchLower) ||
          land.sizeFormatted.toLowerCase().includes(searchLower)
        if (!matchesSearch) return false
      }

      // Land use type filter (maps to propertyType)
      if (filters.propertyType !== "all" && land.landUse !== filters.propertyType) {
        return false
      }

      // Location filter
      if (filters.location !== "all") {
        const locationMap: Record<string, string[]> = {
          "victoria-island": ["victoria island"],
          "banana-island": ["banana island"],
          ikoyi: ["ikoyi"],
          lekki: ["lekki", "ajah", "ibeju-lekki", "epe"],
          abuja: ["abuja", "maitama", "gwarinpa", "cbd"],
        }
        const locationKeywords = locationMap[filters.location] || []
        const matchesLocation = locationKeywords.some((keyword) => land.location.toLowerCase().includes(keyword))
        if (!matchesLocation) return false
      }

      // Price range filter
      if (filters.priceRange !== "all") {
        const priceInMillions = land.price / 1000000
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

      // Status filter
      if (filters.status !== "all" && land.status !== filters.status) {
        return false
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
              Premium
              <span className="text-primary font-medium"> Land Parcels</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Explore our curated collection of prime land parcels across Nigeria, each selected to meet the highest standards of
              location, documentation, and investment potential.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Land Parcels Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <PropertyFilters onFilterChange={setFilters} />

          {/* Results Count */}
          <div className="mb-8">
            <p className="text-sm text-muted-foreground">
              Showing {filteredLandParcels.length} {filteredLandParcels.length === 1 ? "land parcel" : "land parcels"}
            </p>
          </div>

          {/* Land Parcels Grid */}
          {filteredLandParcels.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredLandParcels.map((land, index) => (
                <PropertyCard key={land.id} property={land} index={index} />
              ))}
            </div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <p className="text-xl text-muted-foreground mb-4">No land parcels match your criteria</p>
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
