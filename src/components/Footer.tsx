
import { Link } from "react-router-dom";

const Footer = () => {
  return (
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
  );
};

export default Footer;
