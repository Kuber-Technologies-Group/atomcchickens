import { useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, Download } from "lucide-react";
import { GalleryPhoto } from "@/types/gallery";

interface GalleryLightboxProps {
  photo: GalleryPhoto;
  photos: GalleryPhoto[];
  onClose: () => void;
  onNavigate: (photo: GalleryPhoto) => void;
}

const GalleryLightbox = ({ photo, photos, onClose, onNavigate }: GalleryLightboxProps) => {
  const currentIndex = photos.findIndex(p => p.id === photo.id);

  const goPrev = useCallback(() => {
    onNavigate(photos[(currentIndex - 1 + photos.length) % photos.length]);
  }, [currentIndex, photos, onNavigate]);

  const goNext = useCallback(() => {
    onNavigate(photos[(currentIndex + 1) % photos.length]);
  }, [currentIndex, photos, onNavigate]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, goPrev, goNext]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: "rgba(10,8,6,0.96)" }}
      onClick={onClose}
    >
      <style>{`
        @keyframes lb-in { from{opacity:0;transform:scale(0.94)} to{opacity:1;transform:scale(1)} }
        @keyframes img-fade { from{opacity:0} to{opacity:1} }
        .lb-image { animation: lb-in 0.22s cubic-bezier(.34,1.56,.64,1) forwards; }
        .lb-img-inner { animation: img-fade 0.2s ease forwards; }
      `}</style>

      {/* Top bar */}
      <div
        className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-4 z-10"
        style={{ background: "linear-gradient(to bottom,rgba(0,0,0,0.65),transparent)" }}
        onClick={e => e.stopPropagation()}
      >
        <div>
          {photo.title && <p className="text-white font-playfair text-lg font-semibold">{photo.title}</p>}
          {photo.caption && <p className="text-white/60 text-sm font-inter mt-0.5">{photo.caption}</p>}
          <p className="text-white/40 text-xs mt-1 font-inter">{photo.category}</p>
        </div>
        <div className="flex items-center gap-2">
          <a href={photo.public_url} download target="_blank" rel="noopener noreferrer"
            className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            title="Download">
            <Download className="w-5 h-5" />
          </a>
          <button onClick={onClose} className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Prev */}
      {photos.length > 1 && (
        <button onClick={e => { e.stopPropagation(); goPrev(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all z-10">
          <ChevronLeft className="w-8 h-8" />
        </button>
      )}

      {/* Image */}
      <div className="lb-image relative max-w-[90vw] max-h-[85vh] flex items-center justify-center"
        onClick={e => e.stopPropagation()}>
        <img
          key={photo.id}
          src={photo.public_url}
          alt={photo.title || photo.caption || "Gallery photo"}
          className="lb-img-inner max-w-[90vw] max-h-[85vh] object-contain rounded-lg shadow-2xl"
        />
      </div>

      {/* Next */}
      {photos.length > 1 && (
        <button onClick={e => { e.stopPropagation(); goNext(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all z-10">
          <ChevronRight className="w-8 h-8" />
        </button>
      )}

      {/* Dot counter */}
      {photos.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
          {photos.map((p, i) => (
            <button key={p.id} onClick={e => { e.stopPropagation(); onNavigate(p); }}
              className={`rounded-full transition-all duration-200 ${i === currentIndex ? "w-6 h-2 bg-white" : "w-2 h-2 bg-white/30 hover:bg-white/60"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default GalleryLightbox;
