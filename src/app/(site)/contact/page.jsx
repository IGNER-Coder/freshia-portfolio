"use client";

import Link from 'next/link';
import ContactForm from './ContactForm';
import { CldImage } from 'next-cloudinary';
import { socialLinks } from '@/app/lib/socials';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-900 selection:bg-teal-700 selection:text-white">

      {/* MASTHEAD */}
      <header className="px-6 pt-20 pb-12 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-teal-700 mb-6">
            Vol. 02 — Inquiries
          </p>
          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none mb-6">
            Contact.
          </h1>
          <div className="h-[1px] w-full max-w-2xl bg-slate-900/10" />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

          {/* LEFT — Info + Polaroid as centrepiece */}
          <div className="lg:col-span-5 flex flex-col gap-10">

            {/* Polaroid — elevated to top of left column */}
            <div className="w-full max-w-xs aspect-[4/3] bg-white p-3 shadow-xl rotate-1 hover:rotate-0 transition-transform duration-500 relative">
              <div className="relative w-full h-full overflow-hidden">
                <CldImage
                  src="IMG_5800_1_zgfeba"
                  alt="Freshia Njeri's Studio — Wajukuu Arts Collective, Nairobi"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <p className="text-xs text-slate-400 font-light italic mt-2 text-center">
                Studio space · Wajukuu, Nairobi
              </p>
            </div>

            {/* Contact details */}
            <div>
              <h2 className="font-serif text-2xl md:text-3xl mb-8 leading-tight text-slate-800">
                For commissions, exhibitions, or studio visits — reach out.
              </h2>

              <div className="space-y-7 font-sans">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">
                    Studio Location
                  </h4>
                  <p className="text-sm text-slate-700 font-light leading-relaxed">
                    Wajukuu Arts Collective<br />
                    Lunga Lunga, Mukuru<br />
                    Nairobi, Kenya
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">
                    Direct Email
                  </h4>
                  <a
                    href="mailto:freshianjeri123@gmail.com"
                    className="text-sm text-teal-700 hover:text-slate-900 transition-colors font-light"
                  >
                    freshianjeri123@gmail.com
                  </a>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">
                    Response Time
                  </h4>
                  <p className="text-sm text-slate-700 font-light">Within 24–48 hours</p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
                    Connect
                  </h4>
                  <div className="flex flex-col gap-2">
                    {socialLinks.map(({ name, href }) => (
                      <a
                        key={name}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-slate-600 hover:text-teal-700 transition-colors font-light inline-flex items-center relative group w-fit"
                      >
                        {name}
                        <span className="absolute -bottom-0.5 left-0 right-0 h-[1px] bg-teal-700 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Contact form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

        </div>
      </main>
    </div>
  );
}
