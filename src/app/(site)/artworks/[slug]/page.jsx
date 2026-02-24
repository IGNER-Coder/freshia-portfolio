"use client";

import Link from 'next/link';
import { CldImage } from 'next-cloudinary';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';

// Initialize EmailJS (do this once in your app)
if (typeof window !== 'undefined') {
  emailjs.init('wI5n9eHN3gTjPCUZJ'); // Replace with your actual public key
}

// Mock Data (Replace with actual fetch/API call)
const artwork = {
  title: 'Echoes in the Void',
  year: '2025',
  medium: 'Acrylic & Cold Wax on Canvas',
  size: '120 x 150 cm',
  dimensions: { width: 120, height: 150, depth: 4 }, // In cm
  description: 'This piece explores the quiet isolation of urban expansion. The heavy layering of cold wax creates a topographical map of emotional memory, while the sudden interruptions of teal represent fleeting moments of clarity amid the grey.',
  longDescription: 'Created over the course of six weeks in early 2025, this work emerged from a period of deep reflection on urban transformation in Nairobi. The texture builds through repeated applications of acrylic medium, each layer representing a different temporal moment. The cold wax technique allows for both addition and subtraction, creating a physical archaeology of the painting process itself.',
  slug: 'echoes-in-the-void',
  status: 'Available', // Or 'Sold', 'Private Collection'
  cloudinaryId: 'homepage-background_jabt7w',
  price: 'Available upon request',
  framing: 'Unframed (framing available)',
  certificate: 'Certificate of authenticity included',
  tags: ['Abstract', 'Texture', 'Urban', 'Blue'],
};

// Related works (Mock - would come from CMS/API)
const relatedWorks = [
  { id: 2, title: 'Urban Memory', cloudinaryId: 'IMG-20250323-WA0003_odpeoj', slug: 'urban-memory' },
  { id: 5, title: 'The Weight of Grey', cloudinaryId: 'IMG_5801_gkh3yc', slug: 'weight-of-grey' },
  { id: 3, title: 'Silent Language', cloudinaryId: 'IMG_9581_qrcdfi', slug: 'silent-language' },
];

// --- 1. SHARE BUTTONS COMPONENT ---
export function ShareButtons({ artwork, pageUrl }) {
  const [copied, setCopied] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  // Build share URLs
  const shareUrl = pageUrl || (typeof window !== 'undefined' ? window.location.href : '');
  const shareTitle = `${artwork.title} by Freshia Njeri`;
  const shareText = `Check out "${artwork.title}" - ${artwork.description?.substring(0, 100)}...`;

  // Social share URLs
  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&description=${encodeURIComponent(shareTitle)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}`,
    email: `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl
        });
      } catch (err) {
        console.log('Share cancelled or failed:', err);
      }
    }
  };

  return (
    <div className="relative z-50">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="text-slate-400 hover:text-teal-700 transition-colors flex items-center gap-2"
        aria-label="Share"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
      </button>

      {showMenu && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
          <div className="absolute right-0 top-full mt-2 w-56 bg-white border-2 border-slate-200 shadow-lg z-50 p-2">
            <div className="space-y-1">
              {typeof navigator !== 'undefined' && navigator.share && (
                <button
                  onClick={handleNativeShare}
                  className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-teal-50 hover:text-teal-700 transition-colors flex items-center gap-3"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Share...
                </button>
              )}
              <button
                onClick={copyToClipboard}
                className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-teal-50 hover:text-teal-700 transition-colors flex items-center gap-3"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                {copied ? '✓ Copied!' : 'Copy Link'}
              </button>
              <div className="border-t border-slate-200 my-1" />
              <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-teal-50 hover:text-teal-700 transition-colors flex items-center gap-3">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                Share on X
              </a>
              <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-teal-50 hover:text-teal-700 transition-colors flex items-center gap-3">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Share on WhatsApp
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// --- 2. ARTWORK INQUIRY FORM COMPONENT ---
export function ArtworkInquiryForm({ artwork }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: `I am interested in acquiring "${artwork.title}". Please send pricing and availability details.`
  });
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const result = await emailjs.send(
        'service_3buzk0g',
        'template_xcq528i',
        {
          from_name: formData.name,
          from_email: formData.email,
          artwork_title: artwork.title,
          artwork_size: artwork.size,
          artwork_medium: artwork.medium,
          message: formData.message,
          to_email: 'ignatiusndungu3@gmail.com'
        }
      );

      console.log('✅ Email sent successfully:', result.text);
      setStatus('success');
      
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'inquiry_submitted', {
          artwork_title: artwork.title,
        });
      }
    } catch (error) {
      console.error('❌ Email send failed:', error);
      setStatus('error');
    }
  };

  return (
    <div className="mt-8 bg-white border-2 border-slate-200 p-6 md:p-8 shadow-sm">
      <h3 className="font-serif text-2xl mb-6">Inquire About This Piece</h3>
      
      {/* Artwork Context with CldImage */}
      <div className="flex items-center gap-6 mb-8 p-4 bg-slate-50 border border-slate-100">
        <div className="w-16 h-20 bg-slate-200 shrink-0 relative overflow-hidden">
          <CldImage
            src={artwork.cloudinaryId}
            alt={artwork.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col">
          <span className="font-serif text-lg text-slate-900">{artwork.title}</span>
          <span className="font-sans text-xs font-light text-slate-500">{artwork.size}</span>
          <span className="font-sans text-xs font-bold text-teal-700 mt-1">
            {artwork.price || 'Available upon request'}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <input 
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full appearance-none rounded-none bg-transparent border-b border-slate-300 py-2 text-slate-900 font-sans text-sm focus:outline-none focus:border-teal-700 transition-colors"
            placeholder="Your Name"
            disabled={status === 'sending'}
          />
        </div>

        <div className="relative">
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full appearance-none rounded-none bg-transparent border-b border-slate-300 py-2 text-slate-900 font-sans text-sm focus:outline-none focus:border-teal-700 transition-colors"
            placeholder="Your Email Address"
            disabled={status === 'sending'}
          />
        </div>

        <div className="relative">
          <textarea 
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4" 
            required
            className="w-full appearance-none rounded-none bg-transparent border-b border-slate-300 py-2 text-slate-900 font-sans text-sm leading-relaxed focus:outline-none focus:border-teal-700 transition-colors resize-none"
            placeholder="Your message..."
            disabled={status === 'sending'}
          />
        </div>
        
        <button 
          type="submit" 
          disabled={status === 'sending' || status === 'success'}
          className={`w-full font-sans text-xs font-bold uppercase tracking-widest py-4 transition-all duration-300 ${
            status === 'success' 
              ? 'bg-green-600 text-white cursor-default' 
              : status === 'sending'
              ? 'bg-slate-400 text-white cursor-wait'
              : status === 'error'
              ? 'bg-red-600 text-white hover:bg-red-700'
              : 'bg-slate-900 text-white hover:bg-teal-700'
          }`}
        >
          {status === 'sending' && (
            <span className="inline-flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </span>
          )}
          {status === 'success' && '✓ Inquiry Sent Successfully!'}
          {status === 'error' && 'Failed to Send. Try Again?'}
          {status === 'idle' && 'Send Inquiry'}
        </button>
        
        {status === 'success' && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-sm">
            <p className="text-sm text-green-800 text-center">
              <strong>Thank you for your inquiry!</strong><br/>
              Freshia will respond to <strong>{formData.email}</strong> within 24 hours.
            </p>
          </div>
        )}
        
        {status === 'error' && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-sm">
            <p className="text-sm text-red-800 text-center">
              Something went wrong. Please try again or email directly at{' '}
              <a href="mailto:hello@freshianjeri.com" className="underline font-bold">
                hello@freshianjeri.com
              </a>
            </p>
          </div>
        )}
      </form>
    </div>
  );
}

// --- 3. MAIN PAGE COMPONENT ---
export default function ArtworkDetailPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-900 selection:bg-teal-700 selection:text-white pb-32">
      
      {/* BREADCRUMB */}
      <div className="px-6 pt-8 pb-4 md:px-16 lg:px-24 border-b border-slate-900/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 font-sans text-xs font-bold uppercase tracking-widest text-slate-400">
            <Link href="/artworks" className="hover:text-teal-700 transition-colors">Gallery</Link>
            <span>/</span>
            <span className="text-slate-900">{artwork.title}</span>
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            {/* Integrated Share Buttons Component */}
            <ShareButtons artwork={artwork} />
            
            <button className="text-slate-400 hover:text-teal-700 transition-colors" aria-label="Bookmark">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 pt-12 md:pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* LEFT COLUMN: Image (Sticky) */}
          <div className="lg:col-span-7">
            <div className="sticky top-24">
              <div 
                className="w-full aspect-[4/5] bg-white p-3 shadow-md cursor-zoom-in group relative overflow-hidden"
                onClick={() => setLightboxOpen(true)}
              >
                <CldImage
                  src={artwork.cloudinaryId}
                  alt={artwork.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/95 backdrop-blur-sm px-4 py-2 text-xs font-bold uppercase tracking-widest">
                    Click to Zoom
                  </div>
                </div>
              </div>

              <div className="mt-6 px-3 py-3 bg-slate-100/50 border border-slate-200/50">
                <p className="font-sans text-xs text-slate-600 mb-1">
                  <span className="font-bold">Actual Size:</span> {artwork.dimensions.width} x {artwork.dimensions.height} cm
                </p>
                <p className="font-sans text-xs text-slate-500">
                  (Approximately {Math.round(artwork.dimensions.width / 2.54)} x {Math.round(artwork.dimensions.height / 2.54)} inches)
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Details */}
          <div className="lg:col-span-5 flex flex-col gap-12 pt-4">
            
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="font-sans text-xs font-bold uppercase tracking-widest text-slate-400">
                  {artwork.year}
                </span>
                <span className="h-1 w-1 rounded-full bg-slate-300" />
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${artwork.status === 'Available' ? 'bg-green-500' : 'bg-slate-400'}`}></div>
                  <span className={`font-sans text-xs font-bold uppercase tracking-widest ${artwork.status === 'Available' ? 'text-teal-700' : 'text-slate-400'}`}>
                    {artwork.status}
                  </span>
                </div>
              </div>
              
              <h1 className="font-serif text-5xl md:text-6xl font-bold leading-tight mb-6">
                {artwork.title}
              </h1>
              
              <div className="flex flex-col gap-2 font-sans text-sm font-light uppercase tracking-widest text-slate-500 pb-8 border-b border-slate-900/10">
                <p>{artwork.medium}</p>
                <p>{artwork.size}</p>
                <p className="text-xs text-slate-400">{artwork.framing}</p>
              </div>
            </div>

            <div className="font-sans text-base text-slate-600 font-light leading-relaxed space-y-4">
              <p>{artwork.description}</p>
              
              <AnimatePresence>
                {showFullDescription && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    {artwork.longDescription}
                  </motion.p>
                )}
              </AnimatePresence>
              
              <button 
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-sm font-bold text-teal-700 hover:text-slate-900 transition-colors"
              >
                {showFullDescription ? 'Read Less ↑' : 'Read More →'}
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {artwork.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-sans uppercase tracking-wider">
                  {tag}
                </span>
              ))}
            </div>

            {/* Integrated ArtworkInquiryForm */}
            <ArtworkInquiryForm artwork={artwork} />

          </div>
        </div>

        {/* RELATED WORKS */}
        <section className="mt-32 border-t-2 border-slate-900/10 pt-20">
          <div className="flex items-baseline justify-between mb-12">
            <h2 className="font-serif text-4xl md:text-5xl">You May Also Like</h2>
            <Link 
              href="/artworks"
              className="font-sans text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-teal-700 transition-colors"
            >
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {relatedWorks.map(work => (
              <Link 
                key={work.id} 
                href={`/artworks/${work.slug}`}
                className="group"
              >
                <div className="aspect-[4/5] bg-white p-2 shadow-sm mb-4 overflow-hidden">
                  <div className="relative w-full h-full">
                    <CldImage
                      src={work.cloudinaryId}
                      alt={work.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                </div>
                <h3 className="font-serif text-xl text-slate-900 group-hover:text-teal-700 transition-colors">
                  {work.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>

        {/* BACK TO GALLERY */}
        <div className="mt-20 text-center">
          <Link 
            href="/artworks"
            className="inline-flex items-center gap-3 px-8 py-3 border-2 border-slate-900 text-sm font-bold uppercase tracking-widest text-slate-900 hover:bg-slate-900 hover:text-white transition-all duration-300"
          >
            ← Back to Gallery
          </Link>
        </div>
      </main>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-8"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              className="absolute top-8 right-8 text-white/70 hover:text-white text-4xl font-light"
              onClick={() => setLightboxOpen(false)}
            >
              ×
            </button>
            
            <div className="relative w-full h-full max-w-6xl max-h-[90vh]">
              <CldImage
                src={artwork.cloudinaryId}
                alt={artwork.title}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </div>
            
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-white">
              <p className="font-serif text-2xl mb-2">{artwork.title}</p>
              <p className="font-sans text-sm opacity-70">{artwork.size}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}