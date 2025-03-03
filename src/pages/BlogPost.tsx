import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import BlogPostComponent from "@/components/blog/BlogPost";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "@/components/ui/use-toast";
import BlogFormModal from "@/components/blog/BlogFormModal";

const BlogPost = () => {
  const [post, setPost] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<any | null>(null);
  const [showPostForm, setShowPostForm] = useState(false);
  const { slug } = useParams<{ slug: string }>();
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const decodedSlug = decodeURIComponent(slug || "");
        const postId = decodedSlug.split("-").pop();
        
        if (!postId) {
          toast({
            title: "Error",
            description: "Invalid blog post URL",
            variant: "destructive",
          });
          navigate("/blog");
          return;
        }

        const postDoc = await getDoc(doc(db, "posts", postId));
        
        if (postDoc.exists()) {
          setPost({
            id: postDoc.id,
            ...postDoc.data()
          });
        } else {
          toast({
            title: "Error",
            description: "Blog post not found",
            variant: "destructive",
          });
          navigate("/blog");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
        toast({
          title: "Error",
          description: "Failed to load blog post",
          variant: "destructive",
        });
        navigate("/blog");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug, toast, navigate]);

  const handleEdit = (post: any) => {
    setEditingPost(post);
    setShowPostForm(true);
  };

  const handleCloseForm = () => {
    setShowPostForm(false);
    setEditingPost(null);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <p>Loading post...</p>
            </div>
          ) : post ? (
            <>
              <Button 
                onClick={() => navigate("/blog")}
                variant="ghost"
                className="mb-8"
              >
                ← Back to Blog
              </Button>
              
              <BlogPostComponent post={post} onEdit={handleEdit} />
            </>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-playfair mb-4">Post not found</h2>
              <Button 
                onClick={() => navigate("/blog")}
                className="bg-warmBrown hover:bg-warmBrown/90 text-white"
              >
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
      />

      <Footer />
    </div>
  );
};

export default BlogPost;
