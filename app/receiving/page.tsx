'use client';

import Image from 'next/image';
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  SettingsIcon,
  UserIcon,
  SearchIcon,
  FilterIcon,
  LoaderIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  XIcon,
  PencilIcon,
  CheckIcon,
  PlusIcon,
  MinusIcon
} from 'lucide-react'

import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Sidebar,
  SidebarContent,
  SidebarProvider
} from '@/components/ui/sidebar'

interface Order {
  id: string;
  name: string;
  minutes: number;
  status: string;
  statusColor: string;
  dotColor: 'red' | 'green' | 'purple' | 'orange';
  deadline: Date;
  shelfLocation: string;
  vendor: 'ASC' | 'SSA' | 'SUPA' | 'INT ACT';
  fulfillmentStatus: 'Order Placed' | 'In Transit' | 'Received';
  jobId: string;
  orderStatus: 'Select an option' | 'In Production' | 'Ready to Ship' | 'Shipped' | 'Sold Out' | 'Gift Card' | 'With Wash Labeling' | 'Refunded' | 'Ready for Wash Labels' | 'Ready For Pickup' | 'Cancel' | 'open' | 'closed';
}

interface Product {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  shelfLocation: string;
  supplier?: 'ASC' | 'SSA' | 'SUPA' | 'INT ACT';
  customizationMethod?: string;
  splitOrderId?: string; // ID of the split order this product belongs to
}

interface PurchaseOrder {
  id: string;
  purchaseOrderNumber: string;
  supplier: 'ASC' | 'SSA' | 'SUPA' | 'INT ACT';
  status: 'Order Placed' | 'In Transit' | 'Received';
  expectedDate?: Date;
  receivedDate?: Date;
  totalItems: number;
  totalQuantity: number;
  splitOrderId?: string; // ID of the split order this purchase order belongs to
  productIds?: string[]; // Product IDs associated with this purchase order
}

interface LogoDetail {
  logo: string;
  logoSize: string;
  sku: string;
}

interface SizeDetail {
  size: string;
  quantity: number;
  logos: LogoDetail[];
}

interface Product {
  id: string;
  name: string;
  sizes?: SizeDetail[];
  images?: string[]; // Array of image URLs or identifiers
}

interface TimelineAssignment {
  orderId: string;
  startTimeSlot: number; // 0-17 (8am-5pm in 30-min increments)
  durationSlots: number; // Number of 30-min slots this order takes
  column: number; // Production line (0-4 for printers view)
  view: 'printers';
  date: Date; // The date this assignment is for
}

interface BookOutTime {
  id: string;
  productionLine: number; // 0-4 (Production Line 1-5)
  date: Date; // The date this book out is for
  startTimeSlot: number; // 0-17 (8am-5pm in 30-min increments)
  durationSlots: number; // Number of 30-min slots blocked
  reason: string; // e.g., "Day off", "Half day", "Training"
}


const INITIAL_LOAD = 20;
const LOAD_MORE = 20;

// Unique ID generator using random numbers
let orderCounter = 0;
const generateUniqueId = (): string => {
  const prefixes = ['ETH', 'F45', 'ORD', 'CST'];
  const prefix = prefixes[orderCounter % prefixes.length];
  const randomNum = Math.floor(Math.random() * 1000000);
  const timestamp = Date.now();
  orderCounter++;
  return `${prefix}${74500 + orderCounter}-${randomNum}-${timestamp}`;
};

// Sample job ID data for specific orders
const sampleJobIdData: Record<string, string> = {
  'ETH74501-87189': '60415',
  'F4574502-395127': '60415',
  'ORD74503-73173': '60415',
  'CST74504-209833': '60415',
  'ETH74505-908025': '60415',
  'F4574506-245444': '60415',
  'ORD74507-373485': '60415',
  'CST74508-825771': '60415',
  'ETH74509-153025': '60415'
};

// Generate job ID for purchase orders
const generateJobId = (orderId: string): string => {
  // Return 60415 for all orders
  return '60415';
};

type ColorFilter = 'red' | 'green' | 'purple' | 'orange';
type DeadlineFilter = 'overdue' | 'due-this-week' | 'due-next-week' | 'due-later';
type ShelfFilter = number; // 1-18
type VendorFilter = 'ASC' | 'SSA' | 'SUPA' | 'INT ACT';
type FulfillmentStatusFilter = 'Order Placed' | 'In Transit' | 'Received';

const ReceivingPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [colorFilters, setColorFilters] = useState<Set<ColorFilter>>(new Set());
  const [deadlineFilters, setDeadlineFilters] = useState<Set<DeadlineFilter>>(new Set());
  const [shelfFilters, setShelfFilters] = useState<Set<ShelfFilter>>(new Set());
  const [vendorFilters, setVendorFilters] = useState<Set<VendorFilter>>(new Set());
  const [fulfillmentStatusFilters, setFulfillmentStatusFilters] = useState<Set<FulfillmentStatusFilter>>(new Set());
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
  const [purchaseOrderStatusFilters, setPurchaseOrderStatusFilters] = useState<Set<'Order Placed' | 'In Transit' | 'Received'>>(new Set());
  const [purchaseOrderSupplierFilters, setPurchaseOrderSupplierFilters] = useState<Set<'ASC' | 'SSA' | 'SUPA' | 'INT ACT'>>(new Set());
  const [splitOrderProducts, setSplitOrderProducts] = useState<Map<string, Product[]>>(new Map()); // Map of splitOrderId -> products
  const [splitOrderPOs, setSplitOrderPOs] = useState<Map<string, PurchaseOrder[]>>(new Map()); // Map of splitOrderId -> purchase orders
  const [splitQuantities, setSplitQuantities] = useState<Map<string, Map<string, number>>>(new Map()); // Map of productId -> Map of splitOrderId -> quantity
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [productTableStatusDropdownOpen, setProductTableStatusDropdownOpen] = useState(false);
  const statusDropdownRef = useRef<HTMLDivElement>(null);
  const statusButtonRef = useRef<HTMLButtonElement>(null);
  const productTableStatusDropdownRef = useRef<HTMLDivElement>(null);
  const productTableStatusButtonRef = useRef<HTMLButtonElement>(null);
  const [showSplitModal, setShowSplitModal] = useState(false);
  const [splitModalProducts, setSplitModalProducts] = useState<Product[]>([]);
  const [mainOrderProductQuantities, setMainOrderProductQuantities] = useState<Map<string, number>>(new Map()); // Map of productId -> remaining quantity in main order
  const [selectedSplitOrders, setSelectedSplitOrders] = useState<Set<string>>(new Set()); // Selected split orders for merging
  
  // Purchase orders data - maps main order number to array of purchase orders
  const purchaseOrdersData: Record<string, PurchaseOrder[]> = {
    'ETH74501-510259': [
      {
        id: 'po-1',
        purchaseOrderNumber: 'PO-ASC-2024-001',
        supplier: 'ASC',
        status: 'In Transit',
        expectedDate: new Date(2024, 0, 25),
        totalItems: 3,
        totalQuantity: 125
      },
      {
        id: 'po-2',
        purchaseOrderNumber: 'PO-SSA-2024-042',
        supplier: 'SSA',
        status: 'Order Placed',
        expectedDate: new Date(2024, 0, 28),
        totalItems: 2,
        totalQuantity: 80
      },
      {
        id: 'po-3',
        purchaseOrderNumber: 'PO-SUPA-2024-089',
        supplier: 'SUPA',
        status: 'Received',
        expectedDate: new Date(2024, 0, 22),
        receivedDate: new Date(2024, 0, 22),
        totalItems: 4,
        totalQuantity: 150
      },
      {
        id: 'po-4',
        purchaseOrderNumber: 'PO-INTACT-2024-156',
        supplier: 'INT ACT',
        status: 'In Transit',
        expectedDate: new Date(2024, 0, 26),
        totalItems: 1,
        totalQuantity: 45
      },
      {
        id: 'po-5',
        purchaseOrderNumber: 'PO-ASC-2024-078',
        supplier: 'ASC',
        status: 'Received',
        expectedDate: new Date(2024, 0, 20),
        receivedDate: new Date(2024, 0, 21),
        totalItems: 5,
        totalQuantity: 200
      },
      {
        id: 'po-6',
        purchaseOrderNumber: 'PO-SSA-2024-103',
        supplier: 'SSA',
        status: 'In Transit',
        expectedDate: new Date(2024, 0, 27),
        totalItems: 3,
        totalQuantity: 95
      },
      {
        id: 'po-7',
        purchaseOrderNumber: 'PO-SUPA-2024-124',
        supplier: 'SUPA',
        status: 'Order Placed',
        expectedDate: new Date(2024, 1, 2),
        totalItems: 2,
        totalQuantity: 60
      },
      {
        id: 'po-8',
        purchaseOrderNumber: 'PO-INTACT-2024-189',
        supplier: 'INT ACT',
        status: 'Received',
        expectedDate: new Date(2024, 0, 19),
        receivedDate: new Date(2024, 0, 19),
        totalItems: 4,
        totalQuantity: 175
      },
      {
        id: 'po-9',
        purchaseOrderNumber: 'PO-ASC-2024-201',
        supplier: 'ASC',
        status: 'Order Placed',
        expectedDate: new Date(2024, 1, 5),
        totalItems: 6,
        totalQuantity: 240
      },
      {
        id: 'po-10',
        purchaseOrderNumber: 'PO-SSA-2024-215',
        supplier: 'SSA',
        status: 'In Transit',
        expectedDate: new Date(2024, 0, 29),
        totalItems: 2,
        totalQuantity: 70
      }
    ],
    'ORD74503-524726': [
      // First batch (1-10)
      {
        id: 'po-ord-1',
        purchaseOrderNumber: 'PO-ASC-2024-301',
        supplier: 'ASC',
        status: 'In Transit',
        expectedDate: new Date(2024, 0, 25),
        totalItems: 3,
        totalQuantity: 125
      },
      {
        id: 'po-ord-2',
        purchaseOrderNumber: 'PO-SSA-2024-342',
        supplier: 'SSA',
        status: 'Order Placed',
        expectedDate: new Date(2024, 0, 28),
        totalItems: 2,
        totalQuantity: 80
      },
      {
        id: 'po-ord-3',
        purchaseOrderNumber: 'PO-SUPA-2024-389',
        supplier: 'SUPA',
        status: 'Received',
        expectedDate: new Date(2024, 0, 22),
        receivedDate: new Date(2024, 0, 22),
        totalItems: 4,
        totalQuantity: 150
      },
      {
        id: 'po-ord-4',
        purchaseOrderNumber: 'PO-INTACT-2024-456',
        supplier: 'INT ACT',
        status: 'In Transit',
        expectedDate: new Date(2024, 0, 26),
        totalItems: 1,
        totalQuantity: 45
      },
      {
        id: 'po-ord-5',
        purchaseOrderNumber: 'PO-ASC-2024-478',
        supplier: 'ASC',
        status: 'Received',
        expectedDate: new Date(2024, 0, 20),
        receivedDate: new Date(2024, 0, 21),
        totalItems: 5,
        totalQuantity: 200
      },
      {
        id: 'po-ord-6',
        purchaseOrderNumber: 'PO-SSA-2024-503',
        supplier: 'SSA',
        status: 'In Transit',
        expectedDate: new Date(2024, 0, 27),
        totalItems: 3,
        totalQuantity: 95
      },
      {
        id: 'po-ord-7',
        purchaseOrderNumber: 'PO-SUPA-2024-524',
        supplier: 'SUPA',
        status: 'Order Placed',
        expectedDate: new Date(2024, 1, 2),
        totalItems: 2,
        totalQuantity: 60
      },
      {
        id: 'po-ord-8',
        purchaseOrderNumber: 'PO-INTACT-2024-589',
        supplier: 'INT ACT',
        status: 'Received',
        expectedDate: new Date(2024, 0, 19),
        receivedDate: new Date(2024, 0, 19),
        totalItems: 4,
        totalQuantity: 175
      },
      {
        id: 'po-ord-9',
        purchaseOrderNumber: 'PO-ASC-2024-601',
        supplier: 'ASC',
        status: 'Order Placed',
        expectedDate: new Date(2024, 1, 5),
        totalItems: 6,
        totalQuantity: 240
      },
      {
        id: 'po-ord-10',
        purchaseOrderNumber: 'PO-SSA-2024-615',
        supplier: 'SSA',
        status: 'In Transit',
        expectedDate: new Date(2024, 0, 29),
        totalItems: 2,
        totalQuantity: 70
      },
      // Second batch (11-20)
      {
        id: 'po-ord-11',
        purchaseOrderNumber: 'PO-SUPA-2024-678',
        supplier: 'SUPA',
        status: 'Received',
        expectedDate: new Date(2024, 0, 23),
        receivedDate: new Date(2024, 0, 24),
        totalItems: 3,
        totalQuantity: 110
      },
      {
        id: 'po-ord-12',
        purchaseOrderNumber: 'PO-INTACT-2024-712',
        supplier: 'INT ACT',
        status: 'Order Placed',
        expectedDate: new Date(2024, 1, 3),
        totalItems: 2,
        totalQuantity: 85
      },
      {
        id: 'po-ord-13',
        purchaseOrderNumber: 'PO-ASC-2024-745',
        supplier: 'ASC',
        status: 'In Transit',
        expectedDate: new Date(2024, 0, 30),
        totalItems: 4,
        totalQuantity: 160
      },
      {
        id: 'po-ord-14',
        purchaseOrderNumber: 'PO-SSA-2024-789',
        supplier: 'SSA',
        status: 'Received',
        expectedDate: new Date(2024, 0, 18),
        receivedDate: new Date(2024, 0, 18),
        totalItems: 5,
        totalQuantity: 195
      },
      {
        id: 'po-ord-15',
        purchaseOrderNumber: 'PO-SUPA-2024-812',
        supplier: 'SUPA',
        status: 'In Transit',
        expectedDate: new Date(2024, 1, 1),
        totalItems: 1,
        totalQuantity: 50
      },
      {
        id: 'po-ord-16',
        purchaseOrderNumber: 'PO-INTACT-2024-856',
        supplier: 'INT ACT',
        status: 'Order Placed',
        expectedDate: new Date(2024, 1, 6),
        totalItems: 3,
        totalQuantity: 120
      },
      {
        id: 'po-ord-17',
        purchaseOrderNumber: 'PO-ASC-2024-889',
        supplier: 'ASC',
        status: 'Received',
        expectedDate: new Date(2024, 0, 17),
        receivedDate: new Date(2024, 0, 17),
        totalItems: 6,
        totalQuantity: 250
      },
      {
        id: 'po-ord-18',
        purchaseOrderNumber: 'PO-SSA-2024-912',
        supplier: 'SSA',
        status: 'In Transit',
        expectedDate: new Date(2024, 0, 31),
        totalItems: 2,
        totalQuantity: 75
      },
      {
        id: 'po-ord-19',
        purchaseOrderNumber: 'PO-SUPA-2024-945',
        supplier: 'SUPA',
        status: 'Order Placed',
        expectedDate: new Date(2024, 1, 4),
        totalItems: 4,
        totalQuantity: 140
      },
      {
        id: 'po-ord-20',
        purchaseOrderNumber: 'PO-INTACT-2024-978',
        supplier: 'INT ACT',
        status: 'Received',
        expectedDate: new Date(2024, 0, 16),
        receivedDate: new Date(2024, 0, 16),
        totalItems: 2,
        totalQuantity: 65
      },
      // Third batch (21-30)
      {
        id: 'po-ord-21',
        purchaseOrderNumber: 'PO-ASC-2024-1001',
        supplier: 'ASC',
        status: 'In Transit',
        expectedDate: new Date(2024, 1, 2),
        totalItems: 3,
        totalQuantity: 130
      },
      {
        id: 'po-ord-22',
        purchaseOrderNumber: 'PO-SSA-2024-1034',
        supplier: 'SSA',
        status: 'Order Placed',
        expectedDate: new Date(2024, 1, 7),
        totalItems: 5,
        totalQuantity: 210
      },
      {
        id: 'po-ord-23',
        purchaseOrderNumber: 'PO-SUPA-2024-1067',
        supplier: 'SUPA',
        status: 'In Transit',
        expectedDate: new Date(2024, 1, 3),
        totalItems: 1,
        totalQuantity: 40
      },
      {
        id: 'po-ord-24',
        purchaseOrderNumber: 'PO-INTACT-2024-1100',
        supplier: 'INT ACT',
        status: 'Received',
        expectedDate: new Date(2024, 0, 15),
        receivedDate: new Date(2024, 0, 15),
        totalItems: 4,
        totalQuantity: 165
      },
      {
        id: 'po-ord-25',
        purchaseOrderNumber: 'PO-ASC-2024-1133',
        supplier: 'ASC',
        status: 'Order Placed',
        expectedDate: new Date(2024, 1, 8),
        totalItems: 6,
        totalQuantity: 230
      },
      {
        id: 'po-ord-26',
        purchaseOrderNumber: 'PO-SSA-2024-1166',
        supplier: 'SSA',
        status: 'In Transit',
        expectedDate: new Date(2024, 1, 4),
        totalItems: 2,
        totalQuantity: 90
      },
      {
        id: 'po-ord-27',
        purchaseOrderNumber: 'PO-SUPA-2024-1199',
        supplier: 'SUPA',
        status: 'Received',
        expectedDate: new Date(2024, 0, 14),
        receivedDate: new Date(2024, 0, 14),
        totalItems: 3,
        totalQuantity: 105
      },
      {
        id: 'po-ord-28',
        purchaseOrderNumber: 'PO-INTACT-2024-1232',
        supplier: 'INT ACT',
        status: 'Order Placed',
        expectedDate: new Date(2024, 1, 9),
        totalItems: 5,
        totalQuantity: 185
      },
      {
        id: 'po-ord-29',
        purchaseOrderNumber: 'PO-ASC-2024-1265',
        supplier: 'ASC',
        status: 'In Transit',
        expectedDate: new Date(2024, 1, 5),
        totalItems: 2,
        totalQuantity: 55
      },
      {
        id: 'po-ord-30',
        purchaseOrderNumber: 'PO-SSA-2024-1298',
        supplier: 'SSA',
        status: 'Received',
        expectedDate: new Date(2024, 0, 13),
        receivedDate: new Date(2024, 0, 13),
        totalItems: 4,
        totalQuantity: 155
      },
      // Fourth batch (31-40)
      {
        id: 'po-ord-31',
        purchaseOrderNumber: 'PO-SUPA-2024-1331',
        supplier: 'SUPA',
        status: 'In Transit',
        expectedDate: new Date(2024, 1, 6),
        totalItems: 1,
        totalQuantity: 35
      },
      {
        id: 'po-ord-32',
        purchaseOrderNumber: 'PO-INTACT-2024-1364',
        supplier: 'INT ACT',
        status: 'Order Placed',
        expectedDate: new Date(2024, 1, 10),
        totalItems: 3,
        totalQuantity: 115
      },
      {
        id: 'po-ord-33',
        purchaseOrderNumber: 'PO-ASC-2024-1397',
        supplier: 'ASC',
        status: 'Received',
        expectedDate: new Date(2024, 0, 12),
        receivedDate: new Date(2024, 0, 12),
        totalItems: 6,
        totalQuantity: 245
      },
      {
        id: 'po-ord-34',
        purchaseOrderNumber: 'PO-SSA-2024-1430',
        supplier: 'SSA',
        status: 'In Transit',
        expectedDate: new Date(2024, 1, 7),
        totalItems: 2,
        totalQuantity: 100
      },
      {
        id: 'po-ord-35',
        purchaseOrderNumber: 'PO-SUPA-2024-1463',
        supplier: 'SUPA',
        status: 'Order Placed',
        expectedDate: new Date(2024, 1, 11),
        totalItems: 4,
        totalQuantity: 170
      },
      {
        id: 'po-ord-36',
        purchaseOrderNumber: 'PO-INTACT-2024-1496',
        supplier: 'INT ACT',
        status: 'Received',
        expectedDate: new Date(2024, 0, 11),
        receivedDate: new Date(2024, 0, 11),
        totalItems: 5,
        totalQuantity: 205
      },
      {
        id: 'po-ord-37',
        purchaseOrderNumber: 'PO-ASC-2024-1529',
        supplier: 'ASC',
        status: 'In Transit',
        expectedDate: new Date(2024, 1, 8),
        totalItems: 3,
        totalQuantity: 135
      },
      {
        id: 'po-ord-38',
        purchaseOrderNumber: 'PO-SSA-2024-1562',
        supplier: 'SSA',
        status: 'Order Placed',
        expectedDate: new Date(2024, 1, 12),
        totalItems: 2,
        totalQuantity: 80
      },
      {
        id: 'po-ord-39',
        purchaseOrderNumber: 'PO-SUPA-2024-1595',
        supplier: 'SUPA',
        status: 'Received',
        expectedDate: new Date(2024, 0, 10),
        receivedDate: new Date(2024, 0, 10),
        totalItems: 1,
        totalQuantity: 30
      },
      {
        id: 'po-ord-40',
        purchaseOrderNumber: 'PO-INTACT-2024-1628',
        supplier: 'INT ACT',
        status: 'In Transit',
        expectedDate: new Date(2024, 1, 9),
        totalItems: 4,
        totalQuantity: 180
      }
    ],
    'ETH74501-644073': [
      {
        id: 'po-eth-1',
        purchaseOrderNumber: 'PO-ASC-2024-1701',
        supplier: 'ASC',
        status: 'In Transit',
        expectedDate: new Date(2024, 0, 24),
        totalItems: 4,
        totalQuantity: 160
      },
      {
        id: 'po-eth-2',
        purchaseOrderNumber: 'PO-SSA-2024-1734',
        supplier: 'SSA',
        status: 'Order Placed',
        expectedDate: new Date(2024, 0, 30),
        totalItems: 3,
        totalQuantity: 110
      },
      {
        id: 'po-eth-3',
        purchaseOrderNumber: 'PO-SUPA-2024-1767',
        supplier: 'SUPA',
        status: 'Received',
        expectedDate: new Date(2024, 0, 21),
        receivedDate: new Date(2024, 0, 21),
        totalItems: 5,
        totalQuantity: 195
      },
      {
        id: 'po-eth-4',
        purchaseOrderNumber: 'PO-INTACT-2024-1800',
        supplier: 'INT ACT',
        status: 'In Transit',
        expectedDate: new Date(2024, 0, 27),
        totalItems: 2,
        totalQuantity: 75
      },
      {
        id: 'po-eth-5',
        purchaseOrderNumber: 'PO-ASC-2024-1833',
        supplier: 'ASC',
        status: 'Received',
        expectedDate: new Date(2024, 0, 19),
        receivedDate: new Date(2024, 0, 20),
        totalItems: 6,
        totalQuantity: 245
      },
      {
        id: 'po-eth-6',
        purchaseOrderNumber: 'PO-SSA-2024-1866',
        supplier: 'SSA',
        status: 'Order Placed',
        expectedDate: new Date(2024, 1, 1),
        totalItems: 1,
        totalQuantity: 50
      },
      {
        id: 'po-eth-7',
        purchaseOrderNumber: 'PO-SUPA-2024-1899',
        supplier: 'SUPA',
        status: 'In Transit',
        expectedDate: new Date(2024, 0, 28),
        totalItems: 4,
        totalQuantity: 140
      },
      {
        id: 'po-eth-8',
        purchaseOrderNumber: 'PO-INTACT-2024-1932',
        supplier: 'INT ACT',
        status: 'Received',
        expectedDate: new Date(2024, 0, 18),
        receivedDate: new Date(2024, 0, 18),
        totalItems: 3,
        totalQuantity: 120
      },
      {
        id: 'po-eth-9',
        purchaseOrderNumber: 'PO-ASC-2024-1965',
        supplier: 'ASC',
        status: 'Order Placed',
        expectedDate: new Date(2024, 1, 3),
        totalItems: 2,
        totalQuantity: 85
      },
      {
        id: 'po-eth-10',
        purchaseOrderNumber: 'PO-SSA-2024-1998',
        supplier: 'SSA',
        status: 'In Transit',
        expectedDate: new Date(2024, 0, 29),
        totalItems: 5,
        totalQuantity: 205
      },
      {
        id: 'po-eth-11',
        purchaseOrderNumber: 'PO-SUPA-2024-2031',
        supplier: 'SUPA',
        status: 'Received',
        expectedDate: new Date(2024, 0, 17),
        receivedDate: new Date(2024, 0, 17),
        totalItems: 1,
        totalQuantity: 40
      },
      {
        id: 'po-eth-12',
        purchaseOrderNumber: 'PO-INTACT-2024-2064',
        supplier: 'INT ACT',
        status: 'Order Placed',
        expectedDate: new Date(2024, 1, 4),
        totalItems: 4,
        totalQuantity: 165
      }
    ],
    'ETH74501-495386': [
      {
        id: 'po-eth495-1',
        purchaseOrderNumber: 'PO-ASC-2024-2097',
        supplier: 'ASC',
        status: 'Received',
        expectedDate: new Date(2024, 0, 15),
        receivedDate: new Date(2024, 0, 16),
        totalItems: 3,
        totalQuantity: 115
      },
      {
        id: 'po-eth495-2',
        purchaseOrderNumber: 'PO-SSA-2024-2130',
        supplier: 'SSA',
        status: 'In Transit',
        expectedDate: new Date(2024, 0, 26),
        totalItems: 5,
        totalQuantity: 190
      },
      {
        id: 'po-eth495-3',
        purchaseOrderNumber: 'PO-SUPA-2024-2163',
        supplier: 'SUPA',
        status: 'Order Placed',
        expectedDate: new Date(2024, 1, 2),
        totalItems: 2,
        totalQuantity: 65
      },
      {
        id: 'po-eth495-4',
        purchaseOrderNumber: 'PO-INTACT-2024-2196',
        supplier: 'INT ACT',
        status: 'Received',
        expectedDate: new Date(2024, 0, 14),
        receivedDate: new Date(2024, 0, 14),
        totalItems: 4,
        totalQuantity: 155
      },
      {
        id: 'po-eth495-5',
        purchaseOrderNumber: 'PO-ASC-2024-2229',
        supplier: 'ASC',
        status: 'In Transit',
        expectedDate: new Date(2024, 0, 25),
        totalItems: 6,
        totalQuantity: 235
      },
      {
        id: 'po-eth495-6',
        purchaseOrderNumber: 'PO-SSA-2024-2262',
        supplier: 'SSA',
        status: 'Order Placed',
        expectedDate: new Date(2024, 1, 5),
        totalItems: 1,
        totalQuantity: 45
      },
      {
        id: 'po-eth495-7',
        purchaseOrderNumber: 'PO-SUPA-2024-2295',
        supplier: 'SUPA',
        status: 'Received',
        expectedDate: new Date(2024, 0, 13),
        receivedDate: new Date(2024, 0, 13),
        totalItems: 3,
        totalQuantity: 105
      },
      {
        id: 'po-eth495-8',
        purchaseOrderNumber: 'PO-INTACT-2024-2328',
        supplier: 'INT ACT',
        status: 'In Transit',
        expectedDate: new Date(2024, 0, 24),
        totalItems: 2,
        totalQuantity: 80
      },
      {
        id: 'po-eth495-9',
        purchaseOrderNumber: 'PO-ASC-2024-2361',
        supplier: 'ASC',
        status: 'Order Placed',
        expectedDate: new Date(2024, 1, 6),
        totalItems: 5,
        totalQuantity: 200
      },
      {
        id: 'po-eth495-10',
        purchaseOrderNumber: 'PO-SSA-2024-2394',
        supplier: 'SSA',
        status: 'Received',
        expectedDate: new Date(2024, 0, 12),
        receivedDate: new Date(2024, 0, 12),
        totalItems: 4,
        totalQuantity: 150
      },
      {
        id: 'po-eth495-11',
        purchaseOrderNumber: 'PO-SUPA-2024-2427',
        supplier: 'SUPA',
        status: 'In Transit',
        expectedDate: new Date(2024, 0, 23),
        totalItems: 1,
        totalQuantity: 35
      },
      {
        id: 'po-eth495-12',
        purchaseOrderNumber: 'PO-INTACT-2024-2460',
        supplier: 'INT ACT',
        status: 'Order Placed',
        expectedDate: new Date(2024, 1, 7),
        totalItems: 3,
        totalQuantity: 125
      }
    ],
    'ETH74501-423733': [
      {
        id: 'po-eth423-1',
        purchaseOrderNumber: 'PO-ASC-2024-2493',
        supplier: 'ASC',
        status: 'In Transit',
        expectedDate: new Date(2024, 0, 31),
        totalItems: 4,
        totalQuantity: 170
      },
      {
        id: 'po-eth423-2',
        purchaseOrderNumber: 'PO-SSA-2024-2526',
        supplier: 'SSA',
        status: 'Received',
        expectedDate: new Date(2024, 0, 11),
        receivedDate: new Date(2024, 0, 11),
        totalItems: 2,
        totalQuantity: 90
      },
      {
        id: 'po-eth423-3',
        purchaseOrderNumber: 'PO-SUPA-2024-2559',
        supplier: 'SUPA',
        status: 'Order Placed',
        expectedDate: new Date(2024, 1, 8),
        totalItems: 5,
        totalQuantity: 215
      },
      {
        id: 'po-eth423-4',
        purchaseOrderNumber: 'PO-INTACT-2024-2592',
        supplier: 'INT ACT',
        status: 'In Transit',
        expectedDate: new Date(2024, 1, 1),
        totalItems: 3,
        totalQuantity: 130
      },
      {
        id: 'po-eth423-5',
        purchaseOrderNumber: 'PO-ASC-2024-2625',
        supplier: 'ASC',
        status: 'Received',
        expectedDate: new Date(2024, 0, 10),
        receivedDate: new Date(2024, 0, 10),
        totalItems: 6,
        totalQuantity: 255
      },
      {
        id: 'po-eth423-6',
        purchaseOrderNumber: 'PO-SSA-2024-2658',
        supplier: 'SSA',
        status: 'Order Placed',
        expectedDate: new Date(2024, 1, 9),
        totalItems: 1,
        totalQuantity: 55
      },
      {
        id: 'po-eth423-7',
        purchaseOrderNumber: 'PO-SUPA-2024-2691',
        supplier: 'SUPA',
        status: 'In Transit',
        expectedDate: new Date(2024, 1, 2),
        totalItems: 4,
        totalQuantity: 175
      },
      {
        id: 'po-eth423-8',
        purchaseOrderNumber: 'PO-INTACT-2024-2724',
        supplier: 'INT ACT',
        status: 'Received',
        expectedDate: new Date(2024, 0, 9),
        receivedDate: new Date(2024, 0, 9),
        totalItems: 2,
        totalQuantity: 70
      },
      {
        id: 'po-eth423-9',
        purchaseOrderNumber: 'PO-ASC-2024-2757',
        supplier: 'ASC',
        status: 'Order Placed',
        expectedDate: new Date(2024, 1, 10),
        totalItems: 3,
        totalQuantity: 145
      },
      {
        id: 'po-eth423-10',
        purchaseOrderNumber: 'PO-SSA-2024-2790',
        supplier: 'SSA',
        status: 'In Transit',
        expectedDate: new Date(2024, 1, 3),
        totalItems: 5,
        totalQuantity: 220
      },
      {
        id: 'po-eth423-11',
        purchaseOrderNumber: 'PO-SUPA-2024-2823',
        supplier: 'SUPA',
        status: 'Received',
        expectedDate: new Date(2024, 0, 8),
        receivedDate: new Date(2024, 0, 8),
        totalItems: 1,
        totalQuantity: 42
      },
      {
        id: 'po-eth423-12',
        purchaseOrderNumber: 'PO-INTACT-2024-2856',
        supplier: 'INT ACT',
        status: 'Order Placed',
        expectedDate: new Date(2024, 1, 11),
        totalItems: 4,
        totalQuantity: 185
      },
      {
        id: 'po-eth423-13',
        purchaseOrderNumber: 'PO-ASC-2024-2889',
        supplier: 'ASC',
        status: 'In Transit',
        expectedDate: new Date(2024, 1, 4),
        totalItems: 2,
        totalQuantity: 95
      },
      {
        id: 'po-eth423-14',
        purchaseOrderNumber: 'PO-SSA-2024-2922',
        supplier: 'SSA',
        status: 'Received',
        expectedDate: new Date(2024, 0, 7),
        receivedDate: new Date(2024, 0, 7),
        totalItems: 6,
        totalQuantity: 265
      }
    ],
    'ETH74521-687121': [
      {
        id: 'po-eth687-1',
        purchaseOrderNumber: 'PO-ASC-2024-2955',
        supplier: 'ASC',
        status: 'Order Placed',
        expectedDate: new Date(2024, 1, 12),
        totalItems: 3,
        totalQuantity: 135
      },
      {
        id: 'po-eth687-2',
        purchaseOrderNumber: 'PO-SSA-2024-2988',
        supplier: 'SSA',
        status: 'In Transit',
        expectedDate: new Date(2024, 1, 5),
        totalItems: 5,
        totalQuantity: 210
      },
      {
        id: 'po-eth687-3',
        purchaseOrderNumber: 'PO-SUPA-2024-3021',
        supplier: 'SUPA',
        status: 'Received',
        expectedDate: new Date(2024, 0, 6),
        receivedDate: new Date(2024, 0, 6),
        totalItems: 2,
        totalQuantity: 88
      },
      {
        id: 'po-eth687-4',
        purchaseOrderNumber: 'PO-INTACT-2024-3054',
        supplier: 'INT ACT',
        status: 'Order Placed',
        expectedDate: new Date(2024, 1, 13),
        totalItems: 4,
        totalQuantity: 190
      },
      {
        id: 'po-eth687-5',
        purchaseOrderNumber: 'PO-ASC-2024-3087',
        supplier: 'ASC',
        status: 'In Transit',
        expectedDate: new Date(2024, 1, 6),
        totalItems: 1,
        totalQuantity: 48
      },
      {
        id: 'po-eth687-6',
        purchaseOrderNumber: 'PO-SSA-2024-3120',
        supplier: 'SSA',
        status: 'Received',
        expectedDate: new Date(2024, 0, 5),
        receivedDate: new Date(2024, 0, 5),
        totalItems: 6,
        totalQuantity: 275
      },
      {
        id: 'po-eth687-7',
        purchaseOrderNumber: 'PO-SUPA-2024-3153',
        supplier: 'SUPA',
        status: 'Order Placed',
        expectedDate: new Date(2024, 1, 14),
        totalItems: 3,
        totalQuantity: 155
      },
      {
        id: 'po-eth687-8',
        purchaseOrderNumber: 'PO-INTACT-2024-3186',
        supplier: 'INT ACT',
        status: 'In Transit',
        expectedDate: new Date(2024, 1, 7),
        totalItems: 2,
        totalQuantity: 102
      },
      {
        id: 'po-eth687-9',
        purchaseOrderNumber: 'PO-ASC-2024-3219',
        supplier: 'ASC',
        status: 'Received',
        expectedDate: new Date(2024, 0, 4),
        receivedDate: new Date(2024, 0, 4),
        totalItems: 5,
        totalQuantity: 225
      },
      {
        id: 'po-eth687-10',
        purchaseOrderNumber: 'PO-SSA-2024-3252',
        supplier: 'SSA',
        status: 'Order Placed',
        expectedDate: new Date(2024, 1, 15),
        totalItems: 4,
        totalQuantity: 168
      },
      {
        id: 'po-eth687-11',
        purchaseOrderNumber: 'PO-SUPA-2024-3285',
        supplier: 'SUPA',
        status: 'In Transit',
        expectedDate: new Date(2024, 1, 8),
        totalItems: 1,
        totalQuantity: 38
      },
      {
        id: 'po-eth687-12',
        purchaseOrderNumber: 'PO-INTACT-2024-3318',
        supplier: 'INT ACT',
        status: 'Received',
        expectedDate: new Date(2024, 0, 3),
        receivedDate: new Date(2024, 0, 3),
        totalItems: 3,
        totalQuantity: 142
      },
      {
        id: 'po-eth687-13',
        purchaseOrderNumber: 'PO-ASC-2024-3351',
        supplier: 'ASC',
        status: 'Order Placed',
        expectedDate: new Date(2024, 1, 16),
        totalItems: 6,
        totalQuantity: 280
      },
      {
        id: 'po-eth687-14',
        purchaseOrderNumber: 'PO-SSA-2024-3384',
        supplier: 'SSA',
        status: 'In Transit',
        expectedDate: new Date(2024, 1, 9),
        totalItems: 2,
        totalQuantity: 76
      },
      {
        id: 'po-eth687-15',
        purchaseOrderNumber: 'PO-SUPA-2024-3417',
        supplier: 'SUPA',
        status: 'Received',
        expectedDate: new Date(2024, 0, 2),
        receivedDate: new Date(2024, 0, 2),
        totalItems: 4,
        totalQuantity: 198
      }
    ],
    'ETH74521': [
      {
        id: 'po-eth74521-1',
        purchaseOrderNumber: 'PO-ASC-2024-3450',
        supplier: 'ASC',
        status: 'In Transit',
        expectedDate: new Date(2024, 1, 10),
        totalItems: 4,
        totalQuantity: 180
      },
      {
        id: 'po-eth74521-2',
        purchaseOrderNumber: 'PO-SSA-2024-3483',
        supplier: 'SSA',
        status: 'Order Placed',
        expectedDate: new Date(2024, 1, 17),
        totalItems: 2,
        totalQuantity: 92
      },
      {
        id: 'po-eth74521-3',
        purchaseOrderNumber: 'PO-SUPA-2024-3516',
        supplier: 'SUPA',
        status: 'Received',
        expectedDate: new Date(2024, 0, 1),
        receivedDate: new Date(2024, 0, 1),
        totalItems: 5,
        totalQuantity: 230
      },
      {
        id: 'po-eth74521-4',
        purchaseOrderNumber: 'PO-INTACT-2024-3549',
        supplier: 'INT ACT',
        status: 'In Transit',
        expectedDate: new Date(2024, 1, 11),
        totalItems: 3,
        totalQuantity: 148
      },
      {
        id: 'po-eth74521-5',
        purchaseOrderNumber: 'PO-ASC-2024-3582',
        supplier: 'ASC',
        status: 'Order Placed',
        expectedDate: new Date(2024, 1, 18),
        totalItems: 6,
        totalQuantity: 290
      },
      {
        id: 'po-eth74521-6',
        purchaseOrderNumber: 'PO-SSA-2024-3615',
        supplier: 'SSA',
        status: 'Received',
        expectedDate: new Date(2023, 11, 31),
        receivedDate: new Date(2023, 11, 31),
        totalItems: 1,
        totalQuantity: 52
      },
      {
        id: 'po-eth74521-7',
        purchaseOrderNumber: 'PO-SUPA-2024-3648',
        supplier: 'SUPA',
        status: 'In Transit',
        expectedDate: new Date(2024, 1, 12),
        totalItems: 4,
        totalQuantity: 192
      },
      {
        id: 'po-eth74521-8',
        purchaseOrderNumber: 'PO-INTACT-2024-3681',
        supplier: 'INT ACT',
        status: 'Order Placed',
        expectedDate: new Date(2024, 1, 19),
        totalItems: 2,
        totalQuantity: 108
      },
      {
        id: 'po-eth74521-9',
        purchaseOrderNumber: 'PO-ASC-2024-3714',
        supplier: 'ASC',
        status: 'Received',
        expectedDate: new Date(2023, 11, 30),
        receivedDate: new Date(2023, 11, 30),
        totalItems: 5,
        totalQuantity: 245
      },
      {
        id: 'po-eth74521-10',
        purchaseOrderNumber: 'PO-SSA-2024-3747',
        supplier: 'SSA',
        status: 'In Transit',
        expectedDate: new Date(2024, 1, 13),
        totalItems: 3,
        totalQuantity: 162
      }
    ],
    'ETH74501': [
      {
        id: 'po-eth74501-base-1',
        purchaseOrderNumber: 'PO-ASC-2024-3800',
        supplier: 'ASC',
        status: 'In Transit',
        expectedDate: new Date(2024, 1, 14),
        totalItems: 4,
        totalQuantity: 185
      },
      {
        id: 'po-eth74501-base-2',
        purchaseOrderNumber: 'PO-SSA-2024-3833',
        supplier: 'SSA',
        status: 'Order Placed',
        expectedDate: new Date(2024, 1, 20),
        totalItems: 2,
        totalQuantity: 88
      },
      {
        id: 'po-eth74501-base-3',
        purchaseOrderNumber: 'PO-SUPA-2024-3866',
        supplier: 'SUPA',
        status: 'Received',
        expectedDate: new Date(2024, 0, 31),
        receivedDate: new Date(2024, 1, 1),
        totalItems: 5,
        totalQuantity: 225
      },
      {
        id: 'po-eth74501-base-4',
        purchaseOrderNumber: 'PO-INTACT-2024-3899',
        supplier: 'INT ACT',
        status: 'In Transit',
        expectedDate: new Date(2024, 1, 15),
        totalItems: 3,
        totalQuantity: 142
      },
      {
        id: 'po-eth74501-base-5',
        purchaseOrderNumber: 'PO-ASC-2024-3932',
        supplier: 'ASC',
        status: 'Received',
        expectedDate: new Date(2024, 0, 30),
        receivedDate: new Date(2024, 0, 30),
        totalItems: 6,
        totalQuantity: 275
      },
      {
        id: 'po-eth74501-base-6',
        purchaseOrderNumber: 'PO-SSA-2024-3965',
        supplier: 'SSA',
        status: 'Order Placed',
        expectedDate: new Date(2024, 1, 21),
        totalItems: 1,
        totalQuantity: 52
      },
      {
        id: 'po-eth74501-base-7',
        purchaseOrderNumber: 'PO-SUPA-2024-3998',
        supplier: 'SUPA',
        status: 'In Transit',
        expectedDate: new Date(2024, 1, 16),
        totalItems: 4,
        totalQuantity: 198
      },
      {
        id: 'po-eth74501-base-8',
        purchaseOrderNumber: 'PO-INTACT-2024-4031',
        supplier: 'INT ACT',
        status: 'Received',
        expectedDate: new Date(2024, 0, 29),
        receivedDate: new Date(2024, 0, 29),
        totalItems: 2,
        totalQuantity: 95
      },
      {
        id: 'po-eth74501-base-9',
        purchaseOrderNumber: 'PO-ASC-2024-4064',
        supplier: 'ASC',
        status: 'Order Placed',
        expectedDate: new Date(2024, 1, 22),
        totalItems: 5,
        totalQuantity: 245
      },
      {
        id: 'po-eth74501-base-10',
        purchaseOrderNumber: 'PO-SSA-2024-4097',
        supplier: 'SSA',
        status: 'In Transit',
        expectedDate: new Date(2024, 1, 17),
        totalItems: 3,
        totalQuantity: 135
      },
      {
        id: 'po-eth74501-base-11',
        purchaseOrderNumber: 'PO-SUPA-2024-4130',
        supplier: 'SUPA',
        status: 'Received',
        expectedDate: new Date(2024, 0, 28),
        receivedDate: new Date(2024, 0, 28),
        totalItems: 1,
        totalQuantity: 48
      },
      {
        id: 'po-eth74501-base-12',
        purchaseOrderNumber: 'PO-INTACT-2024-4163',
        supplier: 'INT ACT',
        status: 'Order Placed',
        expectedDate: new Date(2024, 1, 23),
        totalItems: 4,
        totalQuantity: 175
      }
    ]
  };
  // Helper function to get dot color based on status
  // red = no product or artwork
  // purple = no product but yes artwork
  // orange = product yes but no artwork
  // green = both delivered and the order is ready for production
  const getDotColorByRatio = (index: number): 'red' | 'green' | 'purple' | 'orange' => {
    const position = index % 20; // Distribute across 20 for variety
    if (position < 5) return 'red'; // 25% - no product or artwork
    if (position < 10) return 'purple'; // 25% - no product but yes artwork
    if (position < 15) return 'orange'; // 25% - product yes but no artwork
    return 'green'; // 25% - both delivered, ready for production
  };

  // Helper function to generate a random deadline (within next 60 days)
  const generateDeadline = (): Date => {
    const today = new Date();
    const daysToAdd = Math.floor(Math.random() * 60) + 1; // 1-60 days from now
    const deadline = new Date(today);
    deadline.setDate(today.getDate() + daysToAdd);
    return deadline;
  };

  // Helper function to format deadline as "Feb 28th"
  const formatDeadline = (date: Date): string => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day = date.getDate();
    const month = months[date.getMonth()];
    
    // Add ordinal suffix
    let suffix = 'th';
    if (day === 1 || day === 21 || day === 31) suffix = 'st';
    else if (day === 2 || day === 22) suffix = 'nd';
    else if (day === 3 || day === 23) suffix = 'rd';
    
    return `${month} ${day}${suffix}`;
  };

  // Helper function to format assignment date and time
  const formatAssignmentDateTime = (assignment: TimelineAssignment): string => {
    const date = new Date(assignment.date);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    const dayOfWeek = daysOfWeek[date.getDay()];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    
    // Calculate time from startTimeSlot (0-17, where 0 = 8am, 17 = 5pm)
    const hour = 8 + Math.floor(assignment.startTimeSlot / 2);
    const minutes = (assignment.startTimeSlot % 2) * 30;
    const isAM = hour < 12;
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    const timeStr = minutes === 0 
      ? `${displayHour}${isAM ? 'am' : 'pm'}`
      : `${displayHour}:${minutes.toString().padStart(2, '0')}${isAM ? 'am' : 'pm'}`;
    
    return `${dayOfWeek}, ${month} ${day}, ${year} at ${timeStr}`;
  };

  // Helper function to generate shelf location (1-18, A-T)
  const generateShelfLocation = (): string => {
    const shelfNumber = Math.floor(Math.random() * 18) + 1; // 1-18
    const positionLetter = String.fromCharCode(65 + Math.floor(Math.random() * 20)); // A-T (65-84)
    return `${shelfNumber}${positionLetter}`;
  };

  // Helper function to generate random vendor
  const generateVendor = (): 'ASC' | 'SSA' | 'SUPA' | 'INT ACT' => {
    const vendors: ('ASC' | 'SSA' | 'SUPA' | 'INT ACT')[] = ['ASC', 'SSA', 'SUPA', 'INT ACT'];
    return vendors[Math.floor(Math.random() * vendors.length)];
  };

  // Sample fulfillment status data for specific orders
  const sampleFulfillmentData: Record<string, 'Order Placed' | 'In Transit' | 'Received'> = {
    'ETH74501-87189': 'In Transit',
    'F4574502-395127': 'Order Placed',
    'ORD74503-73173': 'Received',
    'CST74504-209833': 'In Transit',
    'ETH74505-908025': 'Order Placed',
    'F4574506-245444': 'Received',
    'ORD74507-373485': 'In Transit',
    'CST74508-825771': 'Order Placed',
    'ETH74509-153025': 'Received'
  };

  // Helper function to generate fulfillment status (use sample data if available, otherwise random)
  const generateFulfillmentStatus = (orderId: string): 'Order Placed' | 'In Transit' | 'Received' => {
    // Extract the order number part (e.g., "ETH74501-87189" from "#ETH74501-87189-1234567890")
    const orderNumber = orderId.split('-').slice(0, 2).join('-');
    if (sampleFulfillmentData[orderNumber]) {
      return sampleFulfillmentData[orderNumber];
    }
    // Fallback to random if not in sample data
    const statuses: ('Order Placed' | 'In Transit' | 'Received')[] = ['Order Placed', 'In Transit', 'Received'];
    return statuses[Math.floor(Math.random() * statuses.length)];
  };

  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoaded, setOrdersLoaded] = useState(false);
  
  // Generate initial orders on client side only to avoid hydration mismatch
  useEffect(() => {
    if (!ordersLoaded) {
      const initialOrders: Order[] = [];
      for (let i = 0; i < INITIAL_LOAD; i++) {
        const uniqueId = generateUniqueId();
        const orderName = `#${uniqueId.split('-')[0]}-${uniqueId.split('-')[1]}`;
        initialOrders.push({
          id: uniqueId,
          name: orderName,
          minutes: Math.floor(Math.random() * 111) + 10, // 10-120 minutes
          status: 'IHP',
          statusColor: 'bg-green-100 text-green-700',
          dotColor: getDotColorByRatio(i),
          deadline: generateDeadline(),
          shelfLocation: generateShelfLocation(),
          vendor: generateVendor(),
          fulfillmentStatus: generateFulfillmentStatus(uniqueId),
          jobId: generateJobId(uniqueId),
          orderStatus: Math.random() > 0.5 ? 'open' : 'closed' as Order['orderStatus']
        });
      }
      setOrders(initialOrders);
      setOrdersLoaded(true);
    }
  }, [ordersLoaded]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const filterButtonRef = useRef<HTMLButtonElement>(null);
  const purchaseOrdersRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // Removed week view - only printers view now
  const [timelineAssignments, setTimelineAssignments] = useState<Map<string, TimelineAssignment>>(new Map());
  const [draggedOrder, setDraggedOrder] = useState<Order | null>(null);
  const [dragOverCell, setDragOverCell] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<number | null>(null);
  const [draggedBookOut, setDraggedBookOut] = useState<BookOutTime | null>(null);
  const [bookOutTimes, setBookOutTimes] = useState<BookOutTime[]>([]);
  const [selectedOrderForModal, setSelectedOrderForModal] = useState<Order | null>(null);
  const [selectedAssignmentForModal, setSelectedAssignmentForModal] = useState<TimelineAssignment | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [printedLogos, setPrintedLogos] = useState<Map<string, Set<string>>>(new Map()); // Map<productId, Set<logoKeys>>
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [completedOrders, setCompletedOrders] = useState<Set<string>>(new Set()); // Set of order IDs that are fully printed
  const [orderCompletedTimestamps, setOrderCompletedTimestamps] = useState<Map<string, Date>>(new Map()); // Map<orderId, completionDate>
  const [isEditingTime, setIsEditingTime] = useState(false);
  const [editedTimeSlot, setEditedTimeSlot] = useState<number | null>(null);
  const [editedEndTimeSlot, setEditedEndTimeSlot] = useState<number | null>(null);
  const [editedColumn, setEditedColumn] = useState<number | null>(null);
  const [editedDate, setEditedDate] = useState<Date | null>(null);
  const [products, setProducts] = useState<Product[]>([
    {
      id: 'product-1',
      name: 'Product 1',
      sku: '',
      quantity: 0,
      shelfLocation: '',
      images: ['product-1-image-1', 'product-1-image-2'],
      sizes: [
        {
          size: 'S',
          quantity: 8,
          logos: [
            { logo: 'LOGO 1', logoSize: '3.75×1.09', sku: 'DF100402' },
            { logo: 'LOGO 2', logoSize: '11×13.83', sku: 'DF100403' },
            { logo: 'LOGO 3', logoSize: '1.57×6.22', sku: 'DF100404' }
          ]
        },
        {
          size: 'M',
          quantity: 18,
          logos: [
            { logo: 'LOGO 1', logoSize: '4.25×1.13', sku: 'DF100405' },
            { logo: 'LOGO 2', logoSize: '11.5×13.99', sku: 'DF100406' },
            { logo: 'LOGO 3', logoSize: '1.75×7.33', sku: 'DF100407' }
          ]
        }
      ]
    },
    {
      id: 'product-2',
      name: 'Product 2',
      sku: '',
      quantity: 0,
      shelfLocation: '',
      images: ['product-2-image-1', 'product-2-image-2'],
      sizes: [
        {
          size: 'S',
          quantity: 1,
          logos: [
            { logo: 'LOGO 1', logoSize: '3.75×1.09', sku: 'DF100402' }
          ]
        }
      ]
    }
  ]);
  const [currentDate, setCurrentDate] = useState(() => new Date());

  const navigateDate = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() + (direction === 'next' ? 1 : -1));
      return newDate;
    });
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Generate a unique key for a timeline cell position
  const getCellKey = (date: Date, column: number, timeSlot: number): string => {
    const dateStr = date.toISOString().split('T')[0];
    return `printers-${dateStr}-${column}-${timeSlot}`;
  };

  // Handle drag start for orders
  const handleDragStart = (e: React.DragEvent, order: Order) => {
    setDraggedOrder(order);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', order.id);
    e.dataTransfer.setData('application/json', JSON.stringify({ source: 'sidebar', orderId: order.id }));
    // Add visual feedback
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = '0.5';
    }
  };

  // Handle drag start for timeline cards
  const handleTimelineCardDragStart = (e: React.DragEvent, order: Order, assignment: TimelineAssignment) => {
    // Prevent dragging if order is completed
    if (completedOrders.has(order.id)) {
      e.preventDefault();
      return;
    }
    setDraggedOrder(order);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', order.id);
    e.dataTransfer.setData('application/json', JSON.stringify({ source: 'timeline', orderId: order.id, assignment }));
    // Add visual feedback
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = '0.5';
    }
  };

  // Handle drag end
  const handleDragEnd = (e: React.DragEvent) => {
    setDraggedOrder(null);
    setDraggedBookOut(null);
    setDragOverCell(null);
    setDragOverColumn(null);
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = '1';
    }
  };
  
  // Handle drag start for booked out cards
  const handleBookOutDragStart = (e: React.DragEvent, bookOut: BookOutTime) => {
    // Don't drag if clicking on duration control buttons or delete button
    const target = e.target as HTMLElement;
    const isButton = target.closest('button') || 
                     target.closest('button[aria-label*="minutes"]') ||
                     target.closest('button[title*="minutes"]');
    if (isButton) {
      e.preventDefault();
      return;
    }
    
    setDraggedBookOut(bookOut);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('application/json', JSON.stringify({ source: 'bookout', bookOutId: bookOut.id }));
    // Add visual feedback
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = '0.5';
    }
  };
  
  // Handle drop for booked out cards
  const handleBookOutDrop = (e: React.DragEvent, column: number, timeSlot: number) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverCell(null);
    setDragOverColumn(null);
    
    if (!draggedBookOut) return;
    
    const targetDate = currentDate;
    
    // Calculate nearest 30-minute slot based on mouse Y position within the calendar grid
    let snappedTimeSlot = timeSlot;
    try {
      const calendarGrid = document.getElementById('printers-timeline-grid');
      if (calendarGrid && calendarGrid.clientHeight > 0) {
        const rect = calendarGrid.getBoundingClientRect();
        const relativeY = e.clientY - rect.top;
        const slotHeight = rect.height / 18;
        
        if (slotHeight > 0) {
          const calculatedSlot = Math.round(relativeY / slotHeight);
          snappedTimeSlot = Math.max(0, Math.min(17, calculatedSlot));
        }
      }
    } catch (error) {
      // Use original timeSlot if calculation fails
    }
    
    // Check for conflicts with orders
    const durationSlots = draggedBookOut.durationSlots;
    const tempAssignmentsMap = new Map(timelineAssignments);
    
    // Check if the new slot conflicts with any orders
    if (isTimeSlotOccupied(tempAssignmentsMap, column, snappedTimeSlot, durationSlots)) {
      // Find next available slot
      const availableSlot = findNextAvailableSlot(tempAssignmentsMap, column, snappedTimeSlot, durationSlots);
      if (availableSlot === null) {
        // No available slot found
        return;
      }
      snappedTimeSlot = availableSlot;
    }
    
    // Check for conflicts with other booked out times
    const dateStr = targetDate.toISOString().split('T')[0];
    const conflictsWithBookOut = bookOutTimes.some(b => {
      if (b.id === draggedBookOut.id) return false; // Don't check against self
      const bDateStr = b.date.toISOString().split('T')[0];
      return (
        b.productionLine === column &&
        bDateStr === dateStr &&
        !(snappedTimeSlot + durationSlots <= b.startTimeSlot || snappedTimeSlot >= b.startTimeSlot + b.durationSlots)
      );
    });
    
    if (conflictsWithBookOut) {
      // Can't drop here - conflicts with another booked out time
      return;
    }
    
    // Ensure duration doesn't exceed available time slots
    const maxDuration = 18 - snappedTimeSlot;
    const finalDurationSlots = Math.min(durationSlots, maxDuration);
    
    // Update the booked out time
    setBookOutTimes(prev => prev.map(b => 
      b.id === draggedBookOut.id 
        ? { 
            ...b, 
            productionLine: column,
            startTimeSlot: snappedTimeSlot,
            durationSlots: finalDurationSlots,
            date: targetDate
          }
        : b
    ));
    
    setDraggedBookOut(null);
  };

  // Handle drag over on timeline cells
  const handleDragOver = (e: React.DragEvent, cellKey: string, column: number, timeSlot: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    // Use the cell's timeSlot for visual feedback - snapping will happen on drop
    setDragOverCell(cellKey);
    setDragOverColumn(column);
  };

  // Handle drag leave
  const handleDragLeave = (e: React.DragEvent) => {
    // Only clear if we're actually leaving the cell (not just moving to a child element)
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      setDragOverCell(null);
      setDragOverColumn(null);
    }
  };

  // Check if a time slot is booked out
  const isTimeSlotBookedOut = (productionLine: number, date: Date, startTimeSlot: number, durationSlots: number): boolean => {
    const dateStr = date.toISOString().split('T')[0];
    return bookOutTimes.some(bookOut => {
      const bookOutDateStr = bookOut.date.toISOString().split('T')[0];
      return (
        bookOut.productionLine === productionLine &&
        bookOutDateStr === dateStr &&
        !(startTimeSlot + durationSlots <= bookOut.startTimeSlot || startTimeSlot >= bookOut.startTimeSlot + bookOut.durationSlots)
      );
    });
  };

  // Handle drop on timeline cells
  const handleDrop = (e: React.DragEvent, column: number, timeSlot: number) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverCell(null);
    setDragOverColumn(null);
    
    if (!draggedOrder) return;

    const targetDate = currentDate;
    
    // Calculate nearest 30-minute slot based on mouse Y position within the calendar grid
    let snappedTimeSlot = timeSlot;
    try {
      const calendarGrid = document.getElementById('printers-timeline-grid');
      if (calendarGrid && calendarGrid.clientHeight > 0) {
        const rect = calendarGrid.getBoundingClientRect();
        const relativeY = e.clientY - rect.top;
        const slotHeight = rect.height / 18; // 18 slots total (8am-5pm)
        
        if (slotHeight > 0) {
          // Calculate which slot the mouse is over - snap to nearest slot center
          const calculatedSlot = Math.round(relativeY / slotHeight);
          snappedTimeSlot = Math.max(0, Math.min(17, calculatedSlot)); // Clamp to 0-17
        }
      }
    } catch (error) {
      console.error('Error calculating snap slot on drop:', error);
      // Use original timeSlot if calculation fails
    }

    setTimelineAssignments(prev => {
      const newMap = new Map(prev);
      
      // Find existing assignment to preserve resized duration
      let preservedDuration: number | null = null;
      for (const [key, value] of prev.entries()) {
        if (value.orderId === draggedOrder.id && value.view === 'printers') {
          preservedDuration = value.durationSlots;
          break;
        }
      }
      
      // Calculate duration - use preserved if found, otherwise calculate from order minutes
      let durationSlots = preservedDuration !== null 
        ? preservedDuration 
        : Math.max(1, Math.ceil(draggedOrder.minutes / 30));
      
      
      // Remove any existing assignments for this order (temporarily for conflict checking)
      const tempMap = new Map(prev);
      for (const [key, value] of tempMap.entries()) {
        if (value.orderId === draggedOrder.id && value.view === 'printers') {
          tempMap.delete(key);
        }
      }
      
      // Check if the target slot is booked out
      if (isTimeSlotBookedOut(column, targetDate, snappedTimeSlot, durationSlots)) {
        // Don't allow drop if time slot is booked out
        return prev;
      }
      
      // Check if the time slot is occupied by another order
      let finalTimeSlot = snappedTimeSlot;
      if (isTimeSlotOccupied(tempMap, column, snappedTimeSlot, durationSlots, draggedOrder.id)) {
        // Find next available slot
        const availableSlot = findNextAvailableSlot(tempMap, column, snappedTimeSlot, durationSlots, draggedOrder.id);
        if (availableSlot === null) {
          // No available slot found, don't allow drop
          return prev;
        }
        finalTimeSlot = availableSlot;
      }
      
      // Ensure duration doesn't exceed available time slots
      const maxDuration = 18 - finalTimeSlot;
      durationSlots = Math.min(durationSlots, maxDuration);
      
      // Remove any existing assignments for this order
      for (const [key, value] of newMap.entries()) {
        if (value.orderId === draggedOrder.id && value.view === 'printers') {
          newMap.delete(key);
        }
      }

      const cellKey = getCellKey(targetDate, column, finalTimeSlot);
      const assignment: TimelineAssignment = {
        orderId: draggedOrder.id,
        startTimeSlot: finalTimeSlot,
        durationSlots,
        column,
        view: 'printers',
        date: targetDate
      };
      
      // Add new assignment
      newMap.set(cellKey, assignment);
      return newMap;
    });

    setDraggedOrder(null);
  };

  // Get order for a specific cell
  const getOrderForCell = (column: number, timeSlot: number): Order | null => {
    const targetDate = currentDate;
    const cellKey = getCellKey(targetDate, column, timeSlot);
    const assignment = timelineAssignments.get(cellKey);
    
    if (assignment && assignment.startTimeSlot === timeSlot) {
      return orders.find(o => o.id === assignment.orderId) || null;
    }
    
    return null;
  };

  // Get highlight color for production line columns (for drag over)
  const getProductionLineColor = (column: number): string => {
    const colors = [
      'bg-blue-50 border-blue-300', // Production Line 1
      'bg-green-50 border-green-300', // Production Line 2
      'bg-yellow-50 border-yellow-300', // Production Line 3
      'bg-purple-50 border-purple-300', // Production Line 4
      'bg-pink-50 border-pink-300', // Production Line 5
    ];
    return colors[column] || 'bg-gray-50 border-gray-300';
  };

  // Get card background color for production line (for cards in timeline)
  const getProductionLineCardColor = (column: number): string => {
    const colors = [
      'bg-blue-50 border-blue-200', // Production Line 1
      'bg-green-50 border-green-200', // Production Line 2
      'bg-yellow-50 border-yellow-200', // Production Line 3
      'bg-purple-50 border-purple-200', // Production Line 4
      'bg-pink-50 border-pink-200', // Production Line 5
    ];
    return colors[column] || 'bg-white border-gray-200';
  };

  // Get assignments that span multiple time slots
  const getAssignmentsForTimeSlot = (column: number, timeSlot: number): TimelineAssignment[] => {
    const targetDate = currentDate;
    const result: TimelineAssignment[] = [];
    for (const [key, assignment] of timelineAssignments.entries()) {
      if (
        assignment.column === column &&
        assignment.view === 'printers' &&
        assignment.date.toISOString().split('T')[0] === targetDate.toISOString().split('T')[0] &&
        timeSlot >= assignment.startTimeSlot &&
        timeSlot < assignment.startTimeSlot + assignment.durationSlots
      ) {
        result.push(assignment);
      }
    }
    return result;
  };

  // Check if a time slot range is occupied (excluding the current order being moved)
  const isTimeSlotOccupied = (assignmentsMap: Map<string, TimelineAssignment>, column: number, startSlot: number, durationSlots: number, excludeOrderId?: string): boolean => {
    const targetDate = currentDate;
    const dateStr = targetDate.toISOString().split('T')[0];
    
    for (let slot = startSlot; slot < startSlot + durationSlots; slot++) {
      if (slot >= 18) return true; // Out of bounds
      
      // Check all assignments for conflicts
      for (const [key, assignment] of assignmentsMap.entries()) {
        // Exclude the order being moved from conflict check
        if (excludeOrderId && assignment.orderId === excludeOrderId) {
          continue;
        }
        
        // Check if this assignment is on the same column and date
        if (
          assignment.column === column &&
          assignment.view === 'printers' &&
          assignment.date.toISOString().split('T')[0] === dateStr
        ) {
          // Check if this slot overlaps with the assignment
          if (slot >= assignment.startTimeSlot && slot < assignment.startTimeSlot + assignment.durationSlots) {
            return true; // Conflict found
          }
        }
      }
    }
    return false;
  };

  // Find next available time slot
  const findNextAvailableSlot = (assignmentsMap: Map<string, TimelineAssignment>, column: number, startSlot: number, durationSlots: number, excludeOrderId?: string): number | null => {
    // Try forward first
    for (let slot = startSlot; slot <= 18 - durationSlots; slot++) {
      if (!isTimeSlotOccupied(assignmentsMap, column, slot, durationSlots, excludeOrderId)) {
        return slot;
      }
    }
    // Try backward
    for (let slot = startSlot - 1; slot >= 0; slot--) {
      if (!isTimeSlotOccupied(assignmentsMap, column, slot, durationSlots, excludeOrderId)) {
        return slot;
      }
    }
    return null; // No available slot found
  };

  // Get book out time for a specific time slot
  const getBookOutForTimeSlot = (productionLine: number, timeSlot: number): BookOutTime | null => {
    const dateStr = currentDate.toISOString().split('T')[0];
    return bookOutTimes.find(bookOut => {
      const bookOutDateStr = bookOut.date.toISOString().split('T')[0];
      return (
        bookOut.productionLine === productionLine &&
        bookOutDateStr === dateStr &&
        timeSlot >= bookOut.startTimeSlot &&
        timeSlot < bookOut.startTimeSlot + bookOut.durationSlots
      );
    }) || null;
  };

  // Handle right-click on production line header or timeline cells - create book out time directly
  const handleProductionLineRightClick = (e: React.MouseEvent, productionLine: number, timeSlot?: number) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Default to 8am (slot 0) if no time slot specified, or use the clicked time slot
    const startSlot = timeSlot !== undefined ? timeSlot : 0;
    const defaultDuration = 2; // 1 hour (2 slots of 30 minutes)
    
    const newBookOut: BookOutTime = {
      id: `bookout-${Date.now()}-${Math.random()}`,
      productionLine: productionLine,
      date: new Date(currentDate),
      startTimeSlot: startSlot,
      durationSlots: defaultDuration,
      reason: 'Booked Out'
    };
    
    setBookOutTimes(prev => [...prev, newBookOut]);
  };

  // Handle deleting book out time
  const handleDeleteBookOut = (e: React.MouseEvent, bookOutId: string) => {
    e.stopPropagation();
    e.preventDefault();
    setBookOutTimes(prev => prev.filter(b => b.id !== bookOutId));
  };

  // Handle resizing book out time
  const handleBookOutResizeStart = (e: React.MouseEvent | React.PointerEvent, bookOut: BookOutTime) => {
    e.stopPropagation();
    e.preventDefault();
    
    // Prevent card drag when resizing
    const cardElement = (e.target as HTMLElement).closest('[data-bookout-id]');
    if (cardElement) {
      (cardElement as HTMLElement).style.pointerEvents = 'none';
    }
    
    document.body.style.cursor = 'ns-resize';
    document.body.style.userSelect = 'none';
    
    const clientY = 'clientY' in e ? e.clientY : (e as any).clientY;
    const startY = clientY;
    const startDuration = bookOut.durationSlots;
    
    // Capture the card element for container finding
    const resizeCardElement = cardElement || document.querySelector(`[data-bookout-id="${bookOut.id}"]`);
    
    // Find container once at start - cache it for performance
    let calendarContainer: HTMLElement | null = null;
    if (resizeCardElement) {
      let parent = resizeCardElement.parentElement;
      let depth = 0;
      while (parent && parent !== document.body && depth < 10) {
        const computedStyle = window.getComputedStyle(parent);
        if (computedStyle.display === 'grid') {
          calendarContainer = parent;
          break;
        }
        parent = parent.parentElement;
        depth++;
      }
    }
    
    // Fallback: try ID
    if (!calendarContainer) {
      calendarContainer = document.getElementById('printers-timeline-grid');
    }
    
    // Fallback: find by checking computed styles
    if (!calendarContainer) {
      const containers = document.querySelectorAll('.flex-1.overflow-hidden.flex.flex-col');
      for (const container of containers) {
        const computedStyle = window.getComputedStyle(container as HTMLElement);
        if (computedStyle.display === 'grid') {
          calendarContainer = container as HTMLElement;
          break;
        }
      }
    }
    
    if (!calendarContainer) {
      console.error('No calendar container found for book-out resize!');
      return;
    }
    
    // Direct updates for immediate visual feedback
    const handleGlobalMouseMove = (moveEvent: MouseEvent) => {
      moveEvent.preventDefault();
      moveEvent.stopPropagation();
      
      // Recalculate container position in case of scrolling
      const containerRect = calendarContainer.getBoundingClientRect();
      const containerTop = containerRect.top;
      const containerHeight = calendarContainer.clientHeight;
      if (containerHeight === 0) return;
      const slotHeight = containerHeight / 18;
      
      // Calculate which time slot the cursor is currently over
      const relativeY = moveEvent.clientY - containerTop;
      const cursorSlot = Math.floor(relativeY / slotHeight);
      
      // Clamp cursor slot to valid range (0-17)
      const clampedCursorSlot = Math.max(0, Math.min(17, cursorSlot));
      
      // Calculate duration from start slot to cursor slot
      // Duration should be at least 1 slot, and extend to where cursor is
      let newDuration: number;
      if (clampedCursorSlot >= bookOut.startTimeSlot) {
        // Cursor is below or at start - extend downward
        newDuration = clampedCursorSlot - bookOut.startTimeSlot + 1;
      } else {
        // Cursor is above start - this shouldn't happen when resizing from bottom, but handle it
        newDuration = 1;
      }
      
      // Ensure minimum duration of 1 slot
      newDuration = Math.max(1, newDuration);
      // Ensure maximum duration doesn't exceed available slots
      const maxDuration = 18 - bookOut.startTimeSlot;
      newDuration = Math.min(newDuration, maxDuration);
      
      // Use functional update for better performance
      setBookOutTimes(prev => {
        // Quick check - if duration hasn't changed, skip update
        const current = prev.find(b => b.id === bookOut.id);
        if (current && current.durationSlots === newDuration) {
          return prev; // No change needed
        }
        
        // Create new array with updated item
        return prev.map(b => {
          if (b.id === bookOut.id) {
            return {
              ...b,
              durationSlots: newDuration
            };
          }
          return b;
        });
      });
    };
    
    const handleGlobalMouseUp = () => {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      const cards = document.querySelectorAll('[data-bookout-id]');
      cards.forEach(card => {
        (card as HTMLElement).style.pointerEvents = '';
      });
      document.removeEventListener('mousemove', handleGlobalMouseMove, { capture: true });
      document.removeEventListener('mouseup', handleGlobalMouseUp, { capture: true });
    };
    
    document.addEventListener('mousemove', handleGlobalMouseMove, { capture: true });
    document.addEventListener('mouseup', handleGlobalMouseUp, { capture: true });
  };

  const handleNavigate = (direction: 'prev' | 'next') => {
    navigateDate(direction);
  };

  // Helper function to check if order matches deadline filters
  const matchesDeadlineFilter = (deadline: Date, filters: Set<DeadlineFilter>): boolean => {
    if (filters.size === 0) return true;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const deadlineDate = new Date(deadline);
    deadlineDate.setHours(0, 0, 0, 0);
    
    const daysUntilDeadline = Math.floor((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    for (const filter of filters) {
      if (filter === 'overdue' && daysUntilDeadline < 0) return true;
      if (filter === 'due-this-week' && daysUntilDeadline >= 0 && daysUntilDeadline <= 7) return true;
      if (filter === 'due-next-week' && daysUntilDeadline > 7 && daysUntilDeadline <= 14) return true;
      if (filter === 'due-later' && daysUntilDeadline > 14) return true;
    }
    
    return false;
  };

  // Helper function to check if order matches shelf filters
  const matchesShelfFilter = (shelfLocation: string, filters: Set<ShelfFilter>): boolean => {
    if (filters.size === 0) return true;
    const shelfNumber = parseInt(shelfLocation.match(/^\d+/)?.[0] || '0');
    return filters.has(shelfNumber);
  };

  // Helper function to check if order matches vendor filters
  const matchesVendorFilter = (vendor: 'ASC' | 'SSA' | 'SUPA' | 'INT ACT', filters: Set<VendorFilter>): boolean => {
    if (filters.size === 0) return true;
    return filters.has(vendor);
  };

  // Helper function to check if order matches fulfillment status filters
  const matchesFulfillmentStatusFilter = (fulfillmentStatus: 'Order Placed' | 'In Transit' | 'Received', filters: Set<FulfillmentStatusFilter>): boolean => {
    if (filters.size === 0) return true;
    return filters.has(fulfillmentStatus);
  };

  // Memoized filtered orders for better performance
  const filteredOrders = useMemo(() => {
    const searchLower = searchQuery.toLowerCase().trim();
    return orders.filter(order => {
      const matchesSearch = searchLower === '' || order.name.toLowerCase().includes(searchLower);
      const matchesVendor = matchesVendorFilter(order.vendor, vendorFilters);
      const matchesFulfillmentStatus = matchesFulfillmentStatusFilter(order.fulfillmentStatus, fulfillmentStatusFilters);
      return matchesSearch && matchesVendor && matchesFulfillmentStatus;
    });
  }, [orders, searchQuery, vendorFilters, fulfillmentStatusFilters]);

  const filterCount = vendorFilters.size + fulfillmentStatusFilters.size;

  const toggleColorFilter = useCallback((color: ColorFilter) => {
    setColorFilters(prev => {
      const newFilters = new Set(prev);
      if (newFilters.has(color)) {
        newFilters.delete(color);
      } else {
        newFilters.add(color);
      }
      return newFilters;
    });
  }, []);

  const toggleDeadlineFilter = useCallback((filter: DeadlineFilter) => {
    setDeadlineFilters(prev => {
      const newFilters = new Set(prev);
      if (newFilters.has(filter)) {
        newFilters.delete(filter);
      } else {
        newFilters.add(filter);
      }
      return newFilters;
    });
  }, []);

  const toggleShelfFilter = useCallback((shelf: ShelfFilter) => {
    setShelfFilters(prev => {
      const newFilters = new Set(prev);
      if (newFilters.has(shelf)) {
        newFilters.delete(shelf);
      } else {
        newFilters.add(shelf);
      }
      return newFilters;
    });
  }, []);

  const toggleVendorFilter = useCallback((vendor: VendorFilter) => {
    setVendorFilters(prev => {
      const newFilters = new Set(prev);
      if (newFilters.has(vendor)) {
        newFilters.delete(vendor);
      } else {
        newFilters.add(vendor);
      }
      return newFilters;
    });
  }, []);

  const toggleFulfillmentStatusFilter = useCallback((status: FulfillmentStatusFilter) => {
    setFulfillmentStatusFilters(prev => {
      const newFilters = new Set(prev);
      if (newFilters.has(status)) {
        newFilters.delete(status);
      } else {
        newFilters.add(status);
      }
      return newFilters;
    });
  }, []);

  const clearAllFilters = useCallback(() => {
    setVendorFilters(new Set());
    setFulfillmentStatusFilters(new Set());
  }, []);

  // Close dropdown when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        dropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        filterButtonRef.current &&
        !filterButtonRef.current.contains(target)
      ) {
        setDropdownOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && dropdownOpen) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [dropdownOpen]);

  // Close status dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        statusDropdownOpen &&
        statusDropdownRef.current &&
        !statusDropdownRef.current.contains(target) &&
        statusButtonRef.current &&
        !statusButtonRef.current.contains(target)
      ) {
        setStatusDropdownOpen(false);
      }
      if (
        productTableStatusDropdownOpen &&
        productTableStatusDropdownRef.current &&
        !productTableStatusDropdownRef.current.contains(target) &&
        productTableStatusButtonRef.current &&
        !productTableStatusButtonRef.current.contains(target)
      ) {
        setProductTableStatusDropdownOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (statusDropdownOpen) {
          setStatusDropdownOpen(false);
        }
        if (productTableStatusDropdownOpen) {
          setProductTableStatusDropdownOpen(false);
        }
      }
    };

    if (statusDropdownOpen || productTableStatusDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [statusDropdownOpen, productTableStatusDropdownOpen]);

  const loadMoreOrders = useCallback(() => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      setOrders(prev => {
        const newOrders: Order[] = [];
        const startIndex = prev.length;
        for (let i = 0; i < LOAD_MORE; i++) {
          const uniqueId = generateUniqueId();
          const orderName = `#${uniqueId.split('-')[0]}-${uniqueId.split('-')[1]}`;
          newOrders.push({
            id: uniqueId,
            name: orderName,
            minutes: Math.floor(Math.random() * 111) + 10, // 10-120 minutes
            status: 'IHP',
            statusColor: 'bg-green-100 text-green-700',
            dotColor: getDotColorByRatio(startIndex + i),
            deadline: generateDeadline(),
            shelfLocation: generateShelfLocation(),
            vendor: generateVendor(),
            fulfillmentStatus: generateFulfillmentStatus(uniqueId),
            jobId: generateJobId(uniqueId),
            orderStatus: Math.random() > 0.5 ? 'open' : 'closed' as Order['orderStatus']
          });
        }
        return [...prev, ...newOrders];
      });
      setIsLoading(false);
      // For demo purposes, we'll keep loading indefinitely
      // In production, setHasMore(false) when no more orders exist
    }, 300);
  }, [isLoading, hasMore]);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      // Load more when user is within 200px of the bottom
      if (scrollHeight - scrollTop - clientHeight < 200) {
        loadMoreOrders();
      }
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, [loadMoreOrders]);


  return (
    <div className='flex h-dvh w-full overflow-hidden'>
      <SidebarProvider defaultOpen={true}>
        <Sidebar className="w-80 h-full">
          <SidebarContent className="flex flex-col h-full p-0 overflow-hidden">
            {/* Header with Logo */}
            <div className="px-4 pt-4">
              <div className="flex items-center justify-between mb-4">
                <Image
                  src="https://cdn.shopify.com/s/files/1/0609/4752/9901/files/Ethos_Logo-05.jpg?v=1769654967"
                  alt="Ethos"
                  width={100}
                  height={40}
                  className="h-8 w-auto"
                />
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => {}}
                  >
                    <UserIcon className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => {}}
                  >
                    <SettingsIcon className="size-4" />
                  </Button>
                </div>
              </div>
              <h1 className="text-xs italic text-gray-500 mb-2">Receiving</h1>
              
              {/* Search Bar */}
              <div className="relative mb-1">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-9"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="relative">
                    <button
                      ref={filterButtonRef}
                      onClick={(e) => {
                        e.stopPropagation();
                        setDropdownOpen(!dropdownOpen);
                      }}
                      className="relative p-1 text-muted-foreground hover:text-foreground transition-colors cursor-pointer rounded hover:bg-accent"
                    >
                      <FilterIcon className="size-4" />
                      {filterCount > 0 && (
                        <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground font-medium">
                          {filterCount}
                        </span>
                      )}
                    </button>
                    {dropdownOpen && (
                      <div
                        ref={dropdownRef}
                        className="absolute top-full right-0 mt-1 z-50 w-64 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md"
                      >
                      <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                        Supplier
                      </div>
                      <div className="grid grid-cols-2 gap-1 px-2 pb-2">
                        {(['ASC', 'SSA', 'SUPA', 'INT ACT'] as VendorFilter[]).map((vendor) => (
                          <div
                            key={vendor}
                            onClick={() => toggleVendorFilter(vendor)}
                            className={`relative flex cursor-pointer select-none items-center justify-center rounded-sm px-2 py-1.5 text-xs outline-none transition-colors border ${
                              vendorFilters.has(vendor)
                                ? vendor === 'ASC' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                                  vendor === 'SSA' ? 'bg-green-50 text-green-600 border-green-100' :
                                  vendor === 'SUPA' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                                  'bg-pink-50 text-pink-600 border-pink-100' // INT ACT
                                : vendor === 'ASC' ? 'bg-purple-50 text-purple-600 border-purple-100 hover:bg-purple-100' :
                                  vendor === 'SSA' ? 'bg-green-50 text-green-600 border-green-100 hover:bg-green-100' :
                                  vendor === 'SUPA' ? 'bg-orange-50 text-orange-600 border-orange-100 hover:bg-orange-100' :
                                  'bg-pink-50 text-pink-600 border-pink-100 hover:bg-pink-100' // INT ACT
                            }`}
                          >
                            {vendor}
                          </div>
                        ))}
                      </div>
                      <div className="-mx-1 my-1 h-px bg-muted" />
                      <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                        Fulfillment Status
                      </div>
                      <div className="flex flex-col gap-1 px-2 pb-2">
                        {(['Order Placed', 'In Transit', 'Received'] as FulfillmentStatusFilter[]).map((status) => (
                          <div
                            key={status}
                            onClick={() => toggleFulfillmentStatusFilter(status)}
                            className={`relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-xs outline-none transition-colors border ${
                              fulfillmentStatusFilters.has(status)
                                ? status === 'Order Placed' ? 'bg-gray-100 text-gray-700 border-gray-200' :
                                  status === 'In Transit' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                                  'bg-emerald-100 text-emerald-700 border-emerald-200' // Received
                                : status === 'Order Placed' ? 'bg-gray-50 text-gray-600 border-gray-100 hover:bg-gray-100' :
                                  status === 'In Transit' ? 'bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-100' :
                                  'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100' // Received
                            }`}
                          >
                            {status}
                          </div>
                        ))}
                      </div>
                      {filterCount > 0 && (
                        <>
                          <div className="-mx-1 my-1 h-px bg-muted" />
                          <div
                            onClick={clearAllFilters}
                            className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent text-muted-foreground hover:text-foreground"
                          >
                            Clear all filters
                          </div>
                        </>
                      )}
                    </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Order List Header */}
            <div className="px-4 pt-0 pb-0">
              <h2 className="font-semibold text-sm">Name</h2>
            </div>

            {/* Scrollable Order List */}
            <div 
              ref={scrollContainerRef}
              className="flex-1 overflow-y-auto -mt-2 min-h-0"
              onDragOver={(e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
              }}
              onDrop={(e) => {
                e.preventDefault();
                e.stopPropagation();
                
                // Check if this is a timeline card being dragged back
                try {
                  const data = e.dataTransfer.getData('application/json');
                  if (data) {
                    const dragData = JSON.parse(data);
                    if (dragData.source === 'timeline') {
                      // Prevent dropping completed orders back to sidebar
                      const order = orders.find(o => o.id === dragData.orderId);
                      if (order && completedOrders.has(order.id)) {
                        return; // Don't allow drop if order is completed
                      }
                      // Remove assignment from timeline
                      setTimelineAssignments(prev => {
                        const newMap = new Map(prev);
                        for (const [key, value] of newMap.entries()) {
                          if (value.orderId === dragData.orderId && value.view === dragData.assignment.view) {
                            newMap.delete(key);
                          }
                        }
                        return newMap;
                      });
                      setDraggedOrder(null);
                    }
                  }
                } catch (err) {
                  // If JSON parsing fails, ignore
                }
              }}
            >
              {!ordersLoaded ? (
                <div className="flex items-center justify-center py-8">
                  <LoaderIcon className="size-4 animate-spin text-muted-foreground" />
                </div>
              ) : (
                filteredOrders.map((order) => {
                  // Ensure fulfillmentStatus exists, default to 'Order Placed' if missing
                  const fulfillmentStatus = order.fulfillmentStatus || 'Order Placed';
                  
                  return (
                    <div
                      key={order.id}
                      onClick={() => setSelectedOrder(order.id)}
                      className={`px-4 py-3 border-b cursor-pointer hover:bg-accent transition-colors ${
                        selectedOrder === order.id ? 'bg-accent' : ''
                      } ${completedOrders.has(order.id) ? 'opacity-40' : ''}`}
                    >
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <div className="font-medium text-sm">{order.name}</div>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap border ${
                            order.orderStatus === 'open' ? 'bg-green-50 text-green-600 border-green-100' :
                            'bg-gray-200 text-gray-600 border-gray-300' // closed
                          }`}>
                            {order.orderStatus === 'open' ? 'Open' : 'Closed'}
                          </span>
                        </div>
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-600 border border-red-100 whitespace-nowrap w-fit">
                          {formatDeadline(order.deadline)}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
              {isLoading && (
                <div className="flex items-center justify-center py-4">
                  <LoaderIcon className="size-4 animate-spin text-muted-foreground" />
                </div>
              )}
            </div>

          </SidebarContent>
        </Sidebar>
        <div className='flex flex-1 flex-col overflow-hidden'>
          <main className='size-full flex-1 flex flex-col px-4 pt-6 pb-6 sm:px-6 overflow-y-auto'>
            {selectedOrder ? (() => {
              const selectedOrderData = orders.find(o => o.id === selectedOrder);
              if (!selectedOrderData) return null;
              
              // Ensure jobId exists, generate if missing
              const jobId = selectedOrderData.jobId || generateJobId(selectedOrderData.id);
              
              // Extract order number and get purchase orders
              const fullOrderNumber = selectedOrderData.name.replace(/^#/, '').split('-').slice(0, 2).join('-');
              const baseOrderNumber = selectedOrderData.name.replace(/^#/, '').split('-')[0];
              const purchaseOrders = purchaseOrdersData[fullOrderNumber] || purchaseOrdersData[baseOrderNumber] || [];
              
              // Aggregate all products from all purchase orders
              const productMap = new Map<string, Product & { 
                suppliers: Set<'ASC' | 'SSA' | 'SUPA' | 'INT ACT'>;
                supplierPOs: Map<'ASC' | 'SSA' | 'SUPA' | 'INT ACT', Array<{ id: string; number: string }>>;
              }>();
              const productNames = ['Custom Socks - Black', 'Custom Socks - White', 'Custom Socks - Navy', 'Custom Socks - Red'];
              const productSkus = ['SKU-001-BLK', 'SKU-002-WHT', 'SKU-003-NVY', 'SKU-004-RED'];
              const shelfNumbers = [5, 8, 12, 3];
              const shelfLetters = ['A', 'B', 'C', 'D'];
              
              purchaseOrders.forEach((po, poIdx) => {
                // Distribute products across purchase orders
                const itemsPerProduct = Math.floor(po.totalItems / productNames.length);
                const remainder = po.totalItems % productNames.length;
                
                productNames.forEach((name, idx) => {
                  const sku = productSkus[idx];
                  const productKey = sku;
                  const quantityForThisPO = itemsPerProduct + (idx < remainder ? 1 : 0);
                  
                  if (quantityForThisPO > 0) {
                    if (productMap.has(productKey)) {
                      const existing = productMap.get(productKey)!;
                      existing.quantity += quantityForThisPO;
                      existing.suppliers.add(po.supplier);
                      if (!existing.supplierPOs.has(po.supplier)) {
                        existing.supplierPOs.set(po.supplier, []);
                      }
                      // Check if this PO is already in the list to avoid duplicates
                      const existingPOs = existing.supplierPOs.get(po.supplier)!;
                      if (!existingPOs.some(p => p.id === po.id)) {
                        existingPOs.push({ id: po.id, number: po.purchaseOrderNumber });
                      }
                      // If existing product doesn't have customization method, assign one
                      if (!existing.customizationMethod) {
                        const customizationMethods = ['Screen Print', 'Embroidery', 'Heat Transfer', 'Direct to Garment'];
                        existing.customizationMethod = customizationMethods[idx % customizationMethods.length];
                      }
                    } else {
                      const suppliers = new Set<'ASC' | 'SSA' | 'SUPA' | 'INT ACT'>();
                      suppliers.add(po.supplier);
                      const supplierPOs = new Map<'ASC' | 'SSA' | 'SUPA' | 'INT ACT', Array<{ id: string; number: string }>>();
                      supplierPOs.set(po.supplier, [{ id: po.id, number: po.purchaseOrderNumber }]);
                      // Assign customization method based on product index (for variety)
                      const customizationMethods = ['Screen Print', 'Embroidery', 'Heat Transfer', 'Direct to Garment'];
                      const customizationMethod = customizationMethods[idx % customizationMethods.length];
                      
                      productMap.set(productKey, {
                        id: `prod-${idx + 1}`,
                        name,
                        sku,
                        quantity: quantityForThisPO,
                        shelfLocation: `${shelfNumbers[idx]}${shelfLetters[idx]}`,
                        supplier: po.supplier,
                        customizationMethod,
                        suppliers,
                        supplierPOs
                      });
                    }
                  }
                });
              });
              
              // Convert map to array for display
              let products: Product[] = Array.from(productMap.values());
              
              // If no purchase orders, use default sample data
              if (products.length === 0) {
                products.push(
                  { id: 'prod-1', name: 'Custom Socks - Black', sku: 'SKU-001-BLK', quantity: 50, shelfLocation: '5A', customizationMethod: 'Screen Print' },
                  { id: 'prod-2', name: 'Custom Socks - White', sku: 'SKU-002-WHT', quantity: 75, shelfLocation: '8B', customizationMethod: 'Embroidery' },
                  { id: 'prod-3', name: 'Custom Socks - Navy', sku: 'SKU-003-NVY', quantity: 30, shelfLocation: '12C', customizationMethod: 'Screen Print' },
                  { id: 'prod-4', name: 'Custom Socks - Red', sku: 'SKU-004-RED', quantity: 25, shelfLocation: '3D', customizationMethod: 'Heat Transfer' }
                );
              } else {
                // Add sample customization methods to products if they don't have them
                const customizationMethods = ['Screen Print', 'Embroidery', 'Heat Transfer', 'Direct to Garment'];
                products.forEach((product, idx) => {
                  if (!product.customizationMethod) {
                    product.customizationMethod = customizationMethods[idx % customizationMethods.length];
                  }
                });
              }

              // Check if this is a split order or main order
              const isSplitOrder = selectedOrderData.id.startsWith('split-');
              const mainOrderBase = selectedOrderData.name.replace(/^#/, '').split('-')[0];
              const isMainOrder = !isSplitOrder && (
                !selectedOrderData.name.includes('-') || 
                selectedOrderData.name.replace(/^#/, '').split('-').length === 2
              );

              // Get the main order ID (either current order if main, or find the main order if split)
              const mainOrderId = isSplitOrder 
                ? orders.find(o => {
                    const orderBase = o.name.replace(/^#/, '').split('-')[0];
                    return orderBase === mainOrderBase && !o.id.startsWith('split-') && 
                      (o.name.replace(/^#/, '').split('-').length === 2 || !o.name.includes('-'));
                  })?.id || selectedOrderData.id
                : selectedOrderData.id;

              // Get split orders for this main order (always get splits for the main order base)
              const splitOrdersForMainOrder = orders.filter(o => {
                const orderBase = o.name.replace(/^#/, '').split('-')[0];
                return orderBase === mainOrderBase && o.id.startsWith('split-');
              });

              // Calculate main order status based on split orders
              // If ALL splits are "Shipped" or "Ready For Pickup", close the main order
              // Otherwise, keep it open
              if (isMainOrder && splitOrdersForMainOrder.length > 0) {
                const allSplitsShippedOrReady = splitOrdersForMainOrder.every(split => 
                  split.orderStatus === 'Shipped' || split.orderStatus === 'Ready For Pickup'
                );
                
                const newMainOrderStatus = allSplitsShippedOrReady ? 'closed' : 'open';
                
                // Update the main order status if it's different
                if (selectedOrderData.orderStatus !== newMainOrderStatus) {
                  setOrders(prev => prev.map(o => 
                    o.id === selectedOrderData.id 
                      ? { ...o, orderStatus: newMainOrderStatus as Order['orderStatus'] }
                      : o
                  ));
                }
              }

              // Determine if we should show tabs (always show for main orders, or when viewing splits)
              const shouldShowTabs = isMainOrder || isSplitOrder;

              // Filter products and purchase orders based on split order
              let displayPurchaseOrders = purchaseOrders;
              
              if (isSplitOrder) {
                // Show only products and POs for this split order
                const splitProducts = splitOrderProducts.get(selectedOrderData.id) || [];
                const splitPOs = splitOrderPOs.get(selectedOrderData.id) || [];
                products = splitProducts;
                displayPurchaseOrders = splitPOs;
              } else if (isMainOrder && splitOrdersForMainOrder.length > 0) {
                // Show products with remaining quantities after splits
                // Calculate total split quantities per product
                const totalSplitQuantities = new Map<string, number>();
                splitOrdersForMainOrder.forEach(splitOrder => {
                  const splitProducts = splitOrderProducts.get(splitOrder.id) || [];
                  splitProducts.forEach(p => {
                    const currentTotal = totalSplitQuantities.get(p.id) || 0;
                    totalSplitQuantities.set(p.id, currentTotal + p.quantity);
                  });
                });
                
                // Update products to show remaining quantities
                products = products.map(p => {
                  const splitQty = totalSplitQuantities.get(p.id) || 0;
                  const remainingQty = p.quantity - splitQty;
                  // Only show products that still have remaining quantity
                  if (remainingQty > 0) {
                    return { ...p, quantity: remainingQty };
                  }
                  return null;
                }).filter((p): p is Product => p !== null);
                
                // Also check mainOrderProductQuantities for any manually tracked reductions
                products = products.map(p => {
                  const trackedQty = mainOrderProductQuantities.get(p.id);
                  if (trackedQty !== undefined) {
                    return { ...p, quantity: trackedQty };
                  }
                  return p;
                });
                
                // Filter purchase orders - only show POs not assigned to splits
                const splitPOIds = new Set<string>();
                splitOrdersForMainOrder.forEach(splitOrder => {
                  const splitPOs = splitOrderPOs.get(splitOrder.id) || [];
                  splitPOs.forEach(po => splitPOIds.add(po.id));
                });
                displayPurchaseOrders = purchaseOrders.filter(po => !splitPOIds.has(po.id));
              }
              
              const allSelected = products.length > 0 && products.every(p => selectedProducts.has(p.id));
              const someSelected = products.some(p => selectedProducts.has(p.id)) && !allSelected;
              
              const setSelectAllRef = (input: HTMLInputElement | null) => {
                if (input) {
                  input.indeterminate = someSelected;
                }
              };
              
              const handleSelectAll = () => {
                if (allSelected) {
                  setSelectedProducts(new Set());
                } else {
                  setSelectedProducts(new Set(products.map(p => p.id)));
                }
              };
              
              const handleSelectProduct = (productId: string) => {
                setSelectedProducts(prev => {
                  const newSet = new Set(prev);
                  if (newSet.has(productId)) {
                    newSet.delete(productId);
                  } else {
                    newSet.add(productId);
                  }
                  return newSet;
                });
              };

              const handleSelectSplitOrder = (splitOrderId: string) => {
                setSelectedSplitOrders(prev => {
                  const newSet = new Set(prev);
                  if (newSet.has(splitOrderId)) {
                    newSet.delete(splitOrderId);
                  } else {
                    newSet.add(splitOrderId);
                  }
                  return newSet;
                });
              };

              const handleMergeSplitOrders = () => {
                if (selectedSplitOrders.size < 2) return;

                // Get base order number
                const baseOrderNumber = selectedOrderData.name.replace(/^#/, '').split('-')[0];
                
                // Find existing split numbers for this base order
                const existingSplitNumbers = orders
                  .filter(o => {
                    const orderBase = o.name.replace(/^#/, '').split('-')[0];
                    return orderBase === baseOrderNumber && o.id.startsWith('split-');
                  })
                  .map(o => {
                    const parts = o.name.replace(/^#/, '').split('-');
                    const splitNum = parseInt(parts[parts.length - 1]);
                    return isNaN(splitNum) ? 0 : splitNum;
                  })
                  .filter(n => n > 0);

                const nextSplitNumber = existingSplitNumbers.length > 0 
                  ? Math.max(...existingSplitNumbers) + 1 
                  : 1;

                // Get all products from selected split orders
                const mergedProducts = new Map<string, Product & { originalQuantity?: number }>();
                const mergedPOsMap = new Map<string, PurchaseOrder>(); // Use Map to avoid duplicates by PO ID
                let mergedDeadline: Date | null = null;
                let mergedShelfLocation = '';
                let mergedVendor: 'ASC' | 'SSA' | 'SUPA' | 'INT ACT' = 'ASC';

                selectedSplitOrders.forEach(splitOrderId => {
                  const splitOrder = orders.find(o => o.id === splitOrderId);
                  if (!splitOrder) return;

                  // Track earliest deadline
                  if (!mergedDeadline || splitOrder.deadline < mergedDeadline) {
                    mergedDeadline = splitOrder.deadline;
                  }

                  // Get products from this split
                  const splitProducts = splitOrderProducts.get(splitOrderId) || [];
                  splitProducts.forEach(product => {
                    const existingProduct = mergedProducts.get(product.sku);
                    if (existingProduct) {
                      // Merge quantities for same SKU
                      existingProduct.quantity += product.quantity;
                    } else {
                      mergedProducts.set(product.sku, { ...product });
                    }
                    if (!mergedShelfLocation) mergedShelfLocation = product.shelfLocation;
                    if (!mergedVendor && product.supplier) mergedVendor = product.supplier;
                  });

                  // Get POs from this split - use Map to avoid duplicates
                  const splitPOs = splitOrderPOs.get(splitOrderId) || [];
                  splitPOs.forEach(po => {
                    if (!mergedPOsMap.has(po.id)) {
                      mergedPOsMap.set(po.id, po);
                    }
                  });
                });

                // Create new merged split order
                const mergedOrderName = `#${baseOrderNumber}-${nextSplitNumber}`;
                const mergedOrderId = `split-${baseOrderNumber}-${nextSplitNumber}-${Date.now()}`;
                
                const mergedProductsArray = Array.from(mergedProducts.values());
                const totalMinutes = mergedProductsArray.reduce((sum, p) => sum + Math.ceil(p.quantity / 10) * 10, 0);

                const mergedOrder: Order = {
                  id: mergedOrderId,
                  name: mergedOrderName,
                  minutes: Math.max(totalMinutes, 30),
                  status: 'IHP',
                  statusColor: 'bg-green-100 text-green-700',
                  dotColor: getDotColorByRatio(orders.length),
                  deadline: mergedDeadline || selectedOrderData.deadline,
                  shelfLocation: mergedShelfLocation || selectedOrderData.shelfLocation,
                  vendor: mergedVendor,
                  fulfillmentStatus: selectedOrderData.fulfillmentStatus,
                  jobId: generateJobId(`split-${baseOrderNumber}-${nextSplitNumber}`),
                  orderStatus: 'In Production' as Order['orderStatus'] // Merged split gets its own status
                };

                // Remove old split orders and add merged one
                setOrders(prev => [
                  ...prev.filter(o => !selectedSplitOrders.has(o.id)),
                  mergedOrder
                ]);

                // Store merged products
                setSplitOrderProducts(prev => {
                  const updated = new Map(prev);
                  // Remove old splits
                  selectedSplitOrders.forEach(id => updated.delete(id));
                  // Add merged order
                  updated.set(mergedOrderId, mergedProductsArray);
                  return updated;
                });

                // Store merged POs
                setSplitOrderPOs(prev => {
                  const updated = new Map(prev);
                  // Remove old splits
                  selectedSplitOrders.forEach(id => updated.delete(id));
                  // Add merged order - convert Map to Array
                  updated.set(mergedOrderId, Array.from(mergedPOsMap.values()));
                  return updated;
                });

                // Clear selection and switch to merged order
                setSelectedSplitOrders(new Set());
                setSelectedOrder(mergedOrderId);
              };

              const handleSplitOrder = () => {
                if (selectedProducts.size === 0) return;

                // Get selected products
                const selectedProductsList = products.filter(p => selectedProducts.has(p.id));
                
                // Open modal to configure split quantities
                setSplitModalProducts(selectedProductsList);
                setShowSplitModal(true);
              };

              const handleConfirmSplit = () => {
                if (splitModalProducts.length === 0) return;

                // Group products by customization method (or supplier if no customization method)
                const groupedProducts = new Map<string, Product[]>();
                
                splitModalProducts.forEach(product => {
                  const groupKey = product.customizationMethod || product.supplier || 'Other';
                  if (!groupedProducts.has(groupKey)) {
                    groupedProducts.set(groupKey, []);
                  }
                  groupedProducts.get(groupKey)!.push(product);
                });

                // Get base order number (e.g., ETH74501 from ETH74501-510259)
                const baseOrderNumber = selectedOrderData.name.replace(/^#/, '').split('-')[0];
                
                // Find existing split numbers for this base order
                const existingSplitNumbers = orders
                  .filter(o => {
                    const orderBase = o.name.replace(/^#/, '').split('-')[0];
                    return orderBase === baseOrderNumber && o.id.startsWith('split-');
                  })
                  .map(o => {
                    const parts = o.name.replace(/^#/, '').split('-');
                    const splitNum = parseInt(parts[parts.length - 1]);
                    return isNaN(splitNum) ? 0 : splitNum;
                  })
                  .filter(n => n > 0);

                const nextSplitNumber = existingSplitNumbers.length > 0 
                  ? Math.max(...existingSplitNumbers) + 1 
                  : 1;

                // Get purchase orders for this main order
                const fullOrderNumber = selectedOrderData.name.replace(/^#/, '').split('-').slice(0, 2).join('-');
                const baseOrderNum = selectedOrderData.name.replace(/^#/, '').split('-')[0];
                const purchaseOrders = purchaseOrdersData[fullOrderNumber] || purchaseOrdersData[baseOrderNum] || [];

                // Create new split orders
                const newOrders: Order[] = [];
                let currentSplitNumber = nextSplitNumber;
                const newSplitProducts = new Map<string, Product[]>();
                const newSplitPOs = new Map<string, PurchaseOrder[]>();

                groupedProducts.forEach((productGroup, groupKey) => {
                  const splitOrderName = `#${baseOrderNumber}-${currentSplitNumber}`;
                  const splitOrderId = `split-${baseOrderNumber}-${currentSplitNumber}-${Date.now()}`;
                  
                  // Get quantities for this split from the modal state
                  const splitProductsWithQuantities = productGroup.map(p => {
                    // Try to get quantity from splitQuantities map using the split order name pattern
                    const qtyKey = `split-${baseOrderNumber}-${currentSplitNumber}`;
                    const splitQty = splitQuantities.get(p.id)?.get(qtyKey) || p.quantity;
                    return {
                      ...p,
                      quantity: splitQty,
                      splitOrderId,
                      originalQuantity: p.quantity // Keep track of original quantity
                    };
                  });
                  
                  // Calculate total minutes based on products (rough estimate: 10 minutes per product)
                  const totalMinutes = splitProductsWithQuantities.reduce((sum, p) => sum + Math.ceil(p.quantity / 10) * 10, 0);
                  
                  const newOrder: Order = {
                    id: splitOrderId,
                    name: splitOrderName,
                    minutes: Math.max(totalMinutes, 30), // Minimum 30 minutes
                    status: 'IHP',
                    statusColor: 'bg-green-100 text-green-700',
                    dotColor: getDotColorByRatio(orders.length + newOrders.length),
                    deadline: selectedOrderData.deadline,
                    shelfLocation: productGroup[0]?.shelfLocation || selectedOrderData.shelfLocation,
                    vendor: productGroup[0]?.supplier || selectedOrderData.vendor,
                    fulfillmentStatus: selectedOrderData.fulfillmentStatus,
                    jobId: generateJobId(`split-${baseOrderNumber}-${currentSplitNumber}`),
                    orderStatus: 'In Production' as Order['orderStatus'] // Each split gets its own status, default to 'In Production'
                  };
                  
                  // Associate products with this split order
                  newSplitProducts.set(splitOrderId, splitProductsWithQuantities);
                  
                  // Find purchase orders that contain these products
                  const productSkus = new Set(productGroup.map(p => p.sku));
                  const associatedPOs = purchaseOrders
                    .filter(po => {
                      // Check if this PO's products match any of the split products
                      // For now, we'll match by supplier - in a real system, you'd check actual product associations
                      return productGroup.some(p => p.supplier === po.supplier);
                    })
                    .map(po => ({
                      ...po,
                      splitOrderId,
                      productIds: productGroup.filter(p => p.supplier === po.supplier).map(p => p.id)
                    }));
                  
                  if (associatedPOs.length > 0) {
                    newSplitPOs.set(splitOrderId, associatedPOs);
                  }
                  
                  newOrders.push(newOrder);
                  currentSplitNumber++;
                });

                // Add new split orders to the orders list
                setOrders(prev => [...prev, ...newOrders]);

                // Store split order products and POs
                setSplitOrderProducts(prev => {
                  const updated = new Map(prev);
                  newSplitProducts.forEach((prods, splitId) => {
                    updated.set(splitId, prods);
                  });
                  return updated;
                });

                setSplitOrderPOs(prev => {
                  const updated = new Map(prev);
                  newSplitPOs.forEach((pos, splitId) => {
                    updated.set(splitId, pos);
                  });
                  return updated;
                });

                // Calculate and store remaining quantities for main order products
                const remainingQuantities = new Map<string, number>();
                splitModalProducts.forEach(product => {
                  // Calculate total quantity split across all splits for this product
                  const productSplits = splitQuantities.get(product.id);
                  let totalSplitQty = 0;
                  if (productSplits) {
                    productSplits.forEach(qty => {
                      totalSplitQty += qty;
                    });
                  }
                  const remainingQty = product.quantity - totalSplitQty;
                  if (remainingQty > 0) {
                    remainingQuantities.set(product.id, remainingQty);
                  } else {
                    remainingQuantities.set(product.id, 0);
                  }
                });
                
                setMainOrderProductQuantities(prev => {
                  const updated = new Map(prev);
                  remainingQuantities.forEach((qty, productId) => {
                    updated.set(productId, qty);
                  });
                  return updated;
                });

                // Clear selected products and close modal
                setSelectedProducts(new Set());
                setShowSplitModal(false);
                setSplitModalProducts([]);
                setSplitQuantities(new Map());

                // Optionally select the first new split order
                if (newOrders.length > 0) {
                  setSelectedOrder(newOrders[0].id);
                }
              };
              
              return (
                <div className="flex flex-col flex-1 min-h-0">

                  {/* Split Orders Tabs - Always show for main orders, and when viewing splits */}
                  {shouldShowTabs && (
                    <div className="mb-6 border-b">
                      <div className="flex items-center gap-1 overflow-x-auto">
                        <button
                          onClick={() => setSelectedOrder(mainOrderId)}
                          className={`px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors flex items-center gap-2 ${
                            selectedOrder === mainOrderId
                              ? 'border-blue-500 text-blue-600'
                              : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                          }`}
                        >
                          <span>Main Order</span>
                          {(() => {
                            const mainOrder = orders.find(o => o.id === mainOrderId);
                            if (!mainOrder) return null;
                            const orderStatus = mainOrder.orderStatus;
                            const getStatusColor = (status: string) => {
                              switch (status) {
                                case 'Select an option':
                                  return 'bg-gray-50 text-gray-600 border-gray-200';
                                case 'In Production':
                                  return 'bg-blue-50 text-blue-600 border-blue-200';
                                case 'Ready to Ship':
                                  return 'bg-yellow-50 text-yellow-600 border-yellow-200';
                                case 'Shipped':
                                  return 'bg-green-50 text-green-600 border-green-200';
                                case 'Sold Out':
                                  return 'bg-red-50 text-red-600 border-red-200';
                                case 'Gift Card':
                                  return 'bg-purple-50 text-purple-600 border-purple-200';
                                case 'With Wash Labeling':
                                  return 'bg-indigo-50 text-indigo-600 border-indigo-200';
                                case 'Refunded':
                                  return 'bg-pink-50 text-pink-600 border-pink-200';
                                case 'Ready for Wash Labels':
                                  return 'bg-cyan-50 text-cyan-600 border-cyan-200';
                                case 'Ready For Pickup':
                                  return 'bg-orange-50 text-orange-600 border-orange-200';
                                case 'Cancel':
                                  return 'bg-gray-100 text-gray-700 border-gray-300';
                                case 'open':
                                  return 'bg-green-50 text-green-600 border-green-200';
                                case 'closed':
                                  return 'bg-gray-100 text-gray-700 border-gray-300';
                                default:
                                  return 'bg-gray-50 text-gray-600 border-gray-200';
                              }
                            };
                            let displayStatus: string = orderStatus;
                            if (orderStatus === 'open') {
                              displayStatus = 'Open';
                            } else if (orderStatus === 'closed') {
                              displayStatus = 'Closed';
                            }
                            return (
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap border ${getStatusColor(orderStatus)}`}>
                                {displayStatus}
                              </span>
                            );
                          })()}
                        </button>
                        {splitOrdersForMainOrder.map((splitOrder) => {
                          const splitProducts = splitOrderProducts.get(splitOrder.id) || [];
                          const splitPOs = splitOrderPOs.get(splitOrder.id) || [];
                          return (
                            <button
                              key={splitOrder.id}
                              onClick={() => setSelectedOrder(splitOrder.id)}
                              className={`px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors flex items-center gap-2 ${
                                selectedOrder === splitOrder.id
                                  ? 'border-blue-500 text-blue-600'
                                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={selectedSplitOrders.has(splitOrder.id)}
                                onChange={(e) => {
                                  e.stopPropagation();
                                  handleSelectSplitOrder(splitOrder.id);
                                }}
                                onClick={(e) => e.stopPropagation()}
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                              />
                              <span>{splitOrder.name}</span>
                              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-600 border border-red-100 whitespace-nowrap">
                                {splitOrder.shelfLocation}
                              </span>
                              {(() => {
                                const orderStatus = splitOrder.orderStatus;
                                const getStatusColor = (status: string) => {
                                  switch (status) {
                                    case 'Select an option':
                                      return 'bg-gray-50 text-gray-600 border-gray-200';
                                    case 'In Production':
                                      return 'bg-blue-50 text-blue-600 border-blue-200';
                                    case 'Ready to Ship':
                                      return 'bg-yellow-50 text-yellow-600 border-yellow-200';
                                    case 'Shipped':
                                      return 'bg-green-50 text-green-600 border-green-200';
                                    case 'Sold Out':
                                      return 'bg-red-50 text-red-600 border-red-200';
                                    case 'Gift Card':
                                      return 'bg-purple-50 text-purple-600 border-purple-200';
                                    case 'With Wash Labeling':
                                      return 'bg-indigo-50 text-indigo-600 border-indigo-200';
                                    case 'Refunded':
                                      return 'bg-pink-50 text-pink-600 border-pink-200';
                                    case 'Ready for Wash Labels':
                                      return 'bg-cyan-50 text-cyan-600 border-cyan-200';
                                    case 'Ready For Pickup':
                                      return 'bg-orange-50 text-orange-600 border-orange-200';
                                    case 'Cancel':
                                      return 'bg-gray-100 text-gray-700 border-gray-300';
                                    case 'open':
                                      return 'bg-green-50 text-green-600 border-green-200';
                                    case 'closed':
                                      return 'bg-gray-100 text-gray-700 border-gray-300';
                                    default:
                                      return 'bg-gray-50 text-gray-600 border-gray-200';
                                  }
                                };
                                let displayStatus: string = orderStatus;
                                if (orderStatus === 'open') {
                                  displayStatus = 'Open';
                                } else if (orderStatus === 'closed') {
                                  displayStatus = 'Closed';
                                }
                                return (
                                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap border ${getStatusColor(orderStatus)}`}>
                                    {displayStatus}
                                  </span>
                                );
                              })()}
                            </button>
                          );
                        })}
                      </div>
                      {selectedSplitOrders.size >= 2 && (
                        <div className="mt-3 flex items-center justify-between">
                          <div className="text-sm text-gray-600">
                            {selectedSplitOrders.size} split order{selectedSplitOrders.size !== 1 ? 's' : ''} selected
                          </div>
                          <button
                            onClick={handleMergeSplitOrders}
                            className="px-4 py-2 text-sm bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors"
                          >
                            Merge Selected Split Orders
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Order Name, Split Order Button, Print Button, Mark as Open/Closed Button, and Deadline */}
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {isMainOrder && (
                        <h2 className="text-xl font-semibold text-gray-900">{selectedOrderData.name.replace(/^#/, '').split('-')[0]}</h2>
                      )}
                      {isSplitOrder && (
                        <h2 className="text-xl font-semibold text-gray-900">{selectedOrderData.name}</h2>
                      )}
                      {selectedProducts.size > 0 && !isSplitOrder && (
                        <div className="text-sm text-gray-600">
                          {selectedProducts.size} product{selectedProducts.size !== 1 ? 's' : ''} selected
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-4">
                      {selectedProducts.size > 0 && !isSplitOrder && (
                        <button
                          onClick={handleSplitOrder}
                          className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                        >
                          Split Order
                        </button>
                      )}
                      <button
                        onClick={() => {
                          // Print packing slip functionality - prints current order's products
                          window.print();
                        }}
                        className="px-3 py-1.5 text-sm bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
                      >
                        Print Packing Slip
                      </button>
                      {/* Status Tag with Dropdown */}
                      <div className="relative" ref={statusDropdownRef}>
                        {(() => {
                          const orderStatus = selectedOrderData.orderStatus;
                          const getStatusColor = (status: string) => {
                            switch (status) {
                              case 'Select an option':
                                return 'bg-gray-50 text-gray-600 border-gray-200';
                              case 'In Production':
                                return 'bg-blue-50 text-blue-600 border-blue-200';
                              case 'Ready to Ship':
                                return 'bg-yellow-50 text-yellow-600 border-yellow-200';
                              case 'Shipped':
                                return 'bg-green-50 text-green-600 border-green-200';
                              case 'Sold Out':
                                return 'bg-red-50 text-red-600 border-red-200';
                              case 'Gift Card':
                                return 'bg-purple-50 text-purple-600 border-purple-200';
                              case 'With Wash Labeling':
                                return 'bg-indigo-50 text-indigo-600 border-indigo-200';
                              case 'Refunded':
                                return 'bg-pink-50 text-pink-600 border-pink-200';
                              case 'Ready for Wash Labels':
                                return 'bg-cyan-50 text-cyan-600 border-cyan-200';
                              case 'Ready For Pickup':
                                return 'bg-orange-50 text-orange-600 border-orange-200';
                              case 'Cancel':
                                return 'bg-gray-100 text-gray-700 border-gray-300';
                              case 'open':
                                return 'bg-green-50 text-green-600 border-green-200';
                              case 'closed':
                                return 'bg-gray-100 text-gray-700 border-gray-300';
                              default:
                                return 'bg-gray-50 text-gray-600 border-gray-200';
                            }
                          };
                          // Handle legacy 'open' and 'closed' statuses - convert to display format
                          let displayStatus: string = orderStatus;
                          if (orderStatus === 'open') {
                            displayStatus = 'Open';
                          } else if (orderStatus === 'closed') {
                            displayStatus = 'Closed';
                          }
                          return (
                            <button
                              ref={statusButtonRef}
                              onClick={(e) => {
                                e.stopPropagation();
                                setStatusDropdownOpen(!statusDropdownOpen);
                                setProductTableStatusDropdownOpen(false); // Close product table dropdown if open
                              }}
                              className={`px-3 py-1.5 rounded-full text-sm font-medium border whitespace-nowrap cursor-pointer hover:opacity-80 transition-opacity flex items-center gap-2 ${getStatusColor(orderStatus)}`}
                            >
                              <span>{displayStatus}</span>
                              <ChevronDownIcon className="size-3" />
                            </button>
                          );
                        })()}
                        {statusDropdownOpen && (
                          <div className="absolute right-0 top-full mt-1 z-50 w-64 overflow-hidden rounded-md border bg-white shadow-lg">
                            <div className="py-1">
                              {[
                                'In Production',
                                'Ready to Ship',
                                'Shipped',
                                'Sold Out',
                                'Gift Card',
                                'With Wash Labeling',
                                'Refunded',
                                'Ready for Wash Labels',
                                'Ready For Pickup'
                              ].map((status) => {
                                const getStatusColor = (s: string) => {
                                  switch (s) {
                                    case 'Select an option':
                                      return 'bg-gray-50 text-gray-600 border-gray-200';
                                    case 'In Production':
                                      return 'bg-blue-50 text-blue-600 border-blue-200';
                                    case 'Ready to Ship':
                                      return 'bg-yellow-50 text-yellow-600 border-yellow-200';
                                    case 'Shipped':
                                      return 'bg-green-50 text-green-600 border-green-200';
                                    case 'Sold Out':
                                      return 'bg-red-50 text-red-600 border-red-200';
                                    case 'Gift Card':
                                      return 'bg-purple-50 text-purple-600 border-purple-200';
                                    case 'With Wash Labeling':
                                      return 'bg-indigo-50 text-indigo-600 border-indigo-200';
                                    case 'Refunded':
                                      return 'bg-pink-50 text-pink-600 border-pink-200';
                                    case 'Ready for Wash Labels':
                                      return 'bg-cyan-50 text-cyan-600 border-cyan-200';
                                    case 'Ready For Pickup':
                                      return 'bg-orange-50 text-orange-600 border-orange-200';
                                    case 'Cancel':
                                      return 'bg-gray-100 text-gray-700 border-gray-300';
                                    case 'open':
                                      return 'bg-green-50 text-green-600 border-green-200';
                                    case 'closed':
                                      return 'bg-gray-100 text-gray-700 border-gray-300';
                                    default:
                                      return 'bg-gray-50 text-gray-600 border-gray-200';
                                  }
                                };
                                return (
                                  <button
                                    key={status}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      // Update the status for the currently selected order (works for both main and split orders)
                                      // Each split order maintains its own independent status
                                      setOrders(prev => {
                                        const currentOrder = prev.find(o => o.id === selectedOrderData.id);
                                        if (!currentOrder) return prev;
                                        
                                        const updated = prev.map(o => 
                                          o.id === selectedOrderData.id 
                                            ? { ...o, orderStatus: status as Order['orderStatus'] }
                                            : o
                                        );
                                        
                                        // If updating a split order, check if we need to update main order status
                                        const isCurrentSplitOrder = currentOrder.id.startsWith('split-');
                                        if (isCurrentSplitOrder) {
                                          const mainOrderBase = currentOrder.name.replace(/^#/, '').split('-')[0];
                                          const mainOrder = updated.find(o => {
                                            const orderBase = o.name.replace(/^#/, '').split('-')[0];
                                            return orderBase === mainOrderBase && !o.id.startsWith('split-') && 
                                              (o.name.replace(/^#/, '').split('-').length === 2 || !o.name.includes('-'));
                                          });
                                          
                                          if (mainOrder) {
                                            const splitOrdersForMain = updated.filter(o => {
                                              const orderBase = o.name.replace(/^#/, '').split('-')[0];
                                              return orderBase === mainOrderBase && o.id.startsWith('split-');
                                            });
                                            
                                            // If ALL splits are "Shipped" or "Ready For Pickup", close the main order
                                            if (splitOrdersForMain.length > 0) {
                                              const allSplitsShippedOrReady = splitOrdersForMain.every(split => 
                                                split.orderStatus === 'Shipped' || split.orderStatus === 'Ready For Pickup'
                                              );
                                              
                                              const newMainOrderStatus = allSplitsShippedOrReady ? 'closed' : 'open';
                                              
                                              if (mainOrder.orderStatus !== newMainOrderStatus) {
                                                return updated.map(o => 
                                                  o.id === mainOrder.id 
                                                    ? { ...o, orderStatus: newMainOrderStatus as Order['orderStatus'] }
                                                    : o
                                                );
                                              }
                                            }
                                          }
                                        }
                                        
                                        return updated;
                                      });
                                      setStatusDropdownOpen(false);
                                      setProductTableStatusDropdownOpen(false); // Also close product table dropdown
                                    }}
                                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors flex items-center gap-2 ${
                                      selectedOrderData.orderStatus === status ? 'bg-blue-50' : ''
                                    }`}
                                  >
                                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(status)}`}>
                                      {status}
                                    </span>
                                    {selectedOrderData.orderStatus === status && (
                                      <CheckIcon className="size-4 ml-auto text-blue-600" />
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                      <span className="px-2 py-2 rounded-full text-xs font-medium bg-red-50 text-red-600 border border-red-100 whitespace-nowrap flex items-center">
                        {formatDeadline(selectedOrderData.deadline)}
                      </span>
                    </div>
                  </div>

                  {/* Split Order Modal */}
                  {showSplitModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                      <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-4">
                          <h2 className="text-xl font-bold text-gray-900">Split Order - Configure Quantities</h2>
                          <button
                            onClick={() => {
                              setShowSplitModal(false);
                              setSplitModalProducts([]);
                              setSplitQuantities(new Map());
                            }}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            ✕
                          </button>
                        </div>
                        
                        <div className="mb-4">
                          <p className="text-sm text-gray-600 mb-4">
                            Specify quantities for each product in each split. Products are grouped by customization method.
                          </p>
                          
                          {/* Group products by customization method */}
                          {(() => {
                            const grouped = new Map<string, Product[]>();
                            splitModalProducts.forEach(product => {
                              const groupKey = product.customizationMethod || product.supplier || 'Other';
                              if (!grouped.has(groupKey)) {
                                grouped.set(groupKey, []);
                              }
                              grouped.get(groupKey)!.push(product);
                            });

                            const groups = Array.from(grouped.entries());
                            const numSplits = groups.length;

                            return (
                              <div className="space-y-6">
                                {groups.map(([groupKey, groupProducts], groupIdx) => {
                                  const splitOrderName = `#${selectedOrderData.name.replace(/^#/, '').split('-')[0]}-${groupIdx + 1}`;
                                  
                                  return (
                                    <div key={groupKey} className="border rounded-lg p-4">
                                      <h3 className="font-semibold text-gray-900 mb-3">
                                        {splitOrderName} - {groupKey}
                                      </h3>
                                      <div className="space-y-3">
                                        {groupProducts.map((product) => {
                                          const productSplitQty = splitQuantities.get(product.id)?.get(`split-${selectedOrderData.name.replace(/^#/, '').split('-')[0]}-${groupIdx + 1}`) || product.quantity;
                                          const remainingQty = product.quantity - Array.from(splitQuantities.get(product.id)?.values() || []).reduce((sum, qty) => sum + qty, 0) + productSplitQty;
                                          
                                          return (
                                            <div key={product.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                              <div className="flex-1">
                                                <div className="font-medium text-sm text-gray-900">{product.name}</div>
                                                <div className="text-xs text-gray-600">SKU: {product.sku} • Available: {remainingQty}</div>
                                              </div>
                                              <div className="flex items-center gap-2">
                                                <input
                                                  type="number"
                                                  min="0"
                                                  max={remainingQty}
                                                  value={productSplitQty}
                                                  onChange={(e) => {
                                                    const newQty = Math.max(0, Math.min(parseInt(e.target.value) || 0, remainingQty));
                                                    setSplitQuantities(prev => {
                                                      const updated = new Map(prev);
                                                      if (!updated.has(product.id)) {
                                                        updated.set(product.id, new Map());
                                                      }
                                                      updated.get(product.id)!.set(`split-${selectedOrderData.name.replace(/^#/, '').split('-')[0]}-${groupIdx + 1}`, newQty);
                                                      return updated;
                                                    });
                                                  }}
                                                  className="w-24 px-2 py-1 border border-gray-300 rounded text-sm"
                                                />
                                                <span className="text-sm text-gray-600">of {product.quantity}</span>
                                              </div>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            );
                          })()}
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                          <button
                            onClick={() => {
                              setShowSplitModal(false);
                              setSplitModalProducts([]);
                              setSplitQuantities(new Map());
                            }}
                            className="px-4 py-2 text-sm border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleConfirmSplit}
                            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                          >
                            Create Split Orders
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Product Table */}
                  <div className="flex-1 overflow-visible">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-gray-200 bg-gray-50">
                          <th className="p-3 text-left">
                            <input
                              type="checkbox"
                              ref={setSelectAllRef}
                              checked={allSelected}
                              onChange={handleSelectAll}
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                          </th>
                          <th className="p-3 text-left text-sm font-semibold text-gray-700">Product Name</th>
                          <th className="p-3 text-left text-sm font-semibold text-gray-700">Shelf Location</th>
                          <th className="p-3 text-left text-sm font-semibold text-gray-700">SKU</th>
                          <th className="p-3 text-left text-sm font-semibold text-gray-700">Status</th>
                          <th className="p-3 text-right text-sm font-semibold text-gray-700">Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((product) => {
                          const productWithSuppliers = product as Product & { suppliers?: Set<'ASC' | 'SSA' | 'SUPA' | 'INT ACT'> };
                          const suppliers = productWithSuppliers.suppliers || new Set([product.supplier!].filter(Boolean));
                          return (
                            <tr 
                              key={product.id} 
                              onClick={() => handleSelectProduct(product.id)}
                              className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                            >
                              <td className="p-3" onClick={(e) => e.stopPropagation()}>
                                <input
                                  type="checkbox"
                                  checked={selectedProducts.has(product.id)}
                                  onChange={() => handleSelectProduct(product.id)}
                                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 pointer-events-none"
                                />
                              </td>
                              <td className="p-3 text-sm text-gray-900">{product.name}</td>
                              <td className="p-3">
                                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-600 border border-red-100 whitespace-nowrap">
                                  {product.shelfLocation}
                                </span>
                              </td>
                              <td className="p-3 text-sm text-gray-600">{product.sku}</td>
                              <td className="p-3">
                                {(() => {
                                  const orderStatus = selectedOrderData.orderStatus;
                                  const getStatusColor = (status: string) => {
                                    switch (status) {
                                      case 'Select an option':
                                        return 'bg-gray-50 text-gray-600 border-gray-200';
                                      case 'In Production':
                                        return 'bg-blue-50 text-blue-600 border-blue-200';
                                      case 'Ready to Ship':
                                        return 'bg-yellow-50 text-yellow-600 border-yellow-200';
                                      case 'Shipped':
                                        return 'bg-green-50 text-green-600 border-green-200';
                                      case 'Sold Out':
                                        return 'bg-red-50 text-red-600 border-red-200';
                                      case 'Gift Card':
                                        return 'bg-purple-50 text-purple-600 border-purple-200';
                                      case 'With Wash Labeling':
                                        return 'bg-indigo-50 text-indigo-600 border-indigo-200';
                                      case 'Refunded':
                                        return 'bg-pink-50 text-pink-600 border-pink-200';
                                      case 'Ready for Wash Labels':
                                        return 'bg-cyan-50 text-cyan-600 border-cyan-200';
                                      case 'Ready For Pickup':
                                        return 'bg-orange-50 text-orange-600 border-orange-200';
                                      case 'Cancel':
                                        return 'bg-gray-100 text-gray-700 border-gray-300';
                                      case 'open':
                                        return 'bg-green-50 text-green-600 border-green-200';
                                      case 'closed':
                                        return 'bg-gray-100 text-gray-700 border-gray-300';
                                      default:
                                        return 'bg-gray-50 text-gray-600 border-gray-200';
                                    }
                                  };
                                  // Handle legacy 'open' and 'closed' statuses - convert to display format
                                  let displayStatus: string = orderStatus;
                                  if (orderStatus === 'open') {
                                    displayStatus = 'Open';
                                  } else if (orderStatus === 'closed') {
                                    displayStatus = 'Closed';
                                  }
                                  return (
                                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border whitespace-nowrap ${getStatusColor(orderStatus)}`}>
                                      {displayStatus}
                                    </span>
                                  );
                                })()}
                              </td>
                              <td className="p-3 text-sm text-gray-600 text-right">{product.quantity}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                      <tfoot>
                        <tr className="bg-gray-50 font-semibold">
                          <td className="p-3"></td>
                          <td colSpan={3} className="p-3 text-sm text-gray-900"></td>
                          <td className="p-3 text-sm text-gray-900 text-right">
                            {products.reduce((sum, product) => sum + product.quantity, 0)}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                  
                  {/* Purchase Orders Widget */}
                  {!selectedOrder && (
                  <div ref={purchaseOrdersRef} className="mt-8 -mx-4 sm:-mx-6 pt-6 border-t" style={{ backgroundColor: '#f4f4f4' }}>
                    <div className="mb-4 px-4 sm:px-6 pb-6">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h2 className="text-xl font-bold text-gray-900">Purchase Orders for {selectedOrderData.name.split('-')[0]}</h2>
                          <p className="text-sm text-gray-600 mt-1">Individual shipments associated with this order</p>
                        </div>
                      </div>
                      
                      {/* Purchase Order Filters */}
                      <div className="space-y-3 mt-4">
                        {/* Status Filters */}
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-medium text-gray-700">Filter by status:</span>
                          {(['Order Placed', 'In Transit', 'Received'] as const).map((status) => (
                            <button
                              key={status}
                              onClick={() => {
                                setPurchaseOrderStatusFilters(prev => {
                                  const newFilters = new Set(prev);
                                  if (newFilters.has(status)) {
                                    newFilters.delete(status);
                                  } else {
                                    newFilters.add(status);
                                  }
                                  return newFilters;
                                });
                              }}
                              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                                purchaseOrderStatusFilters.has(status)
                                  ? status === 'Order Placed' ? 'bg-gray-200 text-gray-900 border-gray-400' :
                                    status === 'In Transit' ? 'bg-blue-200 text-blue-900 border-blue-400' :
                                    'bg-emerald-200 text-emerald-900 border-emerald-400'
                                  : status === 'Order Placed' ? 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100' :
                                    status === 'In Transit' ? 'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100' :
                                    'bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100'
                              }`}
                            >
                              {status}
                            </button>
                          ))}
                        </div>
                        
                        {/* Supplier Filters */}
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-medium text-gray-700">Filter by supplier:</span>
                          {(['ASC', 'SSA', 'SUPA', 'INT ACT'] as const).map((supplier) => (
                            <button
                              key={supplier}
                              onClick={() => {
                                setPurchaseOrderSupplierFilters(prev => {
                                  const newFilters = new Set(prev);
                                  if (newFilters.has(supplier)) {
                                    newFilters.delete(supplier);
                                  } else {
                                    newFilters.add(supplier);
                                  }
                                  return newFilters;
                                });
                              }}
                              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                                purchaseOrderSupplierFilters.has(supplier)
                                  ? supplier === 'ASC' ? 'bg-purple-200 text-purple-900 border-purple-400' :
                                    supplier === 'SSA' ? 'bg-green-200 text-green-900 border-green-400' :
                                    supplier === 'SUPA' ? 'bg-orange-200 text-orange-900 border-orange-400' :
                                    'bg-pink-200 text-pink-900 border-pink-400' // INT ACT
                                  : supplier === 'ASC' ? 'bg-purple-50 text-purple-600 border-purple-200 hover:bg-purple-100' :
                                    supplier === 'SSA' ? 'bg-green-50 text-green-600 border-green-200 hover:bg-green-100' :
                                    supplier === 'SUPA' ? 'bg-orange-50 text-orange-600 border-orange-200 hover:bg-orange-100' :
                                    'bg-pink-50 text-pink-600 border-pink-200 hover:bg-pink-100' // INT ACT
                              }`}
                            >
                              {supplier}
                            </button>
                          ))}
                        </div>
                        
                        {/* Clear Filters Button */}
                        {(purchaseOrderStatusFilters.size > 0 || purchaseOrderSupplierFilters.size > 0) && (
                          <button
                            onClick={() => {
                              setPurchaseOrderStatusFilters(new Set());
                              setPurchaseOrderSupplierFilters(new Set());
                            }}
                            className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 underline"
                          >
                            Clear all filters
                          </button>
                        )}
                      </div>
                    </div>
                    
                    {(() => {
                      // Use the displayPurchaseOrders that was already filtered for split orders
                      let filteredPOs = displayPurchaseOrders;
                      
                      // Filter purchase orders by status if filters are applied
                      if (purchaseOrderStatusFilters.size > 0) {
                        filteredPOs = filteredPOs.filter(po => purchaseOrderStatusFilters.has(po.status));
                      }
                      
                      // Filter purchase orders by supplier if filters are applied
                      if (purchaseOrderSupplierFilters.size > 0) {
                        filteredPOs = filteredPOs.filter(po => purchaseOrderSupplierFilters.has(po.supplier));
                      }
                      
                      const purchaseOrders = filteredPOs;
                      
                      if (purchaseOrders.length === 0) {
                        return (
                          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                            <p className="text-gray-600">
                              {(purchaseOrderStatusFilters.size > 0 || purchaseOrderSupplierFilters.size > 0)
                                ? 'No purchase orders found matching the selected filters.'
                                : 'No purchase orders found for this order number.'}
                            </p>
                          </div>
                        );
                      }
                      
                      return (
                        <div className="space-y-4">
                          {purchaseOrders.map((po, index) => (
                            <div 
                              id={`po-card-${po.id}`}
                              key={`${po.id}-${index}`} 
                              onClick={() => {
                                // Store purchase order data in localStorage for the detail page
                                localStorage.setItem(`purchaseOrder_${po.id}`, JSON.stringify(po));
                                router.push(`/receiving/purchase-order/${po.id}`);
                              }}
                              className="bg-white border border-gray-200 rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                            >
                              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                                <div className="flex items-center justify-between flex-wrap gap-3">
                                  <div className="flex items-center gap-3 flex-wrap">
                                    <h3 className="text-lg font-semibold text-gray-900">{po.purchaseOrderNumber}</h3>
                                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap border ${
                                      po.supplier === 'ASC' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                                      po.supplier === 'SSA' ? 'bg-green-50 text-green-600 border-green-100' :
                                      po.supplier === 'SUPA' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                                      'bg-pink-50 text-pink-600 border-pink-100' // INT ACT
                                    }`}>
                                      {po.supplier}
                                    </span>
                                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap border ${
                                      po.status === 'Order Placed' ? 'bg-gray-200 text-gray-900 border-gray-400' :
                                      po.status === 'In Transit' ? 'bg-blue-200 text-blue-900 border-blue-400' :
                                      'bg-emerald-200 text-emerald-900 border-emerald-400' // Received
                                    }`}>
                                      {po.status}
                                    </span>
                                  </div>
                                  {po.expectedDate && (
                                    <div className="text-sm text-gray-600">
                                      Expected: {po.expectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="p-4">
                                <table className="w-full border-collapse">
                                  <thead>
                                    <tr className="border-b border-gray-200 bg-gray-50">
                                      <th className="p-3 text-left text-sm font-semibold text-gray-700">Product Name</th>
                                      <th className="p-3 text-left text-sm font-semibold text-gray-700">Shelf Location</th>
                                      <th className="p-3 text-left text-sm font-semibold text-gray-700">SKU</th>
                                      <th className="p-3 text-right text-sm font-semibold text-gray-700">Quantity</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {/* Show products for this purchase order from this supplier */}
                                    {(() => {
                                      const productNames = ['Custom Socks - Black', 'Custom Socks - White', 'Custom Socks - Navy', 'Custom Socks - Red'];
                                      const productSkus = ['SKU-001-BLK', 'SKU-002-WHT', 'SKU-003-NVY', 'SKU-004-RED'];
                                      const shelfNumbers = [5, 8, 12, 3, 7, 15, 2, 9, 14, 6];
                                      const shelfLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'];
                                      
                                      // Distribute products across purchase orders
                                      const itemsPerProduct = Math.floor(po.totalItems / productNames.length);
                                      const remainder = po.totalItems % productNames.length;
                                      const quantityPerItem = Math.floor(po.totalQuantity / po.totalItems);
                                      const quantityRemainder = po.totalQuantity % po.totalItems;
                                      
                                      const poProducts: Array<{ name: string; sku: string; quantity: number; shelfLocation: string }> = [];
                                      
                                      productNames.forEach((name, idx) => {
                                        const itemCount = itemsPerProduct + (idx < remainder ? 1 : 0);
                                        if (itemCount > 0) {
                                          const baseQuantity = quantityPerItem;
                                          const extraQuantity = idx < quantityRemainder ? 1 : 0;
                                          const totalQuantity = baseQuantity * itemCount + extraQuantity;
                                          
                                          if (totalQuantity > 0) {
                                            const shelfNum = shelfNumbers[idx % shelfNumbers.length];
                                            const shelfLetter = shelfLetters[idx % shelfLetters.length];
                                            poProducts.push({
                                              name,
                                              sku: productSkus[idx],
                                              quantity: totalQuantity,
                                              shelfLocation: `${shelfNum}${shelfLetter}`
                                            });
                                          }
                                        }
                                      });
                                      
                                      return poProducts.map((product, idx) => (
                                        <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                                          <td className="p-3 text-sm text-gray-900">{product.name}</td>
                                          <td className="p-3">
                                            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-600 border border-red-100 whitespace-nowrap">
                                              {product.shelfLocation}
                                            </span>
                                          </td>
                                          <td className="p-3 text-sm text-gray-600">{product.sku}</td>
                                          <td className="p-3 text-sm text-gray-600 text-right">{product.quantity}</td>
                                        </tr>
                                      ));
                                    })()}
                                  </tbody>
                                  <tfoot>
                                    <tr className="bg-gray-50 font-semibold">
                                      <td colSpan={3} className="p-3 text-sm text-gray-900"></td>
                                      <td className="p-3 text-sm text-gray-900 text-right">{po.totalQuantity}</td>
                                    </tr>
                                  </tfoot>
                                </table>
                                {po.receivedDate && (
                                  <div className="mt-3 text-sm text-gray-600">
                                    Received: {po.receivedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      );
                    })()}
                  </div>
                  )}
                </div>
              );
            })() : (
              <div className="flex flex-col flex-1 min-h-0">
                {/* Main content area - ready for receiving functionality */}
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-gray-500">Select an order from the sidebar to view details</p>
                </div>
              </div>
            )}
          </main>
        </div>
      </SidebarProvider>

      {/* Order Detail Modal - Slides in from right */}
      {selectedOrderForModal && (
        <div 
          className="fixed inset-0 z-[200] flex"
          onClick={() => {
            // Check if all products are fully printed before closing
            if (selectedOrderForModal) {
              const allProductsComplete = products.every(product => {
                const productPrintedLogos = printedLogos.get(product.id) || new Set<string>();
                return (product.sizes ?? []).every(sizeDetail => {
                  const logoKeys = sizeDetail.logos.map(logo => `${sizeDetail.size}-${logo.logo}`);
                  return logoKeys.every(key => productPrintedLogos.has(key));
                });
              });
              
              if (allProductsComplete) {
                setCompletedOrders(prev => {
                  const newSet = new Set(prev);
                  newSet.add(selectedOrderForModal.id);
                  return newSet;
                });
              }
            }
            
            setSelectedOrderForModal(null);
            setSelectedAssignmentForModal(null);
            setCurrentImageIndex(0);
            setCurrentProductIndex(0);
            setIsEditingTime(false);
            setEditedTimeSlot(null);
            setEditedEndTimeSlot(null);
            setEditedColumn(null);
            setEditedDate(null);
            // Don't reset printedLogos - keep state per product
          }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50" />
          
          {/* Modal Content - Slides in from right */}
          <div 
            className="absolute right-0 top-0 bottom-0 left-0 w-full bg-white shadow-2xl flex flex-col animate-slide-in-right"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b shrink-0">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-xl font-semibold">{selectedOrderForModal.name}</span>
                {/* Product Name Badge */}
                {products[currentProductIndex] && (
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200 whitespace-nowrap">
                    Product {currentProductIndex + 1}
                  </span>
                )}
                {/* Shelf Location Badge */}
                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-orange-50 text-orange-600 border border-orange-100 whitespace-nowrap">
                  {selectedOrderForModal.shelfLocation}
                </span>
                {/* Deadline Badge */}
                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-600 border border-red-100 whitespace-nowrap">
                  {formatDeadline(selectedOrderForModal.deadline)}
                </span>
                {/* Assignment Date/Time */}
                {selectedAssignmentForModal && (
                  <div className="flex items-center gap-2">
                    {!isEditingTime ? (
                      <>
                        <span className="text-sm text-gray-600">
                          {formatAssignmentDateTime(selectedAssignmentForModal)}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsEditingTime(true);
                            setEditedTimeSlot(selectedAssignmentForModal.startTimeSlot);
                            const endTimeSlot = selectedAssignmentForModal.startTimeSlot + selectedAssignmentForModal.durationSlots - 1;
                            setEditedEndTimeSlot(Math.min(17, endTimeSlot)); // Clamp to max slot
                            setEditedColumn(selectedAssignmentForModal.column);
                            setEditedDate(new Date(selectedAssignmentForModal.date));
                          }}
                          className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                          title="Edit time"
                        >
                          <PencilIcon className="size-4 text-gray-500" />
                        </button>
                      </>
                    ) : (
                      <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded border">
                        {/* Production Line Select */}
                        <select
                          value={editedColumn ?? selectedAssignmentForModal.column}
                          onChange={(e) => setEditedColumn(Number(e.target.value))}
                          className="text-sm border border-gray-300 rounded px-2 py-1 bg-white"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {Array.from({ length: 5 }, (_, i) => (
                            <option key={i} value={i}>
                              Production Line #{i + 1}
                            </option>
                          ))}
                        </select>
                        
                        {/* Start Time Select */}
                        <label className="text-xs text-gray-600 flex items-center gap-1">
                          Start:
                          <select
                            value={editedTimeSlot ?? selectedAssignmentForModal.startTimeSlot}
                            onChange={(e) => {
                              const newStart = Number(e.target.value);
                              setEditedTimeSlot(newStart);
                              // Ensure end time is after start time
                              if (editedEndTimeSlot !== null && editedEndTimeSlot < newStart) {
                                setEditedEndTimeSlot(newStart);
                              }
                            }}
                            className="text-sm border border-gray-300 rounded px-2 py-1 bg-white"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {Array.from({ length: 18 }, (_, i) => {
                              const hour = 8 + Math.floor(i / 2);
                              const minutes = (i % 2) * 30;
                              const isAM = hour < 12;
                              const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
                              const displayTime = minutes === 0 
                                ? `${displayHour}${isAM ? 'am' : 'pm'}`
                                : `${displayHour}:${minutes.toString().padStart(2, '0')}${isAM ? 'am' : 'pm'}`;
                              return (
                                <option key={i} value={i}>
                                  {displayTime}
                                </option>
                              );
                            })}
                          </select>
                        </label>
                        
                        {/* End Time Select */}
                        <label className="text-xs text-gray-600 flex items-center gap-1">
                          End:
                          <select
                            value={editedEndTimeSlot ?? (selectedAssignmentForModal.startTimeSlot + selectedAssignmentForModal.durationSlots - 1)}
                            onChange={(e) => {
                              const newEnd = Number(e.target.value);
                              setEditedEndTimeSlot(newEnd);
                              // Ensure start time is before end time
                              if (editedTimeSlot !== null && editedTimeSlot > newEnd) {
                                setEditedTimeSlot(newEnd);
                              }
                            }}
                            className="text-sm border border-gray-300 rounded px-2 py-1 bg-white"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {Array.from({ length: 18 }, (_, i) => {
                              const hour = 8 + Math.floor(i / 2);
                              const minutes = (i % 2) * 30;
                              const isAM = hour < 12;
                              const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
                              const displayTime = minutes === 0 
                                ? `${displayHour}${isAM ? 'am' : 'pm'}`
                                : `${displayHour}:${minutes.toString().padStart(2, '0')}${isAM ? 'am' : 'pm'}`;
                              return (
                                <option key={i} value={i}>
                                  {displayTime}
                                </option>
                              );
                            })}
                          </select>
                        </label>
                        
                        {/* Save Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (selectedOrderForModal && selectedAssignmentForModal && editedTimeSlot !== null && editedEndTimeSlot !== null && editedColumn !== null && editedDate !== null) {
                              // Calculate duration from start and end time
                              const startSlot = editedTimeSlot;
                              const endSlot = editedEndTimeSlot;
                              
                              // Ensure end is after start
                              if (endSlot < startSlot) {
                                alert('End time must be after start time.');
                                return;
                              }
                              
                              const durationSlots = endSlot - startSlot + 1; // Inclusive of both start and end
                              
                              // Validate duration
                              if (durationSlots < 1) {
                                alert('Duration must be at least 30 minutes.');
                                return;
                              }
                              
                              // Update the timeline assignment
                              setTimelineAssignments(prev => {
                                const newMap = new Map(prev);
                                
                                // Remove old assignment
                                const oldCellKey = getCellKey(selectedAssignmentForModal.date, selectedAssignmentForModal.column, selectedAssignmentForModal.startTimeSlot);
                                newMap.delete(oldCellKey);
                                
                                // Check for conflicts at new location
                                const tempMap = new Map(prev);
                                tempMap.delete(oldCellKey);
                                
                                // Check if new slot is booked out
                                if (isTimeSlotBookedOut(editedColumn, editedDate, startSlot, durationSlots)) {
                                  alert('This time slot is booked out. Please choose another time.');
                                  return prev;
                                }
                                
                                // Check if new slot is occupied
                                let finalTimeSlot = startSlot;
                                if (isTimeSlotOccupied(tempMap, editedColumn, startSlot, durationSlots, selectedOrderForModal.id)) {
                                  const availableSlot = findNextAvailableSlot(tempMap, editedColumn, startSlot, durationSlots, selectedOrderForModal.id);
                                  if (availableSlot === null) {
                                    alert('No available time slot found. Please choose another time.');
                                    return prev;
                                  }
                                  finalTimeSlot = availableSlot;
                                }
                                
                                // Ensure duration doesn't exceed available time slots
                                const maxDuration = 18 - finalTimeSlot;
                                const finalDurationSlots = Math.min(durationSlots, maxDuration);
                                
                                // Add new assignment
                                const newCellKey = getCellKey(editedDate, editedColumn, finalTimeSlot);
                                const updatedAssignment: TimelineAssignment = {
                                  ...selectedAssignmentForModal,
                                  startTimeSlot: finalTimeSlot,
                                  column: editedColumn,
                                  date: editedDate,
                                  durationSlots: finalDurationSlots
                                };
                                newMap.set(newCellKey, updatedAssignment);
                                
                                // Update the modal's assignment reference
                                setSelectedAssignmentForModal(updatedAssignment);
                                
                                return newMap;
                              });
                              
                              setIsEditingTime(false);
                              setEditedTimeSlot(null);
                              setEditedEndTimeSlot(null);
                              setEditedColumn(null);
                              setEditedDate(null);
                            }
                          }}
                          className="p-1.5 hover:bg-green-100 rounded transition-colors text-green-600"
                          title="Save changes"
                        >
                          <CheckIcon className="size-4" />
                        </button>
                        
                        {/* Cancel Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsEditingTime(false);
                            setEditedTimeSlot(null);
                            setEditedEndTimeSlot(null);
                            setEditedColumn(null);
                            setEditedDate(null);
                          }}
                          className="p-1.5 hover:bg-red-100 rounded transition-colors text-red-600"
                          title="Cancel"
                        >
                          <XIcon className="size-4" />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <button
                onClick={() => {
                  // Check if all products are fully printed before closing
                  if (selectedOrderForModal) {
                    const allProductsComplete = products.every(product => {
                      const productPrintedLogos = printedLogos.get(product.id) || new Set<string>();
                      return (product.sizes ?? []).every(sizeDetail => {
                        const logoKeys = sizeDetail.logos.map(logo => `${sizeDetail.size}-${logo.logo}`);
                        return logoKeys.every(key => productPrintedLogos.has(key));
                      });
                    });
                    
                    if (allProductsComplete) {
                      setCompletedOrders(prev => {
                        const newSet = new Set(prev);
                        newSet.add(selectedOrderForModal.id);
                        return newSet;
                      });
                      // Store completion timestamp
                      setOrderCompletedTimestamps(prev => {
                        const newMap = new Map(prev);
                        if (!newMap.has(selectedOrderForModal.id)) {
                          newMap.set(selectedOrderForModal.id, new Date());
                        }
                        return newMap;
                      });
                    }
                  }
                  
                  setSelectedOrderForModal(null);
                  setSelectedAssignmentForModal(null);
                  setCurrentImageIndex(0);
                  setCurrentProductIndex(0);
                  setIsEditingTime(false);
                  setEditedTimeSlot(null);
                  setEditedEndTimeSlot(null);
                  setEditedColumn(null);
                  setEditedDate(null);
                  // Don't reset printedLogos - keep state per product
                }}
                className="p-2 hover:bg-gray-100 rounded transition-colors"
              >
                <XIcon className="size-5" />
              </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex overflow-hidden">
              {/* Left Panel - Order Details (1/3 width) */}
              <div className="w-1/3 border-r overflow-y-auto p-6">

                {/* Print Details Section */}
                <div className="relative">
                  <h3 className="text-lg font-bold mb-4">PRINT DETAILS</h3>
                  {products[currentProductIndex] && (
                    <div 
                      key={`product-${currentProductIndex}`}
                      className="animate-in fade-in duration-300"
                    >
                      <table className="w-full border border-black border-collapse">
                      {/* Table Header */}
                      <thead>
                        <tr className="bg-black text-white">
                          <th className="p-3 border border-white font-bold uppercase text-sm text-center">SIZE</th>
                          <th className="p-3 border border-white font-bold uppercase text-sm text-center">QTY</th>
                          <th className="p-3 border border-white font-bold uppercase text-sm text-center w-12">PRINTED</th>
                          <th className="p-3 border border-white font-bold uppercase text-sm text-left">LOGO</th>
                          <th className="p-3 border border-white font-bold uppercase text-sm text-left">LOGO SIZE</th>
                          <th className="p-3 border border-white font-bold uppercase text-sm text-left">SKU</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products[currentProductIndex] && (() => {
                          const currentProduct = products[currentProductIndex];
                          const productPrintedLogos = printedLogos.get(currentProduct.id) || new Set<string>();
                          
                          return (currentProduct.sizes ?? []).map((sizeDetail, sizeIndex) => {
                            const rowSpan = sizeDetail.logos.length;
                            const logoKeys = sizeDetail.logos.map(logo => `${sizeDetail.size}-${logo.logo}`);
                            const allLogosComplete = logoKeys.every(key => productPrintedLogos.has(key));
                            
                            return (
                              <React.Fragment key={`${sizeDetail.size}-${sizeIndex}`}>
                                {sizeDetail.logos.map((logo, logoIndex) => {
                                  const logoKey = `${sizeDetail.size}-${logo.logo}`;
                                  const isRowChecked = productPrintedLogos.has(logoKey);
                                
                                return (
                                  <tr key={`${sizeDetail.size}-${logo.logo}`}>
                                    {logoIndex === 0 && (
                                      <>
                                        <td rowSpan={rowSpan} className={`border border-black p-3 text-center align-middle ${allLogosComplete ? 'bg-gray-200 opacity-60' : 'bg-white'}`}>
                                          <div className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center font-bold text-xl mx-auto">
                                            {sizeDetail.size}
                                          </div>
                                        </td>
                                        <td rowSpan={rowSpan} className={`border border-black p-3 text-center align-middle ${allLogosComplete ? 'bg-gray-200 opacity-60' : 'bg-white'}`}>
                                          <span className="text-2xl font-bold">{sizeDetail.quantity}</span>
                                        </td>
                                      </>
                                    )}
                                    <td className={`border border-black p-3 text-center ${isRowChecked ? 'bg-gray-200 opacity-60' : 'bg-white'}`}>
                                      <input
                                        type="checkbox"
                                        checked={isRowChecked}
                                        onChange={(e) => {
                                          setPrintedLogos(prev => {
                                            const newMap = new Map(prev);
                                            const productId = currentProduct.id;
                                            const productSet = new Set(newMap.get(productId) || []);
                                            
                                            if (e.target.checked) {
                                              productSet.add(logoKey);
                                            } else {
                                              productSet.delete(logoKey);
                                            }
                                            
                                            newMap.set(productId, productSet);
                                            return newMap;
                                          });
                                        }}
                                        className="w-4 h-4 cursor-pointer"
                                      />
                                    </td>
                                    <td className={`border border-black p-3 font-bold uppercase ${isRowChecked ? 'bg-gray-200 opacity-60' : 'bg-white'}`}>{logo.logo}</td>
                                    <td className={`border border-black p-3 ${isRowChecked ? 'bg-gray-200 opacity-60' : 'bg-white'}`}>{logo.logoSize}</td>
                                    <td className={`border border-black p-3 ${isRowChecked ? 'bg-gray-200 opacity-60' : 'bg-white'}`}>{logo.sku}</td>
                                  </tr>
                                );
                              })}
                            </React.Fragment>
                            );
                          });
                        })()}
                      </tbody>
                    </table>
                    </div>
                  )}
                  
                  {/* Completion Timestamp */}
                  {selectedOrderForModal && orderCompletedTimestamps.has(selectedOrderForModal.id) && (() => {
                    const completionDate = orderCompletedTimestamps.get(selectedOrderForModal.id)!;
                    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                    const dayOfWeek = days[completionDate.getDay()];
                    const month = months[completionDate.getMonth()];
                    const day = completionDate.getDate();
                    const year = completionDate.getFullYear();
                    const hours = completionDate.getHours();
                    const minutes = completionDate.getMinutes();
                    const isAM = hours < 12;
                    const displayHour = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
                    const timeStr = `${displayHour}:${minutes.toString().padStart(2, '0')}${isAM ? 'am' : 'pm'}`;
                    
                    return (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-600">
                          Marked as printed on {dayOfWeek}, {month} {day}, {year} at {timeStr}
                        </p>
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* Right Panel - Product Images (2/3 width) */}
              <div className="w-2/3 flex flex-col">
                <div className="flex-1 flex items-center justify-center p-2 bg-gray-50 relative">
                  {/* Carousel Container - fills available space */}
                  <div className="relative w-full h-full flex items-center justify-center">
                    {/* Previous Arrow */}
                    {products[currentProductIndex] && (products[currentProductIndex].images?.length ?? 0) > 1 && (
                      <button
                        onClick={() => {
                          const currentProduct = products[currentProductIndex];
                          const prevIndex = currentImageIndex > 0 ? currentImageIndex - 1 : (currentProduct.images ?? []).length - 1;
                          setCurrentImageIndex(prevIndex);
                        }}
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors border border-gray-200"
                        aria-label="Previous image"
                      >
                        <ChevronLeftIcon className="size-5 text-gray-700" />
                      </button>
                    )}
                    
                    {/* Image Container with 4:5 aspect ratio - maximizes size within container */}
                    <div 
                      className="relative flex items-center justify-center"
                      style={{ 
                        width: 'calc(100% - 5rem)',
                        height: 'calc(100% - 3rem)',
                        maxWidth: 'min(calc(100% - 5rem), calc((100vh - 200px) * 0.8 * 0.8))',
                        maxHeight: 'calc(100% - 3rem)',
                        aspectRatio: '4/5'
                      }}
                    >
                      {products[currentProductIndex] && (products[currentProductIndex].images ?? []).map((imageId, imageIndex) => (
                        <div
                          key={`${products[currentProductIndex].id}-${imageId}`}
                          className={`absolute inset-0 transition-opacity duration-300 ${
                            imageIndex === currentImageIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
                          }`}
                        >
                          <div className="w-full h-full bg-white border rounded-lg flex items-center justify-center">
                            <span className="text-gray-400 text-lg">
                              {products[currentProductIndex].name} Image {imageIndex + 1}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Next Arrow */}
                    {products[currentProductIndex] && (products[currentProductIndex].images?.length ?? 0) > 1 && (
                      <button
                        onClick={() => {
                          const currentProduct = products[currentProductIndex];
                          const nextIndex = currentImageIndex < (currentProduct.images ?? []).length - 1 ? currentImageIndex + 1 : 0;
                          setCurrentImageIndex(nextIndex);
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors border border-gray-200"
                        aria-label="Next image"
                      >
                        <ChevronRightIcon className="size-5 text-gray-700" />
                      </button>
                    )}
                    
                    {/* Carousel Indicators - positioned at bottom */}
                    {products[currentProductIndex] && (products[currentProductIndex].images?.length ?? 0) > 1 && (
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex justify-center gap-2">
                        {(products[currentProductIndex].images ?? []).map((_, imageIndex) => (
                          <button
                            key={imageIndex}
                            onClick={() => setCurrentImageIndex(imageIndex)}
                            className={`h-2 rounded-full transition-all ${
                              imageIndex === currentImageIndex
                                ? 'w-8 bg-gray-700'
                                : 'w-2 bg-gray-300 hover:bg-gray-400'
                            }`}
                            aria-label={`Go to image ${imageIndex + 1}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t px-6 py-4 flex items-center justify-between shrink-0 bg-white">
              <div className="flex items-center gap-3">
                <Button 
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                  onClick={() => {
                    if (!products[currentProductIndex]) return;
                    
                    // Check all logos for current product
                    const currentProduct = products[currentProductIndex];
                    const allLogoKeys: string[] = [];
                    (currentProduct.sizes ?? []).forEach(sizeDetail => {
                      sizeDetail.logos.forEach(logo => {
                        allLogoKeys.push(`${sizeDetail.size}-${logo.logo}`);
                      });
                    });
                    
                    // Mark all logos as printed for current product
                    setPrintedLogos(prev => {
                      const newMap = new Map(prev);
                      const productSet = new Set(allLogoKeys);
                      newMap.set(currentProduct.id, productSet);
                      return newMap;
                    });
                    
                    // Move to next product with transition
                    if (currentProductIndex < products.length - 1) {
                      // Add a small delay for visual feedback
                      setTimeout(() => {
                        const nextIndex = currentProductIndex + 1;
                        setCurrentProductIndex(nextIndex);
                        setCurrentImageIndex(0); // Reset to first image of the new product
                        // Don't reset printedLogos - keep state per product
                      }, 300); // 300ms delay to show the checkmarks before transition
                    }
                  }}
                >
                  Mark As Printed
                </Button>
                <Button variant="outline">
                  View order
                </Button>
                <Button variant="outline">
                  Edit
                </Button>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => {
                    if (currentProductIndex > 0) {
                      const prevProductIndex = currentProductIndex - 1;
                      setCurrentProductIndex(prevProductIndex);
                      setCurrentImageIndex(0); // Reset to first image of the new product
                      // Don't reset printedLogos - keep state per product
                    }
                  }}
                  disabled={currentProductIndex === 0}
                  className={`text-sm transition-colors ${
                    currentProductIndex === 0 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  &lt; Previous
                </button>
                <div className="flex items-center gap-2">
                  {products.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentProductIndex(index);
                        setCurrentImageIndex(0); // Reset to first image of the selected product
                        // Don't reset printedLogos - keep state per product
                      }}
                      className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
                        currentProductIndex === index
                          ? 'bg-gray-900 text-white'
                          : 'bg-white border border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => {
                    if (currentProductIndex < products.length - 1) {
                      const nextProductIndex = currentProductIndex + 1;
                      setCurrentProductIndex(nextProductIndex);
                      setCurrentImageIndex(0); // Reset to first image of the new product
                      // Don't reset printedLogos - keep state per product
                    }
                  }}
                  disabled={currentProductIndex === products.length - 1}
                  className={`text-sm transition-colors ${
                    currentProductIndex === products.length - 1 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Next &gt;
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ReceivingPage
