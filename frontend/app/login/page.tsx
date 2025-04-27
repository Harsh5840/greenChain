'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAuth } from '@/hooks/useAuth';
import AnimatedComponent from '@/components/AnimatedComponent';

const formSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export default function LoginPage() {
  const { login, isLoading } = useAuth();
  const [formError, setFormError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setFormError(null);
    const result = await login(values.email, values.password);
    if (!result) {
      setFormError('Invalid email or password. Please try again.');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-green-100 to-emerald-50 dark:from-green-950/30 dark:via-green-900/20 dark:to-emerald-950/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-green-300 dark:bg-green-700/30 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-emerald-300 dark:bg-emerald-700/30 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>
      
      <div className="max-w-md w-full space-y-8 relative z-10">
        <AnimatedComponent animation="fadeIn">
          <div className="text-center">
            <Link href="/" className="inline-flex items-center justify-center">
              <Leaf className="h-8 w-8 text-green-600 dark:text-green-400" />
            </Link>
            <h2 className="mt-4 text-3xl font-bold text-green-800 dark:text-green-300">Welcome Back</h2>
            <p className="mt-2 text-muted-foreground">
              Sign in to your GreenChain account
            </p>
          </div>
        </AnimatedComponent>
        
        <AnimatedComponent animation="slideUp" delay={0.1}>
          <div className="bg-white dark:bg-green-950/30 p-8 rounded-xl shadow-md">
            {formError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">
                {formError}
              </div>
            )}
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="your@email.com" 
                          {...field} 
                          className="bg-green-50/50 dark:bg-green-900/10 border-green-200 dark:border-green-800 focus:border-green-300 dark:focus:border-green-700" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="••••••••" 
                          {...field} 
                          className="bg-green-50/50 dark:bg-green-900/10 border-green-200 dark:border-green-800 focus:border-green-300 dark:focus:border-green-700" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="text-right">
                  <Link href="/forgot-password" className="text-sm text-green-600 dark:text-green-400 hover:underline">
                    Forgot your password?
                  </Link>
                </div>
                
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>
            </Form>
            
            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Dont have an account?</span>{' '}
              <Link href="/register" className="text-green-600 dark:text-green-400 hover:underline">
                Sign up
              </Link>
            </div>
          </div>
        </AnimatedComponent>
      </div>
    </div>
  );
}