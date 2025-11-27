"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { MapPin, TrendingUp, Clock, Check, AlertCircle, ArrowLeft, Phone, Mail } from "lucide-react"
import { ImageGallery } from "@/components/image-gallery"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { Investment } from "@/lib/data"

interface InvestmentDetailsProps {
  investment: Investment
}

export function InvestmentDetails({ investment }: InvestmentDetailsProps) {
  const statusStyles = {
    open: "bg-green-500/20 text-green-400",
    closed: "bg-red-500/20 text-red-400",
    "coming-soon": "bg-yellow-500/20 text-yellow-400",
  }

  const typeLabels = {
    residential: "Residential Development",
    commercial: "Commercial Development",
    "mixed-use": "Mixed-Use Development",
    land: "Land Investment",
  }

  return (
    <div className="pt-24 pb-16">
      {/* Back Button */}
      <div className="container mx-auto px-6 lg:px-12 mb-8">
        <Link
          href="/investments"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Investments
        </Link>
      </div>

      {/* Image Gallery */}
      <div className="container mx-auto px-6 lg:px-12 mb-12">
        <ImageGallery images={investment.images} title={investment.name} />
      </div>

      {/* Investment Info */}
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              {/* Header */}
              <div className="mb-8">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className={`px-3 py-1 text-xs tracking-wider uppercase ${statusStyles[investment.status]}`}>
                    {investment.status.replace("-", " ")}
                  </span>
                  <span className="px-3 py-1 bg-card text-xs tracking-wider uppercase">
                    {typeLabels[investment.type]}
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-light mb-4">{investment.name}</h1>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin size={18} />
                  <span>{investment.location}</span>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-3 gap-4 p-6 bg-card border border-border mb-8">
                <div className="text-center">
                  <TrendingUp className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-light text-primary">{investment.expectedROI}</div>
                  <div className="text-xs text-muted-foreground">Expected ROI</div>
                </div>
                <div className="text-center">
                  <Clock className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-light">{investment.duration}</div>
                  <div className="text-xs text-muted-foreground">Duration</div>
                </div>
                <div className="text-center">
                  <div className="w-6 h-6 mx-auto mb-2 text-primary flex items-center justify-center text-lg">₦</div>
                  <div className="text-2xl font-light">{investment.minInvestmentFormatted.replace("₦", "")}</div>
                  <div className="text-xs text-muted-foreground">Min. Investment</div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-10">
                <h2 className="text-xl font-medium mb-4">Investment Overview</h2>
                <p className="text-muted-foreground leading-relaxed">{investment.description}</p>
              </div>

              {/* Benefits */}
              <div className="mb-10">
                <h2 className="text-xl font-medium mb-4">Investment Benefits</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {investment.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check size={16} className="text-primary shrink-0 mt-1" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div className="mb-10">
                <h2 className="text-xl font-medium mb-4">Investment Requirements</h2>
                <div className="p-6 bg-card border border-border">
                  {investment.requirements.map((requirement, index) => (
                    <div key={index} className="flex items-start gap-3 mb-3 last:mb-0">
                      <AlertCircle size={16} className="text-primary shrink-0 mt-1" />
                      <span className="text-muted-foreground">{requirement}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQs */}
              {investment.faqs.length > 0 && (
                <div className="mb-10">
                  <h2 className="text-xl font-medium mb-4">Frequently Asked Questions</h2>
                  <Accordion type="single" collapsible className="space-y-2">
                    {investment.faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`faq-${index}`} className="border border-border bg-card px-6">
                        <AccordionTrigger className="text-left hover:no-underline hover:text-primary">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
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
              {/* Investment Card */}
              <div className="p-8 bg-card border border-border mb-6">
                <div className="text-sm text-muted-foreground mb-2">Minimum Investment</div>
                <div className="text-3xl font-light text-primary mb-2">{investment.minInvestmentFormatted}</div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <span className="flex items-center gap-1">
                    <TrendingUp size={14} /> {investment.expectedROI}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} /> {investment.duration}
                  </span>
                </div>

                <div className="space-y-3">
                  {investment.status === "open" ? (
                    <>
                      <Button className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90">
                        Express Interest
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full h-12 border-border hover:border-primary hover:text-primary bg-transparent"
                      >
                        Download Prospectus
                      </Button>
                    </>
                  ) : investment.status === "coming-soon" ? (
                    <Button className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90">
                      Join Waitlist
                    </Button>
                  ) : (
                    <Button disabled className="w-full h-12">
                      Investment Closed
                    </Button>
                  )}
                </div>
              </div>

              {/* Contact Card */}
              <div className="p-6 bg-card border border-border">
                <div className="text-sm text-muted-foreground mb-4">Investment Team</div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-muted">
                    <img
                      src="/placeholder.svg?height=56&width=56"
                      alt="Investment Advisor"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium">Investment Advisory</div>
                    <div className="text-sm text-muted-foreground">Prestige Estates</div>
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
                    href="mailto:invest@prestigeestates.com"
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Mail size={14} />
                    invest@prestigeestates.com
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
