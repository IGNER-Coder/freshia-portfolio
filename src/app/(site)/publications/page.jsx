// Server component — no "use client" directive
import { client } from '@/sanity/lib/client';
import { ArrowUpRight } from 'lucide-react';

const publicationsQuery = `*[_type == "publication"] | order(date desc) {
  _id,
  title,
  publication,
  publicationCountry,
  language,
  date,
  year,
  url,
  excerpt,
  type,
  featured
}`;

/* ── Type label map ───────────────────────────────────── */
const TYPE_LABEL = {
  press:     'Press Feature',
  catalogue: 'Exhibition Catalogue',
  academic:  'Academic / Research',
  book:      'Book / Editorial Mention',
};

/* ── Fallback seed data ───────────────────────────────── */
const SEED = [
  {
    _id:                'seed-hvg360',
    title:              'A művészet, amely visszaadja a jövőt',
    publication:        'hvg360',
    publicationCountry: 'Hungary',
    language:           'Hungarian',
    date:               '2026-04-02',
    year:               2026,
    url:                'https://hvg.hu/360/20260402_a-mu-muveszet-wajukuu-art-collective-kenya-nairobi-documenta',
    excerpt:            'Hungarian cultural magazine hvg360 profiles the Wajukuu Art Collective — covering their Documenta 15 participation, community work in Mukuru, and social impact through art.',
    type:               'press',
    featured:           true,
  },
];

/* ── Single publication row ──────────────────────────── */
function PublicationRow({ pub }) {
  const year      = pub.year ?? (pub.date ? new Date(pub.date).getFullYear() : '—');
  const typeLabel = TYPE_LABEL[pub.type] ?? pub.type;

  return (
    <div className={`
      grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-6 border-b border-slate-200
      hover:bg-white transition-colors group
      ${pub.featured ? 'bg-teal-50/60' : ''}
    `}>

      {/* Year */}
      <div className="md:col-span-2 font-sans text-sm font-bold text-teal-700 tabular-nums">
        {year}
      </div>

      {/* Publication name + article title */}
      <div className="md:col-span-6">
        <div className="flex items-start gap-3 flex-wrap mb-1">
          <p className="font-serif text-xl text-slate-900 group-hover:text-slate-600 transition-colors">
            {pub.publication}
          </p>
          {pub.featured && (
            <span className="inline-block px-2 py-1 bg-teal-700 text-white text-xs font-bold uppercase tracking-wider shrink-0 self-center">
              Featured
            </span>
          )}
        </div>
        <p className="font-sans text-sm font-light text-slate-600 leading-snug">
          {pub.title}
        </p>
        {pub.excerpt && (
          <p className="font-sans text-xs text-slate-400 mt-2 font-light leading-relaxed line-clamp-2">
            {pub.excerpt}
          </p>
        )}
      </div>

      {/* Country + language + type + link */}
      <div className="md:col-span-4 flex flex-col items-start md:items-end gap-2 font-sans text-sm font-light text-slate-500">
        {(pub.publicationCountry || pub.language) && (
          <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">
            {[pub.language, pub.publicationCountry].filter(Boolean).join(' · ')}
          </p>
        )}
        {typeLabel && (
          <p className="text-xs text-slate-400">{typeLabel}</p>
        )}
        {pub.url && (
          <a
            href={pub.url}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-1 mt-1
              font-sans text-[11px] font-bold uppercase tracking-widest
              text-teal-700 hover:text-teal-900
              transition-colors duration-200 group/link
            "
          >
            Read article
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </div>
  );
}

/* ── Main page ────────────────────────────────────────── */
export default async function PublicationsPage() {
  let publications = [];
  try {
    publications = await client.fetch(publicationsQuery, {}, {
      next: { revalidate: 3600 }
    });
  } catch (_) {
    // Silently fall through to seed data if Sanity is unreachable
  }

  const data = publications?.length ? publications : SEED;

  /* Group by year — newest first */
  const byYear = data.reduce((acc, pub) => {
    const y = pub.year ?? (pub.date ? new Date(pub.date).getFullYear() : 'Undated');
    if (!acc[y]) acc[y] = [];
    acc[y].push(pub);
    return acc;
  }, {});

  const years = Object.keys(byYear).sort((a, b) => b - a);

  const total = data.length;

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-900 selection:bg-teal-700 selection:text-white pb-32">

      {/* MASTHEAD */}
      <header className="px-6 pt-20 pb-12 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-slate-900/10 pb-12">
          <div>
            <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-teal-700 mb-6">
              Vol. 04 — Press
            </p>
            <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none">
              Press.
            </h1>
          </div>
          <p className="font-sans text-xs text-slate-400 tracking-widest uppercase self-end">
            {total} {total === 1 ? 'entry' : 'entries'} in the archive
          </p>
        </div>
      </header>

      {/* PUBLICATIONS — grouped by year */}
      <main className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
        {years.map((year) => (
          <section key={year} className="mb-16">

            {/* Year header */}
            <div className="flex items-center gap-6 mb-4 mt-8">
              <span className="font-serif text-4xl md:text-5xl text-slate-900/10 font-bold select-none leading-none">
                {year}
              </span>
              <div className="flex-1 h-px bg-slate-900/8" />
            </div>

            {/* Rows */}
            <div className="flex flex-col">
              {byYear[year].map((pub) => (
                <PublicationRow key={pub._id} pub={pub} />
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
