import { Suspense } from "react";
import { ResourcesContent } from "./ResourcesContent";

export const metadata = {
  title: "Student Resources | CollegeHub",
  description: "Comprehensive resources for engineering students including reviews, cutoff trends, fee structures, and admission guides.",
};

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-gray-50/50 w-full flex flex-col">
      <div className="bg-[#1e3a5f] pt-12 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 tracking-tight">
            Student Resources Hub
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl text-center">
            Everything you need to make an informed decision: authentic reviews, historical cutoffs, fee comparisons, and expert Q&A.
          </p>
        </div>
      </div>

      <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 -mt-10 relative z-10">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[600px]">
          <Suspense fallback={
            <div className="flex-1 flex items-center justify-center p-12">
              <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            </div>
          }>
            <ResourcesContent />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
