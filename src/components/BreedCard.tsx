import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface BreedCardProps {
  name: string;
  slug: string;
  excerpt: string | null;
  imageUrl: string | null;
  traits: string[] | null;
}

const BreedCard = ({ name, slug, excerpt, imageUrl, traits }: BreedCardProps) => {
  return (
    <Card className="overflow-hidden group transition-all duration-300 hover:shadow-lg h-full flex flex-col">
      <div className="aspect-w-16 aspect-h-9 relative overflow-hidden">
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={name}
          className="object-cover w-full h-64 transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-playfair text-2xl font-semibold text-charcoal mb-2">{name}</h3>
        <p className="text-charcoal/80 mb-4 font-inter line-clamp-3">{excerpt}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {traits?.map((trait, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-cream text-warmBrown rounded-full text-sm font-inter"
            >
              {trait}
            </span>
          ))}
        </div>
        <Link 
          to={`/breeds/${slug}`}
          className="mt-auto inline-flex items-center gap-2 text-warmBrown hover:text-warmBrown/80 transition-colors font-medium"
        >
          Learn More
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </Card>
  );
};

export default BreedCard;
