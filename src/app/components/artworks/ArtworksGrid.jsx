'use client';

import { useState } from 'react';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';

// Static map of all supported aspect ratios — prevents Tailwind from purging these classes
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

export default function ArtworksGrid({ artworks }) {
  const [filter, setFilter] = useState('all');

  // Filter artworks
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
    <main className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">

      {/* Filter Buttons + Count */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
        <p className="font-sans text-sm text-slate-500">
          {filteredArtworks.length} {filteredArtworks.length === 1 ? 'Artwork' : 'Artworks'}
        </p>
        <div className="flex gap-6 font-sans text-xs font-bold uppercase tracking-widest text-slate-400">
          <button
            onClick={() => setFilter('all')}
            className={`pb-1 hover:text-teal-700 transition-colors ${
              filter === 'all' ? 'text-slate-900 border-b border-slate-900' : ''
            }`}
          >
            All Work
          </button>
          <button
            onClick={() => setFilter('paintings')}
            className={`hover:text-slate-900 transition-colors ${
              filter === 'paintings' ? 'text-slate-900' : ''
            }`}
          >
            Paintings
          </button>
          <button
            onClick={() => setFilter('mixed')}
            className={`hover:text-slate-900 transition-colors ${
              filter === 'mixed' ? 'text-slate-900' : ''
            }`}
          >
            Mixed Media
          </button>
        </div>
      </div>

      {/* MASONRY GRID */}
      {filteredArtworks.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-slate-400 mb-4">No artworks found.</p>
        </div>
      ) : (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-12 space-y-16">
          {filteredArtworks.map((art) => {
            const artworkSlug = art.slug || art._id;

            return (
              <Link
                key={art._id}
                href={`/artworks/${artworkSlug}`}
                className="break-inside-avoid group cursor-pointer block"
              >
                {/* ARTWORK IMAGE */}
                <div className="relative w-full bg-white shadow-sm overflow-hidden mb-6 group-hover:shadow-xl transition-shadow duration-500">
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
                    <div className={`w-full ${aspectMap[art.aspectRatio] ?? 'aspect-[4/5]'} flex flex-col items-center justify-center bg-slate-200 text-slate-400`}>
                      <svg className="w-16 h-16 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-xs">No Image</span>
                    </div>
                  )}

                  {/* Interactive Overlay */}
                  <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/5 transition-all duration-500 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-white/95 backdrop-blur-sm px-4 py-2 text-xs font-bold uppercase tracking-widest text-slate-900">
                      View Details
                    </div>
                  </div>
                </div>

                {/* GALLERY PLACARD */}
                <div className="flex flex-col gap-1 pr-4">
                  <div className="flex items-baseline justify-between">
                    <h2 className="font-serif text-2xl text-slate-900 group-hover:text-teal-700 transition-colors duration-300">
                      {art.title}
                    </h2>
                    <span className="font-sans text-xs font-bold text-slate-400">
                      {art.year}
                    </span>
                  </div>
                  <p className="font-sans text-sm font-light text-slate-600">
                    {art.medium}
                  </p>
                  {art.dimensions && (
                    <p className="font-sans text-xs font-light tracking-widest text-slate-400 uppercase mt-1">
                      {art.dimensions}
                    </p>
                  )}

                  {/* Short Description */}
                  {art.description && (
                    <p className="font-sans text-sm font-light text-slate-500 mt-2 line-clamp-2">
                      {art.description}
                    </p>
                  )}

                  {/* Availability Badge */}
                  {art.status && (
                    <div className="mt-3 inline-flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        art.status === 'available' ? 'bg-green-500' :
                        art.status === 'sold' ? 'bg-red-500' :
                        art.status === 'private' ? 'bg-blue-500' :
                        'bg-slate-400'
                      }`}></div>
                      <span className="font-sans text-xs text-slate-500 capitalize">
                        {art.status === 'available' ? 'Available' :
                         art.status === 'sold' ? 'Sold' :
                         art.status === 'private' ? 'Private Collection' :
                         art.status === 'nfs' ? 'Not for Sale' :
                         art.status}
                      </span>
                    </div>
                  )}
                </div>

              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}
