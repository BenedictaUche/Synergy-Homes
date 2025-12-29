"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { PropertyCard } from "@/components/property-card"
import { PropertyFilters, type FilterState } from "@/components/property-filters"

interface LandParcel {
  id: string
  name: string
  slug: string
  location: string
  address: string
  price: number
  priceFormatted: string
  description: string
  shortDescription: string
  size: number
  sizeFormatted: string
  landUse: "residential" | "commercial" | "mixed-use" | "agricultural" | "industrial"
  topography: "flat" | "gently-sloping" | "hilly" | "waterfront"
  status: "available" | "sold" | "reserved"
  featured: boolean
  investmentSuitable: boolean
  features: string[]
  infrastructure: string[]
  images: string[]
  videoUrl?: string
  documentationType: "C of O" | "Governor's Consent" | "Deed of Assignment" | "Gazette" | "Survey Plan"
}

interface PropertiesPageClientProps {
  landParcels: LandParcel[]
  availableLocations: string[]
  priceRange: { min: number; max: number }
  sizeRange: { min: number; max: number }
}

export function PropertiesPageClient({
  landParcels,
  availableLocations,
  priceRange,
  sizeRange,
}: PropertiesPageClientProps) {
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

      // Location filter - match exact location or case-insensitive partial match
      if (filters.location !== "all") {
        const filterLocationLower = filters.location.toLowerCase()
        const landLocationLower = land.location.toLowerCase()
        if (!landLocationLower.includes(filterLocationLower) && filterLocationLower !== landLocationLower) {
          return false
        }
      }

      // Price range filter
      if (filters.priceRange !== "all" && land.price) {
        const priceInMillions = land.price / 1000000
        switch (filters.priceRange) {
          case "0-100":
            if (priceInMillions >= 100) return false
            break
          case "100-300":
            if (priceInMillions < 100 || priceInMillions >= 300) return false
            break
          case "300-500":
            if (priceInMillions < 300 || priceInMillions >= 500) return false
            break
          case "500-1000":
            if (priceInMillions < 500 || priceInMillions >= 1000) return false
            break
          case "1000+":
            if (priceInMillions < 1000) return false
            break
        }
      }

      // Land size filter (using beds field)
      if (filters.beds !== "all" && land.size) {
        const sizeInSqm = land.size
        switch (filters.beds) {
          case "0-1000":
            if (sizeInSqm >= 1000) return false
            break
          case "1000-2500":
            if (sizeInSqm < 1000 || sizeInSqm >= 2500) return false
            break
          case "2500-5000":
            if (sizeInSqm < 2500 || sizeInSqm >= 5000) return false
            break
          case "5000-10000":
            if (sizeInSqm < 5000 || sizeInSqm >= 10000) return false
            break
          case "10000+":
            if (sizeInSqm < 10000) return false
            break
        }
      }

      // Status filter
      if (filters.status !== "all" && land.status !== filters.status) {
        return false
      }

      return true
    })
  }, [filters, landParcels])

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
          <PropertyFilters
            onFilterChange={setFilters}
            availableLocations={availableLocations}
            priceRange={priceRange}
            sizeRange={sizeRange}
          />

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
