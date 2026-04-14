export default function CommunityEducation() {
  return (
    <section className="mb-16">
      <h3 className="font-serif text-4xl md:text-5xl mb-12">Community & Education</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-4">
          <div className="inline-block px-3 py-1 bg-teal-700/10 text-teal-700 text-xs font-bold uppercase tracking-wider mb-2">
            Leadership
          </div>
          <h4 className="font-serif text-2xl text-slate-900">Wajukuu Arts Kids Club</h4>
          <p className="font-sans text-base font-light text-slate-600 leading-relaxed">
            As the leader of the Kids Club, Freshia creates space for young artists to explore their creativity freely. Through weekly workshops, she introduces children to various techniques while encouraging them to develop their own artistic voices. Her teaching philosophy mirrors her learning journey: art as a communal practice, accessible to all.
          </p>
        </div>

        <div className="space-y-4">
          <div className="inline-block px-3 py-1 bg-teal-700/10 text-teal-700 text-xs font-bold uppercase tracking-wider mb-2">
            Philosophy
          </div>
          <h4 className="font-serif text-2xl text-slate-900">Self-Taught Practice</h4>
          <p className="font-sans text-base font-light text-slate-600 leading-relaxed">
            Freshia's self-taught journey challenges traditional narratives about artistic education. Her work demonstrates that rigorous artistic practice can emerge from community-based learning, collective critique, and sustained personal dedication. This approach informs both her art-making and her teaching methodology.
          </p>
        </div>
      </div>
    </section>
  )
}
