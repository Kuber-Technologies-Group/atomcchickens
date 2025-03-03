
import React from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import BlogPostForm from "./BlogPostForm";

interface BlogFormModalProps {
  showPostForm: boolean;
  editingPost: any | null;
  onClose: () => void;
}

const BlogFormModal: React.FC<BlogFormModalProps> = ({ 
  showPostForm, 
  editingPost, 
  onClose 
}) => {
  if (!showPostForm) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full p-6 relative">
        <Button 
          variant="ghost" 
          className="absolute top-2 right-2"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
        <BlogPostForm 
          editMode={!!editingPost} 
          post={editingPost}
          onClose={onClose}
        />
      </div>
    </div>
  );
};

export default BlogFormModal;
