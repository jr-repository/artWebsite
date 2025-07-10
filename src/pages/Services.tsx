import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navigation from "@/components/Navigation";
import PageHero from "@/components/PageHero";
import ServicesSection from "@/components/ServicesSection";
import FooterSection from "@/components/FooterSection";
import ScrollToTop from "@/components/ScrollToTop";
import servicesHero from "@/assets/services-hero.jpg";

const Services = () => {
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
          backgroundImage={servicesHero}
          title="Layanan"
          subtitle="Profesional"
          description="Solusi lengkap untuk kebutuhan website bisnis Anda. Dari company profile hingga e-commerce, kami siap membantu."
          primaryButton="Konsultasi Gratis"
          secondaryButton="Lihat Harga"
        />
      </div>

      <div data-aos="fade-up">
        <ServicesSection />
      </div>
      <FooterSection />
    </div>
  );
};

export default Services;