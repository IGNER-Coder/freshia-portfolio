export default {
  name: 'exhibition',
  title: 'Exhibitions',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Exhibition Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: Rule => Rule.required().min(2000).max(2100)
    },
    {
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
    },
    {
      name: 'endDate',
      title: 'End Date',
      type: 'date',
    },
    {
      name: 'venue',
      title: 'Venue',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'type',
      title: 'Exhibition Type',
      type: 'string',
      options: {
        list: [
          { title: 'Solo', value: 'solo' },
          { title: 'Group', value: 'group' },
          { title: 'Collective', value: 'collective' }
        ]
      }
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4
    },
    {
      name: 'featured',
      title: 'Featured Exhibition',
      type: 'boolean',
      description: 'Show prominently (e.g., Documenta 15)',
      initialValue: false
    },
    {
      name: 'externalLink',
      title: 'External Link',
      type: 'url',
      description: 'Link to exhibition page, press coverage, etc.'
    },
    {
      name: 'images',
      title: 'Exhibition Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true
          },
          fields: [
            {
              name: 'caption',
              title: 'Caption',
              type: 'string'
            }
          ]
        }
      ]
    },
    {
      name: 'artworks',
      title: 'Featured Artworks',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'artwork' }]
        }
      ]
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 0
    }
  ],
  orderings: [
    {
      title: 'Year (newest first)',
      name: 'yearDesc',
      by: [{ field: 'year', direction: 'desc' }]
    },
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }]
    }
  ],
  preview: {
    select: {
      title: 'title',
      year: 'year',
      venue: 'venue',
      media: 'images.0'
    },
    prepare({ title, year, venue, media }) {
      return {
        title: title,
        subtitle: `${year} • ${venue}`,
        media: media
      }
    }
  }
}