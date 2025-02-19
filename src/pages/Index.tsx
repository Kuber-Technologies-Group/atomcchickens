
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import BreedCard from "@/components/BreedCard";

const breeds = [
  {
    name: "Orpingtons",
    description: "Known for their gentle nature and exceptional egg-laying capabilities, our Orpingtons are bred for both beauty and functionality.",
    imageUrl: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac",
    traits: ["Gentle", "Good Layers", "Family Friendly"]
  },
  {
    name: "Columbian Brahmas",
    description: "Majestic and imposing, Columbian Brahmas are gentle giants that make excellent winter layers and stunning show birds.",
    imageUrl: "https://images.unsplash.com/photo-1438565434616-3ef039228b15",
    traits: ["Winter Hardy", "Show Quality", "Docile"]
  },
  {
    name: "Frizzle Orpingtons",
    description: "These unique birds feature distinctively curled feathers, combining the beloved Orpington temperament with extraordinary appearance.",
    imageUrl: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d",
    traits: ["Unique Appearance", "Friendly", "Hardy"]
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      
      {/* Breeds Section */}
      <section id="breeds" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <span className="font-inter text-mutedGold uppercase tracking-wider">Our Specialties</span>
            <h2 className="mt-2 font-playfair text-4xl font-bold text-charcoal">Exceptional Breeds</h2>
            <p className="mt-4 text-lg text-charcoal/80 max-w-2xl mx-auto font-inter">
              Discover our carefully curated selection of exotic poultry breeds, each chosen for their unique characteristics and exceptional qualities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {breeds.map((breed, index) => (
              <div key={breed.name} className="animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                <BreedCard {...breed} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
