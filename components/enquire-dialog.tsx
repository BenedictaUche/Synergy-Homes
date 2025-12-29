"use client"

import { useState } from "react"
import { Mail, Check } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface EnquireDialogProps {
  propertyName: string
  propertySlug: string
  propertyPrice: string
  trigger?: React.ReactNode
}

export function EnquireDialog({ propertyName, propertySlug, propertyPrice, trigger }: EnquireDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const data = {
      propertyName,
      propertySlug,
      propertyPrice,
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
    }

    try {
      const response = await fetch('/api/property-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit enquiry')
      }

      setSubmitSuccess(true)
      setTimeout(() => {
        setIsOpen(false)
        setSubmitSuccess(false)
        e.currentTarget?.reset()
      }, 2500)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  const defaultTrigger = (
    <Button
      variant="outline"
      className="w-full h-12 border-border hover:border-primary hover:text-primary bg-transparent"
    >
      <Mail size={18} className="mr-2" />
      Enquire Now
    </Button>
  )

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Enquire About This Property</DialogTitle>
          <DialogDescription>
            Have questions about <strong>{propertyName}</strong>? Fill out the form below and our team will get back to you.
          </DialogDescription>
        </DialogHeader>
        {submitSuccess ? (
          <div className="py-8 text-center">
            <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check size={32} />
            </div>
            <h3 className="text-lg font-medium mb-2">Enquiry Submitted!</h3>
            <p className="text-muted-foreground">
              Thank you for your interest. Our team will contact you within 24 hours to answer your questions.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="enquiry-name">Full Name *</Label>
              <Input id="enquiry-name" name="name" placeholder="John Doe" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="enquiry-email">Email Address *</Label>
              <Input
                id="enquiry-email"
                name="email"
                type="email"
                placeholder="john@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="enquiry-phone">Phone Number *</Label>
              <Input
                id="enquiry-phone"
                name="phone"
                type="tel"
                placeholder="+234 800 000 0000"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="enquiry-message">Your Message *</Label>
              <Textarea
                id="enquiry-message"
                name="message"
                placeholder="Tell us what you'd like to know about this property..."
                rows={4}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Send Enquiry"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
