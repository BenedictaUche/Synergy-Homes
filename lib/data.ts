// Mock data for land parcels and investments
// In production, this would come from Sanity CMS

export interface LandParcel {
  id: string
  name: string
  slug: string
  location: string
  address: string
  price: number
  priceFormatted: string
  description: string
  shortDescription: string
  size: number // in square meters
  sizeFormatted: string // e.g., "2 acres" or "5000 sqm"
  landUse: "residential" | "commercial" | "mixed-use" | "agricultural" | "industrial"
  topography: "flat" | "gently-sloping" | "hilly" | "waterfront"
  status: "available" | "sold" | "reserved"
  featured: boolean
  investmentSuitable: boolean
  features: string[]
  infrastructure: string[]
  images: string[]
  videoUrl?: string
  documentationType: "C of O" | "Governor's Consent" | "Deed of Assignment" | "Gazette" | "Survey Plan"
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

export const landParcels: LandParcel[] = [
  {
    id: "1",
    name: "Lekki Expressway Prime Land",
    slug: "lekki-expressway-prime-land",
    location: "Lekki-Epe Expressway, Lagos",
    address: "KM 45, Lekki-Epe Expressway, Lagos",
    price: 180000000,
    priceFormatted: "₦180,000,000",
    size: 2023.43, // square meters (approx 0.5 acres)
    sizeFormatted: "0.5 acres (2,023 sqm)",
    description:
      "Prime commercial land strategically positioned along the bustling Lekki-Epe Expressway. This half-acre parcel offers exceptional visibility and accessibility, making it ideal for commercial development, showrooms, or mixed-use projects. The land features a flat topography with over 30 meters of road frontage. Located in a rapidly developing corridor with proximity to major residential estates, shopping centers, and the Lekki Free Trade Zone. Perfect for investors seeking high-traffic commercial opportunities in Lagos's expanding eastern corridor.",
    shortDescription:
      "Strategic 0.5-acre commercial land on Lekki-Epe Expressway with excellent road frontage and high visibility.",
    landUse: "commercial",
    topography: "flat",
    status: "available",
    featured: true,
    investmentSuitable: true,
    documentationType: "C of O",
    features: [
      "30+ meters road frontage",
      "High-traffic location",
      "Flat terrain",
      "Fenced and gated",
      "Corner piece",
      "Dual access points",
      "Clear title documentation",
      "Survey plan available",
    ],
    infrastructure: [
      "Paved road access",
      "Street lighting",
      "Public power available",
      "Water infrastructure nearby",
      "Drainage system",
      "Close to bus stops",
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
    name: "Ibeju-Lekki Estate Land",
    slug: "ibeju-lekki-estate-land",
    location: "Ibeju-Lekki, Lagos",
    address: "Beside Dangote Refinery Road, Ibeju-Lekki",
    price: 75000000,
    priceFormatted: "₦75,000,000",
    size: 4046.86, // square meters (1 acre)
    sizeFormatted: "1 acre (4,047 sqm)",
    description:
      "Exceptional 1-acre residential land in the heart of Ibeju-Lekki, positioned in Lagos's fastest-growing investment corridor. Located just minutes from the Lekki Free Trade Zone, Dangote Refinery, and the proposed new international airport. This land is perfect for developing luxury residential estates, gated communities, or holding for significant capital appreciation. The area is experiencing rapid infrastructure development with new roads, power installations, and commercial centers. Ideal for developers and investors seeking entry into Nigeria's most promising real estate market.",
    shortDescription:
      "1-acre residential land in high-growth Ibeju-Lekki corridor near major infrastructure projects.",
    landUse: "residential",
    topography: "flat",
    status: "available",
    featured: true,
    investmentSuitable: true,
    documentationType: "C of O",
    features: [
      "1 full acre",
      "Dry land (not swampy)",
      "Rectangular shape",
      "Gated estate environment",
      "Perimeter fencing",
      "Estate development layout",
      "Government-approved layout",
      "Instant allocation",
    ],
    infrastructure: [
      "Good road network",
      "Estate gate",
      "24/7 security",
      "Streetlights",
      "Central drainage",
      "Power infrastructure planned",
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
    name: "Abuja CBD Investment Plot",
    slug: "abuja-cbd-investment-plot",
    location: "Central Business District, Abuja",
    address: "Plot 234, CBD Extension, Abuja",
    price: 450000000,
    priceFormatted: "₦450,000,000",
    size: 1214.06, // square meters (0.3 acres)
    sizeFormatted: "0.3 acres (1,214 sqm)",
    description:
      "Ultra-prime commercial land in Abuja's Central Business District Extension. This 0.3-acre plot offers unparalleled access to federal ministries, corporate headquarters, and diplomatic missions. The land is ideal for high-rise office development, luxury hotels, or premium mixed-use projects. With Abuja's CBD commanding the highest commercial rents in Nigeria, this represents a rare opportunity for sophisticated investors. The plot comes with approved building plans for a 10-story development and all necessary government approvals in place.",
    shortDescription:
      "Premium 0.3-acre CBD plot in Abuja's commercial heart with approved plans for high-rise development.",
    landUse: "commercial",
    topography: "flat",
    status: "available",
    featured: true,
    investmentSuitable: true,
    documentationType: "C of O",
    features: [
      "CBD prime location",
      "Approved building plans",
      "10-story development permit",
      "All government approvals",
      "Corner plot advantage",
      "Premium neighborhood",
      "High rental potential",
      "Capital appreciation guaranteed",
    ],
    infrastructure: [
      "Fully paved roads",
      "Underground utilities",
      "Street lighting",
      "24/7 power supply",
      "Fiber optic cables",
      "Excellent drainage",
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
    name: "Victoria Island Commercial Land",
    slug: "victoria-island-commercial-land",
    location: "Victoria Island, Lagos",
    address: "Akin Adesola Street, Victoria Island",
    price: 850000000,
    priceFormatted: "₦850,000,000",
    size: 809.37, // square meters (0.2 acres)
    sizeFormatted: "0.2 acres (809 sqm)",
    description:
      "Rare opportunity to own prime commercial land on Victoria Island's prestigious Akin Adesola Street. This 0.2-acre parcel is surrounded by multinational corporations, luxury hotels, and high-end commercial buildings. Perfect for corporate headquarters, boutique hotels, or premium office developments. The location offers exceptional visibility and prestige, commanding some of Lagos's highest commercial rates. This is a legacy investment in Nigeria's premier business district.",
    shortDescription:
      "Exclusive 0.2-acre commercial land on Victoria Island's premium Akin Adesola Street.",
    landUse: "commercial",
    topography: "flat",
    status: "available",
    featured: false,
    investmentSuitable: true,
    documentationType: "C of O",
    features: [
      "Prestigious address",
      "Corporate neighborhood",
      "Excellent visibility",
      "Wide road frontage",
      "Flat topography",
      "Ready for development",
      "Clean title",
      "No encumbrances",
    ],
    infrastructure: [
      "Excellent road network",
      "Underground power",
      "Fiber optic ready",
      "Premium street lighting",
      "Advanced drainage",
      "Waste management",
    ],
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
    name: "Banana Island Waterfront Land",
    slug: "banana-island-waterfront-land",
    location: "Banana Island, Ikoyi, Lagos",
    address: "Waterfront Avenue, Banana Island",
    price: 1500000000,
    priceFormatted: "₦1,500,000,000",
    size: 2023.43, // square meters (0.5 acres)
    sizeFormatted: "0.5 acres (2,023 sqm)",
    description:
      "Ultra-exclusive waterfront land on Banana Island, Nigeria's most prestigious address. This half-acre parcel offers breathtaking lagoon views and direct water access. Surrounded by billionaire estates and diplomatic residences, this land represents the pinnacle of luxury real estate in Nigeria. Perfect for building a world-class mansion or luxury development. The property features gentle sloping topography toward the water and comes with all infrastructure in place. An exceptional opportunity for discerning buyers seeking the absolute best.",
    shortDescription:
      "Ultra-exclusive 0.5-acre waterfront land on Banana Island with lagoon views and water access.",
    landUse: "residential",
    topography: "waterfront",
    status: "reserved",
    featured: false,
    investmentSuitable: false,
    documentationType: "C of O",
    features: [
      "Waterfront location",
      "Direct lagoon access",
      "Private jetty potential",
      "Panoramic water views",
      "Gently sloping terrain",
      "Gated island community",
      "24/7 island security",
      "Prestigious neighbors",
    ],
    infrastructure: [
      "Underground power",
      "Treated water supply",
      "Fiber optic internet",
      "Street lighting",
      "Paved roads",
      "Advanced security systems",
    ],
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
    name: "Ajah Mixed-Use Development Land",
    slug: "ajah-mixed-use-development-land",
    location: "Ajah, Lagos",
    address: "Lekki-Epe Expressway, Ajah",
    price: 95000000,
    priceFormatted: "₦95,000,000",
    size: 2428.11, // square meters (0.6 acres)
    sizeFormatted: "0.6 acres (2,428 sqm)",
    description:
      "Versatile 0.6-acre land along the Lekki-Epe Expressway in Ajah, perfect for mixed-use development. The strategic location combines high residential density with commercial activity, making it ideal for shopping centers, residential estates, or mixed-use projects. Ajah is experiencing rapid growth with new estates, schools, and commercial centers. This land offers excellent returns for developers looking to capitalize on the area's transformation.",
    shortDescription:
      "0.6-acre mixed-use land in rapidly growing Ajah corridor with versatile development options.",
    landUse: "mixed-use",
    topography: "flat",
    status: "available",
    featured: false,
    investmentSuitable: true,
    documentationType: "Governor's Consent",
    features: [
      "Mixed-use zoning",
      "Expressway proximity",
      "High population density",
      "Rectangular plot",
      "Good road frontage",
      "Survey completed",
      "Clear documentation",
      "Ready for development",
    ],
    infrastructure: [
      "Tarred road access",
      "Public power available",
      "Water boreholes nearby",
      "Good drainage",
      "Transport links",
      "Commercial neighbors",
    ],
    images: [
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
  },
  {
    id: "7",
    name: "Abuja Gwarinpa Estate Plot",
    slug: "abuja-gwarinpa-estate-plot",
    location: "Gwarinpa, Abuja",
    address: "5th Avenue, Gwarinpa Estate, Abuja",
    price: 45000000,
    priceFormatted: "₦45,000,000",
    size: 607.03, // square meters (approx 650 sqm)
    sizeFormatted: "650 sqm",
    description:
      "Well-positioned residential plot in Gwarinpa, Abuja's largest housing estate. This 650 sqm land is perfect for building a family home in an established, secure neighborhood. Gwarinpa offers excellent social infrastructure including schools, hospitals, shopping centers, and recreational facilities. The estate is popular with middle-class families and civil servants, ensuring stable property values and easy resale potential.",
    shortDescription:
      "650 sqm residential plot in Gwarinpa Estate, Abuja's most established residential area.",
    landUse: "residential",
    topography: "flat",
    status: "available",
    featured: false,
    investmentSuitable: true,
    documentationType: "C of O",
    features: [
      "Residential estate",
      "650 sqm size",
      "Flat terrain",
      "Fenced estate",
      "Clear title",
      "Building plan approved",
      "Family-friendly area",
      "Stable property values",
    ],
    infrastructure: [
      "Paved estate roads",
      "Public power",
      "Borehole water",
      "Estate security",
      "Street lighting",
      "Waste management",
    ],
    images: [
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
  },
  {
    id: "8",
    name: "Epe Agricultural Farmland",
    slug: "epe-agricultural-farmland",
    location: "Epe, Lagos",
    address: "Epe-Ijebu Ode Road, Epe",
    price: 120000000,
    priceFormatted: "₦120,000,000",
    size: 40468.6, // square meters (10 acres)
    sizeFormatted: "10 acres (40,469 sqm)",
    description:
      "Expansive 10-acre agricultural land in Epe, perfect for commercial farming, livestock, or agro-tourism. The land features fertile soil, natural water sources, and gentle terrain ideal for various agricultural activities. Located along the Epe-Ijebu Ode road with excellent access. As Lagos expands eastward, this land also offers long-term appreciation potential for future residential or commercial conversion. A perfect blend of immediate agricultural productivity and future development prospects.",
    shortDescription:
      "Fertile 10-acre farmland in Epe with natural water sources and future development potential.",
    landUse: "agricultural",
    topography: "gently-sloping",
    status: "available",
    featured: false,
    investmentSuitable: true,
    documentationType: "Survey Plan",
    features: [
      "10 full acres",
      "Fertile soil",
      "Natural water source",
      "Gentle terrain",
      "Good access road",
      "Electricity nearby",
      "Suitable for crops/livestock",
      "Future development potential",
    ],
    infrastructure: [
      "Access road",
      "Power lines nearby",
      "Natural drainage",
      "Rural community",
      "Market access",
      "Transport links",
    ],
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
    name: "Ibeju-Lekki Land Bank Portfolio",
    slug: "ibeju-lekki-land-bank-portfolio",
    type: "land",
    minInvestment: 25000000,
    minInvestmentFormatted: "₦25,000,000",
    expectedROI: "40-60%",
    duration: "18-24 months",
    location: "Ibeju-Lekki, Lagos",
    description:
      "Strategic land banking opportunity in Ibeju-Lekki, Lagos's fastest-growing corridor. This investment pool acquires multiple land parcels positioned near the Dangote Refinery, Lekki Free Trade Zone, and proposed international airport. With infrastructure development accelerating, these lands are projected to appreciate 40-60% within 24 months. Investors receive proportional ownership across the portfolio, reducing single-asset risk while maximizing appreciation potential.",
    shortDescription:
      "Land banking portfolio in high-growth Ibeju-Lekki corridor with 40-60% projected appreciation.",
    benefits: [
      "High appreciation corridor",
      "Diversified land portfolio",
      "Infrastructure-driven growth",
      "Clear documentation (C of O)",
      "Flexible exit options",
      "Quarterly valuation reports",
    ],
    requirements: [
      "Minimum investment: ₦25,000,000",
      "Valid identification",
      "18-month minimum holding",
      "Investment agreement",
      "KYC documentation",
    ],
    faqs: [
      {
        question: "How many land parcels are in the portfolio?",
        answer:
          "The portfolio consists of 15-20 strategically selected parcels totaling approximately 50 acres in prime Ibeju-Lekki locations.",
      },
      {
        question: "What documentation do investors receive?",
        answer:
          "Investors receive allocation certificates, portfolio reports, and proportional rights to C of O documentation for each parcel.",
      },
      {
        question: "Can I exit before 18 months?",
        answer:
          "Early exit is possible with a 5% fee after 12 months, subject to finding a replacement investor or company buyback availability.",
      },
      {
        question: "How are appreciation gains calculated?",
        answer:
          "Land is independently valued quarterly. At exit, appreciation is calculated from entry valuation to final valuation, distributed proportionally.",
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
    name: "Lekki Commercial Land Development",
    slug: "lekki-commercial-land-development",
    type: "commercial",
    minInvestment: 50000000,
    minInvestmentFormatted: "₦50,000,000",
    expectedROI: "35-45%",
    duration: "24 months",
    location: "Lekki Phase 1, Lagos",
    description:
      "Joint venture land acquisition and development project on the Lekki-Epe Expressway. This 2-acre commercial land will be acquired, documented, and subdivided into smaller commercial plots for retail sale. Located in high-demand commercial corridor with verified buyer demand. Target ROI includes land appreciation plus development profit margins. Perfect for investors seeking active development participation with professional management.",
    shortDescription:
      "2-acre commercial land acquisition and subdivision project on Lekki-Epe Expressway.",
    benefits: [
      "High-traffic commercial location",
      "Verified buyer demand",
      "Professional development team",
      "Multiple income streams",
      "Milestone-based progress payments",
      "Full documentation support",
    ],
    requirements: [
      "Minimum investment: ₦50,000,000",
      "Accredited investor status",
      "24-month commitment",
      "Development agreement",
      "Site visit participation",
    ],
    faqs: [
      {
        question: "What is the development timeline?",
        answer:
          "Land acquisition (3 months), documentation and surveying (4 months), infrastructure development (8 months), marketing and sales (9 months).",
      },
      {
        question: "How are profits distributed?",
        answer:
          "Profits from plot sales are distributed quarterly after costs, proportional to investment size. Final distribution within 60 days of project completion.",
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
    name: "Abuja Estate Land Pool",
    slug: "abuja-estate-land-pool",
    type: "residential",
    minInvestment: 35000000,
    minInvestmentFormatted: "₦35,000,000",
    expectedROI: "25-35%",
    duration: "18 months",
    location: "Lugbe-Kuje Axis, Abuja",
    description:
      "Pooled investment in residential estate land along the Lugbe-Kuje corridor, Abuja's rapidly expanding residential zone. This investment acquires 20 acres to be developed into a serviced estate with roads, drainage, and perimeter fencing. Plots will be sold to individual buyers and developers. The area benefits from new Federal Housing schemes, improving road networks, and growing middle-class demand for affordable housing land.",
    shortDescription:
      "20-acre residential estate development in Abuja's expanding Lugbe-Kuje corridor.",
    benefits: [
      "Growing residential demand",
      "Infrastructure development",
      "Estate servicing included",
      "Government scheme proximity",
      "Affordable housing market",
      "Professional estate management",
    ],
    requirements: [
      "Minimum investment: ₦35,000,000",
      "18-month lock-in period",
      "Valid ID and KYC",
      "Investment committee approval",
      "Site inspection participation",
    ],
    faqs: [
      {
        question: "What infrastructure will be provided?",
        answer:
          "Estate roads, perimeter fencing, entrance gate, drainage system, streetlights, and central water infrastructure.",
      },
      {
        question: "Who are the target buyers?",
        answer:
          "Middle-class families, civil servants, and small developers seeking affordable residential plots in Abuja's expansion zones.",
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
    name: "Agricultural Land Investment - Epe",
    slug: "agricultural-land-investment-epe",
    type: "land",
    minInvestment: 15000000,
    minInvestmentFormatted: "₦15,000,000",
    expectedROI: "30-50%",
    duration: "24-36 months",
    location: "Epe, Lagos",
    description:
      "Agricultural land investment in Epe offering both immediate farming income and long-term appreciation. The 100-acre investment will be farmed for 2-3 crop cycles generating rental income to investors, while simultaneously benefiting from land value appreciation as Lagos expands eastward. At exit, land can be sold for residential/commercial conversion or continue agricultural operations. Dual income strategy with downside protection.",
    shortDescription:
      "100-acre agricultural investment in Epe with farming income plus capital appreciation potential.",
    benefits: [
      "Dual income streams",
      "Lower entry price (agricultural)",
      "Farming income during holding",
      "Future conversion potential",
      "Food security contribution",
      "Professional farm management",
    ],
    requirements: [
      "Minimum investment: ₦15,000,000",
      "24-month minimum term",
      "Agricultural knowledge helpful",
      "Investment agreement",
      "KYC compliance",
    ],
    faqs: [
      {
        question: "What crops will be farmed?",
        answer:
          "Cassava, maize, and vegetables will be cultivated based on market demand and soil suitability. Farming operations managed by experienced agricultural partners.",
      },
      {
        question: "How is farming income distributed?",
        answer:
          "Farming profits are distributed annually after harvest and sales, proportional to investment. Land appreciation realized at exit.",
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
    name: "Alexander Ekwueme Onyekwere",
    position: "CEO/MD",
    bio: "With over 15 years in real estate, Alexander has spearheaded numerous successful land acquisitions and developments across Nigeria. His visionary leadership drives Synergy Homes Limited's mission to deliver exceptional land investment opportunities.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "2",
    name: "Adeniyi Jacob",
    position: "Chief Business Analyst",
    bio: "Jacob is a seasoned business analyst with expertise in land valuation and investment strategies. He plays a crucial role in identifying lucrative land opportunities and ensuring the company's growth trajectory.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "3",
    name: "Ahmed Ajibade",
    position: "Brand Manager",
    bio: "Ajibade is a seasoned marketing professional with a decade of experience in real estate branding. He has successfully elevated Synergy Homes Limited's market presence through innovative campaigns and strategic partnerships.",
    image: "/placeholder.svg?height=400&width=400",
  },
]

export const services: Service[] = [
  {
    id: "1",
    title: "Land Sales",
    description:
      "Access our exclusive portfolio of premium land parcels across Nigeria's most promising locations. Our team provides personalized guidance to help you find the perfect land that matches your investment goals and development plans.",
    features: [
      "Verified land listings",
      "Title verification services",
      "Site inspections and surveys",
      "Market analysis and pricing",
      "Negotiation support",
      "Documentation assistance",
    ],
    icon: "Map",
  },
  {
    id: "2",
    title: "Land Documentation",
    description:
      "Comprehensive land documentation and title processing services. We handle everything from survey plans to Certificate of Occupancy (C of O) processing, ensuring your land ownership is secure and legally sound.",
    features: [
      "C of O processing",
      "Survey and mapping",
      "Governor's consent",
      "Deed of assignment",
      "Title verification",
      "Land registry services",
    ],
    icon: "FileText",
  },
  {
    id: "3",
    title: "Land Investment Advisory",
    description:
      "Expert guidance on land investment opportunities tailored to your financial objectives. Our advisors help you identify high-growth areas and build a diversified land portfolio for wealth creation and legacy building.",
    features: [
      "Investment strategy development",
      "Area growth analysis",
      "Due diligence support",
      "Portfolio optimization",
      "Risk assessment",
      "Exit planning strategies",
    ],
    icon: "TrendingUp",
  },
  {
    id: "4",
    title: "Land Development",
    description:
      "Professional land development services from estate layout to infrastructure provision. We transform raw land into serviced plots ready for construction, maximizing value for investors and developers.",
    features: [
      "Estate planning and layout",
      "Infrastructure development",
      "Road construction",
      "Drainage systems",
      "Perimeter fencing",
      "Utilities installation",
    ],
    icon: "Compass",
  },
  {
    id: "5",
    title: "Valuation & Survey",
    description:
      "Professional land valuation and surveying services for purchases, sales, and investment decisions. Our certified surveyors and valuers provide accurate assessments based on comprehensive market analysis.",
    features: [
      "Land valuation",
      "Topographical surveys",
      "Boundary demarcation",
      "Soil testing",
      "Site analysis reports",
      "Investment feasibility studies",
    ],
    icon: "Calculator",
  },
  {
    id: "6",
    title: "Legal & Title Services",
    description:
      "Complete legal support ensuring secure land transactions and proper documentation. Our legal team handles all aspects of land acquisition, from title searches to final registration.",
    features: [
      "Title verification and searches",
      "Contract preparation",
      "Due diligence",
      "C of O processing",
      "Governor's consent",
      "Dispute resolution",
    ],
    icon: "Shield",
  },
]

// Helper functions
export function getLandParcelBySlug(slug: string): LandParcel | undefined {
  return landParcels.find((p) => p.slug === slug)
}

export function getInvestmentBySlug(slug: string): Investment | undefined {
  return investments.find((i) => i.slug === slug)
}

export function getFeaturedLandParcels(): LandParcel[] {
  return landParcels.filter((p) => p.featured)
}

export function getAvailableLandParcels(): LandParcel[] {
  return landParcels.filter((p) => p.status === "available")
}

export function getOpenInvestments(): Investment[] {
  return investments.filter((i) => i.status === "open")
}

export function getLandParcelsByUse(landUse: LandParcel["landUse"]): LandParcel[] {
  return landParcels.filter((p) => p.landUse === landUse)
}

export function getLandParcelsByLocation(location: string): LandParcel[] {
  return landParcels.filter((p) => p.location.toLowerCase().includes(location.toLowerCase()))
}

export function getLandParcelsByPriceRange(minPrice: number, maxPrice: number): LandParcel[] {
  return landParcels.filter((p) => p.price >= minPrice && p.price <= maxPrice)
}
