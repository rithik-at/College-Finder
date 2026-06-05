"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CompareSearch } from "@/components/compare/CompareSearch";
import { CompareTable } from "@/components/compare/CompareTable";
import { Scale } from "lucide-react";

function CompareContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [colleges, setColleges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const idsParam = searchParams.get("ids");
  const selectedIds = idsParam
    ? idsParam.split(",").map((id) => parseInt(id.trim())).filter((id) => !isNaN(id))
    : [];

  useEffect(() => {
    const fetchColleges = async () => {
      if (selectedIds.length === 0) {
        setColleges([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const res = await fetch(`/api/compare?ids=${selectedIds.join(",")}`);
        if (res.ok) {
          const data = await res.json();
          setColleges(data);
        }
      } catch (error) {
        console.error("Failed to fetch colleges for compare:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchColleges();
  }, [idsParam]);

  const addCollege = (id: number) => {
    if (selectedIds.length >= 3 || selectedIds.includes(id)) return;
    const newIds = [...selectedIds, id];
    router.push(`/compare?ids=${newIds.join(",")}`);
  };

  const removeCollege = (id: number) => {
    const newIds = selectedIds.filter((selectedId) => selectedId !== id);
    if (newIds.length === 0) {
      router.push("/compare");
    } else {
      router.push(`/compare?ids=${newIds.join(",")}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 w-full flex flex-col">
      <div className="bg-[#1e3a5f] pt-12 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 tracking-tight">
            Compare Colleges
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl text-center">
            Compare up to 3 colleges side-by-side to analyze fees, placements, and rankings to make the right choice.
          </p>
        </div>
      </div>

      <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 -mt-10 relative z-10">
        <CompareSearch selectedIds={selectedIds} onAddCollege={addCollege} />

        {loading ? (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 sm:p-12">
            <div className="animate-pulse space-y-8">
              <div className="flex gap-4">
                <div className="h-10 bg-gray-200 rounded w-1/4"></div>
                <div className="h-10 bg-gray-200 rounded w-1/4"></div>
                <div className="h-10 bg-gray-200 rounded w-1/4"></div>
                <div className="h-10 bg-gray-200 rounded w-1/4"></div>
              </div>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex gap-4">
                  <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                </div>
              ))}
            </div>
          </div>
        ) : colleges.length > 0 ? (
          <CompareTable colleges={colleges} onRemove={removeCollege} />
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-12 sm:p-20 text-center flex flex-col items-center mt-8 sm:mt-12">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-6 sm:mb-8 shadow-inner">
              <Scale className="w-10 h-10 sm:w-12 sm:h-12 text-[#1e3a5f]" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Your comparison is empty</h2>
            <p className="text-gray-500 text-base sm:text-lg max-w-lg leading-relaxed">
              Search for colleges above and add them to compare their fees, rankings, packages, and more. You can compare up to <span className="font-semibold text-gray-700">3 colleges</span> at once.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50/50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4 shadow-lg" />
          <p className="text-sm font-semibold text-gray-600 animate-pulse">Loading comparison...</p>
        </div>
      </div>
    }>
      <CompareContent />
    </Suspense>
  );
}
