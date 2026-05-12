import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { GalleryPhoto } from "@/types/gallery";

export const useGallery = (category?: string) => {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchPhotos = useCallback(async () => {
    setLoading(true);
    let query = supabase
      .from("gallery_photos")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (category && category !== "All") {
      query = query.eq("category", category);
    }

    const { data, error } = await query;

    if (error) {
      toast({ title: "Error", description: "Failed to load gallery.", variant: "destructive" });
    } else {
      setPhotos(data as GalleryPhoto[]);
    }
    setLoading(false);
  }, [category, toast]);

  useEffect(() => {
    fetchPhotos();
    const channel = supabase
      .channel("gallery_changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "gallery_photos" }, fetchPhotos)
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [fetchPhotos]);

  return { photos, loading, refetch: fetchPhotos };
};
