import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-charcoal text-white py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <h3 className="font-playfair text-xl font-bold mb-4">Atomc Chickens</h3>
          <p className="text-white/80 font-inter">
            Premier exotic poultry breeding and services, Bulawayo, Zimbabwe.
          </p>
        </div>
        <div>
          <h4 className="font-playfair text-lg font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2 font-inter">
            <li><Link to="/breeds" className="text-white/80 hover:text-white transition-colors">Breeds</Link></li>
            <li><Link to="/services" className="text-white/80 hover:text-white transition-colors">Services</Link></li>
            <li><Link to="/blog" className="text-white/80 hover:text-white transition-colors">Blog</Link></li>
            <li><Link to="/about" className="text-white/80 hover:text-white transition-colors">About</Link></li>
            <li><Link to="/contact" className="text-white/80 hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-playfair text-lg font-bold mb-4">Services</h4>
          <ul className="space-y-2 font-inter text-white/80">
            <li>Incubation Services</li>
            <li>Breeding Program</li>
            <li>Brooding Services</li>
            <li>Consultation</li>
          </ul>
        </div>
        <div>
          <h4 className="font-playfair text-lg font-bold mb-4">Contact</h4>
          <ul className="space-y-2 font-inter text-white/80">
            <li>
              <a href="mailto:sales@atomcchickens.co.zw" className="hover:text-white transition-colors">
                sales@atomcchickens.co.zw
              </a>
            </li>
            <li>
              <a href="tel:+263772664960" className="hover:text-white transition-colors">+263 772 664 960</a>
            </li>
            <li>
              <a href="tel:+263779146262" className="hover:text-white transition-colors">+263 779 146 262</a>
            </li>
            <li>3 Joubert Avenue, Bulawayo</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/20 mt-12 pt-8 text-center text-white/60 font-inter">
        <p>&copy; {new Date().getFullYear()} Atomc Chickens. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
