import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navigation from "@/components/Navigation";
import PageHero from "@/components/PageHero";
import PortfolioWithSearch from "@/components/PortfolioWithSearch";
import FooterSection from "@/components/FooterSection";
import ScrollToTop from "@/components/ScrollToTop";
import portfolioHero from "@/assets/portfolio-hero.jpg";

const Portfolio = () => {
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
      
      <div data-aos="fade-up">
        <PageHero
          backgroundImage={portfolioHero}
          title="Karya"
          subtitle="Terbaik"
          description="Lihat berbagai project website yang telah kami kerjakan untuk klien dari berbagai industri."
          primaryButton="Lihat Semua"
          secondaryButton="Pesan Sekarang"
        />
      </div>

      <div data-aos="fade-up">
        <PortfolioWithSearch />
      </div>
      <FooterSection />
    </div>
  );
};

export default Portfolio;