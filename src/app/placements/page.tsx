import prisma from "@/lib/prisma";
import Link from "next/link";
import { TrendingUp, Briefcase, Building2, MapPin, Search } from "lucide-react";
import { formatLPA } from "@/lib/utils";

export const dynamic = 'force-dynamic';

export default async function PlacementsPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let colleges: any[] = [];
  try {
    // Fetch top 20 colleges by average package
    colleges = await prisma.college.findMany({
      orderBy: { avgPackage: 'desc' },
      take: 20,
      select: {
        id: true,
        name: true,
        slug: true,
        city: true,
        state: true,
        type: true,
        avgPackage: true,
        highestPackage: true,
        placementRate: true,
        topRecruiters: true,
      }
    });
  } catch (error) {
    console.error("Failed to fetch placement data", error);
  }

  const validAvgPackages = colleges.filter(c => c.avgPackage).map(c => c.avgPackage as number);
  const highestOverall = Math.max(...colleges.map(c => c.highestPackage || 0));
  const avgOverall = validAvgPackages.length > 0 ? (validAvgPackages.reduce((a, b) => a + b, 0) / validAvgPackages.length) : 0;
  
  // Flatten all top recruiters to find the most common ones
  const allRecruiters = colleges.flatMap(c => c.topRecruiters || []);
  const recruiterCounts = allRecruiters.reduce((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const topGlobalRecruiters = Object.entries(recruiterCounts)
    .sort((a, b) => (b[1] as number) - (a[1] as number))
    .slice(0, 10)
    .map(entry => entry[0]);

  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col pb-20">
      {/* Hero Section */}
      <div className="bg-[#1e3a5f] pt-16 pb-24 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 -mr-20 w-96 h-96 bg-indigo-500 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-72 h-72 bg-emerald-500 rounded-full blur-3xl opacity-20"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center justify-center p-3 bg-rose-500/20 text-rose-300 rounded-full mb-6">
            <TrendingUp className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
            Placement Insights
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mb-12">
            Discover which colleges offer the highest ROI. Analyze average packages, top recruiters, and placement rates across India.
          </p>
          
          {/* Global Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center shadow-xl">
              <p className="text-blue-200 font-medium mb-2 uppercase tracking-wider text-sm">Highest Package</p>
              <p className="text-4xl font-extrabold text-emerald-400">{highestOverall > 0 ? formatLPA(highestOverall) : 'N/A'}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center shadow-xl">
              <p className="text-blue-200 font-medium mb-2 uppercase tracking-wider text-sm">Average Package</p>
              <p className="text-4xl font-extrabold text-blue-300">{avgOverall > 0 ? formatLPA(avgOverall) : 'N/A'}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center shadow-xl">
              <p className="text-blue-200 font-medium mb-2 uppercase tracking-wider text-sm">Top Companies</p>
              <p className="text-4xl font-extrabold text-rose-300">500+</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 -mt-10 relative z-20">
        
        {/* Top Recruiters Marquee */}
        {topGlobalRecruiters.length > 0 && (
          <div className="mb-12 flex flex-col items-center mt-6">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6">Top Mass Recruiters & Dream Companies</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {topGlobalRecruiters.map((recruiter, i) => (
                <span key={i} className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold text-sm shadow-sm">
                  {recruiter}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Top Colleges List */}
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">Top Colleges by Average Package</h2>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="p-6 font-bold text-gray-600 uppercase tracking-wider text-xs w-16 text-center">Rank</th>
                  <th className="p-6 font-bold text-gray-600 uppercase tracking-wider text-xs">College Name</th>
                  <th className="p-6 font-bold text-gray-600 uppercase tracking-wider text-xs">Avg Package</th>
                  <th className="p-6 font-bold text-gray-600 uppercase tracking-wider text-xs">Highest Package</th>
                  <th className="p-6 font-bold text-gray-600 uppercase tracking-wider text-xs">Placement Rate</th>
                  <th className="p-6 font-bold text-gray-600 uppercase tracking-wider text-xs">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {colleges.map((college, index) => (
                  <tr key={college.id} className="hover:bg-indigo-50/30 transition-colors group">
                    <td className="p-6 text-center font-extrabold text-gray-400 group-hover:text-indigo-600 transition-colors">
                      #{index + 1}
                    </td>
                    <td className="p-6">
                      <div className="flex flex-col">
                        <Link href={`/colleges/${college.slug}`} className="font-bold text-gray-900 text-lg hover:text-indigo-600 transition-colors line-clamp-1">
                          {college.name}
                        </Link>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <MapPin className="w-3.5 h-3.5 mr-1" />
                          {college.city}, {college.state}
                          <span className="mx-2">•</span>
                          <span className="font-semibold text-indigo-600">{college.type}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <span className="inline-flex items-center font-extrabold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg text-lg">
                        {college.avgPackage ? formatLPA(college.avgPackage) : 'N/A'}
                      </span>
                    </td>
                    <td className="p-6">
                      <span className="font-bold text-gray-700 text-base">
                        {college.highestPackage ? formatLPA(college.highestPackage) : 'N/A'}
                      </span>
                    </td>
                    <td className="p-6">
                      {college.placementRate ? (
                        <div className="flex flex-col gap-1.5">
                          <span className="font-bold text-gray-900">{college.placementRate}%</span>
                          <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-indigo-500 rounded-full"
                              style={{ width: `${college.placementRate}%` }}
                            />
                          </div>
                        </div>
                      ) : <span className="text-gray-400 italic">N/A</span>}
                    </td>
                    <td className="p-6">
                      <Link 
                        href={`/colleges/${college.slug}`}
                        className="inline-flex items-center justify-center px-4 py-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-indigo-600 rounded-xl font-semibold text-sm transition-all shadow-sm group-hover:border-indigo-200"
                      >
                        View Profile
                      </Link>
                    </td>
                  </tr>
                ))}
                {colleges.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-12 text-center text-gray-500">
                      No placement data found. Try seeding the database.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
