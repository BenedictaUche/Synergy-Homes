/**
 * SANITY CMS SCHEMA REFERENCE
 *
 * This file provides schema definitions for Sanity CMS integration.
 * To use these schemas:
 * 1. Create a new Sanity project: npx sanity init
 * 2. Copy these schemas to your Sanity studio's schemas folder
 * 3. Configure the Sanity client in your Next.js app
 *
 * Note: These are TypeScript type definitions for reference.
 * The actual Sanity schemas should be created in your Sanity studio.
 */

// Property Schema
export const propertySchema = {
  name: "property",
  title: "Property",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string", validation: (Rule: unknown) => Rule },
    { name: "slug", title: "Slug", type: "slug", options: { source: "name" } },
    { name: "location", title: "Location", type: "string" },
    { name: "address", title: "Full Address", type: "string" },
    { name: "price", title: "Price", type: "number" },
    { name: "description", title: "Description", type: "text" },
    { name: "shortDescription", title: "Short Description", type: "text" },
    { name: "beds", title: "Bedrooms", type: "number" },
    { name: "baths", title: "Bathrooms", type: "number" },
    { name: "sqft", title: "Square Feet", type: "number" },
    { name: "yearBuilt", title: "Year Built", type: "number" },
    {
      name: "propertyType",
      title: "Property Type",
      type: "string",
      options: {
        list: ["penthouse", "villa", "mansion", "apartment", "estate"],
      },
    },
    {
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: ["available", "sold", "pending"],
      },
    },
    { name: "featured", title: "Featured", type: "boolean" },
    { name: "investmentSuitable", title: "Investment Suitable", type: "boolean" },
    { name: "features", title: "Features", type: "array", of: [{ type: "string" }] },
    { name: "amenities", title: "Amenities", type: "array", of: [{ type: "string" }] },
    { name: "images", title: "Images", type: "array", of: [{ type: "image" }] },
    { name: "videoUrl", title: "Video URL", type: "url" },
  ],
}

// Investment Schema
export const investmentSchema = {
  name: "investment",
  title: "Investment",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string" },
    { name: "slug", title: "Slug", type: "slug", options: { source: "name" } },
    {
      name: "type",
      title: "Investment Type",
      type: "string",
      options: {
        list: ["residential", "commercial", "mixed-use", "land"],
      },
    },
    { name: "minInvestment", title: "Minimum Investment", type: "number" },
    { name: "expectedROI", title: "Expected ROI", type: "string" },
    { name: "duration", title: "Duration", type: "string" },
    { name: "location", title: "Location", type: "string" },
    { name: "description", title: "Description", type: "text" },
    { name: "shortDescription", title: "Short Description", type: "text" },
    { name: "benefits", title: "Benefits", type: "array", of: [{ type: "string" }] },
    { name: "requirements", title: "Requirements", type: "array", of: [{ type: "string" }] },
    {
      name: "faqs",
      title: "FAQs",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "question", title: "Question", type: "string" },
            { name: "answer", title: "Answer", type: "text" },
          ],
        },
      ],
    },
    { name: "images", title: "Images", type: "array", of: [{ type: "image" }] },
    {
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: ["open", "closed", "coming-soon"],
      },
    },
  ],
}

// Team Member Schema
export const teamMemberSchema = {
  name: "teamMember",
  title: "Team Member",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string" },
    { name: "position", title: "Position", type: "string" },
    { name: "bio", title: "Bio", type: "text" },
    { name: "image", title: "Image", type: "image" },
    {
      name: "social",
      title: "Social Links",
      type: "object",
      fields: [
        { name: "linkedin", title: "LinkedIn", type: "url" },
        { name: "twitter", title: "Twitter", type: "url" },
      ],
    },
  ],
}

// Testimonial Schema
export const testimonialSchema = {
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    { name: "content", title: "Content", type: "text" },
    { name: "author", title: "Author Name", type: "string" },
    { name: "position", title: "Author Position", type: "string" },
    { name: "image", title: "Author Image", type: "image" },
  ],
}

// Service Schema
export const serviceSchema = {
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    { name: "description", title: "Description", type: "text" },
    { name: "features", title: "Features", type: "array", of: [{ type: "string" }] },
    { name: "icon", title: "Icon Name", type: "string" },
    { name: "order", title: "Display Order", type: "number" },
  ],
}

// Site Settings Schema
export const siteSettingsSchema = {
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    { name: "companyName", title: "Company Name", type: "string" },
    { name: "tagline", title: "Tagline", type: "string" },
    { name: "phone", title: "Phone", type: "string" },
    { name: "email", title: "Email", type: "string" },
    { name: "address", title: "Address", type: "text" },
    { name: "whatsappNumber", title: "WhatsApp Number", type: "string" },
    { name: "googleMapsUrl", title: "Google Maps URL", type: "url" },
    {
      name: "socialLinks",
      title: "Social Links",
      type: "object",
      fields: [
        { name: "facebook", title: "Facebook", type: "url" },
        { name: "instagram", title: "Instagram", type: "url" },
        { name: "linkedin", title: "LinkedIn", type: "url" },
        { name: "twitter", title: "Twitter", type: "url" },
      ],
    },
    {
      name: "workingHours",
      title: "Working Hours",
      type: "array",
      of: [{ type: "string" }],
    },
  ],
}

/**
 * NEXT.JS + SANITY INTEGRATION EXAMPLE
 *
 * Install: npm install @sanity/client next-sanity
 *
 * // lib/sanity.ts
 * import { createClient } from '@sanity/client'
 *
 * export const client = createClient({
 *   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
 *   dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
 *   apiVersion: '2024-01-01',
 *   useCdn: true,
 * })
 *
 * // Fetching properties
 * export async function getProperties() {
 *   return client.fetch(`*[_type == "property"] | order(_createdAt desc)`)
 * }
 *
 * // Fetching single property
 * export async function getPropertyBySlug(slug: string) {
 *   return client.fetch(`*[_type == "property" && slug.current == $slug][0]`, { slug })
 * }
 */
