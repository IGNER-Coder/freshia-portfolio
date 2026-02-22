export default function ContactPage() {
  return (
    <div className="px-6 md:px-12 py-20 md:py-24 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-4xl md:text-6xl font-serif font-bold mb-8 text-gray-900">
        Contact
      </h1>
      
      <p className="text-lg text-gray-600 mb-16">
        Get in touch for commissions, exhibitions, or collaborations.
      </p>

      <div className="space-y-8">
        {/* Email */}
        <div>
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Email
          </h3>
          <a 
            href="mailto:hello@freshianjeri.com" 
            className="text-xl text-gray-900 hover:text-teal-700 transition-colors"
          >
            hello@freshianjeri.com
          </a>
        </div>

        {/* Location */}
        <div>
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Location
          </h3>
          <p className="text-xl text-gray-900">
            Nairobi, Kenya
          </p>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Connect
          </h3>
          <div className="flex flex-col space-y-2">
            <a 
              href="https://instagram.com/freshianjeri" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg text-gray-600 hover:text-teal-700 transition-colors"
            >
              Instagram
            </a>
            <a 
              href="https://linkedin.com/in/freshianjeri" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg text-gray-600 hover:text-teal-700 transition-colors"
            >
              LinkedIn
            </a>
            <a 
              href="https://behance.net/freshianjeri" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg text-gray-600 hover:text-teal-700 transition-colors"
            >
              Behance
            </a>
          </div>
        </div>

        {/* Availability Status */}
        <div className="mt-12 pt-12 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-sm text-gray-600">
              Available for projects
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}