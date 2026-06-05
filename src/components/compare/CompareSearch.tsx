"use client";

import { Search, Plus, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";

type SearchResult = {
  id: number;
  name: string;
  city: string;
  state: string;
};

type CompareSearchProps = {
  selectedIds: number[];
  onAddCollege: (id: number) => void;
};

export function CompareSearch({ selectedIds, onAddCollege }: CompareSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    async function search() {
      if (!debouncedQuery.trim()) {
        setResults([]);
        return;
      }
      setIsSearching(true);
      try {
        const res = await fetch(`/api/colleges/search?q=${encodeURIComponent(debouncedQuery)}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data);
        }
      } catch (err) {
        console.error("Failed to search", err);
      } finally {
        setIsSearching(false);
      }
    }
    search();
  }, [debouncedQuery]);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mb-8 w-full relative z-20">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Add Colleges to Compare</h2>
      <div className="relative">
        <input
          type="text"
          placeholder="Search for a college by name or city..."
          className="w-full px-6 py-4 sm:py-4 bg-gray-50 border border-gray-200 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {isSearching && (
          <div className="absolute inset-y-0 right-4 flex items-center">
            <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Dropdown Results */}
        {results.length > 0 && query.trim().length > 0 && (
          <div className="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-80 overflow-y-auto overflow-x-hidden">
            {results.map((college) => {
              const isSelected = selectedIds.includes(college.id);
              return (
                <button
                  key={college.id}
                  onClick={() => {
                    if (!isSelected && selectedIds.length < 3) {
                      onAddCollege(college.id);
                      setQuery("");
                      setResults([]);
                    }
                  }}
                  disabled={isSelected || (!isSelected && selectedIds.length >= 3)}
                  className="w-full text-left px-4 py-3 sm:px-6 sm:py-4 border-b border-gray-100 hover:bg-gray-50 flex items-center justify-between transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <div className="pr-4 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">{college.name}</p>
                    <p className="text-sm text-gray-500 truncate">{college.city}, {college.state}</p>
                  </div>
                  <div className="flex-shrink-0">
                    {isSelected ? (
                      <div className="flex items-center text-emerald-600 text-sm font-medium">
                        <Check className="w-4 h-4 mr-1" /> Added
                      </div>
                    ) : (
                      <div className="flex items-center text-indigo-600 text-sm font-medium group-hover:bg-indigo-50 px-3 py-1 rounded-lg transition-colors">
                        <Plus className="w-4 h-4 mr-1" /> Add
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}
        
        {query.trim().length > 0 && results.length === 0 && !isSearching && (
          <div className="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-500 font-medium">No colleges found matching "{query}"</p>
          </div>
        )}
      </div>
    </div>
  );
}
