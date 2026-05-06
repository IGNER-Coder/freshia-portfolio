export default {
  name: 'publication',
  title: 'Publications',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Article Headline',
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
      name: 'publication',
      title: 'Publication / Outlet',
      type: 'string',
      description: 'e.g. "hvg360", "The Guardian", "ArtForum"',
      validation: Rule => Rule.required()
    },
    {
      name: 'publicationCountry',
      title: 'Publication Country',
      type: 'string',
      description: 'e.g. "Hungary", "United Kingdom"'
    },
    {
      name: 'language',
      title: 'Language',
      type: 'string',
      description: 'e.g. "Hungarian", "English", "French"'
    },
    {
      name: 'date',
      title: 'Publication Date',
      type: 'date',
      validation: Rule => Rule.required()
    },
    {
      name: 'year',
      title: 'Year',
      type: 'number',
      description: 'Derived or manual — used for grouping in the archive'
    },
    {
      name: 'url',
      title: 'External URL',
      type: 'url',
      description: 'Link to the article on the publication\'s website'
    },
    {
      name: 'excerpt',
      title: 'Excerpt / Pull Quote',
      type: 'text',
      rows: 3,
      description: 'Brief description or pull quote about what the article covers'
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the image for accessibility'
        }
      ],
      description: 'Optional screenshot or publication logo'
    },
    {
      name: 'type',
      title: 'Publication Type',
      type: 'string',
      options: {
        list: [
          { title: 'Press Feature',          value: 'press' },
          { title: 'Exhibition Catalogue',   value: 'catalogue' },
          { title: 'Academic / Research',    value: 'academic' },
          { title: 'Book / Editorial Mention', value: 'book' }
        ],
        layout: 'radio'
      }
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show this publication prominently on the Press page',
      initialValue: false
    }
  ],
  orderings: [
    {
      title: 'Date (newest first)',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }]
    },
    {
      title: 'Publication A–Z',
      name: 'pubAsc',
      by: [{ field: 'publication', direction: 'asc' }]
    }
  ],
  preview: {
    select: {
      title: 'title',
      publication: 'publication',
      date: 'date',
      media: 'coverImage',
      featured: 'featured'
    },
    prepare({ title, publication, date, media, featured }) {
      const year = date ? new Date(date).getFullYear() : '—'
      return {
        title: `${featured ? '★ ' : ''}${title}`,
        subtitle: `${publication} · ${year}`,
        media
      }
    }
  }
}

// ─── Seed example ─────────────────────────────────────────────────────────────
// Use the object below as a reference when creating the first document in Sanity Studio.
//
// title:              "A művészet, amely visszaadja a jövőt"
// slug:               { current: "a-muveszet-amely-visszaadja-a-jovot" }
// publication:        "hvg360"
// publicationCountry: "Hungary"
// language:           "Hungarian"
// date:               "2026-04-02"
// year:               2026
// url:                "https://hvg.hu/360/20260402_a-mu-muveszet-wajukuu-art-collective-kenya-nairobi-documenta"
// excerpt:            "Hungarian cultural magazine hvg360 profiles the Wajukuu Art Collective — covering their Documenta 15 participation, community work in Mukuru, and social impact through art."
// type:               "press"
// featured:           true
