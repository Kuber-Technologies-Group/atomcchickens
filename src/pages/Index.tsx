
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Egg, Book, Dna, MessageSquare } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />

      {/* Services Brief Section */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-charcoal mb-6">Our Services</h2>
            <p className="text-lg text-charcoal/80 max-w-2xl mx-auto font-inter">
              Professional poultry services tailored to your needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white/80 backdrop-blur hover:shadow-lg transition-all">
              <CardContent className="p-6 text-center">
                <Egg className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-playfair text-xl font-bold text-charcoal mb-2">Incubation Services</h3>
                <p className="text-charcoal/80">Professional hatching with state-of-the-art equipment</p>
              </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur hover:shadow-lg transition-all">
              <CardContent className="p-6 text-center">
                <Dna className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-playfair text-xl font-bold text-charcoal mb-2">Breeding Program</h3>
                <p className="text-charcoal/80">Expert breeding for quality and genetic diversity</p>
              </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur hover:shadow-lg transition-all">
              <CardContent className="p-6 text-center">
                <MessageSquare className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-playfair text-xl font-bold text-charcoal mb-2">Consultation</h3>
                <p className="text-charcoal/80">Professional guidance for your poultry venture</p>
              </CardContent>
            </Card>
          </div>
          <div className="text-center mt-12">
            <Link to="/services">
              <Button className="bg-warmBrown hover:bg-warmBrown/90 text-white">
                Explore All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Breeds Brief Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-charcoal mb-6">Featured Breeds</h2>
            <p className="text-lg text-charcoal/80 max-w-2xl mx-auto font-inter">
              Discover our exceptional collection of heritage chicken breeds
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="overflow-hidden hover:shadow-lg transition-all">
              <div className="h-48">
                <img 
                  src="https://images.unsplash.com/photo-1465379944081-7f47de8d74ac"
                  alt="Orpingtons"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="font-playfair text-xl font-bold text-charcoal mb-2">Orpingtons</h3>
                <p className="text-charcoal/80 mb-4">Known for their gentle nature and exceptional laying capabilities</p>
              </CardContent>
            </Card>
            <Card className="overflow-hidden hover:shadow-lg transition-all">
              <div className="h-48">
                <img 
                  src="https://images.unsplash.com/photo-1438565434616-3ef039228b15"
                  alt="Columbian Brahmas"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="font-playfair text-xl font-bold text-charcoal mb-2">Columbian Brahmas</h3>
                <p className="text-charcoal/80 mb-4">Majestic and imposing gentle giants</p>
              </CardContent>
            </Card>
            <Card className="overflow-hidden hover:shadow-lg transition-all">
              <div className="h-48">
                <img 
                  src="https://images.unsplash.com/photo-1466721591366-2d5fba72006d"
                  alt="Sussex"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="font-playfair text-xl font-bold text-charcoal mb-2">Sussex</h3>
                <p className="text-charcoal/80 mb-4">Perfect dual-purpose birds for small homesteads</p>
              </CardContent>
            </Card>
          </div>
          <div className="text-center mt-12">
            <Link to="/breeds">
              <Button className="bg-warmBrown hover:bg-warmBrown/90 text-white">
                View All Breeds
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Invite Section */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Book className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="font-playfair text-4xl font-bold text-charcoal mb-6">Read Our Blog</h2>
            <p className="text-lg text-charcoal/80 max-w-2xl mx-auto font-inter mb-8">
              Stay updated with the latest insights, tips, and stories from our poultry farm. 
              Learn about breed characteristics, care techniques, and success stories.
            </p>
            <Link to="/blog">
              <Button className="bg-warmBrown hover:bg-warmBrown/90 text-white">
                Visit Our Blog
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
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
    </div>
  );
};

export default Index;
