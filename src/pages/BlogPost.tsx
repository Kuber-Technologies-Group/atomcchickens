import { useParams, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import BlogPostComponent from "@/components/blog/BlogPost";
import { useBlogPost } from "@/hooks/useBlogPosts";
import { Skeleton } from "@/components/ui/skeleton";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: post, isLoading } = useBlogPost(slug || "");

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-[300px] w-full rounded-lg" />
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-40 w-full" />
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
              
              <BlogPostComponent post={post} />
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

      <Footer />
    </div>
  );
};

export default BlogPost;
