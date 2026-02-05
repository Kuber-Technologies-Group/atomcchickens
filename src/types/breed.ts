export interface ChickenBreed {
  id: string;
  name: string;
  slug: string;
  category: string | null;
  description: string | null;
  excerpt: string | null;
  origin: string | null;
  hen_weight_kg: string | null;
  rooster_weight_kg: string | null;
  eggs_per_year: string | null;
  egg_size: string | null;
  egg_color: string | null;
  laying_notes: string | null;
  temperament: string | null;
  broodiness: string | null;
  climate_adaptability: string | null;
  appearance: string | null;
  availability: string | null;
  introduced_year: number | null;
  availability_notes: string | null;
  image_url: string | null;
  traits: string[] | null;
  created_at: string;
}
