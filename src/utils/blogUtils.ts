
// Helper function to create slug from post data
export const createSlug = (post: any) => {
  let date = "unknown-date";
  
  if (post.createdAt?.seconds) {
    const postDate = new Date(post.createdAt.seconds * 1000);
    date = postDate.toISOString().split('T')[0]; // Format: YYYY-MM-DD
  }
  
  // Clean title for URL (lowercase, remove special chars, replace spaces with hyphens)
  const titleSlug = post.title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
  
  // Add post ID at the end to ensure uniqueness
  return `${date}-${titleSlug}-${post.id}`;
};
