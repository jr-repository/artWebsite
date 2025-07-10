import { Shield, Users, Zap, Award, Clock, Headphones } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const WhyChooseUsSection = () => {
  const reasons = [
    {
      icon: Shield,
      title: "Garansi & Keamanan",
      description: "Website aman dengan SSL gratis dan garansi revisi unlimited selama 3 bulan",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Users,
      title: "Tim Profesional",
      description: "Didukung oleh tim ahli dengan pengalaman 5+ tahun di bidang web development",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Zap,
      title: "Loading Super Cepat",
      description: "Optimasi kode dan gambar untuk performa website yang sangat cepat",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Award,
      title: "Kualitas Premium",
      description: "Desain modern, responsive, dan sesuai dengan standar industri terkini",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Clock,
      title: "Pengerjaan Cepat",
      description: "Proses pengerjaan efisien dengan timeline yang jelas dan tepat waktu",
      color: "from-red-500 to-rose-500"
    },
    {
      icon: Headphones,
      title: "Support 24/7",
      description: "Dukungan teknis dan konsultasi kapan saja Anda membutuhkannya",
      color: "from-indigo-500 to-blue-500"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Mengapa Memilih{" "}
            <span className="text-gradient-hero font-extrabold">
              Artweb?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Kami tidak hanya membuat website, tetapi memberikan solusi digital terbaik untuk kesuksesan bisnis Anda
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <Card 
              key={index} 
              className="border-none shadow-soft hover:shadow-strong transition-all duration-300 hover:scale-105 group relative overflow-hidden"
              data-aos="fade-up" 
              data-aos-delay={index * 100}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <CardContent className="p-8 relative">
                {/* Icon */}
                <div className="mb-6">
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${reason.color} shadow-glow group-hover:shadow-strong transition-all duration-300`}>
                    <reason.icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-display font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                  {reason.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed font-sans">
                  {reason.description}
                </p>

                {/* Hover Effect */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-hero transition-all duration-300 group-hover:w-full"></div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Statistics */}
        <div className="mt-20 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-2xl p-8 md:p-12" data-aos="fade-up">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-gradient-hero mb-2">100+</div>
              <div className="text-muted-foreground font-sans">Website Selesai</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-gradient-hero mb-2">100%</div>
              <div className="text-muted-foreground font-sans">Kepuasan Klien</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-gradient-hero mb-2">5+</div>
              <div className="text-muted-foreground font-sans">Tahun Pengalaman</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-gradient-hero mb-2">24/7</div>
              <div className="text-muted-foreground font-sans">Support Ready</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;