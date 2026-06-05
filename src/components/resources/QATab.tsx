import { MessageSquare, ArrowRight } from "lucide-react";

export function QATab() {
  const questions = [
    {
      q: "Is it worth dropping a year for JEE Advanced?",
      answers: 12,
      tags: ["JEE Advanced", "Preparation"],
    },
    {
      q: "Difference between CSE at Tier 2 NIT vs IT at Tier 1 NIT?",
      answers: 8,
      tags: ["College Comparison", "CSE"],
    },
    {
      q: "How accurate are the JoSAA mock seat allocations?",
      answers: 5,
      tags: ["JoSAA", "Counselling"],
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Q&A Forum</h2>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
          Ask a Question
        </button>
      </div>
      
      <p className="text-gray-600">Get your doubts resolved by our community of experts, alumni, and peers.</p>

      <div className="mt-6 border border-gray-200 rounded-2xl bg-white divide-y divide-gray-100 shadow-sm">
        {questions.map((item, idx) => (
          <div key={idx} className="p-6 hover:bg-gray-50 transition-colors cursor-pointer group">
            <h3 className="font-bold text-gray-900 text-lg group-hover:text-indigo-600 transition-colors">{item.q}</h3>
            <div className="flex items-center gap-4 mt-3">
              <div className="flex gap-2">
                {item.tags.map(tag => (
                  <span key={tag} className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-500 font-medium">
                <MessageSquare className="w-4 h-4" />
                <span>{item.answers} Answers</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="flex items-center gap-2 text-indigo-600 font-bold hover:text-indigo-700 transition-colors mt-4">
        <span>View all discussions</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
