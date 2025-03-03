
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, ThumbsUp, ThumbsDown, MessageSquare, Share2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { useToast } from "@/components/ui/use-toast";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";

interface BlogPostProps {
  post: {
    id: string;
    title: string;
    content: string;
    author: string;
    authorId: string;
    createdAt: { seconds: number };
    imageUrl?: string;
    likes?: number;
    dislikes?: number;
    comments?: Array<{ id: number; author: string; content: string; date: string }>;
  };
  onEdit: (post: any) => void;
}

// Helper function to create slug from post data (duplicate here for component use)
const createSlug = (post: any) => {
  let date = "unknown-date";
  
  if (post.createdAt?.seconds) {
    const postDate = new Date(post.createdAt.seconds * 1000);
    date = postDate.toISOString().split('T')[0]; // Format: YYYY-MM-DD
  }
  
  // Clean title for URL (lowercase, remove special chars, replace spaces with hyphens)
  const titleSlug = post.title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
  
  // Add post ID at the end to ensure uniqueness
  return `${date}-${titleSlug}-${post.id}`;
};

const BlogPost: React.FC<BlogPostProps> = ({ post, onEdit }) => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const isAuthor = currentUser?.uid === post.authorId;
  
  const timeAgo = post.createdAt?.seconds
    ? formatDistanceToNow(new Date(post.createdAt.seconds * 1000), { addSuffix: true })
    : 'recently';

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) {
      return;
    }
    
    try {
      await deleteDoc(doc(db, "posts", post.id));
      toast({
        title: "Post deleted",
        description: "The post has been deleted successfully",
      });
      // Navigate back to blog listing after deletion
      navigate("/blog");
    } catch (error) {
      console.error("Error deleting post:", error);
      toast({
        title: "Error",
        description: "Failed to delete the post",
        variant: "destructive",
      });
    }
  };

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
    const postSlug = createSlug(post);
    const shareUrl = `${window.location.origin}/blog/${postSlug}`;
  
    // Extract a short excerpt from post.content
    const excerpt = post.content
      ? post.content.replace(/<\/?[^>]+(>|$)/g, "").slice(0, 150) + "..." // Strips HTML tags and trims content
      : "Check out this amazing blog post!";
  
    const shareMessage = `📖 "${post.title}" – ${excerpt}\n🔗 Read more: ${shareUrl}`;
  
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
      {post.imageUrl && (
        <div className="w-full h-[300px] overflow-hidden">
          <img 
            src={post.imageUrl} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <CardContent className="p-6">
        <h3 className="font-playfair text-2xl font-bold text-charcoal mb-2">{post.title}</h3>
        
        <div className="flex items-center gap-2 text-sm text-charcoal/60 mb-4">
          <span>By {post.author}</span>
          <span>•</span>
          <span>{timeAgo}</span>
        </div>
        
        <div className="text-charcoal/80 mb-6 whitespace-pre-line">
          {post.content}
        </div>
        
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-2">
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
              {post.comments?.length || 0}
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
          
          {isAuthor && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(post)}
                className="text-warmBrown border-warmBrown hover:bg-warmBrown hover:text-white"
              >
                <Pencil className="w-4 h-4" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDelete}
                className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogPost;
