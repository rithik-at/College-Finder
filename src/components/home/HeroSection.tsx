"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, TrendingUp, Users, Sparkles, MapPin, Loader2 } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { CollegeListItem, PaginatedResponse } from "@/lib/types";
import Link from "next/link";

type HeroSectionProps = {
  totalColleges: number;
  totalReviews: number;
  totalPredictions: number;
};

export function HeroSection({ totalColleges, totalReviews, totalPredictions }: HeroSectionProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<CollegeListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const debouncedSearch = useDebounce(searchQuery, 300);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!debouncedSearch.trim()) {
        setSuggestions([]);
        setShowDropdown(false);
        return;
      }

      setIsLoading(true);
      setShowDropdown(true);

      try {
        const res = await fetch(`/api/colleges?q=${encodeURIComponent(debouncedSearch)}&limit=5`);
        if (res.ok) {
          const data: PaginatedResponse<CollegeListItem> = await res.json();
          setSuggestions(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch college suggestions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSuggestions();
  }, [debouncedSearch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowDropdown(false);
      router.push(`/colleges?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <section
      className="relative w-full h-[60vh] min-h-[500px] lg:h-[75vh] lg:min-h-[600px] flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url("/images/college_bg.png")' }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full flex flex-col items-center"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-extrabold text-white tracking-tight mb-6 drop-shadow-xl">
            Find Top Colleges in India
          </h1>
          <div className="h-7 lg:h-8 mb-10 lg:mb-12 w-full"></div>

          {/* Search Bar Container */}
          <div className="max-w-4xl mx-auto relative group w-full" ref={dropdownRef}>
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row w-full relative z-20 gap-3">
              <input
                type="text"
                placeholder="Search for colleges"
                className="w-full px-6 py-4 md:py-5 text-base sm:text-lg rounded-xl border-0 bg-white shadow-2xl focus:ring-2 focus:ring-[#ff7900] transition-all outline-none text-gray-900 placeholder:text-gray-400"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value.trim().length > 0) setShowDropdown(true);
                }}
                onFocus={() => {
                  if (searchQuery.trim().length > 0) setShowDropdown(true);
                }}
              />
              <button
                type="submit"
                className="w-full sm:w-40 px-6 py-4 md:py-5 bg-[#ff7900] hover:bg-[#e66c00] text-white font-bold text-lg sm:text-xl rounded-xl transition-colors shadow-lg flex items-center justify-center flex-shrink-0 animate-shine"
              >
                Search
              </button>
            </form>

            {/* Dropdown Autocomplete */}
            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-30 text-left"
                >
                  {isLoading ? (
                    <div className="p-4 flex items-center justify-center text-gray-500">
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      <span>Searching...</span>
                    </div>
                  ) : suggestions.length > 0 ? (
                    <div className="flex flex-col py-2">
                      {suggestions.map((college) => (
                        <Link
                          href={`/colleges/${college.slug}`}
                          key={college.id}
                          className="flex items-center px-5 py-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
                          onClick={() => setShowDropdown(false)}
                        >
                          {college.logo ? (
                            <div className="w-10 h-10 relative flex-shrink-0 bg-white border border-gray-100 rounded flex items-center justify-center overflow-hidden mr-4">
                              <img 
                                src={college.logo} 
                                alt={college.name} 
                                className="w-full h-full object-contain p-1"
                              />
                            </div>
                          ) : (
                            <div className="w-10 h-10 relative flex-shrink-0 bg-indigo-50 text-indigo-600 rounded flex items-center justify-center font-bold text-sm mr-4">
                              {college.name.charAt(0)}
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-gray-900 truncate">{college.name}</h4>
                            <div className="flex items-center text-xs text-gray-500 mt-1">
                              <MapPin className="w-3 h-3 mr-1" />
                              <span className="truncate">
                                {college.location}{college.state ? `, ${college.state}` : ''}
                              </span>
                              <span className="mx-2">•</span>
                              <span className="text-indigo-600 font-semibold">{college.type}</span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : debouncedSearch.trim() ? (
                    <div className="p-4 text-center text-gray-500 text-sm">
                      No colleges found matching "{debouncedSearch}"
                    </div>
                  ) : null}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 max-w-5xl mx-auto mt-16 sm:mt-24 lg:mt-28 w-full px-4">
            {[
              { label: "Top Colleges", value: `${totalColleges}+`, icon: GraduationCap },
              { label: "Acceptance Records", value: "10k+", icon: TrendingUp },
              { label: "Student Reviews", value: `${totalReviews}+`, icon: Users },
              { label: "Predictions Made", value: `${totalPredictions}+`, icon: Sparkles },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center justify-center text-center">
                <stat.icon className="w-8 h-8 sm:w-10 sm:h-10 mb-4 text-[#ff7900] drop-shadow-md transition-transform hover:scale-110 duration-300" />
                <div className="text-3xl sm:text-4xl font-extrabold text-white mb-2 drop-shadow-lg">{stat.value}</div>
                <div className="text-sm sm:text-base text-gray-200 font-semibold uppercase tracking-wider drop-shadow-md">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
