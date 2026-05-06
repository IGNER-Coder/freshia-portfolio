import { ArrowUpRight } from 'lucide-react';

/* ── Fallback seed data ───────────────────────────────── */
const SEED_PUBLICATIONS = [
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

/* ── Type label map ───────────────────────────────────── */
const TYPE_LABEL = {
  press:     'Press Feature',
  catalogue: 'Exhibition Catalogue',
  academic:  'Academic / Research',
  book:      'Book / Editorial Mention',
};

/* ── Single publication row ──────────────────────────── */
function PublicationRow({ pub }) {
  const year    = pub.year ?? (pub.date ? new Date(pub.date).getFullYear() : '—');
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
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
          </a>
        )}
      </div>
    </div>
  );
}

/* ── Main component ───────────────────────────────────── */
export default function PublicationsList({ publications }) {
  const data = publications?.length ? publications : SEED_PUBLICATIONS;

  return (
    <section className="mb-32">
      <div className="flex items-baseline justify-between mb-12 border-b-2 border-slate-900/20 pb-4">
        <h3 className="font-serif text-4xl md:text-5xl">Press &amp; Publications</h3>
        <span className="font-sans text-xs uppercase tracking-widest text-slate-400">Archive</span>
      </div>

      <div className="flex flex-col">
        {data.map((pub) => (
          <PublicationRow key={pub._id} pub={pub} />
        ))}
      </div>
    </section>
  );
}
