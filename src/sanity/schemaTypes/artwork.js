export default {
  name: 'artwork',
  title: 'Artworks',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Artwork Title',
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
      validation: Rule => Rule.required(),
      description: 'Click "Generate" to create from title'
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the artwork for accessibility'
        }
      ],
      validation: Rule => Rule.required()
    },
    {
      name: 'gallery',
      title: 'Additional Images',
      type: 'array',
      description: 'Add more views or detail shots',
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
      name: 'year',
      title: 'Year Created',
      type: 'number',
      validation: Rule => Rule.required().min(1900).max(2100)
    },
    {
      name: 'medium',
      title: 'Medium',
      type: 'string',
      description: 'e.g., "Acrylic on Canvas", "Mixed Media"',
      validation: Rule => Rule.required()
    },
    {
      name: 'dimensions',
      title: 'Dimensions',
      type: 'string',
      description: 'e.g., "120 x 150 cm"',
      validation: Rule => Rule.required()
    },
    {
      name: 'dimensionsObject',
      title: 'Dimensions (Detailed)',
      type: 'object',
      description: 'For calculations and conversions',
      fields: [
        {
          name: 'width',
          title: 'Width (cm)',
          type: 'number'
        },
        {
          name: 'height',
          title: 'Height (cm)',
          type: 'number'
        },
        {
          name: 'depth',
          title: 'Depth (cm)',
          type: 'number'
        }
      ]
    },
    {
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'Brief description (shown in gallery)'
    },
    {
      name: 'longDescription',
      title: 'Full Description',
      type: 'array',
      description: 'Detailed story behind the artwork',
      of: [
        {
          type: 'block'
        }
      ]
    },
    {
      name: 'status',
      title: 'Availability Status',
      type: 'string',
      options: {
        list: [
          { title: 'Available', value: 'available' },
          { title: 'Sold', value: 'sold' },
          { title: 'Private Collection', value: 'private' },
          { title: 'Not for Sale', value: 'nfs' }
        ]
      },
      initialValue: 'available'
    },
    {
      name: 'price',
      title: 'Price',
      type: 'string',
      description: 'e.g., "KSH 50,000" or "Available upon request"'
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      },
      description: 'e.g., Abstract, Texture, Blue, Urban'
    },
    {
      name: 'featured',
      title: 'Featured Artwork',
      type: 'boolean',
      description: 'Show on homepage or featured section',
      initialValue: false
    },
    {
      name: 'aspectRatio',
      title: 'Aspect Ratio',
      type: 'string',
      options: {
        list: [
          { title: 'Portrait (4:5)', value: '4/5' },
          { title: 'Square (1:1)', value: '1/1' },
          { title: 'Landscape (3:2)', value: '3/2' },
          { title: 'Wide (5:3)', value: '5/3' },
          { title: 'Tall (2:3)', value: '2/3' }
        ]
      },
      description: 'Choose aspect ratio for gallery display'
    },
    {
      name: 'framing',
      title: 'Framing Information',
      type: 'string',
      description: 'e.g., "Unframed (framing available)"'
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
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }]
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
      media: 'mainImage',
      status: 'status'
    },
    prepare({ title, year, media, status }) {
      return {
        title: title,
        subtitle: `${year} • ${status || 'unknown'}`,
        media: media
      }
    }
  }
}