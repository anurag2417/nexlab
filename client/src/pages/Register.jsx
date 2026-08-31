import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../utils/validators';
import { useAuthStore } from '../store/authStore';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { ArrowLeft, Loader2, Sparkles, Eye, EyeOff, Mail, Lock, User, School, MapPin } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const { register: registerUser, isLoading, error, clearError } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const password = watch('password');

  const onSubmit = async (data) => {
    clearError();
    const result = await registerUser(data);
    if (result.success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-light-blue/20 px-4 py-8">
      <div className="absolute inset-0 w-full overflow-hidden">
        <div className="absolute top-0 -left-40 h-[500px] w-[500px] rounded-full bg-light-blue/60 blur-3xl" />
        <div className="absolute bottom-0 -right-40 h-[500px] w-[500px] rounded-full bg-mid-blue/20 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <Card className="border-light-blue/60 bg-white/80 backdrop-blur-xl shadow-2xl shadow-mid-blue/10">
          <CardHeader>
            <Link to="/" className="mb-4 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-dark-blue transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-light-blue p-2.5">
                <Sparkles className="h-6 w-6 text-dark-blue" />
              </div>
              <div>
                <CardTitle className="text-2xl text-navy">Create Account</CardTitle>
                <CardDescription className="text-gray-500">
                  Start your AI learning journey today
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-navy">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Your name"
                    error={errors.name?.message}
                    className="pl-9 bg-white border-light-blue text-navy placeholder:text-gray-400 focus:border-dark-blue focus:ring-2 focus:ring-dark-blue/20"
                    {...register('name')}
                  />
                </div>
              </div>
              
              <div>
                <label className="mb-1.5 block text-sm font-medium text-navy">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    error={errors.email?.message}
                    className="pl-9 bg-white border-light-blue text-navy placeholder:text-gray-400 focus:border-dark-blue focus:ring-2 focus:ring-dark-blue/20"
                    {...register('email')}
                  />
                </div>
              </div>
              
              <div>
                <label className="mb-1.5 block text-sm font-medium text-navy">School (Optional)</label>
                <div className="relative">
                  <School className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Your school name"
                    error={errors.school?.message}
                    className="pl-9 bg-white border-light-blue text-navy placeholder:text-gray-400 focus:border-dark-blue focus:ring-2 focus:ring-dark-blue/20"
                    {...register('school')}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-navy">Grade</label>
                  <Input
                    type="text"
                    placeholder="8-12"
                    error={errors.grade?.message}
                    className="bg-white border-light-blue text-navy placeholder:text-gray-400 focus:border-dark-blue focus:ring-2 focus:ring-dark-blue/20"
                    {...register('grade')}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-navy">City</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Your city"
                      error={errors.city?.message}
                      className="pl-9 bg-white border-light-blue text-navy placeholder:text-gray-400 focus:border-dark-blue focus:ring-2 focus:ring-dark-blue/20"
                      {...register('city')}
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="mb-1.5 block text-sm font-medium text-navy">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    error={errors.password?.message}
                    className="pl-9 pr-10 bg-white border-light-blue text-navy placeholder:text-gray-400 focus:border-dark-blue focus:ring-2 focus:ring-dark-blue/20"
                    {...register('password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-navy transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              
              <div>
                <label className="mb-1.5 block text-sm font-medium text-navy">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    error={errors.confirmPassword?.message}
                    className="pl-9 pr-10 bg-white border-light-blue text-navy placeholder:text-gray-400 focus:border-dark-blue focus:ring-2 focus:ring-dark-blue/20"
                    {...register('confirmPassword')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-navy transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
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

              <Button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-dark-blue to-mid-blue text-white hover:shadow-lg hover:shadow-mid-blue/30 py-6 text-base">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  'Create Account'
                )}
              </Button>

              <p className="text-center text-sm text-gray-500">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-dark-blue hover:text-mid-blue transition-colors">
                  Sign in
                </Link>
              </p>

              <div className="mt-4 p-3 bg-light-blue/30 rounded-lg border border-light-blue">
                <p className="text-xs text-gray-500 text-center">
                  Demo: Any valid email and password (min 6 characters) works
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Register;