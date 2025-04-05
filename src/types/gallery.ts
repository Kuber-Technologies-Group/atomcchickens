
export interface GalleryImageType {
  id: string;
  url: string;
  name: string;
}

export interface BreedGalleryType {
  id: string;
  name: string;
  description: string;
  images: GalleryImageType[];
}
