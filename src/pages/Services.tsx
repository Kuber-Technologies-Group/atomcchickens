import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Egg, Sprout, Dna, Users } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

const services = [
  {
    title: "Incubation Services",
    description: "Professional hatching services with state-of-the-art incubation equipment, ensuring optimal conditions for successful hatching of your precious eggs.",
    icon: Egg,
    features: [
      "Temperature and humidity monitoring",
      "Regular egg turning",
      "Candling services",
      "Hatch day management"
    ]
  },
  {
    title: "Brooding Services",
    description: "Expert care for your newly hatched chicks during their crucial first weeks of life, providing the perfect environment for healthy growth.",
    icon: Sprout,
    features: [
      "Temperature-controlled environment",
      "Proper nutrition management",
      "Health monitoring",
      "Growth tracking"
    ]
  },
  {
    title: "Breeding Program",
    description: "Specialized breeding services focusing on producing high-quality roadrunner chickens while maintaining genetic diversity and desirable traits.",
    icon: Dna,
    features: [
      "Selective breeding",
      "Genetic diversity maintenance",
      "Quality control",
      "Breed improvement"
    ]
  },
  {
    title: "Consultation Services",
    description: "Expert guidance on all aspects of poultry farming, from breed selection to farm management, tailored to your specific needs.",
    icon: Users,
    features: [
      "Farm setup guidance",
      "Health management advice",
      "Breeding consultations",
      "Business planning support"
    ]
  }
];

const Services = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative pt-32 bg-cream">
        <div className="absolute inset-0 bg-[url('https://cdn.pixabay.com/photo/2020/05/16/20/13/chicks-5179055_1280.jpg')] bg-cover bg-center bg-no-repeat opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-charcoal mb-6">Our Services</h1>
            <p className="text-lg text-charcoal/80 max-w-2xl mx-auto font-inter">
              Comprehensive poultry services from expert breeders, ensuring the highest quality care for your birds
            </p>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card 
                key={service.title}
                className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardHeader className="bg-cream rounded-t-lg p-6">
                  <div className="flex items-center gap-4">
                    <service.icon className="w-8 h-8 text-warmBrown" />
                    <h3 className="font-playfair text-2xl font-bold text-charcoal">{service.title}</h3>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-charcoal/80 mb-6 font-inter">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-charcoal/80 font-inter">
                        <div className="w-2 h-2 bg-mutedGold rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <h2 className="font-playfair text-3xl font-bold text-charcoal mb-6">Ready to Get Started?</h2>
            <p className="text-lg text-charcoal/80 mb-8 max-w-2xl mx-auto font-inter">
              Contact us to discuss how we can help with your poultry needs
            </p>
            <Link to="/contact">
              <Button className="bg-warmBrown hover:bg-warmBrown/90 text-white font-inter">
                Contact Us Today
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
