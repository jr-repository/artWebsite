import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navigation from "@/components/Navigation";
import PageHero from "@/components/PageHero";
import FooterSection from "@/components/FooterSection";
import ScrollToTop from "@/components/ScrollToTop";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Award, Clock, Heart } from "lucide-react";
import aboutHero from "@/assets/about-hero.jpg";

const About = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100,
    });
  }, []);
  const values = [
    {
      icon: Clock,
      title: "Kecepatan & Kualitas",
      description: "Pengerjaan cepat tanpa mengorbankan kualitas hasil terbaik untuk setiap proyek."
    },
    {
      icon: Users,
      title: "Tim Profesional",
      description: "Didukung oleh tim berpengalaman yang memahami kebutuhan digital modern."
    },
    {
      icon: Award,
      title: "Hasil Terbaik",
      description: "Komitmen memberikan solusi website yang optimal dan sesuai ekspektasi."
    },
    {
      icon: Heart,
      title: "Support Berkelanjutan",
      description: "Dukungan penuh bahkan setelah website launching untuk memastikan performa optimal."
    }
  ];

  const stats = [
    { number: "50+", label: "Website Dibuat" },
    { number: "100%", label: "Kepuasan Klien" },
    { number: "24/7", label: "Support" },
    { number: "3+", label: "Tahun Pengalaman" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <PageHero
        backgroundImage={aboutHero}
        badge="👥 Tentang Kami"
        title="Mengenal"
        subtitle="Artweb"
        description="Tim profesional yang berkomitmen menciptakan solusi website terbaik untuk bisnis Anda di era digital."
        primaryButton="Lihat Portofolio"
        secondaryButton="Hubungi Kami"
      />

      {/* About Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              🎯 Visi & Misi
            </Badge>
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Menghadirkan{" "}
              <span className="text-gradient-hero">
                Solusi Digital
              </span>{" "}
              Terbaik
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Artweb hadir untuk membantu bisnis dan individu memiliki kehadiran digital yang kuat 
              melalui website profesional yang responsif, cepat, dan SEO-friendly.
            </p>
            <div className="bg-gradient-card rounded-2xl p-8 shadow-soft">
              <p className="text-lg text-foreground leading-relaxed">
                Dengan pengalaman lebih dari 3 tahun di industri web development, kami telah membantu 
                puluhan klien dari berbagai bidang bisnis untuk memiliki website yang tidak hanya 
                indah dipandang, tetapi juga fungsional dan menghasilkan konversi yang optimal.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-none shadow-soft">
                <CardContent className="p-6">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Values */}
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-none shadow-soft hover:shadow-medium transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-hero/10 p-3 rounded-lg">
                      <value.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <FooterSection />
      <ScrollToTop />
    </div>
  );
};

export default About;