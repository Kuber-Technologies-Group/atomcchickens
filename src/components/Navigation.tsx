
import { useState, useEffect } from 'react';
import { Menu, X, LogIn, LogOut, User, Images } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// TODO: Add A Gallery of Pictures
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
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

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const navLinks = [
    { name: "Breeds", href: "/breeds" },
    { name: "Gallery", href: "/gallery", icon: <Images className="h-4 w-4 mr-1 inline" /> },
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
              Atomc Chickens
              {/* <img 
                  src="/Atomc Chickens Logo @250.png"
                  alt="Australorps"
                  className="w-full h-full object-cover"
                /> */}
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
            
            {/* User Authentication - Desktop */}
            {isBlogPage && (
              <>
                {currentUser ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="rounded-full w-10 h-10 p-0">
                        {currentUser.photoURL ? (
                          <img 
                            src={currentUser.photoURL} 
                            alt={currentUser.displayName || "User"} 
                            className="rounded-full w-full h-full object-cover"
                          />
                        ) : (
                          <User className="h-5 w-5" />
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="text-sm text-center font-medium">
                        {currentUser.displayName || currentUser.email}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Logout</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button 
                    onClick={handleOpenAuthForm}
                    className="bg-warmBrown hover:bg-warmBrown/90 text-white"
                    size="sm"
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                )}
              </>
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
              
              {/* User Authentication - Mobile */}
              {isBlogPage && (
                <>
                  {currentUser ? (
                    <div className="px-3 py-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                            {currentUser.photoURL ? (
                              <img 
                                src={currentUser.photoURL} 
                                alt={currentUser.displayName || "User"} 
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-warmBrown text-white flex items-center justify-center">
                                <User className="h-4 w-4" />
                              </div>
                            )}
                          </div>
                          <span className="text-sm font-medium truncate max-w-[120px]">
                            {currentUser.displayName || currentUser.email}
                          </span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={handleLogout}
                          className="text-red-500 hover:text-red-700"
                        >
                          <LogOut className="h-4 w-4 mr-1" />
                          Logout
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button 
                      onClick={handleOpenAuthForm}
                      className="w-full bg-warmBrown hover:bg-warmBrown/90 text-white mt-2"
                      size="sm"
                    >
                      <LogIn className="h-4 w-4 mr-2" />
                      Login
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
