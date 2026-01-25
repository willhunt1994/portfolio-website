'use client';

import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUpIcon, TrendingDownIcon } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface EarningData {
  img: string;
  platform: string;
  technologies: string;
  earnings: string;
  progressPercentage: number;
}

interface TotalEarningCardProps {
  title: string;
  earning: number;
  trend: 'up' | 'down';
  percentage: number;
  comparisonText: string;
  earningData: EarningData[];
  className?: string;
}

export default function TotalEarningCard({
  title,
  earning,
  trend,
  percentage,
  comparisonText,
  earningData,
  className,
}: TotalEarningCardProps) {
  return (
    <Card className={cn('flex flex-col', className)} data-slot="card">
      <CardContent className="flex flex-col" data-slot="card-content">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              {title}
            </p>
            <p className="text-2xl font-bold">${earning.toLocaleString()}</p>
          </div>
          <div
            className={cn(
              'flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium',
              trend === 'up'
                ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                : 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
            )}
          >
            {trend === 'up' ? (
              <TrendingUpIcon className="size-3" />
            ) : (
              <TrendingDownIcon className="size-3" />
            )}
            {percentage}%
          </div>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">{comparisonText}</p>
        <div className="mt-4 space-y-4">
          {earningData.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image
                    src={item.img}
                    alt={item.platform}
                    width={32}
                    height={32}
                    className="rounded"
                  />
                  <div>
                    <p className="text-sm font-medium">{item.platform}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.technologies}
                    </p>
                  </div>
                </div>
                <p className="text-sm font-medium">{item.earnings}</p>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${item.progressPercentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
