"use client";

import Link from "next/link";
import { formatCurrency, formatLPA, getTypeColor, getRatingColor, cn } from "@/lib/utils";
import { CollegeListItem } from "@/lib/types";

type CollegeGridProps = {
  colleges: CollegeListItem[];
  loading: boolean;
  onClearFilters: () => void;
};

export function CollegeGrid({ colleges, loading, onClearFilters }: CollegeGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 h-[280px] animate-pulse flex flex-col">
            <div className="h-5 bg-gray-200 rounded w-3/4 mb-3" />
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
            <div className="h-4 bg-gray-200 rounded w-full mb-2" />
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-4" />
            <div className="h-10 bg-gray-200 rounded w-full mt-auto" />
          </div>
        ))}
      </div>
    );
  }

  if (colleges.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-xl border border-gray-200 shadow-sm">
        <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <h3 className="text-xl font-bold text-gray-900 mb-2">No colleges found</h3>
        <p className="text-gray-500 mb-6">Try adjusting your search or filters to find what you're looking for.</p>
        <button 
          onClick={onClearFilters}
          className="px-6 py-2 bg-indigo-50 text-indigo-700 font-medium rounded-lg hover:bg-indigo-100 transition-colors"
        >
          Clear all filters
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {colleges.map((college, index) => (
        <Link
          href={`/colleges/${college.slug}`}
          key={college.id}
          className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 flex flex-col shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-indigo-100 transition-all duration-300 group"
          style={{ animationFillMode: "both", animation: `fadeIn 0.5s ease-out ${index * 0.1}s` }}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1 min-w-0 pr-4">
              <h3 className="font-bold text-gray-900 text-lg leading-tight line-clamp-2 mb-2 group-hover:text-indigo-600 transition-colors">
                {college.name}
              </h3>
              <p className="text-sm text-gray-500 flex items-center gap-1.5">
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="truncate">{college.location}</span>
              </p>
            </div>
            <span className={cn('text-xs px-2.5 py-1 rounded-md font-semibold flex-shrink-0', getTypeColor(college.type))}>
              {college.type}
            </span>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <span className={cn('text-sm font-bold px-2.5 py-1 rounded-md flex items-center gap-1', getRatingColor(college.rating))}>
              <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {college.rating.toFixed(1)}
            </span>
            {college.ranking && (
              <span className="text-sm font-medium text-gray-500 bg-gray-50 px-2.5 py-1 rounded-md">
                Rank #{college.ranking}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 mt-auto pt-4 border-t border-gray-100">
            <div>
              <p className="text-xs text-gray-500 font-medium mb-1">Total Fees</p>
              <p className="text-sm sm:text-base font-bold text-gray-900">
                {college.feesMin ? `${formatCurrency(college.feesMin)}` : 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium mb-1">Avg Package</p>
              <p className="text-sm sm:text-base font-bold text-gray-900 text-emerald-600">
                {college.avgPackage ? formatLPA(college.avgPackage) : 'N/A'}
              </p>
            </div>
          </div>
        </Link>
      ))}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
