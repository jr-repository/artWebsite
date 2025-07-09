import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PageHeroProps {
  backgroundImage: string;
  badge?: string;
  title: string;
  subtitle: string;
  description: string;
  primaryButton?: string;
  secondaryButton?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

const PageHero = ({
  backgroundImage,
  badge,
  title,
  subtitle,
  description,
  primaryButton,
  secondaryButton,
  onPrimaryClick,
  onSecondaryClick
}: PageHeroProps) => {
  return (
    <section className="relative min-h-[80vh] flex items-center pt-20">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={backgroundImage} 
          alt="Hero Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-midnight/80"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          {badge && (
            <Badge variant="secondary" className="mb-6 bg-white/20 text-white border-white/20">
              {badge}
            </Badge>
          )}
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {title}{" "}
            <span className="text-gradient-hero">
              {subtitle}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
            {description}
          </p>

          {(primaryButton || secondaryButton) && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {primaryButton && (
                <Button 
                  variant="hero" 
                  size="lg" 
                  className="group"
                  onClick={onPrimaryClick}
                >
                  {primaryButton}
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              )}
              
              {secondaryButton && (
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white/20 text-white hover:bg-white/10"
                  onClick={onSecondaryClick}
                >
                  {secondaryButton}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageHero;