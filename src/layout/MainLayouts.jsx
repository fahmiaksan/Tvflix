import NavigationBar from "../components/Navbar";
import PropTypes from 'prop-types';
function MainLayouts({ hero, children }) {
  return (
    <div>
      <NavigationBar />
      <main className="px-6 overflow-x-hidden pb-16 border-t-1 border-t-slate-600">
        {
          hero && (
            <div className="min-h-[200px] md:min-h-[300px] lg:min-h-[430px]">
              {hero}
            </div>
          )
        }
        <div className="container mx-auto max-w-5xl mt-10">{children}</div>
      </main>
    </div>
  )
}

MainLayouts.propTypes = {
  hero: PropTypes.element,
}

export default MainLayouts