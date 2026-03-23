export default function ExhibitionsList() {
  return (
    <section className="mb-32">
      <div className="flex items-baseline justify-between mb-12 border-b-2 border-slate-900/20 pb-4">
        <h3 className="font-serif text-4xl md:text-5xl">Recognition & Exhibitions</h3>
        <span className="font-sans text-xs uppercase tracking-widest text-slate-400">Archive</span>
      </div>

      <div className="flex flex-col">
        {/* Documenta - Featured */}
        <div className="bg-slate-50 border-2 border-teal-700/20 p-6 mb-6 hover:border-teal-700/40 transition-colors">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div className="inline-block px-2 py-1 bg-teal-700 text-white text-xs font-bold uppercase tracking-wider">
              Major Exhibition
            </div>
            <span className="font-sans text-sm font-bold text-teal-700">2022</span>
          </div>
          <h4 className="font-serif text-2xl text-slate-900 mb-2">
            Documenta 15
          </h4>
          <p className="font-sans text-sm text-slate-600 mb-3">
            Participated as member of Wajukuu Arts Collective (Winner)
          </p>
          <p className="font-sans text-sm font-light text-slate-500">
            Kassel, Germany
          </p>
        </div>

        {/* Other Exhibitions */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-6 border-b border-slate-200 hover:bg-white transition-colors group">
          <div className="md:col-span-2 font-sans text-sm font-bold text-teal-700">2026</div>
          <div className="md:col-span-6 font-serif text-xl text-slate-900 group-hover:text-teal-700 transition-colors">Wajukuu Annual Showcase</div>
          <div className="md:col-span-4 font-sans text-sm font-light text-slate-500 md:text-right">Nairobi, Kenya</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-6 border-b border-slate-200 hover:bg-white transition-colors group">
          <div className="md:col-span-2 font-sans text-sm font-bold text-teal-700">2025</div>
          <div className="md:col-span-6 font-serif text-xl text-slate-900 group-hover:text-teal-700 transition-colors">Echoes of the City (Group)</div>
          <div className="md:col-span-4 font-sans text-sm font-light text-slate-500 md:text-right">Nairobi National Museum</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-6 border-b border-slate-200 hover:bg-white transition-colors group">
          <div className="md:col-span-2 font-sans text-sm font-bold text-teal-700">2024</div>
          <div className="md:col-span-6 font-serif text-xl text-slate-900 group-hover:text-teal-700 transition-colors">Abstract Identities</div>
          <div className="md:col-span-4 font-sans text-sm font-light text-slate-500 md:text-right">Circle Art Gallery</div>
        </div>
      </div>
    </section>
  );
}
