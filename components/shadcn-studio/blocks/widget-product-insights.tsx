'use client';

import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUpIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductInsightsCardProps {
  className?: string;
}

export default function ProductInsightsCard({
  className,
}: ProductInsightsCardProps) {
  return (
    <Card className={cn('flex flex-col', className)} data-slot="card">
      <CardContent className="flex flex-col" data-slot="card-content">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Product Insights
            </p>
            <p className="text-2xl font-bold">$12,450</p>
          </div>
          <div className="rounded-full bg-primary/10 p-3">
            <TrendingUpIcon className="size-5 text-primary" />
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Total Sales</span>
            <span className="font-medium">$8,234</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Revenue</span>
            <span className="font-medium">$4,216</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
