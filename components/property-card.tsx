"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { MapPin, Maximize2, Compass, FileText } from "lucide-react"
import type { LandParcel } from "@/lib/data"

interface LandParcelCardProps {
  property: LandParcel
  index?: number
  variant?: "default" | "featured"
}

export function PropertyCard({ property, index = 0, variant = "default" }: LandParcelCardProps) {
  const isFeatured = variant === "featured"

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={isFeatured ? "lg:row-span-2" : ""}
    >
      <Link href={`/properties/${property.slug}`} className="group block h-full">
        <div className={`relative overflow-hidden ${isFeatured ? "h-full min-h-[500px]" : "aspect-[4/3]"} mb-4`}>
          <img
            src={property.images[0] || "/placeholder.svg"}
            alt={property.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div
            className={`absolute inset-0 ${isFeatured ? "bg-gradient-to-t from-background via-background/20 to-transparent" : "bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"}`}
          />

          {/* Status Badge */}
          {property.status !== "available" && (
            <span className="absolute top-4 left-4 px-3 py-1 bg-muted text-muted-foreground text-xs tracking-wider uppercase">
              {property.status}
            </span>
          )}

          {isFeatured && (
            <span className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground text-xs tracking-wider">
              FEATURED
            </span>
          )}

          {property.investmentSuitable && !isFeatured && (
            <span className="absolute top-4 right-4 px-3 py-1 bg-primary/90 text-primary-foreground text-xs tracking-wider">
              INVESTMENT
            </span>
          )}

          {/* Featured Content Overlay */}
          {isFeatured && (
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h3 className="text-2xl lg:text-3xl font-medium mb-2">{property.name}</h3>
              <div className="flex items-center gap-2 text-muted-foreground mb-4">
                <MapPin size={14} />
                <span className="text-sm">{property.location}</span>
              </div>
              <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
                <span className="flex items-center gap-1">
                  <Maximize2 size={14} /> {property.sizeFormatted}
                </span>
                <span className="flex items-center gap-1">
                  <Compass size={14} /> {property.landUse}
                </span>
                <span className="flex items-center gap-1">
                  <FileText size={14} /> {property.documentationType}
                </span>
              </div>
              <div className="text-2xl text-primary font-medium">{property.priceFormatted}</div>
            </div>
          )}
        </div>

        {/* Non-featured Content */}
        {!isFeatured && (
          <>
            <h3 className="text-xl font-medium mb-2 group-hover:text-primary transition-colors">{property.name}</h3>
            <div className="flex items-center gap-2 text-muted-foreground mb-3">
              <MapPin size={14} />
              <span className="text-sm">{property.location}</span>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
              <span className="flex items-center gap-1">
                <Maximize2 size={12} /> {property.sizeFormatted}
              </span>
              <span className="flex items-center gap-1 capitalize">
                <Compass size={12} /> {property.landUse}
              </span>
              <span className="flex items-center gap-1">
                <FileText size={12} /> {property.documentationType}
              </span>
            </div>
            <div className="text-lg text-primary font-medium">{property.priceFormatted}</div>
          </>
        )}
      </Link>
    </motion.div>
  )
}
