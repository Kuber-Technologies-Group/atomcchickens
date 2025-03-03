
import { useState, useEffect } from 'react';
import { Menu, X, LogIn } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthForm, setShowAuthForm] = useState(false);
  const { currentUser } = useAuth();
  const location = useLocation();
  const isBlogPage = location.pathname === "/blog" || location.pathname.startsWith("/blog/");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenAuthForm = () => {
    // Just set a flag in URL that Blog.tsx will read
    if (location.pathname === "/blog") {
      window.history.pushState({}, "", "/blog?login=true");
      window.dispatchEvent(new Event('popstate'));
    } else {
      // If we're on a blog post page, redirect to main blog with login flag
      window.location.href = "/blog?login=true";
    }
  };

  const navLinks = [
    { name: "Breeds", href: "/breeds" },
    { name: "Services", href: "/services" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="font-playfair text-2xl font-bold text-primary">
              AtomcChickens
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              link.href.startsWith('/') ? (
                <Link
                  key={link.name}
                  to={link.href}
                  className="font-inter text-charcoal/80 hover:text-primary transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className="font-inter text-charcoal/80 hover:text-primary transition-colors duration-200"
                >
                  {link.name}
                </a>
              )
            ))}
            {/* Login Button - Only show on blog page when not logged in */}
            {isBlogPage && !currentUser && (
              <Button 
                onClick={handleOpenAuthForm}
                className="bg-warmBrown hover:bg-warmBrown/90 text-white"
                size="sm"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-charcoal hover:text-primary hover:bg-cream focus:outline-none focus:ring-2 focus:ring-inset focus:ring-mutedGold"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 inset-x-0 bg-white/90 backdrop-blur-md shadow-lg animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                link.href.startsWith('/') ? (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="block px-3 py-2 text-charcoal/80 hover:text-primary hover:bg-cream font-inter"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block px-3 py-2 text-charcoal/80 hover:text-primary hover:bg-cream font-inter"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                )
              ))}
              {/* Login Button - Only show on blog page when not logged in */}
              {isBlogPage && !currentUser && (
                <Button 
                  onClick={handleOpenAuthForm}
                  className="w-full bg-warmBrown hover:bg-warmBrown/90 text-white mt-2"
                  size="sm"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
