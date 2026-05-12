import { useState, useEffect } from 'react';
import { Menu, X, LogIn, LogOut, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { LoginForm, SignupForm } from "@/components/blog/AuthForms";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { name: "Breeds", href: "/breeds" },
  { name: "Services", href: "/services" },
  { name: "Gallery", href: "/gallery" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);
  const { currentUser, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsMenuOpen(false); }, [location.pathname]);

  const handleLogout = async () => {
    try { await logout(); } catch (e) { console.error(e); }
  };

  const openLogin = () => { setIsLoginView(true); setShowAuthModal(true); };

  const displayName =
    currentUser?.user_metadata?.display_name ||
    currentUser?.email?.split("@")[0] ||
    "User";

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="font-playfair text-2xl font-bold text-primary flex items-center gap-2">
                Atomc Chickens
                <img src="/img/Atomc Kenge.png" alt="Logo" className="w-auto h-9 inline-block" />
              </Link>
            </div>

            {/* Desktop nav */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              {navLinks.map(link => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`font-inter transition-colors duration-200 ${location.pathname.startsWith(link.href) && link.href !== '/' ? 'text-primary font-medium' : 'text-charcoal/80 hover:text-primary'}`}
                >
                  {link.name}
                </Link>
              ))}
              {currentUser ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="rounded-full w-10 h-10 p-0">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="text-sm text-charcoal/60">{displayName}</DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button onClick={openLogin} className="bg-warmBrown hover:bg-warmBrown/90 text-white" size="sm">
                  <LogIn className="h-4 w-4 mr-2" />Login
                </Button>
              )}
            </div>

            {/* Mobile burger */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-charcoal hover:text-primary hover:bg-cream focus:outline-none"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-16 inset-x-0 bg-white/95 backdrop-blur-md shadow-lg">
              <div className="px-4 pt-2 pb-4 space-y-1">
                {navLinks.map(link => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="block px-3 py-2 text-charcoal/80 hover:text-primary hover:bg-cream font-inter rounded-md"
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="pt-2">
                  {currentUser ? (
                    <div className="flex items-center justify-between px-3 py-2">
                      <span className="text-sm font-medium">{displayName}</span>
                      <Button variant="ghost" size="sm" onClick={handleLogout} className="text-red-500 hover:text-red-700">
                        <LogOut className="h-4 w-4 mr-1" />Logout
                      </Button>
                    </div>
                  ) : (
                    <Button onClick={openLogin} className="w-full bg-warmBrown hover:bg-warmBrown/90 text-white" size="sm">
                      <LogIn className="h-4 w-4 mr-2" />Login
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-3 right-3 text-charcoal/50 hover:text-charcoal"
            >
              <X className="h-5 w-5" />
            </button>
            {isLoginView ? (
              <LoginForm
                onToggle={() => setIsLoginView(false)}
                onSuccess={() => setShowAuthModal(false)}
              />
            ) : (
              <SignupForm
                onToggle={() => setIsLoginView(true)}
                onSuccess={() => setShowAuthModal(false)}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
