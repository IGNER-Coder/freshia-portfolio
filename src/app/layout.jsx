import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://freshianjeri.com'),
  title: {
    default: 'Freshia Njeri | Visual Artist, Nairobi',
    template: '%s | Freshia Njeri'
  },
  description: 'Self-taught visual artist and educator. Documenta 15 participant with Wajukuu Arts Collective. Mixed media and acrylic paintings based in Nairobi, Kenya.',
  keywords: ['visual artist', 'Nairobi artist', 'contemporary art', 'mixed media', 'acrylic painting', 'Kenyan artist', 'Wajukuu Arts', 'Documenta 15', 'abstract art', 'self-taught artist'],
  authors: [{ name: 'Freshia Njeri' }],
  creator: 'Freshia Njeri',
  publisher: 'Freshia Njeri',
  
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://freshianjeri.com',
    title: 'Freshia Njeri | Visual Artist, Nairobi',
    description: 'Self-taught visual artist and educator. Documenta 15 participant with Wajukuu Arts Collective.',
    siteName: 'Freshia Njeri Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Freshia Njeri - Visual Artist',
      }
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Freshia Njeri | Visual Artist, Nairobi',
    description: 'Self-taught visual artist and educator. Documenta 15 participant with Wajukuu Arts Collective.',
    images: ['/og-image.jpg'],
    creator: '@freshianjeri',
  },
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  verification: {
    google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}