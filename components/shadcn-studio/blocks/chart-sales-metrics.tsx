'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface SalesMetricsCardProps {
  className?: string;
}

export default function SalesMetricsCard({
  className,
}: SalesMetricsCardProps) {
  // Mock data for the chart
  const chartData = [
    { month: 'Jan', value: 65 },
    { month: 'Feb', value: 78 },
    { month: 'Mar', value: 90 },
    { month: 'Apr', value: 81 },
    { month: 'May', value: 95 },
    { month: 'Jun', value: 88 },
  ];

  const maxValue = Math.max(...chartData.map((d) => d.value));

  return (
    <Card className={cn('flex flex-col', className)} data-slot="card">
      <CardHeader data-slot="card-header">
        <CardTitle>Sales Metrics</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col" data-slot="card-content">
        <div className="flex h-64 items-end justify-between gap-2">
          {chartData.map((item, index) => (
            <div key={index} className="flex flex-1 flex-col items-center gap-2">
              <div className="relative flex h-full w-full items-end">
                <div
                  className="w-full rounded-t bg-primary transition-all hover:opacity-80"
                  style={{
                    height: `${(item.value / maxValue) * 100}%`,
                  }}
                />
              </div>
              <span className="text-xs text-muted-foreground">
                {item.month}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between border-t pt-4">
          <div>
            <p className="text-sm text-muted-foreground">Total Sales</p>
            <p className="text-2xl font-bold">$45,231</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Growth</p>
            <p className="text-2xl font-bold text-green-600">+12.5%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
