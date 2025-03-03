
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { useToast } from "@/components/ui/use-toast";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import BlogHeader from "@/components/blog/BlogHeader";
import BlogGrid from "@/components/blog/BlogGrid";
import BlogFormModal from "@/components/blog/BlogFormModal";
import { createSlug } from "@/utils/blogUtils";

const Blog = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [showPostForm, setShowPostForm] = useState(false);
  const [editingPost, setEditingPost] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Fetch posts from Firestore
  useEffect(() => {
    try {
      const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
      
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const fetchedPosts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPosts(fetchedPosts);
        setLoading(false);
      }, (error) => {
        console.error("Error fetching posts:", error);
        toast({
          title: "Error",
          description: "Failed to load blog posts",
          variant: "destructive",
        });
        setLoading(false);
      });
      
      return () => unsubscribe();
    } catch (error) {
      console.error("Error setting up posts listener:", error);
      setLoading(false);
    }
  }, [toast]);

  const handleEdit = (post: any) => {
    setEditingPost(post);
    setShowPostForm(true);
  };

  const handleCloseForm = () => {
    setShowPostForm(false);
    setEditingPost(null);
  };

  const handleReadMore = (post: any) => {
    const slug = createSlug(post);
    navigate(`/blog/${slug}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <BlogHeader />
      <BlogGrid 
        posts={posts}
        loading={loading}
        currentUser={currentUser}
        onShowPostForm={() => setShowPostForm(true)}
        onReadMore={handleReadMore}
      />
      <BlogFormModal 
        showPostForm={showPostForm}
        editingPost={editingPost}
        onClose={handleCloseForm}
      />
      <Footer />
    </div>
  );
};

export default Blog;
