import { notFound } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { InvestmentDetails } from "./investment-details"
import { getInvestmentBySlug, investments } from "@/lib/data"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return investments.map((investment) => ({
    slug: investment.slug,
  }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const investment = getInvestmentBySlug(slug)

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
  const investment = getInvestmentBySlug(slug)

  if (!investment) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <Navigation />
      <InvestmentDetails investment={investment} />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
