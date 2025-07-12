import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Trash2, Edit, Plus, X, ExternalLink } from "lucide-react";

interface Portfolio {
  id: string;
  title: string;
  description: string;
  detailed_description: string;
  image_url: string;
  gallery_images: string[];
  category: string;
  website_url: string;
  client: string;
  year: number;
  features: string[];
  project_duration: string;
  team_size: number;
  featured: boolean;
}

const PortfolioManager = () => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [editingPortfolio, setEditingPortfolio] = useState<Portfolio | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    detailed_description: "",
    image_url: "",
    gallery_images: [""],
    category: "",
    website_url: "",
    client: "",
    year: new Date().getFullYear(),
    features: [""],
    project_duration: "",
    team_size: 1,
    featured: false,
  });

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const fetchPortfolios = async () => {
    try {
      const { data, error } = await supabase
        .from('portfolio')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPortfolios(data || []);
    } catch (error) {
      console.error('Error:', error);
      toast.error("Gagal memuat portfolio");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const cleanedData = {
      ...formData,
      gallery_images: formData.gallery_images.filter(img => img.trim()),
      features: formData.features.filter(feature => feature.trim()),
    };

    try {
      if (editingPortfolio) {
        const { error } = await supabase
          .from('portfolio')
          .update(cleanedData)
          .eq('id', editingPortfolio.id);

        if (error) throw error;
        toast.success("Portfolio berhasil diupdate");
      } else {
        const { error } = await supabase
          .from('portfolio')
          .insert([cleanedData]);

        if (error) throw error;
        toast.success("Portfolio berhasil ditambahkan");
      }

      resetForm();
      fetchPortfolios();
    } catch (error) {
      console.error('Error:', error);
      toast.error("Terjadi kesalahan");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus portfolio ini?")) return;

    try {
      const { error } = await supabase
        .from('portfolio')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success("Portfolio berhasil dihapus");
      fetchPortfolios();
    } catch (error) {
      console.error('Error:', error);
      toast.error("Gagal menghapus portfolio");
    }
  };

  const handleEdit = (portfolio: Portfolio) => {
    setEditingPortfolio(portfolio);
    setFormData({
      title: portfolio.title,
      description: portfolio.description,
      detailed_description: portfolio.detailed_description || "",
      image_url: portfolio.image_url,
      gallery_images: portfolio.gallery_images && portfolio.gallery_images.length > 0 ? portfolio.gallery_images : [""],
      category: portfolio.category,
      website_url: portfolio.website_url,
      client: portfolio.client,
      year: portfolio.year,
      features: portfolio.features && portfolio.features.length > 0 ? portfolio.features : [""],
      project_duration: portfolio.project_duration || "",
      team_size: portfolio.team_size || 1,
      featured: portfolio.featured,
    });
    setIsCreating(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      detailed_description: "",
      image_url: "",
      gallery_images: [""],
      category: "",
      website_url: "",
      client: "",
      year: new Date().getFullYear(),
      features: [""],
      project_duration: "",
      team_size: 1,
      featured: false,
    });
    setEditingPortfolio(null);
    setIsCreating(false);
  };

  const addGalleryImage = () => {
    setFormData(prev => ({
      ...prev,
      gallery_images: [...prev.gallery_images, ""]
    }));
  };

  const removeGalleryImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      gallery_images: prev.gallery_images.filter((_, i) => i !== index)
    }));
  };

  const updateGalleryImage = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      gallery_images: prev.gallery_images.map((img, i) => i === index ? value : img)
    }));
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, ""]
    }));
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const updateFeature = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((feature, i) => i === index ? value : feature)
    }));
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Kelola Portfolio</h2>
        <Button 
          onClick={() => setIsCreating(true)}
          className="bg-gradient-to-r from-primary to-primary/80"
        >
          <Plus className="w-4 h-4 mr-2" />
          Tambah Portfolio
        </Button>
      </div>

      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>{editingPortfolio ? 'Edit Portfolio' : 'Tambah Portfolio Baru'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Judul *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Kategori *</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({...prev, category: e.target.value}))}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Deskripsi Singkat *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
                  required
                />
              </div>

              <div>
                <Label htmlFor="detailed_description">Deskripsi Detail</Label>
                <Textarea
                  id="detailed_description"
                  value={formData.detailed_description}
                  onChange={(e) => setFormData(prev => ({...prev, detailed_description: e.target.value}))}
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="image_url">URL Gambar Utama *</Label>
                <Input
                  id="image_url"
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData(prev => ({...prev, image_url: e.target.value}))}
                  required
                />
              </div>

              {/* Gallery Images */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label>Galeri Gambar</Label>
                  <Button type="button" onClick={addGalleryImage} size="sm" variant="outline">
                    <Plus className="w-4 h-4 mr-1" />
                    Tambah Gambar
                  </Button>
                </div>
                {formData.gallery_images.map((image, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <Input
                      type="url"
                      placeholder="URL Gambar"
                      value={image}
                      onChange={(e) => updateGalleryImage(index, e.target.value)}
                    />
                    {formData.gallery_images.length > 1 && (
                      <Button 
                        type="button" 
                        onClick={() => removeGalleryImage(index)} 
                        size="sm" 
                        variant="outline"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              {/* Features */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label>Teknologi/Fitur</Label>
                  <Button type="button" onClick={addFeature} size="sm" variant="outline">
                    <Plus className="w-4 h-4 mr-1" />
                    Tambah Fitur
                  </Button>
                </div>
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <Input
                      placeholder="Teknologi/Fitur"
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value)}
                    />
                    {formData.features.length > 1 && (
                      <Button 
                        type="button" 
                        onClick={() => removeFeature(index)} 
                        size="sm" 
                        variant="outline"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="client">Klien *</Label>
                  <Input
                    id="client"
                    value={formData.client}
                    onChange={(e) => setFormData(prev => ({...prev, client: e.target.value}))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="year">Tahun *</Label>
                  <Input
                    id="year"
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData(prev => ({...prev, year: parseInt(e.target.value)}))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="team_size">Ukuran Tim</Label>
                  <Input
                    id="team_size"
                    type="number"
                    value={formData.team_size}
                    onChange={(e) => setFormData(prev => ({...prev, team_size: parseInt(e.target.value)}))}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="website_url">URL Website</Label>
                  <Input
                    id="website_url"
                    type="url"
                    value={formData.website_url}
                    onChange={(e) => setFormData(prev => ({...prev, website_url: e.target.value}))}
                  />
                </div>
                <div>
                  <Label htmlFor="project_duration">Durasi Project</Label>
                  <Input
                    id="project_duration"
                    placeholder="e.g., 3 bulan"
                    value={formData.project_duration}
                    onChange={(e) => setFormData(prev => ({...prev, project_duration: e.target.value}))}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  id="featured"
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData(prev => ({...prev, featured: e.target.checked}))}
                />
                <Label htmlFor="featured">Portfolio Unggulan</Label>
              </div>

              <div className="flex space-x-2">
                <Button type="submit" className="bg-gradient-to-r from-primary to-primary/80">
                  {editingPortfolio ? 'Update' : 'Simpan'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Batal
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {portfolios.map((portfolio) => (
          <Card key={portfolio.id} className="border-none shadow-soft">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold">{portfolio.title}</h3>
                    <Badge variant={portfolio.featured ? "default" : "secondary"}>
                      {portfolio.category}
                    </Badge>
                    {portfolio.featured && <Badge>Unggulan</Badge>}
                  </div>
                  <p className="text-muted-foreground mb-2">{portfolio.description}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Klien: {portfolio.client}</span>
                    <span>Tahun: {portfolio.year}</span>
                    {portfolio.website_url && (
                      <a href={portfolio.website_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary">
                        <ExternalLink className="w-3 h-3" />
                        Website
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    onClick={() => handleEdit(portfolio)}
                    size="sm"
                    variant="outline"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => handleDelete(portfolio.id)}
                    size="sm"
                    variant="outline"
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PortfolioManager;