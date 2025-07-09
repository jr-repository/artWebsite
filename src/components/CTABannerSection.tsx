import { ArrowRight, MessageCircle, Zap, Shield, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const CTABannerSection = () => {
  const features = [
    {
      icon: Zap,
      text: "Proses Cepat & Profesional"
    },
    {
      icon: Shield,
      text: "Garansi 100% Kepuasan"
    },
    {
      icon: Award,
      text: "Hasil Berkualitas Premium"
    }
  ];

  return (
    <section className="py-20 bg-gradient-hero relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">

          
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6" data-aos="fade-up">
            Siap Wujudkan Website{" "}
            <span className="relative">
              Impian Anda?
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-white/30 rounded"></div>
            </span>
          </h2>
          
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            Dapatkan website profesional yang menarik, cepat, dan SEO friendly. 
            Konsultasi gratis tanpa komitmen!
          </p>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-6 mb-10" data-aos="fade-up" data-aos-delay="200">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
                <feature.icon className="w-5 h-5 text-white" />
                <span className="text-white font-medium">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8" data-aos="fade-up" data-aos-delay="300">
            <Button 
              variant="secondary" 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 shadow-strong group"
              onClick={() => window.open('https://wa.me/6287821957335?text=Halo%20Artweb,%20saya%20tertarik%20dengan%20layanan%20pembuatan%20website%20dan%20ingin%20konsultasi%20gratis', '_blank')}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Konsultasi Gratis
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white text-white bg-transparent hover:bg-white hover:text-primary transition-all duration-300"
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Lihat Paket Harga
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-white/80" data-aos="fade-up" data-aos-delay="400">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">50+</div>
              <div className="text-sm">Website Dibuat</div>
            </div>
            <div className="w-px h-8 bg-white/30 hidden sm:block"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">100%</div>
              <div className="text-sm">Kepuasan Klien</div>
            </div>
            <div className="w-px h-8 bg-white/30 hidden sm:block"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">5★</div>
              <div className="text-sm">Rating Klien</div>
            </div>
            <div className="w-px h-8 bg-white/30 hidden sm:block"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">24/7</div>
              <div className="text-sm">Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute top-1/2 left-5 w-16 h-16 bg-white/5 rounded-full blur-xl animate-pulse"></div>
    </section>
  );
};

export default CTABannerSection;