"use client";

import { motion } from "framer-motion";
import { GraduationCap, TrendingUp, Users, Sparkles } from "lucide-react";

type StatsSectionProps = {
  totalColleges: number;
  totalReviews: number;
  totalPredictions: number;
};

export function StatsSection({ totalColleges, totalReviews, totalPredictions }: StatsSectionProps) {
  const stats = [
    { label: "Top Colleges", value: `${totalColleges}+`, icon: GraduationCap },
    { label: "Acceptance Records", value: "10k+", icon: TrendingUp },
    { label: "Student Reviews", value: `${totalReviews}+`, icon: Users },
    { label: "Predictions Made", value: `${totalPredictions}+`, icon: Sparkles },
  ];

  return (
    <section className="py-12 bg-gray-50 border-y border-gray-100 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="flex justify-center mb-3">
                <div className="p-2 sm:p-3 bg-white rounded-xl shadow-sm border border-gray-100 text-indigo-600">
                  <stat.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-xs sm:text-sm text-gray-500 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
