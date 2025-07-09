import React, { useState, useEffect } from 'react';
import { ExternalLink, Eye, Filter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from '@/integrations/supabase/client';

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

const PortfolioSection = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: "all", name: "Semua" },
    { id: "Web Development", name: "Web Development" },
    { id: "Mobile Development", name: "Mobile Development" },
    { id: "UI/UX Design", name: "UI/UX Design" },
    { id: "E-Commerce", name: "E-Commerce" }
  ];

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      const { data, error } = await supabase
        .from('portfolio')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching portfolio:', error);
      } else {
        setPortfolioItems(data || []);
      }
    } catch (error) {
      console.error('Error fetching portfolio:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = activeFilter === "all" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter);

  const getCategoryCount = (categoryId: string) => {
    if (categoryId === "all") return portfolioItems.length;
    return portfolioItems.filter(item => item.category === categoryId).length;
  };

  if (loading) {
    return (
      <section id="portfolio" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              🎨 Portfolio
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Karya{" "}
              <span className="text-gradient-hero">
                Terbaik Kami
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Berikut adalah beberapa project website yang telah kami kerjakan untuk berbagai klien
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="border-none shadow-soft animate-pulse">
                <div className="h-48 bg-muted rounded-t-lg"></div>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-3 bg-muted rounded"></div>
                    <div className="h-3 bg-muted rounded w-5/6"></div>
                    <div className="flex justify-between">
                      <div className="h-3 bg-muted rounded w-16"></div>
                      <div className="h-3 bg-muted rounded w-12"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <Badge variant="secondary" className="mb-4">
            🎨 Portfolio
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Karya{" "}
            <span className="text-gradient-hero">
              Terbaik Kami
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Berikut adalah beberapa project website yang telah kami kerjakan untuk berbagai klien
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12" data-aos="fade-up">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeFilter === category.id ? "hero" : "outline"}
              onClick={() => setActiveFilter(category.id)}
              className="min-w-0"
            >
              <Filter className="w-4 h-4 mr-2" />
              {category.name}
              <Badge variant="secondary" className="ml-2">
                {getCategoryCount(category.id)}
              </Badge>
            </Button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <Card key={item.id} className="border-none shadow-soft hover:shadow-strong transition-all duration-300 hover:scale-105 group overflow-hidden" data-aos="fade-up">
              <div className="relative overflow-hidden">
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-hero/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                  <Button size="sm" variant="ghost" className="text-white border-white hover:bg-white hover:text-primary">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="text-white border-white hover:bg-white hover:text-primary"
                    onClick={() => window.open(item.website_url, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Visit
                  </Button>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                  <Badge variant="outline">
                    {item.year}
                  </Badge>
                </div>
                
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  {item.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">Client:</span> {item.client}
                  </div>
                  <Badge variant="secondary">
                    {item.category}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16" data-aos="fade-up">
          <div className="bg-gradient-card rounded-2xl p-8 shadow-medium max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Lihat Semua Portfolio
            </h3>
            <p className="text-muted-foreground mb-6">
              Masih banyak project menarik lainnya yang bisa Anda lihat
            </p>
            <Button variant="hero" size="lg">
              Lihat Portfolio Lengkap
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;