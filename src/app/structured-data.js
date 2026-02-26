// Add this to your homepage component
export function generateJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Freshia Njeri',
    url: 'https://freshianjeri.com',
    jobTitle: 'Visual Artist',
    worksFor: {
      '@type': 'Organization',
      name: 'Wajukuu Arts Collective',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Nairobi',
      addressCountry: 'Kenya',
    },
    sameAs: [
      'https://instagram.com/freshianjeri',
      'https://linkedin.com/in/freshianjeri',
    ],
    knowsAbout: ['Visual Arts', 'Contemporary Art', 'Mixed Media', 'Acrylic Painting'],
    award: 'Documenta 15 Participant',
  };
}

// Usage in component:
// <script
//   type="application/ld+json"
//   dangerouslySetInnerHTML={{ __html: JSON.stringify(generateJsonLd()) }}
// />