import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import BlogHeader from "@/components/blog/BlogHeader";
import SEO from "@/components/SEO";
import BlogGrid from "@/components/blog/BlogGrid";
import BlogFormModal from "@/components/blog/BlogFormModal";
import { createSlug } from "@/utils/blogUtils";
import type { BlogPost } from "@/types/blog";

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [showPostForm, setShowPostForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Error", description: "Failed to load posts.", variant: "destructive" });
    } else {
      setPosts(data as BlogPost[]);
    }
    setLoading(false);
  }, [toast]);

  useEffect(() => {
    fetchPosts();

    // Real-time subscription
    const channel = supabase
      .channel("blog_posts_changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "blog_posts" }, fetchPosts)
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [fetchPosts]);

  const handleReadMore = (post: BlogPost) => {
    navigate(`/blog/${createSlug(post.title, post.id)}`);
  };

  const handleCloseForm = () => {
    setShowPostForm(false);
    setEditingPost(null);
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO
        url="/blog"
        title="Blog — Poultry Farming Insights"
        description="Expert articles on exotic chicken breeds, poultry farming tips, breed comparisons, and farming insights from the team at Atomc Chickens, Bulawayo Zimbabwe."
      />
      <Navigation />
      <BlogHeader />
      <BlogGrid
        posts={posts}
        loading={loading}
        isAdmin={isAdmin}
        onShowPostForm={() => setShowPostForm(true)}
        onReadMore={handleReadMore}
      />
      <BlogFormModal
        showPostForm={showPostForm}
        editingPost={editingPost}
        onClose={handleCloseForm}
        onSaved={fetchPosts}
      />
      <Footer />
    </div>
  );
};

export default Blog;
