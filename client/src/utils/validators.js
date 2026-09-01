import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z.string()
    .min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name is too long'),
  email: z.string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z.string()
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string()
    .min(6, 'Password must be at least 6 characters'),
  school: z.string().optional(),
  grade: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export const profileSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name is too long'),
  school: z.string().optional(),
  grade: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  bio: z.string().max(200, 'Bio is too long').optional(),
  github: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  linkedin: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  portfolio: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
});