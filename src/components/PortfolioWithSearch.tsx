import { useEffect, useState } from "react";
import { Search, Filter, ExternalLink, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";

interface Portfolio {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category: string;
  website_url: string;
  client: string;
  year: number;
}

const PortfolioWithSearch = () => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [filteredPortfolios, setFilteredPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const { data, error } = await supabase
          .from('portfolio')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setPortfolios(data || []);
        setFilteredPortfolios(data || []);
      } catch (error) {
        console.error('Error fetching portfolios:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolios();
  }, []);

  useEffect(() => {
    let filtered = portfolios;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(portfolio =>
        portfolio.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        portfolio.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        portfolio.client.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(portfolio => portfolio.category === selectedCategory);
    }

    setFilteredPortfolios(filtered);
  }, [searchTerm, selectedCategory, portfolios]);

  const categories = Array.from(new Set(portfolios.map(p => p.category)));

  if (loading) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="border-none shadow-soft animate-pulse">
                <div className="aspect-video bg-muted rounded-t-lg"></div>
                <CardContent className="p-6">
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-12" data-aos="fade-up">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Cari portfolio berdasarkan judul, deskripsi, atau klien..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-[200px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Pilih kategori" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Kategori</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Results Count */}
        <div className="mb-8" data-aos="fade-up">
          <p className="text-muted-foreground font-sans">
            Menampilkan {filteredPortfolios.length} dari {portfolios.length} portfolio
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPortfolios.map((portfolio, index) => (
            <Card 
              key={portfolio.id} 
              className="border-none shadow-soft hover:shadow-strong transition-all duration-300 hover:scale-105 group relative bg-gradient-card overflow-hidden" 
              data-aos="fade-up" 
              data-aos-delay={index * 100}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
              <div className="absolute inset-0 border border-transparent bg-gradient-to-r from-primary/30 via-transparent to-secondary/30 rounded-lg bg-clip-border" />
              <div className="relative bg-background rounded-lg m-0.5">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={portfolio.image_url || '/placeholder.svg'}
                    alt={portfolio.title}
                    className="w-full aspect-video object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-hero/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-white/90">
                      {portfolio.category}
                    </Badge>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="secondary" className="bg-white/90">
                        <Eye className="w-4 h-4" />
                      </Button>
                      {portfolio.website_url && (
                        <Button size="sm" variant="secondary" className="bg-white/90" asChild>
                          <a href={portfolio.website_url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-display font-bold text-foreground mb-2">{portfolio.title}</h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2 font-sans">{portfolio.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground font-sans">{portfolio.client}</span>
                    <span className="text-sm text-primary font-medium font-sans">{portfolio.year}</span>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredPortfolios.length === 0 && !loading && (
          <div className="text-center py-20" data-aos="fade-up">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-foreground mb-4">Tidak ada portfolio ditemukan</h3>
            <p className="text-muted-foreground mb-6">
              Coba ubah kata kunci pencarian atau filter kategori
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
            >
              Reset Pencarian
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PortfolioWithSearch;