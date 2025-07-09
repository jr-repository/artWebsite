import { useEffect, useState } from "react";
import { ArrowRight, ExternalLink, Eye } from "lucide-react";
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

const RecentPortfolioSection = () => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentPortfolios = async () => {
      try {
        const { data, error } = await supabase
          .from('portfolio')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(3);

        if (error) throw error;
        setPortfolios(data || []);
      } catch (error) {
        console.error('Error fetching portfolios:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentPortfolios();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              🎨 Portfolio Terbaru
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Karya{" "}
              <span className="text-gradient-hero font-extrabold">
                Terbaru Kami
              </span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
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
        <div className="text-center mb-12" data-aos="fade-up">

          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Karya{" "}
            <span className="text-gradient-hero font-extrabold">
              Terbaru Kami
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Lihat hasil karya terbaru yang telah kami selesaikan dengan kualitas terbaik
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden sm:grid md:grid-cols-3 gap-8 mb-12">
          {portfolios.map((portfolio, index) => (
            <Card key={portfolio.id} className="border-none shadow-soft hover:shadow-strong transition-all duration-300 hover:scale-105 group" data-aos="fade-up" data-aos-delay={index * 100}>
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
                <h3 className="text-xl font-bold text-foreground mb-2">{portfolio.title}</h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">{portfolio.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{portfolio.client}</span>
                  <span className="text-sm text-primary font-medium">{portfolio.year}</span>
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
            className="portfolio-swiper"
          >
            {portfolios.map((portfolio) => (
              <SwiperSlide key={portfolio.id}>
                <Card className="border-none shadow-soft">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={portfolio.image_url || '/placeholder.svg'}
                      alt={portfolio.title}
                      className="w-full aspect-video object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-white/90">
                        {portfolio.category}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-2">{portfolio.title}</h3>
                    <p className="text-muted-foreground mb-4">{portfolio.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-muted-foreground">{portfolio.client}</span>
                      <span className="text-sm text-primary font-medium">{portfolio.year}</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="w-4 h-4 mr-2" />
                        Lihat Detail
                      </Button>
                      {portfolio.website_url && (
                        <Button size="sm" variant="outline" asChild>
                          <a href={portfolio.website_url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                      )}
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
            <Link to="/portfolio">
              Lihat Semua Portfolio
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RecentPortfolioSection;