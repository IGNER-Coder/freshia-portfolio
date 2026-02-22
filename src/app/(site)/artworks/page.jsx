export default function ArtworksPage() {
  return (
    <div className="px-6 md:px-12 py-20 md:py-24 max-w-7xl mx-auto min-h-screen">
      <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-gray-900">
        Artworks
      </h1>
      
      <p className="text-lg text-gray-600 mb-12 max-w-2xl">
        A collection of visual explorations in abstract expression, using blues, greys, 
        and textures to convey emotion and depth.
      </p>

      {/* Placeholder Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div 
            key={item} 
            className="aspect-[4/5] bg-gray-100 rounded-lg flex items-center justify-center group hover:bg-gray-200 transition-colors duration-300"
          >
            <span className="text-gray-400 font-light">Project {item}</span>
          </div>
        ))}
      </div>
    </div>
  )
}