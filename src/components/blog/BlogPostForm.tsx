
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/firebase";
import { collection, addDoc, updateDoc, doc, serverTimestamp } from "firebase/firestore";

interface BlogPostFormProps {
  editMode?: boolean;
  post?: {
    id: string;
    title: string;
    content: string;
    imageUrl?: string;
    isFeatured?: boolean;
  };
  onClose: () => void;
}

const BlogPostForm = ({ editMode = false, post, onClose }: BlogPostFormProps) => {
  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFeatured, setIsFeatured] = useState(post?.isFeatured || false);
  const { currentUser } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      toast({
        title: "Authentication required",
        description: "You must be logged in to create or edit posts",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Set a default image URL since we're removing the image upload functionality
      const defaultImageUrl = "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7";

      if (editMode && post) {
        // Update existing post
        const postRef = doc(db, "posts", post.id);
        await updateDoc(postRef, {
          title,
          content,
          updatedAt: serverTimestamp(),
          imageUrl: post.imageUrl || defaultImageUrl,
          isFeatured,
        });
        toast({
          title: "Post updated",
          description: "Your post has been updated successfully",
        });
      } else {
        // Create new post
        await addDoc(collection(db, "posts"), {
          title,
          content,
          author: currentUser.displayName,
          authorId: currentUser.uid,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          imageUrl: defaultImageUrl,
          isFeatured,
        });
        toast({
          title: "Post created",
          description: "Your post has been published successfully",
        });
      }
      setTitle("");
      setContent("");
      setIsFeatured(false);
      onClose();
    } catch (error) {
      console.error("Error saving post:", error);
      toast({
        title: "Error",
        description: "An error occurred while saving your post",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-playfair">
          {editMode ? "Edit Post" : "Create New Post"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-medium">Post Title</label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title"
              required
            />
          </div>
          
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isFeatured"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="h-4 w-4 text-warmBrown border-gray-300 rounded focus:ring-warmBrown"
            />
            <label htmlFor="isFeatured" className="text-sm font-medium">
              Feature this post (shows at the top of the blog)
            </label>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="content" className="block text-sm font-medium">Post Content</label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your post content here..."
              className="min-h-[200px]"
              required
            />
          </div>
          
          <div className="flex justify-end gap-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-warmBrown hover:bg-warmBrown/90 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : editMode ? "Update Post" : "Publish Post"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default BlogPostForm;
