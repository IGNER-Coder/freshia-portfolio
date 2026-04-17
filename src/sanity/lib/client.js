import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '445b2u6r',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true, // Set to false if you want to ensure fresh data
})

// For client-side usage
export const clientConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '445b2u6r',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
}