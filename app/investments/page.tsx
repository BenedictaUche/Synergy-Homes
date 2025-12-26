import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { InvestmentCard } from "@/components/investment-card"
import { sanityFetch } from "@/sanity/lib/live"
import { investmentQuery } from "@/sanity/lib/queries"
import { urlFor } from "@/sanity/lib/image"
import { InvestmentsPageClient } from "./investments-page-client"

interface Investment {
  _id: string
  name: string
  slug: string
  type: "residential" | "commercial" | "mixed-use" | "land"
  minInvestment: number
  minInvestmentFormatted: string
  expectedROI: string
  duration: string
  location: string
  description: string
  shortDescription: string
  benefits: string[]
  requirements: string[]
  faqs: { question: string; answer: string }[]
  images: Array<{ asset: { _id: string; url: string } }>
  status: "open" | "closed" | "coming-soon"
}

export default async function InvestmentsPage() {
  const { data: investments } = await sanityFetch<Investment[]>({ query: investmentQuery })

  // Transform Sanity images to URLs
  const transformedInvestments = investments.map((investment) => ({
    ...investment,
    id: investment._id,
    images: investment.images?.map((img) => urlFor(img.asset).url()) || [],
  }))

  return <InvestmentsPageClient investments={transformedInvestments} />
}
