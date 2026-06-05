"use client";

import Link from "next/link";
import { CheckCircle2, AlertCircle, HelpCircle } from "lucide-react";
import { formatCurrency, formatLPA, cn } from "@/lib/utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function PredictorResults({ results, meta }: { results: any[]; meta: any }) {
  if (!meta) return null;

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Prediction Results</h2>
          <p className="text-sm text-gray-500 mt-1">
            Found <span className="font-semibold text-indigo-600">{meta.totalMatches}</span> possible colleges for {meta.exam} Rank {meta.rank} ({meta.category})
          </p>
        </div>
        <div className="flex gap-4 text-xs font-medium border-t sm:border-t-0 pt-4 sm:pt-0">
          <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Safe</div>
          <div className="flex items-center gap-1.5"><AlertCircle className="w-4 h-4 text-amber-500" /> Moderate</div>
          <div className="flex items-center gap-1.5"><HelpCircle className="w-4 h-4 text-red-500" /> Reach</div>
        </div>
      </div>

      {results.length > 0 ? (
        <div className="grid gap-6 sm:gap-8">
          {results.map((result, idx) => (
            <div 
              key={`${result.college.id}-${idx}`}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 hover:shadow-md transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-6 sm:mb-8">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-bold text-gray-900 text-lg sm:text-xl">
                      <Link href={`/colleges/${result.college.slug}`} className="hover:text-indigo-600 transition-colors">
                        {result.college.name}
                      </Link>
                    </h3>
                    <span className={cn(
                      'px-2.5 py-1 text-xs font-bold rounded-md flex items-center gap-1 shrink-0',
                      result.confidence === 'Safe' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      result.confidence === 'Moderate' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                      'bg-red-50 text-red-700 border border-red-200'
                    )}>
                      {result.confidence === 'Safe' ? <CheckCircle2 className="w-3.5 h-3.5" /> : 
                       result.confidence === 'Moderate' ? <AlertCircle className="w-3.5 h-3.5" /> : 
                       <HelpCircle className="w-3.5 h-3.5" />}
                      {result.confidence}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{result.college.location}</p>
                </div>
                
                <div className="flex sm:flex-col gap-4 sm:gap-2 text-sm sm:text-right border-t sm:border-t-0 pt-3 sm:pt-0">
                  <div>
                    <span className="text-gray-500 block text-xs uppercase tracking-wider mb-0.5">Fees</span>
                    <span className="font-semibold text-gray-900">{formatCurrency(result.college.feesMin)}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-xs uppercase tracking-wider mb-0.5">Avg Pkg</span>
                    <span className="font-semibold text-emerald-600">{formatLPA(result.college.avgPackage)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50/80 rounded-2xl p-5 sm:p-6 overflow-x-auto border border-gray-100">
                <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4">Eligible Courses</h4>
                <div className="min-w-[400px]">
                  <table className="w-full text-sm text-left">
                    <thead>
                      <tr className="text-gray-500 border-b border-gray-200">
                        <th className="pb-2 font-medium">Course</th>
                        <th className="pb-2 font-medium">Closing Rank</th>
                        <th className="pb-2 font-medium text-right">Margin</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      {result.matchedCutoffs.map((cutoff: any) => {
                        const margin = cutoff.closingRank - meta.rank;
                        return (
                          <tr key={cutoff.id} className="text-gray-900">
                            <td className="py-2.5 font-medium">{cutoff.course}</td>
                            <td className="py-2.5">{cutoff.closingRank.toLocaleString('en-IN')}</td>
                            <td className="py-2.5 text-right font-medium">
                              <span className={margin > 0 ? 'text-emerald-600' : 'text-red-500'}>
                                {margin > 0 ? '+' : ''}{margin.toLocaleString('en-IN')}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-12 text-center">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">No Matches Found</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            Based on our past data, it might be difficult to secure admission with these details. Try adjusting your category or check lower ranked colleges.
          </p>
        </div>
      )}
    </div>
  );
}
