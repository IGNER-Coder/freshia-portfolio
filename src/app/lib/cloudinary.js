// src/app/lib/cloudinary.js

export const cloudinaryConfig = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
}

/**
 * Generate Cloudinary URL with transformations
 * @param {string} publicId - The public ID of the image in Cloudinary
 * @param {object} options - Transformation options
 * @returns {string} - Optimized Cloudinary URL
 */
export function getCloudinaryUrl(publicId, options = {}) {
  const {
    width = 'auto',
    height = 'auto',
    crop = 'fill',
    gravity = 'auto',
    quality = 'auto',
    format = 'auto',
    blur = 0,
  } = options

  if (!cloudinaryConfig.cloudName) {
    console.error('Cloudinary cloud name not configured')
    return ''
  }

  let transformations = `w_${width},h_${height},c_${crop},g_${gravity},q_${quality},f_${format}`
  
  if (blur > 0) {
    transformations += `,e_blur:${blur}`
  }

  return `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/upload/${transformations}/${publicId}`
}