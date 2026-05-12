import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import BlogPostDetail from "@/components/blog/BlogPostDetail";
import BlogFormModal from "@/components/blog/BlogFormModal";
import { getIdFromSlug } from "@/utils/blogUtils";
import type { BlogPost as BlogPostType } from "@/types/blog";
import { Loader2 } from "lucide-react";
import SEO from "@/components/SEO";

const BlogPost = () => {
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<BlogPostType | null>(null);
  const [showPostForm, setShowPostForm] = useState(false);
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();
  const navigate = useNavigate();

  const fetchPost = useCallback(async () => {
    if (!slug) return;
    setLoading(true);

    // Extract UUID from slug — UUIDs are 36 chars
    const id = getIdFromSlug(slug);

    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error || !data) {
      toast({ title: "Post not found", variant: "destructive" });
      navigate("/blog");
    } else {
      setPost(data as BlogPostType);
    }
    setLoading(false);
  }, [slug, toast, navigate]);

  useEffect(() => { fetchPost(); }, [fetchPost]);

  const handleEdit = (post: BlogPostType) => {
    setEditingPost(post);
    setShowPostForm(true);
  };

  const handleCloseForm = () => {
    setShowPostForm(false);
    setEditingPost(null);
  };

  return (
    <div className="min-h-screen bg-white">
      {post && (
        <SEO
          url={`/blog/${slug}`}
          title={post.title}
          description={post.excerpt || post.content.slice(0, 160)}
          image={post.image_url || undefined}
          type="article"
          publishedTime={post.created_at}
          modifiedTime={post.updated_at}
          author={post.author_name}
        />
      )}
      <Navigation />

      <div className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button onClick={() => navigate("/blog")} variant="ghost" className="mb-8 text-warmBrown">
            ← Back to Blog
          </Button>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-10 w-10 animate-spin text-warmBrown" />
            </div>
          ) : post ? (
            <BlogPostDetail post={post} onEdit={handleEdit} />
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-playfair mb-4">Post not found</h2>
              <Button onClick={() => navigate("/blog")} className="bg-warmBrown hover:bg-warmBrown/90 text-white">
                Return to Blog
              </Button>
            </div>
          )}
        </div>
      </div>

      <BlogFormModal
        showPostForm={showPostForm}
        editingPost={editingPost}
        onClose={handleCloseForm}
        onSaved={fetchPost}
      />

      <Footer />
    </div>
  );
};

export default BlogPost;
