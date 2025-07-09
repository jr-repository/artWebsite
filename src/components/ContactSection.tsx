import { Phone, Mail, MapPin, MessageCircle, Instagram, Music } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

const ContactSection = () => {
  const contactMethods = [
    {
      icon: Phone,
      title: "Telepon",
      value: "087821957335",
      href: "tel:+6287821957335",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      value: "087821957335",
      href: "https://wa.me/6287821957335",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Mail,
      title: "Email",
      value: "artwebsitecompany@gmail.com",
      href: "mailto:artwebsitecompany@gmail.com",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: MapPin,
      title: "Lokasi",
      value: "Yogyakarta, Indonesia",
      href: "#",
      color: "from-red-500 to-pink-500"
    }
  ];

  const socialMedia = [
    {
      icon: Instagram,
      name: "Instagram",
      value: "@artwebcompany",
      href: "https://instagram.com/artwebcompany",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: Music,
      name: "TikTok",
      value: "artwebsitecompany",
      href: "https://tiktok.com/@artwebsitecompany",
      color: "from-gray-800 to-gray-900"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            📞 Hubungi Kami
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Mari{" "}
            <span className="text-gradient-hero">
              Berdiskusi
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Siap membantu mewujudkan website impian Anda. Konsultasi gratis dan tanpa komitmen!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Informasi Kontak
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {contactMethods.map((method, index) => (
                  <Card key={index} className="border-none shadow-soft hover:shadow-medium transition-all duration-300 hover:scale-105">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-lg bg-gradient-to-r ${method.color}`}>
                          <method.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">{method.title}</h4>
                          <a 
                            href={method.href}
                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                          >
                            {method.value}
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Media Sosial
              </h3>
              <div className="flex flex-wrap gap-4">
                {socialMedia.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 px-4 py-3 bg-white rounded-lg shadow-soft hover:shadow-medium transition-all duration-300 hover:scale-105"
                  >
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${social.color}`}>
                      <social.icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{social.name}</div>
                      <div className="text-sm text-muted-foreground">{social.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-6 shadow-soft">
              <h3 className="text-xl font-bold text-foreground mb-4">
                Hubungi Kami Sekarang
              </h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="hero" 
                  className="flex-1"
                  onClick={() => window.open('https://wa.me/6287821957335?text=Halo%20Artweb,%20saya%20tertarik%20dengan%20layanan%20pembuatan%20website', '_blank')}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat WhatsApp
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => window.open('mailto:artwebsitecompany@gmail.com?subject=Konsultasi%20Website', '_blank')}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="border-none shadow-medium">
            <CardHeader>
              <CardTitle className="text-2xl">Kirim Pesan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Nama Lengkap
                  </label>
                  <Input placeholder="Masukkan nama lengkap" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <Input type="email" placeholder="nama@email.com" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Nomor WhatsApp
                </label>
                <Input placeholder="08xxxxxxxxxx" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Jenis Layanan
                </label>
                <select className="w-full p-3 border border-input rounded-lg bg-background text-foreground">
                  <option>Pilih layanan yang diinginkan</option>
                  <option>Website Company Profile</option>
                  <option>Toko Online (E-commerce)</option>
                  <option>Website Portofolio</option>
                  <option>Landing Page</option>
                  <option>Custom Website</option>
                  <option>Mobile App Design</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Pesan
                </label>
                <Textarea 
                  placeholder="Ceritakan kebutuhan website Anda..." 
                  className="min-h-[120px]"
                />
              </div>
              
              <Button variant="hero" className="w-full">
                Kirim Pesan
              </Button>
              
              <p className="text-sm text-muted-foreground text-center">
                Kami akan merespons dalam 1-2 jam kerja
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;