"use client" // Needed since CldImage is used

import { CldImage } from 'next-cloudinary'

export default function TechniqueSection() {
  return (
    <section className="bg-slate-50 p-8 md:p-16 mb-32 -mx-6 md:mx-0 rounded-sm border border-slate-200/50">
      <h3 className="font-serif text-4xl md:text-5xl mb-12">Technique & Approach</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        <div className="flex flex-col gap-6">
          <div className="w-full aspect-square bg-white p-3 shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden group">
            <div className="relative w-full h-full overflow-hidden">
              <CldImage
                src="homepage-background_jabt7w" 
                alt="Macro texture detail"
                fill
                className="object-cover transition-transform duration-[2000ms] group-hover:scale-110 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors duration-500" />
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
          <div className="w-full aspect-square bg-white p-3 shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden group">
            <div className="relative w-full h-full overflow-hidden">
              <CldImage
                src="IMG_5801_gkh3yc" 
                alt="Color mixing detail"
                fill
                className="object-cover transition-transform duration-[2000ms] group-hover:scale-110 scale-125"
              />
              <div className="absolute inset-0 bg-teal-900/40 group-hover:bg-teal-900/10 transition-colors duration-500 mix-blend-multiply" />
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
          <div className="w-full aspect-square bg-white p-3 shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden group border-b border-transparent">
            <div className="relative w-full h-full overflow-hidden">
              <CldImage
                src="homepage-background_jabt7w" 
                alt="Scraped canvas detail"
                fill
                className="object-cover transition-transform duration-[2000ms] group-hover:scale-125 rotate-180 grayscale contrast-125"
              />
              <div className="absolute inset-0 bg-slate-100/10 group-hover:bg-transparent transition-colors duration-500" />
            </div>
          </div>
          <div>
            <h4 className="font-sans text-sm font-bold uppercase tracking-widest mb-3 text-slate-800">03. Subtraction</h4>
            <p className="font-sans text-sm font-light text-slate-600 leading-relaxed">
              As much as paint is applied, it is also aggressively removed. Scraping tools pull back layers to reveal the history underneath, creating physical memory on the canvas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
