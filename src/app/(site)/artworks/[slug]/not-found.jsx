import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="font-serif text-6xl md:text-8xl font-bold text-slate-900 mb-6">
          404
        </h1>
        <p className="font-sans text-xl text-slate-600 mb-8">
          Artwork not found
        </p>
        <Link 
          href="/artworks"
          className="inline-block px-8 py-3 bg-teal-700 text-white font-sans text-xs font-bold uppercase tracking-widest hover:bg-slate-900 transition-colors"
        >
          Back to Gallery
        </Link>
      </div>
    </div>
  );
}