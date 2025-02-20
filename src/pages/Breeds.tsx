
import Navigation from "@/components/Navigation";
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
  },
  {
    name: "Plymouth Rocks",
    description: "A heritage breed known for their striking barred pattern and excellent dual-purpose characteristics.",
    imageUrl: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac",
    traits: ["Dual Purpose", "Easy Care", "Good Foragers"]
  },
  {
    name: "Wyandottes",
    description: "Beautiful laced feathering combined with a friendly disposition makes these birds perfect for both show and practical purposes.",
    imageUrl: "https://images.unsplash.com/photo-1438565434616-3ef039228b15",
    traits: ["Beautiful Plumage", "Good Mothers", "Winter Hardy"]
  },
  {
    name: "Sussex",
    description: "Calm and friendly birds that excel at both egg laying and meat production, perfect for small homesteads.",
    imageUrl: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d",
    traits: ["Dual Purpose", "Friendly", "Good Layers"]
  }
];

const Breeds = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative pt-32 bg-cream">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1465379944081-7f47de8d74ac')] bg-cover bg-center bg-no-repeat opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-charcoal mb-6">Our Chicken Breeds</h1>
            <p className="text-lg text-charcoal/80 max-w-2xl mx-auto font-inter">
              Discover our carefully curated selection of heritage and exotic chicken breeds, each chosen for their unique characteristics and exceptional qualities.
            </p>
          </div>
        </div>
      </div>

      {/* Breeds Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

export default Breeds;
