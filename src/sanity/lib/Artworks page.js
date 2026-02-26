"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { client } from './client';
import { urlFor } from './image';

// GROQ query to fetch all artworks
const artworksQuery = `*[_type == "artwork"] | order(year desc, _createdAt desc) {
  _id,
  title,
  slug,
  year,
  medium,
  dimensions,
  mainImage,
  status,
  tags
}`;

export default function ArtworksPage() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  // Fetch artworks from Sanity
  useEffect(() => {
    async function fetchArtworks() {
      try {
        const data = await client.fetch(artworksQuery);
        setArtworks(data);
      } catch (error) {
        console.error('Error fetching artworks:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchArtworks();
  }, []);

  // Filter artworks
  const filteredArtworks = artworks.filter(art => {
    if (filter === 'all') return true;
    if (filter === 'paintings') return art.medium?.toLowerCase().includes('painting') || art.medium?.toLowerCase().includes('acrylic') || art.medium?.toLowerCase().includes('oil');
    if (filter === 'mixed') return art.medium?.toLowerCase().includes('mixed');
    return true;
  });

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

        {/* Count + Status */}
        <div className="max-w-7xl mx-auto flex items-center justify-between mt-8 px-0">
          <p className="font-sans text-sm text-slate-500">
            {loading ? 'Loading...' : `${filteredArtworks.length} ${filteredArtworks.length === 1 ? 'Artwork' : 'Artworks'}`}
          </p>
        </div>
      </header>

      {/* MASONRY GRID */}
      <main className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 pt-12">
        {loading ? (
          <div className="text-center py-20">
            <p className="text-slate-400">Loading artworks...</p>
          </div>
        ) : filteredArtworks.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-400">No artworks found. Add some in the studio!</p>
            <Link 
              href="/studio"
              className="inline-block mt-4 text-teal-700 hover:text-slate-900 transition-colors underline"
            >
              Go to Studio →
            </Link>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-12 space-y-16">
            
            {filteredArtworks.map((art) => (
              <Link 
                key={art._id} 
                href={`/artworks/${art.slug?.current || art._id}`}
                className="break-inside-avoid group cursor-pointer block"
              >
                
                {/* ARTWORK IMAGE */}
                <div className="relative w-full aspect-[4/5] bg-white shadow-sm overflow-hidden mb-6 group-hover:shadow-xl transition-shadow duration-500">
                  
                  {art.mainImage ? (
                    <img
                      src={urlFor(art.mainImage)
                        .width(800)
                        .height(1000)
                        .fit('max')
                        .auto('format')
                        .url()}
                      alt={art.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400">
                      No Image
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
                  
                  {/* Availability Badge */}
                  {art.status && (
                    <div className="mt-3 inline-flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        art.status === 'available' ? 'bg-green-500' :
                        art.status === 'sold' ? 'bg-red-500' :
                        'bg-slate-400'
                      }`}></div>
                      <span className="font-sans text-xs text-slate-500 capitalize">{art.status}</span>
                    </div>
                  )}
                </div>

              </Link>
            ))}

          </div>
        )}
      </main>

    </div>
  );
}