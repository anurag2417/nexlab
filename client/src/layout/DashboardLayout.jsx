import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { Navbar } from '../components/ui/Navbar';
import { Sidebar } from '../components/dashboard/Sidebar';
import { Button } from '../components/ui/Button';

export const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-light-blue/10 via-white to-light-blue/20">
      <Navbar />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="md:pl-64 pt-16">
        <div className="sticky top-16 z-30 bg-white/80 backdrop-blur-xl border-b border-light-blue px-6 py-3 md:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(true)}
            className="text-gray-600 hover:text-dark-blue"
          >
            <Menu className="h-5 w-5" />
            <span className="ml-2">Menu</span>
          </Button>
        </div>

        <main className="p-4 sm:p-6 md:p-8">
          <div className="w-full max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;