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

  return <PropertiesPageClient landParcels={transformedLandParcels} />
}
