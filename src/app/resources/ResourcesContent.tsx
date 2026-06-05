"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { MessageSquare, Star, TrendingUp, IndianRupee, FileText } from "lucide-react";

import { ReviewsTab } from "@/components/resources/ReviewsTab";
import { CutoffsTab } from "@/components/resources/CutoffsTab";
import { FeesTab } from "@/components/resources/FeesTab";
import { QATab } from "@/components/resources/QATab";
import { AdmissionsTab } from "@/components/resources/AdmissionsTab";

const TABS = [
  { id: "reviews", label: "Student Reviews", icon: Star },
  { id: "cutoffs", label: "Cutoff Trends", icon: TrendingUp },
  { id: "fees", label: "Fee Structures", icon: IndianRupee },
  { id: "qa", label: "Q&A Forum", icon: MessageSquare },
  { id: "admissions", label: "Admission Process", icon: FileText },
];

export function ResourcesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const currentTab = searchParams.get("tab") || "reviews";

  const handleTabChange = (id: string) => {
    router.push(`/resources?tab=${id}`, { scroll: false });
  };

  return (
    <>
      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 lg:w-72 bg-gray-50 border-r border-gray-200 flex-shrink-0">
        <nav className="flex flex-row md:flex-col p-4 md:p-6 gap-2 overflow-x-auto">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap",
                  isActive 
                    ? "bg-indigo-600 text-white shadow-md" 
                    : "text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                )}
              >
                <Icon className={cn("w-5 h-5", isActive ? "text-indigo-100" : "text-gray-400")} />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 sm:p-8 lg:p-10 overflow-y-auto">
        {currentTab === "reviews" && <ReviewsTab />}
        {currentTab === "cutoffs" && <CutoffsTab />}
        {currentTab === "fees" && <FeesTab />}
        {currentTab === "qa" && <QATab />}
        {currentTab === "admissions" && <AdmissionsTab />}
      </div>
    </>
  );
}
