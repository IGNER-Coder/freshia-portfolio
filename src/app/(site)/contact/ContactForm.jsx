'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import emailjs from '@emailjs/browser';
import Link from 'next/link';

export default function ContactForm() {
  const searchParams = useSearchParams();
  const artworkFromQuery = searchParams.get('artwork');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiry: artworkFromQuery ? 'commission' : 'commission',
    message: artworkFromQuery
      ? `Hi, I'm interested in enquiring about the artwork "${artworkFromQuery}". `
      : ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Initialize EmailJS
  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (publicKey) emailjs.init(publicKey);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus('error');
      setIsSubmitting(false);
      return;
    }

    const serviceId  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;

    if (!serviceId || !templateId) {
      console.error('EmailJS configuration missing.');
      setSubmitStatus('error');
      setIsSubmitting(false);
      return;
    }

    try {
      await emailjs.send(serviceId, templateId, {
        from_name:     formData.name,
        from_email:    formData.email,
        inquiry_type:  formData.inquiry,
        message:       formData.message,
        to_email:      'freshianjeri123@gmail.com',
        inquiry_label: formData.inquiry === 'commission'  ? 'Original Commission'    :
                       formData.inquiry === 'exhibition'  ? 'Exhibition Opportunity' :
                       formData.inquiry === 'studio'      ? 'Studio Visit'           :
                       formData.inquiry === 'press'       ? 'Press / Interview'      :
                       'General Inquiry'
      });

      setSubmitStatus('success');
      setFormData({ name: '', email: '', inquiry: 'commission', message: '' });
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      console.error('Email send failed:', error.message);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Artwork pre-fill banner */}
      {artworkFromQuery && (
        <div className="mb-8 px-4 py-3 bg-teal-50 border-l-4 border-teal-600 text-sm text-teal-800 font-sans">
          Enquiring about: <strong>"{artworkFromQuery}"</strong>
        </div>
      )}

      {/* Success */}
      {submitStatus === 'success' && (
        <div className="mb-8 p-8 bg-teal-50 border border-teal-200 text-center flex flex-col items-center justify-center min-h-[250px] shadow-sm">
          <svg className="w-16 h-16 mb-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="font-serif text-2xl text-teal-900 mb-2">Message Delivered</h3>
          <p className="font-sans text-sm font-light text-teal-800 mb-8 max-w-sm">
            Thank you. The studio has received your inquiry and will respond shortly.
          </p>
          <Link
            href="/artworks"
            className="group flex flex-col items-center gap-1 text-[10px] md:text-sm font-sans font-bold uppercase tracking-widest text-teal-900 hover:text-teal-700 transition-all py-2"
          >
            ← Continue Exploring Gallery
            <span className="h-[2px] w-12 bg-teal-900 group-hover:w-full group-hover:bg-teal-700 transition-all duration-300 mt-1" />
          </Link>
        </div>
      )}

      {/* Error */}
      {submitStatus === 'error' && (
        <div className="mb-8 p-6 bg-red-50 border-2 border-red-200">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <div>
              <p className="text-red-900 font-semibold mb-1">Something went wrong.</p>
              <p className="text-red-800 text-sm">
                Please try again or email directly at{' '}
                <a href="mailto:freshianjeri123@gmail.com" className="underline font-bold hover:text-red-900">
                  freshianjeri123@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-12 mt-4 lg:mt-0">

        {/* Name & Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <label htmlFor="name" className="block font-sans text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Name</label>
            <input
              type="text" id="name" name="name"
              value={formData.name} onChange={handleInputChange}
              required disabled={isSubmitting}
              className="w-full appearance-none rounded-none bg-transparent border-b border-slate-300 py-2 text-slate-900 font-serif text-xl focus:outline-none focus:border-teal-700 transition-colors disabled:opacity-50"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block font-sans text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Email Address</label>
            <input
              type="email" id="email" name="email"
              value={formData.email} onChange={handleInputChange}
              required disabled={isSubmitting}
              className="w-full appearance-none rounded-none bg-transparent border-b border-slate-300 py-2 text-slate-900 font-serif text-xl focus:outline-none focus:border-teal-700 transition-colors disabled:opacity-50"
              placeholder="your@email.com"
            />
          </div>
        </div>

        {/* Inquiry Type */}
        <div className="relative">
          <label htmlFor="inquiry" className="block font-sans text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Subject of Inquiry</label>
          <select
            id="inquiry" name="inquiry"
            value={formData.inquiry} onChange={handleInputChange}
            disabled={isSubmitting}
            className="w-full appearance-none rounded-none bg-transparent border-b border-slate-300 py-2 text-slate-900 font-serif text-xl focus:outline-none focus:border-teal-700 transition-colors cursor-pointer disabled:opacity-50"
          >
            <option value="commission">Original Commission</option>
            <option value="exhibition">Exhibition Opportunity</option>
            <option value="studio">Studio Visit</option>
            <option value="press">Press / Interview</option>
            <option value="other">General Inquiry</option>
          </select>
          <div className="absolute right-0 bottom-3 pointer-events-none text-slate-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block font-sans text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Message</label>
          <textarea
            id="message" name="message"
            value={formData.message} onChange={handleInputChange}
            rows="5" required disabled={isSubmitting}
            className="w-full appearance-none rounded-none bg-transparent border-b border-slate-300 py-2 text-slate-900 font-sans text-base font-light leading-relaxed focus:outline-none focus:border-teal-700 transition-colors resize-none disabled:opacity-50"
            placeholder="Tell me about your project or inquiry..."
          />
          <div className="mt-2 text-right">
            <span className="text-xs text-slate-400 font-light">
              {formData.message.length > 0 ? `${formData.message.length} characters` : 'Min. 20 characters recommended'}
            </span>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-6">
          <button
            type="submit" disabled={isSubmitting}
            className="group flex items-center gap-4 text-sm font-sans font-bold uppercase tracking-widest text-slate-900 hover:text-teal-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed relative px-4 py-2 -ml-4"
          >
            <span className="absolute inset-0 bg-slate-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative h-[1px] w-12 bg-slate-900 group-hover:w-24 group-hover:bg-teal-700 transition-all duration-300" />
            <span className="relative flex items-center gap-2">
              {isSubmitting && (
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              )}
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </span>
          </button>
        </div>

      </form>
    </>
  );
}
