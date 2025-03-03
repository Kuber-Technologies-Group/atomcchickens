
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, CalendarDays } from "lucide-react";

interface BlogPostListProps {
  posts: any[];
  onReadMore: (post: any) => void;
}

const BlogPostList: React.FC<BlogPostListProps> = ({ posts, onReadMore }) => {
  if (posts.length === 0) return null;
  
  return (
    <section>
      <h2 className="font-playfair text-3xl font-bold text-charcoal mb-8">Latest Posts</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {posts.map(post => (
          <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="h-48">
              <img 
                src={post.imageUrl || "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7"} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-6">
              <h3 className="font-playfair text-xl font-bold text-charcoal mb-4">{post.title}</h3>
              <p className="text-charcoal/80 mb-4 font-inter line-clamp-2">{post.content}</p>
              <div className="flex items-center gap-4 text-sm text-charcoal/60 mb-6">
                <span>By {post.author}</span>
                <span className="flex items-center gap-1">
                  <CalendarDays className="w-4 h-4" />
                  {post.createdAt?.seconds
                    ? new Date(post.createdAt.seconds * 1000).toLocaleDateString()
                    : 'recent'}
                </span>
              </div>
              <Button 
                onClick={() => onReadMore(post)}
                className="bg-warmBrown hover:bg-warmBrown/90 text-white"
              >
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
