'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled App Router Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-rose-500/10 blur-[130px] pointer-events-none" />

      <div className="w-full max-w-lg z-10 flex flex-col gap-6">
        <Alert variant="error" title="Something went wrong!">
          {error.message || 'An unexpected application error occurred while processing your request.'}
        </Alert>

        <div className="flex items-center justify-center gap-4">
          <Button variant="primary" size="md" onClick={() => reset()} leftIcon={<RefreshCw className="w-4 h-4" />}>
            Try Again
          </Button>
          <Link href="/">
            <Button variant="outline" size="md" leftIcon={<Home className="w-4 h-4" />}>
              Go to Home Page
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
