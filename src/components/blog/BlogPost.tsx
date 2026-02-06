import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, MessageSquare, Share2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { formatDistanceToNow } from "date-fns";
import type { BlogPost as BlogPostType } from "@/types/blog";

interface BlogPostProps {
  post: BlogPostType;
}

const BlogPost: React.FC<BlogPostProps> = ({ post }) => {
  const { toast } = useToast();

  const timeAgo = formatDistanceToNow(new Date(post.created_at), { addSuffix: true });

  const handleLike = () => {
    toast({
      title: "Thanks for your reaction!",
      description: "Your like has been recorded.",
    });
  };

  const handleDislike = () => {
    toast({
      title: "Thanks for your reaction!",
      description: "Your dislike has been recorded.",
    });
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/blog/${post.slug}`;
    const excerpt = post.content
      ? post.content.replace(/<\/?[^>]+(>|$)/g, "").slice(0, 500) + "..."
      : "Check out this awesome post!";

    const shareMessage = `${post.title}\n\n${excerpt}\n\n\n🔗 Read more:`;

    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: shareMessage,
        url: shareUrl,
      })
        .then(() => toast({
          title: "🎉 Shared Successfully!",
          description: "Your friends can now check out this awesome post.",
        }))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      navigator.clipboard.writeText(shareUrl)
        .then(() => toast({
          title: "🔗 Link Copied!",
          description: "Share it with your friends and let them enjoy the read!",
        }))
        .catch(() => toast({
          title: "❌ Oops!",
          description: "Couldn't copy the link. Try again.",
          variant: "destructive",
        }));
    }
  };

  return (
    <Card className="mb-6 overflow-hidden hover:shadow-md transition-shadow duration-300">
      {post.image_url && (
        <div className="w-full h-[300px] overflow-hidden">
          <img 
            src={post.image_url} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <CardContent className="p-6">
        <h3 className="font-playfair text-2xl font-bold text-charcoal mb-2">{post.title}</h3>
        
        <div className="flex items-center gap-2 text-sm text-charcoal/60 mb-4">
          <span>By {post.author_name}</span>
          <span>•</span>
          <span>{timeAgo}</span>
        </div>
        
        <div className="text-charcoal/80 mb-6 whitespace-pre-line">
          {post.content}
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            onClick={handleLike}
            className="flex items-center gap-2"
            size="sm"
          >
            <ThumbsUp className="w-4 h-4" />
            {post.likes || 0}
          </Button>
          <Button
            variant="outline"
            onClick={handleDislike}
            className="flex items-center gap-2"
            size="sm"
          >
            <ThumbsDown className="w-4 h-4" />
            {post.dislikes || 0}
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2"
            size="sm"
          >
            <MessageSquare className="w-4 h-4" />
            0
          </Button>
          <Button
            variant="outline"
            onClick={handleShare}
            className="flex items-center gap-2"
            size="sm"
          >
            <Share2 className="w-4 h-4" />
            Share
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogPost;
