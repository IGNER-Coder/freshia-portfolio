import AboutMasthead from '../../components/about/AboutMasthead';
import AchievementBanner from '../../components/about/AchievementBanner';
import ArtistBiography from '../../components/about/ArtistBiography';
import CommunityEducation from '../../components/about/CommunityEducation';
import TechniqueSection from '../../components/about/TechniqueSection';
import ExhibitionsList from '../../components/about/ExhibitionsList';

export const metadata = {
  title: 'About | Freshia Njeri',
  description: 'Self-taught visual artist and educator based in Nairobi, Kenya. Participant at Documenta 15 with Wajukuu Arts Collective.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-900 selection:bg-teal-700 selection:text-white">
      <AboutMasthead />

      <main className="max-w-7xl mx-auto px-6 py-16 md:px-16 lg:px-24 pb-24">
        {/* Documenta 15 achievement banner */}
        <AchievementBanner />

        {/* Portrait + biography */}
        <ArtistBiography />

        {/* Visual divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent mb-20" />

        {/* Community & education */}
        <CommunityEducation />

        {/* Technique */}
        <TechniqueSection />

        {/* Exhibitions */}
        <ExhibitionsList />
      </main>
    </div>
  );
}
