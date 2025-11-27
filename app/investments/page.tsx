"use client"

import { motion } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { InvestmentCard } from "@/components/investment-card"
import { investments } from "@/lib/data"
import { TrendingUp, Shield, Users, BarChart3 } from "lucide-react"

const investmentBenefits = [
  {
    icon: TrendingUp,
    title: "High Returns",
    description: "Our carefully selected investments offer competitive returns of 20-60% depending on the opportunity.",
  },
  {
    icon: Shield,
    title: "Secured Investments",
    description: "All investments are secured against underlying property assets with proper legal documentation.",
  },
  {
    icon: Users,
    title: "Expert Management",
    description: "Our experienced team manages every aspect of the investment to maximize your returns.",
  },
  {
    icon: BarChart3,
    title: "Transparent Reporting",
    description: "Receive regular updates and detailed reports on your investment performance.",
  },
]

export default function InvestmentsPage() {
  const openInvestments = investments.filter((i) => i.status === "open")
  const comingSoonInvestments = investments.filter((i) => i.status === "coming-soon")

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-card">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="text-primary text-sm tracking-[0.3em] mb-4 block">INVESTMENT OPPORTUNITIES</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6">
              Build Wealth Through
              <span className="text-primary font-medium"> Real Estate</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Discover exclusive investment opportunities in premium real estate developments. Our carefully curated
              portfolio offers attractive returns backed by tangible assets.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-background border-b border-border">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {investmentBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center border border-primary/30 text-primary">
                  <benefit.icon size={24} />
                </div>
                <h3 className="text-lg font-medium mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Investments */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <span className="text-primary text-sm tracking-[0.3em] mb-4 block">NOW ACCEPTING INVESTORS</span>
            <h2 className="text-3xl md:text-4xl font-light">
              Open
              <span className="text-primary font-medium"> Opportunities</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {openInvestments.map((investment, index) => (
              <InvestmentCard key={investment.id} investment={investment} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      {comingSoonInvestments.length > 0 && (
        <section className="py-16 lg:py-24 bg-card">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <span className="text-primary text-sm tracking-[0.3em] mb-4 block">UPCOMING</span>
              <h2 className="text-3xl md:text-4xl font-light">
                Coming
                <span className="text-primary font-medium"> Soon</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {comingSoonInvestments.map((investment, index) => (
                <InvestmentCard key={investment.id} investment={investment} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-light mb-4">Ready to Invest?</h2>
            <p className="text-lg opacity-80 mb-8 max-w-2xl mx-auto">
              Schedule a consultation with our investment team to discuss opportunities that align with your financial
              goals.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-background text-foreground text-sm tracking-wider hover:bg-background/90 transition-colors"
            >
              Schedule Consultation
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  )
}
