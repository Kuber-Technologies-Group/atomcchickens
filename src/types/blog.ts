export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  author_name: string;
  image_url: string | null;
  is_featured: boolean;
  likes: number;
  dislikes: number;
  created_at: string;
  updated_at: string;
}

export interface BlogComment {
  id: string;
  post_id: string;
  author_name: string;
  content: string;
  created_at: string;
}
