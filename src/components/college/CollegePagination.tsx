"use client";

import { cn } from "@/lib/utils";

type CollegePaginationProps = {
  totalPages: number;
  currentPage: number;
  updateFilters: (updates: Record<string, string>) => void;
};

export function CollegePagination({ totalPages, currentPage, updateFilters }: CollegePaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      <button
        onClick={() => updateFilters({ page: Math.max(1, currentPage - 1).toString() })}
        disabled={currentPage <= 1}
        className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
      >
        ← Prev
      </button>
      <div className="flex items-center gap-1 hidden sm:flex">
        {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
          let pageNum: number;
          if (totalPages <= 7) {
            pageNum = i + 1;
          } else if (currentPage <= 4) {
            pageNum = i + 1;
          } else if (currentPage >= totalPages - 3) {
            pageNum = totalPages - 6 + i;
          } else {
            pageNum = currentPage - 3 + i;
          }
          return (
            <button
              key={pageNum}
              onClick={() => updateFilters({ page: pageNum.toString() })}
              className={cn(
                'w-10 h-10 rounded-xl text-sm font-semibold transition-all',
                currentPage === pageNum
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                  : 'border border-transparent hover:border-gray-200 hover:bg-gray-50 text-gray-700'
              )}
            >
              {pageNum}
            </button>
          );
        })}
      </div>
      <button
        onClick={() => updateFilters({ page: Math.min(totalPages, currentPage + 1).toString() })}
        disabled={currentPage >= totalPages}
        className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
      >
        Next →
      </button>
    </div>
  );
}
