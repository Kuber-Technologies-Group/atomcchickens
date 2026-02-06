import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { ChickenBreed } from "@/types/breed";

export const useBreeds = () => {
  return useQuery({
    queryKey: ["breeds"],
    queryFn: async (): Promise<ChickenBreed[]> => {
      const { data, error } = await supabase
        .from("chicken_breeds")
        .select("*")
        .order("name");

      if (error) {
        throw error;
      }

      return data as ChickenBreed[];
    },
  });
};

export const useBreed = (slug: string) => {
  return useQuery({
    queryKey: ["breed", slug],
    queryFn: async (): Promise<ChickenBreed | null> => {
      const { data, error } = await supabase
        .from("chicken_breeds")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (error) {
        throw error;
      }

      return data as ChickenBreed | null;
    },
    enabled: !!slug,
  });
};
