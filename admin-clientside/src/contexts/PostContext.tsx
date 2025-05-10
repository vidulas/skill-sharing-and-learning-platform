import React, { useEffect, useState, createContext, useContext } from 'react';
type Author = {
  id: string;
  name: string;
  avatar: string;
};
type Comment = {
  id: string;
  text: string;
  author: Author;
  createdAt: string;
};
export type Post = {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: Author;
  category: string;
  createdAt: string;
  likes: number;
  comments: Comment[];
  image?: string;
};
type PostContextType = {
  posts: Post[];
  loading: boolean;
  error: string | null;
  fetchPosts: () => Promise<void>;
  getPostById: (id: string) => Post | undefined;
  createPost: (post: Omit<Post, 'id' | 'createdAt' | 'likes' | 'comments'>) => Promise<void>;
  likePost: (id: string) => void;
  addComment: (postId: string, text: string) => void;
};
const PostContext = createContext<PostContextType | undefined>(undefined);
export const usePost = () => {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error('usePost must be used within a PostProvider');
  }
  return context;
};
export const PostProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Fetch posts on mount
  useEffect(() => {
    fetchPosts();
  }, []);
  // Mock fetch posts function
  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      // This would be an API call in a real application
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Mock data
      const mockPosts: Post[] = [{
        id: '1',
        title: 'Getting Started with React',
        content: "<p>React is a JavaScript library for building user interfaces. It is maintained by Facebook and a community of individual developers and companies. React can be used as a base in the development of single-page or mobile applications.</p><p>React is all about components. You'll build encapsulated components that manage their own state, then compose them to make complex UIs. Since component logic is written in JavaScript instead of templates, you can easily pass rich data through your app and keep state out of the DOM.</p>",
        excerpt: 'Learn the basics of React and how to build your first component.',
        author: {
          id: '1',
          name: 'John Doe',
          avatar: 'https://i.pravatar.cc/150?u=john'
        },
        category: 'Web Development',
        createdAt: '2023-06-15T10:30:00Z',
        likes: 42,
        comments: [{
          id: '101',
          text: 'Great introduction to React!',
          author: {
            id: '2',
            name: 'Jane Smith',
            avatar: 'https://i.pravatar.cc/150?u=jane'
          },
          createdAt: '2023-06-16T08:15:00Z'
        }],
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
      }, {
        id: '2',
        title: 'Advanced CSS Techniques',
        content: "<p>CSS is evolving rapidly, with new features being added regularly. This post covers some advanced techniques that can take your styling to the next level.</p><p>We'll explore CSS Grid, Flexbox, Custom Properties (variables), and more modern approaches to create responsive and maintainable stylesheets.</p>",
        excerpt: 'Take your CSS skills to the next level with these advanced techniques.',
        author: {
          id: '3',
          name: 'Alice Johnson',
          avatar: 'https://i.pravatar.cc/150?u=alice'
        },
        category: 'CSS',
        createdAt: '2023-06-10T14:45:00Z',
        likes: 38,
        comments: [],
        image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
      }, {
        id: '3',
        title: 'Introduction to TypeScript',
        content: "<p>TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.</p><p>It adds static type definitions to JavaScript, which can help you catch errors early and make your code more robust. In this post, we'll cover the basics of TypeScript and how to get started.</p>",
        excerpt: 'Learn why TypeScript is becoming the preferred choice for large-scale JavaScript applications.',
        author: {
          id: '4',
          name: 'Bob Wilson',
          avatar: 'https://i.pravatar.cc/150?u=bob'
        },
        category: 'TypeScript',
        createdAt: '2023-06-05T09:20:00Z',
        likes: 27,
        comments: [{
          id: '102',
          text: 'TypeScript has been a game-changer for our team!',
          author: {
            id: '5',
            name: 'Eva Brown',
            avatar: 'https://i.pravatar.cc/150?u=eva'
          },
          createdAt: '2023-06-06T11:30:00Z'
        }],
        image: 'https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
      }];
      setPosts(mockPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Failed to fetch posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  // Get post by ID
  const getPostById = (id: string) => {
    return posts.find(post => post.id === id);
  };
  // Create new post
  const createPost = async (post: Omit<Post, 'id' | 'createdAt' | 'likes' | 'comments'>) => {
    setLoading(true);
    try {
      // This would be an API call in a real application
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Create a new post with generated ID and current date
      const newPost: Post = {
        ...post,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        likes: 0,
        comments: []
      };
      setPosts(prevPosts => [newPost, ...prevPosts]);
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  // Like a post
  const likePost = (id: string) => {
    setPosts(prevPosts => prevPosts.map(post => post.id === id ? {
      ...post,
      likes: post.likes + 1
    } : post));
  };
  // Add comment to a post
  const addComment = (postId: string, text: string) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.id) return;
    const newComment: Comment = {
      id: Date.now().toString(),
      text,
      author: {
        id: user.id,
        name: user.name,
        avatar: user.avatar
      },
      createdAt: new Date().toISOString()
    };
    setPosts(prevPosts => prevPosts.map(post => post.id === postId ? {
      ...post,
      comments: [...post.comments, newComment]
    } : post));
  };
  return <PostContext.Provider value={{
    posts,
    loading,
    error,
    fetchPosts,
    getPostById,
    createPost,
    likePost,
    addComment
  }}>
      {children}
    </PostContext.Provider>;
};