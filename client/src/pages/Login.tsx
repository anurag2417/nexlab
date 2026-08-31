import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormData } from '../utils/validators';
import { useAuthStore } from '../store/authStore';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { ArrowLeft, Loader2, Sparkles, Eye, EyeOff, Mail, Lock } from 'lucide-react';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    const result = await login(data);
    if (result.success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-50/80 px-4 py-8">
      {/* Background Effects */}
      <div className="absolute inset-0 w-full overflow-hidden">
        <div className="absolute top-0 -left-40 h-[500px] w-[500px] rounded-full bg-primary-200/20 blur-3xl" />
        <div className="absolute bottom-0 -right-40 h-[500px] w-[500px] rounded-full bg-secondary-200/20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-primary-100/10 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <Card className="border-gray-200/60 bg-white/80 backdrop-blur-xl shadow-2xl shadow-gray-200/50">
          <CardHeader>
            <Link to="/" className="mb-4 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-primary-100 p-2.5">
                <Sparkles className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <CardTitle className="text-2xl text-gray-900">Welcome Back</CardTitle>
                <CardDescription className="text-gray-500">
                  Sign in to continue your learning journey
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Email Field */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    error={errors.email?.message}
                    className="pl-9 bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                    {...register('email')}
                  />
                </div>
              </div>
              
              {/* Password Field */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    error={errors.password?.message}
                    className="pl-9 pr-10 bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                    {...register('password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <Link to="/forgot-password" className="text-sm text-primary-600 hover:text-primary-700 transition-colors font-medium">
                  Forgot password?
                </Link>
              </div>
              
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-600 bg-red-50 border border-red-200/60 rounded-lg p-3"
                >
                  {error}
                </motion.p>
              )}

              <Button type="submit" disabled={isLoading} className="w-full bg-primary-600 hover:bg-primary-700 text-white py-6 text-base shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>

              <p className="text-center text-sm text-gray-500">
                Don't have an account?{' '}
                <Link to="/register" className="font-medium text-primary-600 hover:text-primary-700 transition-colors">
                  Sign up
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;