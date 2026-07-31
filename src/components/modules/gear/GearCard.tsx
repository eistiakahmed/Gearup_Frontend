'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GearItem } from '@/types/gear';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Dumbbell, MapPin, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';

export interface GearCardProps {
  gear: GearItem;
}

export function GearCard({ gear }: GearCardProps) {
  const [imageError, setImageError] = useState(false);

  const primaryImage =
    gear.images && gear.images.length > 0 && !imageError
      ? gear.images[0]
      : 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=600&q=80';

  return (
    <Card className="group flex flex-col h-full border-slate-200 bg-white hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-600/10 transition-all duration-300 overflow-hidden">
      {/* Image Header with Badge Overlay */}
      <div className="relative w-full h-48 bg-slate-100 overflow-hidden">
        <Image
          src={primaryImage}
          alt={gear.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          onError={() => setImageError(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-60" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          {gear.category?.name && (
            <Badge variant="primary" className="backdrop-blur-md bg-white/90 text-emerald-800 border-emerald-200">
              {gear.category.name}
            </Badge>
          )}

          {gear.isAvailable ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 backdrop-blur-md shadow-sm">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Available
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 border border-slate-200 backdrop-blur-md">
              <XCircle className="w-3 h-3" /> Rented Out
            </span>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Brand & Location */}
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span className="font-semibold uppercase tracking-wider text-emerald-700">
            {gear.brand}
          </span>
          {gear.location && (
            <span className="flex items-center gap-1 truncate max-w-[120px]">
              <MapPin className="w-3 h-3 shrink-0" /> {gear.location}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
          {gear.name}
        </h3>

        {/* Description snippet */}
        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
          {gear.description}
        </p>

        {/* Price & CTA Footer */}
        <div className="mt-auto pt-3 border-t border-slate-200 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 block">Rate</span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-black text-slate-900">${gear.dailyRate}</span>
              <span className="text-xs text-slate-500">/ day</span>
            </div>
          </div>

          <Link href={`/gear/${gear.id}`}>
            <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Rent Now
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
