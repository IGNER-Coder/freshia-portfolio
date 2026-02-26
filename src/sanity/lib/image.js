import imageUrlBuilder from '@sanity/image-url'
import { client } from './client'

const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}

// Helper to get optimized image URL with transformations
export function getImageUrl(source, options = {}) {
  if (!source) return null
  
  const {
    width = 800,
    height,
    quality = 80,
    fit = 'max',
    auto = 'format',
  } = options

  let imageBuilder = urlFor(source)
    .auto(auto)
    .quality(quality)
    .fit(fit)

  if (width) imageBuilder = imageBuilder.width(width)
  if (height) imageBuilder = imageBuilder.height(height)

  return imageBuilder.url()
}