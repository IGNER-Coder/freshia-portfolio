'use client'; // <-- Add this as the very first line

import Link from 'next/link';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiry: 'commission',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Here you would typically send the form data to your backend
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        inquiry: 'commission',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-900 selection:bg-teal-700 selection:text-white pb-24">
      
      {/* --- MASTHEAD --- */}
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

      <main className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* --- LEFT COLUMN: Studio Details & Atmosphere --- */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl mb-8 leading-tight">
                For commissions, exhibitions, or studio visits, please reach out.
              </h2>
              
              <div className="space-y-8 font-sans">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Studio Location</h4>
                  <p className="text-base text-slate-700 font-light">
                    Wajukuu Arts Collective<br />
                    Lunga Lunga, Mukuru<br />
                    Nairobi, Kenya
                  </p>
                </div>
                
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Direct Email</h4>
                  <a href="mailto:hello@freshianjeri.com" className="text-base text-teal-700 hover:text-slate-900 transition-colors font-light">
                    hello@freshianjeri.com
                  </a>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Social</h4>
                  <div className="flex gap-6 text-sm font-light">
                    <a href="#" className="text-slate-700 hover:text-teal-700 transition-colors">Instagram</a>
                    <a href="#" className="text-slate-700 hover:text-teal-700 transition-colors">LinkedIn</a>
                    <a href="#" className="text-slate-700 hover:text-teal-700 transition-colors">Behance</a>
                  </div>
                </div>
              </div>
            </div>

            {/* ATMOSPHERIC POLAROID */}
            <div className="mt-16 w-3/4 md:w-2/3 aspect-[4/3] bg-white p-2 shadow-md rotate-1 hover:rotate-0 transition-transform duration-500">
              {/* COMPONENT: Replace with Cloudinary shot of paintbrushes, palette, or studio space */}
              <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400 text-[10px] tracking-widest uppercase text-center px-4">
                [ Studio Details / Palette Shot ]
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: The Editorial Form --- */}
          <div className="lg:col-span-7">
            {submitStatus === 'success' && (
              <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 font-medium">Thank you for your message! I'll get back to you soon.</p>
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 font-medium">Sorry, there was an error sending your message. Please try again.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-12 mt-4 lg:mt-0">
              
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="relative group">
                  <label htmlFor="name" className="block font-sans text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
                    Name
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full appearance-none rounded-none bg-transparent border-b border-slate-300 py-2 text-slate-900 font-serif text-xl focus:outline-none focus:border-teal-700 transition-colors"
                    placeholder="Jane Doe"
                  />
                </div>

                <div className="relative group">
                  <label htmlFor="email" className="block font-sans text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full appearance-none rounded-none bg-transparent border-b border-slate-300 py-2 text-slate-900 font-serif text-xl focus:outline-none focus:border-teal-700 transition-colors"
                    placeholder="jane@example.com"
                  />
                </div>
              </div>

              {/* Inquiry Type Dropdown */}
              <div className="relative group">
                <label htmlFor="inquiry" className="block font-sans text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
                  Subject of Inquiry
                </label>
                <select 
                  id="inquiry" 
                  name="inquiry"
                  value={formData.inquiry}
                  onChange={handleInputChange}
                  className="w-full appearance-none rounded-none bg-transparent border-b border-slate-300 py-2 text-slate-900 font-serif text-xl focus:outline-none focus:border-teal-700 transition-colors cursor-pointer"
                >
                  <option value="commission">Original Commission</option>
                  <option value="exhibition">Exhibition Opportunity</option>
                  <option value="studio">Studio Visit</option>
                  <option value="press">Press / Interview</option>
                  <option value="other">General Inquiry</option>
                </select>
                {/* Custom Dropdown Arrow */}
                <div className="absolute right-0 bottom-3 pointer-events-none text-slate-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Message Area */}
              <div className="relative group">
                <label htmlFor="message" className="block font-sans text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
                  Message
                </label>
                <textarea 
                  id="message" 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4" 
                  required
                  className="w-full appearance-none rounded-none bg-transparent border-b border-slate-300 py-2 text-slate-900 font-sans text-base font-light leading-relaxed focus:outline-none focus:border-teal-700 transition-colors resize-none"
                  placeholder="Tell me about your project or inquiry..."
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="group flex items-center gap-4 text-sm font-sans font-bold uppercase tracking-widest text-slate-900 transition-colors hover:text-teal-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="h-[1px] w-12 bg-slate-900 transition-all duration-300 group-hover:w-24 group-hover:bg-teal-700" />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>

            </form>
          </div>

        </div>
      </main>
    </div>
  );
}