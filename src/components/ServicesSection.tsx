import { Globe, ShoppingCart, User, Zap, Code, Smartphone } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ServicesSection = () => {
  const services = [
    {
      icon: Globe,
      title: "Website Company Profile",
      description: "Website profesional untuk memperkenalkan bisnis Anda dengan desain yang menarik dan informasi lengkap.",
      features: ["Desain Modern", "Responsive Design", "SEO Optimized", "Contact Form"],
      price: "1.500.000",
      popular: false
    },
    {
      icon: ShoppingCart,
      title: "Toko Online (E-commerce)",
      description: "Platform jual beli online lengkap dengan sistem pembayaran, manajemen produk, dan dashboard admin.",
      features: ["Payment Gateway", "Product Management", "Order Tracking", "Admin Dashboard"],
      price: "3.000.000",
      popular: true
    },
    {
      icon: User,
      title: "Website Portofolio",
      description: "Showcase karya dan pencapaian Anda dengan tampilan yang profesional dan menarik.",
      features: ["Gallery System", "Project Showcase", "About Section", "Contact Info"],
      price: "1.200.000",
      popular: false
    },
    {
      icon: Zap,
      title: "Landing Page",
      description: "Halaman website khusus untuk promosi produk atau layanan dengan fokus pada konversi.",
      features: ["High Conversion", "Fast Loading", "Mobile Optimized", "Analytics"],
      price: "800.000",
      popular: false
    },
    {
      icon: Code,
      title: "Custom Website",
      description: "Website dengan fitur khusus sesuai kebutuhan bisnis Anda yang unik dan kompleks.",
      features: ["Custom Features", "API Integration", "Database Design", "Maintenance"],
      price: "5.000.000",
      popular: false
    },
    {
      icon: Smartphone,
      title: "Mobile App Design",
      description: "Desain UI/UX untuk aplikasi mobile yang user-friendly dan modern.",
      features: ["UI/UX Design", "Prototype", "Design System", "Developer Handoff"],
      price: "2.000.000",
      popular: false
    }
  ];

  const whyChooseUs = [
    {
      title: "Kecepatan & Kualitas",
      description: "Pengerjaan cepat tanpa mengorbankan kualitas hasil"
    },
    {
      title: "Desain Responsif",
      description: "Website yang tampil sempurna di semua perangkat"
    },
    {
      title: "SEO Friendly",
      description: "Website yang mudah ditemukan di mesin pencari"
    },
    {
      title: "Gratis Konsultasi",
      description: "Konsultasi dan revisi awal tanpa biaya tambahan"
    }
  ];

  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
   
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Layanan{" "}
            <span className="text-gradient-hero">
              Profesional
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Kami menyediakan berbagai layanan pembuatan website sesuai kebutuhan bisnis Anda
          </p>
        </div>

        {/* Why Choose Us */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {whyChooseUs.map((item, index) => (
            <Card key={index} className="border-none shadow-soft hover:shadow-medium transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="bg-gradient-hero/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <div className="w-6 h-6 bg-gradient-hero rounded-full"></div>
                </div>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className={`relative border-none shadow-soft hover:shadow-strong transition-all duration-300 hover:scale-105 ${
              service.popular ? 'ring-2 ring-primary' : ''
            }`}>
              {service.popular && (
                <Badge className="absolute -top-2 left-4 bg-gradient-hero">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="bg-gradient-hero/10 p-2 rounded-lg">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                </div>
                <CardDescription className="text-muted-foreground">
                  {service.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0">
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-sm text-muted-foreground">Mulai dari</span>
                    <div className="text-2xl font-bold text-primary">
                      Rp {service.price}
                    </div>
                  </div>
                </div>
                
                <Button 
                  variant={service.popular ? "hero" : "outline"} 
                  className="w-full"
                >
                  Pesan Sekarang
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Butuh Layanan Khusus?
          </h3>
          <p className="text-muted-foreground mb-6">
            Konsultasikan kebutuhan website Anda dengan tim ahli kami
          </p>
          <Button variant="hero" size="lg">
            Konsultasi Gratis
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;