import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Egg, Book, Dna, MessageSquare, Heart, Star, Images } from "lucide-react";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />

      {/* About Us Section */}
      <section id="about-us" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="font-playfair text-sm font-semibold text-warmBrown mb-2">ABOUT US</div>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-charcoal mb-6">Pioneering Indigenous Poultry Breeding</h2>
              <p className="text-lg text-charcoal/80 mb-6 font-inter">
                AtomC_hickens is a premier Indigenous Poultry Company based in Bulawayo, Zimbabwe, 
                specializing in the breeding and supply of exceptional roadrunner chickens since 2014.
              </p>
              <p className="text-lg text-charcoal/80 mb-8 font-inter">
                Our passion for quality poultry breeding has established us as leaders in the industry, 
                combining traditional wisdom with modern breeding techniques.
              </p>
              <div className="flex gap-4">
                <div className="flex items-center">
                  <Heart className="text-warmBrown w-5 h-5 mr-2" />
                  <span className="font-semibold">Honest</span>
                </div>
                <div className="flex items-center">
                  <Star className="text-warmBrown w-5 h-5 mr-2" />
                  <span className="font-semibold">Professional</span>
                </div>
              </div>
              <div className="mt-8">
                <Link to="/about">
                  <Button className="bg-warmBrown hover:bg-warmBrown/90 text-white">
                    Learn More About Us
                  </Button>
                </Link>
              </div>
            </div>
            <div className="order-1 lg:order-2 relative">
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="https://cdn.pixabay.com/photo/2016/11/29/05/25/chicken-1867521_1280.jpg" 
                  alt="AtomC_hickens farm" 
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-cream p-4 rounded-lg shadow-lg hidden md:block">
                <div className="font-bold text-3xl text-warmBrown">10+</div>
                <div className="text-charcoal text-sm">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                  src="https://cdn.pixabay.com/photo/2015/11/20/12/54/bird-1053045_1280.jpg"
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
                  src="https://cdn.pixabay.com/photo/2019/03/10/17/38/hen-brahma-4046755_1280.jpg"
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
                  src="https://cdn.pixabay.com/photo/2017/09/08/19/57/hen-2729941_1280.jpg"
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

      {/* Gallery Preview Section */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Images className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="font-playfair text-4xl font-bold text-charcoal mb-6">Chicken Gallery</h2>
            <p className="text-lg text-charcoal/80 max-w-2xl mx-auto font-inter mb-8">
              Explore our beautiful collection of chicken breeds in our photo gallery.
              Discover the unique characteristics and beauty of each breed.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="overflow-hidden hover:shadow-lg transition-all">
              <div className="h-48">
                <img 
                  src="https://cdn.pixabay.com/photo/2016/11/29/05/25/chicken-1867521_1280.jpg"
                  alt="Orpingtons"
                  className="w-full h-full object-cover"
                />
              </div>
            </Card>
            <Card className="overflow-hidden hover:shadow-lg transition-all">
              <div className="h-48">
                <img 
                  src="https://cdn.pixabay.com/photo/2019/03/10/17/38/hen-brahma-4046755_1280.jpg"
                  alt="Columbian Brahmas"
                  className="w-full h-full object-cover"
                />
              </div>
            </Card>
            <Card className="overflow-hidden hover:shadow-lg transition-all">
              <div className="h-48">
                <img 
                  src="https://cdn.pixabay.com/photo/2017/09/08/19/57/hen-2729941_1280.jpg"
                  alt="Sussex"
                  className="w-full h-full object-cover"
                />
              </div>
            </Card>
          </div>
          <div className="text-center mt-12">
            <Link to="/gallery">
              <Button className="bg-warmBrown hover:bg-warmBrown/90 text-white">
                <Images className="mr-2 h-4 w-4" />
                View Full Gallery
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

      <Footer />
    </div>
  );
};

export default Index;
