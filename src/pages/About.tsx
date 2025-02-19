
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative pt-32 bg-cream">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516467508483-a7212febe31a')] bg-cover bg-center bg-no-repeat opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-charcoal mb-6">Our Story</h1>
            <p className="text-lg text-charcoal/80 max-w-2xl mx-auto font-inter">
              Pioneering indigenous poultry breeding in Zimbabwe since 2014
            </p>
          </div>
        </div>
      </div>

      {/* Vision & Mission Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Vision */}
            <div className="bg-cream p-8 rounded-lg animate-fade-in">
              <h2 className="font-playfair text-3xl font-bold text-charcoal mb-6">The Vision</h2>
              <p className="text-charcoal/80 font-inter leading-relaxed">
                AtomC_hickens is an Indigenous Poultry Company based in Bulawayo, the second largest city in Zimbabwe, 
                that specialises in the breeding and supplying of day old road runner chicks. The Company was established 
                in January 2014 with our Vision being to be the leading road runner supplier of unique organic chicken 
                breeds and the provision of quality services to our customers.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-cream p-8 rounded-lg animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <h2 className="font-playfair text-3xl font-bold text-charcoal mb-6">The Mission</h2>
              <p className="text-charcoal/80 font-inter leading-relaxed">
                To provide unique, comprehensive and quality service in breeding rare roadrunner chickens for 
                showcasing as well as for both meat and egg.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-warmBrown/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="font-playfair text-3xl font-bold text-charcoal">Our Values</h2>
            <div className="mt-8 max-w-2xl mx-auto">
              <p className="text-lg text-charcoal/80 font-inter">
                We value professionalism and honesty as we discharge our duties
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="bg-white p-8 rounded-lg shadow-sm animate-fade-in">
              <h3 className="font-playfair text-xl font-semibold text-charcoal mb-4">Professionalism</h3>
              <p className="text-charcoal/80 font-inter">
                We maintain the highest standards in our breeding practices and customer service.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <h3 className="font-playfair text-xl font-semibold text-charcoal mb-4">Honesty</h3>
              <p className="text-charcoal/80 font-inter">
                We believe in transparent communication and building trust with our customers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-3xl font-bold text-charcoal mb-6">Ready to Start Your Journey?</h2>
          <p className="text-lg text-charcoal/80 mb-8 max-w-2xl mx-auto font-inter">
            Join us in our mission to provide the finest roadrunner chickens in Zimbabwe.
          </p>
          <Button className="bg-warmBrown hover:bg-warmBrown/90 text-white font-inter">
            Contact Us Today
          </Button>
        </div>
      </section>
    </div>
  );
};

export default About;
