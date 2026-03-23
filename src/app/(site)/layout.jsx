import GlobalNav from '../components/GlobalNav'

export default function SiteLayout({ children }) {
  return (
    <>
      {/* Global Navigation replacing the disjointed Sidebar */}
      <GlobalNav theme="dark" variant="inner" />
      
      {/* Main Content Area */}
      <div>
        {children}
      </div>
    </>
  )
}