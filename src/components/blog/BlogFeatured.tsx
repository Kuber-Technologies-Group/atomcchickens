import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, Clock } from "lucide-react";
import { formatDate } from "@/utils/blogUtils";
import type { BlogPost } from "@/types/blog";

const FALLBACK_IMAGE = "https://cdn.pixabay.com/photo/2022/04/03/19/22/bird-7109752_1280.jpg";

interface BlogFeaturedProps {
  post: BlogPost;
  onReadMore: (post: BlogPost) => void;
}

const BlogFeatured = ({ post, onReadMore }: BlogFeaturedProps) => (
  <section className="mb-16">
    <h2 className="font-playfair text-3xl font-bold text-charcoal mb-8">Featured Post</h2>
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="grid md:grid-cols-2 h-full">
        <div className="h-48 md:h-auto min-h-[240px]">
          <img
            src={post.image_url || FALLBACK_IMAGE}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-8 flex flex-col justify-center">
          <h3 className="font-playfair text-2xl font-bold text-charcoal mb-4">{post.title}</h3>
          <p className="text-charcoal/80 mb-4 font-inter line-clamp-3">{post.excerpt || post.content}</p>
          <div className="flex items-center gap-4 text-sm text-charcoal/60 mb-6">
            <span>By {post.author_name}</span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {formatDate(post.created_at)}
            </span>
          </div>
          <Button onClick={() => onReadMore(post)} className="bg-warmBrown hover:bg-warmBrown/90 text-white w-fit">
            <BookOpen className="w-4 h-4 mr-2" />
            Read More
          </Button>
        </div>
      </div>
    </Card>
  </section>
);

export default BlogFeatured;
