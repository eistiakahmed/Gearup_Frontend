import React from 'react';
import Link from 'next/link';
import { PublicLayout } from '@/components/common/PublicLayout';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Compass, Home, SearchX } from 'lucide-react';

export const metadata = {
  title: '404 - Page Not Found | GearUp Sports Rental',
  description: 'The requested page could not be found.',
};

export default function NotFound() {
  return (
    <PublicLayout>
      <div className="min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 flex items-center justify-center p-6 relative overflow-hidden">
        {/* Glow background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-emerald-500/10 blur-[150px] pointer-events-none" />

        <div className="w-full max-w-lg z-10">
          <Card className="p-8 text-center border-slate-800 shadow-2xl">
            <CardContent className="flex flex-col items-center gap-6 p-0">
              <div className="p-4 rounded-3xl bg-slate-900 text-slate-400 border border-slate-800">
                <SearchX className="w-12 h-12 text-emerald-400" />
              </div>

              <div>
                <span className="text-4xl font-black text-emerald-400 block mb-1">404</span>
                <h1 className="text-2xl font-black text-slate-100 tracking-tight">
                  Page Not Found
                </h1>
                <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                  We couldn&apos;t find the page you were looking for. It may have been moved or no longer exists.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full mt-2">
                <Link href="/" className="w-full">
                  <Button variant="primary" size="md" fullWidth leftIcon={<Home className="w-4 h-4" />}>
                    Go to Home
                  </Button>
                </Link>
                <Link href="/gear" className="w-full">
                  <Button variant="outline" size="md" fullWidth leftIcon={<Compass className="w-4 h-4" />}>
                    Browse Gear Catalog
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PublicLayout>
  );
}
