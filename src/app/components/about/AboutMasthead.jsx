export default function AboutMasthead() {
  return (
    <header className="px-6 pt-8 pb-16 md:px-16 lg:px-24 border-b border-slate-900/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-teal-700 mb-6">
            Vol. 01 — Profile
          </p>
          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none">
            Freshia
            <span className="block font-light italic text-slate-500 text-5xl md:text-7xl lg:text-8xl mt-2">
              Njeri.
            </span>
          </h1>
        </div>
        <div className="md:max-w-sm">
          <p className="font-sans text-sm md:text-base font-light leading-relaxed text-slate-600">
            Self-taught visual artist and educator. Documenta 15 participant with Wajukuu Arts Collective. Based in Nairobi, Kenya.
          </p>
        </div>
      </div>
    </header>
  )
}
