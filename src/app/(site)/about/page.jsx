import Link from 'next/link';

export const metadata = {
  title: 'Biography | Freshia Njeri',
  description: 'The biography, techniques, and exhibitions of visual artist Freshia Njeri.',
};

export default function AboutMagazinePage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-900 selection:bg-teal-700 selection:text-white">
      
      {/* --- MASTHEAD (Magazine Cover Style) --- */}
      <header className="px-6 pt-20 pb-12 md:px-16 lg:px-24">
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
          <div className="md:max-w-xs text-right hidden md:block">
            <p className="font-sans text-sm font-light leading-relaxed text-slate-600">
              Exploring emotion, identity, and connection through layered abstract expressions. Based in Nairobi, Kenya.
            </p>
          </div>
        </div>

        {/* SPOT 1: THE MASTHEAD HERO IMAGE */}
        <div className="max-w-7xl mx-auto mt-16 border-t border-slate-900/10 pt-8">
          <div className="w-full aspect-video md:aspect-[21/9] bg-slate-200 overflow-hidden shadow-sm group">
            {/* COMPONENT: Replace with wide Cloudinary landscape shot */}
            <div className="w-full h-full flex items-center justify-center bg-slate-300 text-slate-500 text-sm tracking-widest uppercase grayscale group-hover:grayscale-0 transition-all duration-700">
              [ Cinematic Studio Shot Here ]
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-16 md:px-16 lg:px-24">
        
        {/* --- SECTION 1: THE NARRATIVE (Editorial Grid) --- */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-32">
          
          {/* Left Column: Image & Metadata */}
          <div className="lg:col-span-3 font-sans relative">
            <div className="sticky top-12 space-y-12">
              
              {/* SPOT 2: THE EDITORIAL INSET (Portrait) */}
              {/* Note the p-2 bg-white and slight rotation for that physical photo feel */}
              <div className="w-full aspect-[3/4] bg-white p-2 shadow-md rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
                {/* COMPONENT: Replace with Cloudinary portrait */}
                <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400 text-xs tracking-widest uppercase">
                  [ Studio Portrait Here ]
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Location</h4>
                  <p className="text-sm">Nairobi, Kenya</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Collective</h4>
                  <p className="text-sm">Wajukuu Arts</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Medium</h4>
                  <p className="text-sm">Mixed Media</p>
                </div>
              </div>
              
              <div className="pt-8 border-t border-slate-900/10">
                <Link 
                  href="/contact" 
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-teal-700 hover:text-slate-900 transition-colors"
                >
                  Contact Studio &rarr;
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Biography with Drop Cap */}
          <div className="lg:col-span-9">
            <h2 className="font-serif text-3xl md:text-5xl mb-12 leading-tight">
              "Art is the silent language of the spaces we inhabit, moving beyond the canvas into the psychological realm."
            </h2>
            
            <div className="font-sans text-base text-slate-600 font-light leading-relaxed md:columns-2 gap-12">
              <p className="first-letter:float-left first-letter:text-7xl first-letter:pr-4 first-letter:font-serif first-letter:text-slate-900 first-letter:leading-[0.8] mb-6">
                Freshia Njeri is a visual artist whose work dissects the raw emotional undercurrents of urban life. Deeply rooted in Nairobi, her practice navigates the complexities of identity and memory. What begins as a blank canvas is systematically transformed through a deeply physical process of layering, scraping, and rebuilding.
              </p>
              <p className="mb-6">
                Her involvement with the Wajukuu Arts Collective has profoundly shaped her artistic worldview. The collective, born from the necessity to create space for contemporary expression in East Africa, provides a foundation of community resilience that echoes throughout her abstract forms.
              </p>
              <p className="mb-6">
                Through her signature palette of deep blues, moody greys, and sudden interruptions of warmth, Freshia invites the viewer not just to look, but to feel. Her exhibitions have consistently pushed the boundaries of how abstract art is perceived in modern Kenyan galleries, making her a vital voice in the contemporary East African art scene.
              </p>
            </div>
          </div>
        </section>

        {/* --- SECTION 2: CRAFT & TECHNIQUE (The Triptych) --- */}
        <section className="bg-slate-100 p-8 md:p-16 mb-32 -mx-6 md:mx-0 rounded-sm">
          <h3 className="font-serif text-4xl mb-10">Technique & Approach</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            
            <div className="flex flex-col gap-6">
              {/* SPOT 3A: Texture Shot */}
              <div className="w-full aspect-square bg-white p-2 shadow-sm">
                 <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400 text-xs tracking-widest uppercase">
                   [ Texture Shot ]
                 </div>
              </div>
              <div>
                <h4 className="font-sans text-sm font-bold uppercase tracking-widest mb-3">01. Textural Layering</h4>
                <p className="font-sans text-sm font-light text-slate-600 leading-relaxed">
                  Utilizing heavy impasto and mixed materials, the canvas is built up over weeks. This creates a topographical surface that catches light and casts physical shadows.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-6 md:pt-12">
              {/* SPOT 3B: Color Shot (Staggered down via pt-12) */}
              <div className="w-full aspect-square bg-white p-2 shadow-sm">
                 <div className="w-full h-full flex items-center justify-center bg-slate-300 text-slate-500 text-xs tracking-widest uppercase">
                   [ Color Shot ]
                 </div>
              </div>
              <div>
                <h4 className="font-sans text-sm font-bold uppercase tracking-widest mb-3">02. Color Psychology</h4>
                <p className="font-sans text-sm font-light text-slate-600 leading-relaxed">
                  Color is used not descriptively, but emotively. The heavy reliance on monochromatic greys and deep teals forces the viewer into a state of introspection.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              {/* SPOT 3C: Canvas/Scrape Shot */}
              <div className="w-full aspect-square bg-white p-2 shadow-sm">
                 <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400 text-xs tracking-widest uppercase">
                   [ Canvas Shot ]
                 </div>
              </div>
              <div>
                <h4 className="font-sans text-sm font-bold uppercase tracking-widest mb-3">03. Subtraction</h4>
                <p className="font-sans text-sm font-light text-slate-600 leading-relaxed">
                  As much as paint is applied, it is also aggressively removed. Scraping tools pull back top layers to reveal the history of the painting underneath.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* --- SECTION 3: THE ARCHIVE --- */}
        <section className="mb-20">
          <div className="flex items-baseline justify-between mb-12 border-b border-slate-900/10 pb-4">
            <h3 className="font-serif text-4xl">Selected Exhibitions</h3>
            <span className="font-sans text-xs uppercase tracking-widest text-slate-400">Archive</span>
          </div>

          <div className="flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-6 border-b border-slate-200 hover:bg-slate-50 transition-colors">
              <div className="md:col-span-2 font-sans text-sm font-bold text-slate-400">2026</div>
              <div className="md:col-span-6 font-serif text-xl text-slate-900">Wajukuu Annual Showcase</div>
              <div className="md:col-span-4 font-sans text-sm font-light text-slate-500 md:text-right">Nairobi, Kenya</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-6 border-b border-slate-200 hover:bg-slate-50 transition-colors">
              <div className="md:col-span-2 font-sans text-sm font-bold text-slate-400">2025</div>
              <div className="md:col-span-6 font-serif text-xl text-slate-900">Echoes of the City (Group)</div>
              <div className="md:col-span-4 font-sans text-sm font-light text-slate-500 md:text-right">Nairobi National Museum</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-6 border-b border-slate-200 hover:bg-slate-50 transition-colors">
              <div className="md:col-span-2 font-sans text-sm font-bold text-slate-400">2024</div>
              <div className="md:col-span-6 font-serif text-xl text-slate-900">Abstract Identities</div>
              <div className="md:col-span-4 font-sans text-sm font-light text-slate-500 md:text-right">Circle Art Gallery</div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}