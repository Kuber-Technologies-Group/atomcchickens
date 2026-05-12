export interface GalleryPhoto {
  id: string;
  title: string | null;
  caption: string | null;
  category: string;
  storage_path: string;
  public_url: string;
  width: number | null;
  height: number | null;
  uploaded_by: string;
  sort_order: number;
  created_at: string;
}

export const GALLERY_CATEGORIES = [
  "All",
  "Birds",
  "Awards",
  "Farm",
  "Chicks",
  "Eggs",
  "Events",
] as const;

export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number];
