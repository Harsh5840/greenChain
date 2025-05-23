'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Leaf } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAuth } from '@/hooks/useAuth';
import AnimatedComponent from '@/components/AnimatedComponent';

// 1. Updated schema: include walletAddress and validate it
const formSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
  walletAddress: z.string()
    .regex(/^0x[a-fA-F0-9]{40}$/, 'Please enter a valid Ethereum wallet address')
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export default function RegisterPage() {
  const { register, isLoading } = useAuth();
  const [formError, setFormError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      walletAddress: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setFormError(null);
    // Assuming your `register` accepts walletAddress as third parameter now
    const result = await register(values.email, values.password, values.walletAddress);
    if (!result) {
      setFormError('Registration failed. This email may already be in use.');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-green-100 to-emerald-50 dark:from-green-950/30 dark:via-green-900/20 dark:to-emerald-950/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-40 right-10 w-72 h-72 bg-emerald-300 dark:bg-emerald-700/30 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-40 left-10 w-64 h-64 bg-green-300 dark:bg-green-700/30 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        <AnimatedComponent animation="fadeIn">
          <div className="text-center">
            <Link href="/" className="inline-flex items-center justify-center">
              <Leaf className="h-8 w-8 text-green-600 dark:text-green-400" />
            </Link>
            <h2 className="mt-4 text-3xl font-bold text-green-800 dark:text-green-300">Create Account</h2>
            <p className="mt-2 text-muted-foreground">
              Join GreenChain and start your sustainability journey
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

                {/* Email */}
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

                {/* Password */}
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

                {/* Confirm Password */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
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

                {/* Wallet Address */}
                <FormField
                  control={form.control}
                  name="walletAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Wallet Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="0x..."
                          {...field}
                          className="bg-green-50/50 dark:bg-green-900/10 border-green-200 dark:border-green-800 focus:border-green-300 dark:focus:border-green-700"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Button>

              </form>
            </Form>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Already have an account?</span>{' '}
              <Link href="/login" className="text-green-600 dark:text-green-400 hover:underline">
                Sign in
              </Link>
            </div>
          </div>
        </AnimatedComponent>
      </div>
    </div>
  );
}
