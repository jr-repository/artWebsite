import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Navigation from "@/components/Navigation";
import PageHero from "@/components/PageHero";
import BlogWithSearch from "@/components/BlogWithSearch";
import FooterSection from "@/components/FooterSection";
import ScrollToTop from "@/components/ScrollToTop";
import { Button } from "@/components/ui/button";
import servicesHero from "@/assets/services-hero.jpg";

const Blog = () => {
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
        title="Artikel"
        subtitle="Terbaru"
        description="Tips, tutorial, dan insight terbaru seputar dunia website dan digital marketing untuk mengembangkan bisnis Anda."
        primaryButton="Lihat Semua"
        secondaryButton="Kategori"
      />

      <div data-aos="fade-up">
        <BlogWithSearch />
      </div>

      {/* Newsletter */}
      <section className="py-20 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 text-center" data-aos="fade-up">
          <h2 className="text-3xl font-bold mb-4">
            Dapatkan Update Artikel Terbaru
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Berlangganan newsletter kami untuk mendapatkan tips dan tutorial terbaru seputar website dan digital marketing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Masukkan email Anda" 
              className="flex-1 px-4 py-3 rounded-lg text-foreground"
            />
            <Button variant="secondary" size="lg">
              Berlangganan
            </Button>
          </div>
        </div>
      </section>

      <FooterSection />
      <ScrollToTop />
    </div>
  );
};

export default Blog;