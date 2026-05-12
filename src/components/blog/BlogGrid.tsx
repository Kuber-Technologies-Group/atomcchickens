import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, Loader2 } from "lucide-react";
import BlogFeatured from "./BlogFeatured";
import BlogPostList from "./BlogPostList";
import type { BlogPost } from "@/types/blog";

interface BlogGridProps {
  posts: BlogPost[];
  loading: boolean;
  isAdmin: boolean;
  onShowPostForm: () => void;
  onReadMore: (post: BlogPost) => void;
}

const BlogGrid = ({ posts, loading, isAdmin, onShowPostForm, onReadMore }: BlogGridProps) => {
  const featured = posts.find(p => p.is_featured) || posts[0];
  const rest = featured ? posts.filter(p => p.id !== featured.id) : [];

  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {isAdmin && (
          <div className="mb-8">
            <Button onClick={onShowPostForm} className="bg-warmBrown hover:bg-warmBrown/90 text-white">
              <PlusCircle className="w-4 h-4 mr-2" />
              New Post
            </Button>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <Loader2 className="h-12 w-12 animate-spin text-warmBrown mb-4" />
            <p className="text-lg text-charcoal/80">Loading posts…</p>
          </div>
        ) : posts.length > 0 ? (
          <div className="space-y-8">
            {featured && <BlogFeatured post={featured} onReadMore={onReadMore} />}
            {rest.length > 0 && <BlogPostList posts={rest} onReadMore={onReadMore} />}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-playfair mb-4">No posts yet</h2>
            <p className="text-charcoal/70">{isAdmin ? "Be the first to write a post." : "Check back soon for updates."}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogGrid;
