import {defineField, defineType} from 'sanity'

export const landParcel = defineType({
  name: 'landParcel',
  title: 'Land Parcel',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name'},
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'address',
      title: 'Address',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'price',
      title: 'Price (NGN)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    },
    {
      name: 'priceFormatted',
      title: 'Price Formatted (e.g., ₦180,000,000)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'shortDescription',
      title: 'Short Description',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'size',
      title: 'Size (square meters)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    },
    {
      name: 'sizeFormatted',
      title: 'Size Formatted (e.g., 0.5 acres)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'landUse',
      title: 'Land Use',
      type: 'string',
      options: {
        list: [
          {title: 'Residential', value: 'residential'},
          {title: 'Commercial', value: 'commercial'},
          {title: 'Mixed-Use', value: 'mixed-use'},
          {title: 'Agricultural', value: 'agricultural'},
          {title: 'Industrial', value: 'industrial'},
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'topography',
      title: 'Topography',
      type: 'string',
      options: {
        list: [
          {title: 'Flat', value: 'flat'},
          {title: 'Gently Sloping', value: 'gently-sloping'},
          {title: 'Hilly', value: 'hilly'},
          {title: 'Waterfront', value: 'waterfront'},
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Available', value: 'available'},
          {title: 'Sold', value: 'sold'},
          {title: 'Reserved', value: 'reserved'},
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'investmentSuitable',
      title: 'Investment Suitable',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{type: 'string'}],
    },
    {
      name: 'infrastructure',
      title: 'Infrastructure',
      type: 'array',
      of: [{type: 'string'}],
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{type: 'image'}],
      validation: (Rule) => Rule.min(1),
    },
    {
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
    },
    {
      name: 'documentationType',
      title: 'Documentation Type',
      type: 'string',
      options: {
        list: [
          {title: 'C of O', value: 'C of O'},
          {title: "Governor's Consent", value: "Governor's Consent"},
          {title: 'Deed of Assignment', value: 'Deed of Assignment'},
          {title: 'Gazette', value: 'Gazette'},
          {title: 'Survey Plan', value: 'Survey Plan'},
        ],
      },
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {title: 'name', subtitle: 'location', media: 'images.0'},
  },
})
