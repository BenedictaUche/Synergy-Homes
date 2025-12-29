"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PropertyFiltersProps {
  onFilterChange: (filters: FilterState) => void
  availableLocations?: string[]
  priceRange?: { min: number; max: number }
  sizeRange?: { min: number; max: number }
}

export interface FilterState {
  search: string
  propertyType: string
  location: string
  priceRange: string
  beds: string
  status: string
}

const landUseTypes = [
  { value: "all", label: "All Land Types" },
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
  { value: "mixed-use", label: "Mixed-Use" },
  { value: "agricultural", label: "Agricultural" },
  { value: "industrial", label: "Industrial" },
]

// Locations will be generated dynamically from props

const priceRanges = [
  { value: "all", label: "Any Price" },
  { value: "0-100", label: "Under ₦100M" },
  { value: "100-300", label: "₦100M - ₦300M" },
  { value: "300-500", label: "₦300M - ₦500M" },
  { value: "500-1000", label: "₦500M - ₦1B" },
  { value: "1000+", label: "Over ₦1B" },
]

const sizeOptions = [
  { value: "all", label: "Any Size" },
  { value: "0-1000", label: "Under 1,000 sqm" },
  { value: "1000-2500", label: "1,000 - 2,500 sqm" },
  { value: "2500-5000", label: "2,500 - 5,000 sqm (0.6+ acres)" },
  { value: "5000-10000", label: "5,000 - 10,000 sqm (1+ acres)" },
  { value: "10000+", label: "Over 10,000 sqm (2.5+ acres)" },
]

const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "available", label: "Available" },
  { value: "reserved", label: "Reserved" },
  { value: "sold", label: "Sold" },
]

export function PropertyFilters({
  onFilterChange,
  availableLocations = [],
  priceRange,
  sizeRange,
}: PropertyFiltersProps) {
  // Generate location options from actual data
  const locations = [
    { value: "all", label: "All Locations" },
    ...availableLocations.map((loc) => ({
      value: loc.toLowerCase().replace(/\s+/g, "-"),
      label: loc,
    })),
  ]
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    propertyType: "all",
    location: "all",
    priceRange: "all",
    beds: "all", // Repurposed for size
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
            placeholder="Search land parcels by name, location, or size..."
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
              <label className="text-xs tracking-wider text-muted-foreground mb-2 block">LAND USE TYPE</label>
              <Select value={filters.propertyType} onValueChange={(v) => updateFilter("propertyType", v)}>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {landUseTypes.map((type) => (
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
              <label className="text-xs tracking-wider text-muted-foreground mb-2 block">LAND SIZE</label>
              <Select value={filters.beds} onValueChange={(v) => updateFilter("beds", v)}>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sizeOptions.map((size) => (
                    <SelectItem key={size.value} value={size.value}>
                      {size.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs tracking-wider text-muted-foreground mb-2 block">STATUS</label>
              <Select value={filters.status} onValueChange={(v) => updateFilter("status", v)}>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
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
