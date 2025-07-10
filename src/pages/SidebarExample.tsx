import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';

const SidebarExample = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Contoh Sidebar dengan Icon Mobile</h1>
            <p className="text-muted-foreground mb-4">
              Sidebar ini menampilkan icon yang lebih besar pada tampilan mobile dan 
              menyembunyikan teks saat dalam mode collapsed pada desktop.
            </p>
            <div className="bg-muted/30 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Fitur Sidebar:</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Icon yang lebih besar pada mobile (w-5 h-5)</li>
                <li>• Icon standar pada desktop (w-4 h-4)</li>
                <li>• Menu dapat di-collapse/expand</li>
                <li>• Navigasi aktif dengan highlighting</li>
                <li>• Tombol kontak WhatsApp terintegrasi</li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default SidebarExample;