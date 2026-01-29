'use client';

import React, { useState } from 'react';
import { SearchIcon, FilterIcon, Grid3x3, List, Columns2, Columns3, Columns4, ChevronDown, Ruler, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface CatalogItem {
  id: string;
  name: string;
  description: string;
  image: string;
  price?: number;
  category: string;
  tags: string[];
  colorCount: number;
  colors?: string[]; // Array of color hex codes or names
}

// Sample catalog data - replace with your actual data
const catalogItems: CatalogItem[] = [
  {
    id: '1',
    name: 'Custom Socks - Black',
    description: 'Premium custom socks in classic black',
    image: 'https://images.unsplash.com/photo-1586350977773-bf3e3c8ba5d4?w=400&h=500&fit=crop',
    price: 24.99,
    category: 'Socks',
    tags: ['Custom', 'Black', 'Premium'],
    colorCount: 12
  },
  {
    id: '2',
    name: 'Custom Socks - White',
    description: 'Premium custom socks in crisp white',
    image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=500&fit=crop',
    price: 24.99,
    category: 'Socks',
    tags: ['Custom', 'White', 'Premium'],
    colorCount: 8
  },
  {
    id: '3',
    name: 'Custom T-Shirt',
    description: 'High-quality custom t-shirt',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop',
    price: 29.99,
    category: 'Apparel',
    tags: ['Custom', 'T-Shirt', 'Cotton'],
    colorCount: 15
  },
  {
    id: '4',
    name: 'Custom Hoodie',
    description: 'Comfortable custom hoodie',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop',
    price: 49.99,
    category: 'Apparel',
    tags: ['Custom', 'Hoodie', 'Warm'],
    colorCount: 10
  },
  {
    id: '5',
    name: 'Custom Cap',
    description: 'Stylish custom cap',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=500&fit=crop',
    price: 19.99,
    category: 'Accessories',
    tags: ['Custom', 'Cap', 'Stylish'],
    colorCount: 6
  },
  {
    id: '6',
    name: 'Custom Mug',
    description: 'Personalized custom mug',
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=500&fit=crop',
    price: 14.99,
    category: 'Accessories',
    tags: ['Custom', 'Mug', 'Personalized'],
    colorCount: 4
  },
  {
    id: '7',
    name: 'Athletic Performance Socks',
    description: 'Moisture-wicking athletic socks',
    image: 'https://images.unsplash.com/photo-1586350977773-bf3e3c8ba5d4?w=400&h=500&fit=crop',
    price: 18.99,
    category: 'Socks',
    tags: ['Athletic', 'Performance', 'Moisture-wicking'],
    colorCount: 9
  },
  {
    id: '8',
    name: 'Premium Crew Neck T-Shirt',
    description: 'Classic crew neck t-shirt',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop',
    price: 32.99,
    category: 'Apparel',
    tags: ['Crew Neck', 'Classic', 'Premium'],
    colorCount: 18
  },
  {
    id: '9',
    name: 'V-Neck T-Shirt',
    description: 'Comfortable v-neck t-shirt',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=500&fit=crop',
    price: 32.99,
    category: 'Apparel',
    tags: ['V-Neck', 'Comfortable', 'Classic'],
    colorCount: 16
  },
  {
    id: '10',
    name: 'Long Sleeve T-Shirt',
    description: 'Versatile long sleeve t-shirt',
    image: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=400&h=500&fit=crop',
    price: 38.99,
    category: 'Apparel',
    tags: ['Long Sleeve', 'Versatile', 'Warm'],
    colorCount: 14
  },
  {
    id: '11',
    name: 'Polo Shirt',
    description: 'Classic polo shirt',
    image: 'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=400&h=500&fit=crop',
    price: 44.99,
    category: 'Apparel',
    tags: ['Polo', 'Classic', 'Professional'],
    colorCount: 12
  },
  {
    id: '12',
    name: 'Zip-Up Hoodie',
    description: 'Modern zip-up hoodie',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop',
    price: 54.99,
    category: 'Apparel',
    tags: ['Zip-Up', 'Modern', 'Comfortable'],
    colorCount: 11
  },
  {
    id: '13',
    name: 'Pullover Hoodie',
    description: 'Cozy pullover hoodie',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop',
    price: 52.99,
    category: 'Apparel',
    tags: ['Pullover', 'Cozy', 'Warm'],
    colorCount: 13
  },
  {
    id: '14',
    name: 'Baseball Cap',
    description: 'Classic baseball cap',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=500&fit=crop',
    price: 22.99,
    category: 'Accessories',
    tags: ['Baseball', 'Classic', 'Adjustable'],
    colorCount: 7
  },
  {
    id: '15',
    name: 'Beanie',
    description: 'Warm winter beanie',
    image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=500&fit=crop',
    price: 16.99,
    category: 'Accessories',
    tags: ['Beanie', 'Winter', 'Warm'],
    colorCount: 8
  },
  {
    id: '16',
    name: 'Travel Mug',
    description: 'Insulated travel mug',
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=500&fit=crop',
    price: 19.99,
    category: 'Accessories',
    tags: ['Travel', 'Insulated', 'Portable'],
    colorCount: 5
  },
  {
    id: '17',
    name: 'Water Bottle',
    description: 'Reusable water bottle',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=500&fit=crop',
    price: 17.99,
    category: 'Accessories',
    tags: ['Water Bottle', 'Reusable', 'Eco-friendly'],
    colorCount: 6
  },
  {
    id: '18',
    name: 'Tote Bag',
    description: 'Stylish canvas tote bag',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=500&fit=crop',
    price: 24.99,
    category: 'Accessories',
    tags: ['Tote Bag', 'Canvas', 'Stylish'],
    colorCount: 9
  },
  {
    id: '19',
    name: 'Backpack',
    description: 'Durable custom backpack',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop',
    price: 64.99,
    category: 'Accessories',
    tags: ['Backpack', 'Durable', 'Custom'],
    colorCount: 10
  },
  {
    id: '20',
    name: 'Tank Top',
    description: 'Comfortable tank top',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop',
    price: 26.99,
    category: 'Apparel',
    tags: ['Tank Top', 'Comfortable', 'Casual'],
    colorCount: 14
  },
  {
    id: '21',
    name: 'Sweatshirt',
    description: 'Classic crewneck sweatshirt',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop',
    price: 48.99,
    category: 'Apparel',
    tags: ['Sweatshirt', 'Crewneck', 'Classic'],
    colorCount: 12
  },
  {
    id: '22',
    name: 'Sweatpants',
    description: 'Comfortable sweatpants',
    image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&h=500&fit=crop',
    price: 42.99,
    category: 'Apparel',
    tags: ['Sweatpants', 'Comfortable', 'Casual'],
    colorCount: 8
  },
  {
    id: '23',
    name: 'Short Sleeve Polo',
    description: 'Casual short sleeve polo',
    image: 'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=400&h=500&fit=crop',
    price: 39.99,
    category: 'Apparel',
    tags: ['Polo', 'Short Sleeve', 'Casual'],
    colorCount: 11
  },
  {
    id: '24',
    name: 'Performance Shorts',
    description: 'Athletic performance shorts',
    image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&h=500&fit=crop',
    price: 34.99,
    category: 'Apparel',
    tags: ['Shorts', 'Performance', 'Athletic'],
    colorCount: 7
  },
  {
    id: '25',
    name: 'Ankle Socks',
    description: 'Comfortable ankle socks',
    image: 'https://images.unsplash.com/photo-1586350977773-bf3e3c8ba5d4?w=400&h=500&fit=crop',
    price: 12.99,
    category: 'Socks',
    tags: ['Ankle', 'Comfortable', 'Everyday'],
    colorCount: 10
  },
  {
    id: '26',
    name: 'Crew Socks',
    description: 'Classic crew socks',
    image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=500&fit=crop',
    price: 13.99,
    category: 'Socks',
    tags: ['Crew', 'Classic', 'Versatile'],
    colorCount: 11
  },
  {
    id: '27',
    name: 'No-Show Socks',
    description: 'Discreet no-show socks',
    image: 'https://images.unsplash.com/photo-1586350977773-bf3e3c8ba5d4?w=400&h=500&fit=crop',
    price: 11.99,
    category: 'Socks',
    tags: ['No-Show', 'Discreet', 'Low-cut'],
    colorCount: 9
  },
  {
    id: '28',
    name: 'Knee-High Socks',
    description: 'Classic knee-high socks',
    image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=500&fit=crop',
    price: 15.99,
    category: 'Socks',
    tags: ['Knee-High', 'Classic', 'Warm'],
    colorCount: 8
  },
  {
    id: '29',
    name: 'Windbreaker',
    description: 'Lightweight windbreaker jacket',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop',
    price: 59.99,
    category: 'Apparel',
    tags: ['Windbreaker', 'Lightweight', 'Weatherproof'],
    colorCount: 9
  },
  {
    id: '30',
    name: 'Fleece Jacket',
    description: 'Warm fleece jacket',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop',
    price: 69.99,
    category: 'Apparel',
    tags: ['Fleece', 'Warm', 'Cozy'],
    colorCount: 10
  },
  {
    id: '31',
    name: 'Snapback Cap',
    description: 'Adjustable snapback cap',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=500&fit=crop',
    price: 23.99,
    category: 'Accessories',
    tags: ['Snapback', 'Adjustable', 'Stylish'],
    colorCount: 12
  },
  {
    id: '32',
    name: 'Bucket Hat',
    description: 'Trendy bucket hat',
    image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=500&fit=crop',
    price: 21.99,
    category: 'Accessories',
    tags: ['Bucket Hat', 'Trendy', 'Casual'],
    colorCount: 6
  },
  {
    id: '33',
    name: 'Duffel Bag',
    description: 'Spacious duffel bag',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop',
    price: 54.99,
    category: 'Accessories',
    tags: ['Duffel Bag', 'Spacious', 'Travel'],
    colorCount: 7
  },
  {
    id: '34',
    name: 'Fanny Pack',
    description: 'Convenient fanny pack',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=500&fit=crop',
    price: 19.99,
    category: 'Accessories',
    tags: ['Fanny Pack', 'Convenient', 'Compact'],
    colorCount: 8
  },
  {
    id: '35',
    name: 'Keychain',
    description: 'Custom keychain',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=500&fit=crop',
    price: 8.99,
    category: 'Accessories',
    tags: ['Keychain', 'Custom', 'Small'],
    colorCount: 5
  },
  {
    id: '36',
    name: 'Lanyard',
    description: 'Durable custom lanyard',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=500&fit=crop',
    price: 7.99,
    category: 'Accessories',
    tags: ['Lanyard', 'Durable', 'Custom'],
    colorCount: 6
  },
  {
    id: '37',
    name: 'Wristband',
    description: 'Silicone wristband',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=500&fit=crop',
    price: 4.99,
    category: 'Accessories',
    tags: ['Wristband', 'Silicone', 'Durable'],
    colorCount: 13
  },
  {
    id: '38',
    name: 'Sticker Pack',
    description: 'Custom sticker pack',
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=500&fit=crop',
    price: 9.99,
    category: 'Accessories',
    tags: ['Stickers', 'Custom', 'Decorative'],
    colorCount: 20
  },
  {
    id: '39',
    name: 'Pen Set',
    description: 'Custom pen set',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=500&fit=crop',
    price: 12.99,
    category: 'Accessories',
    tags: ['Pens', 'Custom', 'Professional'],
    colorCount: 4
  },
  {
    id: '40',
    name: 'Notebook',
    description: 'Custom branded notebook',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=500&fit=crop',
    price: 14.99,
    category: 'Accessories',
    tags: ['Notebook', 'Custom', 'Branded'],
    colorCount: 3
  }
];

export default function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [viewMode] = useState<'grid'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [gridColumns, setGridColumns] = useState<4 | 6 | 8>(6);
  const [selectedProduct, setSelectedProduct] = useState<CatalogItem | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [selectedColorIndex, setSelectedColorIndex] = useState<number | null>(null);

  // Get unique categories
  const categories = ['All', ...Array.from(new Set(catalogItems.map(item => item.category)))];

  // Filter items based on search and category
  const filteredItems = catalogItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 pt-24 pb-8 md:pt-28 md:pb-12">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Catalog</h1>
          <p className="text-lg text-gray-600">Use this page to see all the products we can customize.</p>
          <p className="text-lg text-gray-600 mt-2">When you're ready hit 'Get Started'</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-5" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full"
              />
            </div>

            {/* Column Selector */}
            <div className="flex gap-2 flex-wrap">
              <div className="hidden md:flex items-center gap-1 border border-gray-200 rounded-md p-1">
                <button
                  onClick={() => setGridColumns(4)}
                  className={`p-2 rounded transition-colors ${
                    gridColumns === 4
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  title="4 columns"
                >
                  <Columns2 className="size-4" />
                </button>
                <button
                  onClick={() => setGridColumns(6)}
                  className={`p-2 rounded transition-colors ${
                    gridColumns === 6
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  title="6 columns"
                >
                  <Columns3 className="size-4" />
                </button>
                <button
                  onClick={() => setGridColumns(8)}
                  className={`p-2 rounded transition-colors ${
                    gridColumns === 8
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  title="8 columns"
                >
                  <Columns4 className="size-4" />
                </button>
              </div>
              <Button
                variant={showFilters ? 'default' : 'outline'}
                onClick={() => setShowFilters(!showFilters)}
                className="h-10 px-4"
              >
                <FilterIcon className="size-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          {/* Category Filters */}
          {showFilters && (
            <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700 mr-2">Categories:</span>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-gray-600">
            Showing {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
            {searchQuery && ` for "${searchQuery}"`}
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          </p>
        </div>

        {/* Catalog Items */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
            <Button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-4"
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 ${
            gridColumns === 4 ? 'xl:grid-cols-4' :
            gridColumns === 6 ? 'xl:grid-cols-6' :
            'xl:grid-cols-8'
          }`}>
            {filteredItems.map((item, index) => {
              const isSelected = selectedProduct?.id === item.id;
              const selectedIndex = selectedProduct ? filteredItems.findIndex(i => i.id === selectedProduct.id) : -1;
              
              // Calculate which row the selected product is in
              // For desktop (xl breakpoint), use the gridColumns value
              const xlColumns = gridColumns;
              const selectedRow = selectedIndex >= 0 ? Math.floor(selectedIndex / xlColumns) : -1;
              const currentRow = Math.floor(index / xlColumns);
              const isLastInRow = (index + 1) % xlColumns === 0 || index === filteredItems.length - 1;
              // Show quick view after the row containing the selected product completes
              const shouldShowQuickView = selectedProduct && isLastInRow && currentRow === selectedRow;
              
              return (
                <React.Fragment key={item.id}>
                  <div 
                    className="group bg-white border border-gray-200 rounded-[2px] overflow-hidden cursor-pointer"
                  >
                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-100">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className={`font-semibold text-gray-900 mb-2 ${
                        gridColumns === 4 ? 'text-lg' :
                        gridColumns === 6 ? 'text-base' :
                        'text-sm'
                      }`}>{item.name}</h3>
                      <p className={`text-gray-600 italic mb-2 ${
                        gridColumns === 4 ? 'text-sm' :
                        gridColumns === 6 ? 'text-xs' :
                        'text-xs'
                      }`}>{item.colorCount} colors</p>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setSelectedProduct(isSelected ? null : item);
                          setSelectedColorIndex(null);
                        }}
                        className={`text-gray-600 relative inline-block group ${
                          gridColumns === 4 ? 'text-sm' :
                          gridColumns === 6 ? 'text-xs' :
                          'text-xs'
                        }`}
                      >
                        View more
                        <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gray-600 transition-all duration-300 ease-out group-hover:w-full"></span>
                      </button>
                    </div>
                  </div>
                  
                  {/* Quick View Content - appears below the entire row */}
                  {shouldShowQuickView && selectedProduct && (
                    <div 
                      className="col-span-full bg-white border border-gray-200 rounded-[2px] overflow-hidden animate-in slide-in-from-top-2 fade-in duration-300 relative"
                    >
                      {/* Close Button */}
                      <button
                        onClick={() => {
                          setSelectedProduct(null);
                          setSelectedColorIndex(null);
                        }}
                        className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="Close quick view"
                      >
                        <X className="size-5" />
                      </button>
                      <div className="p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                          {/* Product Image */}
                          <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-100 rounded-lg">
                            <Image
                              src={selectedProduct.image}
                              alt={selectedProduct.name}
                              fill
                              className="object-cover"
                            />
                          </div>

                          {/* Product Details */}
                          <div className="flex flex-col">
                            {/* Header with Category */}
                            <div className="flex items-start justify-between mb-4">
                              <span className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                                {selectedProduct.category}
                              </span>
                            </div>

                            {/* Product Title */}
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">{selectedProduct.name}</h1>

                            {/* Color Swatches */}
                            <div className="mb-6">
                              <p className="text-sm font-medium text-gray-900 mb-3 bg-white px-2 py-1 inline-block">Available Colors</p>
                              <div className="flex flex-wrap gap-2">
                                {Array.from({ length: selectedProduct.colorCount }).map((_, idx) => {
                                  // Generate a color - you can replace this with actual color data
                                  const colors = [
                                    '#000000', '#FFFFFF', '#FF0000', '#0000FF', '#00FF00', '#FFFF00', '#FF00FF', '#00FFFF',
                                    '#FFA500', '#800080', '#FFC0CB', '#A52A2A', '#808080', '#000080', '#008000', '#FFD700',
                                    '#FF6347', '#40E0D0', '#EE82EE', '#F5DEB3'
                                  ];
                                  const colorHex = colors[idx % colors.length];
                                  const isSelected = selectedColorIndex === idx;
                                  return (
                                    <button
                                      key={idx}
                                      onClick={() => setSelectedColorIndex(idx)}
                                      className={`w-8 h-8 rounded-full transition-all ${
                                        isSelected ? 'shadow-md' : 'shadow-none hover:shadow-sm'
                                      }`}
                                      style={{ backgroundColor: colorHex, border: '1px solid #fcfcfc' }}
                                      title={`Color ${idx + 1}`}
                                    />
                                  );
                                })}
                              </div>
                            </div>

                            {/* Product Features */}
                            <div className="mb-6">
                              <ul className="space-y-2">
                                <li className="text-sm text-gray-700 flex items-start">
                                  <span className="mr-2">•</span>
                                  <span>Premium quality materials</span>
                                </li>
                                <li className="text-sm text-gray-700 flex items-start">
                                  <span className="mr-2">•</span>
                                  <span>Customizable design options</span>
                                </li>
                                <li className="text-sm text-gray-700 flex items-start">
                                  <span className="mr-2">•</span>
                                  <span>Durable construction</span>
                                </li>
                              </ul>
                            </div>

                            {/* Model Size */}
                            <p className="text-sm text-gray-600 mb-2">Model Size: One Size</p>

                            {/* Lead Time */}
                            <p className="text-sm text-gray-600 mb-6">Lead Time: Up to 4 weeks including shipping</p>

                            {/* Get Started Button */}
                            <Button className="w-full mb-6 bg-gray-900 hover:bg-gray-800 text-white" size="lg">
                              Get Started
                            </Button>

                            {/* Collapsible Sections */}
                            <div className="space-y-2">
                              {/* Fabric Section */}
                              <button
                                onClick={() => {
                                  setExpandedSections(prev => {
                                    const updated = new Set(prev);
                                    if (updated.has('fabric')) {
                                      updated.delete('fabric');
                                    } else {
                                      updated.add('fabric');
                                    }
                                    return updated;
                                  });
                                }}
                                className="w-full flex items-center justify-between p-4 bg-gray-50 rounded border border-gray-200 hover:bg-gray-100 transition-colors"
                              >
                                <span className="text-sm font-medium text-gray-900">Fabric</span>
                                <ChevronDown className={`size-4 text-gray-600 transition-transform ${expandedSections.has('fabric') ? 'rotate-180' : ''}`} />
                              </button>
                              {expandedSections.has('fabric') && (
                                <div className="p-4 bg-gray-50 rounded border border-gray-200 border-t-0">
                                  <p className="text-sm text-gray-600">Premium quality fabric details will be displayed here.</p>
                                </div>
                              )}

                              {/* Care Section */}
                              <button
                                onClick={() => {
                                  setExpandedSections(prev => {
                                    const updated = new Set(prev);
                                    if (updated.has('care')) {
                                      updated.delete('care');
                                    } else {
                                      updated.add('care');
                                    }
                                    return updated;
                                  });
                                }}
                                className="w-full flex items-center justify-between p-4 bg-gray-50 rounded border border-gray-200 hover:bg-gray-100 transition-colors"
                              >
                                <span className="text-sm font-medium text-gray-900">Care</span>
                                <ChevronDown className={`size-4 text-gray-600 transition-transform ${expandedSections.has('care') ? 'rotate-180' : ''}`} />
                              </button>
                              {expandedSections.has('care') && (
                                <div className="p-4 bg-gray-50 rounded border border-gray-200 border-t-0">
                                  <p className="text-sm text-gray-600">Care instructions will be displayed here.</p>
                                </div>
                              )}
                            </div>

                            {/* Size Chart Button */}
                            <button className="mt-6 flex items-center gap-2 px-4 py-3 border border-gray-200 rounded hover:bg-gray-50 transition-colors">
                              <Ruler className="size-5 text-gray-600" />
                              <span className="text-sm font-medium text-gray-900">Size Chart</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        )}

      </main>
    </div>
  );
}
