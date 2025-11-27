import Link from "next/link"
import { Mail, Phone, MapPin, Facebook, Linkedin, Twitter, Instagram } from "lucide-react"

const footerLinks = {
  company: [
    { href: "/about", label: "About Us" },
    { href: "/services", label: "Our Services" },
    { href: "/properties", label: "Properties" },
    { href: "/investments", label: "Investments" },
  ],
  support: [
    { href: "/contact", label: "Contact Us" },
    { href: "/faq", label: "FAQ" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ],
}

const socials = {
  facebook: [
    { href: "https://facebook.com/synergyhomes", icon: Facebook },
  ],
  instagram: [
    { href: "https://instagram.com/synergyhomes", icon: Instagram },
  ],
  linkedin: [
    { href: "https://linkedin.com/company/synergyhomes", icon: Linkedin },
  ],
  twitter: [
    { href: "https://twitter.com/synergyhomes", icon: Twitter },
  ],
}

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <div className="flex flex-col">
                <span className="text-2xl font-semibold tracking-wider text-primary">SYNERGY HOMES</span>
                <span className="text-xs tracking-[0.3em] text-muted-foreground -mt-1">LIMITED</span>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-xs">
              Your trusted partner in luxury real estate. Delivering exceptional properties and investment opportunities
              since 2005.
            </p>
            <div className="flex gap-4">
              {socials.map((social) => (
                <a
                  key={social}
                  href={`https://${social}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center border border-border hover:border-primary hover:text-primary transition-colors"
                  aria-label={social}
                >
                  <span className="text-xs uppercase tracking-wider">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-sm tracking-wider text-primary mb-6">COMPANY</h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-sm tracking-wider text-primary mb-6">SUPPORT</h4>
            <ul className="space-y-4">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm tracking-wider text-primary mb-6">CONTACT</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary mt-0.5 shrink-0" />
                <span className="text-sm text-muted-foreground">
                9 Dopemu Road by Alluminium Village Akowonjo Road,
                  <br />
                  Egbeda, Lagos
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary shrink-0" />
                <a
                  href="tel:+2341234567890"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  +234 123 456 7890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary shrink-0" />
                <a
                  href="mailto:contact@synergyhomes.com.ng"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  contact@synergyhomes.com.ng
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Synergy Homes Limited. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">Crafted with excellence for discerning clients.</p>
        </div>
      </div>
    </footer>
  )
}
