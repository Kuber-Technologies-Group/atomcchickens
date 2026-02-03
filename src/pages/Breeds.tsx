import Navigation from "@/components/Navigation";
import BreedCard from "@/components/BreedCard";
import Footer from "@/components/Footer";
import { useBreeds } from "@/hooks/useBreeds";
import { Skeleton } from "@/components/ui/skeleton";

const Breeds = () => {
  const { data: breeds, isLoading, error } = useBreeds();

  return (
    <div className="min-h-screen bg-background">
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
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="space-y-4">
                  <Skeleton className="h-64 w-full rounded-lg" />
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-16 w-full" />
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-destructive text-lg">Failed to load breeds. Please try again later.</p>
            </div>
          ) : breeds && breeds.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {breeds.map((breed, index) => (
                <div key={breed.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <BreedCard
                    name={breed.name}
                    slug={breed.slug}
                    excerpt={breed.excerpt}
                    imageUrl={breed.image_url}
                    traits={breed.traits}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-charcoal/70 text-lg">No breeds available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Breeds;
