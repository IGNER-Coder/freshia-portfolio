import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: '445b2u6r',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true, // Set to false if you want to ensure fresh data
})

// For client-side usage
export const clientConfig = {
  projectId: '445b2u6r',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
}