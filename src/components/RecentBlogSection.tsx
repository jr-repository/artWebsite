import { useEffect, useState } from "react";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image_url: string;
  category: string;
  author: string;
  read_time: number;
  created_at: string;
  slug: string;
}

const RecentBlogSection = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false })
          .limit(3);

        if (error) throw error;
        setPosts(data || []);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentPosts();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              📝 Blog Terbaru
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Artikel{" "}
              <span className="text-gradient-hero font-extrabold">
                Terbaru
              </span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border-none shadow-soft animate-pulse">
                <div className="aspect-video bg-muted rounded-t-lg"></div>
                <CardContent className="p-6">
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-muted rounded w-1/2 mb-4"></div>
                  <div className="h-3 bg-muted rounded w-full"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12" data-aos="fade-up">
       
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Artikel{" "}
            <span className="text-gradient-hero font-extrabold">
              Terbaru
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tips, trik, dan insight terbaru seputar dunia web development dan design
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden sm:grid md:grid-cols-3 gap-8 mb-12">
          {posts.map((post, index) => (
            <Card key={post.id} className="border-none shadow-soft hover:shadow-strong transition-all duration-300 hover:scale-105 group" data-aos="fade-up" data-aos-delay={index * 100}>
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={post.image_url || '/placeholder.svg'}
                  alt={post.title}
                  className="w-full aspect-video object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-hero/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-white/90">
                    {post.category}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.read_time} min</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(post.created_at)}</span>
                  </div>
                  <Button variant="ghost" size="sm" asChild className="group-hover:bg-primary group-hover:text-white transition-colors">
                    <Link to={`/blog/${post.slug}`}>
                      Baca Selengkapnya
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mobile Swiper */}
        <div className="sm:hidden mb-12" data-aos="fade-up">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            className="blog-swiper"
          >
            {posts.map((post) => (
              <SwiperSlide key={post.id}>
                <Card className="border-none shadow-soft">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={post.image_url || '/placeholder.svg'}
                      alt={post.title}
                      className="w-full aspect-video object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-white/90">
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-2">{post.title}</h3>
                    <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.read_time} min</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(post.created_at)}</span>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/blog/${post.slug}`}>
                          Baca Artikel
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* CTA */}
        <div className="text-center" data-aos="fade-up">
          <Button variant="hero" size="lg" asChild>
            <Link to="/blog">
              Lihat Semua Artikel
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RecentBlogSection;