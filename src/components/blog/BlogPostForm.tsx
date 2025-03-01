
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/firebase";
import { collection, addDoc, updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(post?.imageUrl || "");
  const [isFeatured, setIsFeatured] = useState(post?.isFeatured || false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const storage = getStorage();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      // Create a preview
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImagePreview(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

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
      let imageUrl = post?.imageUrl || "";
      
      // Upload image if a new one is selected
      if (imageFile) {
        const storageRef = ref(storage, `blog-images/${Date.now()}_${imageFile.name}`);
        const snapshot = await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      if (editMode && post) {
        // Update existing post
        const postRef = doc(db, "posts", post.id);
        await updateDoc(postRef, {
          title,
          content,
          updatedAt: serverTimestamp(),
          imageUrl: imageUrl || post.imageUrl,
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
          imageUrl,
          isFeatured,
        });
        toast({
          title: "Post created",
          description: "Your post has been published successfully",
        });
      }
      setTitle("");
      setContent("");
      setImageFile(null);
      setImagePreview("");
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
          
          <div className="space-y-2">
            <label className="block text-sm font-medium">Post Image</label>
            <div className="flex items-center gap-2">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
              >
                Select Image
              </Button>
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
                accept="image/*"
              />
              <span className="text-sm text-gray-500">
                {imageFile ? imageFile.name : "No file selected"}
              </span>
            </div>
            
            {imagePreview && (
              <div className="mt-2">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="h-40 object-cover rounded-md border border-gray-200"
                />
              </div>
            )}
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
