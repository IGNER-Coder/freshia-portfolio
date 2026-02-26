export default {
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'About Freshia Njeri',
      readOnly: true
    },
    {
      name: 'quote',
      title: 'Main Quote',
      type: 'text',
      rows: 3,
      description: 'The large quote at the top of the page',
      validation: Rule => Rule.required()
    },
    {
      name: 'biography',
      title: 'Biography',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' }
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' }
            ]
          }
        }
      ],
      validation: Rule => Rule.required()
    },
    {
      name: 'artistStatement',
      title: 'Artist Statement',
      type: 'array',
      of: [
        {
          type: 'block'
        }
      ],
      description: 'Your artistic philosophy and approach'
    },
    {
      name: 'portraitImage',
      title: 'Portrait Image',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string'
        }
      ]
    },
    {
      name: 'metadata',
      title: 'Quick Facts',
      type: 'object',
      fields: [
        {
          name: 'location',
          title: 'Location',
          type: 'string',
          initialValue: 'Nairobi, Kenya'
        },
        {
          name: 'collective',
          title: 'Collective',
          type: 'string',
          initialValue: 'Wajukuu Arts'
        },
        {
          name: 'medium',
          title: 'Primary Medium',
          type: 'string',
          initialValue: 'Mixed Media & Acrylic'
        },
        {
          name: 'practice',
          title: 'Practice',
          type: 'string',
          initialValue: 'Self-Taught Artist'
        },
        {
          name: 'role',
          title: 'Role',
          type: 'string',
          initialValue: 'Kids Club Leader'
        }
      ]
    },
    {
      name: 'education',
      title: 'Education & Training',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'degree',
              title: 'Degree/Program',
              type: 'string'
            },
            {
              name: 'institution',
              title: 'Institution',
              type: 'string'
            },
            {
              name: 'year',
              title: 'Year',
              type: 'number'
            }
          ]
        }
      ]
    },
    {
      name: 'press',
      title: 'Press & Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'publication',
              title: 'Publication',
              type: 'string'
            },
            {
              name: 'title',
              title: 'Article Title',
              type: 'string'
            },
            {
              name: 'year',
              title: 'Year',
              type: 'number'
            },
            {
              name: 'quote',
              title: 'Pull Quote',
              type: 'text',
              description: 'A notable quote from the article'
            },
            {
              name: 'link',
              title: 'Link',
              type: 'url'
            }
          ]
        }
      ]
    },
    {
      name: 'techniqueImages',
      title: 'Technique Images',
      type: 'object',
      fields: [
        {
          name: 'texture',
          title: 'Texture Shot',
          type: 'image',
          options: { hotspot: true }
        },
        {
          name: 'color',
          title: 'Color Shot',
          type: 'image',
          options: { hotspot: true }
        },
        {
          name: 'canvas',
          title: 'Canvas Shot',
          type: 'image',
          options: { hotspot: true }
        }
      ]
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'About Page Content'
      }
    }
  }
}