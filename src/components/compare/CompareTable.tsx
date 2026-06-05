"use client";

import { X, Landmark, Trophy, Star, Wallet, Briefcase, TrendingUp, Target, GraduationCap } from "lucide-react";
import Link from "next/link";
import { formatCurrency, formatLPA, getTypeColor, getRatingColor, cn } from "@/lib/utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function CompareTable({ colleges, onRemove }: { colleges: any[]; onRemove: (id: number) => void }) {
  if (colleges.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden w-full relative z-10">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left border-collapse">
          <thead>
            <tr>
              <th className="w-56 sm:w-72 p-6 sm:p-8 bg-gray-50 text-gray-600 font-bold uppercase tracking-wider text-sm border-b border-r border-gray-200">
                <div className="flex items-center gap-2">
                  College Features
                </div>
              </th>
              {colleges.map((college) => (
                <th key={`header-${college.id}`} className="w-72 p-6 sm:p-8 bg-gradient-to-b from-indigo-50/80 to-white border-b border-gray-100 relative align-top group">
                  <button
                    onClick={() => onRemove(college.id)}
                    className="absolute top-4 right-4 p-2 bg-white text-gray-400 rounded-full shadow-sm hover:bg-red-50 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all duration-200"
                    aria-label="Remove college"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="pr-6">
                    <h3 className="font-extrabold text-gray-900 text-lg sm:text-xl line-clamp-2 mb-2 leading-tight">
                      {college.name}
                    </h3>
                    <p className="text-sm text-gray-500 font-medium">{college.location}</p>
                    <Link href={`/colleges/${college.slug}`} className="text-sm text-indigo-600 hover:text-indigo-800 mt-4 inline-flex items-center font-bold group-hover:underline">
                      View full profile <span className="ml-1">→</span>
                    </Link>
                  </div>
                </th>
              ))}
              {/* Fill empty columns if less than 3 */}
              {Array.from({ length: 3 - colleges.length }).map((_, i) => (
                <th key={`empty-header-${i}`} className="w-72 p-8 bg-gray-50/30 border-b border-gray-100 border-dashed border-l text-center">
                  <div className="flex flex-col items-center justify-center text-gray-400">
                    <div className="w-12 h-12 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center mb-3">
                      <span className="text-xl">+</span>
                    </div>
                    <span className="font-semibold text-sm">Add another college</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-sm">
            {/* Type */}
            <tr className="hover:bg-gray-50/50 transition-colors group">
              <td className="p-6 sm:p-8 bg-gray-50/80 border-b border-r border-gray-100 font-semibold text-gray-700">
                <div className="flex items-center gap-3">
                  <Landmark className="w-5 h-5 text-indigo-500" /> Institution Type
                </div>
              </td>
              {colleges.map((college) => (
                <td key={`type-${college.id}`} className="p-6 sm:p-8 border-b border-gray-100 group-hover:bg-indigo-50/10 transition-colors">
                  <span className={cn('px-4 py-1.5 rounded-full font-bold text-xs inline-block tracking-wide', getTypeColor(college.type))}>
                    {college.type}
                  </span>
                </td>
              ))}
              {Array.from({ length: 3 - colleges.length }).map((_, i) => (
                <td key={`empty-type-${i}`} className="p-8 border-b border-gray-100 border-dashed border-l bg-gray-50/30" />
              ))}
            </tr>

            {/* Ranking */}
            <tr className="hover:bg-gray-50/50 transition-colors group">
              <td className="p-6 sm:p-8 bg-gray-50/80 border-b border-r border-gray-100 font-semibold text-gray-700">
                <div className="flex items-center gap-3">
                  <Trophy className="w-5 h-5 text-amber-500" /> Ranking
                </div>
              </td>
              {colleges.map((college) => (
                <td key={`rank-${college.id}`} className="p-6 sm:p-8 border-b border-gray-100 group-hover:bg-indigo-50/10 transition-colors">
                  {college.ranking ? (
                    <span className="font-extrabold text-gray-900 flex items-baseline gap-1.5">
                      <span className="text-2xl text-amber-600">#{college.ranking}</span>
                      <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">in India</span>
                    </span>
                  ) : <span className="text-gray-400 italic">Not Ranked</span>}
                </td>
              ))}
              {Array.from({ length: 3 - colleges.length }).map((_, i) => (
                <td key={`empty-rank-${i}`} className="p-8 border-b border-gray-100 border-dashed border-l bg-gray-50/30" />
              ))}
            </tr>

            {/* Rating */}
            <tr className="hover:bg-gray-50/50 transition-colors group">
              <td className="p-6 sm:p-8 bg-gray-50/80 border-b border-r border-gray-100 font-semibold text-gray-700">
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-yellow-400" /> Student Rating
                </div>
              </td>
              {colleges.map((college) => (
                <td key={`rating-${college.id}`} className="p-6 sm:p-8 border-b border-gray-100 group-hover:bg-indigo-50/10 transition-colors">
                  <div className="flex items-center gap-2">
                    <span className={cn('font-extrabold px-3 py-1.5 rounded-lg text-sm shadow-sm', getRatingColor(college.rating))}>
                      ★ {college.rating.toFixed(1)}
                    </span>
                    <span className="text-gray-400 text-xs font-semibold">/ 5.0</span>
                  </div>
                </td>
              ))}
              {Array.from({ length: 3 - colleges.length }).map((_, i) => (
                <td key={`empty-rating-${i}`} className="p-8 border-b border-gray-100 border-dashed border-l bg-gray-50/30" />
              ))}
            </tr>

            {/* Fees */}
            <tr className="hover:bg-gray-50/50 transition-colors group">
              <td className="p-6 sm:p-8 bg-gray-50/80 border-b border-r border-gray-100 font-semibold text-gray-700">
                <div className="flex items-center gap-3">
                  <Wallet className="w-5 h-5 text-blue-500" /> Total Fees (4 Years)
                </div>
              </td>
              {colleges.map((college) => (
                <td key={`fees-${college.id}`} className="p-6 sm:p-8 border-b border-gray-100 group-hover:bg-indigo-50/10 transition-colors">
                  <span className="font-extrabold text-gray-900 text-lg">
                    {college.feesMin ? formatCurrency(college.feesMin) : 'N/A'}
                    {college.feesMax && college.feesMax !== college.feesMin ? ` - ${formatCurrency(college.feesMax)}` : ''}
                  </span>
                </td>
              ))}
              {Array.from({ length: 3 - colleges.length }).map((_, i) => (
                <td key={`empty-fees-${i}`} className="p-8 border-b border-gray-100 border-dashed border-l bg-gray-50/30" />
              ))}
            </tr>

            {/* Avg Package */}
            <tr className="hover:bg-gray-50/50 transition-colors group">
              <td className="p-6 sm:p-8 bg-gray-50/80 border-b border-r border-gray-100 font-semibold text-gray-700">
                <div className="flex items-center gap-3">
                  <Briefcase className="w-5 h-5 text-emerald-500" /> Average Package
                </div>
              </td>
              {colleges.map((college) => (
                <td key={`avgpkg-${college.id}`} className="p-6 sm:p-8 border-b border-gray-100 group-hover:bg-indigo-50/10 transition-colors">
                  <span className="font-extrabold text-emerald-600 text-lg bg-emerald-50 px-3 py-1 rounded-lg">
                    {college.avgPackage ? formatLPA(college.avgPackage) : 'N/A'}
                  </span>
                </td>
              ))}
              {Array.from({ length: 3 - colleges.length }).map((_, i) => (
                <td key={`empty-avgpkg-${i}`} className="p-8 border-b border-gray-100 border-dashed border-l bg-gray-50/30" />
              ))}
            </tr>

            {/* Highest Package */}
            <tr className="hover:bg-gray-50/50 transition-colors group">
              <td className="p-6 sm:p-8 bg-gray-50/80 border-b border-r border-gray-100 font-semibold text-gray-700">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-indigo-500" /> Highest Package
                </div>
              </td>
              {colleges.map((college) => (
                <td key={`highpkg-${college.id}`} className="p-6 sm:p-8 border-b border-gray-100 group-hover:bg-indigo-50/10 transition-colors">
                  <span className="font-extrabold text-indigo-600 text-lg bg-indigo-50 px-3 py-1 rounded-lg">
                    {college.highestPackage ? formatLPA(college.highestPackage) : 'N/A'}
                  </span>
                </td>
              ))}
              {Array.from({ length: 3 - colleges.length }).map((_, i) => (
                <td key={`empty-highpkg-${i}`} className="p-8 border-b border-gray-100 border-dashed border-l bg-gray-50/30" />
              ))}
            </tr>

            {/* Placement Rate */}
            <tr className="hover:bg-gray-50/50 transition-colors group">
              <td className="p-6 sm:p-8 bg-gray-50/80 border-b border-r border-gray-100 font-semibold text-gray-700">
                <div className="flex items-center gap-3">
                  <Target className="w-5 h-5 text-rose-500" /> Placement Rate
                </div>
              </td>
              {colleges.map((college) => (
                <td key={`placerate-${college.id}`} className="p-6 sm:p-8 border-b border-gray-100 group-hover:bg-indigo-50/10 transition-colors">
                  {college.placementRate ? (
                    <div className="flex items-center gap-4">
                      <span className="font-extrabold text-gray-900 text-lg">{college.placementRate}%</span>
                      <div className="w-32 h-2.5 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                        <div 
                          className={cn("h-full rounded-full", college.placementRate >= 90 ? "bg-emerald-500" : college.placementRate >= 75 ? "bg-amber-500" : "bg-red-500")}
                          style={{ width: `${college.placementRate}%` }}
                        />
                      </div>
                    </div>
                  ) : <span className="text-gray-400 italic">N/A</span>}
                </td>
              ))}
              {Array.from({ length: 3 - colleges.length }).map((_, i) => (
                <td key={`empty-placerate-${i}`} className="p-8 border-b border-gray-100 border-dashed border-l bg-gray-50/30" />
              ))}
            </tr>

            {/* Accepted Exams */}
            <tr className="hover:bg-gray-50/50 transition-colors group">
              <td className="p-6 sm:p-8 bg-gray-50/80 border-r border-gray-100 font-semibold text-gray-700">
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-5 h-5 text-cyan-500" /> Accepted Exams
                </div>
              </td>
              {colleges.map((college) => (
                <td key={`exams-${college.id}`} className="p-6 sm:p-8 group-hover:bg-indigo-50/10 transition-colors">
                  {college.acceptedExams && college.acceptedExams.length > 0 ? (
                    <div className="flex flex-wrap gap-2.5">
                      {college.acceptedExams.map((exam: string, i: number) => (
                        <span key={i} className="px-3 py-1.5 bg-white border border-gray-200 shadow-sm text-gray-700 rounded-lg text-xs font-bold tracking-wide">
                          {exam}
                        </span>
                      ))}
                    </div>
                  ) : <span className="text-gray-400 italic">N/A</span>}
                </td>
              ))}
              {Array.from({ length: 3 - colleges.length }).map((_, i) => (
                <td key={`empty-exams-${i}`} className="p-8 border-dashed border-l border-gray-100 bg-gray-50/30" />
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
