
import { Card } from "@/components/ui/card";

interface BreedCardProps {
  name: string;
  description: string;
  imageUrl: string;
  traits: string[];
}

const BreedCard = ({ name, description, imageUrl, traits }: BreedCardProps) => {
  return (
    <Card className="overflow-hidden group transition-all duration-300 hover:shadow-lg">
      <div className="aspect-w-16 aspect-h-9 relative overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="object-cover w-full h-64 transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="font-playfair text-2xl font-semibold text-charcoal mb-2">{name}</h3>
        <p className="text-charcoal/80 mb-4 font-inter">{description}</p>
        <div className="flex flex-wrap gap-2">
          {traits.map((trait, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-cream text-warmBrown rounded-full text-sm font-inter"
            >
              {trait}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default BreedCard;
