export default function ExhibitionsList() {
  return (
    <section className="mb-16">
      <div className="flex items-baseline justify-between mb-12 border-b-2 border-slate-900/20 pb-4">
        <h3 className="font-serif text-4xl md:text-5xl">Recognition & Exhibitions</h3>
        <span className="font-sans text-xs uppercase tracking-widest text-slate-400">Archive</span>
      </div>

      <div className="flex flex-col">

        {/* Documenta 15 — featured, most prominent */}
        <div className="relative bg-slate-900 text-white p-8 md:p-12 mb-8 overflow-hidden group">
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-teal-900/40 to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 w-48 h-48 bg-teal-700/10 rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500 text-white text-xs font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                Landmark Exhibition
              </div>
              <span className="font-sans text-sm font-bold text-teal-400">2022</span>
            </div>

            <h4 className="font-serif text-3xl md:text-5xl text-white mb-3 tracking-tight">
              Documenta 15
            </h4>
            <p className="font-sans text-base text-white/70 mb-2">
              Kassel, Germany
            </p>
            <p className="font-sans text-sm text-teal-300/90 font-light">
              Participated as member of Wajukuu Arts Collective · International group exhibition (Winner)
            </p>
          </div>
        </div>

        {/* Other exhibitions — clean list */}
        {[
          { year: '2026', title: 'Wajukuu Annual Showcase', venue: 'Nairobi, Kenya' },
          { year: '2025', title: 'Image in Our Heads', venue: 'Royal Danish Embassy & Wajukuu' },
          { year: '2025', title: 'Echoes of the City (Group)', venue: 'Nairobi National Museum' },
          { year: '2024', title: 'Before Our Home Goes Down', venue: 'Wajukuu Arts Collective' },
          { year: '2024', title: 'Abstract Identities', venue: 'Circle Art Gallery' },
        ].map(({ year, title, venue }) => (
          <div
            key={`${year}-${title}`}
            className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-8 py-5 border-b border-slate-200 hover:bg-slate-50 transition-colors group px-2"
          >
            <div className="md:col-span-2 font-sans text-sm font-bold text-teal-700">{year}</div>
            <div className="md:col-span-6 font-serif text-xl text-slate-900 group-hover:text-teal-700 transition-colors">{title}</div>
            <div className="md:col-span-4 font-sans text-sm font-light text-slate-500 md:text-right">{venue}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
