// sanity/schemaTypes/artwork.js

export default {
  name: 'artwork',
  title: 'Artwork',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'cloudinaryId',
      title: 'Cloudinary Image ID',
      type: 'string',
      description: 'Paste the Cloudinary Public ID here',
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Available', value: 'Available' },
          { title: 'Sold', value: 'Sold' },
        ],
        layout: 'radio',
      },
      initialValue: 'Available',
    },
    { name: 'year', title: 'Year Created', type: 'string' },
    { name: 'medium', title: 'Medium', type: 'string' },
    { name: 'size', title: 'Size (Text)', type: 'string' },
    { name: 'price', title: 'Price', type: 'string', initialValue: 'Available upon request' },
    { name: 'description', title: 'Short Description', type: 'text', rows: 3 },
    { name: 'longDescription', title: 'Long Description', type: 'text' },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }
  ],
  preview: {
    select: { title: 'title', subtitle: 'status' },
  },
};