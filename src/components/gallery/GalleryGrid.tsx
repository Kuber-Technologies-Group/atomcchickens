import { useState } from "react";
import { Loader2 } from "lucide-react";
import { GalleryPhoto } from "@/types/gallery";

interface GalleryGridProps {
  photos: GalleryPhoto[];
  loading: boolean;
  onPhotoClick: (photo: GalleryPhoto) => void;
}

const GalleryGrid = ({ photos, loading, onPhotoClick }: GalleryGridProps) => {
  const [loadedIds, setLoadedIds] = useState<Set<string>>(new Set());

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        <Loader2 className="h-12 w-12 animate-spin text-warmBrown mb-4" />
        <p className="text-charcoal/60 font-inter">Loading gallery…</p>
      </div>
    );
  }

  if (photos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <div className="text-6xl mb-4">🐓</div>
        <h3 className="font-playfair text-2xl text-charcoal mb-2">No photos yet</h3>
        <p className="text-charcoal/60 font-inter">Photos will appear here once uploaded.</p>
      </div>
    );
  }

  // Masonry-style layout: distribute into 3 columns
  const cols: GalleryPhoto[][] = [[], [], []];
  photos.forEach((p, i) => cols[i % 3].push(p));

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
      {photos.map((photo, index) => (
        <div
          key={photo.id}
          className="break-inside-avoid group relative cursor-pointer overflow-hidden rounded-xl bg-cream"
          style={{
            animation: `gallery-item-in 0.45s ease forwards`,
            animationDelay: `${Math.min(index * 40, 400)}ms`,
            opacity: 0,
          }}
          onClick={() => onPhotoClick(photo)}
        >
          {/* Skeleton while loading */}
          {!loadedIds.has(photo.id) && (
            <div className="absolute inset-0 bg-cream animate-pulse" />
          )}

          <img
            src={photo.public_url}
            alt={photo.title || photo.caption || `Gallery photo ${index + 1}`}
            className={`w-full object-cover transition-all duration-500 group-hover:scale-105 ${loadedIds.has(photo.id) ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setLoadedIds(prev => new Set(prev).add(photo.id))}
            loading="lazy"
          />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
            {photo.title && (
              <p className="text-white font-playfair font-semibold text-base leading-tight">{photo.title}</p>
            )}
            {photo.caption && (
              <p className="text-white/75 font-inter text-sm mt-1 line-clamp-2">{photo.caption}</p>
            )}
            <span className="mt-2 inline-block text-xs font-inter font-medium text-mutedGold bg-black/30 px-2 py-0.5 rounded-full w-fit">
              {photo.category}
            </span>
          </div>
        </div>
      ))}

      <style>{`
        @keyframes gallery-item-in {
          from { opacity:0; transform: translateY(16px); }
          to   { opacity:1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default GalleryGrid;
