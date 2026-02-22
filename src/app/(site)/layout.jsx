import Header from '../components/Header'

export default function SiteLayout({ children }) {
  return (
    <>
      {/* Header appears on all pages in (site) folder */}
      <Header />
      
      {/* Content with left margin for desktop vertical nav */}
      <div className="md:ml-[60px]">
        {children}
      </div>
    </>
  )
}