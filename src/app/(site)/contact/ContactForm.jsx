'use client';

import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import Link from 'next/link';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiry: 'commission',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Initialize EmailJS
  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    console.log('🔧 EmailJS Debug:', {
      publicKey: publicKey ? '[SET]' : '[NOT SET]',
      serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      emailjsLoaded: typeof emailjs !== 'undefined'
    });

    if (publicKey) {
      emailjs.init(publicKey);
      console.log('✅ EmailJS initialized with public key');
    } else {
      console.error('❌ EmailJS public key not found in environment variables');
    }
  }, []);

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

    // Validate required fields
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus('error');
      setIsSubmitting(false);
      return;
    }

    try {
      // Check if EmailJS is initialized
      if (!emailjs) {
        throw new Error('EmailJS not loaded');
      }

      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_3buzk0g';
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_xcq528i';

      console.log('📤 Sending email with:', {
        serviceId,
        templateId,
        formData: {
          from_name: formData.name,
          from_email: formData.email,
          inquiry_type: formData.inquiry,
          message: formData.message.substring(0, 50) + '...'
        }
      });

      // Send email via EmailJS
      const result = await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          inquiry_type: formData.inquiry,
          message: formData.message,
          to_email: 'freshianjeri123@gmail.com',
          // Format inquiry type for readability
          inquiry_label: formData.inquiry === 'commission' ? 'Original Commission' :
                        formData.inquiry === 'exhibition' ? 'Exhibition Opportunity' :
                        formData.inquiry === 'studio' ? 'Studio Visit' :
                        formData.inquiry === 'press' ? 'Press / Interview' :
                        'General Inquiry'
        }
      );

      console.log('✅ Email sent successfully:', result.text);
      console.log('📧 Email result details:', result);
      
      setSubmitStatus('success');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        inquiry: 'commission',
        message: ''
      });

      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
      
    } catch (error) {
      console.error('❌ Email send failed:', error);
      console.error('Error details:', {
        message: error?.message,
        text: error?.text,
        status: error?.status,
        name: error?.name,
        stack: error?.stack?.substring(0, 200),
        serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_3buzk0g',
        templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_xcq528i',
        publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ? '[SET]' : '[NOT SET]'
      });

      // Try to provide more specific error messages
      if (error?.text?.includes('Invalid service id')) {
        console.error('🔍 Specific error: Invalid service ID');
      } else if (error?.text?.includes('Invalid template id')) {
        console.error('🔍 Specific error: Invalid template ID');
      } else if (error?.text?.includes('Invalid public key')) {
        console.error('🔍 Specific error: Invalid public key');
      } else if (error?.status === 400) {
        console.error('🔍 Specific error: Bad request - check template variables');
      } else if (error?.status === 401) {
        console.error('🔍 Specific error: Unauthorized - check credentials');
      }

      setSubmitStatus('error');

      // Auto-hide error message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Success Message */}
      {submitStatus === 'success' && (
        <div className="mb-8 p-8 bg-teal-50 border border-teal-200 text-center flex flex-col items-center justify-center min-h-[250px] shadow-sm">
          <svg className="w-16 h-16 mb-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="font-serif text-2xl text-teal-900 mb-2">Message Delivered</h3>
          <p className="font-sans text-sm font-light text-teal-800 mb-8 max-w-sm">
            Thank you, <strong>{formData.name || 'friend'}</strong>. The studio has received your inquiry and will respond to <strong>{formData.email}</strong> shortly.
          </p>
          <div className="relative group overflow-hidden">
            <Link 
              href="/artworks"
              className="group flex flex-col items-center gap-1 text-[10px] md:text-sm font-sans font-bold uppercase tracking-widest text-teal-900 transition-all hover:text-teal-700 relative py-2"
            >
              ← Continue Exploring Gallery
              <span className="relative h-[2px] w-12 bg-teal-900 transition-all duration-300 group-hover:w-full group-hover:bg-teal-700 mt-1" />
            </Link>
          </div>
        </div>
      )}
      
      {/* Error Message */}
      {submitStatus === 'error' && (
        <div className="mb-8 p-6 bg-red-50 border-2 border-red-200">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <div>
              <p className="text-red-900 font-semibold mb-1">
                Oops! Something went wrong.
              </p>
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
              disabled={isSubmitting}
              className="w-full appearance-none rounded-none bg-transparent border-b border-slate-300 py-2 text-slate-900 font-serif text-xl focus:outline-none focus:border-teal-700 transition-colors disabled:opacity-50"
              placeholder="Freshia Njeri"
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
              disabled={isSubmitting}
              className="w-full appearance-none rounded-none bg-transparent border-b border-slate-300 py-2 text-slate-900 font-serif text-xl focus:outline-none focus:border-teal-700 transition-colors disabled:opacity-50"
              placeholder="freshia@example.com"
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
            disabled={isSubmitting}
            className="w-full appearance-none rounded-none bg-transparent border-b border-slate-300 py-2 text-slate-900 font-serif text-xl focus:outline-none focus:border-teal-700 transition-colors cursor-pointer disabled:opacity-50"
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
            rows="5" 
            required
            disabled={isSubmitting}
            className="w-full appearance-none rounded-none bg-transparent border-b border-slate-300 py-2 text-slate-900 font-sans text-base font-light leading-relaxed focus:outline-none focus:border-teal-700 transition-colors resize-none disabled:opacity-50"
            placeholder="Tell me about your project or inquiry..."
          ></textarea>
          <div className="mt-2 text-right">
            <span className="text-xs text-slate-400 font-light">
              {formData.message.length} characters
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-6">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="group flex items-center gap-4 text-sm font-sans font-bold uppercase tracking-widest text-slate-900 transition-all hover:text-teal-700 disabled:opacity-50 disabled:cursor-not-allowed relative px-4 py-2 -ml-4"
          >
            {/* Background that appears on hover */}
            <span className="absolute inset-0 bg-slate-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Animated line */}
            <span className="relative h-[1px] w-12 bg-slate-900 transition-all duration-300 group-hover:w-24 group-hover:bg-teal-700" />
            
            {/* Button text */}
            <span className="relative flex items-center gap-2">
              {isSubmitting && (
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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
