'use client';

import Image from 'next/image';
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  SettingsIcon,
  UserIcon,
  SearchIcon,
  FilterIcon,
  LoaderIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  DownloadIcon,
  UploadIcon,
  PencilIcon,
} from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Sidebar,
  SidebarContent,
  SidebarProvider
} from '@/components/ui/sidebar'

interface Product {
  id: string;
  name: string;
  minimums: string;
  pricing: string;
  internalStatus: 'Pending' | 'Approved By Client - Prep For Upload' | 'Prepped - Create Draft Product' | 'Drafted - Add Customization' | 'Customization Added - Final Check' | 'Checked - Send To Client' | 'Sent To Client' | 'Removed';
  externalStatus: 'Pending' | 'Approved' | 'Revisions Requested' | 'Awaiting Response' | 'Rejected';
  mockupImage?: string;
  notes?: string;
}

interface HistoryItem {
  id: string;
  action: string;
  date: Date;
}

interface MockupSubmission {
  id: string;
  submissionNumber: string;
  status: 'open' | 'closed';
  submittedDate: Date;
  deadline?: Date;
  companyName: string;
  productCount: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  artworkImages: string[];
  notes: string;
  products: Product[];
  history: HistoryItem[];
}

const INITIAL_LOAD = 20;
const LOAD_MORE = 20;

// Unique ID generator for submissions
let submissionCounter = 0;
const generateSubmissionId = (): string => {
  submissionCounter++;
  return `submission-${submissionCounter}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

const generateSubmissionNumber = (): string => {
  // Generate 7-digit number (1000000 to 9999999)
  const num = Math.floor(Math.random() * 9000000) + 1000000;
  return `SUB#${num}`;
};


const generateStatus = (): 'open' | 'closed' => {
  return Math.random() > 0.5 ? 'open' : 'closed';
};

const generateCompanyName = (): string => {
  const names = [
    'Acme Corporation',
    'Tech Solutions Inc',
    'Global Industries',
    'Creative Designs LLC',
    'Business Partners Co',
    'Innovation Labs',
    'Enterprise Solutions',
    'Digital Marketing Group'
  ];
  return names[Math.floor(Math.random() * names.length)];
};

const generateProductCount = (): number => {
  return Math.floor(Math.random() * 50) + 1; // 1-50 products
};

const generateCustomerName = (): string => {
  const names = ['William Hunt', 'Sarah Johnson', 'Michael Chen', 'Emily Rodriguez', 'David Kim'];
  return names[Math.floor(Math.random() * names.length)];
};

const generateCustomerEmail = (name: string): string => {
  const domain = ['ethos.community', 'example.com', 'test.com'];
  const username = name.toLowerCase().replace(' ', '.');
  return `${username}@${domain[Math.floor(Math.random() * domain.length)]}`;
};

const generateCustomerPhone = (): string => {
  const area = Math.floor(Math.random() * 900) + 100;
  const prefix = Math.floor(Math.random() * 900) + 100;
  const number = Math.floor(Math.random() * 10000);
  return `${area} ${prefix} ${number.toString().padStart(4, '0')}`;
};

const generateArtworkImages = (): string[] => {
  return [
    'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=200&h=200&fit=crop'
  ];
};

const generateProduct = (index: number): Product => {
  const productNames = [
    'The Basic Legging - Black',
    'The Basic Legging - Cafe',
    'The Basic Legging - Storm',
    'The Basic Legging - Navy',
    'The Basic Legging - Grey'
  ];
  const internalStatuses: Product['internalStatus'][] = [
    'Pending',
    'Approved By Client - Prep For Upload',
    'Prepped - Create Draft Product',
    'Drafted - Add Customization',
    'Customization Added - Final Check',
    'Checked - Send To Client',
    'Sent To Client',
    'Removed'
  ];
  const externalStatuses: Product['externalStatus'][] = [
    'Pending',
    'Approved',
    'Revisions Requested',
    'Awaiting Response',
    'Rejected'
  ];
  
  return {
    id: `product-${index}`,
    name: `${index + 1}. ${productNames[index % productNames.length]}`,
    minimums: 'No minimums',
    pricing: '$33.00',
    internalStatus: internalStatuses[Math.floor(Math.random() * internalStatuses.length)],
    externalStatus: externalStatuses[Math.floor(Math.random() * externalStatuses.length)],
    mockupImage: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400&h=600&fit=crop',
    notes: ''
  };
};

const generateHistory = (submittedDate: Date): HistoryItem[] => {
  const actions = [
    '1/3 mockups approved',
    'Initial revisions requested',
    'Initial mockups sent to customer',
    'Customer submitted mockups'
  ];
  
  const history: HistoryItem[] = [];
  let currentDate = new Date(submittedDate);
  
  actions.forEach((action, index) => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() + index);
    date.setHours(10 + index, index * 15);
    
    history.push({
      id: `history-${index}`,
      action,
      date
    });
  });
  
  return history.reverse();
};

const generateSubmittedDate = (): Date => {
  const today = new Date();
  const daysAgo = Math.floor(Math.random() * 30); // 0-30 days ago
  const date = new Date(today);
  date.setDate(date.getDate() - daysAgo);
  return date;
};

const generateDeadline = (): Date => {
  const today = new Date();
  const daysToAdd = Math.floor(Math.random() * 30) + 1; // 1-30 days from now
  const deadline = new Date(today);
  deadline.setDate(deadline.getDate() + daysToAdd);
  return deadline;
};

type StatusFilter = 'open' | 'closed';

const MockupSubmissionsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState<string | null>(null);
  const [statusFilters, setStatusFilters] = useState<Set<StatusFilter>>(new Set());
  const [submissions, setSubmissions] = useState<MockupSubmission[]>([]);
  const [ordersLoaded, setOrdersLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [expandedProducts, setExpandedProducts] = useState<Set<string>>(new Set());
  const [productNotes, setProductNotes] = useState<Record<string, string>>({});
  const filterButtonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Generate initial submissions
  useEffect(() => {
    if (ordersLoaded) return;
    
    const initialSubmissions: MockupSubmission[] = [];
    for (let i = 0; i < INITIAL_LOAD; i++) {
      const uniqueId = generateSubmissionId();
      const submittedDate = generateSubmittedDate();
      const customerName = generateCustomerName();
      const productCount = generateProductCount();
      
      initialSubmissions.push({
        id: uniqueId,
        submissionNumber: generateSubmissionNumber(),
        status: generateStatus(),
        submittedDate,
        deadline: Math.random() > 0.3 ? generateDeadline() : undefined,
        companyName: generateCompanyName(),
        productCount,
        customerName,
        customerEmail: generateCustomerEmail(customerName),
        customerPhone: generateCustomerPhone(),
        artworkImages: generateArtworkImages(),
        notes: 'Please make this logo center chest.',
        products: Array.from({ length: productCount }, (_, idx) => generateProduct(idx)),
        history: generateHistory(submittedDate)
      });
    }
    setSubmissions(initialSubmissions);
    setOrdersLoaded(true);
  }, [ordersLoaded]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        filterButtonRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !filterButtonRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const loadMoreSubmissions = useCallback(() => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setSubmissions(prev => {
        const newSubmissions: MockupSubmission[] = [];
        for (let i = 0; i < LOAD_MORE; i++) {
          const uniqueId = generateSubmissionId();
          const submittedDate = generateSubmittedDate();
          const customerName = generateCustomerName();
          const productCount = generateProductCount();
          
          newSubmissions.push({
            id: uniqueId,
            submissionNumber: generateSubmissionNumber(),
            status: generateStatus(),
            submittedDate,
            deadline: Math.random() > 0.3 ? generateDeadline() : undefined,
            companyName: generateCompanyName(),
            productCount,
            customerName,
            customerEmail: generateCustomerEmail(customerName),
            customerPhone: generateCustomerPhone(),
            artworkImages: generateArtworkImages(),
            notes: 'Please make this logo center chest.',
            products: Array.from({ length: productCount }, (_, idx) => generateProduct(idx)),
            history: generateHistory(submittedDate)
          });
        }
        return [...prev, ...newSubmissions];
      });
      setIsLoading(false);
    }, 500);
  }, [isLoading, hasMore]);

  // Infinite scroll
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      if (scrollHeight - scrollTop - clientHeight < 200) {
        loadMoreSubmissions();
      }
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, [loadMoreSubmissions]);

  const toggleStatusFilter = useCallback((status: StatusFilter) => {
    setStatusFilters(prev => {
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
    setStatusFilters(new Set());
  }, []);

  const filteredSubmissions = useMemo(() => {
    const searchLower = searchQuery.toLowerCase().trim();
    return submissions.filter(submission => {
      const matchesSearch = searchLower === '' || 
        submission.submissionNumber.toLowerCase().includes(searchLower);
      const matchesStatus = statusFilters.size === 0 || statusFilters.has(submission.status);
      return matchesSearch && matchesStatus;
    });
  }, [submissions, searchQuery, statusFilters]);

  const filterCount = statusFilters.size;

  const formatDate = (date: Date): string => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${month} ${day}${day === 1 || day === 21 || day === 31 ? 'st' : day === 2 || day === 22 ? 'nd' : day === 3 || day === 23 ? 'rd' : 'th'}, ${year}`;
  };

  const formatDeadline = (date: Date): string => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day = date.getDate();
    const month = months[date.getMonth()];
    return `${month} ${day}${day === 1 || day === 21 || day === 31 ? 'st' : day === 2 || day === 22 ? 'nd' : day === 3 || day === 23 ? 'rd' : 'th'}`;
  };

  const formatSubmissionDate = (date: Date): string => {
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const formatHistoryDate = (date: Date): string => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours() % 12 || 12;
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = date.getHours() >= 12 ? 'pm' : 'am';
    return `${month} ${day}${day === 1 || day === 21 || day === 31 ? 'st' : day === 2 || day === 22 ? 'nd' : day === 3 || day === 23 ? 'rd' : 'th'} ${year} @ ${hours}:${minutes}${ampm} PST`;
  };

  const toggleProductExpansion = (productId: string) => {
    setExpandedProducts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  return (
    <div className='flex h-dvh w-full overflow-hidden'>
      <SidebarProvider defaultOpen={true}>
        <Sidebar className="w-80 h-full">
          <SidebarContent className="flex flex-col h-full p-0 overflow-hidden">
            {/* Header with Logo */}
            <div className="px-4 pt-4">
              <div className="flex items-center justify-between mb-4">
                <Image
                  src="https://cdn.shopify.com/s/files/1/0609/4752/9901/files/Ethos_Logo_-_Black.png?v=1767327560"
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
              <h1 className="text-xs italic text-gray-500 mb-2">Mockup Submissions</h1>
              
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
                          Status
                        </div>
                        <div className="flex flex-col gap-1 px-2 pb-2">
                          {(['open', 'closed'] as StatusFilter[]).map((status) => (
                            <div
                              key={status}
                              onClick={() => toggleStatusFilter(status)}
                              className={`relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-xs outline-none transition-colors border ${
                                statusFilters.has(status)
                                  ? status === 'open' ? 'bg-green-100 text-green-700 border-green-200' :
                                    'bg-red-100 text-red-700 border-red-200' // closed
                                  : status === 'open' ? 'bg-green-50 text-green-600 border-green-100 hover:bg-green-100' :
                                    'bg-red-50 text-red-600 border-red-100 hover:bg-red-100' // closed
                              }`}
                            >
                              {status === 'open' ? 'Open' : 'Closed'}
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

            {/* Submission List Header */}
            <div className="px-4 pt-0 pb-0">
              <h2 className="font-semibold text-sm">Submission Number</h2>
            </div>

            {/* Scrollable Submission List */}
            <div 
              ref={scrollContainerRef}
              className="flex-1 overflow-y-auto -mt-2 min-h-0"
            >
              {!ordersLoaded ? (
                <div className="flex items-center justify-center py-8">
                  <LoaderIcon className="size-4 animate-spin text-muted-foreground" />
                </div>
              ) : (
                filteredSubmissions.map((submission) => {
                  return (
                    <div
                      key={submission.id}
                      onClick={() => setSelectedSubmission(submission.id)}
                      className={`px-4 py-3 border-b cursor-pointer hover:bg-accent transition-colors ${
                        selectedSubmission === submission.id ? 'bg-accent' : ''
                      }`}
                    >
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <div className="flex items-center gap-2">
                            <div className="font-medium text-sm">{submission.submissionNumber}</div>
                            {submission.deadline && (
                              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-600 border border-red-100 whitespace-nowrap">
                                {formatDeadline(submission.deadline)}
                              </span>
                            )}
                          </div>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap border ${
                            submission.status === 'open' ? 'bg-green-50 text-green-600 border-green-100' :
                            'bg-red-50 text-red-600 border-red-100' // closed
                          }`}>
                            {submission.status === 'open' ? 'Open' : 'Closed'}
                          </span>
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <div className="text-xs text-gray-600">{submission.companyName}</div>
                          <div className="text-xs text-gray-500">{submission.productCount} product{submission.productCount !== 1 ? 's' : ''}</div>
                        </div>
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
          <main className='size-full flex-1 flex flex-col overflow-y-auto'>
            {selectedSubmission ? (() => {
              const submission = filteredSubmissions.find(s => s.id === selectedSubmission);
              if (!submission) return null;

              const getStatusColor = (status: string, type: 'internal' | 'external') => {
                if (type === 'internal') {
                  if (status === 'Pending') return 'bg-blue-100 text-gray-900 border-blue-200';
                  if (status === 'Approved By Client - Prep For Upload') return 'bg-green-100 text-gray-900 border-green-200';
                  if (status === 'Prepped - Create Draft Product') return 'bg-yellow-100 text-gray-900 border-yellow-200';
                  if (status === 'Drafted - Add Customization') return 'bg-blue-100 text-gray-900 border-blue-200';
                  if (status === 'Customization Added - Final Check') return 'bg-pink-100 text-gray-900 border-pink-200';
                  if (status === 'Checked - Send To Client') return 'bg-blue-100 text-gray-900 border-blue-200';
                  if (status === 'Sent To Client') return 'bg-cyan-100 text-gray-900 border-cyan-200';
                  if (status === 'Removed') return 'bg-orange-100 text-gray-900 border-orange-200';
                  return 'bg-gray-100 text-gray-900 border-gray-200';
                } else {
                  if (status === 'Pending') return 'bg-blue-100 text-gray-900 border-blue-200';
                  if (status === 'Approved') return 'bg-green-100 text-gray-900 border-green-200';
                  if (status === 'Revisions Requested') return 'bg-yellow-100 text-gray-900 border-yellow-200';
                  if (status === 'Awaiting Response') return 'bg-blue-100 text-gray-900 border-blue-200';
                  if (status === 'Rejected') return 'bg-orange-100 text-gray-900 border-orange-200';
                  return 'bg-gray-100 text-gray-900 border-gray-200';
                }
              };

              return (
                <div className="flex flex-col flex-1 min-h-0">
                  {/* Global Header */}
                  <div className="px-6 pt-6 pb-4 border-b flex items-center justify-between">
                    <h1 className="text-xl font-semibold text-gray-900">
                      Mockups - Submission {submission.submissionNumber}
                    </h1>
                    <div className="flex items-center gap-3">
                      <Button className="bg-gray-600 text-white hover:bg-gray-700">
                        Send To Customer
                      </Button>
                      <Button className={`${submission.status === 'open' ? 'bg-blue-600' : 'bg-gray-600'} text-white hover:opacity-90`}>
                        {submission.status === 'open' ? 'Open' : 'Closed'}
                      </Button>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto px-6 py-6">
                    {/* Submission and Customer Details */}
                    <div className="mb-8">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h2 className="text-3xl font-bold text-gray-900 mb-2">{submission.submissionNumber}</h2>
                          <p className="text-sm text-gray-600">Submission Date: {formatSubmissionDate(submission.submittedDate)}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-900"><span className="font-medium">Name:</span> {submission.customerName}</p>
                          <p className="text-sm text-gray-900"><span className="font-medium">Email:</span> {submission.customerEmail}</p>
                          <p className="text-sm text-gray-900"><span className="font-medium">Phone Number:</span> {submission.customerPhone}</p>
                        </div>
                      </div>
                    </div>

                    {/* Artwork and Notes */}
                    <div className="mb-8">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Artwork</h3>
                        <Button className="bg-purple-600 text-white hover:bg-purple-700">
                          <DownloadIcon className="size-4 mr-2" />
                          Download Artwork
                        </Button>
                      </div>
                      <div className="flex gap-2 mb-4">
                        {submission.artworkImages.map((img, idx) => (
                          <div key={idx} className="w-24 h-24 bg-gray-200 rounded overflow-hidden">
                            <Image src={img} alt={`Artwork ${idx + 1}`} width={96} height={96} className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 mb-1">Notes:</p>
                        <p className="text-sm text-gray-600">{submission.notes}</p>
                      </div>
                    </div>

                    {/* Product Actions */}
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Button variant="outline" className="border-gray-300">
                          Bulk Actions
                        </Button>
                        <Button variant="outline" className="border-gray-300">
                          Download PDF
                        </Button>
                        <Button className="bg-purple-600 text-white hover:bg-purple-700">
                          <UploadIcon className="size-4 mr-2" />
                          Upload Mockups
                        </Button>
                      </div>
                      <Button variant="outline" className="border-gray-300">
                        <FilterIcon className="size-4 mr-2" />
                        Filter Results
                      </Button>
                    </div>

                    {/* Product Table */}
                    <div className="border border-gray-200 rounded-lg overflow-hidden mb-8">
                      <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Product Name</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Minimums</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Pricing</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Internal Product Status</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">External Product Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {submission.products.map((product) => {
                            const isExpanded = expandedProducts.has(product.id);
                            return (
                              <React.Fragment key={product.id}>
                                <tr className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer" onClick={() => toggleProductExpansion(product.id)}>
                                  <td className="px-4 py-3">
                                    <div className="flex items-center gap-2">
                                      {isExpanded ? (
                                        <ChevronDownIcon className="size-4 text-gray-400" />
                                      ) : (
                                        <ChevronRightIcon className="size-4 text-gray-400" />
                                      )}
                                      <span className="text-sm text-gray-900">{product.name}</span>
                                    </div>
                                  </td>
                                  <td className="px-4 py-3">
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm text-gray-900">{product.minimums}</span>
                                      <PencilIcon className="size-3 text-gray-400 cursor-pointer hover:text-gray-600" />
                                    </div>
                                  </td>
                                  <td className="px-4 py-3">
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm text-gray-900">{product.pricing}</span>
                                      <PencilIcon className="size-3 text-gray-400 cursor-pointer hover:text-gray-600" />
                                    </div>
                                  </td>
                                  <td className="px-4 py-3">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(product.internalStatus, 'internal')}`}>
                                      {product.internalStatus}
                                    </span>
                                  </td>
                                  <td className="px-4 py-3">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(product.externalStatus, 'external')}`}>
                                      {product.externalStatus}
                                    </span>
                                  </td>
                                </tr>
                                {isExpanded && (
                                  <tr className="bg-gray-50">
                                    <td colSpan={5} className="px-4 py-6">
                                      <div className="grid grid-cols-3 gap-6">
                                        <div className="w-full h-96 bg-gray-200 rounded overflow-hidden">
                                          {product.mockupImage ? (
                                            <Image src={product.mockupImage} alt={product.name} width={400} height={600} className="w-full h-full object-cover" />
                                          ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                              No image
                                            </div>
                                          )}
                                        </div>
                                        <div className="w-full h-96 bg-gray-100 rounded flex items-center justify-center border-2 border-dashed border-gray-300">
                                          <div className="text-center">
                                            <UploadIcon className="size-8 text-gray-400 mx-auto mb-2" />
                                            <p className="text-sm text-gray-600">Upload Mockups</p>
                                          </div>
                                        </div>
                                        <div className="flex flex-col">
                                          <label className="text-sm font-medium text-gray-900 mb-2">Notes</label>
                                          <textarea
                                            className="flex-1 border border-gray-300 rounded p-3 text-sm resize-none"
                                            placeholder="Add notes..."
                                            value={productNotes[product.id] || product.notes || ''}
                                            onChange={(e) => setProductNotes(prev => ({ ...prev, [product.id]: e.target.value }))}
                                          />
                                          <Button className="mt-3 bg-blue-600 text-white hover:bg-blue-700 w-full">
                                            Save Changes
                                          </Button>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                )}
                              </React.Fragment>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    {/* History Section */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">History</h3>
                      <div className="space-y-3">
                        {submission.history.map((item) => (
                          <div key={item.id} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-0">
                            <p className="text-sm text-gray-900">{item.action}</p>
                            <p className="text-sm text-gray-500">{formatHistoryDate(item.date)}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })() : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">Select a submission to view details</p>
              </div>
            )}
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}

export default MockupSubmissionsPage;
