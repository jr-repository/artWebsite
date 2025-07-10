import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navigation from "@/components/Navigation";
import PageHero from "@/components/PageHero";
import PricingSection from "@/components/PricingSection";
import FooterSection from "@/components/FooterSection";
import ScrollToTop from "@/components/ScrollToTop";
import servicesHero from "@/assets/services-hero.jpg";

const Pricing = () => {
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
      
      <PageHero
        backgroundImage={servicesHero}
        title="Paket"
        subtitle="Terbaik"
        description="Pilih paket yang sesuai dengan kebutuhan dan budget Anda. Semua paket sudah termasuk hosting dan domain."
        primaryButton="Pilih Paket"
        secondaryButton="Konsultasi"
      />

      <PricingSection />
      <FooterSection />
      <ScrollToTop />
    </div>
  );
};

export default Pricing;