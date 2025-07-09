import { Check, Star, Zap, Crown, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const PricingSection = () => {
  const [expandedCards, setExpandedCards] = useState<{ [key: string]: boolean }>({});
  const packages = [
    {
      name: "Basic",
      price: "1.500.000",
      originalPrice: "2.000.000",
      description: "Cocok untuk personal dan bisnis kecil",
      icon: Zap,
      features: [
        "1-3 Halaman Website",
        "Desain Template Modern",
        "Mobile Responsive",
        "Contact Form",
        "Basic SEO Setup",
        "Free Domain (.com/.my.id)",
        "3 Bulan Hosting",
        "SSL Certificate",
        "Bebas Revisi"
      ],
      notIncluded: [
        // "Custom Design",
        // "Database Integration",
        // "E-commerce Features",
        // "Advanced Analytics"
      ],
      popular: false,
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: "Professional",
      price: "3.000.000",
      originalPrice: "4.000.000",
      description: "Terbaik untuk bisnis yang berkembang",
      icon: Star,
      features: [
        "4-7 Halaman Website",
        "Desain Custom Unique",
        "Mobile Responsive",
        "Contact Form & Maps",
        "Advanced SEO Setup",
        "Free Domain (.com)",
        "1 Tahun Hosting",
        "SSL Certificate",
        "Bebas Revisi",
        "Basic Analytics",
        "Social Media Integration",
        "Speed Optimization"
      ],
      notIncluded: [
        // "E-commerce Features",
        // "Membership System",
        // "Advanced Integrations"
      ],
      popular: true,
      color: "from-purple-500 to-pink-500"
    },
    {
      name: "Premium",
      price: "5.000.000",
      originalPrice: "6.500.000",
      description: "Untuk bisnis dengan kebutuhan kompleks",
      icon: Crown,
      features: [
        "Unlimited Halaman",
        "Desain Premium Custom",
        "Mobile Responsive",
        "Advanced Contact Forms",
        "Premium SEO Setup",
        "Free Domain (.com/.id)",
        "1 Tahun Hosting",
        "SSL Certificate",
        "Unlimited Revisi",
        "Advanced Analytics",
        "Social Media Integration",
        "Speed Optimization",
        "CMS Integration",
        "API Integration",
        "Database Management",
        "E-commerce Ready",
        "Member System",
        "Live Chat Support"
      ],
      notIncluded: [],
      popular: false,
      color: "from-yellow-500 to-orange-500"
    }
  ];

  const additionalServices = [
    {
      name: "E-commerce Setup",
      price: "2.000.000",
      description: "Payment gateway, product management, order tracking"
    },
    {
      name: "Mobile App Design",
      price: "3.000.000",
      description: "UI/UX design for mobile application"
    },
    {
      name: "SEO Optimization",
      price: "1.000.000",
      description: "Advanced SEO setup and optimization"
    },
    {
      name: "Maintenance Package",
      price: "500.000/bulan",
      description: "Regular updates, security, and support"
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Pilih{" "}
            <span className="text-gradient-hero font-extrabold">
              Paket Terbaik
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Paket harga yang fleksibel dan terjangkau untuk semua kebutuhan bisnis Anda
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mb-16">
          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <Card key={index} className={`relative border-none shadow-soft hover:shadow-strong transition-all duration-300 hover:scale-105 ${
                pkg.popular ? 'ring-2 ring-primary scale-105' : ''
              }`} data-aos="fade-up" data-aos-delay={index * 100}>
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-hero">
                      <Sparkles className="w-4 h-4 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className={`inline-flex p-3 rounded-full bg-gradient-to-r ${pkg.color} mx-auto mb-4`}>
                    <pkg.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold">{pkg.name}</CardTitle>
                  <p className="text-muted-foreground">{pkg.description}</p>
                  
                  <div className="mt-6">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <span className="text-sm text-muted-foreground line-through">
                        Rp {pkg.originalPrice}
                      </span>
                      <Badge variant="destructive" className="text-xs">
                        Save {Math.round((1 - parseInt(pkg.price.replace(/\./g, '')) / parseInt(pkg.originalPrice.replace(/\./g, ''))) * 100)}%
                      </Badge>
                    </div>
                    <div className="text-4xl font-bold text-primary">
                      Rp {pkg.price}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      One-time payment
                    </p>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="mb-8">
                    {/* Show first 6 features */}
                    <ul className="space-y-3 mb-4">
                      {pkg.features.slice(0, 6).map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-3">
                          <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Collapsible for remaining features */}
                    {pkg.features.length > 6 && (
                      <Collapsible open={expandedCards[pkg.name]} onOpenChange={() => 
                        setExpandedCards(prev => ({ ...prev, [pkg.name]: !prev[pkg.name] }))
                      }>
                        <CollapsibleTrigger asChild>
                          <Button variant="ghost" size="sm" className="w-full justify-center mb-4">
                            {expandedCards[pkg.name] ? (
                              <>
                                Sembunyikan Detail <ChevronUp className="w-4 h-4 ml-1" />
                              </>
                            ) : (
                              <>
                                Lihat Semua Fitur ({pkg.features.length - 6} lainnya) <ChevronDown className="w-4 h-4 ml-1" />
                              </>
                            )}
                          </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <ul className="space-y-3 mb-4">
                            {pkg.features.slice(6).map((feature, idx) => (
                              <li key={idx + 6} className="flex items-start space-x-3">
                                <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-foreground">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </CollapsibleContent>
                      </Collapsible>
                    )}

                    {/* Not included features */}
                    {pkg.notIncluded.length > 0 && (
                      <ul className="space-y-3">
                        {pkg.notIncluded.map((feature, idx) => (
                          <li key={idx} className="flex items-start space-x-3 opacity-50">
                            <div className="w-5 h-5 border-2 border-gray-300 rounded-full mt-0.5 flex-shrink-0"></div>
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  
                  <Button 
                    variant={pkg.popular ? "hero" : "outline"} 
                    className="w-full"
                    size="lg"
                  >
                    Pilih {pkg.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mobile Swiper */}
          <div className="md:hidden" data-aos="fade-up">
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={20}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              className="pricing-swiper"
            >
              {packages.map((pkg, index) => (
                <SwiperSlide key={index}>
                  <Card className={`relative border-none shadow-soft ${
                    pkg.popular ? 'ring-2 ring-primary' : ''
                  }`}>
                    {pkg.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-gradient-hero">
                          <Sparkles className="w-4 h-4 mr-1" />
                          Most Popular
                        </Badge>
                      </div>
                    )}
                    
                    <CardHeader className="text-center pb-4">
                      <div className={`inline-flex p-3 rounded-full bg-gradient-to-r ${pkg.color} mx-auto mb-4`}>
                        <pkg.icon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-2xl font-bold">{pkg.name}</CardTitle>
                      <p className="text-muted-foreground">{pkg.description}</p>
                      
                      <div className="mt-6">
                        <div className="flex items-center justify-center space-x-2 mb-2">
                          <span className="text-sm text-muted-foreground line-through">
                            Rp {pkg.originalPrice}
                          </span>
                          <Badge variant="destructive" className="text-xs">
                            Save {Math.round((1 - parseInt(pkg.price.replace(/\./g, '')) / parseInt(pkg.originalPrice.replace(/\./g, ''))) * 100)}%
                          </Badge>
                        </div>
                        <div className="text-4xl font-bold text-primary">
                          Rp {pkg.price}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          One-time payment
                        </p>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="mb-8">
                        {/* Show first 6 features */}
                        <ul className="space-y-3 mb-4">
                          {pkg.features.slice(0, 6).map((feature, idx) => (
                            <li key={idx} className="flex items-start space-x-3">
                              <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-foreground">{feature}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Collapsible for remaining features */}
                        {pkg.features.length > 6 && (
                          <Collapsible open={expandedCards[`${pkg.name}-mobile`]} onOpenChange={() => 
                            setExpandedCards(prev => ({ ...prev, [`${pkg.name}-mobile`]: !prev[`${pkg.name}-mobile`] }))
                          }>
                            <CollapsibleTrigger asChild>
                              <Button variant="ghost" size="sm" className="w-full justify-center mb-4">
                                {expandedCards[`${pkg.name}-mobile`] ? (
                                  <>
                                    Sembunyikan Detail <ChevronUp className="w-4 h-4 ml-1" />
                                  </>
                                ) : (
                                  <>
                                    Lihat Semua Fitur ({pkg.features.length - 6} lainnya) <ChevronDown className="w-4 h-4 ml-1" />
                                  </>
                                )}
                              </Button>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                              <ul className="space-y-3 mb-4">
                                {pkg.features.slice(6).map((feature, idx) => (
                                  <li key={idx + 6} className="flex items-start space-x-3">
                                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm text-foreground">{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </CollapsibleContent>
                          </Collapsible>
                        )}

                        {/* Not included features */}
                        {pkg.notIncluded.length > 0 && (
                          <ul className="space-y-3">
                            {pkg.notIncluded.map((feature, idx) => (
                              <li key={idx} className="flex items-start space-x-3 opacity-50">
                                <div className="w-5 h-5 border-2 border-gray-300 rounded-full mt-0.5 flex-shrink-0"></div>
                                <span className="text-sm text-muted-foreground">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                      
                      <Button 
                        variant={pkg.popular ? "hero" : "outline"} 
                        className="w-full"
                        size="lg"
                      >
                        Pilih {pkg.name}
                      </Button>
                    </CardContent>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Additional Services */}
        <div className="bg-white rounded-2xl p-8 shadow-medium">
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
            Layanan Tambahan
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => (
              <div key={index} className="text-center p-4 border border-border rounded-lg hover:shadow-soft transition-shadow">
                <h4 className="font-semibold text-foreground mb-2">{service.name}</h4>
                <div className="text-xl font-bold text-primary mb-2">
                  Rp {service.price}
                </div>
                <p className="text-sm text-muted-foreground">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-6 shadow-soft">
              <h4 className="font-semibold text-foreground mb-2">
                Apakah ada biaya tersembunyi?
              </h4>
              <p className="text-muted-foreground">
                Tidak ada biaya tersembunyi. Harga yang tertera sudah termasuk semua fitur yang disebutkan. Biaya tambahan hanya berlaku untuk layanan tambahan yang diminta.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-soft">
              <h4 className="font-semibold text-foreground mb-2">
                Berapa lama waktu pengerjaan?
              </h4>
              <p className="text-muted-foreground">
                Waktu pengerjaan berbeda untuk setiap paket. Basic (3-4 hari), Professional (4-7 hari), Premium (7-14 hari). Waktu dapat disesuaikan dengan kebutuhan urgent.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-soft">
              <h4 className="font-semibold text-foreground mb-2">
                Apakah ada garansi?
              </h4>
              <p className="text-muted-foreground">
                Ya, kami memberikan garansi 30 hari setelah website launch untuk bug fixes dan minor adjustments. Maintenance jangka panjang tersedia dengan paket terpisah.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-hero rounded-2xl p-8 text-white shadow-strong max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Masih Bingung Pilih Paket?
            </h3>
            <p className="mb-6 opacity-90">
              Konsultasikan kebutuhan website Anda dengan tim ahli kami. Gratis dan tanpa komitmen!
            </p>
            <Button variant="secondary" size="lg">
              Konsultasi Gratis
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;