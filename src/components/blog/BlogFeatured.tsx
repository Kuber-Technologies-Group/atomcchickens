import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { BlogPost } from "@/types/blog";

interface BlogFeaturedProps {
  post: BlogPost;
}

const BlogFeatured: React.FC<BlogFeaturedProps> = ({ post }) => {
  const navigate = useNavigate();

  return (
    <section className="mb-16">
      <h2 className="font-playfair text-3xl font-bold text-charcoal mb-8">Featured Post</h2>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="grid md:grid-cols-2 h-full">
          <div className="h-48 md:h-96">
            <img 
              src={post.image_url || "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7"} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6">
            <h3 className="font-playfair text-2xl font-bold text-charcoal mb-4">{post.title}</h3>
            <p className="text-charcoal/80 mb-4 font-inter line-clamp-2">
              {post.excerpt || post.content}
            </p>
            <div className="flex items-center gap-4 text-sm text-charcoal/60 mb-6">
              <span>By {post.author_name}</span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {new Date(post.created_at).toLocaleDateString()}
              </span>
            </div>
            <Button 
              onClick={() => navigate(`/blog/${post.slug}`)}
              className="bg-warmBrown hover:bg-warmBrown/90 text-white"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Read More
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default BlogFeatured;
