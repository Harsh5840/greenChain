'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedComponent from '@/components/AnimatedComponent';
import { ThreeCards } from '@/components/ThreeCards';

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-green-50 via-green-100 to-emerald-50 dark:from-green-950/30 dark:via-green-900/20 dark:to-emerald-950/30">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 bg-green-300 dark:bg-green-700/30 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-emerald-300 dark:bg-emerald-700/30 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-80 h-80 bg-teal-300 dark:bg-teal-700/30 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <AnimatedComponent
                animation="fadeIn"
                className="inline-block px-4 py-1.5 mb-6 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-sm font-medium"
              >
                <span className="flex items-center">
                  <Leaf className="h-4 w-4 mr-2" />
                  Sustainable Living Made Rewarding
                </span>
              </AnimatedComponent>
              
              <AnimatedComponent animation="slideUp" delay={0.1}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-green-900 dark:text-green-50 leading-tight mb-6">
                  Turn <span className="text-green-600 dark:text-green-400">Actions</span> into <span className="text-green-600 dark:text-green-400">Rewards</span>
                </h1>
              </AnimatedComponent>
              
              <AnimatedComponent animation="slideUp" delay={0.2}>
                <p className="text-lg text-muted-foreground mb-8 max-w-md">
                  Complete eco-friendly tasks, earn GreenTokens, and shop eco-products! Join our community of environmental champions.
                </p>
              </AnimatedComponent>
              
              <AnimatedComponent animation="slideUp" delay={0.3}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 text-white font-medium"
                  >
                    <Link href="/register">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-green-200 dark:border-green-800 hover:bg-green-50 dark:hover:bg-green-900/30"
                  >
                    <Link href="/about">Learn More</Link>
                  </Button>
                </div>
              </AnimatedComponent>
            </div>
            
            <AnimatedComponent animation="fadeIn" delay={0.3} className="hidden lg:block">
              <img
                src="https://images.pexels.com/photos/3768005/pexels-photo-3768005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Eco-friendly activities"
                className="rounded-xl shadow-xl max-w-full h-auto"
              />
            </AnimatedComponent>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <ThreeCards />

      {/* Statistics Section */}
      <section className="py-16 bg-white dark:bg-background">
        <div className="container mx-auto px-4">
          <AnimatedComponent animation="fadeIn">
            <h2 className="text-3xl font-bold text-center text-green-800 dark:text-green-300 mb-12">Making a Difference Together</h2>
          </AnimatedComponent>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '12K+', label: 'Active Users' },
              { value: '45K+', label: 'Tasks Completed' },
              { value: '230K+', label: 'GreenTokens Earned' },
              { value: '86+', label: 'Partner Brands' },
            ].map((stat, index) => (
              <AnimatedComponent 
                key={index}
                animation="slideUp"
                delay={0.1 * index}
                className="text-center p-6 rounded-lg bg-green-50 dark:bg-green-900/10"
              >
                <div className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400 mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </AnimatedComponent>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Eco-Products */}
      <section className="py-16 bg-gradient-to-b from-white to-green-50 dark:from-background dark:to-green-950/20">
        <div className="container mx-auto px-4">
          <AnimatedComponent animation="fadeIn">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-green-800 dark:text-green-300 mb-3">Featured Eco-Products</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover sustainable products available in our marketplace. Use your earned GreenTokens to make a purchase.
              </p>
            </div>
          </AnimatedComponent>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Bamboo Water Bottle',
                description: 'Eco-friendly water bottle made from sustainable bamboo material.',
                image: 'https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                price: '150'
              },
              {
                name: 'Recycled Backpack',
                description: 'Stylish backpack made from recycled plastic bottles.',
                image: 'https://images.pexels.com/photos/6173888/pexels-photo-6173888.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                price: '300'
              },
              {
                name: 'Solar Power Bank',
                description: 'Charge your devices using clean solar energy.',
                image: 'https://images.pexels.com/photos/6667360/pexels-photo-6667360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                price: '220'
              }
            ].map((product, index) => (
              <AnimatedComponent 
                key={index}
                animation="slideUp"
                delay={0.1 * index}
                className="bg-white dark:bg-green-950/30 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-green-800 dark:text-green-300">{product.name}</h3>
                  <p className="text-muted-foreground mb-4">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-green-600 dark:text-green-400 font-semibold">{product.price} GreenTokens</span>
                    <Button
                      asChild
                      variant="outline"
                      className="border-green-200 hover:bg-green-50 dark:border-green-800 dark:hover:bg-green-900/30"
                    >
                      <Link href="/marketplace">View Details</Link>
                    </Button>
                  </div>
                </div>
              </AnimatedComponent>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Button
              asChild
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Link href="/marketplace">
                Explore All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600 dark:bg-green-800">
        <div className="container mx-auto px-4 text-center">
          <AnimatedComponent animation="fadeIn">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Make a Difference?</h2>
            <p className="text-green-50 mb-8 max-w-2xl mx-auto">
              Join thousands of eco-conscious individuals who are making a positive impact on our planet while earning rewards.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-green-700 hover:bg-green-50"
            >
              <Link href="/register">
                Join GreenChain Today
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </AnimatedComponent>
        </div>
      </section>
    </div>
  );
}