
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { Book } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen flex flex-col bg-background transition-colors duration-300">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-10 w-full bg-gradient-to-r from-teal-500 to-blue-500 shadow-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Book className="h-6 w-6 text-white" />
              <span className="text-xl font-bold text-white">Easy Learn</span>
            </Link>
            
            <div className="flex items-center gap-4">
              <nav className="hidden md:flex items-center space-x-6">
                <NavLink to="/" isActive={location.pathname === '/'}>Home</NavLink>
                <NavLink to="/learn" isActive={location.pathname === '/learn'}>Learn</NavLink>
                <NavLink to="/contribute" isActive={location.pathname === '/contribute'}>Contribute</NavLink>
              </nav>
              <ThemeToggle />
              
              {/* Mobile Menu Button - will be implemented in a real application */}
              <button className="md:hidden p-1 rounded-md text-white hover:bg-white/20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Mobile Navigation - simplified for demo */}
          <div className="md:hidden flex justify-center space-x-6 mt-2">
            <NavLink to="/" isActive={location.pathname === '/'}>Home</NavLink>
            <NavLink to="/learn" isActive={location.pathname === '/learn'}>Learn</NavLink>
            <NavLink to="/contribute" isActive={location.pathname === '/contribute'}>Contribute</NavLink>
          </div>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-6">
        {children}
      </main>
      
      <footer className="bg-muted py-4 text-center text-sm text-muted-foreground">
        <div className="container mx-auto">
          <p>© 2023 Easy Learn | Hackathon Demo Project</p>
        </div>
      </footer>
    </div>
  );
};

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  isActive: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ to, children, isActive }) => {
  return (
    <Link
      to={to}
      className={`text-white text-sm font-medium transition-all duration-200 hover:text-white/80 relative ${
        isActive ? 'font-bold' : ''
      }`}
    >
      {children}
      {isActive && (
        <span className="absolute bottom-[-8px] left-0 w-full h-1 bg-white rounded-full"></span>
      )}
    </Link>
  );
};

export default Layout;
