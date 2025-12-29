"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { MapPin, Maximize2, Compass, FileText, Calendar, Layers, Check, Phone, Mail, ArrowLeft, Play } from "lucide-react"
import { ImageGallery } from "@/components/image-gallery"
import { Button } from "@/components/ui/button"
import { ShareDialog } from "@/components/share-dialog"
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

interface LandParcelDetailsProps {
  property: LandParcel
}

export function PropertyDetails({ property }: LandParcelDetailsProps) {
  const statusColors = {
    available: "bg-green-500/20 text-green-400",
    sold: "bg-red-500/20 text-red-400",
    reserved: "bg-yellow-500/20 text-yellow-400",
  }

  const topographyLabels = {
    flat: "Flat Terrain",
    "gently-sloping": "Gently Sloping",
    hilly: "Hilly Terrain",
    waterfront: "Waterfront",
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
          Back to Land Parcels
        </Link>
      </div>

      {/* Image Gallery */}
      <div className="container mx-auto px-6 lg:px-12 mb-12">
        <ImageGallery images={property.images} title={property.name} />
      </div>

      {/* Land Parcel Info */}
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
                  <span className="px-3 py-1 bg-card text-xs tracking-wider uppercase">{property.landUse}</span>
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
                  <Maximize2 className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-light">{property.sizeFormatted.split('(')[0].trim()}</div>
                  <div className="text-xs text-muted-foreground">Land Size</div>
                </div>
                <div className="text-center">
                  <Compass className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-light capitalize">{property.landUse}</div>
                  <div className="text-xs text-muted-foreground">Land Use</div>
                </div>
                <div className="text-center">
                  <Layers className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-light">{topographyLabels[property.topography]}</div>
                  <div className="text-xs text-muted-foreground">Topography</div>
                </div>
                <div className="text-center">
                  <FileText className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-light">{property.documentationType}</div>
                  <div className="text-xs text-muted-foreground">Title</div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-10">
                <h2 className="text-xl font-medium mb-4">About This Land</h2>
                <p className="text-muted-foreground leading-relaxed">{property.description}</p>
              </div>

              {/* Features */}
              <div className="mb-10">
                <h2 className="text-xl font-medium mb-4">Land Features</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Check size={16} className="text-primary shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Infrastructure */}
              <div className="mb-10">
                <h2 className="text-xl font-medium mb-4">Infrastructure & Access</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {property.infrastructure.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Check size={16} className="text-primary shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Video */}
              {property.videoUrl && (
                <div className="mb-10">
                  <h2 className="text-xl font-medium mb-4">Site Video</h2>
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
                      <div className="font-medium">Watch Site Tour</div>
                      <div className="text-sm text-muted-foreground">View the full video walkthrough of the land</div>
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
                    Schedule Site Visit
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full h-12 border-border hover:border-primary hover:text-primary bg-transparent"
                  >
                    <Mail size={18} className="mr-2" />
                    Enquire Now
                  </Button>
                  <ShareDialog
                    title={property.name}
                    url={`/properties/${property.slug}`}
                    description={property.shortDescription}
                  />
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
                    <div className="text-sm text-muted-foreground">Premium Land Specialists</div>
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
