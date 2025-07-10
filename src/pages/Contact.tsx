import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navigation from "@/components/Navigation";
import PageHero from "@/components/PageHero";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";
import ScrollToTop from "@/components/ScrollToTop";
import contactHero from "@/assets/contact-hero.jpg";

const Contact = () => {
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
          backgroundImage={contactHero}
          title="Mari"
          subtitle="Berbicara"
          description="Siap memulai project website Anda? Hubungi kami untuk konsultasi gratis dan dapatkan penawaran terbaik."
          primaryButton="Chat WhatsApp"
          secondaryButton="Kirim Email"
        />
      </div>

      <div data-aos="fade-up">
        <ContactSection />
      </div>
      <FooterSection />
    </div>
  );
};

export default Contact;