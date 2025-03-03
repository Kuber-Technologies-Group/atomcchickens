
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, X, Loader2 } from "lucide-react";
import BlogFeatured from "./BlogFeatured";
import BlogPostList from "./BlogPostList";

interface BlogGridProps {
  posts: any[];
  loading: boolean;
  currentUser: any;
  onShowPostForm: () => void;
  onReadMore: (post: any) => void;
}

const BlogGrid: React.FC<BlogGridProps> = ({ 
  posts, 
  loading, 
  currentUser, 
  onShowPostForm, 
  onReadMore 
}) => {
  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Create Post Button for authenticated users */}
        {currentUser && (
          <div className="mb-8">
            <Button 
              onClick={onShowPostForm}
              className="bg-warmBrown hover:bg-warmBrown/90 text-white"
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Create New Post
            </Button>
          </div>
        )}

        {/* Blog Posts Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <Loader2 className="h-12 w-12 animate-spin text-warmBrown mb-4" />
            <p className="text-lg text-charcoal/80">Loading posts...</p>
          </div>
        ) : posts.length > 0 ? (
          <div className="space-y-8">
            {posts.length > 0 && <BlogFeatured post={posts[0]} onReadMore={onReadMore} />}
            {posts.length > 1 && <BlogPostList posts={posts.slice(1)} onReadMore={onReadMore} />}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-playfair mb-4">No posts yet</h2>
            {currentUser ? (
              <p>Be the first to create a post!</p>
            ) : (
              <p>Login to create the first post</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogGrid;
