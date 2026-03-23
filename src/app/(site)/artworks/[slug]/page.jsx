import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { notFound } from 'next/navigation';
import InquiryModal from '../../../components/artworks/InquiryModal';

// Get single artwork by slug
async function getArtwork(slug) {
  const query = `*[_type == "artwork" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    year,
    medium,
    dimensions,
    dimensionsObject,
    mainImage,
    gallery[],
    description,
    longDescription,
    status,
    price,
    tags,
    framing
  }`;
  
  return await client.fetch(query, { slug });
}

// Get related artworks
async function getRelatedArtworks(currentId, tags) {
  const query = `*[_type == "artwork" && _id != $currentId && count((tags[])[@ in $tags]) > 0][0...3] {
    _id,
    title,
    "slug": slug.current,
    mainImage,
    year
  }`;
  
  return await client.fetch(query, { currentId, tags: tags || [] });
}

export default async function ArtworkDetailPage({ params }) {
  const { slug } = await params;
  const artwork = await getArtwork(slug);
  
  if (!artwork) {
    notFound();
  }
  
  const relatedWorks = await getRelatedArtworks(artwork._id, artwork.tags);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-900 selection:bg-teal-700 selection:text-white pb-32">
      
      {/* BREADCRUMB */}
      <div className="px-6 pt-8 pb-4 md:px-16 lg:px-24 border-b border-slate-900/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 font-sans text-xs font-bold uppercase tracking-widest text-slate-400">
            <Link href="/artworks" className="hover:text-teal-700 transition-colors">
              Gallery
            </Link>
            <span>/</span>
            <span className="text-slate-900">{artwork.title}</span>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 pt-12 md:pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* LEFT: Image */}
          <div className="lg:col-span-7">
            <div className="sticky top-24">
              <div className="w-full aspect-[4/5] bg-white p-3 shadow-md">
                {artwork.mainImage ? (
                  <img
                    src={urlFor(artwork.mainImage)
                      .width(1200)
                      .quality(90)
                      .auto('format')
                      .url()}
                    alt={artwork.title}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400">
                    No Image Available
                  </div>
                )}
              </div>

              {/* Dimensions */}
              {artwork.dimensionsObject && (
                <div className="mt-6 px-3 py-3 bg-slate-100/50 border border-slate-200/50">
                  <p className="font-sans text-xs text-slate-600 mb-1">
                    <span className="font-bold">Actual Size:</span> {artwork.dimensionsObject.width} x {artwork.dimensionsObject.height} cm
                  </p>
                  <p className="font-sans text-xs text-slate-500">
                    (Approximately {Math.round(artwork.dimensionsObject.width / 2.54)} x {Math.round(artwork.dimensionsObject.height / 2.54)} inches)
                  </p>
                </div>
              )}

              {/* Gallery Images */}
              {artwork.gallery && artwork.gallery.length > 0 && (
                <div className="mt-8 grid grid-cols-3 gap-4">
                  {artwork.gallery.map((image, index) => (
                    <div key={index} className="aspect-square bg-white p-2 shadow-sm">
                      <img
                        src={urlFor(image).width(400).height(400).quality(85).auto('format').url()}
                        alt={`${artwork.title} - View ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Details */}
          <div className="lg:col-span-5 flex flex-col gap-12 pt-4">
            
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="font-sans text-xs font-bold uppercase tracking-widest text-slate-400">
                  {artwork.year}
                </span>
                <span className="h-1 w-1 rounded-full bg-slate-300" />
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    artwork.status === 'available' ? 'bg-green-500' : 
                    artwork.status === 'sold' ? 'bg-red-500' : 
                    'bg-slate-400'
                  }`}></div>
                  <span className={`font-sans text-xs font-bold uppercase tracking-widest ${
                    artwork.status === 'available' ? 'text-teal-700' : 'text-slate-400'
                  }`}>
                    {artwork.status === 'available' ? 'Available' :
                     artwork.status === 'sold' ? 'Sold' :
                     artwork.status === 'private' ? 'Private Collection' :
                     'Not for Sale'}
                  </span>
                </div>
              </div>
              
              <h1 className="font-serif text-5xl md:text-6xl font-bold leading-tight mb-6">
                {artwork.title}
              </h1>
              
              <div className="flex flex-col gap-2 font-sans text-sm font-light uppercase tracking-widest text-slate-500 pb-8 border-b border-slate-900/10">
                <p>{artwork.medium}</p>
                <p>{artwork.dimensions}</p>
                {artwork.framing && <p className="text-xs text-slate-400">{artwork.framing}</p>}
              </div>
            </div>

            {artwork.description && (
              <div className="font-sans text-base text-slate-600 font-light leading-relaxed">
                <p>{artwork.description}</p>
              </div>
            )}

            {artwork.tags && artwork.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {artwork.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-sans uppercase tracking-wider">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="border-t border-slate-900/10 pt-8">
              <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
                Additional Details
              </h3>
              <div className="space-y-2 font-sans text-sm text-slate-600">
                <p>✓ Certificate of authenticity included</p>
                <p>✓ Signed and dated on reverse</p>
                <p>✓ Ships carefully packaged and insured</p>
                {artwork.price && <p>✓ Price: {artwork.price}</p>}
              </div>
            </div>

            <div className="pt-4">
              <InquiryModal artwork={artwork} />
            </div>

          </div>
        </div>

        {/* RELATED WORKS */}
        {relatedWorks && relatedWorks.length > 0 && (
          <section className="mt-32 border-t-2 border-slate-900/10 pt-20">
            <div className="flex items-baseline justify-between mb-12">
              <h2 className="font-serif text-4xl md:text-5xl">You May Also Like</h2>
              <Link 
                href="/artworks"
                className="font-sans text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-teal-700 transition-colors"
              >
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {relatedWorks.map(work => (
                <Link 
                  key={work._id} 
                  href={`/artworks/${work.slug}`}
                  className="group"
                >
                  <div className="aspect-[4/5] bg-white p-2 shadow-sm mb-4 overflow-hidden">
                    {work.mainImage ? (
                      <img
                        src={urlFor(work.mainImage).width(600).height(750).quality(85).auto('format').url()}
                        alt={work.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400">
                        No Image
                      </div>
                    )}
                  </div>
                  <h3 className="font-serif text-xl text-slate-900 group-hover:text-teal-700 transition-colors">
                    {work.title}
                  </h3>
                  <p className="font-sans text-xs text-slate-400 mt-1">{work.year}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* BACK TO GALLERY */}
        <div className="mt-20 text-center">
          <Link 
            href="/artworks"
            className="inline-flex items-center gap-3 px-8 py-3 border-2 border-slate-900 text-sm font-bold uppercase tracking-widest text-slate-900 hover:bg-slate-900 hover:text-white transition-all duration-300"
          >
            ← Back to Gallery
          </Link>
        </div>
      </main>

    </div>
  );
}