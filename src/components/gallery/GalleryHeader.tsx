
import { User } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface GalleryHeaderProps {
  currentUser: User | null;
  onUploadClick: () => void;
}

const GalleryHeader = ({ currentUser, onUploadClick }: GalleryHeaderProps) => {
  return (
    <div className="relative pt-32 bg-cream">
      <div className="absolute inset-0 bg-[url('https://cdn.pixabay.com/photo/2019/07/21/20/18/chickens-chicks-4353566_1280.jpg')] bg-cover bg-center bg-no-repeat opacity-20" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-charcoal mb-6">
            Chicken Gallery
          </h1>
          <p className="text-lg text-charcoal/80 max-w-2xl mx-auto font-inter mb-8">
            Browse our collection of beautiful chicken breeds. Each image showcases the unique characteristics and beauty of our feathered friends.
          </p>
          
          {currentUser && (
            <Button 
              onClick={onUploadClick}
              className="bg-primary hover:bg-primary/90"
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload Image
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GalleryHeader;
