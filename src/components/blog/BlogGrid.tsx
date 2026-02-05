import React from "react";
import { Loader2 } from "lucide-react";
import BlogFeatured from "./BlogFeatured";
import BlogPostList from "./BlogPostList";
import type { BlogPost } from "@/types/blog";

interface BlogGridProps {
  posts: BlogPost[];
  loading: boolean;
}

const BlogGrid: React.FC<BlogGridProps> = ({ posts, loading }) => {
  const featuredPost = posts.find(p => p.is_featured) || posts[0];
  const otherPosts = posts.filter(p => p.id !== featuredPost?.id);

  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <Loader2 className="h-12 w-12 animate-spin text-warmBrown mb-4" />
            <p className="text-lg text-charcoal/80">Loading posts...</p>
          </div>
        ) : posts.length > 0 ? (
          <div className="space-y-8">
            {featuredPost && <BlogFeatured post={featuredPost} />}
            {otherPosts.length > 0 && <BlogPostList posts={otherPosts} />}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-playfair mb-4">No posts yet</h2>
            <p className="text-charcoal/70">Check back soon for new content!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogGrid;
