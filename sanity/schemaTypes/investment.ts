import {defineField, defineType} from 'sanity'

export const investment = defineType({
  name: 'investment',
  title: 'Investment',
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
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          {title: 'Residential', value: 'residential'},
          {title: 'Commercial', value: 'commercial'},
          {title: 'Mixed-Use', value: 'mixed-use'},
          {title: 'Land', value: 'land'},
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'minInvestment',
      title: 'Minimum Investment (NGN)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    },
    {
      name: 'minInvestmentFormatted',
      title: 'Minimum Investment Formatted (e.g., ₦25,000,000)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'expectedROI',
      title: 'Expected ROI (e.g., 40-60%)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'duration',
      title: 'Duration (e.g., 18-24 months)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'location',
      title: 'Location',
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
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      of: [{type: 'string'}],
    },
    {
      name: 'requirements',
      title: 'Requirements',
      type: 'array',
      of: [{type: 'string'}],
    },
    {
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'question', title: 'Question', type: 'string'},
            {name: 'answer', title: 'Answer', type: 'text'},
          ],
          preview: {
            select: {title: 'question'},
          },
        },
      ],
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{type: 'image'}],
      validation: (Rule) => Rule.min(1),
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Open', value: 'open'},
          {title: 'Closed', value: 'closed'},
          {title: 'Coming Soon', value: 'coming-soon'},
        ],
      },
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {title: 'name', subtitle: 'type'},
  },
})
