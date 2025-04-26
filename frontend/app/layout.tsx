import { Inter } from 'next/font/google';
import { WagmiProvider } from '@/providers/WagmiProvider';
import { TopNavbar } from '@/components/TopNavbar';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'GreenChain',
  description: 'Sustainable blockchain solutions',
};

import { AuthProvider } from '@/hooks/useAuth';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={inter.className}>
          <WagmiProvider>
            <TopNavbar />
            <main className="pt-16">
              {children}
            </main>
          </WagmiProvider>
        </body>
      </html>
    </AuthProvider>
  );
}