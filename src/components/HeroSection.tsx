import { ArrowRight, Play, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import heroImage from "@/assets/hero-image.jpg";
import heroBg from "@/assets/hero-bg.jpg";
import AnimatedStars from "@/components/AnimatedStars";

const HeroSection = () => {
  const features = [
    "Desain Modern",
    "SEO Friendly",
    "Gratis Konsultasi",
    "Revisi Unlimited"
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroBg} 
          alt="Hero Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero/20"></div>
      </div>
      
      {/* Animated Stars */}
      <AnimatedStars count={80} className="pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <br />
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                <span className="text-foreground text-white">Bangun Website</span>{" "}
                <span className="text-foreground text-white">
                  Impianmu
                </span>{" "}
                <span className="text-foreground text-white">Bersama</span>{" "}
                <span className="text-foreground text-white">
                  Artweb
                </span>
              </h1>
              
              <p className="text-xl text-white text-muted-foreground max-w-lg">
                Layanan profesional untuk pembuatan website personal, bisnis, toko online, 
                dan custom project. Dapatkan website yang menarik, cepat, dan SEO friendly.
              </p>
            </div>

            {/* Feature List */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="text-foreground font-medium  text-white">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="group">
                Lihat Portofolio
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
              
              <Button variant="outline" size="lg" className="group">
                <Play className="w-4 h-4 mr-2" />
                Konsultasi Gratis
              </Button>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-5 pt-5">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground  text-white">Website Dibuat</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground  text-white">Kepuasan Klien</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">5★</div>
                <div className="text-sm text-muted-foreground  text-white">Rating</div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-strong">
              <img
                src={heroImage}
                alt="Artweb Hero"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-hero/10"></div>
            </div>
            
           
            
            <div className="absolute -bottom-4 -left-4 bg-white rounded-lg p-4 shadow-medium">
              <div className="text-sm font-medium text-muted-foreground">
                ⚡ Fast Loading
              </div>
              <div className="text-sm text-primary font-bold">0.8s</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;