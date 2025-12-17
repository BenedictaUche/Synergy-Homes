"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { MapPin, TrendingUp, Clock, Check, AlertCircle, ArrowLeft, Phone, Mail, Download } from "lucide-react"
import { ImageGallery } from "@/components/image-gallery"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import type { Investment } from "@/lib/data"

interface InvestmentDetailsProps {
  investment: Investment
}

export function InvestmentDetails({ investment }: InvestmentDetailsProps) {
  const [isInterestOpen, setIsInterestOpen] = useState(false)
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [error, setError] = useState("")

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

  const handleInterestSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const data = {
      investmentName: investment.name,
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      amount: formData.get("amount"),
      message: formData.get("message"),
    }

    try {
      const response = await fetch('/api/investment-interest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit interest')
      }

      setSubmitSuccess(true)
      setTimeout(() => {
        setIsInterestOpen(false)
        setSubmitSuccess(false)
        // Reset form
        e.currentTarget?.reset()
      }, 2500)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleWaitlistSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const data = {
      investmentName: investment.name,
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
    }

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to join waitlist')
      }

      setSubmitSuccess(true)
      setTimeout(() => {
        setIsWaitlistOpen(false)
        setSubmitSuccess(false)
        e.currentTarget.reset()
      }, 2500)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDownloadProspectus = async () => {
    try {
      // Prompt for email if user wants to receive via email
      const userEmail = prompt("Enter your email to receive the prospectus:")
      const userName = prompt("Enter your name:")

      if (userEmail && userName) {
        const response = await fetch('/api/generate-prospectus', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            investmentName: investment.name,
            investmentSlug: investment.slug,
            userEmail,
            userName
          })
        })

        const result = await response.json()

        if (response.ok) {
          alert(`Prospectus will be sent to ${userEmail} shortly. Check your inbox!`)
        } else {
          throw new Error(result.error)
        }
      } else {
        // Try direct download
        window.open(`/prospectus/${investment.slug}.pdf`, '_blank')
      }
    } catch (err) {
      console.error('Download error:', err)
      alert('Unable to download prospectus. Please contact us at contact@synergyhomes.com.ng')
    }
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
                      <Dialog open={isInterestOpen} onOpenChange={setIsInterestOpen}>
                        <DialogTrigger asChild>
                          <Button className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90">
                            Express Interest
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle>Express Your Interest</DialogTitle>
                            <DialogDescription>
                              Fill out the form below and our investment team will contact you within 24 hours.
                            </DialogDescription>
                          </DialogHeader>
                          {submitSuccess ? (
                            <div className="py-8 text-center">
                              <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Check size={32} />
                              </div>
                              <h3 className="text-lg font-medium mb-2">Thank You!</h3>
                              <p className="text-muted-foreground">
                                We've received your interest. Check your email for confirmation and next steps.
                              </p>
                            </div>
                          ) : (
                            <form onSubmit={handleInterestSubmit} className="space-y-4">
                              {error && (
                                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded">
                                  {error}
                                </div>
                              )}
                              <div className="space-y-2">
                                <Label htmlFor="name">Full Name *</Label>
                                <Input id="name" name="name" placeholder="John Doe" required />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="email">Email Address *</Label>
                                <Input id="email" name="email" type="email" placeholder="john@example.com" required />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number *</Label>
                                <Input id="phone" name="phone" type="tel" placeholder="+234 800 000 0000" required />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="amount">Intended Investment Amount (₦)</Label>
                                <Input
                                  id="amount"
                                  name="amount"
                                  type="number"
                                  placeholder="5000000"
                                  min={investment.minInvestment}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="message">Additional Information</Label>
                                <Textarea
                                  id="message"
                                  name="message"
                                  placeholder="Tell us about your investment goals..."
                                  rows={3}
                                />
                              </div>
                              <Button type="submit" className="w-full" disabled={isSubmitting}>
                                {isSubmitting ? "Submitting..." : "Submit Interest"}
                              </Button>
                            </form>
                          )}
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="outline"
                        className="w-full h-12 border-border hover:border-primary hover:text-primary bg-transparent"
                        onClick={handleDownloadProspectus}
                      >
                        <Download size={16} className="mr-2" />
                        Download Prospectus
                      </Button>
                    </>
                  ) : investment.status === "coming-soon" ? (
                    <Dialog open={isWaitlistOpen} onOpenChange={setIsWaitlistOpen}>
                      <DialogTrigger asChild>
                        <Button className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90">
                          Join Waitlist
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                          <DialogTitle>Join the Waitlist</DialogTitle>
                          <DialogDescription>
                            Be the first to know when this investment opportunity opens. We'll notify you via email and SMS.
                          </DialogDescription>
                        </DialogHeader>
                        {submitSuccess ? (
                          <div className="py-8 text-center">
                            <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                              <Check size={32} />
                            </div>
                            <h3 className="text-lg font-medium mb-2">You're on the list!</h3>
                            <p className="text-muted-foreground">
                              We'll notify you as soon as this investment opens. Check your email for confirmation.
                            </p>
                          </div>
                        ) : (
                          <form onSubmit={handleWaitlistSubmit} className="space-y-4">
                            {error && (
                              <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded">
                                {error}
                              </div>
                            )}
                            <div className="space-y-2">
                              <Label htmlFor="waitlist-name">Full Name *</Label>
                              <Input id="waitlist-name" name="name" placeholder="John Doe" required />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="waitlist-email">Email Address *</Label>
                              <Input
                                id="waitlist-email"
                                name="email"
                                type="email"
                                placeholder="john@example.com"
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="waitlist-phone">Phone Number *</Label>
                              <Input
                                id="waitlist-phone"
                                name="phone"
                                type="tel"
                                placeholder="+234 800 000 0000"
                                required
                              />
                            </div>
                            <Button type="submit" className="w-full" disabled={isSubmitting}>
                              {isSubmitting ? "Joining..." : "Join Waitlist"}
                            </Button>
                          </form>
                        )}
                      </DialogContent>
                    </Dialog>
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
                    <div className="text-sm text-muted-foreground">Synergy Homes Limited</div>
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
