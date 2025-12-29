"use client"

import { useState } from "react"
import { Calendar, Clock, Check } from "lucide-react"
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

interface SiteVisitDialogProps {
  propertyName: string
  propertySlug: string
  trigger?: React.ReactNode
}

export function SiteVisitDialog({ propertyName, propertySlug, trigger }: SiteVisitDialogProps) {
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
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      preferredDate: formData.get("preferredDate"),
      preferredTime: formData.get("preferredTime"),
      notes: formData.get("notes"),
    }

    try {
      const response = await fetch('/api/site-visit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to schedule site visit')
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
    <Button className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90">
      <Calendar size={18} className="mr-2" />
      Schedule Site Visit
    </Button>
  )

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Schedule a Site Visit</DialogTitle>
          <DialogDescription>
            Fill out the form below to schedule a site visit for <strong>{propertyName}</strong>. Our team will contact you to confirm the appointment.
          </DialogDescription>
        </DialogHeader>
        {submitSuccess ? (
          <div className="py-8 text-center">
            <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check size={32} />
            </div>
            <h3 className="text-lg font-medium mb-2">Visit Scheduled!</h3>
            <p className="text-muted-foreground">
              We've received your request. Our team will contact you within 24 hours to confirm your site visit.
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
              <Label htmlFor="visit-name">Full Name *</Label>
              <Input id="visit-name" name="name" placeholder="John Doe" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="visit-email">Email Address *</Label>
              <Input
                id="visit-email"
                name="email"
                type="email"
                placeholder="john@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="visit-phone">Phone Number *</Label>
              <Input
                id="visit-phone"
                name="phone"
                type="tel"
                placeholder="+234 800 000 0000"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="preferred-date">Preferred Date *</Label>
                <Input
                  id="preferred-date"
                  name="preferredDate"
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="preferred-time">Preferred Time *</Label>
                <Input
                  id="preferred-time"
                  name="preferredTime"
                  type="time"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="visit-notes">Additional Notes</Label>
              <Textarea
                id="visit-notes"
                name="notes"
                placeholder="Any special requirements or questions..."
                rows={3}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Scheduling..." : "Schedule Visit"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
