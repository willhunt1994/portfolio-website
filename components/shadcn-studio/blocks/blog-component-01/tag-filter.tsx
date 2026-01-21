'use client';

import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';

interface TagFilterProps {
  allTags: string[];
}

export default function TagFilter({ allTags }: TagFilterProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedTags = searchParams.get('tags')?.split(',').filter(Boolean) || [];
  const currentPage = searchParams.get('page') || '1';

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleTag = (tag: string) => {
    const isSelected = selectedTags.includes(tag);
    let newTags: string[];
    
    if (isSelected) {
      newTags = selectedTags.filter(t => t !== tag);
    } else {
      newTags = [...selectedTags, tag];
    }

    const params = new URLSearchParams();
    if (newTags.length > 0) {
      params.set('tags', newTags.join(','));
    }
    // Reset to page 1 when filtering
    params.set('page', '1');

    router.push(`/our-work?${params.toString()}`);
  };

  const clearFilters = () => {
    const params = new URLSearchParams();
    params.set('page', '1');
    router.push(`/our-work?${params.toString()}`);
    setIsOpen(false);
  };

  return (
    <div className="py-6 px-[10px] bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto">
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors text-sm font-medium"
          >
            Refine
            {selectedTags.length > 0 && (
              <span className="ml-1 px-2 py-0.5 bg-black dark:bg-white text-white dark:text-black rounded-full text-xs">
                {selectedTags.length}
              </span>
            )}
            <svg
              className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isOpen && (
            <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    Filter by tags
                  </h3>
                  {selectedTags.length > 0 && (
                    <button
                      onClick={clearFilters}
                      className="text-xs text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white underline"
                    >
                      Clear all
                    </button>
                  )}
                </div>
                <div className="space-y-2">
                  {allTags.map((tag) => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                      <label
                        key={tag}
                        className="flex items-center gap-2 p-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleTag(tag)}
                          className="w-4 h-4 text-black dark:text-white border-zinc-300 dark:border-zinc-600 rounded focus:ring-2 focus:ring-black dark:focus:ring-white"
                        />
                        <span className="text-sm text-zinc-700 dark:text-zinc-300">{tag}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
