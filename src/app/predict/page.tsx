"use client";

import { useState } from "react";
import { PredictorForm } from "@/components/predictor/PredictorForm";
import { PredictorResults } from "@/components/predictor/PredictorResults";

export default function PredictPage() {
  const [exam, setExam] = useState("");
  const [rank, setRank] = useState("");
  const [category, setCategory] = useState("General");
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [results, setResults] = useState<any[] | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [meta, setMeta] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!exam || !rank) return;

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ exam, rank, category }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setResults(data.data);
        setMeta(data.meta);
      } else {
        setError(data.error || "Failed to predict. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 w-full flex flex-col">
      <div className="bg-[#1e3a5f] pt-12 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 tracking-tight">
            Admission Predictor
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl text-center">
            Predict your chances of admission into top engineering colleges based on previous year cutoffs.
          </p>
        </div>
      </div>

      <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 pb-24 -mt-10 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          <div className="lg:col-span-5 lg:sticky lg:top-8">
            <PredictorForm 
              exam={exam}
              rank={rank}
              category={category}
              isLoading={isLoading}
              setExam={setExam}
              setRank={setRank}
              setCategory={setCategory}
              onSubmit={handleSubmit}
            />
            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 font-medium">
                {error}
              </div>
            )}
          </div>

          <div className="lg:col-span-7">
            {!results && !isLoading && !error && (
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-12 sm:p-20 text-center flex flex-col items-center justify-center h-full min-h-[400px]">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-6 sm:mb-8 shadow-inner">
                  <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#1e3a5f]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Awaiting Details</h3>
                <p className="text-gray-500 text-base sm:text-lg max-w-md leading-relaxed">
                  Fill out the form with your exam rank and category to see which colleges you have the best chance of getting into.
                </p>
              </div>
            )}

            {isLoading && (
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-12 sm:p-20 text-center flex flex-col items-center justify-center h-full min-h-[400px]">
                 <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-[#1e3a5f] border-t-transparent rounded-full animate-spin mx-auto mb-4 sm:mb-6 shadow-lg" />
                 <p className="text-gray-500 text-base sm:text-lg font-medium animate-pulse">Running prediction model...</p>
              </div>
            )}

            {results && !isLoading && <PredictorResults results={results} meta={meta} />}
          </div>
        </div>
      </div>
    </div>
  );
}
