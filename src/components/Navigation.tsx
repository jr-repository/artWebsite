import { useState } from "react";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useLocation } from "react-router-dom";
import Logo from "@/components/Logo";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const navItems = [
    { name: "Beranda", href: "/" },
    { name: "Tentang", href: "/about" },
    { name: "Layanan", href: "/services" },
    { name: "Portofolio", href: "/portfolio" },
    { name: "Harga", href: "/pricing" },
    { name: "Blog", href: "/blog" },
    { name: "Kontak", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border/50 shadow-elegant">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-2">
            <Link to="/">
              <Logo />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-sans font-medium transition-all duration-300 hover:text-primary relative group ${
                  location.pathname === item.href ? 'text-primary' : 'text-foreground'
                }`}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-hero transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="font-sans border-2 hover:border-primary/50 transition-all duration-300"
              onClick={() => window.open('https://wa.me/6287821957335', '_blank')}
            >
              <Phone className="w-4 h-4 mr-2" />
              Telepon
            </Button>
            <Button 
              variant="hero" 
              size="sm" 
              className="font-sans shadow-glow hover:shadow-strong transition-all duration-300"
              onClick={() => window.open('https://wa.me/6287821957335', '_blank')}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat WhatsApp
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden p-2 hover:bg-primary/10 transition-colors duration-300">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            
            <SheetContent side="right" className="w-[280px] bg-background/95 backdrop-blur-lg border-l border-border/50">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-8">
                  <Logo size="sm" />
                </div>
                
                <div className="flex-1 space-y-6">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`block text-lg font-sans font-medium transition-all duration-300 hover:text-primary hover:translate-x-2 ${
                        location.pathname === item.href ? 'text-primary' : 'text-foreground'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                
                <div className="space-y-4 pt-8 border-t border-border/50">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full font-sans border-2 hover:border-primary/50 transition-all duration-300"
                    onClick={() => window.open('https://wa.me/6287821957335', '_blank')}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Telepon
                  </Button>
                  <Button 
                    variant="hero" 
                    size="sm" 
                    className="w-full font-sans shadow-glow hover:shadow-strong transition-all duration-300"
                    onClick={() => window.open('https://wa.me/6287821957335', '_blank')}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat WhatsApp
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;