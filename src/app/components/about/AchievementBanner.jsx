export default function AchievementBanner() {
  return (
    <div className="mb-20 -mx-6 md:mx-0">
      <div className="bg-teal-700 text-white px-8 py-6 md:px-12 md:py-8 relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-xs font-bold uppercase tracking-widest mb-2 opacity-80">
            Major Achievement
          </p>
          <h2 className="font-serif text-2xl md:text-4xl font-bold mb-2">
            Documenta 15, Kassel, Germany
          </h2>
          <p className="font-sans text-sm md:text-base font-light opacity-90">
            Participated as member of Wajukuu Arts Collective — Winner, 2022
          </p>
        </div>
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      </div>
    </div>
  );
}
