'use client';

import { useState } from 'react';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';

// Static aspect ratio map — prevents Tailwind purging in production
const aspectMap = {
  '1/1':  'aspect-[1/1]',
  '4/3':  'aspect-[4/3]',
  '3/4':  'aspect-[3/4]',
  '4/5':  'aspect-[4/5]',
  '16/9': 'aspect-[16/9]',
  '9/16': 'aspect-[9/16]',
  '3/2':  'aspect-[3/2]',
  '2/3':  'aspect-[2/3]',
};

const filters = [
  { key: 'all', label: 'All Work' },
  { key: 'paintings', label: 'Paintings' },
  { key: 'mixed', label: 'Mixed Media' },
];

export default function ArtworksGrid({ artworks }) {
  const [filter, setFilter] = useState('all');

  const filteredArtworks = artworks.filter(art => {
    if (filter === 'all') return true;
    if (filter === 'paintings') {
      return art.medium?.toLowerCase().includes('painting') ||
             art.medium?.toLowerCase().includes('acrylic') ||
             art.medium?.toLowerCase().includes('oil');
    }
    if (filter === 'mixed') {
      return art.medium?.toLowerCase().includes('mixed');
    }
    return true;
  });

  return (
    <main className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 pb-24">

      {/* Filter bar + count */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12">
        <p className="font-sans text-sm text-slate-400">
          {filteredArtworks.length} {filteredArtworks.length === 1 ? 'work' : 'works'}
        </p>

        {/* Filter buttons — clear active state */}
        <div className="flex gap-1 bg-slate-100 p-1 rounded-sm w-fit">
          {filters.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-200 rounded-sm ${
                filter === key
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filteredArtworks.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-slate-400 text-sm">No works found in this category.</p>
        </div>
      ) : (
        // 2-col on mobile, 3-col on desktop — much better for browsing on phone
        <div className="columns-2 md:columns-2 lg:columns-3 gap-6 md:gap-12">
          {filteredArtworks.map((art) => {
            const artworkSlug = art.slug || art._id;
            const isAvailable = art.status === 'available';

            return (
              <div
                key={art._id}
                className="break-inside-avoid mb-6 md:mb-12 group"
              >
                {/* Image */}
                <Link
                  href={`/artworks/${artworkSlug}`}
                  className="block relative w-full bg-white shadow-sm overflow-hidden mb-3 md:mb-4 group-hover:shadow-xl transition-shadow duration-500"
                >
                  {art.mainImage ? (
                    <img
                      src={urlFor(art.mainImage)
                        .width(800)
                        .quality(85)
                        .auto('format')
                        .url()}
                      alt={art.title}
                      className="w-full h-auto block transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className={`w-full ${aspectMap[art.aspectRatio] ?? 'aspect-[4/5]'} flex flex-col items-center justify-center bg-slate-100 text-slate-400`}>
                      <svg className="w-10 h-10 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-xs">No Image</span>
                    </div>
                  )}

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-all duration-500 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/95 backdrop-blur-sm px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-slate-900">
                      View
                    </div>
                  </div>
                </Link>

                {/* Placard */}
                <div className="flex flex-col gap-0.5 pr-2">
                  <div className="flex items-baseline justify-between gap-2">
                    <h2 className="font-serif text-base md:text-xl text-slate-900 group-hover:text-teal-700 transition-colors duration-300 leading-tight">
                      {art.title}
                    </h2>
                    <span className="font-sans text-xs font-bold text-slate-400 shrink-0">
                      {art.year}
                    </span>
                  </div>

                  <p className="font-sans text-xs md:text-sm font-light text-slate-500">
                    {art.medium}
                  </p>

                  {art.dimensions && (
                    <p className="font-sans text-xs font-light tracking-widest text-slate-400 uppercase hidden md:block">
                      {art.dimensions}
                    </p>
                  )}

                  {/* Status + enquiry */}
                  {art.status && (
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <div className="inline-flex items-center gap-1.5">
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          isAvailable ? 'bg-green-500' :
                          art.status === 'sold' ? 'bg-red-400' :
                          art.status === 'private' ? 'bg-blue-400' :
                          'bg-slate-300'
                        }`} />
                        <span className="font-sans text-xs text-slate-500">
                          {isAvailable ? 'Available' :
                           art.status === 'sold' ? 'Sold' :
                           art.status === 'private' ? 'Private Collection' :
                           art.status === 'nfs' ? 'Not for Sale' :
                           art.status}
                        </span>
                      </div>

                      {/* Enquire CTA — only on available pieces */}
                      {isAvailable && (
                        <Link
                          href={`/contact?artwork=${encodeURIComponent(art.title)}`}
                          className="text-xs font-bold text-teal-700 hover:text-teal-900 uppercase tracking-wider transition-colors underline underline-offset-2"
                          onClick={e => e.stopPropagation()}
                        >
                          Enquire
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
