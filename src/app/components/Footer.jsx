'use client'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { name: 'Instagram', href: 'https://instagram.com/freshianjeri' },
    { name: 'LinkedIn', href: 'https://linkedin.com/in/freshianjeri' },
    { name: 'Behance', href: 'https://behance.net/freshianjeri' },
  ]

  return (
    <footer className="w-full bg-white border-t-2 border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
        {/* Main Credit Line */}
        <div className="text-center mb-8">
          <p className="text-sm md:text-base text-gray-500 font-light tracking-wide">
            Wajukuu Arts Collective · Nairobi, Kenya · {currentYear}
          </p>
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center space-x-8 md:space-x-10 mb-8">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm md:text-base text-gray-500 hover:text-teal-700 transition-colors duration-300 font-light relative group"
            >
              {link.name}
              {/* Underline on hover */}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-teal-700 group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-xs text-gray-400 font-light">
            © {currentYear} Freshia Njeri. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}