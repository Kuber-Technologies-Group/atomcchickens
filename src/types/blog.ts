export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  image_url: string | null;
  is_featured: boolean;
  author_id: string;
  author_name: string;
  created_at: string;
  updated_at: string;
}
