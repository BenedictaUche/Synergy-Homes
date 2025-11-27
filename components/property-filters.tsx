"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PropertyFiltersProps {
  onFilterChange: (filters: FilterState) => void
}

export interface FilterState {
  search: string
  propertyType: string
  location: string
  priceRange: string
  beds: string
  status: string
}

const propertyTypes = [
  { value: "all", label: "All Types" },
  { value: "penthouse", label: "Penthouse" },
  { value: "villa", label: "Villa" },
  { value: "mansion", label: "Mansion" },
  { value: "apartment", label: "Apartment" },
  { value: "estate", label: "Estate" },
]

const locations = [
  { value: "all", label: "All Locations" },
  { value: "victoria-island", label: "Victoria Island" },
  { value: "banana-island", label: "Banana Island" },
  { value: "ikoyi", label: "Ikoyi" },
  { value: "lekki", label: "Lekki" },
  { value: "abuja", label: "Abuja" },
]

const priceRanges = [
  { value: "all", label: "Any Price" },
  { value: "0-500", label: "Under ₦500M" },
  { value: "500-800", label: "₦500M - ₦800M" },
  { value: "800-1000", label: "₦800M - ₦1B" },
  { value: "1000+", label: "Over ₦1B" },
]

const bedOptions = [
  { value: "all", label: "Any Beds" },
  { value: "3", label: "3+ Beds" },
  { value: "4", label: "4+ Beds" },
  { value: "5", label: "5+ Beds" },
  { value: "6", label: "6+ Beds" },
]

export function PropertyFilters({ onFilterChange }: PropertyFiltersProps) {
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    propertyType: "all",
    location: "all",
    priceRange: "all",
    beds: "all",
    status: "all",
  })

  const updateFilter = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const clearFilters = () => {
    const defaultFilters: FilterState = {
      search: "",
      propertyType: "all",
      location: "all",
      priceRange: "all",
      beds: "all",
      status: "all",
    }
    setFilters(defaultFilters)
    onFilterChange(defaultFilters)
  }

  const hasActiveFilters =
    Object.entries(filters).some(([key, value]) => key !== "search" && value !== "all" && value !== "") ||
    filters.search !== ""

  return (
    <div className="mb-12">
      {/* Search Bar */}
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <Input
            type="text"
            placeholder="Search properties..."
            value={filters.search}
            onChange={(e) => updateFilter("search", e.target.value)}
            className="pl-12 h-12 bg-card border-border"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="h-12 px-6 border-border hover:border-primary hover:text-primary"
        >
          <SlidersHorizontal size={20} className="mr-2" />
          Filters
          {hasActiveFilters && <span className="ml-2 w-2 h-2 rounded-full bg-primary" />}
        </Button>
      </div>

      {/* Filter Panel */}
      <motion.div
        initial={false}
        animate={{ height: showFilters ? "auto" : 0, opacity: showFilters ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="p-6 bg-card border border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="text-xs tracking-wider text-muted-foreground mb-2 block">PROPERTY TYPE</label>
              <Select value={filters.propertyType} onValueChange={(v) => updateFilter("propertyType", v)}>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {propertyTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs tracking-wider text-muted-foreground mb-2 block">LOCATION</label>
              <Select value={filters.location} onValueChange={(v) => updateFilter("location", v)}>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((loc) => (
                    <SelectItem key={loc.value} value={loc.value}>
                      {loc.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs tracking-wider text-muted-foreground mb-2 block">PRICE RANGE</label>
              <Select value={filters.priceRange} onValueChange={(v) => updateFilter("priceRange", v)}>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {priceRanges.map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs tracking-wider text-muted-foreground mb-2 block">BEDROOMS</label>
              <Select value={filters.beds} onValueChange={(v) => updateFilter("beds", v)}>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {bedOptions.map((bed) => (
                    <SelectItem key={bed.value} value={bed.value}>
                      {bed.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={14} />
              Clear all filters
            </button>
          )}
        </div>
      </motion.div>
    </div>
  )
}
