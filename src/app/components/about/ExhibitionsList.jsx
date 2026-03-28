export default function ExhibitionsList() {
  const exhibitions = [
    {
      year: '2022',
      title: 'Documenta 15',
      venue: 'Kassel, Germany',
      href: 'https://documenta-fifteen.de',
      featured: true,
      note: 'Wajukuu Arts Collective · International group exhibition',
    },
    {
      year: '2026',
      title: 'Wajukuu Annual Showcase',
      venue: 'Nairobi, Kenya',
      href: 'https://wajukuuartsproject.org',
    },
    {
      year: '2025',
      title: 'Image in Our Heads',
      venue: 'Royal Danish Embassy & Wajukuu',
      href: 'https://wajukuuartsproject.org',
    },
    {
      year: '2025',
      title: 'Echoes of the City',
      venue: 'Nairobi National Museum',
      href: 'https://museums.or.ke',
    },
    {
      year: '2024',
      title: 'Before Our Home Goes Down',
      venue: 'Wajukuu Arts Collective',
      href: 'https://wajukuuartsproject.org',
    },
    {
      year: '2024',
      title: 'Abstract Identities',
      venue: 'Circle Art Gallery',
      href: 'https://circleartgallery.com',
    },
  ]

  return (
    <section className="mb-16">
      <div className="flex items-baseline justify-between mb-12 border-b-2 border-slate-900/20 pb-4">
        <h3 className="font-serif text-4xl md:text-5xl">Recognition & Exhibitions</h3>
        <span className="font-sans text-xs uppercase tracking-widest text-slate-400">Archive</span>
      </div>

      <div className="flex flex-col">

        {/* Documenta 15 — featured hero block */}
        {exhibitions.filter(e => e.featured).map(({ year, title, venue, href, note }) => (
          <a
            key={title}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="relative bg-slate-900 text-white p-8 md:p-12 mb-8 overflow-hidden group block"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-teal-900/40 to-transparent pointer-events-none" />
            <div className="absolute top-0 right-0 w-48 h-48 bg-teal-700/10 rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500 text-white text-xs font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  Landmark Exhibition
                </div>
                <span className="font-sans text-sm font-bold text-teal-400">{year}</span>
              </div>

              <h4 className="font-serif text-3xl md:text-5xl text-white mb-3 tracking-tight group-hover:text-teal-200 transition-colors duration-300">
                {title}
                {/* External link arrow */}
                <svg className="inline-block ml-3 w-6 h-6 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </h4>
              <p className="font-sans text-base text-white/70 mb-2">{venue}</p>
              {note && <p className="font-sans text-sm text-teal-300/90 font-light">{note}</p>}
            </div>
          </a>
        ))}

        {/* All other exhibitions — text link rows */}
        {exhibitions.filter(e => !e.featured).map(({ year, title, venue, href }) => (
          <a
            key={`${year}-${title}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-8 py-5 border-b border-slate-200 hover:bg-slate-50 transition-colors group px-2 cursor-pointer"
          >
            <div className="md:col-span-2 font-sans text-sm font-bold text-teal-700">{year}</div>

            <div className="md:col-span-6 flex items-center gap-2">
              <span className="font-serif text-xl text-slate-900 group-hover:text-teal-700 transition-colors duration-300">
                {title}
              </span>
              {/* Subtle external link icon */}
              <svg className="w-3.5 h-3.5 text-slate-300 group-hover:text-teal-500 transition-colors duration-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>

            <div className="md:col-span-4 font-sans text-sm font-light text-slate-500 md:text-right">{venue}</div>
          </a>
        ))}

      </div>
    </section>
  )
}
