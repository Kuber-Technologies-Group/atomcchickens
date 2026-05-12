export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      chicken_breeds: {
        Row: {
          appearance: string | null
          availability: string | null
          availability_notes: string | null
          broodiness: string | null
          category: string | null
          climate_adaptability: string | null
          created_at: string | null
          description: string | null
          egg_color: string | null
          egg_size: string | null
          eggs_per_year: string | null
          excerpt: string | null
          hen_weight_kg: string | null
          id: string
          image_url: string | null
          introduced_year: number | null
          laying_notes: string | null
          name: string
          origin: string | null
          rooster_weight_kg: string | null
          slug: string
          temperament: string | null
          traits: string[] | null
        }
        Insert: {
          appearance?: string | null
          availability?: string | null
          availability_notes?: string | null
          broodiness?: string | null
          category?: string | null
          climate_adaptability?: string | null
          created_at?: string | null
          description?: string | null
          egg_color?: string | null
          egg_size?: string | null
          eggs_per_year?: string | null
          excerpt?: string | null
          hen_weight_kg?: string | null
          id?: string
          image_url?: string | null
          introduced_year?: number | null
          laying_notes?: string | null
          name: string
          origin?: string | null
          rooster_weight_kg?: string | null
          slug: string
          temperament?: string | null
          traits?: string[] | null
        }
        Update: {
          appearance?: string | null
          availability?: string | null
          availability_notes?: string | null
          broodiness?: string | null
          category?: string | null
          climate_adaptability?: string | null
          created_at?: string | null
          description?: string | null
          egg_color?: string | null
          egg_size?: string | null
          eggs_per_year?: string | null
          excerpt?: string | null
          hen_weight_kg?: string | null
          id?: string
          image_url?: string | null
          introduced_year?: number | null
          laying_notes?: string | null
          name?: string
          origin?: string | null
          rooster_weight_kg?: string | null
          slug?: string
          temperament?: string | null
          traits?: string[] | null
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          content: string
          excerpt: string | null
          image_url: string | null
          is_featured: boolean
          author_id: string
          author_name: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          content: string
          excerpt?: string | null
          image_url?: string | null
          is_featured?: boolean
          author_id: string
          author_name: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          content?: string
          excerpt?: string | null
          image_url?: string | null
          is_featured?: boolean
          author_id?: string
          author_name?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      gallery_photos: {
        Row: {
          id: string
          title: string | null
          caption: string | null
          category: string
          storage_path: string
          public_url: string
          width: number | null
          height: number | null
          uploaded_by: string
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          title?: string | null
          caption?: string | null
          category?: string
          storage_path: string
          public_url: string
          width?: number | null
          height?: number | null
          uploaded_by: string
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          title?: string | null
          caption?: string | null
          category?: string
          storage_path?: string
          public_url?: string
          width?: number | null
          height?: number | null
          uploaded_by?: string
          sort_order?: number
          created_at?: string
        }
        Relationships: []
      }
      blog_admins: {
        Row: {
          id: string
          email: string
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">
type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
  ? (DefaultSchema["Tables"] &
      DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
