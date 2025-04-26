'use client';

import Link from 'next/link';
import { Leaf, Twitter, Facebook, Instagram, Mail, Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-green-50 dark:bg-green-950/30 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Leaf className="h-6 w-6 text-green-600 dark:text-green-400" />
              <span className="font-bold text-xl text-green-800 dark:text-green-300">GreenChain</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Turn your eco-friendly actions into rewards. Join the community of environmentally conscious individuals making a difference.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-muted-foreground hover:text-green-600 dark:hover:text-green-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-green-600 dark:hover:text-green-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-green-600 dark:hover:text-green-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-green-600 dark:hover:text-green-400 transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-green-800 dark:text-green-300 mb-4">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-green-600 dark:hover:text-green-400 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/marketplace" className="text-muted-foreground hover:text-green-600 dark:hover:text-green-400 transition-colors">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link href="/tasks" className="text-muted-foreground hover:text-green-600 dark:hover:text-green-400 transition-colors">
                  Eco Tasks
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-muted-foreground hover:text-green-600 dark:hover:text-green-400 transition-colors">
                  Account
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-green-800 dark:text-green-300 mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-green-600 dark:hover:text-green-400 transition-colors">
                  About GreenChain
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-green-600 dark:hover:text-green-400 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-green-600 dark:hover:text-green-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/partners" className="text-muted-foreground hover:text-green-600 dark:hover:text-green-400 transition-colors">
                  Partners
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-green-800 dark:text-green-300 mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2">
                <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                <span className="text-muted-foreground">hello@greenchain.eco</span>
              </li>
              <li>
                <Link href="/support" className="text-muted-foreground hover:text-green-600 dark:hover:text-green-400 transition-colors">
                  Support
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-green-600 dark:hover:text-green-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-green-600 dark:hover:text-green-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-green-200 dark:border-green-900/50">
          <p className="text-center text-muted-foreground text-sm">
            © {new Date().getFullYear()} GreenChain. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}