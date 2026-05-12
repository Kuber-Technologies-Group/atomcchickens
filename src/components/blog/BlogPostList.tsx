import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, CalendarDays } from "lucide-react";
import { formatDate } from "@/utils/blogUtils";
import type { BlogPost } from "@/types/blog";

const FALLBACK_IMAGE = "https://cdn.pixabay.com/photo/2022/04/03/19/22/bird-7109752_1280.jpg";

interface BlogPostListProps {
  posts: BlogPost[];
  onReadMore: (post: BlogPost) => void;
}

const BlogPostList = ({ posts, onReadMore }: BlogPostListProps) => {
  if (posts.length === 0) return null;
  return (
    <section>
      <h2 className="font-playfair text-3xl font-bold text-charcoal mb-8">Latest Posts</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {posts.map(post => (
          <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
            <div className="h-48 flex-shrink-0">
              <img
                src={post.image_url || FALLBACK_IMAGE}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-6 flex flex-col flex-grow">
              <h3 className="font-playfair text-xl font-bold text-charcoal mb-3">{post.title}</h3>
              <p className="text-charcoal/80 mb-4 font-inter line-clamp-2 flex-grow">{post.excerpt || post.content}</p>
              <div className="flex items-center gap-4 text-sm text-charcoal/60 mb-4">
                <span>By {post.author_name}</span>
                <span className="flex items-center gap-1">
                  <CalendarDays className="w-4 h-4" />
                  {formatDate(post.created_at)}
                </span>
              </div>
              <Button onClick={() => onReadMore(post)} className="bg-warmBrown hover:bg-warmBrown/90 text-white w-fit">
                <BookOpen className="w-4 h-4 mr-2" />
                Read More
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default BlogPostList;
