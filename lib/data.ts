// Mock data for properties and investments
// In production, this would come from Sanity CMS

export interface Property {
  id: string
  name: string
  slug: string
  location: string
  address: string
  price: number
  priceFormatted: string
  description: string
  shortDescription: string
  beds: number
  baths: number
  sqft: number
  yearBuilt: number
  propertyType: "penthouse" | "villa" | "mansion" | "apartment" | "estate"
  status: "available" | "sold" | "pending"
  featured: boolean
  investmentSuitable: boolean
  features: string[]
  amenities: string[]
  images: string[]
  videoUrl?: string
}

export interface Investment {
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

export interface TeamMember {
  id: string
  name: string
  position: string
  bio: string
  image: string
  social?: {
    linkedin?: string
    twitter?: string
  }
}

export interface Service {
  id: string
  title: string
  description: string
  features: string[]
  icon: string
}

export const properties: Property[] = [
  {
    id: "1",
    name: "The Meridian Penthouse",
    slug: "the-meridian-penthouse",
    location: "Victoria Island, Lagos",
    address: "15 Admiralty Way, Victoria Island, Lagos",
    price: 850000000,
    priceFormatted: "₦850,000,000",
    description:
      "Experience the pinnacle of luxury living at The Meridian Penthouse. This exceptional residence spans the entire top floor of one of Victoria Island's most prestigious addresses, offering panoramic views of the Lagos lagoon and city skyline. The thoughtfully designed interior features premium Italian marble flooring, custom millwork, and floor-to-ceiling windows that flood the space with natural light. The gourmet kitchen is equipped with top-of-the-line Gaggenau appliances and Carrara marble countertops. Each bedroom is a private sanctuary with en-suite bathrooms featuring heated floors and rain showers. The master suite includes a private terrace, walk-in closet, and spa-like bathroom with a soaking tub overlooking the water.",
    shortDescription:
      "An exceptional penthouse offering panoramic views and unparalleled luxury finishes in Victoria Island's most prestigious address.",
    beds: 5,
    baths: 6,
    sqft: 8500,
    yearBuilt: 2022,
    propertyType: "penthouse",
    status: "available",
    featured: true,
    investmentSuitable: true,
    features: [
      "Private elevator access",
      "Smart home automation",
      "Wine cellar",
      "Home theater",
      "Private rooftop terrace",
      "Chef's kitchen",
      "Staff quarters",
      "3-car garage",
    ],
    amenities: [
      "24/7 concierge",
      "Infinity pool",
      "Fitness center",
      "Spa services",
      "Private beach access",
      "Helipad access",
    ],
    images: [
      "/luxury-penthouse-living-room-with-panoramic-city-v.jpg",
      "/modern-luxury-kitchen.png",
      "/luxury-ocean-bedroom.png",
      "/elegant-bathroom-with-freestanding-tub.jpg",
      "/rooftop-terrace-with-city-skyline-views.jpg",
    ],
    videoUrl: "https://www.youtube.com/watch?v=example",
  },
  {
    id: "2",
    name: "Oceanview Estate",
    slug: "oceanview-estate",
    location: "Banana Island, Lagos",
    address: "Plot 7, Banana Island Road, Ikoyi, Lagos",
    price: 1200000000,
    priceFormatted: "₦1,200,000,000",
    description:
      "Oceanview Estate represents the ultimate expression of waterfront luxury living. Set on over an acre of meticulously landscaped grounds on Banana Island, this magnificent estate offers direct water access and breathtaking views. The main residence features seven bedroom suites, each with custom Italian furnishings and private balconies. The entertainment spaces include a grand living room with 25-foot ceilings, a formal dining room for 20 guests, and a club-level recreation room. Outside, discover an Olympic-sized infinity pool, private dock, tennis court, and lush tropical gardens.",
    shortDescription:
      "A magnificent waterfront estate on Banana Island with private dock, infinity pool, and over an acre of landscaped grounds.",
    beds: 7,
    baths: 8,
    sqft: 12000,
    yearBuilt: 2021,
    propertyType: "estate",
    status: "available",
    featured: true,
    investmentSuitable: true,
    features: [
      "Private dock",
      "Olympic infinity pool",
      "Tennis court",
      "Guest house",
      "Staff quarters for 6",
      "6-car garage",
      "Wine vault",
      "Cigar lounge",
    ],
    amenities: [
      "Waterfront location",
      "Gated community",
      "24/7 security",
      "Backup power",
      "Borehole water",
      "Smart home system",
    ],
    images: [
      "/luxury-waterfront-mansion-exterior-with-pool.jpg",
      "/grand-living-room-with-high-ceilings.jpg",
      "/luxury-outdoor-pool-area-with-ocean-view.jpg",
      "/elegant-formal-dining-room.jpg",
      "/luxury-master-suite-with-water-views.jpg",
    ],
  },
  {
    id: "3",
    name: "Crown Heights Villa",
    slug: "crown-heights-villa",
    location: "Ikoyi, Lagos",
    address: "23 Bourdillon Road, Ikoyi, Lagos",
    price: 650000000,
    priceFormatted: "₦650,000,000",
    description:
      "Crown Heights Villa is a masterpiece of contemporary architecture nestled in the heart of Ikoyi. This stunning property seamlessly blends indoor and outdoor living with its open-plan design and floor-to-ceiling glass walls. The villa features four luxurious bedroom suites, each designed as a private retreat with custom wardrobes and premium en-suite facilities. The chef's kitchen opens to a beautiful covered terrace perfect for al fresco dining. The landscaped gardens include a heated pool, outdoor kitchen, and meditation garden.",
    shortDescription:
      "A contemporary architectural masterpiece in Ikoyi featuring open-plan living, heated pool, and stunning landscaped gardens.",
    beds: 4,
    baths: 5,
    sqft: 6200,
    yearBuilt: 2023,
    propertyType: "villa",
    status: "available",
    featured: true,
    investmentSuitable: false,
    features: [
      "Contemporary architecture",
      "Heated pool",
      "Outdoor kitchen",
      "Home office",
      "Gym",
      "Staff quarters",
      "2-car garage",
      "Solar panels",
    ],
    amenities: [
      "Gated community",
      "24/7 security",
      "Landscaped gardens",
      "Meditation garden",
      "Backup power",
      "Smart home",
    ],
    images: [
      "/modern-villa-exterior-with-pool.jpg",
      "/contemporary-living-room-with-glass-walls.jpg",
      "/modern-luxury-bedroom.png",
      "/outdoor-terrace-with-dining-area.jpg",
      "/landscaped-garden-with-pool.jpg",
    ],
  },
  {
    id: "4",
    name: "The Royal Apartments",
    slug: "the-royal-apartments",
    location: "Lekki Phase 1, Lagos",
    address: "Block A, Royal Gardens Estate, Lekki",
    price: 280000000,
    priceFormatted: "₦280,000,000",
    description:
      "The Royal Apartments offer sophisticated urban living in Lekki's most sought-after neighborhood. This beautifully appointed 3-bedroom apartment features high-end finishes throughout, including hardwood floors, designer lighting, and custom cabinetry. The open-concept living area flows onto a private balcony with city views. Residents enjoy access to world-class amenities including a rooftop pool, state-of-the-art gym, and 24-hour concierge services.",
    shortDescription:
      "Sophisticated 3-bedroom apartment in Lekki with high-end finishes and world-class building amenities.",
    beds: 3,
    baths: 4,
    sqft: 3200,
    yearBuilt: 2022,
    propertyType: "apartment",
    status: "available",
    featured: false,
    investmentSuitable: true,
    features: [
      "Open-concept design",
      "Private balcony",
      "Hardwood floors",
      "Custom cabinetry",
      "Designer lighting",
      "En-suite bathrooms",
      "Walk-in closets",
      "Dedicated parking",
    ],
    amenities: ["Rooftop pool", "Fitness center", "24/7 concierge", "Security", "Backup power", "Children's play area"],
    images: [
      "/modern-city-living.png",
      "/luxury-apartment-kitchen.png",
      "/elegant-bedroom-with-en-suite.jpg",
      "/modern-bathroom.png",
      "/building-rooftop-pool.jpg",
    ],
  },
  {
    id: "5",
    name: "Grandeur Mansion",
    slug: "grandeur-mansion",
    location: "Maitama, Abuja",
    address: "45 Amazon Street, Maitama, Abuja",
    price: 980000000,
    priceFormatted: "₦980,000,000",
    description:
      "Grandeur Mansion is an architectural triumph in Abuja's prestigious Maitama district. This palatial residence spans three levels and features six bedroom suites, formal and informal living areas, a ballroom, and extensive staff quarters. The property sits on 2 acres of manicured grounds with a swimming pool, tennis court, and private garden. Every detail has been carefully considered, from the imported Italian marble to the custom millwork and designer fixtures.",
    shortDescription: "A palatial 6-bedroom mansion in Maitama spanning 2 acres with ballroom, pool, and tennis court.",
    beds: 6,
    baths: 7,
    sqft: 15000,
    yearBuilt: 2020,
    propertyType: "mansion",
    status: "pending",
    featured: false,
    investmentSuitable: false,
    features: [
      "Ballroom",
      "Swimming pool",
      "Tennis court",
      "Wine cellar",
      "Library",
      "Home theater",
      "8-car garage",
      "Staff quarters",
    ],
    amenities: ["2 acres grounds", "Manicured gardens", "Guard house", "Backup power", "Borehole", "Smart security"],
    images: [
      "/palatial-mansion-exterior-with-fountain.jpg",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
  },
  {
    id: "6",
    name: "Serenity Villas",
    slug: "serenity-villas",
    location: "Ikeja GRA, Lagos",
    address: "12 Mobolaji Johnson Avenue, Ikeja GRA",
    price: 420000000,
    priceFormatted: "₦420,000,000",
    description:
      "Serenity Villas offers a tranquil escape in the heart of Ikeja GRA. This beautifully designed 4-bedroom villa combines modern aesthetics with comfortable living. Features include an open-plan kitchen and living area, spacious bedrooms with en-suite bathrooms, a private garden, and a swimming pool. The property benefits from excellent natural light and cross-ventilation.",
    shortDescription: "A tranquil 4-bedroom villa in Ikeja GRA with private garden, pool, and modern open-plan design.",
    beds: 4,
    baths: 5,
    sqft: 5500,
    yearBuilt: 2023,
    propertyType: "villa",
    status: "available",
    featured: false,
    investmentSuitable: true,
    features: [
      "Private pool",
      "Garden",
      "Open-plan living",
      "Modern kitchen",
      "Home office",
      "Staff room",
      "2-car garage",
      "Outdoor BBQ",
    ],
    amenities: ["Quiet neighborhood", "24/7 security", "Backup power", "Borehole", "Landscaping", "Paved driveway"],
    images: [
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
  },
]

export const investments: Investment[] = [
  {
    id: "1",
    name: "Victoria Gardens Development",
    slug: "victoria-gardens-development",
    type: "residential",
    minInvestment: 50000000,
    minInvestmentFormatted: "₦50,000,000",
    expectedROI: "25-30%",
    duration: "24 months",
    location: "Victoria Island, Lagos",
    description:
      "Victoria Gardens is a premium residential development comprising 48 luxury apartments in the heart of Victoria Island. This investment opportunity offers investors the chance to participate in one of Lagos's most anticipated residential projects. The development features world-class amenities including a rooftop infinity pool, fitness center, co-working spaces, and 24/7 concierge services. With pre-sales already at 60%, this investment offers strong potential for capital appreciation.",
    shortDescription:
      "Premium 48-unit luxury apartment development in Victoria Island with 25-30% expected ROI over 24 months.",
    benefits: [
      "Prime Victoria Island location",
      "Strong pre-sales demand (60% sold)",
      "Reputable development partners",
      "Flexible exit options",
      "Quarterly progress reports",
      "Tax-efficient structure",
    ],
    requirements: [
      "Minimum investment: ₦50,000,000",
      "Accredited investor status",
      "24-month lock-in period",
      "KYC documentation",
      "Signed investment agreement",
    ],
    faqs: [
      {
        question: "What is the expected completion date?",
        answer:
          "The project is scheduled for completion in Q4 2025, with investor returns distributed within 90 days of project completion.",
      },
      {
        question: "How are returns calculated?",
        answer:
          "Returns are calculated based on the profit from unit sales minus development costs, distributed proportionally to investors based on their investment amount.",
      },
      {
        question: "Can I exit early?",
        answer:
          "Early exit is possible after 12 months with a 5% early redemption fee, subject to finding a replacement investor.",
      },
      {
        question: "Is my investment secured?",
        answer:
          "All investments are secured against the underlying property assets with proper legal documentation and escrow arrangements.",
      },
    ],
    images: [
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    status: "open",
  },
  {
    id: "2",
    name: "Lekki Commercial Plaza",
    slug: "lekki-commercial-plaza",
    type: "commercial",
    minInvestment: 100000000,
    minInvestmentFormatted: "₦100,000,000",
    expectedROI: "20-25%",
    duration: "36 months",
    location: "Lekki Phase 1, Lagos",
    description:
      "Lekki Commercial Plaza is a Grade-A commercial development strategically located in Lekki Phase 1. The 12-story building will offer 50,000 sqft of premium office space and 10,000 sqft of retail space. With major corporate tenants already signed for 40% of the space, this investment offers stable long-term returns backed by quality tenants.",
    shortDescription:
      "Grade-A 12-story commercial development in Lekki with 40% pre-leased to major corporate tenants.",
    benefits: [
      "40% pre-leased to blue-chip tenants",
      "Prime commercial location",
      "Grade-A specifications",
      "Long-term lease agreements",
      "Professional property management",
      "Potential for rental income + capital gains",
    ],
    requirements: [
      "Minimum investment: ₦100,000,000",
      "Institutional or accredited investor",
      "36-month investment term",
      "Due diligence completion",
      "Investment committee approval",
    ],
    faqs: [
      {
        question: "Who are the anchor tenants?",
        answer: "We have signed LOIs with two multinational corporations and a major Nigerian bank for anchor tenancy.",
      },
      {
        question: "What are the projected rental yields?",
        answer: "Based on current market rates, we project rental yields of 8-10% annually once fully leased.",
      },
      {
        question: "How is the investment structured?",
        answer:
          "The investment is structured as a Special Purpose Vehicle (SPV) with investors receiving proportional equity stakes.",
      },
    ],
    images: [
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    status: "open",
  },
  {
    id: "3",
    name: "Abuja Mixed-Use Development",
    slug: "abuja-mixed-use-development",
    type: "mixed-use",
    minInvestment: 75000000,
    minInvestmentFormatted: "₦75,000,000",
    expectedROI: "22-28%",
    duration: "30 months",
    location: "Central Business District, Abuja",
    description:
      "This flagship mixed-use development in Abuja's CBD combines luxury residential units with premium retail and office space. The project includes 30 residential apartments, 15,000 sqft of retail space, and 20,000 sqft of office space. Located steps from major government institutions and corporate headquarters, this investment offers diversified income streams and strong appreciation potential.",
    shortDescription:
      "Flagship mixed-use development in Abuja CBD combining luxury residential, retail, and office space.",
    benefits: [
      "Diversified asset classes",
      "Prime CBD location",
      "Multiple income streams",
      "Government/corporate proximity",
      "Strong rental demand",
      "Professional management",
    ],
    requirements: [
      "Minimum investment: ₦75,000,000",
      "Accredited investor verification",
      "30-month commitment",
      "Quarterly reporting subscription",
      "Legal documentation",
    ],
    faqs: [
      {
        question: "How are returns distributed across asset classes?",
        answer:
          "Returns are pooled from all three asset classes (residential, retail, office) and distributed proportionally to investors.",
      },
      {
        question: "What is the construction timeline?",
        answer: "Construction is scheduled over 24 months with an additional 6 months for leasing and sales.",
      },
    ],
    images: [
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    status: "open",
  },
  {
    id: "4",
    name: "Ibeju-Lekki Land Investment",
    slug: "ibeju-lekki-land-investment",
    type: "land",
    minInvestment: 25000000,
    minInvestmentFormatted: "₦25,000,000",
    expectedROI: "40-60%",
    duration: "18 months",
    location: "Ibeju-Lekki, Lagos",
    description:
      "Strategic land acquisition in Ibeju-Lekki, positioned along the corridor of Lagos's expanding infrastructure including the Lekki Free Trade Zone, Dangote Refinery, and new international airport. This investment offers significant upside potential as the area develops into Lagos's new economic hub.",
    shortDescription:
      "Strategic land acquisition in high-growth Ibeju-Lekki corridor with 40-60% appreciation potential.",
    benefits: [
      "High appreciation potential",
      "Strategic location",
      "Infrastructure development",
      "Flexible lot sizes",
      "Clear title documentation",
      "Development optionality",
    ],
    requirements: [
      "Minimum investment: ₦25,000,000",
      "Valid identification",
      "18-month holding period",
      "Land documentation review",
      "Survey and mapping",
    ],
    faqs: [
      {
        question: "What documentation is provided?",
        answer: "Investors receive Certificate of Occupancy (C of O), survey plan, and deed of assignment.",
      },
      {
        question: "Can I build on the land?",
        answer: "Yes, investors can choose to develop their allocated plots or hold for appreciation.",
      },
    ],
    images: [
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    status: "coming-soon",
  },
]

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Chief Adewale Johnson",
    position: "Founder & Chairman",
    bio: "With over 30 years of experience in Nigerian real estate, Chief Johnson founded Synergy Homes Limited with a vision to redefine luxury living. His leadership has guided the company to become one of the most trusted names in premium property.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "2",
    name: "Mrs. Folake Adeyemi",
    position: "Chief Executive Officer",
    bio: "Folake brings 20 years of executive experience in real estate development and finance. Under her leadership, Synergy Homes Limited has expanded its portfolio and achieved record growth.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "3",
    name: "Mr. Chukwuemeka Obi",
    position: "Director of Sales",
    bio: "Emeka leads our sales team with passion and expertise, having closed over ₦50 billion in property transactions. His client-first approach has earned him recognition as one of Nigeria's top real estate professionals.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "4",
    name: "Arc. Ngozi Eze",
    position: "Head of Design & Development",
    bio: "An award-winning architect, Ngozi oversees all design and development projects. Her innovative approach ensures every Synergy Homes property meets the highest standards of aesthetics and functionality.",
    image: "/placeholder.svg?height=400&width=400",
  },
]

export const services: Service[] = [
  {
    id: "1",
    title: "Property Sales",
    description:
      "Access our exclusive portfolio of luxury residential and commercial properties. Our team provides personalized guidance to help you find the perfect property that matches your lifestyle and investment goals.",
    features: [
      "Exclusive property listings",
      "Personalized property matching",
      "Virtual and in-person viewings",
      "Market analysis and pricing guidance",
      "Negotiation support",
      "Transaction management",
    ],
    icon: "Building2",
  },
  {
    id: "2",
    title: "Property Management",
    description:
      "Comprehensive property management services designed to protect your investment and maximize returns. We handle everything from tenant relations to maintenance, giving you peace of mind.",
    features: [
      "Tenant screening and placement",
      "Rent collection and accounting",
      "Property maintenance",
      "Regular inspections",
      "Financial reporting",
      "Legal compliance",
    ],
    icon: "Key",
  },
  {
    id: "3",
    title: "Investment Advisory",
    description:
      "Expert guidance on real estate investment opportunities tailored to your financial objectives. Our advisors help you build a diversified property portfolio for long-term wealth creation.",
    features: [
      "Investment strategy development",
      "Market research and analysis",
      "Due diligence support",
      "Portfolio optimization",
      "Risk assessment",
      "Exit planning",
    ],
    icon: "TrendingUp",
  },
  {
    id: "4",
    title: "Legal & Documentation",
    description:
      "Complete legal support ensuring secure and transparent property transactions. Our legal team handles all documentation and due diligence to protect your interests.",
    features: [
      "Title verification",
      "Contract preparation",
      "Due diligence",
      "Regulatory compliance",
      "Dispute resolution",
      "Documentation management",
    ],
    icon: "Shield",
  },
  {
    id: "5",
    title: "Valuation Services",
    description:
      "Professional property valuation services for sales, purchases, financing, and insurance purposes. Our certified valuers provide accurate assessments based on comprehensive market analysis.",
    features: [
      "Market value assessments",
      "Investment analysis",
      "Insurance valuations",
      "Portfolio reviews",
      "Comparative market analysis",
      "Certified reports",
    ],
    icon: "Calculator",
  },
  {
    id: "6",
    title: "Development Consulting",
    description:
      "Strategic consulting for property developers and investors. We provide feasibility studies, project management, and market positioning strategies for successful developments.",
    features: [
      "Feasibility studies",
      "Market positioning",
      "Project management",
      "Cost optimization",
      "Quality assurance",
      "Sales and marketing",
    ],
    icon: "Compass",
  },
]

// Helper functions
export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug)
}

export function getInvestmentBySlug(slug: string): Investment | undefined {
  return investments.find((i) => i.slug === slug)
}

export function getFeaturedProperties(): Property[] {
  return properties.filter((p) => p.featured)
}

export function getAvailableProperties(): Property[] {
  return properties.filter((p) => p.status === "available")
}

export function getOpenInvestments(): Investment[] {
  return investments.filter((i) => i.status === "open")
}
