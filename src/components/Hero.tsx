
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const Hero = () => {
  const scrollToBreeds = () => {
    const breedsSection = document.getElementById('breeds');
    breedsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-cream">
      <div className="absolute inset-0 bg-[url('https://cdn.pixabay.com/photo/2022/04/03/19/22/bird-7109752_1280.jpg')] bg-cover bg-center bg-no-repeat opacity-20" />
      
      <div className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 lg:pb-32 min-h-screen flex flex-col justify-center">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <div className="mx-auto max-w-2xl animate-fade-in-slow">
            <h1 className="font-playfair text-4xl font-bold tracking-tight text-charcoal sm:text-6xl mb-6">
              Premier Exotic Poultry Breeding
            </h1>
            <p className="font-inter text-lg leading-8 text-charcoal/80 mb-10">
              Discover our exceptional collection of Orpingtons, Columbian Brahmas, and more. 
              Experience the artistry of professional poultry breeding.
            </p>
            <div className="flex justify-center gap-6">
              <Button 
                onClick={scrollToBreeds}
                className="bg-warmBrown hover:bg-warmBrown/90 text-white font-inter"
              >
                Explore Our Breeds
              </Button>
              <Button 
                variant="outline"
                className="border-warmBrown text-warmBrown hover:bg-warmBrown/10"
              >
                Book Consultation
              </Button>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-charcoal/60" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
