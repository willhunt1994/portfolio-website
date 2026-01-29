'use client';

import Image from 'next/image';
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  SettingsIcon,
  UserIcon,
  SearchIcon,
  FilterIcon,
  LoaderIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
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
  sizes: SizeDetail[];
  images: string[]; // Array of image URLs or identifiers
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

type ColorFilter = 'red' | 'green' | 'purple' | 'orange';
type DeadlineFilter = 'overdue' | 'due-this-week' | 'due-next-week' | 'due-later';
type ShelfFilter = number; // 1-18

const DashboardPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [colorFilters, setColorFilters] = useState<Set<ColorFilter>>(new Set());
  const [deadlineFilters, setDeadlineFilters] = useState<Set<DeadlineFilter>>(new Set());
  const [shelfFilters, setShelfFilters] = useState<Set<ShelfFilter>>(new Set());
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

  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoaded, setOrdersLoaded] = useState(false);
  
  // Generate initial orders on client side only to avoid hydration mismatch
  useEffect(() => {
    if (!ordersLoaded) {
      const initialOrders: Order[] = [];
      for (let i = 0; i < INITIAL_LOAD; i++) {
        const uniqueId = generateUniqueId();
        initialOrders.push({
          id: uniqueId,
          name: `#${uniqueId.split('-')[0]}-${uniqueId.split('-')[1]}`,
          minutes: Math.floor(Math.random() * 111) + 10, // 10-120 minutes
          status: 'IHP',
          statusColor: 'bg-green-100 text-green-700',
          dotColor: getDotColorByRatio(i),
          deadline: generateDeadline(),
          shelfLocation: generateShelfLocation()
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

  // Memoized filtered orders for better performance
  const filteredOrders = useMemo(() => {
    const searchLower = searchQuery.toLowerCase().trim();
    return orders.filter(order => {
      const matchesSearch = searchLower === '' || order.name.toLowerCase().includes(searchLower);
      const matchesColor = colorFilters.size === 0 || colorFilters.has(order.dotColor);
      const matchesDeadline = matchesDeadlineFilter(order.deadline, deadlineFilters);
      const matchesShelf = matchesShelfFilter(order.shelfLocation, shelfFilters);
      return matchesSearch && matchesColor && matchesDeadline && matchesShelf;
    });
  }, [orders, searchQuery, colorFilters, deadlineFilters, shelfFilters]);

  const filterCount = colorFilters.size + deadlineFilters.size + shelfFilters.size;

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

  const clearAllFilters = useCallback(() => {
    setColorFilters(new Set());
    setDeadlineFilters(new Set());
    setShelfFilters(new Set());
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
          newOrders.push({
            id: uniqueId,
            name: `#${uniqueId.split('-')[0]}-${uniqueId.split('-')[1]}`,
            minutes: Math.floor(Math.random() * 111) + 10, // 10-120 minutes
            status: 'IHP',
            statusColor: 'bg-green-100 text-green-700',
            dotColor: getDotColorByRatio(startIndex + i),
            deadline: generateDeadline(),
            shelfLocation: generateShelfLocation()
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
              <h1 className="text-xs italic text-gray-500 mb-2">Timeline</h1>
              
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
                      <div
                        onClick={() => toggleColorFilter('red')}
                        className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                      >
                        <div className="flex items-center gap-2 w-full">
                          <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                            colorFilters.has('red') ? 'bg-red-500 border-red-500' : 'border-gray-300'
                          }`}>
                            {colorFilters.has('red') && (
                              <span className="text-white text-xs">✓</span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 flex-1">
                            <div className="w-2 h-2 rounded bg-red-500" />
                            <span className="text-sm">No product or artwork</span>
                          </div>
                        </div>
                      </div>
                      <div
                        onClick={() => toggleColorFilter('purple')}
                        className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                      >
                        <div className="flex items-center gap-2 w-full">
                          <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                            colorFilters.has('purple') ? 'bg-purple-500 border-purple-500' : 'border-gray-300'
                          }`}>
                            {colorFilters.has('purple') && (
                              <span className="text-white text-xs">✓</span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 flex-1">
                            <div className="w-2 h-2 rounded bg-purple-500" />
                            <span className="text-sm">No product but yes artwork</span>
                          </div>
                        </div>
                      </div>
                      <div
                        onClick={() => toggleColorFilter('orange')}
                        className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                      >
                        <div className="flex items-center gap-2 w-full">
                          <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                            colorFilters.has('orange') ? 'bg-orange-500 border-orange-500' : 'border-gray-300'
                          }`}>
                            {colorFilters.has('orange') && (
                              <span className="text-white text-xs">✓</span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 flex-1">
                            <div className="w-2 h-2 rounded bg-orange-500" />
                            <span className="text-sm">Product yes but no artwork</span>
                          </div>
                        </div>
                      </div>
                      <div
                        onClick={() => toggleColorFilter('green')}
                        className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                      >
                        <div className="flex items-center gap-2 w-full">
                          <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                            colorFilters.has('green') ? 'bg-green-500 border-green-500' : 'border-gray-300'
                          }`}>
                            {colorFilters.has('green') && (
                              <span className="text-white text-xs">✓</span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 flex-1">
                            <div className="w-2 h-2 rounded bg-green-500" />
                            <span className="text-sm">Both delivered, ready for production</span>
                          </div>
                        </div>
                      </div>
                      <div className="-mx-1 my-1 h-px bg-muted" />
                      <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                        Deadline
                      </div>
                      <div
                        onClick={() => toggleDeadlineFilter('overdue')}
                        className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                      >
                        <div className="flex items-center gap-2 w-full">
                          <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                            deadlineFilters.has('overdue') ? 'bg-red-500 border-red-500' : 'border-gray-300'
                          }`}>
                            {deadlineFilters.has('overdue') && (
                              <span className="text-white text-xs">✓</span>
                            )}
                          </div>
                          <span className="text-sm">Overdue</span>
                        </div>
                      </div>
                      <div
                        onClick={() => toggleDeadlineFilter('due-this-week')}
                        className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                      >
                        <div className="flex items-center gap-2 w-full">
                          <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                            deadlineFilters.has('due-this-week') ? 'bg-orange-500 border-orange-500' : 'border-gray-300'
                          }`}>
                            {deadlineFilters.has('due-this-week') && (
                              <span className="text-white text-xs">✓</span>
                            )}
                          </div>
                          <span className="text-sm">Due this week</span>
                        </div>
                      </div>
                      <div
                        onClick={() => toggleDeadlineFilter('due-next-week')}
                        className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                      >
                        <div className="flex items-center gap-2 w-full">
                          <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                            deadlineFilters.has('due-next-week') ? 'bg-yellow-500 border-yellow-500' : 'border-gray-300'
                          }`}>
                            {deadlineFilters.has('due-next-week') && (
                              <span className="text-white text-xs">✓</span>
                            )}
                          </div>
                          <span className="text-sm">Due next week</span>
                        </div>
                      </div>
                      <div
                        onClick={() => toggleDeadlineFilter('due-later')}
                        className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                      >
                        <div className="flex items-center gap-2 w-full">
                          <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                            deadlineFilters.has('due-later') ? 'bg-green-500 border-green-500' : 'border-gray-300'
                          }`}>
                            {deadlineFilters.has('due-later') && (
                              <span className="text-white text-xs">✓</span>
                            )}
                          </div>
                          <span className="text-sm">Due later</span>
                        </div>
                      </div>
                      <div className="-mx-1 my-1 h-px bg-muted" />
                      <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                        Shelf Number
                      </div>
                      <div className="grid grid-cols-3 gap-1 px-2 pb-2">
                        {Array.from({ length: 18 }, (_, i) => i + 1).map((shelf) => (
                          <div
                            key={shelf}
                            onClick={() => toggleShelfFilter(shelf)}
                            className={`relative flex cursor-pointer select-none items-center justify-center rounded-sm px-2 py-1.5 text-xs outline-none transition-colors ${
                              shelfFilters.has(shelf)
                                ? 'bg-orange-500 text-white'
                                : 'hover:bg-accent hover:text-accent-foreground border border-gray-200'
                            }`}
                          >
                            {shelf}
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
                filteredOrders.map((order) => (
                <div
                  key={order.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, order)}
                  onDragEnd={handleDragEnd}
                  onClick={() => setSelectedOrder(order.id)}
                  className={`px-4 py-3 border-b cursor-move hover:bg-accent transition-colors ${
                    selectedOrder === order.id ? 'bg-accent' : ''
                  } ${draggedOrder?.id === order.id ? 'opacity-50' : 
                    completedOrders.has(order.id) ? 'opacity-40' : ''}`}
                >
                  <div className="flex items-stretch justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm mb-1">{order.name}</div>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="text-xs text-muted-foreground">
                          {order.minutes} minutes
                        </div>
                        {/* Status Badge */}
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${order.statusColor}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {/* Shelf Location Badge */}
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-orange-50 text-orange-600 border border-orange-100">
                        {order.shelfLocation}
                      </span>
                      {/* Deadline Badge */}
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-600 border border-red-100">
                        {formatDeadline(order.deadline)}
                      </span>
                      {/* Status Indicator */}
                      <div className={`w-2 rounded py-[1px] self-stretch ${
                        order.dotColor === 'red' ? 'bg-red-500' :
                        order.dotColor === 'green' ? 'bg-green-500' :
                        order.dotColor === 'purple' ? 'bg-purple-500' :
                        'bg-orange-500'
                      }`} />
                    </div>
                  </div>
                </div>
              ))
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
          <main className='size-full flex-1 flex flex-col px-4 pt-6 pb-6 sm:px-6 overflow-hidden'>
            {/* Week View Timeline */}
            <div className="flex flex-col flex-1 min-h-0 space-y-4">
              {/* Navigation Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleNavigate('prev')}
                    className="p-2 rounded bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <ChevronLeftIcon className="size-4" />
                  </button>
                  <button 
                    onClick={() => handleNavigate('next')}
                    className="p-2 rounded bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <ChevronRightIcon className="size-4" />
                  </button>
                  <button 
                    onClick={goToToday}
                    className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 transition-colors text-sm font-medium"
                  >
                    Today
                  </button>
                </div>
                <div className="text-sm font-medium">
                  {(() => {
                    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                    const dayOfWeek = days[currentDate.getDay()];
                    return `${dayOfWeek}, ${months[currentDate.getMonth()]} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;
                  })()}
                </div>
              </div>

              {/* Calendar Grid - Printers View Only */}
              <div className="border rounded-lg overflow-hidden flex flex-col flex-1 min-h-0">
                  {/* Production Lines Header */}
                  <div className="grid border-b bg-gray-50 shrink-0" style={{ gridTemplateColumns: '80px repeat(5, 1fr)' }}>
                    <div className="p-2 border-r"></div>
                    {Array.from({ length: 5 }, (_, i) => {
                      const isColumnDragOver = dragOverColumn === i;
                      return (
                        <div 
                          key={i} 
                          className={`p-2 border-r text-center transition-colors ${
                            isColumnDragOver ? getProductionLineColor(i) : ''
                          }`}
                          onContextMenu={(e) => handleProductionLineRightClick(e, i, 0)}
                        >
                          <div className="text-sm font-semibold text-gray-900">
                            Production Line #{i + 1}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Time Slots Grid */}
                  <div className="flex-1 overflow-hidden flex flex-col" style={{ display: 'grid', gridTemplateRows: 'repeat(18, minmax(0, 1fr))', '--slot-height': 'calc(100% / 18)' } as React.CSSProperties} id="printers-timeline-grid">
                    {Array.from({ length: 18 }, (_, i) => {
                      const hour = 8 + Math.floor(i / 2);
                      const minutes = (i % 2) * 30;
                      const isAM = hour < 12;
                      const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
                      const displayTime = minutes === 0 
                        ? `${displayHour}${isAM ? 'am' : 'pm'}`
                        : `${displayHour}:${minutes.toString().padStart(2, '0')}${isAM ? 'am' : 'pm'}`;
                      
                      return (
                        <div key={i} className="grid border-b border-gray-200/80" style={{ gridTemplateColumns: '80px repeat(5, 1fr)' }}>
                          <div className="p-2 border-r text-xs text-gray-500 bg-gray-50">
                            {displayTime}
                          </div>
                          {Array.from({ length: 5 }, (_, j) => {
                            const cellKey = getCellKey(currentDate, j, i);
                            const assignments = getAssignmentsForTimeSlot(j, i);
                            const startAssignment = assignments.find(a => a.startTimeSlot === i);
                            const isColumnDragOver = dragOverColumn === j;
                            const bookOut = getBookOutForTimeSlot(j, i);
                            const isBookedOut = !!bookOut;
                            
                            return (
                              <div
                                key={j}
                                data-column={j}
                                onContextMenu={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handleProductionLineRightClick(e, j, i);
                                }}
                                onDragOver={(e) => {
                                  e.preventDefault();
                                  if (draggedBookOut) {
                                    e.dataTransfer.dropEffect = 'move';
                                    handleDragOver(e, cellKey, j, i);
                                  } else if (!isBookedOut) {
                                    e.dataTransfer.dropEffect = 'move';
                                    handleDragOver(e, cellKey, j, i);
                                  } else {
                                    e.dataTransfer.dropEffect = 'none';
                                  }
                                }}
                                onDragLeave={handleDragLeave}
                                onDrop={(e) => {
                                  if (draggedBookOut) {
                                    handleBookOutDrop(e, j, i);
                                  } else if (!isBookedOut) {
                                    handleDrop(e, j, i);
                                  }
                                }}
                                className={`p-2 border-r border-gray-200/80 relative min-h-[40px] transition-colors ${
                                  isColumnDragOver ? getProductionLineColor(j) : ''
                                } ${isBookedOut ? 'bg-red-50/50' : ''}`}
                                style={{ position: 'relative', height: 'var(--slot-height, calc(100% / 18))' }}
                              >
                                {bookOut && bookOut.startTimeSlot === i && (() => {
                                  const rowSpan = bookOut.durationSlots;
                                  return (
                                    <div
                                      data-bookout-id={bookOut.id}
                                      draggable
                                      onDragStart={(e) => handleBookOutDragStart(e, bookOut)}
                                      onDragEnd={handleDragEnd}
                                      className="absolute left-0 right-0 m-1 rounded border-2 border-dashed border-red-400 bg-red-50 z-10 cursor-move"
                                      style={{ 
                                        top: '4px',
                                        height: `calc(${rowSpan} * 100% - 8px)`,
                                        minHeight: `${Math.max(40, rowSpan * 40)}px`,
                                        zIndex: 10,
                                        boxSizing: 'border-box',
                                        borderStyle: 'dashed',
                                        borderWidth: '2px',
                                        borderColor: 'rgb(248 113 113)',
                                        overflow: 'visible',
                                        pointerEvents: 'auto'
                                      }}
                                    >
                                      <div className="px-3 py-2.5 h-full flex flex-col gap-1.5 relative" style={{ overflow: 'visible' }}>
                                        {/* Top Row - Reason and Delete Button */}
                                        <div className="flex items-start justify-between gap-2">
                                          <div className="font-medium text-xs leading-tight text-red-800 flex-1">
                                            {bookOut.reason}
                                          </div>
                                          {/* Delete Button */}
                                          <button
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              e.preventDefault();
                                              handleDeleteBookOut(e, bookOut.id);
                                            }}
                                            className="flex-shrink-0 p-1 rounded hover:bg-red-200/50 transition-colors group z-10 relative"
                                            title="Remove booked out time"
                                          >
                                            <XIcon className="size-3 text-red-700 group-hover:text-red-900" />
                                          </button>
                                        </div>
                                        
                                        {/* Bottom Row - Duration Control Buttons */}
                                        <div className="absolute bottom-2 left-0 right-0 px-3 flex items-center justify-end z-20">
                                          {/* Duration Control Buttons - Bottom right */}
                                          <div className="flex flex-row gap-1">
                                            {/* Minus Button - Remove 30 minutes */}
                                            <button
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                e.preventDefault();
                                                
                                                // Check if we can reduce (minimum 1 slot = 30 minutes)
                                                if (bookOut.durationSlots > 1) {
                                                  setBookOutTimes(prev => prev.map(b => 
                                                    b.id === bookOut.id 
                                                      ? { ...b, durationSlots: b.durationSlots - 1 }
                                                      : b
                                                  ));
                                                }
                                              }}
                                              disabled={bookOut.durationSlots <= 1}
                                              className={`p-0.5 rounded bg-white border shadow-sm transition-colors ${
                                                bookOut.durationSlots <= 1
                                                  ? 'border-gray-200 cursor-not-allowed opacity-50'
                                                  : 'border-gray-300 hover:bg-gray-50'
                                              }`}
                                              title="Remove 30 minutes"
                                              aria-label="Remove 30 minutes"
                                            >
                                              <MinusIcon className="size-2.5 text-gray-700" />
                                            </button>
                                            
                                            {/* Plus Button - Add 30 minutes */}
                                            <button
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                e.preventDefault();
                                                
                                                const currentEndSlot = bookOut.startTimeSlot + bookOut.durationSlots;
                                                
                                                // Check if we can extend (not past 5pm)
                                                if (currentEndSlot < 18) {
                                                  setBookOutTimes(prev => prev.map(b => 
                                                    b.id === bookOut.id 
                                                      ? { ...b, durationSlots: b.durationSlots + 1 }
                                                      : b
                                                  ));
                                                }
                                              }}
                                              className="p-0.5 rounded bg-white border border-gray-300 shadow-sm hover:bg-gray-50 transition-colors"
                                              title="Add 30 minutes"
                                              aria-label="Add 30 minutes"
                                            >
                                              <PlusIcon className="size-2.5 text-gray-700" />
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })()}
                                {startAssignment && (() => {
                                  const order = orders.find(o => o.id === startAssignment.orderId);
                                  if (!order) return null;
                                  const rowSpan = startAssignment.durationSlots;
                                  // Get production line color for printers view, default white for week view
                                  const cardColorClass = startAssignment.view === 'printers' 
                                    ? getProductionLineCardColor(startAssignment.column)
                                    : 'bg-white border-gray-200';
                                  const isCompleted = completedOrders.has(order.id);
                                  
                                  return (
                                    <div
                                      draggable={!isCompleted}
                                      onContextMenu={(e) => {
                                        // Don't prevent default - let it bubble to cell handler
                                        // Only handle for printers view
                                        if (startAssignment.view === 'printers') {
                                          e.stopPropagation();
                                        }
                                      }}
                                      onDragStart={(e) => {
                                        // Prevent dragging if order is completed
                                        if (isCompleted) {
                                          e.preventDefault();
                                          return;
                                        }
                                        // Don't drag if clicking on duration control buttons
                                        const target = e.target as HTMLElement;
                                        const isDurationButton = target.closest('button[aria-label*="minutes"]') ||
                                                                target.closest('button[title*="minutes"]');
                                        if (isDurationButton) {
                                          e.preventDefault();
                                          e.stopPropagation();
                                          return false;
                                        }
                                        e.stopPropagation();
                                        handleTimelineCardDragStart(e, order, startAssignment);
                                      }}
                                      onClick={(e) => {
                                        // Don't open modal if clicking on duration control buttons
                                        const target = e.target as HTMLElement;
                                        const isDurationButton = target.closest('button[aria-label*="minutes"]') ||
                                                                target.closest('button[title*="minutes"]') ||
                                                                target.closest('button')?.querySelector('svg');
                                        
                                        if (!isDurationButton) {
                                          setSelectedOrderForModal(order);
                                          setSelectedAssignmentForModal(startAssignment);
                                          setCurrentImageIndex(0);
                                          setCurrentProductIndex(0);
                                        }
                                      }}
                                      onDragEnd={handleDragEnd}
                                      className={`absolute left-0 right-0 m-1 rounded border transition-opacity shadow-md overflow-visible group ${cardColorClass} ${
                                        draggedOrder?.id === order.id ? 'opacity-50' : 
                                        isCompleted ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:opacity-80'
                                      }`}
                                      style={{ 
                                        top: '4px',
                                        // Cell height is var(--slot-height), so 100% = 1 slot height
                                        // To span rowSpan slots, multiply by rowSpan
                                        height: `calc(${rowSpan} * 100% - 8px)`,
                                        minHeight: `${Math.max(40, rowSpan * 40)}px`,
                                        zIndex: 10
                                      }}
                                    >
                                      <div className={`h-full flex relative ${rowSpan === 1 ? 'px-2 py-1' : 'px-3 py-2.5 flex-col gap-1.5'}`}>
                                        {rowSpan === 1 ? (
                                          // Compact layout for 30-minute orders
                                          <>
                                            {/* Single line layout: Order name, badges, and buttons */}
                                            <div className="flex items-center gap-1.5 flex-1 min-w-0">
                                              {/* Order Name - Truncated if needed */}
                                              <div className="font-medium text-[9.5px] leading-tight truncate flex-shrink min-w-0">
                                                <span className="relative inline-block truncate">
                                                  {order.name}
                                                </span>
                                              </div>
                                              
                                              {/* Shelf Location and Deadline - Compact badges */}
                                              <div className="flex items-center gap-1 flex-shrink-0">
                                                <span className="px-1 py-0.5 rounded-full text-[9.5px] font-medium bg-orange-50 text-orange-600 border border-orange-100 whitespace-nowrap">
                                                  {order.shelfLocation}
                                                </span>
                                                <span className="px-1 py-0.5 rounded-full text-[9.5px] font-medium bg-red-50 text-red-600 border border-red-100 whitespace-nowrap">
                                                  {formatDeadline(order.deadline)}
                                                </span>
                                              </div>
                                            </div>
                                            
                                            {/* Duration Control Buttons - Inline right */}
                                            <div className="flex flex-row gap-0.5 flex-shrink-0 ml-auto">
                                              {/* Minus Button - Remove 30 minutes */}
                                              <button
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  e.preventDefault();
                                                  
                                                  // Check if we can reduce (minimum 1 slot = 30 minutes)
                                                  if (startAssignment.durationSlots > 1) {
                                                    setTimelineAssignments(prev => {
                                                      const newMap = new Map(prev);
                                                      const cellKey = getCellKey(startAssignment.date, startAssignment.column, startAssignment.startTimeSlot);
                                                      const existingAssignment = prev.get(cellKey);
                                                      
                                                      if (existingAssignment) {
                                                        const newDuration = existingAssignment.durationSlots - 1;
                                                        newMap.set(cellKey, {
                                                          ...existingAssignment,
                                                          durationSlots: newDuration
                                                        });
                                                      }
                                                      
                                                      return newMap;
                                                    });
                                                  }
                                                }}
                                                disabled={startAssignment.durationSlots <= 1}
                                                className={`p-0.5 rounded bg-white border shadow-sm transition-colors ${
                                                  startAssignment.durationSlots <= 1
                                                    ? 'border-gray-200 cursor-not-allowed opacity-50'
                                                    : 'border-gray-300 hover:bg-gray-50'
                                                }`}
                                                title="Remove 30 minutes"
                                                aria-label="Remove 30 minutes"
                                              >
                                                <MinusIcon className="size-2.5 text-gray-700" />
                                              </button>
                                              
                                              {/* Plus Button - Add 30 minutes */}
                                              <button
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  e.preventDefault();
                                                  
                                                  const currentEndSlot = startAssignment.startTimeSlot + startAssignment.durationSlots;
                                                  
                                                  // Check if we can extend (not past 5pm)
                                                  if (currentEndSlot < 18) {
                                                    setTimelineAssignments(prev => {
                                                      const newMap = new Map(prev);
                                                      const cellKey = getCellKey(startAssignment.date, startAssignment.column, startAssignment.startTimeSlot);
                                                      const existingAssignment = prev.get(cellKey);
                                                      
                                                      if (existingAssignment) {
                                                        const newDuration = existingAssignment.durationSlots + 1;
                                                        newMap.set(cellKey, {
                                                          ...existingAssignment,
                                                          durationSlots: newDuration
                                                        });
                                                      }
                                                      
                                                      return newMap;
                                                    });
                                                  }
                                                }}
                                                className="p-0.5 rounded bg-white border border-gray-300 shadow-sm hover:bg-gray-50 transition-colors"
                                                title="Add 30 minutes"
                                                aria-label="Add 30 minutes"
                                              >
                                                <PlusIcon className="size-2.5 text-gray-700" />
                                              </button>
                                            </div>
                                          </>
                                        ) : (
                                          // Regular layout for longer orders
                                          <>
                                            {/* Order Name - At the top */}
                                            <div className="font-medium text-[13.5px] leading-tight break-words relative inline-block">
                                              <span className="relative inline-block">
                                                {order.name}
                                                <span className="absolute bottom-0 left-0 w-0 h-px bg-current transition-all duration-300 ease-out group-hover:w-full"></span>
                                              </span>
                                            </div>
                                            
                                            {/* Shelf Location and Deadline - Same line */}
                                            <div className="flex items-center gap-1.5 flex-wrap">
                                              <span className="px-1.5 py-0.5 rounded-full text-[10.5px] font-medium bg-orange-50 text-orange-600 border border-orange-100 whitespace-nowrap">
                                                {order.shelfLocation}
                                              </span>
                                              <span className="px-1.5 py-0.5 rounded-full text-[10.5px] font-medium bg-red-50 text-red-600 border border-red-100 whitespace-nowrap">
                                                {formatDeadline(order.deadline)}
                                              </span>
                                            </div>

                                            {/* Bottom Row - Duration Control Buttons (right) */}
                                            <div className="absolute bottom-2 left-0 right-0 px-3 flex items-center justify-end z-20">
                                              {/* Duration Control Buttons - Bottom right */}
                                              <div className="flex flex-row gap-1">
                                              {/* Minus Button - Remove 30 minutes */}
                                              <button
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  e.preventDefault();
                                                  
                                                  // Check if we can reduce (minimum 1 slot = 30 minutes)
                                                  if (startAssignment.durationSlots > 1) {
                                                    setTimelineAssignments(prev => {
                                                      const newMap = new Map(prev);
                                                      const cellKey = getCellKey(startAssignment.date, startAssignment.column, startAssignment.startTimeSlot);
                                                      const existingAssignment = prev.get(cellKey);
                                                      
                                                      if (existingAssignment) {
                                                        const newDuration = existingAssignment.durationSlots - 1;
                                                        newMap.set(cellKey, {
                                                          ...existingAssignment,
                                                          durationSlots: newDuration
                                                        });
                                                      }
                                                      
                                                      return newMap;
                                                    });
                                                  }
                                                }}
                                                disabled={startAssignment.durationSlots <= 1}
                                                className={`p-0.5 rounded bg-white border shadow-sm transition-colors ${
                                                  startAssignment.durationSlots <= 1
                                                    ? 'border-gray-200 cursor-not-allowed opacity-50'
                                                    : 'border-gray-300 hover:bg-gray-50'
                                                }`}
                                                title="Remove 30 minutes"
                                                aria-label="Remove 30 minutes"
                                              >
                                                <MinusIcon className="size-2.5 text-gray-700" />
                                              </button>
                                              
                                              {/* Plus Button - Add 30 minutes */}
                                              <button
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  e.preventDefault();
                                                  
                                                  const currentEndSlot = startAssignment.startTimeSlot + startAssignment.durationSlots;
                                                  
                                                  // Check if we can extend (not past 5pm)
                                                  if (currentEndSlot < 18) {
                                                    setTimelineAssignments(prev => {
                                                      const newMap = new Map(prev);
                                                      const cellKey = getCellKey(startAssignment.date, startAssignment.column, startAssignment.startTimeSlot);
                                                      const existingAssignment = prev.get(cellKey);
                                                      
                                                      if (existingAssignment) {
                                                        const newDuration = existingAssignment.durationSlots + 1;
                                                        newMap.set(cellKey, {
                                                          ...existingAssignment,
                                                          durationSlots: newDuration
                                                        });
                                                      }
                                                      
                                                      return newMap;
                                                    });
                                                  }
                                                }}
                                                className="p-0.5 rounded bg-white border border-gray-300 shadow-sm hover:bg-gray-50 transition-colors"
                                                title="Add 30 minutes"
                                                aria-label="Add 30 minutes"
                                              >
                                                <PlusIcon className="size-2.5 text-gray-700" />
                                              </button>
                                              </div>
                                            </div>
                                          </>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })()}
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                </div>
            </div>
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
                return product.sizes.every(sizeDetail => {
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
                      return product.sizes.every(sizeDetail => {
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
                          
                          return currentProduct.sizes.map((sizeDetail, sizeIndex) => {
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
                    {products[currentProductIndex] && products[currentProductIndex].images.length > 1 && (
                      <button
                        onClick={() => {
                          const currentProduct = products[currentProductIndex];
                          const prevIndex = currentImageIndex > 0 ? currentImageIndex - 1 : currentProduct.images.length - 1;
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
                      {products[currentProductIndex] && products[currentProductIndex].images.map((imageId, imageIndex) => (
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
                    {products[currentProductIndex] && products[currentProductIndex].images.length > 1 && (
                      <button
                        onClick={() => {
                          const currentProduct = products[currentProductIndex];
                          const nextIndex = currentImageIndex < currentProduct.images.length - 1 ? currentImageIndex + 1 : 0;
                          setCurrentImageIndex(nextIndex);
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors border border-gray-200"
                        aria-label="Next image"
                      >
                        <ChevronRightIcon className="size-5 text-gray-700" />
                      </button>
                    )}
                    
                    {/* Carousel Indicators - positioned at bottom */}
                    {products[currentProductIndex] && products[currentProductIndex].images.length > 1 && (
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex justify-center gap-2">
                        {products[currentProductIndex].images.map((_, imageIndex) => (
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
                    currentProduct.sizes.forEach(sizeDetail => {
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

export default DashboardPage
