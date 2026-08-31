import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Github, Twitter, Youtube, Mail, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative w-full border-t border-gray-800/50 bg-[#0a0a0f]">
      <div className="w-full px-6 sm:px-12 lg:px-20 xl:px-28 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 w-full">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2">
              <Sparkles className="h-8 w-8 text-purple-500" />
              <span className="text-xl font-bold text-white">NexLab</span>
            </Link>
            <p className="mt-3 text-sm sm:text-base text-gray-400">
              Learn AI by building real projects. Designed for Indian students in classes 8-12.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="mb-3 font-semibold text-white text-lg">Product</h4>
            <ul className="space-y-2 text-sm sm:text-base text-gray-400">
              <li><Link to="/courses" className="hover:text-purple-400 transition-colors">Courses</Link></li>
              <li><Link to="/showcase" className="hover:text-purple-400 transition-colors">Showcase</Link></li>
              <li><Link to="/pricing" className="hover:text-purple-400 transition-colors">Pricing</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-3 font-semibold text-white text-lg">Company</h4>
            <ul className="space-y-2 text-sm sm:text-base text-gray-400">
              <li><Link to="/about" className="hover:text-purple-400 transition-colors">About</Link></li>
              <li><Link to="/blog" className="hover:text-purple-400 transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-purple-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="mb-3 font-semibold text-white text-lg">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Github className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Twitter className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Youtube className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Mail className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
            </div>
            <p className="mt-3 text-sm sm:text-base text-gray-500 flex items-center gap-1">
              Made with <Heart className="h-4 w-4 text-red-500" /> for Indian students
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-800/50 pt-8 text-center text-sm sm:text-base text-gray-500">
          <p>&copy; 2025 NexLab. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};