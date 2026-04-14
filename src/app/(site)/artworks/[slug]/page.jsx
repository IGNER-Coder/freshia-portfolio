import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { notFound } from 'next/navigation';
import InquiryModal from '../../../components/artworks/InquiryModal';

/* ── Sanity queries ─────────────────────────────────── */
async function getArtwork(slug) {
  return client.fetch(
    `*[_type == "artwork" && slug.current == $slug][0] {
      _id, title, "slug": slug.current,
      year, medium, dimensions, dimensionsObject,
      mainImage, gallery[], description, longDescription,
      status, price, tags, framing
    }`,
    { slug }
  );
}

async function getRelatedArtworks(currentId, year) {
  return client.fetch(
    `*[_type == "artwork" && _id != $currentId && year == $year][0...3] {
      _id, title, "slug": slug.current, mainImage, year, status
    }`,
    { currentId, year }
  );
}

/* ── Status label ───────────────────────────────────── */
const STATUS_MAP = {
  available: { dot: 'bg-emerald-500', label: 'Available',          color: 'text-teal-700' },
  sold:      { dot: 'bg-rose-400',    label: 'Sold',               color: 'text-slate-400' },
  private:   { dot: 'bg-sky-400',     label: 'Private Collection', color: 'text-slate-400' },
  nfs:       { dot: 'bg-slate-300',   label: 'Not for Sale',       color: 'text-slate-400' },
};

/* ── Page ───────────────────────────────────────────── */
export default async function ArtworkDetailPage({ params }) {
  const { slug } = await params;
  const artwork  = await getArtwork(slug);
  if (!artwork) notFound();

  const related = await getRelatedArtworks(artwork._id, artwork.year);
  const status  = STATUS_MAP[artwork.status] ?? STATUS_MAP.nfs;

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-900 selection:bg-teal-700 selection:text-white">

      {/* ── Breadcrumb ───────────────────────────────── */}
      <div className="px-5 sm:px-8 md:px-16 lg:px-24 py-4 border-b border-slate-900/8">
        <div className="max-w-7xl mx-auto flex items-center gap-3 font-sans text-[11px] font-bold uppercase tracking-widest text-slate-400">
          <Link href="/artworks" className="hover:text-teal-700 transition-colors duration-200">
            Gallery
          </Link>
          <span className="text-slate-200">/</span>
          <span className="text-slate-900 truncate max-w-[200px]">{artwork.title}</span>
        </div>
      </div>

      {/* ── Main content ─────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-5 sm:px-8 md:px-16 lg:px-24 pt-10 md:pt-16 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

          {/* ── Left: image ─────────────────────────── */}
          <div className="lg:col-span-7 lg:sticky lg:top-24">
            {artwork.mainImage ? (
              <img
                src={urlFor(artwork.mainImage)
                  .width(1400)
                  .quality(90)
                  .auto('format')
                  .url()}
                alt={artwork.mainImage?.alt || artwork.title}
                className="w-full h-auto block shadow-lg"
              />
            ) : (
              <div className="aspect-[4/5] bg-slate-100 flex items-center justify-center text-slate-300 text-sm tracking-wider uppercase">
                No Image
              </div>
            )}

            {/* Actual size note */}
            {artwork.dimensionsObject && (
              <p className="mt-3 font-sans text-xs text-slate-400 tracking-wider">
                {artwork.dimensionsObject.width} × {artwork.dimensionsObject.height} cm
                &nbsp;·&nbsp;
                {Math.round(artwork.dimensionsObject.width / 2.54)} × {Math.round(artwork.dimensionsObject.height / 2.54)} in
              </p>
            )}

            {/* Additional gallery images */}
            {artwork.gallery?.length > 0 && (
              <div className="mt-6 grid grid-cols-3 gap-3">
                {artwork.gallery.map((img, i) => (
                  <img
                    key={i}
                    src={urlFor(img).width(400).quality(80).auto('format').url()}
                    alt={img.caption || `${artwork.title} — detail ${i + 1}`}
                    className="w-full h-auto block object-cover shadow-sm"
                  />
                ))}
              </div>
            )}
          </div>

          {/* ── Right: metadata ──────────────────────── */}
          <div className="lg:col-span-5 flex flex-col gap-10 pt-2">

            {/* Year + status */}
            <div className="flex items-center gap-4">
              <span className="font-sans text-xs font-bold uppercase tracking-widest text-slate-400 tabular-nums">
                {artwork.year}
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-200" />
              <span className={`inline-flex items-center gap-1.5 font-sans text-xs font-bold uppercase tracking-widest ${status.color}`}>
                <span className={`w-2 h-2 rounded-full ${status.dot}`} />
                {status.label}
              </span>
            </div>

            {/* Title */}
            <div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
                {artwork.title}
              </h1>

              {/* Medium + dimensions */}
              <div className="flex flex-col gap-1.5 pb-8 border-b border-slate-900/8 font-sans text-sm font-light text-slate-500 uppercase tracking-widest">
                <p>{artwork.medium}</p>
                {artwork.dimensions && <p>{artwork.dimensions}</p>}
                {artwork.framing   && <p className="text-xs text-slate-400">{artwork.framing}</p>}
              </div>
            </div>

            {/* Description */}
            {artwork.description && (
              <p className="font-sans text-base text-slate-600 font-light leading-relaxed">
                {artwork.description}
              </p>
            )}

            {/* Tags */}
            {artwork.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {artwork.tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-slate-100 text-slate-500 text-[11px] font-sans uppercase tracking-wider">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Provenance details */}
            <div className="border-t border-slate-900/8 pt-8">
              <p className="font-sans text-[10px] font-bold uppercase tracking-widest text-slate-300 mb-4">
                Provenance
              </p>
              <ul className="space-y-2 font-sans text-sm text-slate-500 font-light">
                <li>Certificate of authenticity included</li>
                <li>Signed and dated on reverse</li>
                <li>Ships carefully packaged and insured</li>
                {artwork.price && <li>Price: {artwork.price}</li>}
              </ul>
            </div>

            {/* Enquiry CTA — available works only */}
            <div className="pt-2">
              {artwork.status === 'available' ? (
                <InquiryModal artwork={artwork} />
              ) : (
                <div className="border border-slate-200 px-6 py-5 bg-slate-50/60">
                  <p className="font-sans text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">
                    {artwork.status === 'sold'    && 'This work has been sold'}
                    {artwork.status === 'private' && 'Private Collection'}
                    {artwork.status === 'nfs'     && 'Not available for sale'}
                    {!['sold','private','nfs'].includes(artwork.status) && 'Unavailable'}
                  </p>
                  <p className="font-sans text-sm font-light text-slate-500 leading-relaxed">
                    This piece is no longer available. You are welcome to{' '}
                    <Link href="/contact" className="underline underline-offset-2 hover:text-teal-700 transition-colors duration-200">
                      contact the studio
                    </Link>{' '}
                    to learn about similar works or upcoming pieces.
                  </p>
                </div>
              )}
            </div>

            {/* Back link */}
            <Link
              href="/artworks"
              className="inline-flex items-center gap-2 font-sans text-[11px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors duration-200 group"
            >
              <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              Back to Gallery
            </Link>
          </div>
        </div>

        {/* ── Related works ────────────────────────────── */}
        {related?.length > 0 && (
          <section className="mt-32 border-t border-slate-900/8 pt-16">
            <div className="flex items-baseline justify-between mb-10">
              <h2 className="font-serif text-3xl md:text-4xl text-slate-900">
                Also from {artwork.year}
              </h2>
              <Link href="/artworks" className="font-sans text-[11px] font-bold uppercase tracking-widest text-slate-400 hover:text-teal-700 transition-colors">
                View all →
              </Link>
            </div>

            <div className="columns-2 md:columns-3 gap-6 md:gap-10">
              {related.map((work) => (
                <div key={work._id} className="break-inside-avoid mb-8 group">
                  <Link href={`/artworks/${work.slug}`} className="block overflow-hidden mb-3">
                    {work.mainImage ? (
                      <img
                        src={urlFor(work.mainImage).width(600).quality(85).auto('format').url()}
                        alt={work.title}
                        className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                    ) : (
                      <div className="aspect-[4/5] bg-slate-100" />
                    )}
                  </Link>
                  <Link href={`/artworks/${work.slug}`}>
                    <h3 className="font-serif text-lg text-slate-900 group-hover:text-teal-700 transition-colors leading-snug">
                      {work.title}
                    </h3>
                  </Link>
                  <p className="font-sans text-xs text-slate-400 mt-0.5 tabular-nums">{work.year}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
