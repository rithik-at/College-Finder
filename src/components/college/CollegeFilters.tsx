"use client";

import { cn } from "@/lib/utils";

type CollegeFiltersProps = {
  currentType: string;
  currentState: string;
  currentSort: string;
  currentCourse: string;
  searchInput: string;
  setSearchInput: (val: string) => void;
  updateFilters: (updates: Record<string, string>) => void;
  clearFilters: () => void;
  hasActiveFilters: boolean;
  filtersOpen: boolean;
};

const COLLEGE_TYPES = ['IIT', 'NIT', 'IIIT', 'Private', 'State', 'Deemed'];
const STATES = [
  'Maharashtra', 'Karnataka', 'Tamil Nadu', 'Delhi', 'Uttar Pradesh',
  'Rajasthan', 'West Bengal', 'Telangana', 'Gujarat', 'Madhya Pradesh'
];
const COURSES = [
  { value: 'BTech', label: 'B.Tech / B.E' },
  { value: 'MBA', label: 'M.B.A' },
  { value: 'MTech', label: 'M.Tech' },
  { value: 'BCA', label: 'BCA' },
  { value: 'MCA', label: 'MCA' },
  { value: 'BBA', label: 'BBA' },
  { value: 'BSc', label: 'B.Sc / M.Sc' },
];
const SORT_OPTIONS = [
  { value: 'ranking', label: 'Ranking' },
  { value: 'rating', label: 'Rating (High to Low)' },
  { value: 'fees_low', label: 'Fees (Low to High)' },
  { value: 'fees_high', label: 'Fees (High to Low)' },
  { value: 'name', label: 'Name (A-Z)' },
];

export function CollegeFilters(props: CollegeFiltersProps) {
  const {
    currentType, currentState, currentSort, currentCourse, searchInput,
    setSearchInput, updateFilters, clearFilters, hasActiveFilters, filtersOpen
  } = props;

  return (
    <aside className={cn(
      'w-full lg:w-72 flex-shrink-0',
      filtersOpen ? 'block' : 'hidden lg:block'
    )}>
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold text-gray-900 text-lg">Filters</h2>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-indigo-600 font-medium hover:text-indigo-800 transition-colors"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Search */}
        <div className="mb-6">
          <label className="text-sm font-bold text-gray-900 mb-2 block">Search</label>
          <div className="relative">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search colleges..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-gray-50 focus:bg-white"
            />
          </div>
        </div>

        {/* Course Filter */}
        <div className="mb-6">
          <label className="text-sm font-bold text-gray-900 mb-2 block">Course</label>
          <select
            value={currentCourse}
            onChange={(e) => updateFilters({ course: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-gray-50 focus:bg-white appearance-none"
            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%236b7280\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")', backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em', paddingRight: '2.5rem' }}
          >
            <option value="">All Courses</option>
            {COURSES.map((course) => (
              <option key={course.value} value={course.value}>{course.label}</option>
            ))}
          </select>
        </div>

        {/* Type Filter */}
        <div className="mb-6">
          <label className="text-sm font-bold text-gray-900 mb-2 block">College Type</label>
          <select
            value={currentType}
            onChange={(e) => updateFilters({ type: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-gray-50 focus:bg-white appearance-none"
            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%236b7280\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")', backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em', paddingRight: '2.5rem' }}
          >
            <option value="">All Types</option>
            {COLLEGE_TYPES.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* State Filter */}
        <div className="mb-6">
          <label className="text-sm font-bold text-gray-900 mb-2 block">State</label>
          <select
            value={currentState}
            onChange={(e) => updateFilters({ state: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-gray-50 focus:bg-white appearance-none"
            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%236b7280\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")', backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em', paddingRight: '2.5rem' }}
          >
            <option value="">All States</option>
            {STATES.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div>
          <label className="text-sm font-bold text-gray-900 mb-2 block">Sort By</label>
          <select
            value={currentSort}
            onChange={(e) => updateFilters({ sortBy: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-gray-50 focus:bg-white appearance-none"
            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%236b7280\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")', backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em', paddingRight: '2.5rem' }}
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>
    </aside>
  );
}
