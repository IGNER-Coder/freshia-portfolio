"use client"; // 1. MUST BE AT THE VERY TOP

import Link from 'next/link';
import { CldImage } from 'next-cloudinary'; // 2. IMPORT ADDED

// 3. METADATA BLOCK REMOVED (Next.js will crash if we leave it here)

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-900 selection:bg-teal-700 selection:text-white">
      
      {/* MASTHEAD */}
      <header className="px-6 pt-20 pb-16 md:px-16 lg:px-24 border-b border-slate-900/10">
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

      <main className="max-w-7xl mx-auto px-6 py-20 md:px-16 lg:px-24">
        
        {/* HIGHLIGHT BANNER - Documenta */}
        <div className="mb-20 -mx-6 md:mx-0">
          <div className="bg-teal-700 text-white px-8 py-6 md:px-12 md:py-8 relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-xs font-bold uppercase tracking-widest mb-2 opacity-80">
                Major Achievement
              </p>
              <h2 className="font-serif text-2xl md:text-4xl font-bold mb-2">
                Documenta 15, Kassel, Germany
              </h2>
              <p className="font-sans text-sm md:text-base font-light opacity-90">
                Participated as member of Wajukuu Arts Collective — Winner, 2022
              </p>
            </div>
            <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          </div>
        </div>

        {/* NARRATIVE SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-32">
          
          {/* Left Sidebar - Metadata */}
          <div className="lg:col-span-3 font-sans">
            <div className="sticky top-12 space-y-12">
              
              {/* Portrait */}
              <div className="w-full max-w-xs aspect-[3/4] bg-white p-3 shadow-lg rotate-[-2deg] hover:rotate-0 hover:shadow-xl transition-all duration-500">
                <div 
                  className="relative w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center overflow-hidden"
                >
                  {/* 4. FIXED CLOUDINARY COMPONENT */}
                  <CldImage
                    src="IMG_5801_gkh3yc" // <-- ONLY THE PUBLIC ID!
                    alt="Freshia Njeri Studio Portrait"
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700" 
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Location</h4>
                  <p className="text-sm font-light">Nairobi, Kenya</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Collective</h4>
                  <p className="text-sm font-light">Wajukuu Arts</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Practice</h4>
                  <p className="text-sm font-light">Self-Taught Artist</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Medium</h4>
                  <p className="text-sm font-light">Mixed Media & Acrylic</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Role</h4>
                  <p className="text-sm font-light">Kids Club Leader</p>
                </div>
              </div>
              
              <div className="pt-8 border-t border-slate-900/10 space-y-3">
                <Link 
                  href="/contact" 
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-widest text-teal-700 border border-teal-700/20 hover:bg-teal-700 hover:text-white transition-all duration-300"
                >
                  Contact Studio →
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column - Biography */}
          <div className="lg:col-span-9 max-w-5xl">
            <h2 className="font-serif text-3xl md:text-5xl mb-12 leading-tight text-slate-800">
              "Art is the silent language of the spaces we inhabit, moving beyond the canvas into the psychological realm."
            </h2>
            
            <div className="font-sans text-base md:text-lg text-slate-600 font-light leading-relaxed md:columns-2 gap-12">
              <p className="first-letter:float-left first-letter:text-7xl first-letter:pr-4 first-letter:font-serif first-letter:text-slate-900 first-letter:leading-[0.8] mb-6">
                Freshia Njeri is a self-taught visual artist whose work dissects the raw emotional undercurrents of urban life. Deeply rooted in Nairobi, her practice navigates the complexities of identity and memory through a deeply physical process of layering, scraping, and rebuilding. What began as an intuitive exploration has evolved into a rigorous artistic language, shaped entirely through lived experience and collective learning.
              </p>
              <p className="mb-6">
                Her artistic journey truly began when she encountered the Wajukuu Arts Collective, a transformative space that has profoundly shaped her worldview. Within this community of practice, she found not only artistic growth but also a platform for radical self-education. The collective's commitment to mutual learning and knowledge-sharing became the foundation upon which she built her technical and conceptual skills.
              </p>
              <p className="mb-6">
                In 2022, as a member of Wajukuu Arts Collective, Freshia participated in Documenta 15 in Kassel, Germany — one of the world's most prestigious contemporary art exhibitions. The collective's recognition at this international platform validated their approach to art-making rooted in community, collaboration, and collective care.
              </p>
              <p className="mb-6">
                Now, Freshia pays forward the knowledge she's gained by leading the Wajukuu Arts Kids Club, where she mentors young artists and nurtures the next generation of creative voices. Through her signature palette of deep blues, moody greys, and sudden interruptions of warmth, she invites viewers not just to look, but to feel — making her a vital voice in the contemporary East African art scene.
              </p>
            </div>
          </div>
        </section>

        {/* Visual Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent mb-32"></div>

        {/* COMMUNITY IMPACT SECTION */}
        <section className="mb-32">
          <h3 className="font-serif text-4xl md:text-5xl mb-12">Community & Education</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="inline-block px-3 py-1 bg-teal-700/10 text-teal-700 text-xs font-bold uppercase tracking-wider mb-2">
                Leadership
              </div>
              <h4 className="font-serif text-2xl text-slate-900">Wajukuu Arts Kids Club</h4>
              <p className="font-sans text-base font-light text-slate-600 leading-relaxed">
                As the leader of the Kids Club, Freshia creates space for young artists to explore their creativity freely. Through weekly workshops, she introduces children to various techniques while encouraging them to develop their own artistic voices. Her teaching philosophy mirrors her learning journey: art as a communal practice, accessible to all.
              </p>
            </div>

            <div className="space-y-4">
              <div className="inline-block px-3 py-1 bg-teal-700/10 text-teal-700 text-xs font-bold uppercase tracking-wider mb-2">
                Philosophy
              </div>
              <h4 className="font-serif text-2xl text-slate-900">Self-Taught Practice</h4>
              <p className="font-sans text-base font-light text-slate-600 leading-relaxed">
                Freshia's self-taught journey challenges traditional narratives about artistic education. Her work demonstrates that rigorous artistic practice can emerge from community-based learning, collective critique, and sustained personal dedication. This approach informs both her art-making and her teaching methodology.
              </p>
            </div>
          </div>
        </section>

        {/* TECHNIQUE SECTION */}
        <section className="bg-slate-100/50 p-8 md:p-16 mb-32 -mx-6 md:mx-0 rounded-sm border border-slate-200/50">
          <h3 className="font-serif text-4xl md:text-5xl mb-12">Technique & Approach</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            
            <div className="flex flex-col gap-6">
              <div className="w-full aspect-square bg-white p-3 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div 
                  className="w-full h-full flex items-center justify-center"
                  style={{
                    background: 'repeating-linear-gradient(45deg, #e2e8f0, #e2e8f0 10px, #cbd5e0 10px, #cbd5e0 20px)'
                  }}
                >
                  <span className="text-xs text-slate-400 uppercase tracking-widest bg-white/90 px-3 py-1">Texture</span>
                </div>
              </div>
              <div>
                <h4 className="font-sans text-sm font-bold uppercase tracking-widest mb-3 text-slate-800">01. Textural Layering</h4>
                <p className="font-sans text-sm font-light text-slate-600 leading-relaxed">
                  Utilizing heavy impasto and mixed materials, the canvas is built up over weeks. This creates a topographical surface that catches light and casts physical shadows.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-6 md:pt-12">
              <div className="w-full aspect-square bg-white p-3 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div 
                  className="w-full h-full flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #2C7A7B 0%, #4A5568 100%)'
                  }}
                >
                  <span className="text-xs text-white uppercase tracking-widest bg-black/20 px-3 py-1">Color</span>
                </div>
              </div>
              <div>
                <h4 className="font-sans text-sm font-bold uppercase tracking-widest mb-3 text-slate-800">02. Color Psychology</h4>
                <p className="font-sans text-sm font-light text-slate-600 leading-relaxed">
                  Color is used not descriptively, but emotively. The heavy reliance on monochromatic greys and deep teals forces the viewer into introspection.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="w-full aspect-square bg-white p-3 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div 
                  className="w-full h-full bg-slate-200 flex items-center justify-center"
                  style={{
                    backgroundImage: 'radial-gradient(circle, #cbd5e0 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                  }}
                >
                  <span className="text-xs text-slate-500 uppercase tracking-widest bg-white/90 px-3 py-1">Canvas</span>
                </div>
              </div>
              <div>
                <h4 className="font-sans text-sm font-bold uppercase tracking-widest mb-3 text-slate-800">03. Subtraction</h4>
                <p className="font-sans text-sm font-light text-slate-600 leading-relaxed">
                  As much as paint is applied, it is also aggressively removed. Scraping tools pull back layers to reveal the history underneath.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* RECOGNITION & EXHIBITIONS */}
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

      </main>
    </div>
  );
}