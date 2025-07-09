import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Budi Santoso",
      role: "CEO, Toko Elektronik Jaya",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "Website toko online yang dibuat Artweb sangat membantu bisnis saya. Desainnya menarik dan mudah digunakan. Penjualan online meningkat 300% setelah website live!",
      project: "E-commerce Website"
    },
    {
      name: "Andi Wijaya",
      role: "Freelancer Designer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "Website portofolio yang dibuat Artweb membantu saya mendapatkan lebih banyak klien. Desainnya modern dan loading-nya cepat. Sangat puas dengan hasilnya!",
      project: "Portfolio Website"
    },
    {
      name: "Maya Putri",
      role: "Marketing Manager, PT Maju Bersama",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "Landing page yang dibuat Artweb sangat efektif untuk campaign marketing kami. Conversion rate meningkat signifikan. Recommended banget!",
      project: "Landing Page"
    },
    {
      name: "Rizky Pratama",
      role: "Entrepreneur",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "Tim Artweb sangat memahami kebutuhan bisnis saya. Website yang dibuat tidak hanya cantik tapi juga fungsional. Great work!",
      project: "Business Website"
    },
    {
      name: "Linda Sari",
      role: "Owner, Boutique Fashion",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "Website e-commerce fashion yang dibuat Artweb sangat membantu penjualan online. Interface-nya user-friendly dan mudah di-manage. Terima kasih!",
      project: "Fashion E-commerce"
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
       
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Apa Kata{" "}
            <span className="text-gradient-hero font-extrabold">
              Klien Kami
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Kepuasan klien adalah prioritas utama kami. Berikut testimoni dari klien yang telah mempercayai layanan Artweb
          </p>
        </div>

        {/* Auto-sliding Testimonials Carousel */}
        <div className="mb-8" data-aos="fade-up">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            loop={true}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="testimonials-swiper"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <Card className="border-none shadow-soft hover:shadow-medium transition-all duration-300 h-full">
                  <CardContent className="p-6 relative h-full flex flex-col">
                 

                    {/* Rating */}
                    <div className="flex items-center space-x-1 mb-4 mt-4">
                      {renderStars(testimonial.rating)}
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-muted-foreground mb-6 leading-relaxed flex-grow">
                      "{testimonial.text}"
                    </p>

                    {/* Client Info */}
                    <div className="flex items-center space-x-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>

                    {/* Project Badge */}
                    <Badge variant="outline" className="absolute top-4 right-4">
                      {testimonial.project}
                    </Badge>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Statistics */}
        <div className="mt-16 grid md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">50+</div>
            <div className="text-muted-foreground">Website Selesai</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">100%</div>
            <div className="text-muted-foreground">Kepuasan Klien</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">2 Tahun</div>
            <div className="text-muted-foreground">Pengalaman</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">24/7</div>
            <div className="text-muted-foreground">Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;