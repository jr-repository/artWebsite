import { Globe, Phone, Mail, MapPin, MessageCircle, Instagram, Music, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "@/components/Logo";

const FooterSection = () => {
  const services = [
    "Website Company Profile",
    "Toko Online (E-commerce)",
    "Website Portofolio",
    "Landing Page",
    "Custom Website",
    "Mobile App Design"
  ];

  const quickLinks = [
    { name: "Beranda", href: "/" },
    { name: "Tentang Kami", href: "/about" },
    { name: "Layanan", href: "/services" },
    { name: "Portofolio", href: "/portfolio" },
    { name: "Harga", href: "/pricing" },
    { name: "Kontak", href: "/contact" }
  ];

  return (
    <footer className="bg-gradient-midnight text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="text-white">
              <Logo className="text-white" />
            </div>
            <p className="text-white/80 leading-relaxed">
              Jasa pembuatan website profesional di Yogyakarta. Menghadirkan solusi digital terbaik untuk bisnis Anda dengan desain modern dan teknologi terkini.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/artwebcompany"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/20 p-2 rounded-lg hover:bg-white/30 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://tiktok.com/@artwebsitecompany"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/20 p-2 rounded-lg hover:bg-white/30 transition-colors"
              >
                <Music className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/6287821957335"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/20 p-2 rounded-lg hover:bg-white/30 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-6">Layanan Kami</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <Link
                    to="/services"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Menu Cepat</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6">Kontak</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-white/60" />
                <a
                  href="tel:+6287821957335"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  087821957335
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-white/60" />
                <a
                  href="mailto:artwebsitecompany@gmail.com"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  artwebsitecompany@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-white/60" />
                <span className="text-white/80">Yogyakarta, Indonesia</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/60 text-sm">
              © 2024 Artweb. All rights reserved.
            </p>
            <div className="flex items-center space-x-2 text-white/60 text-sm">
              <span>Design By</span>
              <span>artWeb.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;