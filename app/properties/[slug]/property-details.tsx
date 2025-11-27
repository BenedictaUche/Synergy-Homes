"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { MapPin, Bed, Bath, Square, Calendar, Home, Check, Phone, Mail, ArrowLeft, Play, Share2 } from "lucide-react"
import { ImageGallery } from "@/components/image-gallery"
import { Button } from "@/components/ui/button"
import type { Property } from "@/lib/data"

interface PropertyDetailsProps {
  property: Property
}

export function PropertyDetails({ property }: PropertyDetailsProps) {
  const statusColors = {
    available: "bg-green-500/20 text-green-400",
    sold: "bg-red-500/20 text-red-400",
    pending: "bg-yellow-500/20 text-yellow-400",
  }

  return (
    <div className="pt-24 pb-16">
      {/* Back Button */}
      <div className="container mx-auto px-6 lg:px-12 mb-8">
        <Link
          href="/properties"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Properties
        </Link>
      </div>

      {/* Image Gallery */}
      <div className="container mx-auto px-6 lg:px-12 mb-12">
        <ImageGallery images={property.images} title={property.name} />
      </div>

      {/* Property Info */}
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              {/* Header */}
              <div className="mb-8">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className={`px-3 py-1 text-xs tracking-wider uppercase ${statusColors[property.status]}`}>
                    {property.status}
                  </span>
                  <span className="px-3 py-1 bg-card text-xs tracking-wider uppercase">{property.propertyType}</span>
                  {property.investmentSuitable && (
                    <span className="px-3 py-1 bg-primary/20 text-primary text-xs tracking-wider">
                      INVESTMENT SUITABLE
                    </span>
                  )}
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-light mb-4">{property.name}</h1>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin size={18} />
                  <span>{property.address}</span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-card border border-border mb-8">
                <div className="text-center">
                  <Bed className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-light">{property.beds}</div>
                  <div className="text-xs text-muted-foreground">Bedrooms</div>
                </div>
                <div className="text-center">
                  <Bath className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-light">{property.baths}</div>
                  <div className="text-xs text-muted-foreground">Bathrooms</div>
                </div>
                <div className="text-center">
                  <Square className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-light">{property.sqft.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Sq Ft</div>
                </div>
                <div className="text-center">
                  <Calendar className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-light">{property.yearBuilt}</div>
                  <div className="text-xs text-muted-foreground">Year Built</div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-10">
                <h2 className="text-xl font-medium mb-4">About This Property</h2>
                <p className="text-muted-foreground leading-relaxed">{property.description}</p>
              </div>

              {/* Features */}
              <div className="mb-10">
                <h2 className="text-xl font-medium mb-4">Features</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Check size={16} className="text-primary shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div className="mb-10">
                <h2 className="text-xl font-medium mb-4">Amenities</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Home size={16} className="text-primary shrink-0" />
                      <span className="text-muted-foreground">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Video */}
              {property.videoUrl && (
                <div className="mb-10">
                  <h2 className="text-xl font-medium mb-4">Property Video</h2>
                  <a
                    href={property.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 p-6 bg-card border border-border hover:border-primary transition-colors"
                  >
                    <div className="w-12 h-12 flex items-center justify-center bg-primary text-primary-foreground group-hover:scale-110 transition-transform">
                      <Play size={24} />
                    </div>
                    <div>
                      <div className="font-medium">Watch Property Tour</div>
                      <div className="text-sm text-muted-foreground">View the full video walkthrough</div>
                    </div>
                  </a>
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="sticky top-28"
            >
              {/* Price Card */}
              <div className="p-8 bg-card border border-border mb-6">
                <div className="text-sm text-muted-foreground mb-2">Price</div>
                <div className="text-3xl font-light text-primary mb-6">{property.priceFormatted}</div>

                <div className="space-y-3">
                  <Button className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90">
                    <Phone size={18} className="mr-2" />
                    Schedule Viewing
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full h-12 border-border hover:border-primary hover:text-primary bg-transparent"
                  >
                    <Mail size={18} className="mr-2" />
                    Enquire Now
                  </Button>
                  <Button variant="ghost" className="w-full h-12 text-muted-foreground hover:text-foreground">
                    <Share2 size={18} className="mr-2" />
                    Share Property
                  </Button>
                </div>
              </div>

              {/* Agent Card */}
              <div className="p-6 bg-card border border-border">
                <div className="text-sm text-muted-foreground mb-4">Listed By</div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-muted">
                    <img src="/placeholder.svg?height=56&width=56" alt="Agent" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="font-medium">Synergy Homes Limited</div>
                    <div className="text-sm text-muted-foreground">Luxury Property Specialists</div>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <a
                    href="tel:+2341234567890"
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Phone size={14} />
                    +234 123 456 7890
                  </a>
                  <a
                    href="mailto:contact@synergyhomes.com.ng"
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Mail size={14} />
                    contact@synergyhomes.com.ng
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
