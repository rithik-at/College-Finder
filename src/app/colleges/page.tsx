'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from '@/hooks/useDebounce';
import { CollegeListItem, PaginatedResponse } from '@/lib/types';

import { CollegeGrid } from '@/components/college/CollegeGrid';
import { CollegeFilters } from '@/components/college/CollegeFilters';
import { CollegePagination } from '@/components/college/CollegePagination';

function CollegesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [colleges, setColleges] = useState<CollegeListItem[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const currentQuery = searchParams.get('q') || '';
  const currentType = searchParams.get('type') || '';
  const currentState = searchParams.get('state') || '';
  const currentSort = searchParams.get('sortBy') || 'ranking';
  const currentCourse = searchParams.get('course') || '';
  const currentPage = parseInt(searchParams.get('page') || '1');

  const [searchInput, setSearchInput] = useState(currentQuery);
  const debouncedSearch = useDebounce(searchInput, 300);

  const updateFilters = useCallback((updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    if (!('page' in updates)) {
      params.delete('page');
    }
    router.push(`/colleges?${params.toString()}`, { scroll: false });
  }, [router, searchParams]);

  useEffect(() => {
    if (debouncedSearch !== currentQuery) {
      updateFilters({ q: debouncedSearch });
    }
  }, [debouncedSearch, currentQuery, updateFilters]);

  useEffect(() => {
    const fetchColleges = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (currentQuery) params.set('q', currentQuery);
        if (currentType) params.set('type', currentType);
        if (currentState) params.set('state', currentState);
        if (currentCourse) params.set('course', currentCourse);
        if (currentSort) params.set('sortBy', currentSort);
        params.set('page', currentPage.toString());
        params.set('limit', '12');

        const res = await fetch(`/api/colleges?${params.toString()}`);
        const data: PaginatedResponse<CollegeListItem> = await res.json();
        setColleges(data.data);
        setTotal(data.total);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Failed to fetch colleges:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchColleges();
  }, [currentQuery, currentType, currentState, currentCourse, currentSort, currentPage]);

  const clearFilters = () => {
    setSearchInput('');
    router.push('/colleges');
    setFiltersOpen(false);
  };

  const hasActiveFilters = Boolean(currentQuery || currentType || currentState || currentCourse || currentSort !== 'ranking');

  return (
    <div className="min-h-screen bg-gray-50/50 w-full flex flex-col">
      <div className="bg-[#1e3a5f] pt-12 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 tracking-tight">
            Explore Colleges
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl text-center">
            Discover and filter through top engineering colleges across India to find your perfect match.
          </p>
        </div>
      </div>

      <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 -mt-10 relative z-10">
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-10">
          <CollegeFilters 
            currentType={currentType}
            currentState={currentState}
            currentSort={currentSort}
            currentCourse={currentCourse}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            updateFilters={updateFilters}
            clearFilters={clearFilters}
            hasActiveFilters={hasActiveFilters}
            filtersOpen={filtersOpen}
          />

          <div className="flex-1 min-w-0">
            <div className="hidden lg:block h-9 mb-4"></div>
            <div className="lg:hidden flex items-center justify-end mb-6 sm:mb-8 bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <button
                onClick={() => setFiltersOpen(!filtersOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-50 text-indigo-700 text-sm font-bold hover:bg-indigo-100 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                {filtersOpen ? 'Hide Filters' : 'Show Filters'}
              </button>
            </div>

            <CollegeGrid 
              colleges={colleges} 
              loading={loading} 
              onClearFilters={clearFilters} 
            />

            <div className="mt-8 sm:mt-12">
              <CollegePagination 
                totalPages={totalPages} 
                currentPage={currentPage} 
                updateFilters={updateFilters} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CollegesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50/50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4 shadow-lg" />
          <p className="text-sm font-semibold text-gray-600 animate-pulse">Loading colleges...</p>
        </div>
      </div>
    }>
      <CollegesContent />
    </Suspense>
  );
}
