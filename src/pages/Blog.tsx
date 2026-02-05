import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BlogHeader from "@/components/blog/BlogHeader";
import BlogGrid from "@/components/blog/BlogGrid";
import { useBlogPosts } from "@/hooks/useBlogPosts";

const Blog = () => {
  const { data: posts = [], isLoading } = useBlogPosts();

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <BlogHeader />
      <BlogGrid 
        posts={posts}
        loading={isLoading}
      />
      <Footer />
    </div>
  );
};

export default Blog;
