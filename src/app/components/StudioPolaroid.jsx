import Image from 'next/image'

// Uses direct Cloudinary URL instead of CldImage to avoid
// NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME requirement at build time
export default function StudioPolaroid() {
  return (
    <div className="w-full max-w-xs aspect-[4/3] bg-white p-3 shadow-xl rotate-1 hover:rotate-0 transition-transform duration-500 relative">
      <div className="relative w-full h-full overflow-hidden">
        <Image
          src="https://res.cloudinary.com/doevklqj6/image/upload/w_800,h_600,c_fill,g_center,q_auto,f_auto/IMG_5800_1_zgfeba"
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
  )
}
