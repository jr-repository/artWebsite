import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  User, 
  Briefcase, 
  DollarSign, 
  FileText, 
  Phone,
  Settings,
  Menu
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';

const menuItems = [
  { title: "Beranda", url: "/", icon: Home },
  { title: "Tentang", url: "/about", icon: User },
  { title: "Layanan", url: "/services", icon: Briefcase },
  { title: "Portofolio", url: "/portfolio", icon: FileText },
  { title: "Harga", url: "/pricing", icon: DollarSign },
  { title: "Blog", url: "/blog", icon: FileText },
  { title: "Kontak", url: "/contact", icon: Phone },
];

export function AppSidebar() {
  const { state, isMobile } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted/50";

  return (
    <Sidebar className="border-r border-border/50">
      <SidebarContent>
        {/* Header */}
        <div className="p-4 border-b border-border/50">
          <div className="flex items-center gap-3">
            <Logo size="sm" />
            {state === "expanded" && (
              <span className="font-display font-bold text-lg text-foreground">
                Artweb
              </span>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>
            Menu Utama
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={getNavCls}
                    >
                      <item.icon className={`${
                        isMobile ? 'w-5 h-5' : 'w-4 h-4'
                      } mr-2 shrink-0`} />
                      {/* Show text on desktop or when expanded, show icon + text on mobile */}
                      {(state === "expanded" || isMobile) && (
                        <span className="truncate">{item.title}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Contact Section */}
        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel>
            Aksi Cepat
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <div className="p-2 space-y-2">
              <Button
                variant="default"
                size="sm"
                className="w-full justify-start"
                onClick={() => window.open('https://wa.me/6287821957335', '_blank')}
              >
                <Phone className={`${
                  isMobile ? 'w-5 h-5' : 'w-4 h-4'
                } mr-2 shrink-0`} />
                {(state === "expanded" || isMobile) && "Chat WhatsApp"}
              </Button>
              
              {state === "expanded" && (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => window.open('tel:+6287821957335', '_blank')}
                >
                  <Phone className="w-4 h-4 mr-2 shrink-0" />
                  Telepon
                </Button>
              )}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}