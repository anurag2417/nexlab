import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-50/80 px-4 py-8">
      <div className="absolute inset-0 w-full overflow-hidden">
        <div className="absolute top-0 -left-40 h-[500px] w-[500px] rounded-full bg-primary-200/20 blur-3xl" />
        <div className="absolute bottom-0 -right-40 h-[500px] w-[500px] rounded-full bg-secondary-200/20 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-primary-600" />
            <span className="text-2xl font-bold text-gray-900">NexLab</span>
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;