"use client";

import { Sparkles, Loader2 } from "lucide-react";

type PredictorFormProps = {
  exam: string;
  rank: string;
  category: string;
  isLoading: boolean;
  setExam: (val: string) => void;
  setRank: (val: string) => void;
  setCategory: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
};

const EXAMS = ['JEE Main', 'JEE Advanced', 'BITSAT', 'VITEEE', 'SRMJEEE', 'MHT CET', 'KCET', 'COMEDK'];
const CATEGORIES = ['General', 'OBC', 'SC', 'ST', 'EWS'];

export function PredictorForm(props: PredictorFormProps) {
  const { exam, rank, category, isLoading, setExam, setRank, setCategory, onSubmit } = props;

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-md p-8 sm:p-12">
      <div className="flex items-center gap-4 mb-8 sm:mb-10">
        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
          <Sparkles className="w-8 h-8" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Enter Your Details</h2>
      </div>

      <form onSubmit={onSubmit} className="space-y-8">
        <div className="space-y-3">
          <label className="block text-base font-semibold text-gray-700">Select Exam</label>
          <select
            value={exam}
            onChange={(e) => setExam(e.target.value)}
            className="w-full px-5 py-4 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] focus:border-[#1e3a5f] bg-gray-50 focus:bg-white transition-colors cursor-pointer"
            required
          >
            <option value="">Select an exam</option>
            {EXAMS.map((e) => (
              <option key={e} value={e}>{e}</option>
            ))}
          </select>
        </div>

        <div className="space-y-3">
          <label className="block text-base font-semibold text-gray-700">Your Rank</label>
          <input
            type="number"
            value={rank}
            onChange={(e) => setRank(e.target.value)}
            min="1"
            placeholder="Enter your expected/actual rank"
            className="w-full px-5 py-4 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] focus:border-[#1e3a5f] bg-gray-50 focus:bg-white transition-colors"
            required
          />
        </div>

        <div className="space-y-3">
          <label className="block text-base font-semibold text-gray-700">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-5 py-4 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] focus:border-[#1e3a5f] bg-gray-50 focus:bg-white transition-colors cursor-pointer"
            required
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={isLoading || !exam || !rank}
          className="w-full flex items-center justify-center gap-3 py-4 sm:py-5 px-6 bg-[#1e3a5f] hover:bg-[#2d5a8e] text-white text-lg font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#1e3a5f]/20 mt-6"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" /> Predicting Matches...
            </>
          ) : (
            'Predict Colleges'
          )}
        </button>
      </form>
    </div>
  );
}
