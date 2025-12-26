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

  // Transform Sanity images to URLs
  const transformedInvestment = {
    ...investment,
    id: investment._id,
    images: investment.images?.map((img: any) => urlFor(img.asset).url()) || [],
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
