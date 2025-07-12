import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Calendar, Users, Tag } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import FooterSection from "@/components/FooterSection";
import { toast } from "sonner";

interface Portfolio {
  id: string;
  title: string;
  description: string;
  detailed_description: string;
  image_url: string;
  gallery_images: string[];
  category: string;
  website_url: string;
  client: string;
  year: number;
  features: string[];
  project_duration: string;
  team_size: number;
}

const PortfolioDetail = () => {
  const { id } = useParams();
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      if (!id) return;

      try {
        const { data, error } = await supabase
          .from('portfolio')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          toast.error("Portfolio tidak ditemukan");
          return;
        }

        setPortfolio(data);
      } catch (error) {
        console.error('Error fetching portfolio:', error);
        toast.error("Gagal memuat detail portfolio");
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-24">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-muted rounded w-1/4"></div>
            <div className="h-64 bg-muted rounded"></div>
            <div className="space-y-4">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
            </div>
          </div>
        </div>
        <FooterSection />
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-2xl font-bold mb-4">Portfolio tidak ditemukan</h1>
          <Link to="/portfolio">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Portfolio
            </Button>
          </Link>
        </div>
        <FooterSection />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-24">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link to="/portfolio" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Portfolio
          </Link>
        </div>

        {/* Hero Section */}
        <div className="mb-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">
                {portfolio.category}
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-4">
                {portfolio.title}
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                {portfolio.description}
              </p>
              
              {/* Project Info */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-2" />
                  {portfolio.year}
                </div>
                {portfolio.project_duration && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Tag className="w-4 h-4 mr-2" />
                    {portfolio.project_duration}
                  </div>
                )}
                <div className="text-sm text-muted-foreground">
                  <strong>Client:</strong> {portfolio.client}
                </div>
                {portfolio.team_size && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="w-4 h-4 mr-2" />
                    {portfolio.team_size} orang
                  </div>
                )}
              </div>

              {portfolio.website_url && (
                <a href={portfolio.website_url} target="_blank" rel="noopener noreferrer">
                  <Button className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary/70">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Kunjungi Website
                  </Button>
                </a>
              )}
            </div>

            <div className="relative">
              <img 
                src={portfolio.image_url} 
                alt={portfolio.title}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Detailed Description */}
        {portfolio.detailed_description && (
          <Card className="mb-12">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Detail Project</h2>
              <div className="prose prose-slate max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  {portfolio.detailed_description}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Features/Technologies */}
        {portfolio.features && portfolio.features.length > 0 && (
          <Card className="mb-12">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Teknologi yang Digunakan</h2>
              <div className="flex flex-wrap gap-2">
                {portfolio.features.map((feature, index) => (
                  <Badge key={index} variant="outline">
                    {feature}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Gallery */}
        {portfolio.gallery_images && portfolio.gallery_images.length > 0 && (
          <Card className="mb-12">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">Galeri Project</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {portfolio.gallery_images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img 
                      src={image} 
                      alt={`${portfolio.title} - Image ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <FooterSection />
    </div>
  );
};

export default PortfolioDetail;