import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useBreed } from "@/hooks/useBreeds";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Egg, Scale, MapPin, Thermometer, Heart, Eye, Calendar } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const BreedDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: breed, isLoading, error } = useBreed(slug || "");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Skeleton className="h-8 w-48 mb-8" />
          <div className="grid lg:grid-cols-2 gap-12">
            <Skeleton className="h-96 w-full rounded-lg" />
            <div className="space-y-4">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-24 w-full" />
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !breed) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="font-playfair text-4xl font-bold text-charcoal mb-4">Breed Not Found</h1>
          <p className="text-charcoal/70 mb-8">The breed you're looking for doesn't exist or has been removed.</p>
          <Link
            to="/breeds"
            className="inline-flex items-center gap-2 text-warmBrown hover:text-warmBrown/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Breeds
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <div className="relative pt-32 bg-cream">
        <div className="absolute inset-0 bg-[url('https://cdn.pixabay.com/photo/2019/07/21/20/18/chickens-chicks-4353566_1280.jpg')] bg-cover bg-center bg-no-repeat opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/breeds">Breeds</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{breed.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Image */}
            <div className="relative overflow-hidden rounded-lg shadow-xl">
              <img
                src={breed.image_url || "/placeholder.svg"}
                alt={breed.name}
                className="w-full h-[400px] object-cover"
              />
              {breed.category && (
                <Badge className="absolute top-4 left-4 bg-warmBrown text-white">
                  {breed.category}
                </Badge>
              )}
            </div>

            {/* Basic Info */}
            <div>
              <h1 className="font-playfair text-4xl md:text-5xl font-bold text-charcoal mb-4">
                {breed.name}
              </h1>
              
              {breed.traits && breed.traits.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {breed.traits.map((trait, index) => (
                    <Badge key={index} variant="secondary" className="bg-cream text-warmBrown">
                      {trait}
                    </Badge>
                  ))}
                </div>
              )}

              <p className="text-lg text-charcoal/80 mb-8 font-inter leading-relaxed">
                {breed.description}
              </p>

              {breed.origin && (
                <div className="flex items-start gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-warmBrown mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-charcoal">Origin</p>
                    <p className="text-charcoal/70">{breed.origin}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-playfair text-3xl font-bold text-charcoal mb-8">Breed Details</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Weight Card */}
            {(breed.hen_weight_kg || breed.rooster_weight_kg) && (
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Scale className="w-6 h-6 text-warmBrown" />
                    <h3 className="font-playfair text-xl font-semibold text-charcoal">Weight</h3>
                  </div>
                  <div className="space-y-2">
                    {breed.hen_weight_kg && (
                      <p className="text-charcoal/80">
                        <span className="font-medium">Hen:</span> {breed.hen_weight_kg} kg
                      </p>
                    )}
                    {breed.rooster_weight_kg && (
                      <p className="text-charcoal/80">
                        <span className="font-medium">Rooster:</span> {breed.rooster_weight_kg} kg
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Egg Production Card */}
            {(breed.eggs_per_year || breed.egg_size || breed.egg_color) && (
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Egg className="w-6 h-6 text-warmBrown" />
                    <h3 className="font-playfair text-xl font-semibold text-charcoal">Egg Production</h3>
                  </div>
                  <div className="space-y-2">
                    {breed.eggs_per_year && (
                      <p className="text-charcoal/80">
                        <span className="font-medium">Eggs/Year:</span> {breed.eggs_per_year}
                      </p>
                    )}
                    {breed.egg_size && (
                      <p className="text-charcoal/80">
                        <span className="font-medium">Size:</span> {breed.egg_size}
                      </p>
                    )}
                    {breed.egg_color && (
                      <p className="text-charcoal/80">
                        <span className="font-medium">Color:</span> {breed.egg_color}
                      </p>
                    )}
                  </div>
                  {breed.laying_notes && (
                    <p className="text-sm text-charcoal/60 mt-4 italic">{breed.laying_notes}</p>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Temperament Card */}
            {(breed.temperament || breed.broodiness) && (
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Heart className="w-6 h-6 text-warmBrown" />
                    <h3 className="font-playfair text-xl font-semibold text-charcoal">Temperament</h3>
                  </div>
                  <div className="space-y-2">
                    {breed.temperament && (
                      <p className="text-charcoal/80">{breed.temperament}</p>
                    )}
                    {breed.broodiness && (
                      <p className="text-charcoal/80">
                        <span className="font-medium">Broodiness:</span> {breed.broodiness}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Climate Card */}
            {breed.climate_adaptability && (
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Thermometer className="w-6 h-6 text-warmBrown" />
                    <h3 className="font-playfair text-xl font-semibold text-charcoal">Climate Adaptability</h3>
                  </div>
                  <p className="text-charcoal/80">{breed.climate_adaptability}</p>
                </CardContent>
              </Card>
            )}

            {/* Appearance Card */}
            {breed.appearance && (
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Eye className="w-6 h-6 text-warmBrown" />
                    <h3 className="font-playfair text-xl font-semibold text-charcoal">Appearance</h3>
                  </div>
                  <p className="text-charcoal/80">{breed.appearance}</p>
                </CardContent>
              </Card>
            )}

            {/* Availability Card */}
            {(breed.availability || breed.introduced_year) && (
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Calendar className="w-6 h-6 text-warmBrown" />
                    <h3 className="font-playfair text-xl font-semibold text-charcoal">Availability</h3>
                  </div>
                  <div className="space-y-2">
                    {breed.availability && (
                      <p className="text-charcoal/80">{breed.availability}</p>
                    )}
                    {breed.introduced_year && (
                      <p className="text-charcoal/80">
                        <span className="font-medium">Introduced:</span> {breed.introduced_year}
                      </p>
                    )}
                    {breed.availability_notes && (
                      <p className="text-sm text-charcoal/60 mt-2 italic">{breed.availability_notes}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Back Link */}
          <div className="mt-12">
            <Link
              to="/breeds"
              className="inline-flex items-center gap-2 text-warmBrown hover:text-warmBrown/80 transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to All Breeds
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BreedDetail;
