import { CheckCircle2 } from "lucide-react";

export function AdmissionsTab() {
  const steps = [
    {
      title: "Appear for Entrance Exams",
      desc: "Take exams like JEE Main, JEE Advanced, GATE, or state-level exams depending on your target colleges.",
    },
    {
      title: "Check Cutoffs & Eligibility",
      desc: "Verify if you meet the category-wise cutoffs for the specific branches and colleges you are aiming for.",
    },
    {
      title: "Register for Counselling",
      desc: "Apply through centralized authorities like JoSAA (for IITs/NITs), CSAB, or state-specific counselling bodies.",
    },
    {
      title: "Choice Filling & Locking",
      desc: "Carefully order your preferences for colleges and branches. Lock them before the deadline.",
    },
    {
      title: "Seat Allocation & Acceptance",
      desc: "Check allocation results across multiple rounds. Choose to Freeze, Float, or Slide your allotted seat.",
    },
    {
      title: "Document Verification",
      desc: "Submit necessary documents online or at reporting centers to confirm your admission and pay the seat acceptance fee.",
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Admission Process</h2>
      </div>
      
      <p className="text-gray-600">A step-by-step guide to navigating engineering admissions in India.</p>

      <div className="mt-8 space-y-0">
        {steps.map((step, idx) => (
          <div key={idx} className="flex items-start gap-5 md:gap-8">
            <div className="flex flex-col items-center h-full pt-1">
              <span className="flex-shrink-0 bg-indigo-50 p-2 rounded-full border border-indigo-100 shadow-sm relative z-10">
                <CheckCircle2 className="w-6 h-6 md:w-7 md:h-7 text-indigo-600" />
              </span>
              {idx !== steps.length - 1 && (
                <div className="w-0.5 h-full bg-indigo-100 mt-2 min-h-[50px] md:min-h-[60px] -mb-2"></div>
              )}
            </div>
            <div className="pb-8 md:pb-12 pt-1 md:pt-2">
              <h3 className="font-bold text-gray-900 text-lg md:text-xl">Step {idx + 1}: {step.title}</h3>
              <p className="text-gray-600 mt-2 md:mt-3 leading-relaxed text-sm md:text-base">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
}
