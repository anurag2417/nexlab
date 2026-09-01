import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../utils/validators';
import { useAuthStore } from '../store/authStore';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { ArrowLeft, Loader2, Sparkles, Eye, EyeOff, Mail, Lock, CheckCircle } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading, error, clearError, isAuthenticated } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const from = location.state?.from?.pathname || '/dashboard';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const onSubmit = async (data) => {
    clearError();
    setSuccess(false);
    
    const result = await login(data.email, data.password);
    
    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-cream/20 via-white to-sage/10 px-4 py-8">
      <div className="absolute inset-0 w-full overflow-hidden">
        <div className="absolute top-0 -left-40 h-[500px] w-[500px] rounded-full bg-cream/60 blur-3xl" />
        <div className="absolute bottom-0 -right-40 h-[500px] w-[500px] rounded-full bg-sage/20 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <Card className="border-cream/30 bg-white/80 backdrop-blur-xl shadow-2xl shadow-moss/5">
          <CardHeader>
            <Link to="/" className="mb-4 inline-flex items-center gap-2 text-sm text-deepForest/60 hover:text-moss transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-moss/10 p-2.5">
                <Sparkles className="h-6 w-6 text-moss" />
              </div>
              <div>
                <CardTitle className="text-2xl text-forest">Welcome Back</CardTitle>
                <CardDescription className="text-deepForest/60">
                  Sign in to continue your learning journey
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-forest">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-deepForest/40" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    error={errors.email?.message}
                    className="pl-9 bg-white border-cream/50 text-forest placeholder:text-deepForest/40 focus:border-moss focus:ring-2 focus:ring-moss/20"
                    {...register('email')}
                  />
                </div>
              </div>
              
              <div>
                <label className="mb-1.5 block text-sm font-medium text-forest">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-deepForest/40" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    error={errors.password?.message}
                    className="pl-9 pr-10 bg-white border-cream/50 text-forest placeholder:text-deepForest/40 focus:border-moss focus:ring-2 focus:ring-moss/20"
                    {...register('password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-deepForest/40 hover:text-forest transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <Link to="/forgot-password" className="text-sm text-moss hover:text-forest transition-colors font-medium">
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

              {success && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-green-600 bg-green-50 border border-green-200/60 rounded-lg p-3 flex items-center gap-2"
                >
                  <CheckCircle className="h-4 w-4" />
                  Login successful! Redirecting...
                </motion.p>
              )}

              <Button 
                type="submit" 
                disabled={isLoading || success} 
                className="w-full gradient-button py-6 text-base"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>

              <p className="text-center text-sm text-deepForest/60">
                Don't have an account?{' '}
                <Link to="/register" className="font-medium text-moss hover:text-forest transition-colors">
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