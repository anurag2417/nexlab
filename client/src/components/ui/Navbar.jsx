import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles, User, LogIn, LogOut, ChevronDown } from 'lucide-react';
import { Button } from './Button';
import { useAuthStore } from '../../store/authStore';
import { cn } from '../../utils/cn';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;

  return (
    <header
      className={cn(
        'fixed top-0 z-50 w-full transition-all duration-300',
        isScrolled
          ? 'bg-white/90 backdrop-blur-xl border-b border-gray-200/50 shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="w-full px-6 sm:px-12 lg:px-20 xl:px-28">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <Sparkles className="h-7 w-7 text-primary-600" />
            <span className="text-xl font-bold text-gray-900 tracking-tight">NexLab</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 md:flex">
            <Link
              to="/showcase"
              className={cn(
                'text-sm font-medium transition-colors relative',
                isActive('/showcase')
                  ? 'text-primary-700'
                  : 'text-gray-600 hover:text-primary-700'
              )}
            >
              Showcase
              {isActive('/showcase') && (
                <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-primary-500 rounded-full" />
              )}
            </Link>
            {user && (
              <>
                <Link
                  to="/dashboard"
                  className={cn(
                    'text-sm font-medium transition-colors relative',
                    isActive('/dashboard')
                      ? 'text-primary-700'
                      : 'text-gray-600 hover:text-primary-700'
                  )}
                >
                  Dashboard
                  {isActive('/dashboard') && (
                    <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-primary-500 rounded-full" />
                  )}
                </Link>
                <Link
                  to="/courses"
                  className={cn(
                    'text-sm font-medium transition-colors relative',
                    isActive('/courses')
                      ? 'text-primary-700'
                      : 'text-gray-600 hover:text-primary-700'
                  )}
                >
                  Courses
                  {isActive('/courses') && (
                    <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-primary-500 rounded-full" />
                  )}
                </Link>
              </>
            )}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden items-center gap-4 md:flex">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 rounded-full border border-gray-200/70 bg-white/50 px-3 py-1.5 transition-all hover:border-primary-300/50 hover:bg-gray-50/80"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-primary-700 text-sm font-medium">
                    {user.name?.charAt(0) || 'U'}
                  </div>
                  <span className="text-sm text-gray-700 max-w-[100px] truncate">
                    {user.name}
                  </span>
                  <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl border border-gray-200/50 bg-white shadow-2xl shadow-gray-200/20 backdrop-blur-xl overflow-hidden">
                    <div className="p-3 border-b border-gray-100/80">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <div className="p-1">
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-primary-50/80 hover:text-primary-700"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <User className="h-4 w-4" />
                        Profile
                      </Link>
                      <Link
                        to="/dashboard"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-primary-50/80 hover:text-primary-700"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <Sparkles className="h-4 w-4" />
                        Dashboard
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-primary-50/80 hover:text-primary-700"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Settings
                      </Link>
                    </div>
                    <div className="p-1 border-t border-gray-100/80">
                      <button
                        onClick={() => {
                          logout();
                          setIsDropdownOpen(false);
                        }}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50/80 hover:text-red-700"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900 hover:bg-gray-100/80">
                    <LogIn className="mr-2 h-4 w-4" />
                    Log In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="bg-primary-600 text-white hover:bg-primary-700 shadow-md shadow-primary-500/25">
                    Start Free
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-600 hover:text-gray-900 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="border-t border-gray-200/50 bg-white/95 backdrop-blur-xl px-6 py-6 md:hidden">
          <nav className="flex flex-col gap-4">
            <Link
              to="/showcase"
              className="text-base font-medium text-gray-600 hover:text-primary-700 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Showcase
            </Link>
            {user && (
              <>
                <Link
                  to="/dashboard"
                  className="text-base font-medium text-gray-600 hover:text-primary-700 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/courses"
                  className="text-base font-medium text-gray-600 hover:text-primary-700 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Courses
                </Link>
              </>
            )}
            <div className="pt-4 border-t border-gray-200/50">
              {user ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 px-2 py-1">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-700 text-sm font-medium">
                      {user.name?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                  </div>
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-600 hover:bg-primary-50/80 hover:text-primary-700 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="h-4 w-4" />
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-600 hover:bg-red-50/80 hover:text-red-700 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:border-primary-500 hover:text-primary-700">
                      <LogIn className="mr-2 h-4 w-4" />
                      Log In
                    </Button>
                  </Link>
                  <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full bg-primary-600 text-white hover:bg-primary-700">
                      Start Free
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;