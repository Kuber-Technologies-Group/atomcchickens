import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Share2, Clock, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { formatDate, createSlug } from "@/utils/blogUtils";
import { useNavigate } from "react-router-dom";
import type { BlogPost } from "@/types/blog";

const FALLBACK_IMAGE = "https://cdn.pixabay.com/photo/2022/04/03/19/22/bird-7109752_1280.jpg";

interface BlogPostDetailProps {
  post: BlogPost;
  onEdit: (post: BlogPost) => void;
}

const BlogPostDetail = ({ post, onEdit }: BlogPostDetailProps) => {
  const { currentUser, isAdmin } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!confirm("Delete this post? This cannot be undone.")) return;
    const { error } = await supabase.from("blog_posts").delete().eq("id", post.id);
    if (error) {
      toast({ title: "Error", description: "Failed to delete post.", variant: "destructive" });
    } else {
      toast({ title: "Post deleted" });
      navigate("/blog");
    }
  };

  const handleShare = () => {
    const slug = createSlug(post.title, post.id);
    const url = `${window.location.origin}/blog/${slug}`;
    if (navigator.share) {
      navigator.share({ title: post.title, url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url).then(() =>
        toast({ title: "Link copied!", description: "Share it with your friends." })
      );
    }
  };

  return (
    <article>
      {post.image_url && (
        <div className="w-full h-[360px] overflow-hidden rounded-lg mb-8">
          <img src={post.image_url || FALLBACK_IMAGE} alt={post.title} className="w-full h-full object-cover" />
        </div>
      )}

      <h1 className="font-playfair text-4xl font-bold text-charcoal mb-4">{post.title}</h1>

      <div className="flex items-center gap-4 text-sm text-charcoal/60 mb-8 border-b border-charcoal/10 pb-6">
        <span className="flex items-center gap-1.5"><User className="w-4 h-4" />{post.author_name}</span>
        <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{formatDate(post.created_at)}</span>
      </div>

      <div className="text-charcoal/80 whitespace-pre-line leading-relaxed text-lg font-inter mb-10">
        {post.content}
      </div>

      <div className="flex items-center justify-between border-t border-charcoal/10 pt-6">
        <Button variant="outline" onClick={handleShare} className="flex items-center gap-2">
          <Share2 className="w-4 h-4" />
          Share
        </Button>
        {isAdmin && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(post)}
              className="text-warmBrown border-warmBrown hover:bg-warmBrown hover:text-white"
            >
              <Pencil className="w-4 h-4 mr-1" />
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDelete}
              className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Delete
            </Button>
          </div>
        )}
      </div>
    </article>
  );
};

export default BlogPostDetail;
