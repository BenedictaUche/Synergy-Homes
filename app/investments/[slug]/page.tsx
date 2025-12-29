import { notFound } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { InvestmentDetails } from "./investment-details"
import { sanityFetch } from "@/sanity/lib/live"
import { client } from "@/sanity/lib/client"
import { investmentQuery, investmentBySlugQuery } from "@/sanity/lib/queries"
import { urlFor } from "@/sanity/lib/image"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const investments = await client.fetch(investmentQuery)
  return investments.map((investment: any) => ({
    slug: investment.slug,
  }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const { data: investment } = await sanityFetch({
    query: investmentBySlugQuery,
    params: { slug }
  })

  if (!investment) {
    return {
      title: "Investment Not Found | Synergy Homes Limited",
    }
  }

  return {
    title: `${investment.name} | Investment Opportunities | Synergy Homes Limited`,
    description: investment.shortDescription,
  }
}

export default async function InvestmentPage({ params }: Props) {
  const { slug } = await params
  const { data: investment } = await sanityFetch({
    query: investmentBySlugQuery,
    params: { slug }
  })

  if (!investment) {
    notFound()
  }

  // Placeholder images to use when no images are available
  const placeholderImages = [
    "/land.jpg",
    "/land-two.jpg",
    "/land-three.jpg",
    "/land-four.jpg",
  ]

  // Transform Sanity images to URLs
  const images = investment.images?.map((img: any) => urlFor(img.asset).url()) || []

  // Use placeholder images if no images are available
  const finalImages = images.length > 0 ? images : placeholderImages

  const transformedInvestment = {
    ...investment,
    id: investment._id,
    images: finalImages,
    benefits: investment.benefits || [],
    requirements: investment.requirements || [],
    faqs: investment.faqs || [],
  }

  return (
    <main className="min-h-screen">
      <Navigation />
      <InvestmentDetails investment={transformedInvestment} />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
