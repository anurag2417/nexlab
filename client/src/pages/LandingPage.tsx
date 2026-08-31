import React from 'react';
import { Navbar } from '../components/ui/Navbar';
import { Hero } from '../components/landing/Hero';
import { Stats } from '../components/landing/Stats';
import { Features } from '../components/landing/Features';
import { Curriculum } from '../components/landing/Curriculum';
import { Testimonials } from '../components/landing/Testimonials';
import { Pricing } from '../components/landing/Pricing';
import { Footer } from '../components/ui/Footer';
import { SmoothScroll } from '../components/SmoothScroll';

const LandingPage: React.FC = () => {
  return (
    <SmoothScroll>
      <div className="min-h-screen w-full bg-[#0a0a0f] overflow-x-hidden">
        <div className="relative w-full">
          {/* Animated Background Gradient */}
          <div className="fixed inset-0 -z-10 w-full">
            <div className="absolute inset-0 w-full bg-[#0a0a0f]" />
            <div className="absolute top-0 -left-40 h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-3xl animate-pulse-slow" />
            <div className="absolute top-1/2 -right-40 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-3xl animate-pulse-slow delay-1000" />
            <div className="absolute bottom-0 left-1/2 h-[400px] w-[400px] rounded-full bg-cyan-600/20 blur-3xl animate-pulse-slow delay-2000" />
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
    </SmoothScroll>
  );
};

export default LandingPage;