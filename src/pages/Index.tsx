import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import RecentPortfolioSection from "@/components/RecentPortfolioSection";
import RecentBlogSection from "@/components/RecentBlogSection";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTABannerSection from "@/components/CTABannerSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import FooterSection from "@/components/FooterSection";
import ScrollToTop from "@/components/ScrollToTop";
import LoadingScreen from "@/components/LoadingScreen";
import DomainChecker from "@/components/DomainChecker";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100,
    });

    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen />}
      <div className="min-h-screen bg-background">
        <Navigation />
        <HeroSection />
        
        {/* Content Section with Paragraphs */}
        <section className="py-20 bg-muted/30" data-aos="fade-up">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-display font-bold text-foreground mb-6">
                Solusi Digital Terpercaya untuk{" "}
                <span className="text-gradient-hero">Bisnis Modern</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8 font-sans leading-relaxed">
                Dengan pengalaman lebih dari 3 tahun, kami telah membantu ratusan bisnis untuk hadir secara digital 
                dengan website yang tidak hanya menarik, tetapi juga menghasilkan konversi yang optimal.
              </p>
              
              {/* Photo Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="aspect-square rounded-lg overflow-hidden shadow-soft" data-aos="zoom-in" data-aos-delay="100">
                  <img 
                    src="https://github.com/jr-repository/folder-image-public/blob/main/1752131897.png?raw=true" 
                    alt="Web Development" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="aspect-square rounded-lg overflow-hidden shadow-soft" data-aos="zoom-in" data-aos-delay="200">
                  <img 
                    src="https://github.com/jr-repository/folder-image-public/blob/main/1752132292.png?raw=true" 
                    alt="Coding" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="aspect-square rounded-lg overflow-hidden shadow-soft" data-aos="zoom-in" data-aos-delay="300">
                  <img 
                    src="https://github.com/jr-repository/folder-image-public/blob/main/1752132747.png?raw=true" 
                    alt="Design" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="aspect-square rounded-lg overflow-hidden shadow-soft" data-aos="zoom-in" data-aos-delay="400">
                  <img 
                    src="https://github.com/jr-repository/folder-image-public/blob/main/1752132714.png?raw=true" 
                    alt="Technology" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
              
              {/* Promotional Banner */}
              <div className="bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-2xl p-8 border border-primary/30 shadow-glow" data-aos="fade-up" data-aos-delay="500">
                <div className="flex items-center justify-center mb-4">
                  <span className="text-4xl animate-bounce"></span>
                </div>
                <h3 className="text-2xl font-display font-bold text-foreground mb-4">
                  Promo Spesial - Diskon 30%
                </h3>
                <p className="text-lg text-muted-foreground mb-6 font-sans">
                  Untuk 10 klien pertama yang memesan website company profile atau toko online di bulan ini!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="px-8 py-3 bg-gradient-hero text-white font-sans font-semibold rounded-lg shadow-glow hover:shadow-strong transition-all duration-300">
                    Klaim Promo Sekarang
                  </button>
                  <button className="px-8 py-3 border-2 border-primary/50 text-primary font-sans font-semibold rounded-lg hover:bg-primary/10 transition-all duration-300">
                    Konsultasi Gratis
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <div data-aos="fade-up">
          <DomainChecker />
        </div>
        <div data-aos="fade-up">
          <ServicesSection />
        </div>
        <div data-aos="fade-up">
          <RecentPortfolioSection />
        </div>
        <div data-aos="fade-up">
          <RecentBlogSection />
        </div>
        <div data-aos="fade-up">
          <WhyChooseUsSection />
        </div>
        <div data-aos="fade-up">
          <ProcessSection />
        </div>
        <div data-aos="fade-up">
          <TestimonialsSection />
        </div>
        <div data-aos="fade-up">
          <CTABannerSection />
        </div>
        <FooterSection />
        <ScrollToTop />
      </div>
    </>
  );
};

export default Index;
