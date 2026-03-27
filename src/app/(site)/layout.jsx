import GlobalNav from '../components/GlobalNav'
import Footer from '../components/Footer'

export default function SiteLayout({ children }) {
  return (
    <>
      {/* Global Navigation */}
      <GlobalNav theme="dark" variant="inner" />

      {/* Main Content Area */}
      <div>
        {children}
      </div>

      {/* Footer on all inner pages */}
      <Footer />
    </>
  )
}
