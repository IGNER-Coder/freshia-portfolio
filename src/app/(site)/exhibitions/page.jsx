import ExhibitionsList from '../../components/about/ExhibitionsList';

export const metadata = {
  title: 'Exhibitions | Freshia Njeri',
  description: 'Archive of past and upcoming exhibitions by visual artist Freshia Njeri.',
};

export default function ExhibitionsPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-900 selection:bg-teal-700 selection:text-white pb-32">
      {/* MASTHEAD */}
      <header className="px-6 pt-20 pb-12 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-slate-900/10 pb-12">
          <div>
            <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-teal-700 mb-6">
              Vol. 03 — Exhibitions
            </p>
            <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none">
              Exhibitions.
            </h1>
          </div>
          <p className="font-sans text-xs text-slate-400 tracking-widest uppercase self-end">
            Archive
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
        <ExhibitionsList />
      </main>
    </div>
  );
}
