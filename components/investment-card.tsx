"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { MapPin, TrendingUp, Clock, ArrowRight } from "lucide-react"
interface Investment {
  id: string
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
  images: string[]
  status: "open" | "closed" | "coming-soon"
}

interface InvestmentCardProps {
  investment: Investment
  index?: number
}

export function InvestmentCard({ investment, index = 0 }: InvestmentCardProps) {
  const statusStyles = {
    open: "bg-green-500/20 text-green-400",
    closed: "bg-red-500/20 text-red-400",
    "coming-soon": "bg-yellow-500/20 text-yellow-400",
  }

  const typeLabels = {
    residential: "Residential",
    commercial: "Commercial",
    "mixed-use": "Mixed-Use",
    land: "Land",
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link href={`/investments/${investment.slug}`} className="group block">
        <div className="relative aspect-[16/10] overflow-hidden mb-4">
          <img
            src={investment.images[0] || "/placeholder.svg"}
            alt={investment.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className={`px-3 py-1 text-xs tracking-wider uppercase ${statusStyles[investment.status]}`}>
              {investment.status.replace("-", " ")}
            </span>
            <span className="px-3 py-1 bg-card text-xs tracking-wider uppercase">{typeLabels[investment.type]}</span>
          </div>

          {/* ROI Badge */}
          <div className="absolute top-4 right-4 px-3 py-1 bg-primary text-primary-foreground text-xs tracking-wider">
            {investment.expectedROI} ROI
          </div>
        </div>

        <h3 className="text-xl font-medium mb-2 group-hover:text-primary transition-colors">{investment.name}</h3>

        <div className="flex items-center gap-2 text-muted-foreground mb-3">
          <MapPin size={14} />
          <span className="text-sm">{investment.location}</span>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{investment.shortDescription}</p>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div>
            <div className="text-xs text-muted-foreground mb-1">Min. Investment</div>
            <div className="text-lg text-primary font-medium">{investment.minInvestmentFormatted}</div>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <TrendingUp size={12} /> {investment.expectedROI}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={12} /> {investment.duration}
            </span>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
          View Details <ArrowRight size={14} />
        </div>
      </Link>
    </motion.div>
  )
}
