"use client";

import { useState } from 'react';
import { Award, Search, Filter, ExternalLink, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ScholarshipsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const allScholarships = [
    {
      id: 1,
      name: "National Scholarship Portal (NSP) - Post Matric",
      provider: "Government of India",
      amount: "Up to ₹50,000 / year",
      deadline: "Oct 31, 2026",
      eligibility: ["Family income < ₹2.5L", "SC/ST/OBC/Minority", "50%+ in previous exam"],
      tags: ["Government", "Merit-cum-Means", "All India"],
      color: "bg-emerald-500",
      logo: "🇮🇳"
    },
    {
      id: 2,
      name: "AICTE Pragati Scholarship for Girls",
      provider: "AICTE",
      amount: "₹50,000 / year",
      deadline: "Nov 15, 2026",
      eligibility: ["Girl students", "1st year Degree/Diploma", "Family income < ₹8L"],
      tags: ["Girls Only", "Technical Education", "AICTE Approved"],
      color: "bg-rose-500",
      logo: "👩‍🎓"
    },
    {
      id: 3,
      name: "Reliance Foundation Undergraduate Scholarship",
      provider: "Reliance Foundation",
      amount: "Up to ₹2,000,000",
      deadline: "Dec 31, 2026",
      eligibility: ["1st year UG students", "Cleared JEE Main", "Family income < ₹15L"],
      tags: ["Private", "High Value", "Merit Based"],
      color: "bg-blue-600",
      logo: "🏢"
    },
    {
      id: 4,
      name: "ONGC Foundation Scholarship Scheme",
      provider: "ONGC",
      amount: "₹48,000 / year",
      deadline: "Sep 30, 2026",
      eligibility: ["SC/ST/OBC/General", "Engineering/MBBS", "60%+ marks"],
      tags: ["Corporate CSR", "Professional Courses"],
      color: "bg-amber-500",
      logo: "⛽"
    },
    {
      id: 5,
      name: "HDFC Educational Crisis Scholarship",
      provider: "HDFC Bank",
      amount: "₹10,000 to ₹25,000",
      deadline: "Aug 15, 2026",
      eligibility: ["Family income < ₹3L", "Facing financial crisis", "Class 6 to PG"],
      tags: ["Corporate CSR", "Need Based"],
      color: "bg-indigo-600",
      logo: "🏦"
    },
    {
      id: 6,
      name: "L'Oréal India For Young Women In Science",
      provider: "L'Oréal India",
      amount: "₹250,000 over graduation",
      deadline: "Jul 15, 2026",
      eligibility: ["Girl students only", "85%+ in PCM/PCB", "Family income < ₹4L"],
      tags: ["Girls Only", "STEM", "Corporate CSR"],
      color: "bg-fuchsia-500",
      logo: "🔬"
    },
    {
      id: 7,
      name: "Vidyasaarathi Scholarship Program",
      provider: "Protean eGov Technologies",
      amount: "Up to ₹40,000",
      deadline: "Oct 10, 2026",
      eligibility: ["Varies by corporate", "Undergraduate/Diploma", "Minimum 50% marks"],
      tags: ["Private", "Portal", "Merit Based"],
      color: "bg-cyan-500",
      logo: "💻"
    },
    {
      id: 8,
      name: "Sitaram Jindal Foundation Scholarship",
      provider: "Sitaram Jindal Foundation",
      amount: "Up to ₹2,500 / month",
      deadline: "Ongoing",
      eligibility: ["Class 11 to PG", "BPL category preferred", "Meritorious students"],
      tags: ["NGO", "Merit-cum-Means", "All India"],
      color: "bg-teal-500",
      logo: "🤝"
    },
    {
      id: 9,
      name: "Swami Vivekananda Merit Cum Means",
      provider: "Govt of West Bengal",
      amount: "₹12,000 to ₹60,000 / year",
      deadline: "Jan 31, 2027",
      eligibility: ["Domicile of West Bengal", "Family income < ₹2.5L", "60%+ in last exam"],
      tags: ["State Govt", "Merit-cum-Means"],
      color: "bg-orange-500",
      logo: "🏛️"
    },
    {
      id: 10,
      name: "Kotak Kanya Scholarship",
      provider: "Kotak Education Foundation",
      amount: "Up to ₹1.5 Lakh / year",
      deadline: "Sep 30, 2026",
      eligibility: ["Girl students", "1st year Professional course", "Family income < ₹3.2L"],
      tags: ["Girls Only", "Corporate CSR"],
      color: "bg-red-500",
      logo: "📈"
    },
    {
      id: 11,
      name: "Keep India Smiling Foundational Scholarship",
      provider: "Colgate-Palmolive",
      amount: "₹30,000 / year",
      deadline: "Dec 31, 2026",
      eligibility: ["Class 11, Graduation, Diploma", "Family income < ₹5L", "Sports persons eligible"],
      tags: ["Corporate CSR", "Sports", "Need Based"],
      color: "bg-pink-500",
      logo: "😁"
    },
    {
      id: 12,
      name: "Foundation for Excellence (FFE) Scholarship",
      provider: "FFE India Trust",
      amount: "₹40,000 / year",
      deadline: "Dec 31, 2026",
      eligibility: ["1st year BE/BTech/MBBS", "Exceptional entrance rank", "Family income < ₹2.5L"],
      tags: ["NGO", "Engineering", "Medical"],
      color: "bg-blue-500",
      logo: "🌟"
    },
    {
      id: 13,
      name: "Central Sector Scheme of Scholarships",
      provider: "MHRD, Govt of India",
      amount: "₹10,000 to ₹20,000 / year",
      deadline: "Oct 31, 2026",
      eligibility: ["Top 20th percentile in class 12", "Family income < ₹8L", "Pursuing regular courses"],
      tags: ["Government", "Merit Based", "National"],
      color: "bg-emerald-600",
      logo: "🎓"
    },
    {
      id: 14,
      name: "Santoor Women's Scholarship",
      provider: "Wipro Cares",
      amount: "₹24,000 / year",
      deadline: "Aug 31, 2026",
      eligibility: ["Girl students", "AP, Karnataka, Telangana", "Passed class 12 from Govt school"],
      tags: ["Girls Only", "State Specific", "Corporate CSR"],
      color: "bg-rose-400",
      logo: "🌸"
    },
    {
      id: 15,
      name: "Dr. Ambedkar Post Matric Scholarship",
      provider: "Ministry of Social Justice",
      amount: "Maintenance allowance + Fees",
      deadline: "Nov 30, 2026",
      eligibility: ["SC/ST students", "Family income < ₹2.5L", "Recognized institutions"],
      tags: ["Government", "Social Welfare"],
      color: "bg-violet-600",
      logo: "⚖️"
    },
    {
      id: 16,
      name: "Fair and Lovely Foundation Scholarship",
      provider: "HUL",
      amount: "₹25,000 to ₹50,000",
      deadline: "Oct 15, 2026",
      eligibility: ["Women applicants (15-30 yrs)", "60%+ in class 10 & 12", "Pursuing UG/PG"],
      tags: ["Girls Only", "Corporate CSR"],
      color: "bg-pink-400",
      logo: "✨"
    },
    {
      id: 17,
      name: "LIC Golden Jubilee Scholarship",
      provider: "LIC of India",
      amount: "₹20,000 / year",
      deadline: "Dec 15, 2026",
      eligibility: ["Family income < ₹2.5L", "60%+ in class 12", "Medicine/Engineering/Diploma"],
      tags: ["Corporate CSR", "Merit-cum-Means"],
      color: "bg-yellow-600",
      logo: "🛡️"
    },
    {
      id: 18,
      name: "Tata Capital Pankh Scholarship",
      provider: "Tata Capital",
      amount: "Up to 80% of tuition fees",
      deadline: "Nov 15, 2026",
      eligibility: ["Class 6 to UG courses", "Family income < ₹2.5L", "60%+ marks in previous exam"],
      tags: ["Corporate CSR", "Need Based"],
      color: "bg-blue-700",
      logo: "⚙️"
    },
    {
      id: 19,
      name: "Inspire Scholarship",
      provider: "Dept of Science & Technology",
      amount: "₹80,000 / year",
      deadline: "Dec 31, 2026",
      eligibility: ["Top 1% in Class 12 Board", "Pursuing Basic/Natural Sciences", "Within age 17-22"],
      tags: ["Government", "Science", "High Value"],
      color: "bg-sky-500",
      logo: "🔭"
    }
  ];

  const totalPages = Math.ceil(allScholarships.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentScholarships = allScholarships.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col pb-20">
      {/* Hero Section */}
      <div className="bg-[#1e3a5f] pt-16 pb-24 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-yellow-500 rounded-full blur-[100px] opacity-20 -mr-40 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500 rounded-full blur-[100px] opacity-20 -ml-20 -mb-20"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center justify-center p-3 bg-yellow-500/20 text-yellow-300 rounded-full mb-6 ring-4 ring-yellow-500/10">
            <Award className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
            Scholarship Finder
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mb-12 leading-relaxed">
            Don't let finances stop your education. Discover thousands of government and private scholarships matched to your profile.
          </p>
          
          {/* Search Bar */}
          <div className="w-full max-w-3xl bg-white p-2 rounded-2xl shadow-2xl flex flex-col sm:flex-row gap-2 relative z-20">
            <div className="flex-1 flex items-center px-4 bg-gray-50 rounded-xl border border-gray-100">
              <Search className="w-5 h-5 text-gray-400 mr-3" />
              <input 
                type="text" 
                placeholder="Search by name, provider, or state..." 
                className="w-full bg-transparent py-4 outline-none text-gray-700 font-medium"
              />
            </div>
            <button className="px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-xl transition-colors whitespace-nowrap shadow-md">
              Find Scholarships
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 -mt-8 relative z-20 flex flex-col lg:flex-row gap-8">
        
        {/* Filters Sidebar */}
        <div className="w-full lg:w-72 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
              <h3 className="font-bold text-lg flex items-center">
                <Filter className="w-5 h-5 mr-2 text-indigo-500" /> Filters
              </h3>
              <button className="text-sm text-gray-500 hover:text-indigo-600 font-medium">Clear All</button>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="text-sm font-bold text-gray-700 mb-3 block">Category</label>
                <div className="space-y-2.5">
                  {['General', 'OBC', 'SC', 'ST', 'Minority', 'EWS'].map((cat) => (
                    <label key={cat} className="flex items-center cursor-pointer group">
                      <div className="w-5 h-5 rounded border border-gray-300 mr-3 flex items-center justify-center group-hover:border-indigo-500 transition-colors"></div>
                      <span className="text-gray-600 group-hover:text-gray-900 font-medium">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="pt-6 border-t border-gray-100">
                <label className="text-sm font-bold text-gray-700 mb-3 block">Scholarship Type</label>
                <div className="space-y-2.5">
                  {['Government', 'Private', 'Corporate (CSR)', 'NGO'].map((type) => (
                    <label key={type} className="flex items-center cursor-pointer group">
                      <div className="w-5 h-5 rounded border border-gray-300 mr-3 flex items-center justify-center group-hover:border-indigo-500 transition-colors"></div>
                      <span className="text-gray-600 group-hover:text-gray-900 font-medium">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="flex-1 space-y-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-gray-900">Recommended for you</h2>
          </div>

          {currentScholarships.map((scholarship) => (
            <div key={scholarship.id} className="bg-white rounded-3xl shadow-sm hover:shadow-xl border border-gray-200 p-6 sm:p-8 transition-all duration-300 group">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-sm ${scholarship.color} text-white`}>
                      {scholarship.logo}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">{scholarship.provider}</p>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors leading-tight mt-1">
                        {scholarship.name}
                      </h3>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {scholarship.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-bold tracking-wide">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-col gap-4 bg-gray-50 rounded-2xl p-5 border border-gray-100 min-h-[120px] justify-start">
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase mb-1">Scholarship Amount</p>
                      <p className="font-extrabold text-emerald-600 text-xl">{scholarship.amount}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase mb-1">Application Deadline</p>
                      <p className="font-bold text-gray-900 text-lg">{scholarship.deadline}</p>
                    </div>
                  </div>
                </div>

                <div className="w-full sm:w-64 flex flex-col gap-4 border-t sm:border-t-0 sm:border-l border-gray-100 pt-6 sm:pt-0 sm:pl-6">
                  <div>
                    <p className="text-sm font-bold text-gray-900 mb-3 flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-1.5 text-indigo-500" /> Key Eligibility
                    </p>
                    <ul className="space-y-2">
                      {scholarship.eligibility.map((req, i) => (
                        <li key={i} className="text-sm text-gray-600 flex items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-1.5 mr-2 flex-shrink-0"></span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button className="w-full mt-auto py-3 bg-white border-2 border-indigo-100 text-indigo-600 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 font-bold rounded-xl transition-all flex items-center justify-center group/btn">
                    Apply Now <ExternalLink className="w-4 h-4 ml-2 opacity-50 group-hover/btn:opacity-100" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12 mb-8">
              <button
                onClick={() => {
                  setCurrentPage(Math.max(1, currentPage - 1));
                  window.scrollTo({ top: 400, behavior: 'smooth' });
                }}
                disabled={currentPage <= 1}
                className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                ← Prev
              </button>
              <div className="flex items-center gap-1 hidden sm:flex">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => {
                      setCurrentPage(pageNum);
                      window.scrollTo({ top: 400, behavior: 'smooth' });
                    }}
                    className={cn(
                      'w-10 h-10 rounded-xl text-sm font-semibold transition-all',
                      currentPage === pageNum
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                        : 'border border-transparent hover:border-gray-200 hover:bg-gray-50 text-gray-700'
                    )}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>
              <button
                onClick={() => {
                  setCurrentPage(Math.min(totalPages, currentPage + 1));
                  window.scrollTo({ top: 400, behavior: 'smooth' });
                }}
                disabled={currentPage >= totalPages}
                className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
