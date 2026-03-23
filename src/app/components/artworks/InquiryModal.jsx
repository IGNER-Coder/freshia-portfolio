"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { urlFor } from '@/sanity/lib/image';

export default function InquiryModal({ artwork }) {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState('idle'); // idle, sending, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    
    // Simulate EmailJS or actual send (user can wire EmailJS here)
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => setIsOpen(false), 2000);
    }, 1500);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-block w-full text-center bg-slate-900 text-white px-8 py-4 font-sans text-xs font-bold uppercase tracking-widest hover:bg-teal-700 transition-colors duration-300"
      >
        Inquire About This Piece
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-white shadow-2xl flex flex-col md:flex-row overflow-hidden max-h-[90vh]"
            >
              {/* Left Column - Artwork Thumbnail */}
              <div className="w-full md:w-5/12 bg-slate-100 p-8 flex flex-col items-center justify-center border-r border-slate-200 hide-scrollbar overflow-y-auto hidden md:flex">
                <div className="w-full aspect-[4/5] bg-white p-2 shadow-sm mb-6">
                  {artwork.mainImage ? (
                    <img
                      src={urlFor(artwork.mainImage).width(600).quality(85).auto('format').url()}
                      alt={artwork.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-200">
                      <span className="text-xs text-slate-400 uppercase tracking-widest">No Image</span>
                    </div>
                  )}
                </div>
                <h3 className="font-serif text-2xl text-slate-900 text-center mb-1">{artwork.title}</h3>
                <p className="font-sans text-xs font-bold tracking-widest text-slate-400 uppercase">{artwork.year} • {artwork.medium}</p>
              </div>

              {/* Right Column - Form */}
              <div className="w-full md:w-7/12 p-8 md:p-12 overflow-y-auto hide-scrollbar">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h2 className="font-serif text-3xl md:text-3xl text-slate-900 mb-2">Inquire</h2>
                    <p className="font-sans text-sm font-light text-slate-600">
                      Register your interest for <span className="font-bold font-serif italic text-lg">"{artwork.title}"</span>. Fast responses guaranteed.
                    </p>
                  </div>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-slate-400 hover:text-slate-900 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>

                {status === 'success' ? (
                  <div className="bg-teal-50 border border-teal-200 text-teal-800 p-8 text-center flex flex-col items-center justify-center h-64">
                    <svg className="w-16 h-16 mb-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <h3 className="font-serif text-2xl mb-2">Inquiry Sent</h3>
                    <p className="text-sm font-light">Freshia's studio will be in touch shortly regarding availability and pricing.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="font-sans text-[10px] font-bold tracking-widest uppercase text-slate-500">First Name</label>
                        <input required type="text" className="w-full border-b border-slate-200 py-2 px-0 bg-transparent focus:outline-none focus:border-teal-700 focus:ring-0 transition-colors font-light text-slate-800" placeholder="Jane" />
                      </div>
                      <div className="space-y-2">
                        <label className="font-sans text-[10px] font-bold tracking-widest uppercase text-slate-500">Last Name</label>
                        <input required type="text" className="w-full border-b border-slate-200 py-2 px-0 bg-transparent focus:outline-none focus:border-teal-700 focus:ring-0 transition-colors font-light text-slate-800" placeholder="Doe" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="font-sans text-[10px] font-bold tracking-widest uppercase text-slate-500">Email Address</label>
                      <input required type="email" className="w-full border-b border-slate-200 py-2 px-0 bg-transparent focus:outline-none focus:border-teal-700 focus:ring-0 transition-colors font-light text-slate-800" placeholder="jane@example.com" />
                    </div>
                    <div className="space-y-2">
                      <label className="font-sans text-[10px] font-bold tracking-widest uppercase text-slate-500">Message</label>
                      <textarea required rows={4} className="w-full border-b border-slate-200 py-2 px-0 bg-transparent focus:outline-none focus:border-teal-700 focus:ring-0 transition-colors font-light text-slate-800 resize-none" defaultValue={`I would like to inquire about "${artwork.title}". Please send me pricing and availability information.`} />
                    </div>
                    <div className="pt-4">
                      <button 
                        type="submit" 
                        disabled={status === 'sending'}
                        className="w-full bg-teal-800 text-white px-8 py-4 font-sans text-xs font-bold uppercase tracking-widest hover:bg-slate-900 transition-colors duration-300 disabled:opacity-50"
                      >
                        {status === 'sending' ? 'Transmitting via EmailJS...' : 'Send Inquiry To Studio'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
