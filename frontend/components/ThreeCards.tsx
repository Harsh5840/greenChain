'use client';

import { Leaf, ShieldCheck, Recycle } from 'lucide-react';
import AnimatedComponent from './AnimatedComponent';

export function ThreeCards() {
  const features = [
    {
      title: 'Complete Eco Tasks',
      description: 'Participate in activities that benefit the environment and earn GreenTokens as rewards.',
      icon: Leaf,
      delay: 0.1,
    },
    {
      title: 'Verified Impact',
      description: 'All eco-friendly activities are verified and recorded on the blockchain for transparency.',
      icon: ShieldCheck,
      delay: 0.2,
    },
    {
      title: 'Shop Sustainably',
      description: 'Use your earned tokens to purchase eco-friendly products from our marketplace.',
      icon: Recycle,
      delay: 0.3,
    },
  ];

  return (
    <div className="py-16 bg-gradient-to-b from-green-50 to-white dark:from-green-900/20 dark:to-background">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <AnimatedComponent animation="fadeIn">
            <h2 className="text-3xl font-bold text-green-800 dark:text-green-300 mb-3">How GreenChain Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join our community of eco-conscious individuals making a positive impact on the planet.
            </p>
          </AnimatedComponent>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <AnimatedComponent 
              key={index} 
              animation="slideUp" 
              delay={feature.delay}
              className="bg-white dark:bg-green-950/40 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-4 bg-green-100 dark:bg-green-800/30 inline-block rounded-full mb-4">
                <feature.icon className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-green-800 dark:text-green-300">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </AnimatedComponent>
          ))}
        </div>
      </div>
    </div>
  );
}