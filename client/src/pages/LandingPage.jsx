import React from 'react';
import { Navbar } from '../components/ui/Navbar';
import { Hero } from '../components/landing/Hero';
import { Stats } from '../components/landing/Stats';
import { Features } from '../components/landing/Features';
import { Curriculum } from '../components/landing/Curriculum';
import { Testimonials } from '../components/landing/Testimonials';
import { Pricing } from '../components/landing/Pricing';
import { Footer } from '../components/ui/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-cream/20 via-white to-sage/10 overflow-x-hidden">
      <div className="relative w-full">
        {/* Animated Background */}
        <div className="fixed inset-0 -z-10 w-full">
          <div className="absolute inset-0 w-full bg-white/50" />
          <div className="absolute top-0 -left-40 h-[500px] w-[500px] rounded-full bg-cream/60 blur-3xl animate-forest-pulse" />
          <div className="absolute top-1/2 -right-40 h-[500px] w-[500px] rounded-full bg-sage/20 blur-3xl animate-forest-pulse delay-1000" />
          <div className="absolute bottom-0 left-1/2 h-[400px] w-[400px] rounded-full bg-forest/10 blur-3xl animate-forest-pulse delay-2000" />
          <div className="absolute top-1/3 left-1/2 h-[300px] w-[300px] rounded-full bg-moss/10 blur-3xl" />
        </div>

        <Navbar />
        <Hero />
        <Stats />
        <Features />
        <Curriculum />
        <Testimonials />
        <Pricing />
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;