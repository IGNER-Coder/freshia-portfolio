// Server component — no "use client" directive
import { client } from '@/sanity/lib/client';
import ArtworksGrid from '../../components/artworks/ArtworksGrid';

const artworksQuery = `*[_type == "artwork"] | order(year desc, _createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  year,
  medium,
  dimensions,
  mainImage,
  status,
  tags,
  aspectRatio,
  description
}`;

export const metadata = {
  title: 'Gallery',
  description: 'Browse the complete works of Freshia Njeri — mixed media and acrylic paintings from Nairobi, Kenya.',
};

export default async function ArtworksPage() {
  const artworks = await client.fetch(artworksQuery, {}, {
    next: { revalidate: 3600 } // ISR: revalidate every hour
  });

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-900 selection:bg-teal-700 selection:text-white pb-32">

      {/* MASTHEAD */}
      <header className="px-6 pt-20 pb-12 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-slate-900/10 pb-12">
          <div>
            <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-teal-700 mb-6">
              Vol. 02 — The Archive
            </p>
            <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none">
              Gallery.
            </h1>
          </div>

          {/* ArtworksGrid handles the filter buttons (client-side interactivity) */}
        </div>
      </header>

      {/* ARTWORKS GRID — client component handles filtering and rendering */}
      <ArtworksGrid artworks={artworks} />

    </div>
  );
}
