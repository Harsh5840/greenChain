'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Leaf, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAccount, useConnect } from 'wagmi';
import { injected } from 'wagmi/connectors';

export function TopNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { isConnected, address } = useAccount();
  const { connect } = useConnect();

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Marketplace', href: '/marketplace' },
    { name: 'Profile', href: '/profile' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleConnectWallet = () => {
    connect({ connector: injected() });
  };

  return (
    <nav
      className={cn(
        'fixed w-full top-0 z-50 transition-all duration-300',
        isScrolled || pathname !== '/' || isOpen
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Leaf className="h-6 w-6 text-green-600 dark:text-green-400" />
              <span className="font-bold text-xl text-green-800 dark:text-green-300">GreenChain</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                    pathname === item.href
                      ? 'text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/30'
                      : 'text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400'
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {!isConnected ? (
              <Button
                onClick={handleConnectWallet}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Connect Wallet
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <div className="text-xs text-muted-foreground">
                  {address && `${address.slice(0, 6)}...${address.slice(-4)}`}
                </div>
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://api.dicebear.com/7.x/bottts/svg" alt="Avatar" />
                  <AvatarFallback className="bg-green-100 text-green-800">
                    {address ? address.slice(0, 2) : 'GC'}
                  </AvatarFallback>
                </Avatar>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white dark:bg-gray-900 border-b"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'block px-3 py-2 rounded-md text-base font-medium',
                  pathname === item.href
                    ? 'text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/30'
                    : 'text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400'
                )}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {!isConnected && (
              <Button
                onClick={handleConnectWallet}
                className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white"
              >
                Connect Wallet
              </Button>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
}