export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Site Title',
      type: 'string',
      initialValue: 'Freshia Njeri Portfolio',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Site Description',
      type: 'text',
      rows: 3,
      description: 'Used for SEO'
    },
    {
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      validation: Rule => Rule.required().email()
    },
    {
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        {
          name: 'instagram',
          title: 'Instagram',
          type: 'url',
          description: 'Full URL (e.g., https://instagram.com/username)'
        },
        {
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'url'
        },
        {
          name: 'behance',
          title: 'Behance',
          type: 'url'
        },
        {
          name: 'twitter',
          title: 'Twitter/X',
          type: 'url'
        }
      ]
    },
    {
      name: 'studioInfo',
      title: 'Studio Information',
      type: 'object',
      fields: [
        {
          name: 'location',
          title: 'Studio Location',
          type: 'text',
          rows: 3
        },
        {
          name: 'hours',
          title: 'Studio Hours',
          type: 'string',
          initialValue: 'By appointment only'
        },
        {
          name: 'responseTime',
          title: 'Response Time',
          type: 'string',
          initialValue: 'Within 24-48 hours'
        }
      ]
    },
    {
      name: 'availability',
      title: 'Commission Availability',
      type: 'object',
      fields: [
        {
          name: 'acceptingCommissions',
          title: 'Currently Accepting Commissions',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'statusMessage',
          title: 'Status Message',
          type: 'string',
          description: 'e.g., "Currently accepting commissions" or "Fully booked until March 2025"'
        }
      ]
    },
    {
      name: 'homepageSettings',
      title: 'Homepage Settings',
      type: 'object',
      fields: [
        {
          name: 'heroImage',
          title: 'Hero Background Image',
          type: 'image',
          options: {
            hotspot: true
          },
          description: 'Main background image for homepage'
        },
        {
          name: 'tagline',
          title: 'Tagline',
          type: 'string',
          initialValue: 'Visual Artist'
        }
      ]
    },
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          validation: Rule => Rule.max(60)
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          validation: Rule => Rule.max(160)
        },
        {
          name: 'ogImage',
          title: 'Open Graph Image',
          type: 'image',
          description: 'Image shown when sharing on social media (1200x630px recommended)'
        }
      ]
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings'
      }
    }
  }
}