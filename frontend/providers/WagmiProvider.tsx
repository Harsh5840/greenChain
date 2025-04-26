'use client';

import { ReactNode } from 'react';
import { WagmiProvider as Wagmi } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from '@/lib/wallet-config';

// Create a client
const queryClient = new QueryClient();

export function WagmiProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Wagmi config={config}>{children}</Wagmi>
    </QueryClientProvider>
  );
}