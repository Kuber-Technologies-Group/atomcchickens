import { GALLERY_CATEGORIES, GalleryCategory } from "@/types/gallery";

interface GalleryCategoryFilterProps {
  active: GalleryCategory;
  onChange: (cat: GalleryCategory) => void;
  counts: Record<string, number>;
}

const GalleryCategoryFilter = ({ active, onChange, counts }: GalleryCategoryFilterProps) => (
  <div className="flex flex-wrap gap-2 justify-center">
    {GALLERY_CATEGORIES.map(cat => {
      const count = cat === "All"
        ? Object.values(counts).reduce((a, b) => a + b, 0)
        : (counts[cat] || 0);
      const isActive = active === cat;
      return (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`
            px-4 py-2 rounded-full text-sm font-inter font-medium transition-all duration-200
            ${isActive
              ? "bg-warmBrown text-white shadow-md scale-105"
              : "bg-cream text-charcoal/70 hover:bg-warmBrown/10 hover:text-warmBrown border border-charcoal/10"
            }
          `}
        >
          {cat}
          {count > 0 && (
            <span className={`ml-1.5 text-xs ${isActive ? "text-white/70" : "text-charcoal/40"}`}>
              {count}
            </span>
          )}
        </button>
      );
    })}
  </div>
);

export default GalleryCategoryFilter;
