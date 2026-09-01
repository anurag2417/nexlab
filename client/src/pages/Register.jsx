import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../utils/validators';
import { useAuthStore } from '../store/authStore';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { ArrowLeft, Loader2, Sparkles, Eye, EyeOff, Mail, Lock, User, School, MapPin, CheckCircle } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const { register: registerUser, isLoading, error, clearError, isAuthenticated } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '', // Empty - No default
      email: '', // Empty - No default
      password: '', // Empty - No default
      confirmPassword: '', // Empty - No default
      school: '', // Empty - No default
      grade: '', // Empty - No default
      city: '', // Empty - No default
    },
  });

  const password = watch('password');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data) => {
    clearError();
    setSuccess(false);
    
    const result = await registerUser(data);
    
    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-powderBlush/20 via-white to-petalRouge/10 px-4 py-8">
      <div className="absolute inset-0 w-full overflow-hidden">
        <div className="absolute top-0 -left-40 h-[500px] w-[500px] rounded-full bg-powderBlush/40 blur-3xl" />
        <div className="absolute bottom-0 -right-40 h-[500px] w-[500px] rounded-full bg-petalRouge/20 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <Card className="border-powderBlush/30 bg-white/80 backdrop-blur-xl shadow-2xl shadow-roseKiss/5">
          <CardHeader>
            <Link to="/" className="mb-4 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-roseKiss transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-roseKiss/10 p-2.5">
                <Sparkles className="h-6 w-6 text-roseKiss" />
              </div>
              <div>
                <CardTitle className="text-2xl text-gray-800">Create Account</CardTitle>
                <CardDescription className="text-gray-500">
                  Start your AI learning journey today
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    error={errors.name?.message}
                    className="pl-9 bg-white border-powderBlush/50 text-gray-800 placeholder:text-gray-400 focus:border-roseKiss focus:ring-2 focus:ring-roseKiss/20"
                    {...register('name')}
                  />
                </div>
              </div>
              
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    error={errors.email?.message}
                    className="pl-9 bg-white border-powderBlush/50 text-gray-800 placeholder:text-gray-400 focus:border-roseKiss focus:ring-2 focus:ring-roseKiss/20"
                    {...register('email')}
                  />
                </div>
              </div>
              
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">School (Optional)</label>
                <div className="relative">
                  <School className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Enter your school name"
                    error={errors.school?.message}
                    className="pl-9 bg-white border-powderBlush/50 text-gray-800 placeholder:text-gray-400 focus:border-roseKiss focus:ring-2 focus:ring-roseKiss/20"
                    {...register('school')}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Grade</label>
                  <Input
                    type="text"
                    placeholder="8-12"
                    error={errors.grade?.message}
                    className="bg-white border-powderBlush/50 text-gray-800 placeholder:text-gray-400 focus:border-roseKiss focus:ring-2 focus:ring-roseKiss/20"
                    {...register('grade')}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">City</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Enter your city"
                      error={errors.city?.message}
                      className="pl-9 bg-white border-powderBlush/50 text-gray-800 placeholder:text-gray-400 focus:border-roseKiss focus:ring-2 focus:ring-roseKiss/20"
                      {...register('city')}
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a password"
                    error={errors.password?.message}
                    className="pl-9 pr-10 bg-white border-powderBlush/50 text-gray-800 placeholder:text-gray-400 focus:border-roseKiss focus:ring-2 focus:ring-roseKiss/20"
                    {...register('password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    error={errors.confirmPassword?.message}
                    className="pl-9 pr-10 bg-white border-powderBlush/50 text-gray-800 placeholder:text-gray-400 focus:border-roseKiss focus:ring-2 focus:ring-roseKiss/20"
                    {...register('confirmPassword')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
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

              {success && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-green-600 bg-green-50 border border-green-200/60 rounded-lg p-3 flex items-center gap-2"
                >
                  <CheckCircle className="h-4 w-4" />
                  Account created successfully! Redirecting...
                </motion.p>
              )}

              <Button 
                type="submit" 
                disabled={isLoading || success} 
                className="w-full gradient-button-rose py-6 text-base"
              >
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
                <Link to="/login" className="font-medium text-roseKiss hover:text-petalRouge transition-colors">
                  Sign in
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Register;