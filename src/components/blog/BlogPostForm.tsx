import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { createSlug } from "@/utils/blogUtils";
import { getExcerpt } from "@/utils/blogUtils";
import type { BlogPost } from "@/types/blog";

interface BlogPostFormProps {
  editMode?: boolean;
  post?: BlogPost;
  onClose: () => void;
  onSaved: () => void;
}

const BlogPostForm = ({ editMode = false, post, onClose, onSaved }: BlogPostFormProps) => {
  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");
  const [imageUrl, setImageUrl] = useState(post?.image_url || "");
  const [isFeatured, setIsFeatured] = useState(post?.is_featured || false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { currentUser } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    setIsSubmitting(true);

    try {
      const displayName =
        currentUser.user_metadata?.display_name ||
        currentUser.email?.split("@")[0] ||
        "Admin";

      const excerpt = getExcerpt(content, 200);

      if (editMode && post) {
        const { error } = await supabase
          .from("blog_posts")
          .update({
            title,
            content,
            excerpt,
            image_url: imageUrl || null,
            is_featured: isFeatured,
          })
          .eq("id", post.id);

        if (error) throw error;
        toast({ title: "Post updated", description: "Your post has been updated." });
      } else {
        // Generate a temporary slug — we need the UUID first
        const tempSlug = createSlug(title, crypto.randomUUID());
        const { error } = await supabase
          .from("blog_posts")
          .insert({
            title,
            slug: tempSlug,
            content,
            excerpt,
            image_url: imageUrl || null,
            is_featured: isFeatured,
            author_id: currentUser.id,
            author_name: displayName,
          });

        if (error) throw error;
        toast({ title: "Post published", description: "Your post is now live." });
      }

      onSaved();
      onClose();
    } catch (error: any) {
      console.error(error);
      toast({ title: "Error", description: error?.message || "Failed to save post.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full border-0 shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl font-playfair">
          {editMode ? "Edit Post" : "New Post"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Post title" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Cover image URL <span className="text-charcoal/50">(optional)</span></label>
            <Input value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="https://..." />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isFeatured"
              checked={isFeatured}
              onChange={e => setIsFeatured(e.target.checked)}
              className="h-4 w-4 text-warmBrown border-gray-300 rounded"
            />
            <label htmlFor="isFeatured" className="text-sm font-medium">Feature this post at the top</label>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Content</label>
            <Textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Write your post content here…"
              className="min-h-[220px]"
              required
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" className="bg-warmBrown hover:bg-warmBrown/90 text-white" disabled={isSubmitting}>
              {isSubmitting ? "Saving…" : editMode ? "Update Post" : "Publish Post"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default BlogPostForm;
