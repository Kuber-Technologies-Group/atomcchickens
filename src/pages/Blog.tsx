
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { BookOpen, Clock, CalendarDays, PlusCircle, X } from "lucide-react";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { LoginForm, SignupForm, UserProfile } from "@/components/blog/AuthForms";
import BlogPostForm from "@/components/blog/BlogPostForm";
import BlogPost from "@/components/blog/BlogPost";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

const Blog = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [selectedPost, setSelectedPost] = useState<any | null>(null);
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [showPostForm, setShowPostForm] = useState(false);
  const [editingPost, setEditingPost] = useState<any | null>(null);
  const { currentUser } = useAuth();
  const { toast } = useToast();

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
      }, (error) => {
        console.error("Error fetching posts:", error);
        toast({
          title: "Error",
          description: "Failed to load blog posts",
          variant: "destructive",
        });
      });
      
      return () => unsubscribe();
    } catch (error) {
      console.error("Error setting up posts listener:", error);
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

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative pt-32 bg-cream">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516467508483-a7212febe31a')] bg-cover bg-center bg-no-repeat opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-charcoal mb-6">Our Blog</h1>
            <p className="text-lg text-charcoal/80 max-w-2xl mx-auto font-inter">
              Insights and updates from the world of indigenous poultry farming
            </p>
          </div>
        </div>
      </div>

      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* User Authentication Section - Removed login button from here */}
          <div className="mb-12">
            {currentUser && (
              <div className="mb-8">
                <UserProfile />
              </div>
            )}

            {showAuthForm && !currentUser && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
                  <Button 
                    variant="ghost" 
                    className="absolute top-2 right-2"
                    onClick={() => setShowAuthForm(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  {isLogin ? (
                    <LoginForm onToggle={() => setIsLogin(false)} />
                  ) : (
                    <SignupForm onToggle={() => setIsLogin(true)} />
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Create Post Button for authenticated users */}
          {currentUser && (
            <div className="mb-8">
              <Button 
                onClick={() => setShowPostForm(true)}
                className="bg-warmBrown hover:bg-warmBrown/90 text-white"
              >
                <PlusCircle className="w-4 h-4 mr-2" />
                Create New Post
              </Button>
            </div>
          )}

          {/* Post Form Modal */}
          {showPostForm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg max-w-3xl w-full p-6 relative">
                <Button 
                  variant="ghost" 
                  className="absolute top-2 right-2"
                  onClick={handleCloseForm}
                >
                  <X className="h-4 w-4" />
                </Button>
                <BlogPostForm 
                  editMode={!!editingPost} 
                  post={editingPost}
                  onClose={handleCloseForm}
                />
              </div>
            </div>
          )}

          {/* Single Post View */}
          {selectedPost ? (
            <div className="max-w-4xl mx-auto">
              <Button 
                onClick={() => setSelectedPost(null)}
                variant="ghost"
                className="mb-8"
              >
                ← Back to Blog
              </Button>
              
              <BlogPost post={selectedPost} onEdit={handleEdit} />
            </div>
          ) : (
            /* Posts List */
            <>
              {posts.length > 0 ? (
                <div className="space-y-8">
                  {/* Featured Post (first post with isFeatured flag or first post) */}
                  {posts.length > 0 && (
                    <section className="mb-16">
                      <h2 className="font-playfair text-3xl font-bold text-charcoal mb-8">Featured Post</h2>
                      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                        <div className="grid md:grid-cols-2 h-full">
                          <div className="relative h-full">
                            <img 
                              src={posts[0].imageUrl || "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7"} 
                              alt={posts[0].title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-6">
                            <h3 className="font-playfair text-2xl font-bold text-charcoal mb-4">{posts[0].title}</h3>
                            <p className="text-charcoal/80 mb-4 font-inter line-clamp-2">{posts[0].content}</p>
                            <div className="flex items-center gap-4 text-sm text-charcoal/60 mb-6">
                              <span>By {posts[0].author}</span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {posts[0].createdAt?.seconds
                                  ? new Date(posts[0].createdAt.seconds * 1000).toLocaleDateString()
                                  : 'recent'}
                              </span>
                            </div>
                            <Button 
                              onClick={() => setSelectedPost(posts[0])}
                              className="bg-warmBrown hover:bg-warmBrown/90 text-white"
                            >
                              <BookOpen className="w-4 h-4 mr-2" />
                              Read More
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </section>
                  )}

                  {/* Latest Posts Section */}
                  <section>
                    <h2 className="font-playfair text-3xl font-bold text-charcoal mb-8">Latest Posts</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                      {posts.slice(1).map(post => (
                        <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                          <div className="h-48">
                            <img 
                              src={post.imageUrl || "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7"} 
                              alt={post.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <CardContent className="p-6">
                            <h3 className="font-playfair text-xl font-bold text-charcoal mb-4">{post.title}</h3>
                            <p className="text-charcoal/80 mb-4 font-inter line-clamp-2">{post.content}</p>
                            <div className="flex items-center gap-4 text-sm text-charcoal/60 mb-6">
                              <span>By {post.author}</span>
                              <span className="flex items-center gap-1">
                                <CalendarDays className="w-4 h-4" />
                                {post.createdAt?.seconds
                                  ? new Date(post.createdAt.seconds * 1000).toLocaleDateString()
                                  : 'recent'}
                              </span>
                            </div>
                            <Button 
                              onClick={() => setSelectedPost(post)}
                              className="bg-warmBrown hover:bg-warmBrown/90 text-white"
                            >
                              <BookOpen className="w-4 h-4 mr-2" />
                              Read More
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </section>
                </div>
              ) : (
                <div className="text-center py-12">
                  <h2 className="text-2xl font-playfair mb-4">No posts yet</h2>
                  {currentUser ? (
                    <p>Be the first to create a post!</p>
                  ) : (
                    <p>Login to create the first post</p>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
