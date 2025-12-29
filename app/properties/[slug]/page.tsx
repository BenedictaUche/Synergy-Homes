import { notFound } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { PropertyDetails } from "./property-details"
import { sanityFetch } from "@/sanity/lib/live"
import { client } from "@/sanity/lib/client"
import { landParcelQuery, landParcelBySlugQuery } from "@/sanity/lib/queries"
import { urlFor } from "@/sanity/lib/image"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const landParcels = await client.fetch(landParcelQuery)
  return landParcels.map((land: any) => ({
    slug: land.slug,
  }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const { data: land } = await sanityFetch({
    query: landParcelBySlugQuery,
    params: { slug }
  })

  if (!land) {
    return {
      title: "Land Not Found | Synergy Homes Limited",
    }
  }

  // Get the first image URL for Open Graph
  const firstImage = land.images?.[0]
    ? urlFor(land.images[0].asset).width(1200).height(630).url()
    : `${process.env.NEXT_PUBLIC_SITE_URL || 'https://synergyhomes.com.ng'}/land.jpg`

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://synergyhomes.com.ng'
  const pageUrl = `${siteUrl}/properties/${slug}`
  const title = `${land.name} | Premium Land Parcel | Synergy Homes Limited`
  const description = land.shortDescription || `Premium land parcel in ${land.location}. ${land.sizeFormatted} available for ${land.landUse} development.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: 'Synergy Homes Limited',
      images: [
        {
          url: firstImage,
          width: 1200,
          height: 630,
          alt: land.name,
        },
      ],
      locale: 'en_NG',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [firstImage],
      creator: '@synergyhomes',
    },
    alternates: {
      canonical: pageUrl,
    },
    other: {
      'property:price:amount': land.price?.toString() || '',
      'property:price:currency': 'NGN',
    },
  }
}

export default async function PropertyPage({ params }: Props) {
  const { slug } = await params
  const { data: land } = await sanityFetch({
    query: landParcelBySlugQuery,
    params: { slug }
  })

  if (!land) {
    notFound()
  }

  // Placeholder images to use when no images are available
  const placeholderImages = [
    "/land.jpg",
    "/land-two.jpg",
    "/land-three.jpg",
    "/land-four.jpg",
  ]

  // Transform Sanity images to URLs
  const images = land.images?.map((img: any) => urlFor(img.asset).url()) || []

  // Use placeholder images if no images are available
  const finalImages = images.length > 0 ? images : placeholderImages

  const transformedLand = {
    ...land,
    id: land._id,
    images: finalImages,
  }

  return (
    <main className="min-h-screen">
      <Navigation />
      <PropertyDetails property={transformedLand} />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
