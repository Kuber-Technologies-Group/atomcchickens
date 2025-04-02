
import { useState } from "react";
import { BreedGalleryType } from "@/types/gallery";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ImageCard from "./ImageCard";

interface GalleryGridProps {
  galleryData: BreedGalleryType[];
  isLoading: boolean;
}

const GalleryGrid = ({ galleryData, isLoading }: GalleryGridProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center py-20">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="mt-4 text-charcoal/70 font-inter">Loading gallery...</p>
        </div>
      </div>
    );
  }

  if (!galleryData || galleryData.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card>
          <CardContent className="text-center py-12">
            <h2 className="text-2xl font-playfair mb-4">No images yet</h2>
            <p>Be the first to upload chicken pictures to our gallery!</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Filter out breeds with no images
  const breedsWithImages = galleryData.filter(breed => breed.images && breed.images.length > 0);
  const hasAnyImages = breedsWithImages.length > 0;
  
  // Count total images
  const totalImages = galleryData.reduce((acc, breed) => acc + (breed.images?.length || 0), 0);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {!hasAnyImages ? (
        <Card>
          <CardContent className="text-center py-12">
            <h2 className="text-2xl font-playfair mb-4">No images yet</h2>
            <p>Be the first to upload chicken pictures to our gallery!</p>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="all" className="w-full">
          <div className="flex justify-between items-center mb-8 flex-col sm:flex-row gap-4">
            <TabsList>
              <TabsTrigger value="all">All Breeds ({totalImages})</TabsTrigger>
              {breedsWithImages.map((breed) => (
                <TabsTrigger key={breed.id} value={breed.id}>
                  {breed.name} ({breed.images.length})
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {galleryData.flatMap((breed) =>
                breed.images.map((image) => (
                  <ImageCard 
                    key={`${breed.id}-${image.id}`}
                    image={image} 
                    breedName={breed.name}
                    onClick={() => setSelectedImage(image.url)}
                  />
                ))
              )}
            </div>
          </TabsContent>

          {breedsWithImages.map((breed) => (
            <TabsContent key={breed.id} value={breed.id} className="mt-0">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>{breed.name}</CardTitle>
                  <CardDescription>{breed.description}</CardDescription>
                </CardHeader>
              </Card>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {breed.images.map((image) => (
                  <ImageCard 
                    key={image.id} 
                    image={image} 
                    breedName={breed.name}
                    onClick={() => setSelectedImage(image.url)}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      )}

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="sm:max-w-3xl">
          {selectedImage && (
            <div className="w-full">
              <img 
                src={selectedImage} 
                alt="Selected chicken" 
                className="w-full h-auto rounded-md" 
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default GalleryGrid;
