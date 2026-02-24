"use client";

import Link from 'next/link';
import { CldImage } from 'next-cloudinary';
import { useState } from 'react';

const artworks = [
  { 
    id: 1, 
    title: 'Echoes in the Void', 
    year: '2025', 
    medium: 'Acrylic & Cold Wax on Canvas', 
    size: '120 x 150 cm', 
    aspect: 'aspect-[4/5]',
    cloudinaryId: 'homepage-background_jabt7w'
  },
  { 
    id: 2, 
    title: 'Urban Memory', 
    year: '2025', 
    medium: 'Mixed Media', 
    size: '90 x 90 cm', 
    aspect: 'aspect-square',
    cloudinaryId: 'IMG-20250323-WA0003_odpeoj'
  },
  { 
    id: 3, 
    title: 'Silent Language', 
    year: '2024', 
    medium: 'Oil on Board', 
    size: '150 x 100 cm', 
    aspect: 'aspect-[3/2]',
    cloudinaryId: 'IMG_9581_qrcdfi'
  }, 
  { 
    id: 4, 
    title: 'Nairobi Blues', 
    year: '2026', 
    medium: 'Acrylic on Canvas', 
    size: '100 x 120 cm', 
    aspect: 'aspect-[5/6]',
    cloudinaryId: 'IMG_5801_gkh3yc'
  },
  { 
    id: 5, 
    title: 'The Weight of Grey', 
    year: '2024', 
    medium: 'Mixed Media', 
    size: '80 x 100 cm', 
    aspect: 'aspect-[4/5]',
    cloudinaryId: 'IMG_5801_gkh3yc'
  },
  { 
    id: 6, 
    title: 'Fragments', 
    year: '2025', 
    medium: 'Charcoal & Acrylic', 
    size: '60 x 60 cm', 
    aspect: 'aspect-square',
    cloudinaryId: 'IMG_5801_gkh3yc'
  },
];

export default function ArtworksPage() {
  const [filter, setFilter] = useState('all');

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-900 selection:bg-teal-700 selection:text-white pb-32">
      
      {/* MASTHEAD */}
      <header className="px-6 pt-20 pb-12 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-slate-900/10 pb-12">
          <div>
            <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-teal-700 mb-6">
              Vol. 03 — The Archive
            </p>
            <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none">
              Gallery.
            </h1>
          </div>
          
          {/* Filter Buttons */}
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

        {/* Count + Sort */}
        <div className="max-w-7xl mx-auto flex items-center justify-between mt-8 px-0">
          <p className="font-sans text-sm text-slate-500">
            {artworks.length} {artworks.length === 1 ? 'Artwork' : 'Artworks'}
          </p>
          <button className="font-sans text-xs uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors flex items-center gap-2">
            Sort: Newest
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </header>

      {/* MASONRY GRID */}
      <main className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 pt-12">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-12 space-y-16">
          
          {artworks.map((art) => (
            <Link 
              key={art.id} 
              href={`/artworks/${art.id}`}
              className="break-inside-avoid group cursor-pointer block"
            >
              
              {/* ARTWORK IMAGE */}
              <div className={`relative w-full ${art.aspect} bg-white shadow-sm overflow-hidden mb-6 group-hover:shadow-xl transition-shadow duration-500`}>
                
                <CldImage
                  src={art.cloudinaryId}
                  alt={art.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                
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
                <p className="font-sans text-xs font-light tracking-widest text-slate-400 uppercase mt-1">
                  {art.size}
                </p>
                
                {/* Availability Badge */}
                <div className="mt-3 inline-flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="font-sans text-xs text-slate-500">Available</span>
                </div>
              </div>

            </Link>
          ))}

        </div>
      </main>

      {/* LOAD MORE (Optional) */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 mt-20 text-center">
        <button className="px-8 py-3 border-2 border-slate-900 text-sm font-bold uppercase tracking-widest text-slate-900 hover:bg-slate-900 hover:text-white transition-all duration-300">
          Load More Artworks
        </button>
      </div>

    </div>
  );
}