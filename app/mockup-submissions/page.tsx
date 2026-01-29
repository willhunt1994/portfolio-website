'use client';

import Image from 'next/image';
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  SettingsIcon,
  UserIcon,
  SearchIcon,
  FilterIcon,
  LoaderIcon,
  ArrowUpDownIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  UploadIcon,
  SendIcon,
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
  externalStatus: 'Approved' | 'Revisions Requested' | 'Awaiting Customer Response' | 'Rejected';
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
  closedDate?: Date;
  companyName: string;
  socialMedia?: string;
  website?: string;
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
  return 3; // Fixed to 3 products for sample data
};

const generateSocialMedia = (): string => {
  const platforms = [
    '@company_instagram',
    '@company_twitter',
    '@company_facebook',
    'linkedin.com/company/company-name',
    'instagram.com/company',
    'facebook.com/company',
    'twitter.com/company'
  ];
  return platforms[Math.floor(Math.random() * platforms.length)];
};

const generateWebsite = (): string => {
  const domains = [
    'www.company.com',
    'company.com',
    'www.company.io',
    'company.io',
    'www.company.co',
    'company.co'
  ];
  return domains[Math.floor(Math.random() * domains.length)];
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
    'Approved',
    'Revisions Requested',
    'Awaiting Customer Response',
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

type SortOption = 'newest' | 'oldest' | 'company-az';

const MockupSubmissionsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState<string | null>(null);
  const [statusFilters, setStatusFilters] = useState<Set<StatusFilter>>(new Set());
  const [sortOption, setSortOption] = useState<SortOption>('newest');
  const [submissions, setSubmissions] = useState<MockupSubmission[]>([]);
  const [ordersLoaded, setOrdersLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [expandedProducts, setExpandedProducts] = useState<Set<string>>(new Set());
  const [productNotes, setProductNotes] = useState<Record<string, string>>({});
  const [productMinimums, setProductMinimums] = useState<Record<string, string>>({});
  const [productPricing, setProductPricing] = useState<Record<string, string>>({});
  const [productMockups, setProductMockups] = useState<Record<string, File | null>>({});
  const [productStatusFilters, setProductStatusFilters] = useState<Set<Product['externalStatus']>>(new Set());
  const [productFilterDropdownOpen, setProductFilterDropdownOpen] = useState(false);
  const [transitioningProductId, setTransitioningProductId] = useState<string | null>(null);
  const [expandingProductId, setExpandingProductId] = useState<string | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
  const filterButtonRef = useRef<HTMLButtonElement>(null);
  const productFilterButtonRef = useRef<HTMLButtonElement>(null);
  const productFilterDropdownRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const sortDropdownRef = useRef<HTMLDivElement>(null);
  const sortButtonRef = useRef<HTMLButtonElement>(null);
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
      const status = generateStatus();
      
      // Generate closed date if status is closed (random date after submission date)
      let closedDate: Date | undefined;
      if (status === 'closed') {
        closedDate = new Date(submittedDate);
        const daysAfter = Math.floor(Math.random() * 30) + 1; // 1-30 days after submission
        closedDate.setDate(closedDate.getDate() + daysAfter);
      }
      
      initialSubmissions.push({
        id: uniqueId,
        submissionNumber: generateSubmissionNumber(),
        status,
        submittedDate,
        deadline: Math.random() > 0.3 ? generateDeadline() : undefined,
        closedDate,
        companyName: generateCompanyName(),
        socialMedia: generateSocialMedia(),
        website: generateWebsite(),
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
      if (
        productFilterDropdownRef.current &&
        productFilterButtonRef.current &&
        !productFilterDropdownRef.current.contains(event.target as Node) &&
        !productFilterButtonRef.current.contains(event.target as Node)
      ) {
        setProductFilterDropdownOpen(false);
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
          const status = generateStatus();
          
          // Generate closed date if status is closed (random date after submission date)
          let closedDate: Date | undefined;
          if (status === 'closed') {
            closedDate = new Date(submittedDate);
            const daysAfter = Math.floor(Math.random() * 30) + 1; // 1-30 days after submission
            closedDate.setDate(closedDate.getDate() + daysAfter);
          }
          
          const companyName = generateCompanyName();
          newSubmissions.push({
            id: uniqueId,
            submissionNumber: generateSubmissionNumber(),
            status,
            submittedDate,
            deadline: Math.random() > 0.3 ? generateDeadline() : undefined,
            closedDate,
            companyName,
            socialMedia: generateSocialMedia(),
            website: generateWebsite(),
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
    const filtered = submissions.filter(submission => {
      const matchesSearch = searchLower === '' || 
        submission.submissionNumber.toLowerCase().includes(searchLower);
      const matchesStatus = statusFilters.size === 0 || statusFilters.has(submission.status);
      return matchesSearch && matchesStatus;
    });
    
    // Apply sorting based on selected option
    const sorted = [...filtered].sort((a, b) => {
      if (sortOption === 'newest') {
        return b.submittedDate.getTime() - a.submittedDate.getTime();
      } else if (sortOption === 'oldest') {
        return a.submittedDate.getTime() - b.submittedDate.getTime();
      } else if (sortOption === 'company-az') {
        return a.companyName.localeCompare(b.companyName);
      }
      return 0;
    });
    
    return sorted;
  }, [submissions, searchQuery, statusFilters, sortOption]);

  const filterCount = statusFilters.size;

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

  const handleSaveProductChanges = (productId: string) => {
    // Save all changes for this product
    // In a real app, this would make an API call to save the data
    // For now, we'll just update the local state and show a transition
    
    // Here you would typically:
    // - Save notes: productNotes[productId]
    // - Save minimums: productMinimums[productId]
    // - Save pricing: productPricing[productId]
    // - Upload mockup PDF: productMockups[productId]
    
    if (!selectedSubmissionData) return;
    
    // Get filtered products (respecting status filters)
    const filteredProducts = selectedSubmissionData.products.filter((product) => {
      if (productStatusFilters.size === 0) return true;
      return productStatusFilters.has(product.externalStatus);
    });
    
    // Find the current product index in filtered list
    const currentIndex = filteredProducts.findIndex(p => p.id === productId);
    
    // Find the next product
    const nextProduct = filteredProducts[currentIndex + 1];
    
    if (nextProduct) {
      // Close current product and animate to next
      setTransitioningProductId(productId);
      setExpandingProductId(nextProduct.id);
      
      setTimeout(() => {
        setExpandedProducts(prev => {
          const newSet = new Set(prev);
          newSet.delete(productId);
          newSet.add(nextProduct.id);
          return newSet;
        });
        
        setTimeout(() => {
          setTransitioningProductId(null);
          setExpandingProductId(null);
          
          // Scroll to the next product
          setTimeout(() => {
            const nextProductElement = document.getElementById(`product-${nextProduct.id}`);
            if (nextProductElement) {
              nextProductElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
          }, 50);
        }, 50);
      }, 300);
    } else {
      // No more products, just close current one
      setTransitioningProductId(productId);
      setTimeout(() => {
        setExpandedProducts(prev => {
          const newSet = new Set(prev);
          newSet.delete(productId);
          return newSet;
        });
        setTransitioningProductId(null);
      }, 300);
    }
  };

  const getStatusColor = (status: string): string => {
    if (status === 'Approved') return 'bg-green-100 text-green-700 border-green-200';
    if (status === 'Revisions Requested') return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    if (status === 'Awaiting Customer Response') return 'bg-blue-100 text-blue-700 border-blue-200';
    if (status === 'Rejected') return 'bg-red-100 text-red-700 border-red-200';
    return 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const toggleProductStatusFilter = useCallback((status: Product['externalStatus']) => {
    setProductStatusFilters(prev => {
      const newFilters = new Set(prev);
      if (newFilters.has(status)) {
        newFilters.delete(status);
      } else {
        newFilters.add(status);
      }
      return newFilters;
    });
  }, []);

  const clearProductStatusFilters = useCallback(() => {
    setProductStatusFilters(new Set());
  }, []);

  const handleProductSelection = useCallback((productId: string, checked: boolean) => {
    setSelectedProducts(prev => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(productId);
      } else {
        newSet.delete(productId);
      }
      return newSet;
    });
  }, []);

  const handleDuplicateProducts = useCallback(() => {
    if (!selectedSubmissionData || selectedProducts.size === 0) return;

    setSubmissions(prev => {
      return prev.map(submission => {
        if (submission.id !== selectedSubmissionData.id) return submission;

        // Get all selected product IDs in order
        const filteredProducts = submission.products.filter((product) => {
          if (productStatusFilters.size === 0) return true;
          return productStatusFilters.has(product.externalStatus);
        });

        const selectedProductIds = filteredProducts
          .filter(p => selectedProducts.has(p.id))
          .map(p => p.id);

        if (selectedProductIds.length === 0) return submission;

        // Start with a copy of all products
        let newProducts = [...submission.products];

        // Process selected products in reverse order to avoid index shifting issues
        const selectedIndices = selectedProductIds
          .map(id => newProducts.findIndex(p => p.id === id))
          .filter(idx => idx !== -1)
          .sort((a, b) => b - a); // Sort descending

        selectedIndices.forEach(originalIndex => {
          const originalProduct = newProducts[originalIndex];
          
          // Create duplicate with new ID
          const duplicate: Product = {
            ...originalProduct,
            id: `product-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          };
          
          // Insert duplicate right after the original
          newProducts.splice(originalIndex + 1, 0, duplicate);
        });

        // Renumber all products
        const renumberedProducts = newProducts.map((p, idx) => {
          const productNameMatch = p.name.match(/^\d+\.\s*(.+)$/);
          const baseName = productNameMatch ? productNameMatch[1] : p.name;
          return {
            ...p,
            name: `${idx + 1}. ${baseName}`
          };
        });

        return {
          ...submission,
          products: renumberedProducts,
          productCount: renumberedProducts.length
        };
      });
    });

    // Clear selection after duplication
    setSelectedProducts(new Set());
  }, [selectedSubmission, selectedProducts, productStatusFilters]);

  const selectedSubmissionData = selectedSubmission ? filteredSubmissions.find(s => s.id === selectedSubmission) : null;

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

            {/* Submission List Header with Sort */}
            <div className="px-4 pt-0 pb-2">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-sm">Submission Number</h2>
                <div className="relative">
                  <button
                    ref={sortButtonRef}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSortDropdownOpen(!sortDropdownOpen);
                    }}
                    className="flex items-center gap-1 px-2 py-1 text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                  >
                    <ArrowUpDownIcon className="size-3" />
                    <span>Sort</span>
                  </button>
                  {sortDropdownOpen && (
                    <div
                      ref={sortDropdownRef}
                      className="absolute right-0 top-full mt-1 z-50 w-48 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md"
                    >
                      <div
                        onClick={() => {
                          setSortOption('newest');
                          setSortDropdownOpen(false);
                        }}
                        className={`relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-xs outline-none transition-colors ${
                          sortOption === 'newest' ? 'bg-accent text-accent-foreground' : 'hover:bg-accent'
                        }`}
                      >
                        Newest to Oldest
                      </div>
                      <div
                        onClick={() => {
                          setSortOption('oldest');
                          setSortDropdownOpen(false);
                        }}
                        className={`relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-xs outline-none transition-colors ${
                          sortOption === 'oldest' ? 'bg-accent text-accent-foreground' : 'hover:bg-accent'
                        }`}
                      >
                        Oldest to Newest
                      </div>
                      <div
                        onClick={() => {
                          setSortOption('company-az');
                          setSortDropdownOpen(false);
                        }}
                        className={`relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-xs outline-none transition-colors ${
                          sortOption === 'company-az' ? 'bg-accent text-accent-foreground' : 'hover:bg-accent'
                        }`}
                      >
                        Company Name (A-Z)
                      </div>
                    </div>
                  )}
                </div>
              </div>
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
                      onClick={() => {
                        setSelectedSubmission(submission.id);
                        setTransitioningProductId(null);
                        setExpandingProductId(null);
                      }}
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
                        <div className="text-xs text-gray-500">{formatSubmissionDate(submission.submittedDate)}</div>
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
            {selectedSubmissionData ? (
              <div className="flex flex-col flex-1 min-h-0">
                {/* Header Section */}
                <div className="px-6 pt-6 pb-4 border-b">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-8 flex-wrap">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 mb-1">{selectedSubmissionData.submissionNumber}</h2>
                          <p className="text-sm text-gray-600">Submitted: {formatSubmissionDate(selectedSubmissionData.submittedDate)}</p>
                          {selectedSubmissionData.deadline && (
                            <p className="text-sm text-gray-600">Due: {formatDeadline(selectedSubmissionData.deadline)}</p>
                          )}
                          {selectedSubmissionData.status === 'closed' && selectedSubmissionData.closedDate && (
                            <p className="text-sm text-gray-600">Closed: {formatSubmissionDate(selectedSubmissionData.closedDate)}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div>
                      <span className={`px-3 py-1.5 rounded-full text-sm font-medium border ${
                        selectedSubmissionData.status === 'open' 
                          ? 'bg-green-50 text-green-600 border-green-100' 
                          : 'bg-red-50 text-red-600 border-red-100'
                      }`}>
                        {selectedSubmissionData.status === 'open' ? 'Open' : 'Closed'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Customer Info Section */}
                <div className="px-6 py-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-900 mb-1">
                        <span className="font-medium">Company:</span> {selectedSubmissionData.companyName}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-900 mb-1">
                        <span className="font-medium">Name:</span> {selectedSubmissionData.customerName}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-900 mb-1">
                        <span className="font-medium">Email:</span> {selectedSubmissionData.customerEmail}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-900 mb-1">
                        <span className="font-medium">Phone Number:</span> {selectedSubmissionData.customerPhone}
                      </p>
                    </div>
                    {selectedSubmissionData.website && (
                      <div>
                        <p className="text-sm text-gray-900 mb-1">
                          <span className="font-medium">Website:</span> {selectedSubmissionData.website}
                        </p>
                      </div>
                    )}
                    {selectedSubmissionData.socialMedia && (
                      <div>
                        <p className="text-sm text-gray-900 mb-1">
                          <span className="font-medium">Social Media:</span> {selectedSubmissionData.socialMedia}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Products Section */}
                <div className="px-6 py-6 border-t">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Products</h3>
                    <div className="flex items-center gap-2">
                      {selectedProducts.size > 0 && (
                        <button
                          className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDuplicateProducts();
                          }}
                        >
                          <span>Duplicate ({selectedProducts.size})</span>
                        </button>
                      )}
                      <button
                        className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle upload mockups
                        }}
                      >
                        <UploadIcon className="size-4" />
                        <span>Upload Mockups</span>
                      </button>
                      <button
                        className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle send to customer
                        }}
                      >
                        <SendIcon className="size-4" />
                        <span>Send to Customer</span>
                      </button>
                      <div className="relative">
                        <button
                          ref={productFilterButtonRef}
                          onClick={(e) => {
                            e.stopPropagation();
                            setProductFilterDropdownOpen(!productFilterDropdownOpen);
                          }}
                          className="relative flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                        >
                          <FilterIcon className="size-4" />
                          <span>Filter</span>
                          {productStatusFilters.size > 0 && (
                            <span className="flex size-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground font-medium">
                              {productStatusFilters.size}
                            </span>
                          )}
                        </button>
                      {productFilterDropdownOpen && (
                        <div
                          ref={productFilterDropdownRef}
                          className="absolute right-0 top-full mt-1 z-50 w-64 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md"
                        >
                          <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                            Status
                          </div>
                          <div className="flex flex-col gap-1 px-2 pb-2">
                            {(['Approved', 'Revisions Requested', 'Awaiting Customer Response', 'Rejected'] as Product['externalStatus'][]).map((status) => {
                              const baseColor = getStatusColor(status);
                              return (
                                <div
                                  key={status}
                                  onClick={() => toggleProductStatusFilter(status)}
                                  className={`relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-xs outline-none transition-colors border ${baseColor} ${
                                    productStatusFilters.has(status)
                                      ? 'ring-2 ring-gray-400 ring-offset-1'
                                      : ''
                                  }`}
                                >
                                  {status}
                                </div>
                              );
                            })}
                          </div>
                          {productStatusFilters.size > 0 && (
                            <>
                              <div className="-mx-1 my-1 h-px bg-muted" />
                              <div
                                onClick={clearProductStatusFilters}
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
                  <div className="space-y-0 border border-gray-200 rounded-lg overflow-hidden">
                    {selectedSubmissionData.products
                      .filter((product) => {
                        if (productStatusFilters.size === 0) return true;
                        return productStatusFilters.has(product.externalStatus);
                      })
                      .map((product, index) => {
                      const isExpanded = expandedProducts.has(product.id);
                      return (
                        <React.Fragment key={product.id}>
                          {/* Product Row */}
                          <div 
                            id={`product-${product.id}`}
                            className={`flex items-center gap-3 px-4 py-3 border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-all duration-300 last:border-b-0 ${
                              transitioningProductId === product.id ? 'opacity-0 -translate-x-4' : 'opacity-100 translate-x-0'
                            }`}
                            onClick={() => toggleProductExpansion(product.id)}
                          >
                            {/* Checkbox */}
                            <input
                              type="checkbox"
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                              checked={selectedProducts.has(product.id)}
                              onChange={(e) => {
                                e.stopPropagation();
                                handleProductSelection(product.id, e.target.checked);
                              }}
                              onClick={(e) => e.stopPropagation()}
                            />
                            
                            {/* Chevron Icon */}
                            <div className="flex-shrink-0">
                              {isExpanded ? (
                                <ChevronDownIcon className="size-4 text-gray-400" />
                              ) : (
                                <ChevronRightIcon className="size-4 text-gray-400" />
                              )}
                            </div>
                            
                            {/* Product Name */}
                            <div className="flex-1 min-w-0">
                              <span className="text-sm text-gray-900">{product.name}</span>
                            </div>
                            
                            {/* Status Badge */}
                            <div className="flex-shrink-0">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(product.externalStatus)}`}>
                                {product.externalStatus}
                              </span>
                            </div>
                          </div>
                          
                          {/* Expanded Content */}
                          {isExpanded && (
                            <div className={`bg-gray-50 border-b border-gray-200 last:border-b-0 transition-all duration-300 ${
                              transitioningProductId === product.id 
                                ? 'opacity-0 -translate-x-4' 
                                : expandingProductId === product.id
                                ? 'opacity-0 translate-x-4 animate-in slide-in-from-right'
                                : 'opacity-100 translate-x-0'
                            }`}>
                              <div className="px-4 py-6">
                                {/* From the Customer Section */}
                                <div className="mb-4">
                                  <div className="flex items-center justify-between mb-3">
                                    <h4 className="text-sm font-semibold text-gray-900">From the customer</h4>
                                    <div>
                                      <span className="text-sm font-medium text-gray-700">Reference Image: </span>
                                      {product.mockupImage ? (
                                        <a
                                          href={product.mockupImage}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-sm italic text-blue-600 hover:text-blue-800 hover:underline"
                                          onClick={(e) => e.stopPropagation()}
                                        >
                                          view reference image
                                        </a>
                                      ) : (
                                        <span className="text-sm italic text-gray-400">No reference image</span>
                                      )}
                                    </div>
                                  </div>
                                  <div className="w-full">
                                    <span className="text-sm font-medium text-gray-700 block mb-2">Product Specific Notes from customer:</span>
                                    <div className="w-full border border-gray-300 rounded p-2 bg-gray-50">
                                      <p className="text-sm text-gray-700 whitespace-pre-wrap">
                                        {product.notes || <span className="text-gray-400 italic">No notes from customer</span>}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                
                                {/* Dividing Line */}
                                <div className="border-t border-gray-200 mb-4"></div>
                                
                                {/* Upload Mockups - Full Width */}
                                <div className="mb-4">
                                  <label className="text-sm font-medium text-gray-900 mb-2 block">Upload Mockups</label>
                                  <div className="w-full min-h-[200px] bg-gray-100 rounded border-2 border-dashed border-gray-300">
                                    {productMockups[product.id] ? (
                                      <div className="p-6">
                                        <div className="flex items-center justify-between mb-4">
                                          <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-red-100 rounded flex items-center justify-center">
                                              <span className="text-red-600 font-semibold text-sm">PDF</span>
                                            </div>
                                            <div>
                                              <p className="text-sm font-medium text-gray-900">{productMockups[product.id]?.name}</p>
                                              <p className="text-xs text-gray-500">
                                                {(productMockups[product.id]?.size! / 1024 / 1024).toFixed(2)} MB
                                              </p>
                                            </div>
                                          </div>
                                          <div className="flex items-center gap-2">
                                            <Button
                                              variant="outline"
                                              size="sm"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                if (productMockups[product.id]) {
                                                  const url = URL.createObjectURL(productMockups[product.id]!);
                                                  window.open(url, '_blank');
                                                }
                                              }}
                                            >
                                              View
                                            </Button>
                                            <Button
                                              variant="outline"
                                              size="sm"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                setProductMockups(prev => {
                                                  const newMockups = { ...prev };
                                                  delete newMockups[product.id];
                                                  return newMockups;
                                                });
                                              }}
                                            >
                                              Remove
                                            </Button>
                                          </div>
                                        </div>
                                      </div>
                                    ) : (
                                      <label 
                                        className="w-full h-96 flex items-center justify-center cursor-pointer"
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        <input
                                          type="file"
                                          accept=".pdf"
                                          className="hidden"
                                          onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file && file.type === 'application/pdf') {
                                              setProductMockups(prev => ({ ...prev, [product.id]: file }));
                                            }
                                          }}
                                        />
                                        <div className="text-center">
                                          <UploadIcon className="size-8 text-gray-400 mx-auto mb-2" />
                                          <p className="text-sm text-gray-600">Upload Mockups PDF</p>
                                          <p className="text-xs text-gray-500 mt-1">Click or drag to upload</p>
                                        </div>
                                      </label>
                                    )}
                                  </div>
                                </div>
                                
                                {/* Notes Section - Full Width */}
                                <div>
                                  <label className="text-sm font-medium text-gray-900 mb-2 block">Notes</label>
                                  <textarea
                                    className="w-full border border-gray-300 rounded p-3 text-sm resize-none min-h-[100px]"
                                    placeholder="Add notes..."
                                    value={productNotes[product.id] || ''}
                                    onChange={(e) => setProductNotes(prev => ({ ...prev, [product.id]: e.target.value }))}
                                    onClick={(e) => e.stopPropagation()}
                                  />
                                  <div className="mt-3 flex items-center justify-between gap-6">
                                    <div className="flex items-center gap-6">
                                      <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium text-gray-700">Minimums:</span>
                                        <Input
                                          type="text"
                                          value={productMinimums[product.id] ?? product.minimums}
                                          onChange={(e) => {
                                            e.stopPropagation();
                                            setProductMinimums(prev => ({ ...prev, [product.id]: e.target.value }));
                                          }}
                                          onClick={(e) => e.stopPropagation()}
                                          className="w-48"
                                        />
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium text-gray-700">Pricing:</span>
                                        <Input
                                          type="text"
                                          value={productPricing[product.id] ?? product.pricing}
                                          onChange={(e) => {
                                            e.stopPropagation();
                                            setProductPricing(prev => ({ ...prev, [product.id]: e.target.value }));
                                          }}
                                          onClick={(e) => e.stopPropagation()}
                                          className="w-48"
                                        />
                                      </div>
                                    </div>
                                    <Button 
                                      className="bg-blue-600 text-white hover:bg-blue-700"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleSaveProductChanges(product.id);
                                      }}
                                    >
                                      Save Changes
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>

                {/* Artwork Section */}
                <div className="px-6 py-6 border-t">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Artwork</h3>
                  <div className="flex flex-wrap gap-4">
                    {selectedSubmissionData.artworkImages.map((img, idx) => (
                      <div key={idx} className="w-24 h-24 bg-gray-200 rounded overflow-hidden">
                        <Image 
                          src={img} 
                          alt={`Artwork ${idx + 1}`} 
                          width={96} 
                          height={96} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* History Section */}
                <div className="px-6 py-6 border-t">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">History</h3>
                  <div className="space-y-4">
                    {selectedSubmissionData.history.map((item) => (
                      <div key={item.id} className="flex items-start gap-4 pb-4 border-b border-gray-200 last:border-b-0">
                        <div className="flex-shrink-0 w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium text-gray-900">{item.action}</span>
                            <span className="text-xs text-gray-500">
                              {formatSubmissionDate(item.date)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
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
