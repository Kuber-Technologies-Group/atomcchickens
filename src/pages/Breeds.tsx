import Navigation from "@/components/Navigation";
import BreedCard from "@/components/BreedCard";
import Footer from "@/components/Footer";

const breeds = [
  {
    name: "Orpingtons",
    description: "Known for their gentle nature and exceptional egg-laying capabilities, our Orpingtons are bred for both beauty and functionality.",
    imageUrl: "https://cdn.pixabay.com/photo/2015/11/20/12/54/bird-1053045_1280.jpg",
    traits: ["Gentle", "Good Layers", "Family Friendly"]
  },
  {
    name: "Columbian Brahmas",
    description: "Majestic and imposing, Columbian Brahmas are gentle giants that make excellent winter layers and stunning show birds.",
    imageUrl: "https://cdn.pixabay.com/photo/2019/03/10/17/38/hen-brahma-4046755_1280.jpg",
    traits: ["Winter Hardy", "Show Quality", "Docile"]
  },
  {
    name: "Frizzle Orpingtons",
    description: "These unique birds feature distinctively curled feathers, combining the beloved Orpington temperament with extraordinary appearance.",
    imageUrl: "https://i.pinimg.com/originals/03/98/c3/0398c35374fc06eded890813f4d69d1a.jpg",
    traits: ["Unique Appearance", "Friendly", "Hardy"]
  },
  {
    name: "Plymouth Rocks",
    description: "A heritage breed known for their striking barred pattern and excellent dual-purpose characteristics.",
    imageUrl: "https://nutrenaworld.com/wp-content/uploads/2024/01/poultry_blog_barred-plymouth-rock-chicken_820x525.jpg",
    traits: ["Dual Purpose", "Easy Care", "Good Foragers"]
  },
  {
    name: "Wyandottes",
    description: "Beautiful laced feathering combined with a friendly disposition makes these birds perfect for both show and practical purposes.",
    imageUrl: "https://storageatlasengagepdcus.blob.core.windows.net/atlas/all-media/tfcsouthstatehendecoop/blogs/2023/october-december/chicken.jpg?ext=.jpg",
    traits: ["Beautiful Plumage", "Good Mothers", "Winter Hardy"]
  },
  {
    name: "Sussex",
    description: "Calm and friendly birds that excel at both egg laying and meat production, perfect for small homesteads.",
    imageUrl: "https://cdn.pixabay.com/photo/2017/09/08/19/57/hen-2729941_1280.jpg",
    traits: ["Dual Purpose", "Friendly", "Good Layers"]
  }
];

const Breeds = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative pt-32 bg-cream">
        <div className="absolute inset-0 bg-[url('https://cdn.pixabay.com/photo/2019/07/21/20/18/chickens-chicks-4353566_1280.jpg')] bg-cover bg-center bg-no-repeat opacity-20" />
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

      <Footer />
    </div>
  );
};

export default Breeds;
