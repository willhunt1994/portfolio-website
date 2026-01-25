'use client';

import * as React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatisticsCardProps {
  icon: React.ReactNode;
  value: string;
  title: string;
  changePercentage: string;
  className?: string;
}

export default function StatisticsCard({
  icon,
  value,
  title,
  changePercentage,
  className,
}: StatisticsCardProps) {
  const isPositive = changePercentage.startsWith('+');

  return (
    <Card className={cn('p-6', className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            {icon}
            <span className="text-sm font-medium">{title}</span>
          </div>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        <div
          className={cn(
            'rounded-full px-2 py-1 text-xs font-medium',
            isPositive
              ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
              : 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
          )}
        >
          {changePercentage}
        </div>
      </div>
    </Card>
  );
}
