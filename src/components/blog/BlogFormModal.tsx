import React from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import BlogPostForm from "./BlogPostForm";
import type { BlogPost } from "@/types/blog";

interface BlogFormModalProps {
  showPostForm: boolean;
  editingPost: BlogPost | null;
  onClose: () => void;
  onSaved: () => void;
}

const BlogFormModal = ({ showPostForm, editingPost, onClose, onSaved }: BlogFormModalProps) => {
  if (!showPostForm) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-3xl w-full p-6 relative my-8">
        <Button variant="ghost" className="absolute top-2 right-2" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
        <BlogPostForm editMode={!!editingPost} post={editingPost ?? undefined} onClose={onClose} onSaved={onSaved} />
      </div>
    </div>
  );
};

export default BlogFormModal;
