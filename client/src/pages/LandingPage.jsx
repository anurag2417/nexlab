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
    <div className="min-h-screen w-full bg-white overflow-x-hidden">
      <div className="relative w-full">
        {/* Animated Background Gradient */}
        <div className="fixed inset-0 -z-10 w-full">
          <div className="absolute inset-0 w-full bg-white" />
          <div className="absolute top-0 -left-40 h-[500px] w-[500px] rounded-full bg-light-blue/60 blur-3xl" />
          <div className="absolute top-1/2 -right-40 h-[500px] w-[500px] rounded-full bg-mid-blue/30 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-[400px] w-[400px] rounded-full bg-light-blue/40 blur-3xl" />
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