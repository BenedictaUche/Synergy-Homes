import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { PropertyCard } from "@/components/property-card"
import { sanityFetch } from "@/sanity/lib/live"
import { landParcelQuery } from "@/sanity/lib/queries"
import { urlFor } from "@/sanity/lib/image"
import { PropertiesPageClient } from "./properties-page-client"

interface LandParcel {
  _id: string
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
  images: Array<{ asset: { _id: string; url: string } }>
  videoUrl?: string
  documentationType: "C of O" | "Governor's Consent" | "Deed of Assignment" | "Gazette" | "Survey Plan"
}

export default async function PropertiesPage() {
  const { data: landParcels } = await sanityFetch({ query: landParcelQuery })

  // Transform Sanity images to URLs
  const transformedLandParcels = (landParcels || []).map((land: LandParcel) => ({
    ...land,
    id: land._id,
    images: land.images?.map((img: any) => urlFor(img.asset).url()) || [],
  }))

  // Extract unique locations from actual data
  const locationStrings = transformedLandParcels
    .map((land: LandParcel) => land.location)
    .filter((loc: string | any[]): loc is string => typeof loc === 'string' && loc.length > 0)
  const uniqueLocations = Array.from(new Set(locationStrings)).sort()

  // Calculate price ranges from actual data
  const prices: number[] = transformedLandParcels
    .map((land: LandParcel) => land.price)
    .filter((price: number): price is number => typeof price === 'number' && price > 0)
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0
  const maxPrice = prices.length > 0 ? Math.max(...prices) : 0

  // Calculate size ranges from actual data
  const sizes: number[] = transformedLandParcels
    .map((land: LandParcel) => land.size)
    .filter((size: number): size is number => typeof size === 'number' && size > 0)
  const minSize = sizes.length > 0 ? Math.min(...sizes) : 0
  const maxSize = sizes.length > 0 ? Math.max(...sizes) : 0

  return (
    <PropertiesPageClient
      landParcels={transformedLandParcels}
      availableLocations={uniqueLocations as string[]}
      priceRange={{ min: minPrice, max: maxPrice }}
      sizeRange={{ min: minSize, max: maxSize }}
    />
  )
}
