import { Link, NavLink } from 'react-router-dom';

const NavBar = () => {
  // Helper to add classes for active links
  const getLinkClass = ({ isActive }) => 
    isActive 
      ? "text-blue-400 font-bold border-b-2 border-blue-400 pb-1" 
      : "text-slate-300 hover:text-white transition-colors duration-200";

  return (
    <nav className="bg-slate-800 shadow-lg border-b border-slate-700 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Brand Name */}
          <Link to="/" className="text-2xl font-bold text-white tracking-wider">
            ❄️ Ice & Fire <span className="text-blue-500">Wiki</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <NavLink to="/" className={getLinkClass}>
                Home  |  
            </NavLink>
            <NavLink to="/characters" className={getLinkClass}>
                |  Characters  |   
            </NavLink>
            <NavLink to="/houses" className={getLinkClass}>
                |  Houses  |  
            </NavLink>
            <NavLink to="/books" className={getLinkClass}>
                |  Books  
            </NavLink>
          </div>
          
          {/* Mobile Menu Placeholder (Optional for simple responsive design) */}
          <div className="md:hidden text-gray-400">
            {/* You can implement a hamburger menu here later if needed */}
            <span className="text-sm">Menu</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;