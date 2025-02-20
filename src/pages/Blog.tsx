
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { BookOpen, MessageSquare, ThumbsUp, ThumbsDown, Clock, CalendarDays } from "lucide-react";
import { useState } from "react";

// Mock data for posts
const posts = [
  {
    id: 1,
    title: "The Benefits of Raising Road Runner Chickens",
    excerpt: "Discover why road runner chickens are becoming increasingly popular among farmers...",
    content: "Road runner chickens, also known as indigenous chickens, have been gaining popularity among farmers and homesteaders alike. These hardy birds are known for their excellent foraging abilities, disease resistance, and ability to produce both eggs and meat efficiently...",
    author: "John Doe",
    date: "2024-02-15",
    readTime: "5 min read",
    featured: true,
    image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7",
    likes: 24,
    dislikes: 2,
    comments: [
      {
        id: 1,
        author: "Jane Smith",
        content: "Great article! I've been raising road runners for years and completely agree.",
        date: "2024-02-16"
      }
    ]
  },
  {
    id: 2,
    title: "Essential Tips for Successful Chicken Breeding",
    excerpt: "Learn the fundamental practices for maintaining a healthy breeding program...",
    content: "Successful chicken breeding requires careful attention to several key factors. From selecting the right breeding pairs to maintaining optimal conditions for egg development...",
    author: "Sarah Johnson",
    date: "2024-02-14",
    readTime: "4 min read",
    featured: false,
    image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7",
    likes: 18,
    dislikes: 1,
    comments: []
  }
];

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState<typeof posts[0] | null>(null);
  const [comment, setComment] = useState("");
  const { toast } = useToast();

  const handleLike = (postId: number) => {
    toast({
      title: "Thanks for your reaction!",
      description: "Your like has been recorded.",
    });
  };

  const handleDislike = (postId: number) => {
    toast({
      title: "Thanks for your reaction!",
      description: "Your dislike has been recorded.",
    });
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Comment Posted",
      description: "Your comment has been added successfully.",
    });
    setComment("");
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
          {!selectedPost ? (
            <>
              {/* Featured Post Section */}
              <section className="mb-16">
                <h2 className="font-playfair text-3xl font-bold text-charcoal mb-8">Featured Post</h2>
                {posts.filter(post => post.featured).map(post => (
                  <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="h-48 md:h-48">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="font-playfair text-2xl font-bold text-charcoal mb-4">{post.title}</h3>
                        <p className="text-charcoal/80 mb-4 font-inter line-clamp-2">{post.excerpt}</p>
                        <div className="flex items-center gap-4 text-sm text-charcoal/60 mb-6">
                          <span className="flex items-center gap-1">
                            <CalendarDays className="w-4 h-4" />
                            {post.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.readTime}
                          </span>
                        </div>
                        <Button 
                          onClick={() => setSelectedPost(post)}
                          className="bg-warmBrown hover:bg-warmBrown/90 text-white"
                        >
                          <BookOpen className="w-4 h-4 mr-2" />
                          Read More
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </section>

              {/* Latest Posts Section */}
              <section>
                <h2 className="font-playfair text-3xl font-bold text-charcoal mb-8">Latest Posts</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {posts.filter(post => !post.featured).map(post => (
                    <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                      <div className="h-48">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-6">
                        <h3 className="font-playfair text-xl font-bold text-charcoal mb-4">{post.title}</h3>
                        <p className="text-charcoal/80 mb-4 font-inter line-clamp-2">{post.excerpt}</p>
                        <div className="flex items-center gap-4 text-sm text-charcoal/60 mb-6">
                          <span className="flex items-center gap-1">
                            <CalendarDays className="w-4 h-4" />
                            {post.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.readTime}
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
            </>
          ) : (
            /* Single Post View */
            <div className="max-w-4xl mx-auto">
              <Button 
                onClick={() => setSelectedPost(null)}
                variant="ghost"
                className="mb-8"
              >
                ← Back to Blog
              </Button>
              
              <article className="prose prose-lg max-w-none">
                <h1 className="font-playfair text-4xl font-bold text-charcoal mb-6">{selectedPost.title}</h1>
                <div className="flex items-center gap-4 text-sm text-charcoal/60 mb-8">
                  <span>By {selectedPost.author}</span>
                  <span className="flex items-center gap-1">
                    <CalendarDays className="w-4 h-4" />
                    {selectedPost.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {selectedPost.readTime}
                  </span>
                </div>
                
                <img 
                  src={selectedPost.image} 
                  alt={selectedPost.title}
                  className="w-full h-96 object-cover rounded-lg mb-8"
                />
                
                <div className="text-charcoal/80 font-inter leading-relaxed mb-8">
                  {selectedPost.content}
                </div>

                {/* Reactions */}
                <div className="flex gap-4 mb-8">
                  <Button
                    variant="outline"
                    onClick={() => handleLike(selectedPost.id)}
                    className="flex items-center gap-2"
                  >
                    <ThumbsUp className="w-4 h-4" />
                    {selectedPost.likes}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleDislike(selectedPost.id)}
                    className="flex items-center gap-2"
                  >
                    <ThumbsDown className="w-4 h-4" />
                    {selectedPost.dislikes}
                  </Button>
                </div>

                {/* Comments Section */}
                <section className="mt-12">
                  <h2 className="font-playfair text-2xl font-bold text-charcoal mb-6">Comments</h2>
                  
                  {/* Comment Form */}
                  <form onSubmit={handleCommentSubmit} className="mb-8">
                    <Textarea
                      placeholder="Leave a comment..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="mb-4"
                    />
                    <Button type="submit" className="bg-warmBrown hover:bg-warmBrown/90 text-white">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Post Comment
                    </Button>
                  </form>

                  {/* Comments List */}
                  <div className="space-y-6">
                    {selectedPost.comments.map((comment) => (
                      <Card key={comment.id} className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-charcoal">{comment.author}</h3>
                          <span className="text-sm text-charcoal/60">{comment.date}</span>
                        </div>
                        <p className="text-charcoal/80">{comment.content}</p>
                      </Card>
                    ))}
                  </div>
                </section>
              </article>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
