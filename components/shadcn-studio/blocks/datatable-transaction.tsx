'use client';

import * as React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CheckCircle2Icon, ClockIcon, XCircleIcon, LoaderIcon } from 'lucide-react';

export interface Item {
  id: string;
  avatar: string;
  avatarFallback: string;
  name: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed' | 'processing';
  email: string;
  paidBy: 'mastercard' | 'visa';
}

interface TransactionDatatableProps {
  data: Item[];
}

const statusConfig = {
  paid: {
    icon: CheckCircle2Icon,
    label: 'Paid',
    className: 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400',
  },
  pending: {
    icon: ClockIcon,
    label: 'Pending',
    className: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400',
  },
  failed: {
    icon: XCircleIcon,
    label: 'Failed',
    className: 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400',
  },
  processing: {
    icon: LoaderIcon,
    label: 'Processing',
    className: 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400',
  },
};

export default function TransactionDatatable({
  data,
}: TransactionDatatableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Payment Method</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => {
            const status = statusConfig[item.status];
            const StatusIcon = status.icon;

            return (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="size-9">
                      <AvatarImage src={item.avatar} alt={item.name} />
                      <AvatarFallback>{item.avatarFallback}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{item.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {item.email}
                </TableCell>
                <TableCell className="font-medium">
                  ${item.amount.toFixed(2)}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={`flex w-fit items-center gap-1 ${status.className}`}
                  >
                    <StatusIcon className="size-3" />
                    {status.label}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {item.paidBy === 'mastercard' ? '💳 Mastercard' : '💳 Visa'}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
