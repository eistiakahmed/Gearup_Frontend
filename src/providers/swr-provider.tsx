'use client';

import React from 'react';
import { SWRConfig } from 'swr';
import { defaultFetcher } from '@/lib/api-client';

export interface SWRProviderProps {
  children: React.ReactNode;
}

export function SWRProvider({ children }: SWRProviderProps) {
  return (
    <SWRConfig
      value={{
        fetcher: defaultFetcher,
        revalidateOnFocus: false,
        shouldRetryOnError: false,
      }}
    >
      {children}
    </SWRConfig>
  );
}
