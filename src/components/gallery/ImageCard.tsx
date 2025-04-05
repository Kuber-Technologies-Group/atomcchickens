
import { GalleryImageType } from "@/types/gallery";
import { Card, CardContent } from "@/components/ui/card";

interface ImageCardProps {
  image: GalleryImageType;
  breedName: string;
  onClick: () => void;
}

const ImageCard = ({ image, breedName, onClick }: ImageCardProps) => {
  return (
    <Card className="overflow-hidden group cursor-pointer transition-all hover:shadow-lg" onClick={onClick}>
      <div className="relative aspect-w-16" style={{ paddingBottom: "100%" }}>
        <img 
          src={image.url} 
          alt={`${breedName} - ${image.name}`}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-3">
        <p className="text-sm font-medium truncate">{breedName}</p>
      </CardContent>
    </Card>
  );
};

export default ImageCard;
