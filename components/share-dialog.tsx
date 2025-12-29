"use client"

import { useState } from "react"
import { Share2, MessageCircle, Twitter, Facebook, Link as LinkIcon, Check } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface ShareDialogProps {
  title: string
  url: string
  description?: string
  trigger?: React.ReactNode
}

export function ShareDialog({ title, url, description, trigger }: ShareDialogProps) {
  const [copied, setCopied] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const shareText = description
    ? `${title} - ${description}`
    : `Check out ${title} on Synergy Homes`

  const shareUrl = typeof window !== 'undefined' ? window.location.href : url

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
        setIsOpen(false)
      }, 2000)
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  const handleShare = (platform: string) => {
    const encodedUrl = encodeURIComponent(shareUrl)
    const encodedText = encodeURIComponent(shareText)

    const shareLinks: Record<string, string> = {
      whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    }

    const link = shareLinks[platform]
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer')
      setIsOpen(false)
    }
  }

  const defaultTrigger = (
    <Button variant="ghost" className="w-full h-12 text-muted-foreground hover:text-foreground">
      <Share2 size={18} className="mr-2" />
      Share Land
    </Button>
  )

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share {title}</DialogTitle>
          <DialogDescription>
            Share this property with your friends and family
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-3 py-4">
          <Button
            variant="outline"
            className="h-20 flex flex-col items-center justify-center gap-2 hover:bg-green-50 hover:border-green-300"
            onClick={() => handleShare('whatsapp')}
          >
            <MessageCircle size={24} className="text-green-600" />
            <span className="text-sm">WhatsApp</span>
          </Button>
          <Button
            variant="outline"
            className="h-20 flex flex-col items-center justify-center gap-2 hover:bg-blue-50 hover:border-blue-300"
            onClick={() => handleShare('twitter')}
          >
            <Twitter size={24} className="text-blue-400" />
            <span className="text-sm">Twitter / X</span>
          </Button>
          <Button
            variant="outline"
            className="h-20 flex flex-col items-center justify-center gap-2 hover:bg-blue-50 hover:border-blue-300"
            onClick={() => handleShare('facebook')}
          >
            <Facebook size={24} className="text-blue-600" />
            <span className="text-sm">Facebook</span>
          </Button>
          <Button
            variant="outline"
            className="h-20 flex flex-col items-center justify-center gap-2 hover:bg-primary/10 hover:border-primary"
            onClick={handleCopyLink}
          >
            {copied ? (
              <>
                <Check size={24} className="text-green-600" />
                <span className="text-sm text-green-600">Copied!</span>
              </>
            ) : (
              <>
                <LinkIcon size={24} className="text-primary" />
                <span className="text-sm">Copy Link</span>
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
