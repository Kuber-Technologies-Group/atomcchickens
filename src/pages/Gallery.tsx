
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { db, storage } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { toast } from "@/hooks/use-toast";
import GalleryHeader from "@/components/gallery/GalleryHeader";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import UploadModal from "@/components/gallery/UploadModal";
import { BreedGalleryType } from "@/types/gallery";
import { seedBreeds } from "@/utils/seedBreeds";

const Gallery = () => {
  const { currentUser } = useAuth();
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [galleryData, setGalleryData] = useState<BreedGalleryType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGalleryData = async () => {
      setIsLoading(true);
      try {
        // Ensure we have breed data by running the seed function
        await seedBreeds();
        
        // Fetch breeds with their descriptions from Firestore
        const breedsSnapshot = await getDocs(query(collection(db, "breeds"), orderBy("name")));
        
        const breedsData = breedsSnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          description: doc.data().description,
          images: []
        }));

        // For each breed, fetch the corresponding images from storage
        const galleryWithImages = await Promise.all(
          breedsData.map(async (breed) => {
            const breedFolderRef = ref(storage, `gallery/${breed.name}`);
            try {
              const breedImagesResult = await listAll(breedFolderRef);
              const imageURLs = await Promise.all(
                breedImagesResult.items.map(async (imageRef) => {
                  const url = await getDownloadURL(imageRef);
                  return {
                    id: imageRef.name,
                    url,
                    name: imageRef.name,
                  };
                })
              );
              
              return {
                ...breed,
                images: imageURLs
              };
            } catch (error) {
              // If there's no folder for this breed yet, return the breed without images
              return breed;
            }
          })
        );

        setGalleryData(galleryWithImages);
      } catch (error) {
        console.error("Error fetching gallery data:", error);
        toast({
          title: "Error",
          description: "Failed to load gallery data. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchGalleryData();
  }, []);

  const handleUploadSuccess = () => {
    // Refresh gallery data after a successful upload
    const fetchGalleryData = async () => {
      setIsLoading(true);
      try {
        // Fetch the updated gallery data
        const breedsSnapshot = await getDocs(query(collection(db, "breeds"), orderBy("name")));
        
        const breedsData = breedsSnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          description: doc.data().description,
          images: []
        }));

        const galleryWithImages = await Promise.all(
          breedsData.map(async (breed) => {
            const breedFolderRef = ref(storage, `gallery/${breed.name}`);
            try {
              const breedImagesResult = await listAll(breedFolderRef);
              const imageURLs = await Promise.all(
                breedImagesResult.items.map(async (imageRef) => {
                  const url = await getDownloadURL(imageRef);
                  return {
                    id: imageRef.name,
                    url,
                    name: imageRef.name,
                  };
                })
              );
              
              return {
                ...breed,
                images: imageURLs
              };
            } catch (error) {
              return breed;
            }
          })
        );

        setGalleryData(galleryWithImages);
        toast({
          title: "Success",
          description: "Image uploaded successfully!",
        });
      } catch (error) {
        console.error("Error refreshing gallery data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGalleryData();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navigation />
      
      <GalleryHeader 
        currentUser={currentUser} 
        onUploadClick={() => setIsUploadModalOpen(true)} 
      />
      
      <GalleryGrid 
        galleryData={galleryData}
        isLoading={isLoading}
      />
      
      {currentUser && (
        <UploadModal
          isOpen={isUploadModalOpen}
          onClose={() => setIsUploadModalOpen(false)}
          onUploadSuccess={handleUploadSuccess}
          breedOptions={galleryData.map(breed => breed.name)}
        />
      )}
      
      <Footer />
    </div>
  );
};

export default Gallery;
