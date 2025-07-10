import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Search, CheckCircle, XCircle, Globe, Loader } from 'lucide-react';

const DomainChecker = () => {
  const [domain, setDomain] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [results, setResults] = useState<{ domain: string; available: boolean; extension: string; isSearched?: boolean }[]>([]);

  const domainExtensions = ['.com', '.id', '.net', '.org', '.co.id', '.web.id'];

  const simulateCheck = (domainName: string, extension: string): boolean => {
    // Simulate random availability for demo purposes
    const commonDomains = ['google', 'facebook', 'youtube', 'amazon', 'twitter', 'instagram', 'microsoft', 'apple'];
    if (commonDomains.includes(domainName.toLowerCase())) {
      return false; // These are definitely taken
    }
    return Math.random() > 0.4; // 60% chance of being available
  };

  const handleCheck = async () => {
    if (!domain.trim()) return;
    
    setIsChecking(true);
    setResults([]);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    let domainName = domain.toLowerCase().trim();
    let searchedExtension = '';
    
    // Check if user entered a full domain (with extension)
    const hasExtension = domainExtensions.some(ext => domainName.endsWith(ext));
    
    if (hasExtension) {
      // Extract domain name and extension
      const foundExt = domainExtensions.find(ext => domainName.endsWith(ext));
      if (foundExt) {
        searchedExtension = foundExt;
        domainName = domainName.replace(foundExt, '');
      }
    }
    
    // Clean domain name (remove special characters but keep basic structure)
    const cleanDomain = domainName.replace(/[^a-z0-9-]/g, '');
    
    let checkResults = [];
    
    // If user searched for specific domain, check that first
    if (searchedExtension) {
      checkResults.push({
        domain: cleanDomain + searchedExtension,
        available: simulateCheck(cleanDomain, searchedExtension),
        extension: searchedExtension,
        isSearched: true
      });
    }
    
    // Add alternatives with other extensions
    const alternativeExtensions = domainExtensions.filter(ext => ext !== searchedExtension);
    const alternatives = alternativeExtensions.map(ext => ({
      domain: cleanDomain + ext,
      available: simulateCheck(cleanDomain, ext),
      extension: ext,
      isSearched: false
    }));
    
    checkResults = [...checkResults, ...alternatives];
    
    setResults(checkResults);
    setIsChecking(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCheck();
    }
  };

  return (
    <section className="py-16 bg-muted/30" data-aos="fade-up">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Cek <span className="text-gradient-hero">Ketersediaan Domain</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Temukan domain perfect untuk website Anda dengan mudah dan cepat
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-8">
            <div className="relative flex-1">
              <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Masukkan nama domain (contoh: artweb.com atau bisnisku)"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-10 h-12 text-lg"
                disabled={isChecking}
              />
            </div>
            <Button 
              onClick={handleCheck}
              disabled={isChecking || !domain.trim()}
              size="lg"
              className="h-12 px-8 bg-gradient-hero hover:shadow-glow transition-all duration-300 text-white border-0"
            >
              {isChecking ? (
                <Loader className="w-5 h-5 mr-2 animate-spin" />
              ) : (
                <Search className="w-5 h-5 mr-2" />
              )}
              {isChecking ? 'Mengecek...' : 'Cek Domain'}
            </Button>
          </div>

          {results.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto" data-aos="fade-up" data-aos-delay="200">
              {results.map((result, index) => (
                <Card key={index} className="hover:shadow-medium transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-semibold text-foreground">{result.domain}</span>
                      {result.available ? (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-500" />
                      )}
                    </div>
                    <div className={`text-sm font-medium ${result.available ? 'text-green-600' : 'text-red-600'}`}>
                      {result.available ? 'Tersedia' : 'Tidak Tersedia'}
                    </div>
                    {result.available && (
                      <Button 
                        size="sm" 
                        className="w-full mt-3 bg-gradient-hero hover:shadow-glow transition-all duration-300 text-white border-0"
                        onClick={() => window.open(`https://wa.me/6287821957335?text=Halo%20Artweb,%20saya%20tertarik%20dengan%20domain%20${result.domain}%20dan%20ingin%20konsultasi%20untuk%20pembuatan%20website`, '_blank')}
                      >
                        Konsultasi Domain
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {results.length > 0 && (
            <div className="mt-8 p-6 bg-primary/10 rounded-xl border border-primary/20">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Butuh bantuan memilih domain?
              </h3>
              <p className="text-muted-foreground mb-4">
                Tim kami siap membantu Anda memilih domain terbaik untuk bisnis Anda
              </p>
              <Button 
                className="bg-gradient-hero hover:shadow-glow transition-all duration-300 text-white border-0"
                onClick={() => window.open('https://wa.me/6287821957335?text=Halo%20Artweb,%20saya%20butuh%20bantuan%20memilih%20domain%20untuk%20website%20saya', '_blank')}
              >
                Konsultasi Gratis
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DomainChecker;