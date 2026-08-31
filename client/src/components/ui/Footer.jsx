import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Github, Twitter, Youtube, Mail, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="relative w-full border-t border-light-blue bg-navy">
      <div className="w-full px-6 sm:px-12 lg:px-20 xl:px-28 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 w-full">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <Sparkles className="h-8 w-8 text-light-blue" />
              <span className="text-xl font-bold text-white">NexLab</span>
            </Link>
            <p className="mt-3 text-sm sm:text-base text-light-blue/60">
              Learn AI by building real projects. Designed for Indian students in classes 8-12.
            </p>
          </div>

          <div>
            <h4 className="mb-3 font-semibold text-white text-lg">Product</h4>
            <ul className="space-y-2 text-sm sm:text-base text-light-blue/60">
              <li><Link to="/courses" className="hover:text-light-blue transition-colors">Courses</Link></li>
              <li><Link to="/showcase" className="hover:text-light-blue transition-colors">Showcase</Link></li>
              <li><Link to="/pricing" className="hover:text-light-blue transition-colors">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 font-semibold text-white text-lg">Company</h4>
            <ul className="space-y-2 text-sm sm:text-base text-light-blue/60">
              <li><Link to="/about" className="hover:text-light-blue transition-colors">About</Link></li>
              <li><Link to="/blog" className="hover:text-light-blue transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-light-blue transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 font-semibold text-white text-lg">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="text-light-blue/60 hover:text-light-blue transition-colors">
                <Github className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
              <a href="#" className="text-light-blue/60 hover:text-light-blue transition-colors">
                <Twitter className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
              <a href="#" className="text-light-blue/60 hover:text-light-blue transition-colors">
                <Youtube className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
              <a href="#" className="text-light-blue/60 hover:text-light-blue transition-colors">
                <Mail className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
            </div>
            <p className="mt-3 text-sm sm:text-base text-light-blue/40 flex items-center gap-1">
              Made with <Heart className="h-4 w-4 text-red-400" /> for Indian students
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-light-blue/20 pt-8 text-center text-sm sm:text-base text-light-blue/40">
          <p>&copy; 2025 NexLab. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;