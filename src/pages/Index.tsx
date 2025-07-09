import { useEffect } from "react";
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
import FooterSection from "@/components/FooterSection";
import ScrollToTop from "@/components/ScrollToTop";

const Index = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <RecentPortfolioSection />
      <RecentBlogSection />
      <ProcessSection />
      <TestimonialsSection />
      <CTABannerSection />
      <FooterSection />
      <ScrollToTop />
    </div>
  );
};

export default Index;
