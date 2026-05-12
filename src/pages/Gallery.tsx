import { useState, useMemo } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import GalleryLightbox from "@/components/gallery/GalleryLightbox";
import GalleryCategoryFilter from "@/components/gallery/GalleryCategoryFilter";
import GalleryUploadPanel from "@/components/gallery/GalleryUploadPanel";
import { useGallery } from "@/hooks/useGallery";
import { useAuth } from "@/contexts/AuthContext";
import type { GalleryPhoto, GalleryCategory } from "@/types/gallery";
import { GALLERY_CATEGORIES } from "@/types/gallery";

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("All");
  const [lightboxPhoto, setLightboxPhoto] = useState<GalleryPhoto | null>(null);

  // Fetch all photos — filter client-side so counts are always accurate
  const { photos: allPhotos, loading, refetch } = useGallery();
  const { isAdmin } = useAuth();

  const filteredPhotos = useMemo(() => {
    if (activeCategory === "All") return allPhotos;
    return allPhotos.filter(p => p.category === activeCategory);
  }, [allPhotos, activeCategory]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    allPhotos.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [allPhotos]);

  return (
    <div className="min-h-screen bg-white">
      <SEO
        url="/gallery"
        title="Photo Gallery"
        description="Browse our gallery of award-winning exotic chicken breeds, farm life, ZITF champion birds, and chicks at Atomc Chickens, Bulawayo Zimbabwe."
      />
      <Navigation />

      {/* Hero */}
      <div className="relative pt-32 bg-cream overflow-hidden">
        <div
          className="absolute inset-0 opacity-15 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://cdn.pixabay.com/photo/2016/11/29/05/25/chicken-1867521_1280.jpg')",
          }}
        />
        {/* Decorative grain */}
        <div className="absolute inset-0 opacity-30"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E\")" }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <p className="font-playfair text-sm font-semibold text-warmBrown tracking-widest uppercase mb-3">
            Our Farm in Pictures
          </p>
          <h1 className="font-playfair text-5xl md:text-6xl font-bold text-charcoal mb-4 leading-tight">
            Photo Gallery
          </h1>
          <p className="text-lg text-charcoal/70 max-w-xl mx-auto font-inter">
            Champion birds, farm life, and the beauty of exotic poultry — straight from our farm in Bulawayo.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-charcoal/50 font-inter">
            <span>{allPhotos.length} photos</span>
            <span>·</span>
            <span>{Object.keys(categoryCounts).length} categories</span>
          </div>
        </div>
      </div>

      {/* Filter + upload bar */}
      <div className="sticky top-16 z-30 bg-white/90 backdrop-blur-md border-b border-charcoal/8 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
            <GalleryCategoryFilter
              active={activeCategory}
              onChange={setActiveCategory}
              counts={categoryCounts}
            />
            {isAdmin && <GalleryUploadPanel onUploaded={refetch} />}
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <GalleryGrid
          photos={filteredPhotos}
          loading={loading}
          onPhotoClick={setLightboxPhoto}
        />
      </div>

      {/* Lightbox */}
      {lightboxPhoto && (
        <GalleryLightbox
          photo={lightboxPhoto}
          photos={filteredPhotos}
          onClose={() => setLightboxPhoto(null)}
          onNavigate={setLightboxPhoto}
        />
      )}

      <Footer />
    </div>
  );
};

export default Gallery;
