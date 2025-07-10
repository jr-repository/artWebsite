import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  BarChart3,
  Users,
  FileText,
  Settings,
  LogOut
} from 'lucide-react';
import ImageUploader from '@/components/ImageUploader';

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image_url: string;
  client: string;
  year: number;
  website_url: string;
  featured: boolean;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string;
  author: string;
  category: string;
  published: boolean;
  read_time: number;
}

const Admin = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | BlogPost | null>(null);
  const [activeTab, setActiveTab] = useState('portfolio');
  
  const [portfolioForm, setPortfolioForm] = useState({
    title: '',
    category: '',
    description: '',
    image_url: '',
    client: '',
    year: new Date().getFullYear(),
    website_url: '',
    featured: false
  });

  const [blogForm, setBlogForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    image_url: '',
    author: 'Admin ArtWeb',
    category: '',
    published: false,
    read_time: 5
  });

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    fetchData();
  }, [user, navigate]);

  const fetchData = async () => {
    try {
      const [portfolioRes, blogRes] = await Promise.all([
        supabase.from('portfolio').select('*').order('created_at', { ascending: false }),
        supabase.from('blog_posts').select('*').order('created_at', { ascending: false })
      ]);

      if (portfolioRes.error) throw portfolioRes.error;
      if (blogRes.error) throw blogRes.error;

      setPortfolioItems(portfolioRes.data || []);
      setBlogPosts(blogRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  // Portfolio handlers
  const handlePortfolioEdit = (item: PortfolioItem) => {
    setEditingItem(item);
    setPortfolioForm({
      title: item.title,
      category: item.category,
      description: item.description || '',
      image_url: item.image_url,
      client: item.client || '',
      year: item.year,
      website_url: item.website_url || '',
      featured: item.featured
    });
    setIsEditMode(true);
  };

  const handlePortfolioSave = async () => {
    try {
      if (editingItem && 'client' in editingItem) {
        const { error } = await supabase
          .from('portfolio')
          .update(portfolioForm)
          .eq('id', editingItem.id);
        
        if (error) throw error;
        toast({ title: "Success", description: "Portfolio item updated successfully" });
      } else {
        const { error } = await supabase
          .from('portfolio')
          .insert([portfolioForm]);
        
        if (error) throw error;
        toast({ title: "Success", description: "Portfolio item created successfully" });
      }
      
      await fetchData();
      handleCancel();
    } catch (error) {
      console.error('Error saving portfolio:', error);
      toast({
        title: "Error",
        description: "Failed to save portfolio item",
        variant: "destructive"
      });
    }
  };

  const handlePortfolioDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('portfolio')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      await fetchData();
      toast({ title: "Success", description: "Portfolio item deleted successfully" });
    } catch (error) {
      console.error('Error deleting portfolio:', error);
      toast({
        title: "Error",
        description: "Failed to delete portfolio item",
        variant: "destructive"
      });
    }
  };

  // Blog handlers
  const handleBlogEdit = (post: BlogPost) => {
    setEditingItem(post);
    setBlogForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || '',
      content: post.content,
      image_url: post.image_url,
      author: post.author,
      category: post.category,
      published: post.published,
      read_time: post.read_time
    });
    setIsEditMode(true);
  };

  const handleBlogSave = async () => {
    try {
      const slug = blogForm.slug || generateSlug(blogForm.title);
      const formWithSlug = { ...blogForm, slug };

      if (editingItem && 'slug' in editingItem) {
        const { error } = await supabase
          .from('blog_posts')
          .update(formWithSlug)
          .eq('id', editingItem.id);
        
        if (error) throw error;
        toast({ title: "Success", description: "Blog post updated successfully" });
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .insert([formWithSlug]);
        
        if (error) throw error;
        toast({ title: "Success", description: "Blog post created successfully" });
      }
      
      await fetchData();
      handleCancel();
    } catch (error) {
      console.error('Error saving blog post:', error);
      toast({
        title: "Error",
        description: "Failed to save blog post",
        variant: "destructive"
      });
    }
  };

  const handleBlogDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      await fetchData();
      toast({ title: "Success", description: "Blog post deleted successfully" });
    } catch (error) {
      console.error('Error deleting blog post:', error);
      toast({
        title: "Error",
        description: "Failed to delete blog post",
        variant: "destructive"
      });
    }
  };

  const handleCancel = () => {
    setIsEditMode(false);
    setEditingItem(null);
    setPortfolioForm({
      title: '',
      category: '',
      description: '',
      image_url: '',
      client: '',
      year: new Date().getFullYear(),
      website_url: '',
      featured: false
    });
    setBlogForm({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      image_url: '',
      author: 'Admin ArtWeb',
      category: '',
      published: false,
      read_time: 5
    });
  };

  const portfolioStats = [
    {
      title: "Total Portfolio",
      value: portfolioItems.length,
      icon: BarChart3,
      color: "text-blue-600"
    },
    {
      title: "Featured Items",
      value: portfolioItems.filter(p => p.featured).length,
      icon: Eye,
      color: "text-green-600"
    },
    {
      title: "Total Blog Posts",
      value: blogPosts.length,
      icon: FileText,
      color: "text-purple-600"
    },
    {
      title: "Published Posts",
      value: blogPosts.filter(p => p.published).length,
      icon: Users,
      color: "text-orange-600"
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Admin</h1>
            <p className="text-gray-600">Kelola portfolio dan konten website</p>
          </div>
          <Button onClick={handleSignOut} variant="outline">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {portfolioStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                    <Icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Content Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                <TabsTrigger value="blog">Blog</TabsTrigger>
              </TabsList>
              
              <TabsContent value="portfolio" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Portfolio Management</h3>
                  <Button onClick={() => { setActiveTab('portfolio'); setIsEditMode(true); }} className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add Portfolio Item
                  </Button>
                </div>

                {isEditMode && activeTab === 'portfolio' && (
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">
                      {editingItem ? 'Edit Portfolio Item' : 'Add New Portfolio Item'}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="title">Title</Label>
                        <Input
                          id="title"
                          value={portfolioForm.title}
                          onChange={(e) => setPortfolioForm({...portfolioForm, title: e.target.value})}
                          placeholder="Project title"
                        />
                      </div>
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select value={portfolioForm.category} onValueChange={(value) => setPortfolioForm({...portfolioForm, category: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Web Development">Web Development</SelectItem>
                            <SelectItem value="Mobile Development">Mobile Development</SelectItem>
                            <SelectItem value="UI/UX Design">UI/UX Design</SelectItem>
                            <SelectItem value="E-Commerce">E-Commerce</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={portfolioForm.description}
                          onChange={(e) => setPortfolioForm({...portfolioForm, description: e.target.value})}
                          placeholder="Project description"
                          rows={3}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <ImageUploader
                          label="Project Image"
                          value={portfolioForm.image_url}
                          onChange={(url) => setPortfolioForm({...portfolioForm, image_url: url})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="client">Client</Label>
                        <Input
                          id="client"
                          value={portfolioForm.client}
                          onChange={(e) => setPortfolioForm({...portfolioForm, client: e.target.value})}
                          placeholder="Client name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="year">Year</Label>
                        <Input
                          id="year"
                          type="number"
                          value={portfolioForm.year}
                          onChange={(e) => setPortfolioForm({...portfolioForm, year: parseInt(e.target.value) || new Date().getFullYear()})}
                          placeholder="2024"
                        />
                      </div>
                      <div>
                        <Label htmlFor="website_url">Website URL</Label>
                        <Input
                          id="website_url"
                          value={portfolioForm.website_url}
                          onChange={(e) => setPortfolioForm({...portfolioForm, website_url: e.target.value})}
                          placeholder="https://example.com"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="featured"
                            checked={portfolioForm.featured}
                            onCheckedChange={(checked) => setPortfolioForm({...portfolioForm, featured: checked})}
                          />
                          <Label htmlFor="featured">Featured Project</Label>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button onClick={handlePortfolioSave}>
                        {editingItem ? 'Update' : 'Save'}
                      </Button>
                      <Button variant="outline" onClick={handleCancel}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}

                {/* Portfolio List */}
                <div className="space-y-4">
                  {portfolioItems.map((item) => (
                    <Card key={item.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <img
                            src={item.image_url}
                            alt={item.title}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div>
                            <h3 className="font-semibold">{item.title}</h3>
                            <p className="text-sm text-gray-600">{item.description}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline">{item.category}</Badge>
                              <span className="text-sm text-gray-500">{item.client} • {item.year}</span>
                              {item.featured && (
                                <Badge variant="secondary">Featured</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handlePortfolioEdit(item)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(item.website_url, '_blank')}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handlePortfolioDelete(item.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="blog" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Blog Management</h3>
                  <Button onClick={() => { setActiveTab('blog'); setIsEditMode(true); }} className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add Blog Post
                  </Button>
                </div>

                {isEditMode && activeTab === 'blog' && (
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">
                      {editingItem ? 'Edit Blog Post' : 'Add New Blog Post'}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="blog_title">Title</Label>
                        <Input
                          id="blog_title"
                          value={blogForm.title}
                          onChange={(e) => {
                            setBlogForm({
                              ...blogForm, 
                              title: e.target.value,
                              slug: generateSlug(e.target.value)
                            });
                          }}
                          placeholder="Blog post title"
                        />
                      </div>
                      <div>
                        <Label htmlFor="blog_slug">Slug</Label>
                        <Input
                          id="blog_slug"
                          value={blogForm.slug}
                          onChange={(e) => setBlogForm({...blogForm, slug: e.target.value})}
                          placeholder="blog-post-slug"
                        />
                      </div>
                      <div>
                        <Label htmlFor="blog_category">Category</Label>
                        <Select value={blogForm.category} onValueChange={(value) => setBlogForm({...blogForm, category: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Web Development">Web Development</SelectItem>
                            <SelectItem value="Design">Design</SelectItem>
                            <SelectItem value="SEO">SEO</SelectItem>
                            <SelectItem value="Mobile">Mobile</SelectItem>
                            <SelectItem value="Security">Security</SelectItem>
                            <SelectItem value="E-Commerce">E-Commerce</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="blog_author">Author</Label>
                        <Input
                          id="blog_author"
                          value={blogForm.author}
                          onChange={(e) => setBlogForm({...blogForm, author: e.target.value})}
                          placeholder="Author name"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <ImageUploader
                          label="Blog Post Image"
                          value={blogForm.image_url}
                          onChange={(url) => setBlogForm({...blogForm, image_url: url})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="read_time">Read Time (minutes)</Label>
                        <Input
                          id="read_time"
                          type="number"
                          value={blogForm.read_time}
                          onChange={(e) => setBlogForm({...blogForm, read_time: parseInt(e.target.value) || 5})}
                          placeholder="5"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="blog_excerpt">Excerpt</Label>
                        <Textarea
                          id="blog_excerpt"
                          value={blogForm.excerpt}
                          onChange={(e) => setBlogForm({...blogForm, excerpt: e.target.value})}
                          placeholder="Brief description of the blog post"
                          rows={2}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="blog_content">Content</Label>
                        <Textarea
                          id="blog_content"
                          value={blogForm.content}
                          onChange={(e) => setBlogForm({...blogForm, content: e.target.value})}
                          placeholder="Blog post content"
                          rows={8}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="published"
                            checked={blogForm.published}
                            onCheckedChange={(checked) => setBlogForm({...blogForm, published: checked})}
                          />
                          <Label htmlFor="published">Published</Label>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button onClick={handleBlogSave}>
                        {editingItem ? 'Update' : 'Save'}
                      </Button>
                      <Button variant="outline" onClick={handleCancel}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}

                {/* Blog List */}
                <div className="space-y-4">
                  {blogPosts.map((post) => (
                    <Card key={post.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <img
                            src={post.image_url}
                            alt={post.title}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div>
                            <h3 className="font-semibold">{post.title}</h3>
                            <p className="text-sm text-gray-600">{post.excerpt}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline">{post.category}</Badge>
                              <span className="text-sm text-gray-500">{post.author}</span>
                              {post.published && (
                                <Badge variant="secondary">Published</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleBlogEdit(post)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleBlogDelete(post.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;