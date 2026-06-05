import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-24 sm:py-32 bg-[#0f172a] text-white relative overflow-hidden w-full mt-auto">
      {/* Background Patterns */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[20%] w-[60%] h-[60%] rounded-full bg-indigo-500/20 blur-[100px]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col items-center justify-center">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-indigo-200">
          Ready to find your dream college?
        </h2>
        <p className="text-lg sm:text-xl text-indigo-100/80 mb-10 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
          Join thousands of students who have used CollegeHub to make data-driven decisions about their future.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 w-full sm:w-auto">
          <Link
            href="/colleges"
            className="px-8 py-4 sm:py-5 bg-white text-gray-900 font-bold rounded-2xl hover:bg-gray-50 hover:scale-105 transition-all shadow-xl shadow-white/10 w-full sm:w-auto text-center"
          >
            Start Exploring
          </Link>
          <Link
            href="/predict"
            className="px-8 py-4 sm:py-5 bg-indigo-600 text-white font-bold rounded-2xl border border-indigo-500 hover:bg-indigo-500 hover:scale-105 transition-all shadow-xl shadow-indigo-500/20 w-full sm:w-auto text-center"
          >
            Use Predictor Tool
          </Link>
        </div>
      </div>
    </section>
  );
}
