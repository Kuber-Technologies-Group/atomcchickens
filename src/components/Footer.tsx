
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { LoginForm, SignupForm } from "@/components/blog/AuthForms";
import { useAuth } from "@/contexts/AuthContext";
import { X } from "lucide-react";

const Footer = () => {
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const { currentUser } = useAuth();
  const location = useLocation();
  
  // Handle login parameter in URL
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const loginParam = urlParams.get('login');
    
    if (loginParam === 'true' && !currentUser) {
      setShowAuthForm(true);
      setIsLogin(true);
    }
  }, [location.search, currentUser]);
  
  return (
    <>
      <footer className="bg-charcoal text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <h3 className="font-playfair text-xl font-bold mb-4">AtomicChickens</h3>
              <p className="text-white/80 font-inter">
                Premier exotic poultry breeding and services
              </p>
            </div>
            <div>
              <h4 className="font-playfair text-lg font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 font-inter">
                <li><Link to="/breeds" className="text-white/80 hover:text-white transition-colors">Breeds</Link></li>
                <li><Link to="/services" className="text-white/80 hover:text-white transition-colors">Services</Link></li>
                <li><Link to="/blog" className="text-white/80 hover:text-white transition-colors">Blog</Link></li>
                <li><Link to="/about" className="text-white/80 hover:text-white transition-colors">About</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-playfair text-lg font-bold mb-4">Services</h4>
              <ul className="space-y-2 font-inter">
                <li className="text-white/80">Incubation Services</li>
                <li className="text-white/80">Breeding Program</li>
                <li className="text-white/80">Consultation</li>
                <li className="text-white/80">Health Monitoring</li>
              </ul>
            </div>
            <div>
              <h4 className="font-playfair text-lg font-bold mb-4">Contact</h4>
              <ul className="space-y-2 font-inter">
                <li className="text-white/80">Email: info@atomicchickens.com</li>
                <li className="text-white/80">Phone: (555) 123-4567</li>
                <li className="text-white/80">Address: 123 Farm Road</li>
                <li className="text-white/80">City, State 12345</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 mt-12 pt-8 text-center text-white/60 font-inter">
            <p>&copy; {new Date().getFullYear()} AtomicChickens. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Authentication Modal */}
      {showAuthForm && !currentUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
            <Button 
              variant="ghost" 
              className="absolute top-2 right-2"
              onClick={() => {
                setShowAuthForm(false);
                // Clean up URL if we opened via URL parameter
                if (location.search.includes('login=true')) {
                  window.history.pushState({}, "", location.pathname);
                }
              }}
            >
              <X className="h-4 w-4" />
            </Button>
            {isLogin ? (
              <LoginForm onToggle={() => setIsLogin(false)} />
            ) : (
              <SignupForm onToggle={() => setIsLogin(true)} />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
